'use client'

import { Instagram, Mail, Phone, ArrowUpRight } from 'lucide-react'
import Image from 'next/image'
import { navLinks } from '@/lib/data'
import { useAdmin } from '@/lib/adminContext'

export default function Footer() {
  const { siteConfig } = useAdmin()

  const scrollTo = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer className="relative border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg overflow-hidden border border-white/10">
                <Image src="/logo.jpeg" alt="OneLap Studio" width={32} height={32} className="w-full h-full object-cover" />
              </div>
              <span className="text-base font-semibold tracking-tight">OneLap Studio</span>
            </div>
            <p className="text-sm text-zinc-500 leading-relaxed max-w-xs">
              Building apps that feel alive. An indie software development studio crafting premium digital products.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-zinc-500 mb-5">Navigation</p>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <button
                    onClick={() => scrollTo(link.href)}
                    className="text-sm text-zinc-500 hover:text-white transition-colors flex items-center gap-1 group"
                  >
                    {link.label}
                    <ArrowUpRight
                      size={12}
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                    />
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-zinc-500 mb-5">Contact</p>
            <ul className="space-y-3">
              <li>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="text-sm text-zinc-500 hover:text-white transition-colors flex items-center gap-2"
                >
                  <Mail size={14} />
                  {siteConfig.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${siteConfig.phone}`}
                  className="text-sm text-zinc-500 hover:text-white transition-colors flex items-center gap-2"
                >
                  <Phone size={14} />
                  {siteConfig.phone}
                </a>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-zinc-500 mb-5">Social</p>
            <ul className="space-y-3">
              <li>
                <a
                  href={siteConfig.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-zinc-500 hover:text-white transition-colors flex items-center gap-2"
                >
                  <Instagram size={14} />
                  {siteConfig.instagram}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-16 pt-8 border-t border-white/[0.04] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-zinc-600">
            &copy; {new Date().getFullYear()} OneLap Studio. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <span className="text-xs text-zinc-600">Made with obsessive attention to detail.</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
