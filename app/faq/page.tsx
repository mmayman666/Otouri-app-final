"use client"

import Header from "@/components/header"
import Footer from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronDown } from "lucide-react"
import { useTranslation } from "@/lib/translations/context"

const translations = {
  ar: {
    title: "الأسئلة الشائعة",
    subtitle: "إجابات على أكثر الأسئلة شيوعاً حول منصة عُطوري",
    notFoundTitle: "لم تجد إجابة لسؤالك؟",
    notFoundText: "تواصل معنا وسنكون سعداء لمساعدتك",
    contactUs: "تواصل معنا",
    faqs: [
      {
        question: "ما هي منصة عُطوري؟",
        answer:
          "عُطوري هي منصة ذكية تساعدك في اكتشاف العطور المثالية من خلال تقنيات الذكاء الاصطناعي والبحث بالنص أو الصورة.",
      },
      {
        question: "كيف يعمل البحث بالصورة؟",
        answer:
          "يمكنك رفع صورة لعطر أو زجاجة عطر، وسيقوم نظامنا الذكي بتحليل الصورة وتقديم توصيات مشابهة أو معلومات عن العطر.",
      },
      {
        question: "هل الخدمة مجانية؟",
        answer: "نعم، نقدم خطة مجانية تتضمن عدد محدود من عمليات البحث شهرياً. كما نوفر خطة مميزة للاستخدام المكثف.",
      },
      {
        question: "كيف يمكنني الحصول على توصيات مخصصة؟",
        answer: "بعد إنشاء حساب، يمكنك ملء استبيان التفضيلات الشخصية وسيقوم نظامنا بتقديم توصيات مخصصة بناءً على ذوقك.",
      },
      {
        question: "هل يمكنني حفظ العطور المفضلة؟",
        answer: "نعم، يمكنك إنشاء قائمة مفضلة شخصية وحفظ العطور التي تعجبك للرجوع إليها لاحقاً.",
      },
      {
        question: "كيف يمكنني التواصل مع الدعم الفني؟",
        answer: "يمكنك التواصل معنا عبر البريد الإلكتروني info@otouri.com أو من خلال نموذج الاتصال في الموقع.",
      },
      {
        question: "هل تدعم المنصة اللغة العربية؟",
        answer: "نعم، المنصة مصممة خصيصاً للمستخدمين العرب وتدعم اللغة العربية بالكامل.",
      },
      {
        question: "كم عدد العطور في قاعدة البيانات؟",
        answer: "تحتوي قاعدة بياناتنا على أكثر من 10,000 عطر من مختلف العلامات التجارية العالمية والمحلية.",
      },
    ],
  },
  en: {
    title: "Frequently Asked Questions",
    subtitle: "Answers to the most common questions about the Otouri platform",
    notFoundTitle: "Didn't find an answer to your question?",
    notFoundText: "Contact us and we'll be happy to help you",
    contactUs: "Contact Us",
    faqs: [
      {
        question: "What is the Otouri platform?",
        answer:
          "Otouri is a smart platform that helps you discover perfect perfumes through artificial intelligence technologies and text or image search.",
      },
      {
        question: "How does image search work?",
        answer:
          "You can upload an image of a perfume or perfume bottle, and our smart system will analyze the image and provide similar recommendations or information about the perfume.",
      },
      {
        question: "Is the service free?",
        answer:
          "Yes, we offer a free plan that includes a limited number of searches per month. We also provide a premium plan for intensive use.",
      },
      {
        question: "How can I get personalized recommendations?",
        answer:
          "After creating an account, you can fill out a personal preferences questionnaire and our system will provide personalized recommendations based on your taste.",
      },
      {
        question: "Can I save favorite perfumes?",
        answer: "Yes, you can create a personal favorites list and save perfumes you like to refer to later.",
      },
      {
        question: "How can I contact technical support?",
        answer: "You can contact us via email at info@otouri.com or through the contact form on the website.",
      },
      {
        question: "Does the platform support Arabic language?",
        answer: "Yes, the platform is designed specifically for Arab users and fully supports the Arabic language.",
      },
      {
        question: "How many perfumes are in the database?",
        answer: "Our database contains more than 10,000 perfumes from various international and local brands.",
      },
    ],
  },
}

export default function FAQPage() {
  const { language } = useTranslation()
  const t = translations[language]

  return (
    <div className="min-h-screen bg-gradient-to-br from-sage-50 to-mint-50">
      <Header />

      <main className="container py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-sage-800 mb-4">{t.title}</h1>
            <p className="text-lg text-sage-600">{t.subtitle}</p>
          </div>

          <div className="space-y-4">
            {t.faqs.map((faq, index) => (
              <Card key={index} className="border border-sage-200 hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <details className="group">
                    <summary className="flex items-center justify-between cursor-pointer list-none">
                      <h3 className="text-lg font-semibold text-sage-800 group-open:text-mint-600">{faq.question}</h3>
                      <ChevronDown className="h-5 w-5 text-sage-500 group-open:rotate-180 transition-transform" />
                    </summary>
                    <div className="mt-4 pt-4 border-t border-sage-100">
                      <p className="text-sage-600 leading-relaxed">{faq.answer}</p>
                    </div>
                  </details>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Card className="bg-mint-50 border-mint-200">
              <CardContent className="p-8">
                <h3 className="text-xl font-bold text-sage-800 mb-4">{t.notFoundTitle}</h3>
                <p className="text-sage-600 mb-6">{t.notFoundText}</p>
                <a
                  href="mailto:info@otouri.com"
                  className="inline-flex items-center px-6 py-3 bg-mint-500 text-white rounded-lg hover:bg-mint-600 transition-colors"
                >
                  {t.contactUs}
                </a>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
