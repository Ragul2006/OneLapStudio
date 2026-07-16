'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Lightbulb, PenTool, Code, FlaskConical, Rocket } from 'lucide-react'
import { processSteps } from '@/lib/data'

const icons = [Lightbulb, PenTool, Code, FlaskConical, Rocket]

export default function Process() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="process" className="relative py-32 lg:py-40">
      <div className="absolute inset-0 bg-bg-secondary/50" />

      <div ref={ref} className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-20"
        >
          <p className="text-xs uppercase tracking-[0.2em] text-zinc-500 mb-4">How We Work</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
            Our{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-zinc-500">
              process
            </span>
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative max-w-3xl mx-auto">
          {/* Vertical line */}
          <motion.div
            initial={{ scaleY: 0 }}
            animate={inView ? { scaleY: 1 } : {}}
            transition={{ duration: 1.2, delay: 0.3, ease: 'easeInOut' }}
            className="absolute left-6 lg:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-white/10 via-white/[0.06] to-transparent origin-top"
          />

          {processSteps.map((step, i) => {
            const Icon = icons[i]
            const isLeft = i % 2 === 0

            return (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.4 + i * 0.15 }}
                className={`relative flex items-start gap-6 mb-16 last:mb-0 ${
                  isLeft ? 'lg:flex-row' : 'lg:flex-row-reverse'
                }`}
              >
                {/* Dot */}
                <div className="absolute left-6 lg:left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-black border-2 border-white/20 z-10" />

                {/* Content */}
                <div
                  className={`ml-14 lg:ml-0 lg:w-[calc(50%-2rem)] ${
                    isLeft ? 'lg:text-right lg:pr-4' : 'lg:text-left lg:pl-4 lg:ml-auto'
                  }`}
                >
                  <div
                    className={`inline-flex items-center gap-3 mb-3 ${
                      isLeft ? 'lg:flex-row-reverse' : ''
                    }`}
                  >
                    <div className="w-10 h-10 rounded-xl bg-white/[0.06] border border-white/[0.06] flex items-center justify-center">
                      <Icon size={16} className="text-zinc-400" />
                    </div>
                    <span className="text-[11px] text-zinc-600 uppercase tracking-widest">
                      Step {step.step}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                  <p className="text-sm text-zinc-500 leading-relaxed">{step.description}</p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
