'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Code2, Layers, Sparkles, Terminal } from 'lucide-react'

const techStack = [
  'React', 'Next.js', 'TypeScript', 'Node.js',
  'Python', 'Flutter', 'PostgreSQL', 'AWS',
  'Docker', 'Figma', 'TailwindCSS', 'GraphQL',
]

const cards = [
  {
    icon: Code2,
    title: 'Engineering First',
    description: 'We write clean, scalable code that powers products for the long term.',
  },
  {
    icon: Layers,
    title: 'Full-Stack Expertise',
    description: 'From frontend polish to backend infrastructure — we handle it all.',
  },
  {
    icon: Sparkles,
    title: 'Design Obsessed',
    description: 'Every pixel matters. We create interfaces that feel alive and premium.',
  },
  {
    icon: Terminal,
    title: 'Modern Stack',
    description: 'We use cutting-edge tools and frameworks to build future-proof products.',
  },
]

export default function About() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="about" className="relative py-32 lg:py-40">
      <div ref={ref} className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-3xl"
        >
          <p className="text-xs uppercase tracking-[0.2em] text-zinc-500 mb-4">About Us</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-tight">
            A small studio with
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-zinc-500">
              big ambitions
            </span>
          </h2>
          <p className="mt-6 text-base sm:text-lg text-zinc-500 leading-relaxed max-w-2xl">
            OneLap Studio is an indie software development studio focused on crafting premium
            digital products. We combine modern engineering with thoughtful design to build
            apps that feel alive.
          </p>
        </motion.div>

        {/* Info cards */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {cards.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
              className="glass rounded-2xl p-6 glow-hover transition-all duration-500 hover:-translate-y-1"
            >
              <div className="w-10 h-10 rounded-xl bg-white/[0.06] border border-white/[0.06] flex items-center justify-center mb-4">
                <card.icon size={18} className="text-zinc-400" />
              </div>
              <h3 className="text-sm font-semibold mb-2">{card.title}</h3>
              <p className="text-xs text-zinc-500 leading-relaxed">{card.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Tech stack */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-16"
        >
          <p className="text-xs uppercase tracking-[0.2em] text-zinc-600 mb-6">Technologies we work with</p>
          <div className="flex flex-wrap gap-2">
            {techStack.map((tech) => (
              <span
                key={tech}
                className="px-4 py-2 rounded-full border border-white/[0.06] bg-white/[0.02] text-xs text-zinc-400 hover:text-white hover:border-white/[0.12] hover:bg-white/[0.04] transition-all duration-300 cursor-default"
              >
                {tech}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
