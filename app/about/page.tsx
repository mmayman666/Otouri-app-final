"use client"

import Header from "@/components/header"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Target, Users, Award, Lightbulb, Heart, Star } from "lucide-react"
import { useTranslation } from "@/lib/translations/context"

const translations = {
  ar: {
    title: "من نحن",
    subtitle: "نحن فريق شغوف بعالم العطور، نسعى لتقديم تجربة فريدة ومخصصة لكل محب للعطور في العالم العربي",
    ourStory: "قصتنا",
    storyParagraph1:
      "بدأت رحلة عُطوري من شغف عميق بعالم العطور والرغبة في تقديم تجربة مختلفة ومميزة لعشاق العطور في المنطقة العربية. لاحظنا أن اختيار العطر المناسب يمكن أن يكون تحدياً كبيراً، خاصة مع تنوع الخيارات المتاحة.",
    storyParagraph2:
      "من هنا جاءت فكرة إنشاء منصة ذكية تستخدم أحدث تقنيات الذكاء الاصطناعي لتقديم توصيات مخصصة ودقيقة لكل شخص بناءً على تفضيلاته وشخصيته الفريدة.",
    storyParagraph3:
      "اليوم، نفخر بكوننا الرائدين في مجال التوصيات الذكية للعطور، حيث نساعد آلاف المستخدمين يومياً في العثور على عطرهم المثالي.",
    ourMission: "رسالتنا",
    missionText:
      "تمكين كل شخص من العثور على العطر المثالي الذي يعبر عن شخصيته ويعزز ثقته بنفسه، من خلال تقنيات الذكاء الاصطناعي المتطورة والخبرة العميقة في عالم العطور.",
    ourVision: "رؤيتنا",
    visionText:
      "أن نكون المنصة الرائدة عالمياً في مجال التوصيات الذكية للعطور، ونساهم في إثراء تجربة العطور للجميع من خلال الابتكار والتكنولوجيا المتقدمة.",
    ourValues: "قيمنا",
    valuesSubtitle: "القيم التي نؤمن بها وتوجه عملنا يومياً",
    quality: "الجودة",
    qualityText: "نلتزم بتقديم أعلى مستويات الجودة في خدماتنا وتوصياتنا",
    personalization: "التخصيص",
    personalizationText: "كل شخص فريد، ولذلك نقدم تجربة مخصصة لكل مستخدم",
    passion: "الشغف",
    passionText: "شغفنا بعالم العطور يدفعنا للابتكار والتطوير المستمر",
    achievements: "إنجازاتنا",
    achievementsSubtitle: "أرقام تعكس ثقة عملائنا ونجاح منصتنا",
    activeUsers: "مستخدم نشط",
    accurateRecommendations: "توصية دقيقة",
    perfumesInDatabase: "عطر في قاعدة البيانات",
    customerSatisfaction: "رضا العملاء",
    ctaTitle: "انضم إلى رحلة اكتشاف العطر المثالي",
    ctaSubtitle: "ابدأ تجربتك معنا اليوم واكتشف عالماً جديداً من العطور المخصصة لك",
    startJourney: "ابدأ رحلتك الآن",
    brandName: "عُطوري",
    platformDescription: "منصة التوصيات الذكية للعطور",
  },
  en: {
    title: "About Us",
    subtitle:
      "We are a passionate team in the world of perfumes, striving to provide a unique and personalized experience for every perfume lover in the Arab world",
    ourStory: "Our Story",
    storyParagraph1:
      "Otouri's journey began from a deep passion for the world of perfumes and the desire to provide a different and distinctive experience for perfume enthusiasts in the Arab region. We noticed that choosing the right perfume can be a major challenge, especially with the variety of available options.",
    storyParagraph2:
      "From here came the idea of creating a smart platform that uses the latest artificial intelligence technologies to provide personalized and accurate recommendations for each person based on their preferences and unique personality.",
    storyParagraph3:
      "Today, we are proud to be leaders in the field of smart perfume recommendations, helping thousands of users daily find their perfect fragrance.",
    ourMission: "Our Mission",
    missionText:
      "To enable every person to find the perfect perfume that expresses their personality and enhances their self-confidence, through advanced artificial intelligence technologies and deep expertise in the world of perfumes.",
    ourVision: "Our Vision",
    visionText:
      "To be the leading platform globally in the field of smart perfume recommendations, and contribute to enriching the perfume experience for everyone through innovation and advanced technology.",
    ourValues: "Our Values",
    valuesSubtitle: "The values we believe in and guide our work daily",
    quality: "Quality",
    qualityText: "We are committed to providing the highest levels of quality in our services and recommendations",
    personalization: "Personalization",
    personalizationText: "Every person is unique, so we provide a personalized experience for each user",
    passion: "Passion",
    passionText: "Our passion for the world of perfumes drives us to innovate and continuously develop",
    achievements: "Our Achievements",
    achievementsSubtitle: "Numbers that reflect our customers' trust and our platform's success",
    activeUsers: "Active Users",
    accurateRecommendations: "Accurate Recommendations",
    perfumesInDatabase: "Perfumes in Database",
    customerSatisfaction: "Customer Satisfaction",
    ctaTitle: "Join the Journey to Discover the Perfect Perfume",
    ctaSubtitle: "Start your experience with us today and discover a new world of perfumes customized for you",
    startJourney: "Start Your Journey Now",
    brandName: "Otouri",
    platformDescription: "Smart Perfume Recommendation Platform",
  },
}

