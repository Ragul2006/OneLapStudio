'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { products as initialProducts, contactInfo as initialContact, type Product } from './data'
import { supabase } from './supabaseClient'

export interface SiteConfig {
  id?: number
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
  updateProject: (index: number, updated: Product) => Promise<void>
  addProject: (product: Product) => Promise<void>
  deleteProject: (index: number) => Promise<void>
  siteConfig: SiteConfig
  updateSiteConfig: (newConfig: Partial<SiteConfig>) => Promise<void>
  resetAllData: () => void
  isDataLoading: boolean
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
  const [isDataLoading, setIsDataLoading] = useState(true)

  // Fetch data from Supabase on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsDataLoading(true)
        
        // Load Admin Auth
        const token = localStorage.getItem('onelap_admin_user')
        if (token) {
          setAdminUser(JSON.parse(token))
          setIsAdminLoggedIn(true)
        }

        // Fetch Projects
        const { data: projects, error: projectsError } = await supabase
          .from('projects')
          .select('*')
          .order('sort_order', { ascending: true })

        if (projectsError) throw projectsError
        
        if (projects && projects.length > 0) {
          setProjectsList(projects)
        } else {
          setProjectsList(initialProducts)
        }

        // Fetch Site Config
        const { data: config, error: configError } = await supabase
          .from('site_config')
          .select('*')
          .eq('id', 1)
          .single()

        if (configError && configError.code !== 'PGRST116') throw configError // PGRST116 is multiple/no rows

        if (config) {
          setSiteConfig({
            id: config.id,
            availabilityBadge: config.availability_badge,
            heroTitle: config.hero_title,
            heroSubtitle: config.hero_subtitle,
            email: config.email,
            phone: config.phone,
            instagram: config.instagram,
            instagramUrl: config.instagram_url,
          })
        }
      } catch (err) {
        console.error('Failed to load data from Supabase:', err)
        setProjectsList(initialProducts)
      } finally {
        setIsDataLoading(false)
      }
    }

    fetchData()
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

  const updateProject = async (index: number, updated: Product) => {
    const oldList = [...projectsList]
    const newList = [...projectsList]
    newList[index] = updated
    setProjectsList(newList) // Optimistic update

    try {
      if (updated.id) {
        const { error } = await supabase
          .from('projects')
          .update({
            title: updated.title,
            tag: updated.tag,
            description: updated.description,
            status: updated.status,
            features: updated.features,
            image: updated.image
          })
          .eq('id', updated.id)
          
        if (error) throw error
      }
    } catch (error) {
      console.error('Failed to update project in Supabase', error)
      setProjectsList(oldList) // Revert on failure
    }
  }

  const addProject = async (product: Product) => {
    const { id, ...projectData } = product
    
    try {
      const { data, error } = await supabase
        .from('projects')
        .insert([{
          title: projectData.title,
          tag: projectData.tag,
          description: projectData.description,
          status: projectData.status,
          features: projectData.features,
          image: projectData.image,
          sort_order: 0 // New projects appear first
        }])
        .select()
        .single()

      if (error) throw error
      if (data) {
        setProjectsList([data, ...projectsList])
      }
    } catch (error) {
      console.error('Failed to add project to Supabase', error)
      // Fallback optimistic
      setProjectsList([{ ...product, id: Date.now().toString() }, ...projectsList])
    }
  }

  const deleteProject = async (index: number) => {
    const project = projectsList[index]
    const oldList = [...projectsList]
    
    const newList = projectsList.filter((_, i) => i !== index)
    setProjectsList(newList) // Optimistic

    try {
      if (project.id) {
        const { error } = await supabase
          .from('projects')
          .delete()
          .eq('id', project.id)
          
        if (error) throw error
      }
    } catch (error) {
      console.error('Failed to delete project in Supabase', error)
      setProjectsList(oldList) // Revert on failure
    }
  }

  const updateSiteConfig = async (newConfig: Partial<SiteConfig>) => {
    const oldConfig = { ...siteConfig }
    const merged = { ...siteConfig, ...newConfig }
    setSiteConfig(merged) // Optimistic

    try {
      const { error } = await supabase
        .from('site_config')
        .upsert({
          id: 1,
          availability_badge: merged.availabilityBadge,
          hero_title: merged.heroTitle,
          hero_subtitle: merged.heroSubtitle,
          email: merged.email,
          phone: merged.phone,
          instagram: merged.instagram,
          instagram_url: merged.instagramUrl
        })

      if (error) throw error
    } catch (error) {
      console.error('Failed to update site config in Supabase', error)
      setSiteConfig(oldConfig) // Revert on failure
    }
  }

  const resetAllData = () => {
    // We do not reset the database automatically for safety, 
    // but we can reload the default state locally.
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
        isDataLoading
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
