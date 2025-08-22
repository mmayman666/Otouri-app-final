"use client"

import { useEffect, useState } from "react"
import { notificationService } from "@/utils/notification-service"
import { createClient } from "@/utils/supabase/client"
import { populateExistingUserNotifications } from "@/utils/populate-existing-notifications"

export function useActivityNotifications() {
  const supabase = createClient()
  const [hasPopulated, setHasPopulated] = useState(false)

  useEffect(() => {
    const checkUserActivity = async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser()
        if (!user) return

        // Check if user already has notifications
        const { data: existingNotifications } = await supabase
          .from("notifications")
          .select("id")
          .eq("user_id", user.id)
          .limit(1)

        // If no existing notifications, populate from existing data
        if (!existingNotifications || existingNotifications.length === 0) {
          if (!hasPopulated) {
            await populateExistingUserNotifications(user.id)
            setHasPopulated(true)
          }
        }

        // Check for automatic notifications
        await notificationService.checkAndCreateAutoNotifications(user.id)

        // Set up listeners for real-time activity
        const subscriptionChannel = supabase
          .channel("subscription_changes")
          .on(
            "postgres_changes",
            {
              event: "INSERT",
              schema: "public",
              table: "subscriptions",
              filter: `user_id=eq.${user.id}`,
            },
            async (payload) => {
              const subscription = payload.new
              if (subscription.status === "active") {
                await notificationService.createSubscriptionNotification(
                  user.id,
                  subscription.price_id === process.env.NEXT_PUBLIC_STRIPE_PREMIUM_MONTHLY_PRICE_ID
                    ? "المميز"
                    : "الأساسي",
                  subscription.price_id === process.env.NEXT_PUBLIC_STRIPE_PREMIUM_MONTHLY_PRICE_ID ? 99 : 49,
                )
              }
            },
          )
          .subscribe()

        const favoritesChannel = supabase
          .channel("favorites_changes")
          .on(
            "postgres_changes",
            {
              event: "INSERT",
              schema: "public",
              table: "favorites",
              filter: `user_id=eq.${user.id}`,
            },
            async (payload) => {
              const favorite = payload.new
              await notificationService.createFavoriteNotification(user.id, favorite.perfume_name || "عطر جديد")
            },
          )
          .subscribe()

        const profileChannel = supabase
          .channel("profile_changes")
          .on(
            "postgres_changes",
            {
              event: "UPDATE",
              schema: "public",
              table: "profiles",
              filter: `id=eq.${user.id}`,
            },
            async (payload) => {
              const oldProfile = payload.old
              const newProfile = payload.new

              // Check if credits were added
              if (newProfile.credits > oldProfile.credits) {
                const creditsAdded = newProfile.credits - oldProfile.credits
                await notificationService.createCreditsNotification(
                  user.id,
                  creditsAdded,
                  creditsAdded * 2, // Assuming 2 SAR per credit
                )
              }

              // Check if profile was completed
              if (!oldProfile.preferences && newProfile.preferences) {
                await notificationService.createProfileCompletionNotification(user.id)
              }
            },
          )
          .subscribe()

        const chatChannel = supabase
          .channel("chat_changes")
          .on(
            "postgres_changes",
            {
              event: "INSERT",
              schema: "public",
              table: "chat_history",
              filter: `user_id=eq.${user.id}`,
            },
            async () => {
              // Check for chat milestones
              const { data: chatHistory } = await supabase.from("chat_history").select("id").eq("user_id", user.id)
              if (chatHistory && chatHistory.length % 10 === 0) {
                await notificationService.createChatMilestoneNotification(user.id, chatHistory.length)
              }
            },
          )
          .subscribe()

        return () => {
          supabase.removeChannel(subscriptionChannel)
          supabase.removeChannel(favoritesChannel)
          supabase.removeChannel(profileChannel)
          supabase.removeChannel(chatChannel)
        }
      } catch (error) {
        console.error("Error setting up activity notifications:", error)
      }
    }

    checkUserActivity()
  }, [supabase, hasPopulated])

  return {
    // Manually trigger notifications for testing
    triggerWelcome: async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (user) await notificationService.createWelcomeNotification(user.id)
    },
    triggerRecommendation: async (perfumeName: string) => {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (user) await notificationService.createRecommendationNotification(user.id, perfumeName)
    },
    triggerImageSearch: async (count: number) => {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (user) await notificationService.createImageSearchNotification(user.id, count)
    },
    populateExisting: async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (user) {
        await populateExistingUserNotifications(user.id)
        setHasPopulated(true)
      }
    },
  }
}
