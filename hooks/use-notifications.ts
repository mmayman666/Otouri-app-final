"use client"

import { useState, useEffect } from "react"
import { createClient } from "@/utils/supabase/client"
import type { User } from "@supabase/supabase-js"

export interface Notification {
  id: string
  user_id: string
  title: string
  message: string
  type: "info" | "recommendation" | "update" | "warning" | "success"
  read: boolean
  created_at: string
  updated_at: string
}

export function useNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [user, setUser] = useState<User | null>(null)
  const [hasPopulated, setHasPopulated] = useState(false)

  const supabase = createClient()

  // Get current user
  useEffect(() => {
    const getUser = async () => {
      try {
        const {
          data: { user },
          error,
        } = await supabase.auth.getUser()
        if (error) throw error
        setUser(user)
      } catch (err) {
        console.error("Error getting user:", err)
        setError("فشل في تحميل بيانات المستخدم")
      }
    }

    getUser()
  }, [supabase.auth])

  // Populate notifications if none exist
  const populateNotifications = async () => {
    if (!user || hasPopulated) return

    try {
      console.log("Calling populate notifications API...")
      const response = await fetch("/api/notifications/populate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      })

      if (!response.ok) {
        throw new Error("Failed to populate notifications")
      }

      const result = await response.json()
      console.log("Populate notifications result:", result)
      setHasPopulated(true)

      // Refresh notifications after populating
      await fetchNotifications()
    } catch (err) {
      console.error("Error populating notifications:", err)
    }
  }

  // Fetch notifications using API route (which uses service role)
  const fetchNotifications = async () => {
    if (!user) return

    try {
      setLoading(true)
      setError(null)

      console.log("Fetching notifications for user:", user.id)

      // Use API route to fetch with service role
      const response = await fetch("/api/notifications/fetch", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })

      if (!response.ok) {
        throw new Error("Failed to fetch notifications")
      }

      const result = await response.json()
      console.log("Fetched notifications:", result.notifications)
      setNotifications(result.notifications || [])

      // If no notifications exist, populate them
      if (!result.notifications || result.notifications.length === 0) {
        await populateNotifications()
      }
    } catch (err) {
      console.error("Error fetching notifications:", err)
      setError("فشل في تحميل الإشعارات")
    } finally {
      setLoading(false)
    }
  }

  // Mark notification as read
  const markAsRead = async (notificationId: string) => {
    if (!user) return

    try {
      const response = await fetch("/api/notifications/mark-read", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ notificationId }),
      })

      if (!response.ok) {
        throw new Error("Failed to mark notification as read")
      }

      // Update local state
      setNotifications((prev) =>
        prev.map((notification) =>
          notification.id === notificationId ? { ...notification, read: true } : notification,
        ),
      )
    } catch (err) {
      console.error("Error marking notification as read:", err)
    }
  }

  // Mark all notifications as read
  const markAllAsRead = async () => {
    if (!user) return

    try {
      const response = await fetch("/api/notifications/mark-all-read", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      })

      if (!response.ok) {
        throw new Error("Failed to mark all notifications as read")
      }

      // Update local state
      setNotifications((prev) => prev.map((notification) => ({ ...notification, read: true })))
    } catch (err) {
      console.error("Error marking all notifications as read:", err)
    }
  }

  // Get unread count
  const unreadCount = notifications.filter((n) => !n.read).length

  // Format relative time in Arabic
  const formatRelativeTime = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60))

    if (diffInMinutes < 1) return "الآن"
    if (diffInMinutes < 60) return `منذ ${diffInMinutes} دقيقة`

    const diffInHours = Math.floor(diffInMinutes / 60)
    if (diffInHours < 24) return `منذ ${diffInHours} ساعة`

    const diffInDays = Math.floor(diffInHours / 24)
    if (diffInDays < 7) return `منذ ${diffInDays} يوم`

    const diffInWeeks = Math.floor(diffInDays / 7)
    if (diffInWeeks < 4) return `منذ ${diffInWeeks} أسبوع`

    const diffInMonths = Math.floor(diffInDays / 30)
    return `منذ ${diffInMonths} شهر`
  }

  // Set up real-time subscription and initial fetch
  useEffect(() => {
    if (!user) return

    fetchNotifications()

    // Subscribe to real-time changes
    const channel = supabase
      .channel("notifications")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "notifications",
          filter: `user_id=eq.${user.id}`,
        },
        (payload) => {
          console.log("Real-time notification update:", payload)
          if (payload.eventType === "INSERT") {
            setNotifications((prev) => [payload.new as Notification, ...prev])
          } else if (payload.eventType === "UPDATE") {
            setNotifications((prev) =>
              prev.map((notification) =>
                notification.id === payload.new.id ? (payload.new as Notification) : notification,
              ),
            )
          } else if (payload.eventType === "DELETE") {
            setNotifications((prev) => prev.filter((notification) => notification.id !== payload.old.id))
          }
        },
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [user, supabase])

  return {
    notifications,
    loading,
    error,
    unreadCount,
    markAsRead,
    markAllAsRead,
    formatRelativeTime,
    refetch: fetchNotifications,
    populateNotifications,
  }
}
