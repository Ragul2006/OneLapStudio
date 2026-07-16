'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Lock, Edit3, LogOut } from 'lucide-react'
import Image from 'next/image'
import { navLinks } from '@/lib/data'
import { useAdmin } from '@/lib/adminContext'

export default function Navbar() {
  const {
    isAdminLoggedIn,
    adminUser,
    openLoginModal,
    openEditorModal,
    logoutAdmin,
  } = useAdmin()

  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [active, setActive] = useState('')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const ids = navLinks.map((l) => l.href.slice(1))
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id)
        })
      },
      { rootMargin: '-40% 0px -55% 0px' }
    )
    ids.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  const scrollTo = useCallback((href: string) => {
    setMobileOpen(false)
    const el = document.querySelector(href)
    el?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-black/70 backdrop-blur-2xl border-b border-white/[0.06]'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="flex items-center gap-2 group"
            >
              <div className="w-8 h-8 rounded-lg overflow-hidden border border-white/10 group-hover:border-white/20 transition-colors">
                <Image
                  src="/logo.jpeg"
                  alt="OneLap Studio"
                  width={32}
                  height={32}
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-base font-semibold tracking-tight hidden sm:block">
                OneLap Studio
              </span>
            </button>

            {/* Desktop links */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => scrollTo(link.href)}
                  className={`relative px-4 py-2 text-sm transition-colors ${
                    active === link.href.slice(1)
                      ? 'text-white'
                      : 'text-zinc-500 hover:text-zinc-300'
                  }`}
                >
                  {link.label}
                  {active === link.href.slice(1) && (
                    <motion.div
                      layoutId="nav-indicator"
                      className="absolute bottom-0 left-2 right-2 h-px bg-white/40"
                      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                    />
                  )}
                </button>
              ))}
            </div>

            {/* Actions: Admin Login / Editor & CTA */}
            <div className="flex items-center gap-3">
              {isAdminLoggedIn ? (
                <div className="hidden md:flex items-center gap-2">
                  <button
                    onClick={() => openEditorModal('projects')}
                    className="flex items-center gap-1.5 text-xs px-3.5 py-2 rounded-full bg-white/10 border border-white/20 text-white hover:bg-white/20 transition-all font-medium"
                  >
                    <Edit3 size={13} />
                    <span>Edit Website & Projects</span>
                  </button>
                  <button
                    onClick={logoutAdmin}
                    className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-red-400 transition-colors"
                    title="Sign Out of Admin"
                  >
                    <LogOut size={14} />
                  </button>
                </div>
              ) : (
                <button
                  onClick={openLoginModal}
                  className="hidden md:flex items-center gap-2 text-sm px-4 py-2 rounded-full border border-white/20 bg-black text-white hover:bg-white/10 hover:border-white/30 transition-all shadow-sm"
                >
                  <Lock size={14} className="text-white" />
                  <span className="font-medium">Admin Login</span>
                </button>
              )}

              <button
                onClick={() => scrollTo('#contact')}
                className="hidden md:block text-sm px-5 py-2 rounded-full bg-white text-black font-medium hover:bg-zinc-200 transition-colors"
              >
                Start a Project
              </button>

              {/* Mobile toggle */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="md:hidden p-2 text-zinc-400 hover:text-white transition-colors"
                aria-label="Toggle menu"
              >
                {mobileOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-x-0 top-16 z-40 bg-black/95 backdrop-blur-2xl border-b border-white/[0.06] md:hidden"
          >
            <div className="px-6 py-6 flex flex-col gap-1">
              {navLinks.map((link, i) => (
                <motion.button
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => scrollTo(link.href)}
                  className={`text-left px-4 py-3 rounded-lg text-base transition-colors ${
                    active === link.href.slice(1)
                      ? 'text-white bg-white/5'
                      : 'text-zinc-500 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {link.label}
                </motion.button>
              ))}

              <div className="pt-4 border-t border-white/10 mt-3 flex flex-col gap-2">
                {isAdminLoggedIn ? (
                  <>
                    <button
                      onClick={() => {
                        setMobileOpen(false)
                        openEditorModal('projects')
                      }}
                      className="w-full py-2.5 rounded-xl bg-white/10 border border-white/20 text-white font-medium text-sm flex items-center justify-center gap-2"
                    >
                      <Edit3 size={15} />
                      <span>Edit Website & Projects</span>
                    </button>
                    <button
                      onClick={() => {
                        setMobileOpen(false)
                        logoutAdmin()
                      }}
                      className="w-full py-2.5 rounded-xl bg-white/5 text-zinc-400 font-medium text-sm flex items-center justify-center gap-2"
                    >
                      <LogOut size={15} />
                      <span>Sign Out of Admin</span>
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => {
                      setMobileOpen(false)
                      openLoginModal()
                    }}
                    className="w-full py-2.5 rounded-xl border border-white/20 bg-black text-white hover:bg-white/10 font-medium text-sm flex items-center justify-center gap-2 shadow-sm"
                  >
                    <Lock size={15} className="text-white" />
                    <span>Admin Login</span>
                  </button>
                )}

                <button
                  onClick={() => scrollTo('#contact')}
                  className="w-full py-3 rounded-full bg-white text-black font-medium text-sm hover:bg-zinc-200 transition-colors"
                >
                  Start a Project
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
