import { createClient } from "@/utils/supabase/client"

export async function createSampleNotifications(userId: string) {
  const supabase = createClient()

  const sampleNotifications = [
    {
      user_id: userId,
      title: "مرحباً بك في عُطوري",
      message: "نحن سعداء لانضمامك إلينا! استكشف مجموعتنا الواسعة من العطور",
      type: "success",
    },
    {
      user_id: userId,
      title: "توصية عطر جديدة",
      message: "بناءً على تفضيلاتك، نوصي بعطر Tom Ford Oud Wood",
      type: "recommendation",
    },
    {
      user_id: userId,
      title: "تحديث قاعدة البيانات",
      message: "تم إضافة 25 عطر جديد من ماركات عالمية مشهورة",
      type: "update",
    },
  ]

  try {
    const { data, error } = await supabase.from("notifications").insert(sampleNotifications).select()

    if (error) throw error

    console.log("Sample notifications created:", data)
    return data
  } catch (error) {
    console.error("Error creating sample notifications:", error)
    throw error
  }
}
