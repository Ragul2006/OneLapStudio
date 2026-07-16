'use client'

import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { Send, Mail, Phone, Instagram, CheckCircle2, AlertCircle } from 'lucide-react'
import { contactInfo } from '@/lib/data'
import { useAdmin } from '@/lib/adminContext'

type ToastType = 'success' | 'error' | null

export default function Contact() {
  const { siteConfig } = useAdmin()
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [sending, setSending] = useState(false)
  const [toast, setToast] = useState<ToastType>(null)

  const validate = () => {
    const errs: Record<string, string> = {}
    if (!form.name.trim()) errs.name = 'Name is required'
    if (!form.email.trim()) errs.email = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = 'Invalid email'
    if (!form.message.trim()) errs.message = 'Message is required'
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return

    setSending(true)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      if (!res.ok) {
        throw new Error('Failed to send')
      }

      setToast('success')
      setForm({ name: '', email: '', message: '' })
    } catch {
      setToast('error')
    } finally {
      setSending(false)
      setTimeout(() => setToast(null), 4000)
    }
  }

  const inputClasses =
    'w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.08] text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-white/20 focus:bg-white/[0.05] transition-all duration-300'

  return (
    <section id="contact" className="relative py-32 lg:py-40">
      <div className="absolute inset-0 bg-bg-secondary/50" />

      <div ref={ref} className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <p className="text-xs uppercase tracking-[0.2em] text-zinc-500 mb-4">Get In Touch</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
            Let&apos;s build{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-zinc-500">
              something great
            </span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Form */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-3 glass rounded-2xl p-8"
          >
            <div className="space-y-5">
              {/* Name */}
              <div>
                <label htmlFor="contact-name" className="block text-xs text-zinc-500 mb-2">
                  Name
                </label>
                <input
                  id="contact-name"
                  type="text"
                  placeholder="Your name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className={inputClasses}
                />
                {errors.name && (
                  <p className="mt-1.5 text-xs text-red-400/80">{errors.name}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label htmlFor="contact-email" className="block text-xs text-zinc-500 mb-2">
                  Email
                </label>
                <input
                  id="contact-email"
                  type="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className={inputClasses}
                />
                {errors.email && (
                  <p className="mt-1.5 text-xs text-red-400/80">{errors.email}</p>
                )}
              </div>

              {/* Message */}
              <div>
                <label htmlFor="contact-message" className="block text-xs text-zinc-500 mb-2">
                  Message
                </label>
                <textarea
                  id="contact-message"
                  rows={5}
                  placeholder="Tell us about your project..."
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className={`${inputClasses} resize-none`}
                />
                {errors.message && (
                  <p className="mt-1.5 text-xs text-red-400/80">{errors.message}</p>
                )}
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={sending}
                className="group w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white text-black text-sm font-medium hover:bg-zinc-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,255,255,0.1)]"
              >
                {sending ? (
                  <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                ) : (
                  <>
                    Send Message
                    <Send
                      size={14}
                      className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                    />
                  </>
                )}
              </button>
            </div>
          </motion.form>

          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="lg:col-span-2 flex flex-col gap-4"
          >
            <a
              href={`mailto:${siteConfig.email}`}
              className="glass rounded-2xl p-6 flex items-start gap-4 glow-hover transition-all duration-500 hover:-translate-y-0.5 group"
            >
              <div className="w-10 h-10 rounded-xl bg-white/[0.06] border border-white/[0.06] flex items-center justify-center flex-shrink-0 group-hover:bg-white/[0.1] transition-colors">
                <Mail size={16} className="text-zinc-400" />
              </div>
              <div>
                <p className="text-xs text-zinc-500 mb-1">Email</p>
                <p className="text-sm font-medium">{siteConfig.email}</p>
              </div>
            </a>

            <a
              href={`tel:${siteConfig.phone}`}
              className="glass rounded-2xl p-6 flex items-start gap-4 glow-hover transition-all duration-500 hover:-translate-y-0.5 group"
            >
              <div className="w-10 h-10 rounded-xl bg-white/[0.06] border border-white/[0.06] flex items-center justify-center flex-shrink-0 group-hover:bg-white/[0.1] transition-colors">
                <Phone size={16} className="text-zinc-400" />
              </div>
              <div>
                <p className="text-xs text-zinc-500 mb-1">Phone</p>
                <p className="text-sm font-medium">{siteConfig.phone}</p>
              </div>
            </a>

            <a
              href={siteConfig.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="glass rounded-2xl p-6 flex items-start gap-4 glow-hover transition-all duration-500 hover:-translate-y-0.5 group"
            >
              <div className="w-10 h-10 rounded-xl bg-white/[0.06] border border-white/[0.06] flex items-center justify-center flex-shrink-0 group-hover:bg-white/[0.1] transition-colors">
                <Instagram size={16} className="text-zinc-400" />
              </div>
              <div>
                <p className="text-xs text-zinc-500 mb-1">Instagram</p>
                <p className="text-sm font-medium">{siteConfig.instagram}</p>
              </div>
            </a>
          </motion.div>
        </div>
      </div>

      {/* Toast notification */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 50, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: 50, x: '-50%' }}
            className="fixed bottom-8 left-1/2 z-[100] glass-strong rounded-xl px-6 py-4 flex items-center gap-3 shadow-2xl"
          >
            {toast === 'success' ? (
              <>
                <CheckCircle2 size={18} className="text-white" />
                <span className="text-sm">Message sent successfully!</span>
              </>
            ) : (
              <>
                <AlertCircle size={18} className="text-red-400" />
                <span className="text-sm">Something went wrong. Please try again.</span>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
