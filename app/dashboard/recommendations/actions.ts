"use server"

import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"
import { createClient } from "@/utils/supabase/server"
import { revalidatePath } from "next/cache"
import { checkAndConsumeCredits } from "../subscription/actions"

export type RecommendationFormData = {
  priceRange: { min: number; max: number }
  gender: string | null
  occasion: string[]
  season: string[]
  strength: string | null
  longevity: string | null
  notes: string[]
}

export type PerfumeRecommendation = {
  id: string
  name: string
  brand: string
  price: string
  description: string
  notes: string[]
  matchPercentage: number
  image: string
  gender: string
  strength: string
  longevity: string
  occasion: string[]
  season: string[]
  availability: string
  retailer: string
  rating: number
  reviews: number
}

export type RecommendationHistory = {
  id: string
  preferences: RecommendationFormData
  recommendations: PerfumeRecommendation[]
  created_at: string
}

export async function generateRecommendations(
  formData: RecommendationFormData,
): Promise<{ recommendations: PerfumeRecommendation[]; historyId: string }> {
  try {
    const supabase = await createClient()

    // Get current user
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser()
    if (userError || !user) {
      throw new Error("يجب تسجيل الدخول أولاً")
    }

    // Check and consume credits
    const creditCheck = await checkAndConsumeCredits("recommendations", 1)
    if (!creditCheck.success) {
      throw new Error(creditCheck.error || "لا توجد عمليات بحث متبقية")
    }

    // Create a comprehensive prompt for the AI
    const prompt = `
أنت خبير عطور محترف متخصص في السوق السعودي والخليجي. أريد منك اقتراح 6 عطور مناسبة بناءً على التفضيلات التالية:

نطاق السعر: ${formData.priceRange.min} إلى ${formData.priceRange.max} ريال سعودي
النوع: ${formData.gender || "غير محدد"}
المناسبة: ${formData.occasion.join(", ") || "غير محدد"}
الموسم: ${formData.season.join(", ") || "غير محدد"}
قوة العطر: ${formData.strength || "غير محدد"}
مدة بقاء العطر: ${formData.longevity || "غير محدد"}
النوتات المفضلة: ${formData.notes.join(", ") || "غير محدد"}

IMPORTANT: أجب بتنسيق JSON فقط، بدون أي نص إضافي أو markdown. ابدأ مباشرة بـ [ وانته بـ ]

قدم لي 6 عطور مختلفة ومتنوعة (مزيج من العطور العربية والعالمية) بالتنسيق التالي:

[
  {
    "name": "اسم العطر",
    "brand": "الماركة",
    "price": "السعر بالريال السعودي",
    "description": "وصف مفصل وجذاب للعطر",
    "notes": ["نوتة 1", "نوتة 2", "نوتة 3", "نوتة 4"],
    "matchPercentage": 95,
    "gender": "النوع",
    "strength": "قوة العطر",
    "longevity": "مدة البقاء",
    "occasion": ["مناسبة 1", "مناسبة 2"],
    "season": ["موسم 1", "موسم 2"],
    "availability": "حالة التوفر",
    "retailer": "المتجر",
    "rating": 4.5,
    "reviews": 150
  }
]

تذكر: JSON فقط، بدون markdown أو نص إضافي!
`

    // Generate recommendations using OpenAI
    const { text } = await generateText({
      model: openai("gpt-4o"),
      prompt,
      temperature: 0.8,
      maxTokens: 3000,
    })

    // Parse the response
    let recommendations: PerfumeRecommendation[]
    try {
      // Remove markdown code blocks if present
      let cleanedText = text.trim()

      // Remove \`\`\`json and \`\`\` if present
      if (cleanedText.startsWith("```json")) {
        cleanedText = cleanedText.replace(/^```json\s*/, "").replace(/\s*```$/, "")
      } else if (cleanedText.startsWith("```")) {
        cleanedText = cleanedText.replace(/^```\s*/, "").replace(/\s*```$/, "")
      }

      // Try to find JSON array in the response
      const jsonMatch = cleanedText.match(/\[[\s\S]*\]/)
      if (jsonMatch) {
        cleanedText = jsonMatch[0]
      }

      recommendations = JSON.parse(cleanedText)

      // Validate that we got an array
      if (!Array.isArray(recommendations)) {
        throw new Error("Response is not an array")
      }

      // Validate that each recommendation has required fields
      recommendations.forEach((rec, index) => {
        if (!rec.name || !rec.brand || !rec.price) {
          throw new Error(`Invalid recommendation at index ${index}`)
        }
      })
    } catch (parseError) {
      console.error("Failed to parse AI response:", parseError)
      console.error("Raw AI response:", text)

      // Fallback: create sample recommendations if parsing fails
      recommendations = [
        {
          name: "عود الملكي الفاخر",
          brand: "دار الطيب",
          price: "450 ر.س",
          description:
            "عطر شرقي فاخر يجمع بين عبق العود الطبيعي ونفحات المسك الأبيض، مثالي للمناسبات الخاصة والسهرات الراقية.",
          notes: ["عود كمبودي", "مسك أبيض", "عنبر", "ورد طائفي"],
          matchPercentage: 92,
          gender: "للجنسين",
          strength: "قوي",
          longevity: "طويل المدى",
          occasion: ["مناسبات خاصة", "سهرة"],
          season: ["شتاء", "خريف"],
          availability: "متوفر",
          retailer: "متجر العطور الملكية",
          rating: 4.7,
          reviews: 156,
        },
        {
          name: "زهور الياسمين الدمشقي",
          brand: "عطور الشرق",
          price: "320 ر.س",
          description:
            "عطر زهري أنيق يتميز بنفحات الياسمين الطبيعي مع لمسات من الفانيليا الناعمة، مناسب للاستخدام اليومي.",
          notes: ["ياسمين دمشقي", "فانيليا", "خشب الصندل", "مسك"],
          matchPercentage: 88,
          gender: "نسائي",
          strength: "متوسط",
          longevity: "متوسط المدى",
          occasion: ["يومي", "عمل"],
          season: ["ربيع", "صيف"],
          availability: "متوفر",
          retailer: "بيت العطور",
          rating: 4.5,
          reviews: 203,
        },
        {
          name: "نفحات البرغموت الإيطالي",
          brand: "أكوا دي بارما",
          price: "680 ر.س",
          description: "عطر حم��ي منعش يجمع بين البرغموت الإيطالي الطبيعي ونفحات البحر الأبيض المتوسط، مثالي للصيف.",
          notes: ["برغموت إيطالي", "ليمون", "نعناع", "خشب الأرز"],
          matchPercentage: 85,
          gender: "رجالي",
          strength: "خفيف",
          longevity: "قصير المدى",
          occasion: ["يومي", "رياضة"],
          season: ["صيف", "ربيع"],
          availability: "محدود",
          retailer: "متجر العطور الأوروبية",
          rating: 4.3,
          reviews: 89,
        },
      ]

      // Log the error but continue with fallback data
      console.warn("Using fallback recommendations due to parsing error")
    }

    // Add unique IDs and placeholder images to each recommendation
    const enhancedRecommendations = recommendations.map((rec, index) => ({
      ...rec,
      id: `rec-${Date.now()}-${index}`,
      image: `/placeholder.svg?height=400&width=400&query=luxury perfume bottle ${rec.brand} ${rec.name} elegant`,
    }))

    // Save to database
    const { data: savedRecommendation, error: saveError } = await supabase
      .from("recommendations")
      .insert({
        user_id: user.id,
        preferences: formData,
        recommendations: enhancedRecommendations,
      })
      .select("id")
      .single()

    if (saveError) {
      console.error("Error saving recommendations:", saveError)
      throw new Error("فشل في حفظ التوصيات")
    }

    revalidatePath("/dashboard/recommendations")

    return {
      recommendations: enhancedRecommendations,
      historyId: savedRecommendation.id,
    }
  } catch (error) {
    console.error("Error generating recommendations:", error)
    throw new Error(error instanceof Error ? error.message : "فشل في إنشاء التوصيات. يرجى المحاولة مرة أخرى.")
  }
}

