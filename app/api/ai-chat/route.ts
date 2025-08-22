import { checkAndConsumeCredits } from "@/app/dashboard/subscription/actions"
import type { NextRequest } from "next/server"

// Detailed system prompt for perfume expertise
const PERFUME_EXPERT_PROMPT = `
أنت مستشار عطور خبير يُدعى "عطوري AI" في متجر عطوري للعطور الفاخرة. أنت متخصص في العطور العربية والعالمية وتمتلك معرفة واسعة بالعطور وتركيباتها ونوتاتها وخصائصها.

معلومات أساسية عن العطور:
1. تصنيفات العطور: شرقية، خشبية، زهرية، فواكه، حمضية، أروماتية، فوجير، شيبر، جلدية، عنبرية.
2. تركيز العطر: بارفان (Parfum/Extrait) 20-30%، أو دو بارفان (EDP) 15-20%، أو دو تواليت (EDT) 5-15%، أو دو كولون (EDC) 2-4%.
3. نوتات العطر: علوية (تُشم فور الرش وتدوم 15 دقيقة)، وسطى (تظهر بعد 30 دقيقة وتدوم ساعات)، قاعدية (تظهر بعد ساعات وتدوم أيام).
4. الثبات: ممتاز (أكثر من 12 ساعة)، جيد جدًا (8-12 ساعة)، جيد (6-8 ساعات)، متوسط (4-6 ساعات)، ضعيف (أقل من 4 ساعات).
5. الفوحان: قوي جدًا، قوي، متوسط، خفيف، خفيف جدًا.

مكونات شائعة في العطور العربية:
- العود: غني، دافئ، خشبي، دخاني
- المسك: حلو، دافئ، حيواني
- العنبر: دافئ، حلو، بلسمي
- الورد الطائفي: زهري، غني، عميق
- الزعفران: توابل، دافئ، أرضي
- البخور (اللبان): دخاني، راتنجي، صنوبري
- الهيل: توابل، منعش، خشبي

مكونات شائعة في العطور الغربية:
- البرغموت: حمضي، منعش
- اللافندر: أروماتي، عشبي، منعش
- الفانيليا: حلو، دافئ، بلسمي
- الباتشولي: أرضي، خشبي، دخاني
- الفيتيفر: خشبي، أرضي، دخاني
- الياسمين: زهري، غني، حلو
- خشب الصندل: خشبي، كريمي، دافئ

عند تقديم توصيات:
1. اسأل عن تفضيلات المستخدم: الجنس، المناسبة، الموسم، نوع الرائحة المفضلة، الميزانية.
2. قدم 2-3 خيارات مناسبة مع وصف تفصيلي لكل عطر.
3. اشرح سبب اختيارك لهذه العطور بناءً على تفضيلات المستخدم.
4. قدم معلومات عن النوتات الرئيسية، الثبات، الفوحان، والمناسبات المثالية.
5. كن دقيقًا في المعلومات التقنية وتجنب المبالغة.

أسلوبك:
1. ودود ومهذب ومتحمس للعطور.
2. تستخدم لغة عربية فصيحة سهلة الفهم.
3. تقدم إجابات مفصلة ولكن مختصرة.
4. تتجنب الإطالة غير الضرورية.
5. تستخدم مصطلحات تقنية عند الحاجة مع شرح بسيط لها.
6. تراعي الثقافة العربية والإسلامية في توصياتك.

تذكر أن هدفك هو مساعدة العملاء في العثور على العطر المثالي الذي يناسب شخصيتهم وتفضيلاتهم ومناسباتهم.
`

export const maxDuration = 30

export async function POST(req: NextRequest) {
  try {
    // Check and consume credits before processing
    const creditCheck = await checkAndConsumeCredits("ai_chat", 1)

    if (!creditCheck.success) {
      return new Response(
        JSON.stringify({
          error: creditCheck.error || "Credit limit exceeded",
          remainingCredits: creditCheck.remainingCredits,
        }),
        {
          status: 429,
          headers: {
            "Content-Type": "application/json",
          },
        },
      )
    }

    const { messages } = await req.json()

    // Ensure messages is an array
    if (!Array.isArray(messages)) {
      return new Response(JSON.stringify({ error: "Messages must be an array" }), {
        status: 400,
        headers: {
          "Content-Type": "application/json",
        },
      })
    }

    // Add system message if it's the first message from user
    const chatMessages =
      messages.length === 1 && messages[0].role === "user"
        ? [{ role: "system", content: PERFUME_EXPERT_PROMPT }, ...messages]
        : messages

    // Direct OpenAI API call
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o",
        messages: chatMessages,
        temperature: 0.7,
        max_tokens: 1000,
        stream: true,
      }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error(`OpenAI API error: ${response.status} - ${errorText}`)
      return new Response(JSON.stringify({ error: `OpenAI API error: ${response.status}` }), {
        status: response.status,
        headers: {
          "Content-Type": "application/json",
        },
      })
    }

    // Create a readable stream for the response
    const encoder = new TextEncoder()
    const decoder = new TextDecoder()

    const stream = new ReadableStream({
      async start(controller) {
        const reader = response.body?.getReader()
        if (!reader) {
          controller.close()
          return
        }

        try {
          while (true) {
            const { done, value } = await reader.read()
            if (done) {
              controller.close()
              break
            }

            const chunk = decoder.decode(value, { stream: true })
            const lines = chunk.split("\n")

            for (const line of lines) {
              if (line.startsWith("data: ")) {
                const data = line.slice(6).trim()
                if (data === "[DONE]") {
                  controller.close()
                  return
                }

                try {
                  const parsed = JSON.parse(data)
                  const content = parsed.choices?.[0]?.delta?.content
                  if (content) {
                    controller.enqueue(encoder.encode(content))
                  }
                } catch (e) {
                  // Skip invalid JSON
                  continue
                }
              }
            }
          }
        } catch (error) {
          console.error("Stream error:", error)
          controller.error(error)
        } finally {
          reader.releaseLock()
        }
      },
    })

    return new Response(stream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    })
  } catch (error) {
    console.error("Error in AI chat route:", error)
    return new Response(JSON.stringify({ error: "Failed to process request" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    })
  }
}

// Handle OPTIONS request for CORS
export async function OPTIONS(req: NextRequest) {
  return new Response(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  })
}
