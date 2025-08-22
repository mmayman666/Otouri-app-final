import { createClient } from "@/utils/supabase/client"
import { notificationService } from "@/utils/notification-service"

export async function populateExistingUserNotifications(userId: string) {
  const supabase = createClient()

  try {
    // Get user's existing data
    const [
      { data: profile },
      { data: subscriptions },
      { data: favorites },
      { data: chatHistory },
      { data: imageSearches },
      { data: recommendations },
    ] = await Promise.all([
      supabase.from("profiles").select("*").eq("id", userId).single(),
      supabase.from("subscriptions").select("*").eq("user_id", userId).order("created_at", { ascending: false }),
      supabase.from("favorites").select("*").eq("user_id", userId).order("created_at", { ascending: false }).limit(3),
      supabase.from("chat_history").select("*").eq("user_id", userId).order("created_at", { ascending: false }),
      supabase
        .from("image_search_history")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", { ascending: false })
        .limit(2),
      supabase
        .from("recommendations")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", { ascending: false })
        .limit(2),
    ])

    // Create welcome notification if user is relatively new (within last 30 days)
    if (profile) {
      const userCreated = new Date(profile.created_at)
      const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)

      if (userCreated > thirtyDaysAgo) {
        await notificationService.createWelcomeNotification(userId)
      }
    }

    // Create notifications for recent subscriptions
    if (subscriptions && subscriptions.length > 0) {
      const recentSub = subscriptions[0]
      if (recentSub.status === "active") {
        const planName =
          recentSub.price_id === process.env.NEXT_PUBLIC_STRIPE_PREMIUM_MONTHLY_PRICE_ID ? "المميز" : "الأساسي"
        const amount = recentSub.price_id === process.env.NEXT_PUBLIC_STRIPE_PREMIUM_MONTHLY_PRICE_ID ? 99 : 49
        await notificationService.createSubscriptionNotification(userId, planName, amount)
      }
    }

    // Create notifications for recent favorites
    if (favorites && favorites.length > 0) {
      for (const favorite of favorites.slice(0, 2)) {
        await notificationService.createFavoriteNotification(userId, favorite.perfume_name || "عطر مميز")
      }
    }

    // Create chat milestone notification
    if (chatHistory && chatHistory.length >= 5) {
      await notificationService.createChatMilestoneNotification(userId, chatHistory.length)
    }

    // Create image search notifications
    if (imageSearches && imageSearches.length > 0) {
      await notificationService.createImageSearchNotification(userId, imageSearches.length)
    }

    // Create recommendation notifications
    if (recommendations && recommendations.length > 0) {
      const recentRec = recommendations[0]
      await notificationService.createRecommendationNotification(userId, recentRec.perfume_name || "عطر موصى به")
    }

    // Check current credits and create warning if low
    if (profile && profile.credits <= 10) {
      await notificationService.createLowCreditsNotification(userId, profile.credits || 0)
    }

    // Check subscription expiry
    if (subscriptions && subscriptions.length > 0) {
      const activeSub = subscriptions.find((sub) => sub.status === "active")
      if (activeSub) {
        const expiryDate = new Date(activeSub.current_period_end)
        const now = new Date()
        const daysLeft = Math.ceil((expiryDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))

        if (daysLeft <= 7 && daysLeft > 0) {
          await notificationService.createSubscriptionExpiryNotification(userId, daysLeft)
        }
      }
    }

    // Create profile completion notification if profile is complete
    if (profile && profile.preferences && profile.full_name) {
      await notificationService.createProfileCompletionNotification(userId)
    }

    console.log("Successfully populated notifications for user:", userId)
  } catch (error) {
    console.error("Error populating notifications:", error)
  }
}

// Function to populate notifications for all existing users (admin use)
export async function populateAllUsersNotifications() {
  const supabase = createClient()

  try {
    const { data: users } = await supabase.from("profiles").select("id")

    if (users) {
      for (const user of users) {
        await populateExistingUserNotifications(user.id)
        // Add delay to avoid rate limiting
        await new Promise((resolve) => setTimeout(resolve, 1000))
      }
    }
  } catch (error) {
    console.error("Error populating all user notifications:", error)
  }
}
