"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { useTranslation } from "@/lib/translations/context"

export default function PrivacyPage() {
  const { language } = useTranslation()

  const translations = {
    ar: {
      title: "سياسة الخصوصية",
      subtitle: "نحن نحترم خصوصيتك ونلتزم بحماية بياناتك الشخصية",

      // Sections
      dataCollection: "جمع المعلومات",
      dataCollectionDesc: "نقوم بجمع المعلومات التالية عند استخدامك لمنصة عُطوري:",
      dataCollectionList: [
        "المعلومات الشخصية مثل الاسم والبريد الإلكتروني",
        "تفضيلات العطور والبحث",
        "الصور التي ترفعها للبحث بالصورة",
        "معلومات الاستخدام وسجل التصفح",
      ],

      dataUsage: "استخدام المعلومات",
      dataUsageDesc: "نستخدم المعلومات المجمعة للأغراض التالية:",
      dataUsageList: [
        "تقديم خدمات البحث والتوصيات المخصصة",
        "تحسين تجربة المستخدم وجودة الخدمة",
        "التواصل معك بخصوص الخدمة والتحديثات",
        "تحليل استخدام المنصة لتطوير ميزات جديدة",
      ],

      dataProtection: "حماية البيانات",
      dataProtectionDesc:
        "نتخذ إجراءات أمنية صارمة لحماية بياناتك الشخصية من الوصول غير المصرح به أو التعديل أو الكشف أو التدمير. نستخدم تقنيات التشفير المتقدمة وبروتوكولات الأمان المعتمدة عالمياً.",

      dataSharing: "مشاركة المعلومات",
      dataSharingDesc:
        "لا نقوم ببيع أو تأجير أو مشاركة معلوماتك الشخصية مع أطراف ثالثة إلا في الحالات التالية: الحصول على موافقتك الصريحة، الامتثال للقوانين واللوائح، أو حماية حقوقنا القانونية.",

      cookies: "ملفات تعريف الارتباط",
      cookiesDesc:
        "نستخدم ملفات تعريف الارتباط (Cookies) لتحسين تجربتك على الموقع وتذكر تفضيلاتك. يمكنك إدارة إعدادات ملفات تعريف الارتباط من خلال متصفحك.",

      userRights: "حقوقك",
      userRightsDesc: "لديك الحق في:",
      userRightsList: [
        "الوصول إلى بياناتك الشخصية",
        "تصحيح أو تحديث معلوماتك",
        "حذف حسابك وبياناتك",
        "الاعتراض على معالجة بياناتك",
        "نقل بياناتك إلى خدمة أخرى",
      ],

      updates: "التحديثات",
      updatesDesc:
        "قد نقوم بتحديث سياسة الخصوصية هذه من وقت لآخر. سنقوم بإشعارك بأي تغييرات جوهرية عبر البريد الإلكتروني أو إشعار على الموقع.",

      contact: "التواصل",
      contactDesc: "إذا كان لديك أي أسئلة حول سياسة الخصوصية هذه، يرجى التواصل معنا على:",
      email: "البريد الإلكتروني: info@otouri.com",
      phone: "الهاتف: +966 123 456 789",

      lastUpdated: "آخر تحديث: يناير 2025",
    },
    en: {
      title: "Privacy Policy",
      subtitle: "We respect your privacy and are committed to protecting your personal data",

      // Sections
      dataCollection: "Information Collection",
      dataCollectionDesc: "We collect the following information when you use the Otouri platform:",
      dataCollectionList: [
        "Personal information such as name and email",
        "Perfume preferences and search history",
        "Images you upload for image search",
        "Usage information and browsing history",
      ],

      dataUsage: "Information Usage",
      dataUsageDesc: "We use the collected information for the following purposes:",
      dataUsageList: [
        "Providing search services and personalized recommendations",
        "Improving user experience and service quality",
        "Communicating with you about the service and updates",
        "Analyzing platform usage to develop new features",
      ],

      dataProtection: "Data Protection",
      dataProtectionDesc:
        "We take strict security measures to protect your personal data from unauthorized access, modification, disclosure, or destruction. We use advanced encryption technologies and globally recognized security protocols.",

      dataSharing: "Information Sharing",
      dataSharingDesc:
        "We do not sell, rent, or share your personal information with third parties except in the following cases: obtaining your explicit consent, complying with laws and regulations, or protecting our legal rights.",

      cookies: "Cookies",
      cookiesDesc:
        "We use cookies to improve your experience on the site and remember your preferences. You can manage cookie settings through your browser.",

      userRights: "Your Rights",
      userRightsDesc: "You have the right to:",
      userRightsList: [
        "Access your personal data",
        "Correct or update your information",
        "Delete your account and data",
        "Object to processing your data",
        "Transfer your data to another service",
      ],

      updates: "Updates",
      updatesDesc:
        "We may update this privacy policy from time to time. We will notify you of any material changes via email or notice on the site.",

      contact: "Contact",
      contactDesc: "If you have any questions about this privacy policy, please contact us at:",
      email: "Email: info@otouri.com",
      phone: "Phone: +966 123 456 789",

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
                <h2 className="text-2xl font-bold text-sage-800 mb-4">{t.dataCollection}</h2>
                <p className="text-sage-600 leading-relaxed mb-4">{t.dataCollectionDesc}</p>
                <ul className="list-disc list-inside text-sage-600 space-y-2">
                  {t.dataCollectionList.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-sage-800 mb-4">{t.dataUsage}</h2>
                <p className="text-sage-600 leading-relaxed mb-4">{t.dataUsageDesc}</p>
                <ul className="list-disc list-inside text-sage-600 space-y-2">
                  {t.dataUsageList.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-sage-800 mb-4">{t.dataProtection}</h2>
                <p className="text-sage-600 leading-relaxed">{t.dataProtectionDesc}</p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-sage-800 mb-4">{t.dataSharing}</h2>
                <p className="text-sage-600 leading-relaxed">{t.dataSharingDesc}</p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-sage-800 mb-4">{t.cookies}</h2>
                <p className="text-sage-600 leading-relaxed">{t.cookiesDesc}</p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-sage-800 mb-4">{t.userRights}</h2>
                <p className="text-sage-600 leading-relaxed mb-4">{t.userRightsDesc}</p>
                <ul className="list-disc list-inside text-sage-600 space-y-2">
                  {t.userRightsList.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-sage-800 mb-4">{t.updates}</h2>
                <p className="text-sage-600 leading-relaxed">{t.updatesDesc}</p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-sage-800 mb-4">{t.contact}</h2>
                <p className="text-sage-600 leading-relaxed">
                  {t.contactDesc}
                  <br />
                  {t.email}
                  <br />
                  {t.phone}
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
