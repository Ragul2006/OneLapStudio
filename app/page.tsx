'use client'

import dynamic from 'next/dynamic'
import Navbar from '@/components/sections/Navbar'
import Hero from '@/components/sections/Hero'
import About from '@/components/sections/About'
import Services from '@/components/sections/Services'
import Projects from '@/components/sections/Projects'
import Process from '@/components/sections/Process'
import WhyChooseUs from '@/components/sections/WhyChooseUs'
import Contact from '@/components/sections/Contact'
import Footer from '@/components/sections/Footer'

/* Lazy-load effects that are non-critical */
const LoadingScreen = dynamic(() => import('@/components/LoadingScreen'), { ssr: false })
const CursorSpotlight = dynamic(() => import('@/components/CursorSpotlight'), { ssr: false })

export default function Home() {
  return (
    <>
      <LoadingScreen />
      <CursorSpotlight />
      <Navbar />

      <main>
        <Hero />
        <About />
        <Services />
        <Projects />
        <Process />
        <WhyChooseUs />
        <Contact />
      </main>

      <Footer />
    </>
  )
}
