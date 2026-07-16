'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { products as initialProducts, contactInfo as initialContact, type Product } from './data'

export interface SiteConfig {
  availabilityBadge: string
  heroTitle: string
  heroSubtitle: string
  email: string
  phone: string
  instagram: string
  instagramUrl: string
}

const DEFAULT_SITE_CONFIG: SiteConfig = {
  availabilityBadge: 'Currently available for projects',
  heroTitle: 'We Build Digital Products That Feel Modern',
  heroSubtitle:
    'OneLap Studio crafts premium software — from AI-powered platforms to sleek mobile apps — with obsessive attention to detail and modern technology.',
  email: initialContact.email,
  phone: initialContact.phone,
  instagram: initialContact.instagram,
  instagramUrl: initialContact.instagramUrl,
}

export const ADMIN_ACCOUNTS = [
  {
    email: 'admin@onelapstudio.com',
    password: 'password123',
    name: 'OneLap Lead Admin',
    role: 'SUPER_ADMIN',
  },
  {
    email: 'onelapstudio7@gmail.com',
    password: 'onelap123',
    name: 'OneLap Founder',
    role: 'SUPER_ADMIN',
  },
]

interface AdminContextType {
  isAdminLoggedIn: boolean
  adminUser: { email: string; name: string; role: string } | null
  loginAdmin: (email: string, pass: string) => Promise<{ success: boolean; error?: string }>
  logoutAdmin: () => void
  isLoginModalOpen: boolean
  openLoginModal: () => void
  closeLoginModal: () => void
  isEditorModalOpen: boolean
  openEditorModal: (tab?: 'projects' | 'settings', projectIndex?: number | null) => void
  closeEditorModal: () => void
  activeEditorTab: 'projects' | 'settings'
  selectedProjectIndex: number | null
  projectsList: Product[]
  updateProject: (index: number, updated: Product) => void
  addProject: (product: Product) => void
  deleteProject: (index: number) => void
  siteConfig: SiteConfig
  updateSiteConfig: (newConfig: Partial<SiteConfig>) => void
  resetAllData: () => void
}

const AdminContext = createContext<AdminContextType | undefined>(undefined)

export function AdminProvider({ children }: { children: ReactNode }) {
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false)
  const [adminUser, setAdminUser] = useState<{ email: string; name: string; role: string } | null>(null)
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
  const [isEditorModalOpen, setIsEditorModalOpen] = useState(false)
  const [activeEditorTab, setActiveEditorTab] = useState<'projects' | 'settings'>('projects')
  const [selectedProjectIndex, setSelectedProjectIndex] = useState<number | null>(null)

  const [projectsList, setProjectsList] = useState<Product[]>(initialProducts)
  const [siteConfig, setSiteConfig] = useState<SiteConfig>(DEFAULT_SITE_CONFIG)

  // Load saved state from localStorage on mount
  useEffect(() => {
    try {
      const token = localStorage.getItem('onelap_admin_user')
      if (token) {
        setAdminUser(JSON.parse(token))
        setIsAdminLoggedIn(true)
      }
      const savedProjects = localStorage.getItem('onelap_projects_list')
      if (savedProjects) {
        setProjectsList(JSON.parse(savedProjects))
      }
      const savedConfig = localStorage.getItem('onelap_site_config')
      if (savedConfig) {
        setSiteConfig(JSON.parse(savedConfig))
      }
    } catch (err) {
      console.error('Failed to load local admin storage:', err)
    }
  }, [])

  const loginAdmin = async (email: string, pass: string) => {
    const normalizedEmail = email.trim().toLowerCase()

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: normalizedEmail, password: pass }),
      })
      const data = await res.json()
      if (res.ok && data.success) {
        localStorage.setItem('onelap_admin_user', JSON.stringify(data.user))
        setAdminUser(data.user)
        setIsAdminLoggedIn(true)
        setIsLoginModalOpen(false)
        return { success: true }
      }
    } catch (err) {
      // Fallback check if server endpoint unreachable
    }

    if (normalizedEmail === 'onelapstudio7@gmail.com' && pass === 'OneLapStudio@0610') {
      const user = { email: normalizedEmail, name: 'OneLap Lead Admin', role: 'SUPER_ADMIN' }
      localStorage.setItem('onelap_admin_user', JSON.stringify(user))
      setAdminUser(user)
      setIsAdminLoggedIn(true)
      setIsLoginModalOpen(false)
      return { success: true }
    }

    return { success: false, error: 'Invalid admin email or password.' }
  }

  const logoutAdmin = () => {
    localStorage.removeItem('onelap_admin_user')
    setIsAdminLoggedIn(false)
    setAdminUser(null)
    setIsEditorModalOpen(false)
  }

  const openEditorModal = (tab: 'projects' | 'settings' = 'projects', projectIndex: number | null = null) => {
    setActiveEditorTab(tab)
    setSelectedProjectIndex(projectIndex)
    setIsEditorModalOpen(true)
  }

  const closeEditorModal = () => {
    setIsEditorModalOpen(false)
    setSelectedProjectIndex(null)
  }

  const updateProject = (index: number, updated: Product) => {
    const newList = [...projectsList]
    newList[index] = updated
    setProjectsList(newList)
    localStorage.setItem('onelap_projects_list', JSON.stringify(newList))
  }

  const addProject = (product: Product) => {
    const newList = [product, ...projectsList]
    setProjectsList(newList)
    localStorage.setItem('onelap_projects_list', JSON.stringify(newList))
  }

  const deleteProject = (index: number) => {
    const newList = projectsList.filter((_, i) => i !== index)
    setProjectsList(newList)
    localStorage.setItem('onelap_projects_list', JSON.stringify(newList))
  }

  const updateSiteConfig = (newConfig: Partial<SiteConfig>) => {
    const merged = { ...siteConfig, ...newConfig }
    setSiteConfig(merged)
    localStorage.setItem('onelap_site_config', JSON.stringify(merged))
  }

  const resetAllData = () => {
    localStorage.removeItem('onelap_projects_list')
    localStorage.removeItem('onelap_site_config')
    setProjectsList(initialProducts)
    setSiteConfig(DEFAULT_SITE_CONFIG)
  }

  return (
    <AdminContext.Provider
      value={{
        isAdminLoggedIn,
        adminUser,
        loginAdmin,
        logoutAdmin,
        isLoginModalOpen,
        openLoginModal: () => setIsLoginModalOpen(true),
        closeLoginModal: () => setIsLoginModalOpen(false),
        isEditorModalOpen,
        openEditorModal,
        closeEditorModal,
        activeEditorTab,
        selectedProjectIndex,
        projectsList,
        updateProject,
        addProject,
        deleteProject,
        siteConfig,
        updateSiteConfig,
        resetAllData,
      }}
    >
      {children}
    </AdminContext.Provider>
  )
}

export function useAdmin() {
  const context = useContext(AdminContext)
  if (!context) {
    throw new Error('useAdmin must be used within an AdminProvider')
  }
  return context
}
