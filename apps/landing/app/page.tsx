import { Hero } from '@/components/Hero'
import { PainPoints } from '@/components/PainPoints'
import { Solution } from '@/components/Solution'
import { HowItWorks } from '@/components/HowItWorks'
import { Features } from '@/components/Features'
import { Pricing } from '@/components/Pricing'
import { FAQ } from '@/components/FAQ'
import { Waitlist } from '@/components/Waitlist'

export default function HomePage() {
  return (
    <>
      <Hero />
      <PainPoints />
      <Solution />
      <HowItWorks />
      <Features />
      <Pricing />
      <FAQ />
      <Waitlist />
    </>
  )
}
