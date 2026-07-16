'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { services } from '@/lib/data'

export default function Services() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="services" className="relative py-32 lg:py-40">
      {/* Subtle background */}
      <div className="absolute inset-0 bg-bg-secondary/50" />

      <div ref={ref} className="relative max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <p className="text-xs uppercase tracking-[0.2em] text-zinc-500 mb-4">What We Do</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
            Services we{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-zinc-500">
              specialize in
            </span>
          </h2>
          <p className="mt-4 text-zinc-500 text-sm sm:text-base">
            We offer end-to-end software development tailored to modern startups and businesses.
          </p>
        </motion.div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.15 + i * 0.08 }}
              className="group glass rounded-2xl p-8 glow-hover transition-all duration-500 hover:-translate-y-1.5 cursor-default"
            >
              {/* Icon */}
              <div className="w-12 h-12 rounded-xl bg-white/[0.06] border border-white/[0.06] flex items-center justify-center mb-6 group-hover:bg-white/[0.1] group-hover:border-white/[0.1] transition-all duration-500">
                <service.icon size={20} className="text-zinc-400 group-hover:text-white transition-colors duration-500" />
              </div>

              <h3 className="text-base font-semibold mb-3 group-hover:text-white transition-colors">
                {service.title}
              </h3>
              <p className="text-sm text-zinc-500 leading-relaxed group-hover:text-zinc-400 transition-colors">
                {service.description}
              </p>

              {/* Hover line */}
              <div className="mt-6 h-px w-0 group-hover:w-full bg-gradient-to-r from-white/20 to-transparent transition-all duration-700" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