export async function addToFavorites(perfume: PerfumeRecommendation): Promise<{ success: boolean; message: string }> {
  try {
    const supabase = await createClient()

    // Get current user
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser()
    if (userError || !user) {
      throw new Error("يجب تسجيل الدخول أولاً")
    }

    // Check if already in favorites
    const { data: existing } = await supabase
      .from("user_favorites")
      .select("id")
      .eq("user_id", user.id)
      .eq("perfume_data->id", perfume.id)
      .single()

    if (existing) {
      return { success: false, message: "العطر موجود بالفعل في المفضلة" }
    }

    // Add to favorites
    const { error } = await supabase.from("user_favorites").insert({
      user_id: user.id,
      perfume_data: perfume,
    })

    if (error) {
      throw new Error("فشل في إضافة العطر للمفضلة")
    }

    revalidatePath("/dashboard/favorites")
    return { success: true, message: "تم إضافة العطر للمفضلة بنجاح" }
  } catch (error) {
    console.error("Error adding to favorites:", error)
    return {
      success: false,
      message: error instanceof Error ? error.message : "حدث خطأ غير متوقع",
    }
  }
}

export async function submitFeedback(
  recommendationId: string,
  perfumeId: string,
  feedbackType: "like" | "dislike" | "not_interested" | "purchased",
  rating?: number,
  notes?: string,
): Promise<{ success: boolean; message: string }> {
  try {
    const supabase = await createClient()

    // Get current user
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser()
    if (userError || !user) {
      throw new Error("يجب تسجيل الدخول أولاً")
    }

    // Upsert feedback
    const { error } = await supabase.from("recommendation_feedback").upsert(
      {
        user_id: user.id,
        recommendation_id: recommendationId,
        perfume_id: perfumeId,
        feedback_type: feedbackType,
        rating,
        notes,
      },
      {
        onConflict: "user_id,recommendation_id,perfume_id",
      },
    )

    if (error) {
      throw new Error("فشل في حفظ التقييم")
    }

    return { success: true, message: "تم حفظ تقييمك بنجاح" }
  } catch (error) {
    console.error("Error submitting feedback:", error)
    return {
      success: false,
      message: error instanceof Error ? error.message : "حدث خطأ غير متوقع",
    }
  }
}

export async function getRecommendationHistory(): Promise<RecommendationHistory[]> {
  try {
    const supabase = await createClient()

    // Get current user
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser()
    if (userError || !user) {
      return []
    }

    const { data, error } = await supabase
      .from("recommendations")
      .select("id, preferences, recommendations, created_at")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .limit(10)

    if (error) {
      console.error("Error fetching history:", error)
      return []
    }

    return data || []
  } catch (error) {
    console.error("Error getting recommendation history:", error)
    return []
  }
}

export async function deleteRecommendationHistory(historyId: string): Promise<{ success: boolean; message: string }> {
  try {
    const supabase = await createClient()

    // Get current user
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser()
    if (userError || !user) {
      throw new Error("يجب تسجيل الدخول أولاً")
    }

    const { error } = await supabase.from("recommendations").delete().eq("id", historyId).eq("user_id", user.id)

    if (error) {
      throw new Error("فشل في حذف السجل")
    }

    revalidatePath("/dashboard/recommendations")
    return { success: true, message: "تم حذف السجل بنجاح" }
  } catch (error) {
    console.error("Error deleting history:", error)
    return {
      success: false,
      message: error instanceof Error ? error.message : "حدث خطأ غير متوقع",
    }
  }
}
