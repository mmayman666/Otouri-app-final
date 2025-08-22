"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { useTranslation } from "@/lib/translations/context"

export default function TermsPage() {
  const { language } = useTranslation()

  const translations = {
    ar: {
      title: "شروط الاستخدام",
      subtitle: "الشروط والأحكام التي تحكم استخدام منصة عُطوري",

      // Sections
      acceptTerms: "قبول الشروط",
      acceptTermsDesc:
        "باستخدامك لمنصة عُطوري، فإنك توافق على الالتزام بهذه الشروط والأحكام. إذا كنت لا توافق على أي من هذه الشروط، يرجى عدم استخدام الخدمة.",

      serviceDescription: "وصف الخدمة",
      serviceDescriptionDesc: "عُطوري هي منصة إلكترونية تقدم الخدمات التالية:",
      serviceList: [
        "البحث عن العطور بالنص أو الصورة",
        "توصيات مخصصة للعطور",
        "قاعدة بيانات شاملة للعطور",
        "استشارات ذكية باستخدام الذكاء الاصطناعي",
      ],

      registration: "التسجيل والحساب",
      registrationDesc: "عند إنشاء حساب، يجب عليك:",
      registrationList: [
        "تقديم معلومات صحيحة ومحدثة",
        "الحفاظ على سرية كلمة المرور",
        "إشعارنا فوراً بأي استخدام غير مصرح به لحسابك",
        "تحمل المسؤولية عن جميع الأنشطة في حسابك",
      ],

      acceptableUse: "الاستخدام المقبول",
      acceptableUseDesc: "يُحظر عليك:",
      acceptableUseList: [
        "استخدام الخدمة لأغراض غير قانونية",
        "رفع محتوى مسيء أو ضار أو غير لائق",
        "محاولة اختراق أو تعطيل النظام",
        "انتهاك حقوق الملكية الفكرية",
        "إنشاء حسابات متعددة بطريقة احتيالية",
      ],

      intellectualProperty: "الملكية الفكرية",
      intellectualPropertyDesc:
        "جميع المحتويات والتقنيات والتصاميم الموجودة في منصة عُطوري محمية بحقوق الطبع والنشر وحقوق الملكية الفكرية. لا يحق لك نسخ أو توزيع أو تعديل أي محتوى دون إذن كتابي مسبق.",

      subscriptionsPayment: "الاشتراكات والدفع",
      subscriptionsPaymentDesc: "بخصوص الخطط المدفوعة:",
      subscriptionsPaymentList: [
        "الرسوم مستحقة الدفع مقدماً",
        "لا توجد استردادات إلا في حالات استثنائية",
        "يمكن إلغاء الاشتراك في أي وقت",
        "الأسعار قابلة للتغيير مع إشعار مسبق",
      ],

      disclaimer: "إخلاء المسؤولية",
      disclaimerDesc:
        'الخدمة مقدمة "كما هي" دون أي ضمانات. لا نتحمل المسؤولية عن أي أضرار مباشرة أو غير مباشرة قد تنتج عن استخدام الخدمة. التوصيات المقدمة هي لأغراض إرشادية فقط.',

      termination: "إنهاء الخدمة",
      terminationDesc:
        "يحق لنا إنهاء أو تعليق حسابك في حالة انتهاك هذه الشروط. يمكنك أيضاً إنهاء حسابك في أي وقت من خلال إعدادات الحساب أو التواصل معنا.",

      governingLaw: "القانون المطبق",
      governingLawDesc:
        "تخضع هذه الشروط لقوانين المملكة العربية السعودية. أي نزاع ينشأ عن استخدام الخدمة سيتم حله وفقاً للقوانين السعودية.",

      modifications: "تعديل الشروط",
      modificationsDesc:
        "نحتفظ بالحق في تعديل هذه الشروط في أي وقت. سيتم إشعارك بأي تغييرات جوهرية عبر البريد الإلكتروني أو إشعار على الموقع. استمر��رك في استخدام الخدمة يعني موافقتك على الشروط المحدثة.",

      contact: "التواصل",
      contactDesc: "لأي استفسارات حول شروط الاستخدام، يرجى التواصل معنا:",
      email: "البريد الإلكتروني: info@otouri.com",
      phone: "الهاتف: +966 123 456 789",
      address: "العنوان: الرياض، المملكة العربية السعودية",

      lastUpdated: "آخر تحديث: يناير 2025",
    },
    en: {
      title: "Terms of Use",
      subtitle: "Terms and conditions governing the use of the Otouri platform",

      // Sections
      acceptTerms: "Acceptance of Terms",
      acceptTermsDesc:
        "By using the Otouri platform, you agree to comply with these terms and conditions. If you do not agree to any of these terms, please do not use the service.",

      serviceDescription: "Service Description",
      serviceDescriptionDesc: "Otouri is an electronic platform that provides the following services:",
      serviceList: [
        "Search for perfumes by text or image",
        "Personalized perfume recommendations",
        "Comprehensive perfume database",
        "Smart consultations using artificial intelligence",
      ],

      registration: "Registration and Account",
      registrationDesc: "When creating an account, you must:",
      registrationList: [
        "Provide accurate and updated information",
        "Maintain password confidentiality",
        "Notify us immediately of any unauthorized use of your account",
        "Take responsibility for all activities in your account",
      ],

      acceptableUse: "Acceptable Use",
      acceptableUseDesc: "You are prohibited from:",
      acceptableUseList: [
        "Using the service for illegal purposes",
        "Uploading offensive, harmful, or inappropriate content",
        "Attempting to hack or disable the system",
        "Violating intellectual property rights",
        "Creating multiple accounts fraudulently",
      ],

      intellectualProperty: "Intellectual Property",
      intellectualPropertyDesc:
        "All content, technologies, and designs on the Otouri platform are protected by copyright and intellectual property rights. You may not copy, distribute, or modify any content without prior written permission.",

      subscriptionsPayment: "Subscriptions and Payment",
      subscriptionsPaymentDesc: "Regarding paid plans:",
      subscriptionsPaymentList: [
        "Fees are due in advance",
        "No refunds except in exceptional cases",
        "Subscription can be canceled at any time",
        "Prices are subject to change with prior notice",
      ],

      disclaimer: "Disclaimer",
      disclaimerDesc:
        'The service is provided "as is" without any warranties. We are not responsible for any direct or indirect damages that may result from using the service. The recommendations provided are for guidance purposes only.',

      termination: "Service Termination",
      terminationDesc:
        "We have the right to terminate or suspend your account in case of violation of these terms. You can also terminate your account at any time through account settings or by contacting us.",

      governingLaw: "Governing Law",
      governingLawDesc:
        "These terms are subject to the laws of the Kingdom of Saudi Arabia. Any dispute arising from the use of the service will be resolved according to Saudi laws.",

      modifications: "Terms Modification",
      modificationsDesc:
        "We reserve the right to modify these terms at any time. You will be notified of any material changes via email or notice on the site. Your continued use of the service means your agreement to the updated terms.",

      contact: "Contact",
      contactDesc: "For any inquiries about the terms of use, please contact us:",
      email: "Email: info@otouri.com",
      phone: "Phone: +966 123 456 789",
      address: "Address: Riyadh, Kingdom of Saudi Arabia",

      lastUpdated: "Last updated: January 2025",
    },
  }

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

          <Card className="border border-sage-200">
            <CardContent className="p-8 space-y-8">
              <section>
                <h2 className="text-2xl font-bold text-sage-800 mb-4">{t.acceptTerms}</h2>
                <p className="text-sage-600 leading-relaxed">{t.acceptTermsDesc}</p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-sage-800 mb-4">{t.serviceDescription}</h2>
                <p className="text-sage-600 leading-relaxed mb-4">{t.serviceDescriptionDesc}</p>
                <ul className="list-disc list-inside text-sage-600 space-y-2">
                  {t.serviceList.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-sage-800 mb-4">{t.registration}</h2>
                <p className="text-sage-600 leading-relaxed mb-4">{t.registrationDesc}</p>
                <ul className="list-disc list-inside text-sage-600 space-y-2">
                  {t.registrationList.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-sage-800 mb-4">{t.acceptableUse}</h2>
                <p className="text-sage-600 leading-relaxed mb-4">{t.acceptableUseDesc}</p>
                <ul className="list-disc list-inside text-sage-600 space-y-2">
                  {t.acceptableUseList.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-sage-800 mb-4">{t.intellectualProperty}</h2>
                <p className="text-sage-600 leading-relaxed">{t.intellectualPropertyDesc}</p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-sage-800 mb-4">{t.subscriptionsPayment}</h2>
                <p className="text-sage-600 leading-relaxed mb-4">{t.subscriptionsPaymentDesc}</p>
                <ul className="list-disc list-inside text-sage-600 space-y-2">
                  {t.subscriptionsPaymentList.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-sage-800 mb-4">{t.disclaimer}</h2>
                <p className="text-sage-600 leading-relaxed">{t.disclaimerDesc}</p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-sage-800 mb-4">{t.termination}</h2>
                <p className="text-sage-600 leading-relaxed">{t.terminationDesc}</p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-sage-800 mb-4">{t.governingLaw}</h2>
                <p className="text-sage-600 leading-relaxed">{t.governingLawDesc}</p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-sage-800 mb-4">{t.modifications}</h2>
                <p className="text-sage-600 leading-relaxed">{t.modificationsDesc}</p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-sage-800 mb-4">{t.contact}</h2>
                <p className="text-sage-600 leading-relaxed">
                  {t.contactDesc}
                  <br />
                  {t.email}
                  <br />
                  {t.phone}
                  <br />
                  {t.address}
                </p>
              </section>

              <div className="text-center pt-8 border-t border-sage-200">
                <p className="text-sm text-sage-500">{t.lastUpdated}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  )
}
