import { createClient } from "@/utils/supabase/client"

export class NotificationService {
  private supabase = createClient()

  // Create notification for subscription purchase
  async createSubscriptionNotification(userId: string, planName: string, amount: number) {
    try {
      const { error } = await this.supabase.from("notifications").insert({
        user_id: userId,
        title: "تم تفعيل الاشتراك بنجاح",
        message: `تم تفعيل اشتراك ${planName} بقيمة ${amount} ريال سعودي`,
        type: "success",
      })

      if (error) throw error
    } catch (error) {
      console.error("Error creating subscription notification:", error)
    }
  }

  // Create notification for credits purchase
  async createCreditsNotification(userId: string, creditsAmount: number, cost: number) {
    try {
      const { error } = await this.supabase.from("notifications").insert({
        user_id: userId,
        title: "تم شراء الرصيد بنجاح",
        message: `تم إضافة ${creditsAmount} رصيد إلى حسابك مقابل ${cost} ريال`,
        type: "success",
      })

      if (error) throw error
    } catch (error) {
      console.error("Error creating credits notification:", error)
    }
  }

  // Create notification for low credits warning
  async createLowCreditsNotification(userId: string, remainingCredits: number) {
    try {
      const { error } = await this.supabase.from("notifications").insert({
        user_id: userId,
        title: "رصيدك منخفض",
        message: `لديك ${remainingCredits} رصيد متبقي فقط. قم بشراء المزيد لمواصلة الاستخدام`,
        type: "warning",
      })

      if (error) throw error
    } catch (error) {
      console.error("Error creating low credits notification:", error)
    }
  }

  // Create notification for subscription expiry warning
  async createSubscriptionExpiryNotification(userId: string, daysLeft: number) {
    try {
      const { error } = await this.supabase.from("notifications").insert({
        user_id: userId,
        title: "انتهاء صلاحية الاشتراك قريباً",
        message: `سينتهي اشتراكك المميز خلال ${daysLeft} أيام. جدد اشتراكك لمواصلة الاستفادة من المزايا`,
        type: "warning",
      })

      if (error) throw error
    } catch (error) {
      console.error("Error creating subscription expiry notification:", error)
    }
  }

  // Create notification for new perfume recommendation
  async createRecommendationNotification(userId: string, perfumeName: string) {
    try {
      const { error } = await this.supabase.from("notifications").insert({
        user_id: userId,
        title: "توصية عطر جديدة",
        message: `بناءً على تفضيلاتك، نوصي بعطر ${perfumeName}`,
        type: "recommendation",
      })

      if (error) throw error
    } catch (error) {
      console.error("Error creating recommendation notification:", error)
    }
  }

  // Create notification for AI chat usage milestone
  async createChatMilestoneNotification(userId: string, chatCount: number) {
    try {
      const { error } = await this.supabase.from("notifications").insert({
        user_id: userId,
        title: "إنجاز جديد في المحادثات",
        message: `تهانينا! لقد أجريت ${chatCount} محادثة مع مساعد العطور الذكي`,
        type: "success",
      })

      if (error) throw error
    } catch (error) {
      console.error("Error creating chat milestone notification:", error)
    }
  }

  // Create notification for image search usage
  async createImageSearchNotification(userId: string, searchCount: number) {
    try {
      const { error } = await this.supabase.from("notifications").insert({
        user_id: userId,
        title: "بحث بالصورة مكتمل",
        message: `تم تحليل ${searchCount} صورة بنجاح وإيجاد العطور المطابقة`,
        type: "info",
      })

      if (error) throw error
    } catch (error) {
      console.error("Error creating image search notification:", error)
    }
  }

  // Create notification for profile completion
  async createProfileCompletionNotification(userId: string) {
    try {
      const { error } = await this.supabase.from("notifications").insert({
        user_id: userId,
        title: "تم إكمال الملف الشخصي",
        message: "ممتاز! تم إكمال ملفك الشخصي. ستحصل الآن على توصيات أكثر دقة",
        type: "success",
      })

      if (error) throw error
    } catch (error) {
      console.error("Error creating profile completion notification:", error)
    }
  }

  // Create notification for favorite perfume added
  async createFavoriteNotification(userId: string, perfumeName: string) {
    try {
      const { error } = await this.supabase.from("notifications").insert({
        user_id: userId,
        title: "تم إضافة عطر للمفضلة",
        message: `تم إضافة ${perfumeName} إلى قائمة العطور المفضلة لديك`,
        type: "info",
      })

      if (error) throw error
    } catch (error) {
      console.error("Error creating favorite notification:", error)
    }
  }

  // Create welcome notification for new users
  async createWelcomeNotification(userId: string) {
    try {
      const { error } = await this.supabase.from("notifications").insert({
        user_id: userId,
        title: "مرحباً بك في عُطوري",
        message: "نحن سعداء لانضمامك إلينا! استكشف عالم العطور مع مساعدنا الذكي",
        type: "success",
      })

      if (error) throw error
    } catch (error) {
      console.error("Error creating welcome notification:", error)
    }
  }

  // Check and create automatic notifications based on user data
  async checkAndCreateAutoNotifications(userId: string) {
    try {
      // Check subscription status
      const { data: subscription } = await this.supabase
        .from("subscriptions")
        .select("*")
        .eq("user_id", userId)
        .eq("status", "active")
        .single()

      if (subscription) {
        const expiryDate = new Date(subscription.current_period_end)
        const now = new Date()
        const daysLeft = Math.ceil((expiryDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))

        if (daysLeft <= 3 && daysLeft > 0) {
          await this.createSubscriptionExpiryNotification(userId, daysLeft)
        }
      }

      // Check credits
      const { data: profile } = await this.supabase.from("profiles").select("credits").eq("id", userId).single()

      if (profile && profile.credits <= 5) {
        await this.createLowCreditsNotification(userId, profile.credits)
      }

      // Check recent activity for milestones
      const { data: chatHistory } = await this.supabase.from("chat_history").select("id").eq("user_id", userId)

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

export const notificationService = new NotificationService()
