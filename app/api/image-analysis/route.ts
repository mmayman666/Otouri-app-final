import { type NextRequest, NextResponse } from "next/server"
import OpenAI from "openai"
import { checkAndConsumeCredits } from "@/app/dashboard/subscription/actions"

// Initialize the OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(request: NextRequest) {
  try {
    // Get the form data from the request
    const formData = await request.formData()
    const imageFile = formData.get("image") as File | null

    if (!imageFile) {
      return NextResponse.json({ error: "No image file provided" }, { status: 400 })
    }

    // Check and consume credits
    try {
      const creditCheck = await checkAndConsumeCredits("image_search", 1)
      if (!creditCheck.success) {
        return NextResponse.json(
          {
            error: creditCheck.error || "تم تجاوز حد عمليات البحث المسموحة",
            remainingCredits: creditCheck.remainingCredits,
          },
          { status: 429 },
        )
      }
    } catch (error) {
      console.error("Credit check failed:", error)
      return NextResponse.json({ error: "فشل في التحقق من الرصيد المتاح" }, { status: 500 })
    }

    // Convert the file to a base64 string
    const bytes = await imageFile.arrayBuffer()
    const buffer = Buffer.from(bytes)
    const base64Image = buffer.toString("base64")
    const dataURI = `data:${imageFile.type};base64,${base64Image}`

    // Call OpenAI API with the enhanced vision prompt
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: `أنت خبير عالمي متخصص في تحليل عطور الفاخرة والنيشة مع خبرة واسعة في العطور العربية والخليجية والعالمية. لديك معرفة عميقة بـ:

1. العطور العربية التراثية والحديثة (عود، عنبر، مسك، ورد طائفي، دهن العود)
2. العطور الخليجية الفاخرة (عجمان، راسي، امواج، العربية للعود)
3. العطور الفرنسية الكلاسيكية (شانيل، ديور، تام فورد، كريد)
4. العطور النيشة والبوتيك (مايزون فرانسيس كيركجان، برد دو بارفيوم، ناسوماتو)
5. العطور الجديدة والإصدارات المحدودة

عند تحليل صورة عبوة العطر، قم بما يلي:

INSTRUCTIONS:
- فحص دقيق للعبوة، الشكل، اللون، التصميم، والنصوص
- تحديد العلامة التجارية من اللوجو أو التصميم المميز
- تحليل شكل الزجاجة والغطاء للتعرف على النوع
- قراءة أي نصوص مرئية على العبوة
- استنتاج النوتات العطرية من التصميم والهوية البصرية للعطر
- تقدير مستوى الثقة بناء على وضوح التفاصيل في الصورة

ANALYSIS REQUIREMENTS:
- إذا كان العطر عربي/خليجي: ركز على النوتات التراثية والخشبية
- إذا كان غربي: حدد الفئة العطرية (زهري، خشبي، شرقي، فواكه، أكوا)
- قدم أسماء عطور مشابهة موجودة فعلياً في السوق
- استخدم مستوى ثقة واقعي (60-95%) حسب وضوح الصورة

OUTPUT FORMAT (JSON only):
{
  "perfumeName": "الاسم الكامل للعطر بالعربية",
  "brand": "اسم الماركة",
  "type": "النوع (شرقي/خشبي/زهري/فواكه/أكوا/عود/مسك)",
  "confidence": 85,
  "notes": ["النوتة العلوية الأولى", "النوتة العلوية الثانية", "النوتة الوسطى الأولى", "النوتة الوسطى الثانية", "النوتة القاعدية الأولى", "النوتة القاعدية الثانية"],
  "description": "وصف مختصر للعطر وشخصيته العطرية وأفضل أوقات استخدامه",
  "occasions": ["المناسبة الأولى", "المناسبة الثانية", "المناسبة الثالثة"],
  "longevity": "8-10 ساعات",
  "sillage": "قوي",
  "gender": "رجالي/نسائي/يونيسكس",
  "price_range": "250-400 ريال",
  "availability": "متوفر",
  "similar": [
    {
      "name": "اسم العطر المشابه الأول",
      "brand": "اسم الماركة",
      "similarity": "85%",
      "price": "300 ريال",
      "image": "/placeholder.svg?height=150&width=150&text=عطر1"
    },
    {
      "name": "اسم العطر المشابه الثاني", 
      "brand": "اسم الماركة",
      "similarity": "82%",
      "price": "275 ريال",
      "image": "/placeholder.svg?height=150&width=150&text=عطر2"
    },
    {
      "name": "اسم العطر المشابه الثالث",
      "brand": "اسم الماركة", 
      "similarity": "78%",
      "price": "350 ريال",
      "image": "/placeholder.svg?height=150&width=150&text=عطر3"
    }
  ]
}

IMPORTANT: Return ONLY the JSON object, no markdown formatting or additional text.`,
        },
        {
          role: "user",
          content: [
            {
              type: "text",
              text: "قم بتحليل هذه الصورة لعبوة العطر بدقة عالية. حدد نوع العطر والماركة والنوتات العطرية والعطور المشابهة. كن دقيقاً في التحليل واستخدم خبرتك الواسعة في عالم العطور العربية والعالمية.",
            },
            { type: "image_url", image_url: { url: dataURI } },
          ],
        },
      ],
      max_tokens: 1500,
      temperature: 0.3,
    })

    // Parse the JSON response with error handling
    let result
    try {
      const content = response.choices[0].message.content || "{}"

      // Remove any potential markdown formatting
      const cleanContent = content
        .replace(/```json\s*/g, "")
        .replace(/```\s*/g, "")
        .trim()

      result = JSON.parse(cleanContent)

      // Validate the response structure
      if (!result.perfumeName || !result.brand || !result.confidence) {
        throw new Error("Invalid response structure")
      }
    } catch (parseError) {
      console.error("Failed to parse AI response:", parseError)

      // Fallback response in case of parsing errors
      result = {
        perfumeName: "عطر غير محدد",
        brand: "ماركة غير محددة",
        type: "غير محدد",
        confidence: 50,
        notes: ["نوتات متنوعة"],
        description: "لم يتم التعرف على العطر بدقة من الصورة المرفوعة",
        occasions: ["مناسبات متنوعة"],
        longevity: "غير محدد",
        sillage: "متوسط",
        gender: "يونيسكس",
        price_range: "غير محدد",
        availability: "غير محدد",
        similar: [
          {
            name: "عطر مشابه 1",
            brand: "ماركة متنوعة",
            similarity: "غير محدد",
            price: "غير محدد",
            image: "/placeholder.svg?height=150&width=150&text=عطر",
          },
        ],
      }
    }

    return NextResponse.json(result)
  } catch (error) {
    console.error("Error analyzing image:", error)
    return NextResponse.json(
      {
        error: "فشل في تحليل الصورة. يرجى المحاولة مرة أخرى أو استخدام صورة أوضح.",
      },
      { status: 500 },
    )
  }
}
