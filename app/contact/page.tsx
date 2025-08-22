"use client"

import type React from "react"

import { useState } from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Mail, Phone, MapPin, Clock, Send } from "lucide-react"
import { useTranslation } from "@/lib/translations/context"

const translations = {
  ar: {
    title: "اتصل بنا",
    subtitle: "نحن هنا لمساعدتك. تواصل معنا وسنكون سعداء للإجابة على استفساراتك",
    sendMessage: "أرسل لنا رسالة",
    fullName: "الاسم الكامل",
    email: "البريد الإلكتروني",
    subject: "الموضوع",
    message: "الرسالة",
    sendButton: "إرسال الرسالة",
    contactInfo: "معلومات التواصل",
    emailLabel: "البريد الإلكتروني",
    emailValue: "support@otouri.com",
    phoneLabel: "الهاتف",
    phoneValue: "+966 11 123 4567",
    addressLabel: "العنوان",
    addressValue: "الرياض، المملكة العربية السعودية",
    workingHoursLabel: "ساعات العمل",
    workingHoursValue: "الأحد - الخميس: 9:00 ص - 6:00 م",
    quickSupport: "الدعم السريع",
    quickSupportText: "هل تحتاج مساعدة فورية؟ تحقق من الأسئلة الشائعة أو تواصل معنا مباشرة",
    faq: "الأسئلة الشائعة",
    startNow: "ابدأ الآن",
  },
  en: {
    title: "Contact Us",
    subtitle: "We are here to help you. Contact us and we will be happy to answer your questions",
    sendMessage: "Send Us a Message",
    fullName: "Full Name",
    email: "Email",
    subject: "Subject",
    message: "Message",
    sendButton: "Send Message",
    contactInfo: "Contact Information",
    emailLabel: "Email",
    emailValue: "support@otouri.com",
    phoneLabel: "Phone",
    phoneValue: "+966 11 123 4567",
    addressLabel: "Address",
    addressValue: "Riyadh, Saudi Arabia",
    workingHoursLabel: "Working Hours",
    workingHoursValue: "Sunday - Thursday: 9:00 AM - 6:00 PM",
    quickSupport: "Quick Support",
    quickSupportText: "Need immediate help? Check our FAQ or contact us directly",
    faq: "FAQ",
    startNow: "Start Now",
  },
}

export default function ContactPage() {
  const { language } = useTranslation()
  const t = translations[language]

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Redirect to signup for now
    window.location.href = "/auth/signup"
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-sage-50 via-white to-mint-50">
      <Header />

      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-r from-sage-100 to-mint-100">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-sage-800 mb-6">{t.title}</h1>
            <p className="text-xl text-sage-600 max-w-2xl mx-auto">{t.subtitle}</p>
          </div>
        </section>

        {/* Contact Content */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <div>
                <Card className="shadow-lg border-sage-200">
                  <CardContent className="p-8">
                    <h2 className="text-2xl font-bold text-sage-800 mb-6">{t.sendMessage}</h2>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div>
                        <label className="block text-sage-700 font-medium mb-2">{t.fullName}</label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-sage-200 rounded-lg focus:ring-2 focus:ring-mint-500 focus:border-transparent"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sage-700 font-medium mb-2">{t.email}</label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-sage-200 rounded-lg focus:ring-2 focus:ring-mint-500 focus:border-transparent"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sage-700 font-medium mb-2">{t.subject}</label>
                        <input
                          type="text"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-sage-200 rounded-lg focus:ring-2 focus:ring-mint-500 focus:border-transparent"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sage-700 font-medium mb-2">{t.message}</label>
                        <textarea
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          rows={5}
                          className="w-full px-4 py-3 border border-sage-200 rounded-lg focus:ring-2 focus:ring-mint-500 focus:border-transparent resize-none"
                          required
                        />
                      </div>
                      <Button
                        type="submit"
                        className="w-full bg-gradient-to-r from-mint-500 to-sage-500 hover:from-mint-600 hover:to-sage-600 text-white py-3"
                      >
                        <Send className="w-5 h-5 ml-2" />
                        {t.sendButton}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>

              {/* Contact Information */}
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold text-sage-800 mb-6">{t.contactInfo}</h2>
                  <div className="space-y-6">
                    <Card className="border-sage-200">
                      <CardContent className="p-6">
                        <div className="flex items-center">
                          <div className="bg-mint-100 p-3 rounded-lg ml-4">
                            <Mail className="w-6 h-6 text-mint-600" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-sage-800">{t.emailLabel}</h3>
                            <p className="text-sage-600">{t.emailValue}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="border-sage-200">
                      <CardContent className="p-6">
                        <div className="flex items-center">
                          <div className="bg-mint-100 p-3 rounded-lg ml-4">
                            <Phone className="w-6 h-6 text-mint-600" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-sage-800">{t.phoneLabel}</h3>
                            <p className="text-sage-600">{t.phoneValue}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="border-sage-200">
                      <CardContent className="p-6">
                        <div className="flex items-center">
                          <div className="bg-mint-100 p-3 rounded-lg ml-4">
                            <MapPin className="w-6 h-6 text-mint-600" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-sage-800">{t.addressLabel}</h3>
                            <p className="text-sage-600">{t.addressValue}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="border-sage-200">
                      <CardContent className="p-6">
                        <div className="flex items-center">
                          <div className="bg-mint-100 p-3 rounded-lg ml-4">
                            <Clock className="w-6 h-6 text-mint-600" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-sage-800">{t.workingHoursLabel}</h3>
                            <p className="text-sage-600">{t.workingHoursValue}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                {/* Quick Support */}
                <Card className="bg-gradient-to-r from-mint-50 to-sage-50 border-mint-200">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold text-sage-800 mb-4">{t.quickSupport}</h3>
                    <p className="text-sage-600 mb-4">{t.quickSupportText}</p>
                    <div className="flex gap-3">
                      <Button
                        variant="outline"
                        className="border-mint-300 text-mint-700 hover:bg-mint-50 bg-transparent"
                        onClick={() => (window.location.href = "/faq")}
                      >
                        {t.faq}
                      </Button>
                      <Button
                        className="bg-mint-500 hover:bg-mint-600 text-white"
                        onClick={() => (window.location.href = "/auth/signup")}
                      >
                        {t.startNow}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