export default function AboutPage() {
  const { language } = useTranslation()
  const t = translations[language]

  return (
    <div className="min-h-screen bg-gradient-to-br from-sage-50 via-white to-mint-50">
      <Header />

      <main>
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-r from-sage-100 to-mint-100">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-sage-800 mb-6">{t.title}</h1>
            <p className="text-xl text-sage-600 max-w-3xl mx-auto">{t.subtitle}</p>
          </div>
        </section>

        {/* Our Story */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-sage-800 mb-6">{t.ourStory}</h2>
                <div className="space-y-4 text-sage-600 leading-relaxed">
                  <p>{t.storyParagraph1}</p>
                  <p>{t.storyParagraph2}</p>
                  <p>{t.storyParagraph3}</p>
                </div>
              </div>
              <div className="relative">
                <div className="bg-gradient-to-br from-mint-100 to-sage-100 rounded-2xl p-8 shadow-lg">
                  <div className="w-full h-80 flex items-center justify-center bg-gradient-to-br from-mint-500 to-sage-500 rounded-lg relative overflow-hidden">
                    {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-10">
                      <div className="absolute top-4 left-4 w-8 h-8 border-2 border-white rounded-full"></div>
                      <div className="absolute top-12 right-8 w-4 h-4 bg-white rounded-full"></div>
                      <div className="absolute bottom-8 left-12 w-6 h-6 border border-white rounded-full"></div>
                      <div className="absolute bottom-4 right-4 w-3 h-3 bg-white rounded-full"></div>
                      <div className="absolute top-1/2 left-1/4 w-2 h-2 bg-white rounded-full"></div>
                      <div className="absolute top-1/3 right-1/3 w-5 h-5 border border-white rounded-full"></div>
                    </div>

                    {/* Main Logo */}
                    <div className="text-center z-10">
                      <div className="text-6xl md:text-7xl font-bold text-white mb-4 tracking-wider">{t.brandName}</div>
                      <div className="text-white/80 text-lg font-medium">{t.platformDescription}</div>
                      <div className="mt-4 flex justify-center space-x-2">
                        <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                        <div className="w-2 h-2 bg-white/70 rounded-full animate-pulse delay-100"></div>
                        <div className="w-2 h-2 bg-white/50 rounded-full animate-pulse delay-200"></div>
                      </div>
                    </div>

                    {/* Decorative Elements */}
                    <div className="absolute top-0 left-0 w-full h-full">
                      <div className="absolute top-8 left-8 w-16 h-16 border-2 border-white/20 rounded-full animate-spin-slow"></div>
                      <div className="absolute bottom-8 right-8 w-12 h-12 border border-white/30 rounded-full animate-pulse"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Our Mission & Vision */}
        <section className="py-16 bg-gradient-to-r from-sage-50 to-mint-50">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="shadow-lg border-sage-200">
                <CardContent className="p-8 text-center">
                  <div className="bg-mint-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Target className="w-8 h-8 text-mint-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-sage-800 mb-4">{t.ourMission}</h3>
                  <p className="text-sage-600 leading-relaxed">{t.missionText}</p>
                </CardContent>
              </Card>

              <Card className="shadow-lg border-sage-200">
                <CardContent className="p-8 text-center">
                  <div className="bg-sage-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Lightbulb className="w-8 h-8 text-sage-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-sage-800 mb-4">{t.ourVision}</h3>
                  <p className="text-sage-600 leading-relaxed">{t.visionText}</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Our Values */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-sage-800 mb-4">{t.ourValues}</h2>
              <p className="text-sage-600 max-w-2xl mx-auto">{t.valuesSubtitle}</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <Card className="text-center border-sage-200 hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="bg-mint-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Award className="w-6 h-6 text-mint-600" />
                  </div>
                  <h3 className="text-xl font-bold text-sage-800 mb-3">{t.quality}</h3>
                  <p className="text-sage-600">{t.qualityText}</p>
                </CardContent>
              </Card>

              <Card className="text-center border-sage-200 hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="bg-sage-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="w-6 h-6 text-sage-600" />
                  </div>
                  <h3 className="text-xl font-bold text-sage-800 mb-3">{t.personalization}</h3>
                  <p className="text-sage-600">{t.personalizationText}</p>
                </CardContent>
              </Card>

              <Card className="text-center border-sage-200 hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="bg-mint-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Heart className="w-6 h-6 text-mint-600" />
                  </div>
                  <h3 className="text-xl font-bold text-sage-800 mb-3">{t.passion}</h3>
                  <p className="text-sage-600">{t.passionText}</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Team Stats */}
        <section className="py-16 bg-gradient-to-r from-mint-50 to-sage-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-sage-800 mb-4">{t.achievements}</h2>
              <p className="text-sage-600">{t.achievementsSubtitle}</p>
            </div>

            <div className="grid md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-mint-600 mb-2">50K+</div>
                <div className="text-sage-600">{t.activeUsers}</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-sage-600 mb-2">1M+</div>
                <div className="text-sage-600">{t.accurateRecommendations}</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-mint-600 mb-2">5000+</div>
                <div className="text-sage-600">{t.perfumesInDatabase}</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-sage-600 mb-2">98%</div>
                <div className="text-sage-600">{t.customerSatisfaction}</div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <Card className="bg-gradient-to-r from-mint-500 to-sage-500 text-white text-center">
              <CardContent className="p-12">
                <Star className="w-16 h-16 mx-auto mb-6 text-white" />
                <h2 className="text-3xl font-bold mb-4">{t.ctaTitle}</h2>
                <p className="text-xl mb-8 opacity-90">{t.ctaSubtitle}</p>
                <Button
                  size="lg"
                  className="bg-white text-mint-600 hover:bg-gray-100 px-8 py-3"
                  onClick={() => (window.location.href = "/auth/signup")}
                >
                  {t.startJourney}
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
