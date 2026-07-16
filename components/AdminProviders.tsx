'use client'

import React from 'react'
import { AdminProvider } from '@/lib/adminContext'
import AdminLoginModal from '@/components/AdminLoginModal'
import AdminEditorModal from '@/components/AdminEditorModal'

export default function AdminProviders({ children }: { children: React.ReactNode }) {
  return (
    <AdminProvider>
      {children}
      <AdminLoginModal />
      <AdminEditorModal />
    </AdminProvider>
  )
}
