"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Mail, Phone } from "lucide-react"
import { useTranslation } from "@/lib/translations/context"

export default function HelpPage() {
  const { t, isRTL } = useTranslation()

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="w-full max-w-7xl mx-auto px-6 py-6 md:px-8 md:py-8 lg:px-12 lg:py-12 space-y-8 animate-in fade-in duration-500">
        <div className="flex flex-col px-4 py-4">
          <h1 className="text-3xl font-bold text-mint-800">{t("help.title")}</h1>
          <p className="text-gray-600 mt-2">{t("help.subtitle")}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
          <div className="col-span-2 space-y-6">
            <Card className="shadow-sm">
              <CardHeader className="px-6 py-6">
                <CardTitle className="text-xl text-mint-700">{t("help.partnershipFaq")}</CardTitle>
                <CardDescription>{t("help.partnershipFaqSubtitle")}</CardDescription>
              </CardHeader>
              <CardContent className="px-6 pb-6">
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1" className="px-2">
                    <AccordionTrigger className={`${isRTL ? "text-right" : "text-left"} px-4 py-4`}>
                      {t("help.faq.q1")}
                    </AccordionTrigger>
                    <AccordionContent className={`${isRTL ? "text-right" : "text-left"} px-4 py-4`}>
                      {t("help.faq.a1")}
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-2" className="px-2">
                    <AccordionTrigger className={`${isRTL ? "text-right" : "text-left"} px-4 py-4`}>
                      {t("help.faq.q2")}
                    </AccordionTrigger>
                    <AccordionContent className={`${isRTL ? "text-right" : "text-left"} px-4 py-4`}>
                      {t("help.faq.a2")}
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-3" className="px-2">
                    <AccordionTrigger className={`${isRTL ? "text-right" : "text-left"} px-4 py-4`}>
                      {t("help.faq.q3")}
                    </AccordionTrigger>
                    <AccordionContent className={`${isRTL ? "text-right" : "text-left"} px-4 py-4`}>
                      {t("help.faq.a3")}
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-4" className="px-2">
                    <AccordionTrigger className={`${isRTL ? "text-right" : "text-left"} px-4 py-4`}>
                      {t("help.faq.q4")}
                    </AccordionTrigger>
                    <AccordionContent className={`${isRTL ? "text-right" : "text-left"} px-4 py-4`}>
                      {t("help.faq.a4")}
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-5" className="px-2">
                    <AccordionTrigger className={`${isRTL ? "text-right" : "text-left"} px-4 py-4`}>
                      {t("help.faq.q5")}
                    </AccordionTrigger>
                    <AccordionContent className={`${isRTL ? "text-right" : "text-left"} px-4 py-4`}>
                      {t("help.faq.a5")}
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="shadow-sm">
              <CardHeader className="px-6 py-6">
                <CardTitle className="text-xl text-mint-700">{t("help.contactPartnershipTeam")}</CardTitle>
                <CardDescription>{t("help.contactPartnershipSubtitle")}</CardDescription>
              </CardHeader>
              <CardContent className="px-6 pb-6 space-y-6">
                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                  <div className="bg-mint-100 p-3 rounded-full">
                    <Mail className="h-5 w-5 text-mint-700" />
                  </div>
                  <div>
                    <h3 className="font-medium text-mint-800">{t("help.email")}</h3>
                    <p className="text-sm text-gray-600">support@otouri.com</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                  <div className="bg-mint-100 p-3 rounded-full">
                    <Phone className="h-5 w-5 text-mint-700" />
                  </div>
                  <div>
                    <h3 className="font-medium text-mint-800">{t("help.phone")}</h3>
                    <p className="text-sm text-gray-600">+966 12 345 6789</p>
                  </div>
                </div>

                <Button
                  className="w-full mt-6 bg-mint-500 hover:bg-mint-600 text-white py-3"
                  onClick={() => (window.location.href = "mailto:partnership@otouri.com")}
                >
                  {t("help.startPartnershipChat")}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
