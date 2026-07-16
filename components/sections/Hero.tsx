'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowDown, Edit3 } from 'lucide-react'
import { useAdmin } from '@/lib/adminContext'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.5 + i * 0.15, duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
}

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95])
  const y = useTransform(scrollYProgress, [0, 0.5], [0, 60])

  const { siteConfig, isAdminLoggedIn, openEditorModal } = useAdmin()

  const scrollTo = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section ref={ref} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 hero-glow" />
      <div className="absolute inset-0 bg-grid mask-fade-b opacity-40" />

      {/* Floating elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-[10%] w-24 h-24 rounded-full border border-white/[0.05] animate-float" />
        <div className="absolute top-1/3 right-[15%] w-16 h-16 rounded-lg border border-white/[0.04] rotate-45 animate-float-delayed" />
        <div className="absolute bottom-1/3 left-[20%] w-32 h-32 rounded-full bg-white/[0.02] animate-float-slow" />
        <div className="absolute top-[60%] right-[10%] w-20 h-20 rounded-full border border-white/[0.03] animate-float" />
        <div className="absolute top-[15%] right-[30%] w-3 h-3 rounded-full bg-white/10 animate-pulse-glow" />
        <div className="absolute bottom-[25%] left-[35%] w-2 h-2 rounded-full bg-white/10 animate-pulse-glow" />
      </div>

      {/* Content */}
      <motion.div style={{ opacity, scale, y }} className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <motion.div
          custom={0}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-white/[0.08] bg-white/[0.03] backdrop-blur-sm mb-8"
        >
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            <span className="text-xs text-zinc-400 tracking-wide">{siteConfig.availabilityBadge}</span>
          </div>

          {isAdminLoggedIn && (
            <button
              onClick={() => openEditorModal('settings')}
              className="flex items-center gap-1 pl-2 border-l border-white/10 text-[11px] text-white hover:text-zinc-300 font-semibold transition-colors"
              title="Edit hero & website content"
            >
              <Edit3 size={11} />
              <span>Edit</span>
            </button>
          )}
        </motion.div>

        <motion.h1
          custom={1}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1] text-balance"
        >
          {siteConfig.heroTitle}
        </motion.h1>

        <motion.p
          custom={2}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="mt-6 text-base sm:text-lg text-zinc-500 max-w-2xl mx-auto leading-relaxed text-balance"
        >
          {siteConfig.heroSubtitle}
        </motion.p>

        <motion.div
          custom={3}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <button
            onClick={() => scrollTo('#projects')}
            className="group relative px-8 py-3.5 rounded-full bg-white text-black font-medium text-sm hover:bg-zinc-200 transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,255,255,0.15)]"
          >
            View Projects
          </button>
          <button
            onClick={() => scrollTo('#contact')}
            className="px-8 py-3.5 rounded-full border border-white/[0.12] text-sm font-medium text-zinc-300 hover:text-white hover:border-white/25 hover:bg-white/5 transition-all duration-300"
          >
            Start a Project
          </button>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] text-zinc-600 uppercase tracking-[0.2em]">Scroll</span>
        <ArrowDown size={14} className="text-zinc-600 animate-scroll-hint" />
      </motion.div>
    </section>
  )
}
