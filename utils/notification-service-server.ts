import { createClient } from "@supabase/supabase-js"

// Create Supabase client with service role key for admin access
const supabaseAdmin = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
})

export class NotificationServiceServer {
  // Create notification for subscription purchase
  async createSubscriptionNotification(userId: string, planName: string, amount: number) {
    try {
      const { error } = await supabaseAdmin.from("notifications").insert({
        user_id: userId,
        title: "تم تفعيل الاشتراك بنجاح",
        message: `تم تفعيل اشتراك ${planName} بقيمة ${amount} ريال سعودي`,
        type: "success",
        read: false,
      })

      if (error) throw error
      console.log(`Created subscription notification for user ${userId}`)
    } catch (error) {
      console.error("Error creating subscription notification:", error)
    }
  }

  // Create notification for credits purchase
  async createCreditsNotification(userId: string, creditsAmount: number, cost: number) {
    try {
      const { error } = await supabaseAdmin.from("notifications").insert({
        user_id: userId,
        title: "تم شراء الرصيد بنجاح",
        message: `تم إضافة ${creditsAmount} رصيد إلى حسابك مقابل ${cost} ريال`,
        type: "success",
        read: false,
      })

      if (error) throw error
      console.log(`Created credits notification for user ${userId}`)
    } catch (error) {
      console.error("Error creating credits notification:", error)
    }
  }

  // Create notification for low credits warning (FREE PLANS ONLY)
  async createLowCreditsNotification(userId: string, remainingCredits: number) {
    try {
      // Check if user has free plan
      const { data: subscription } = await supabaseAdmin
        .from("subscriptions")
        .select("plan_type")
        .eq("user_id", userId)
        .eq("status", "active")
        .single()

      // Only create notification for free plan users
      if (subscription?.plan_type === "free") {
        const { error } = await supabaseAdmin.from("notifications").insert({
          user_id: userId,
          title: "رصيدك منخفض",
          message: `لديك ${remainingCredits} رصيد متبقي فقط. قم بالترقية للخطة المميزة للحصول على رصيد غير محدود`,
          type: "warning",
          read: false,
        })

        if (error) throw error
        console.log(`Created low credits notification for free user ${userId}`)
      }
    } catch (error) {
      console.error("Error creating low credits notification:", error)
    }
  }

  // Create notification for subscription expiry warning
  async createSubscriptionExpiryNotification(userId: string, daysLeft: number) {
    try {
      const { error } = await supabaseAdmin.from("notifications").insert({
        user_id: userId,
        title: "انتهاء صلاحية الاشتراك قريباً",
        message: `سينتهي اشتراكك المميز خلال ${daysLeft} أيام. جدد اشتراكك لمواصلة الاستفادة من المزايا`,
        type: "warning",
        read: false,
      })

      if (error) throw error
      console.log(`Created subscription expiry notification for user ${userId}`)
    } catch (error) {
      console.error("Error creating subscription expiry notification:", error)
    }
  }

  // Create notification for perfume database exploration
  async createPerfumeDatabaseNotification(userId: string) {
    try {
      const { error } = await supabaseAdmin.from("notifications").insert({
        user_id: userId,
        title: "استكشف قاعدة بيانات العطور",
        message: "اكتشف مجموعة واسعة من العطور في قاعدة البيانات الخاصة بنا واعثر على عطرك المثالي",
        type: "recommendation",
        read: false,
      })

      if (error) throw error
      console.log(`Created perfume database notification for user ${userId}`)
    } catch (error) {
      console.error("Error creating perfume database notification:", error)
    }
  }

  // Create notification for AI chat usage milestone
  async createChatMilestoneNotification(userId: string, chatCount: number) {
    try {
      const { error } = await supabaseAdmin.from("notifications").insert({
        user_id: userId,
        title: "إنجاز جديد في المحادثات",
        message: `تهانينا! لقد أجريت ${chatCount} محادثة مع مساعد العطور الذكي`,
        type: "success",
        read: false,
      })

      if (error) throw error
      console.log(`Created chat milestone notification for user ${userId}`)
    } catch (error) {
      console.error("Error creating chat milestone notification:", error)
    }
  }

  // Create notification for image search usage
  async createImageSearchNotification(userId: string, searchCount: number) {
    try {
      const { error } = await supabaseAdmin.from("notifications").insert({
        user_id: userId,
        title: "بحث بالصورة مكتمل",
        message: `تم تحليل ${searchCount} صورة بنجاح وإيجاد العطور المطابقة`,
        type: "info",
        read: false,
      })

      if (error) throw error
      console.log(`Created image search notification for user ${userId}`)
    } catch (error) {
      console.error("Error creating image search notification:", error)
    }
  }

  // Create notification for favorite perfume added
  async createFavoriteNotification(userId: string, perfumeName: string) {
    try {
      const { error } = await supabaseAdmin.from("notifications").insert({
        user_id: userId,
        title: "تم إضافة عطر للمفضلة",
        message: `تم إضافة ${perfumeName} إلى قائمة العطور المفضلة لديك`,
        type: "info",
        read: false,
      })

      if (error) throw error
      console.log(`Created favorite notification for user ${userId}`)
    } catch (error) {
      console.error("Error creating favorite notification:", error)
    }
  }

