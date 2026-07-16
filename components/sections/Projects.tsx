'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Sparkles, CheckCircle2, Edit3, Plus, ArrowRight } from 'lucide-react'
import Image from 'next/image'
import { type Product } from '@/lib/data'
import { useAdmin } from '@/lib/adminContext'
import RegisterInterestModal from '@/components/RegisterInterestModal'

function ProductCard({
  product,
  index,
  isAdminLoggedIn,
  onEdit,
  onRegisterInterest,
}: {
  product: Product
  index: number
  isAdminLoggedIn: boolean
  onEdit: () => void
  onRegisterInterest: () => void
}) {
  const isEven = index % 2 === 0

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, delay: index * 0.15 }}
      className={`group relative grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center ${
        !isEven ? 'lg:direction-rtl' : ''
      }`}
    >
      {/* Admin Quick Edit Badge on Card */}
      {isAdminLoggedIn && (
        <div className="absolute top-0 right-0 z-20">
          <button
            onClick={onEdit}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-white hover:bg-white/20 text-xs font-semibold shadow-lg backdrop-blur-md transition-all"
            title="Edit this project content"
          >
            <Edit3 size={13} />
            <span>Edit Project</span>
          </button>
        </div>
      )}

      {/* Image / Mockup */}
      <motion.div
        className={`relative overflow-hidden rounded-2xl ${!isEven ? 'lg:order-2' : ''}`}
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.4 }}
      >
        <div className="relative aspect-[4/3] bg-gradient-to-br from-white/[0.04] to-white/[0.01] border border-white/[0.06] rounded-2xl overflow-hidden">
          <Image
            src={product.image}
            alt={`${product.title} mockup`}
            fill
            className="object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-500"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

          {/* Status badge */}
          <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/[0.08]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
            </span>
            <span className="text-[11px] text-zinc-300 font-medium">{product.status}</span>
          </div>
        </div>
      </motion.div>

      {/* Content */}
      <div className={`flex flex-col ${!isEven ? 'lg:order-1' : ''}`}>
        {/* Tag */}
        <div className="flex items-center gap-2 mb-4">
          <Sparkles size={14} className="text-zinc-500" />
          <span className="text-xs uppercase tracking-[0.15em] text-zinc-500 font-medium">
            {product.tag}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-2xl sm:text-3xl font-bold tracking-tight mb-4">
          {product.title}
        </h3>

        {/* Description */}
        <p className="text-sm sm:text-base text-zinc-400 leading-relaxed mb-6">
          {product.description}
        </p>

        {/* Features */}
        <div className="space-y-3">
          {product.features.map((feature) => (
            <motion.div
              key={feature}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="flex items-start gap-3 group/feature"
            >
              <CheckCircle2
                size={16}
                className="text-zinc-600 mt-0.5 flex-shrink-0 group-hover/feature:text-zinc-400 transition-colors"
              />
              <span className="text-sm text-zinc-500 group-hover/feature:text-zinc-300 transition-colors">
                {feature}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Action Button */}
        <div className="mt-8">
          <button
            onClick={onRegisterInterest}
            className="group/btn inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white hover:text-black text-white text-sm font-semibold transition-all duration-300"
          >
            <span>Register Interest</span>
            <ArrowRight size={16} className="text-zinc-400 group-hover/btn:text-black transition-colors duration-300" />
          </button>
        </div>
      </div>
    </motion.div>
  )
}

export default function Projects() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })
  const { projectsList, isAdminLoggedIn, openEditorModal } = useAdmin()
  const [interestedProject, setInterestedProject] = useState<string | null>(null)

  return (
    <section id="projects" className="relative py-32 lg:py-40">
      <div ref={ref} className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-20"
        >
          <p className="text-xs uppercase tracking-[0.2em] text-zinc-500 mb-4">Our Products</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
            Products we&apos;re{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-zinc-500">
              building
            </span>
          </h2>
          <p className="text-sm text-zinc-500 mt-4 max-w-lg mx-auto leading-relaxed">
            Real products in active development. No filler — just honest work toward solving real problems.
          </p>

          {/* Admin Controls Banner */}
          {isAdminLoggedIn && (
            <div className="mt-6 inline-flex items-center gap-3 px-4 py-2 rounded-2xl bg-zinc-900 border border-white/20">
              <span className="text-xs text-zinc-300 font-medium">
                👑 Admin Mode Active
              </span>
              <button
                onClick={() => openEditorModal('projects')}
                className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-white text-black font-semibold text-xs hover:bg-zinc-200 transition-colors"
              >
                <Plus size={13} />
                <span>Add / Manage Projects</span>
              </button>
            </div>
          )}
        </motion.div>

        {/* Product cards */}
        <div className="space-y-24 lg:space-y-32">
          {projectsList.map((product, i) => (
            <ProductCard
              key={product.title + i}
              product={product}
              index={i}
              isAdminLoggedIn={isAdminLoggedIn}
              onEdit={() => openEditorModal('projects', i)}
              onRegisterInterest={() => setInterestedProject(product.title)}
            />
          ))}
        </div>

        <RegisterInterestModal
          isOpen={!!interestedProject}
          onClose={() => setInterestedProject(null)}
          projectTitle={interestedProject || ''}
        />
      </div>
    </section>
  )
}
