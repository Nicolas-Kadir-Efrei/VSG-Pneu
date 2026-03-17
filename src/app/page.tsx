import HeroSection from '@/components/sections/HeroSection'
import ServicesSection from '@/components/sections/ServicesSection'
import TrustSection from '@/components/sections/TrustSection'
import PricingPreview from '@/components/sections/PricingPreview'
import ContactSection from '@/components/sections/ContactSection'
import FAQSection from '@/components/sections/FAQSection'

export default function Home() {
  return (
    <main>
      <HeroSection />
      <TrustSection />
      <ServicesSection />
      <PricingPreview />
      <ContactSection />
      <FAQSection />
    </main>
  )
}