  // Create welcome notification for new users
  async createWelcomeNotification(userId: string) {
    try {
      const { error } = await supabaseAdmin.from("notifications").insert({
        user_id: userId,
        title: "مرحباً بك في عُطوري",
        message: "نحن سعداء لانضمامك إلينا! استكشف عالم العطور مع مساعدنا الذكي",
        type: "success",
        read: false,
      })

      if (error) throw error
      console.log(`Created welcome notification for user ${userId}`)
    } catch (error) {
      console.error("Error creating welcome notification:", error)
    }
  }

  // Populate notifications for existing users based on their data
  async populateUserNotifications(userId: string) {
    try {
      console.log(`Starting to populate notifications for user: ${userId}`)

      // Check if user already has notifications
      const { data: existingNotifications } = await supabaseAdmin
        .from("notifications")
        .select("id")
        .eq("user_id", userId)
        .limit(1)

      if (existingNotifications && existingNotifications.length > 0) {
        console.log(`User ${userId} already has notifications, skipping population`)
        return
      }

      // 1. Create welcome notification
      await this.createWelcomeNotification(userId)

      // 2. Get user subscription data
      const { data: subscription } = await supabaseAdmin
        .from("subscriptions")
        .select("*")
        .eq("user_id", userId)
        .eq("status", "active")
        .single()

      if (subscription) {
        if (subscription.plan_type === "premium") {
          await this.createSubscriptionNotification(userId, "المميز", 99)
        }

        // Check subscription expiry for premium users
        if (subscription.current_period_end && subscription.plan_type === "premium") {
          const expiryDate = new Date(subscription.current_period_end)
          const now = new Date()
          const daysLeft = Math.ceil((expiryDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))

          if (daysLeft <= 7 && daysLeft > 0) {
            await this.createSubscriptionExpiryNotification(userId, daysLeft)
          }
        }
      }

      // 3. Check user credits (only for free users)
      const { data: userCredits } = await supabaseAdmin.from("user_credits").select("*").eq("user_id", userId).single()

      if (userCredits && subscription?.plan_type === "free") {
        const remainingCredits = userCredits.credits_limit - userCredits.credits_used
        if (remainingCredits <= 3) {
          await this.createLowCreditsNotification(userId, remainingCredits)
        }
      }

      // 4. Check favorites count
      const { data: favorites } = await supabaseAdmin.from("favorites").select("id").eq("user_id", userId)

      if (favorites && favorites.length > 0) {
        await this.createFavoriteNotification(userId, `${favorites.length} عطر`)
      }

      // 5. Check chat history for milestones
      const { data: chatHistory } = await supabaseAdmin.from("chat_history").select("id").eq("user_id", userId)

      if (chatHistory && chatHistory.length >= 5) {
        await this.createChatMilestoneNotification(userId, chatHistory.length)
      }

      // 6. Check image search history
      const { data: imageSearchHistory } = await supabaseAdmin
        .from("image_search_history")
        .select("id")
        .eq("user_id", userId)

      if (imageSearchHistory && imageSearchHistory.length > 0) {
        await this.createImageSearchNotification(userId, imageSearchHistory.length)
      }

      // 7. Always suggest perfume database exploration
      await this.createPerfumeDatabaseNotification(userId)

      console.log(`Successfully populated notifications for user: ${userId}`)
    } catch (error) {
      console.error("Error populating user notifications:", error)
      throw error
    }
  }

  // Check and create automatic notifications based on user data
  async checkAndCreateAutoNotifications(userId: string) {
    try {
      // Check subscription status
      const { data: subscription } = await supabaseAdmin
        .from("subscriptions")
        .select("*")
        .eq("user_id", userId)
        .eq("status", "active")
        .single()

      if (subscription && subscription.current_period_end && subscription.plan_type === "premium") {
        const expiryDate = new Date(subscription.current_period_end)
        const now = new Date()
        const daysLeft = Math.ceil((expiryDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))

        if (daysLeft <= 3 && daysLeft > 0) {
          await this.createSubscriptionExpiryNotification(userId, daysLeft)
        }
      }

      // Check credits (only for free users)
      if (subscription?.plan_type === "free") {
        const { data: userCredits } = await supabaseAdmin
          .from("user_credits")
          .select("*")
          .eq("user_id", userId)
          .single()

        if (userCredits) {
          const remainingCredits = userCredits.credits_limit - userCredits.credits_used
          if (remainingCredits <= 2) {
            await this.createLowCreditsNotification(userId, remainingCredits)
          }
        }
      }

      // Check recent activity for milestones
      const { data: chatHistory } = await supabaseAdmin.from("chat_history").select("id").eq("user_id", userId)

      if (chatHistory) {
        const chatCount = chatHistory.length
        if (chatCount > 0 && chatCount % 10 === 0) {
          await this.createChatMilestoneNotification(userId, chatCount)
        }
      }
    } catch (error) {
      console.error("Error checking auto notifications:", error)
    }
  }
}

export const notificationServiceServer = new NotificationServiceServer()
