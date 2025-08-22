import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { FeaturesSection } from "@/components/features-section"
import { ScentCategories } from "@/components/scent-categories"
import { ArticlesSection } from "@/components/articles-section"
import { NewsletterSection } from "@/components/newsletter-section"
import { Footer } from "@/components/footer"
import { PerfumeFeatures } from "@/components/perfume-features"
import { PricingSection } from "@/components/pricing-section"

export default function Home() {
  return (
    <div dir="rtl" className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <FeaturesSection />
        <ScentCategories />
        <PerfumeFeatures />
        <PricingSection />
        <ArticlesSection />
        <NewsletterSection />
      </main>
      <Footer />
    </div>
  )
}
