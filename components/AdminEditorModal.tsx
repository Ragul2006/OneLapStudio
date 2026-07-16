'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Plus, Trash2, Save, RotateCcw, LayoutGrid, Settings } from 'lucide-react'
import { useAdmin, type SiteConfig } from '@/lib/adminContext'
import { type Product } from '@/lib/data'

export default function AdminEditorModal() {
  const {
    isEditorModalOpen,
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
  } = useAdmin()

  const [tab, setTab] = useState<'projects' | 'settings'>('projects')
  const [editingIndex, setEditingIndex] = useState<number | null>(null)
  const [formData, setFormData] = useState<Product>({
    title: '',
    tag: '',
    description: '',
    status: 'In Active Development',
    features: ['Modern UX Design', 'Scalable Architecture'],
    image: '/tamilwedhub.png',
  })

  const [siteData, setSiteData] = useState<SiteConfig>(siteConfig)
  const [toast, setToast] = useState<string | null>(null)

  useEffect(() => {
    if (isEditorModalOpen) {
      setTab(activeEditorTab)
      setSiteData(siteConfig)
      if (selectedProjectIndex !== null && projectsList[selectedProjectIndex]) {
        setEditingIndex(selectedProjectIndex)
        setFormData({ ...projectsList[selectedProjectIndex] })
      } else {
        setEditingIndex(null)
      }
    }
  }, [isEditorModalOpen, activeEditorTab, selectedProjectIndex, projectsList, siteConfig])

  if (!isEditorModalOpen) return null

  const showToast = (msg: string) => {
    setToast(msg)
    setTimeout(() => setToast(null), 3000)
  }

  const handleStartAddProject = () => {
    setEditingIndex(-1) // -1 signifies Add New
    setFormData({
      title: 'New Digital Product',
      tag: 'Custom Platform Concept',
      description: 'Describe the digital product, mobile application or AI software built by OneLap Studio.',
      status: 'Currently Under Development',
      features: ['Modern tech stack', 'High performance UX', 'Production ready'],
      image: '/tamilwedhub.png',
    })
  }

  const handleStartEditProject = (index: number) => {
    setEditingIndex(index)
    setFormData({ ...projectsList[index] })
  }

  const handleSaveProject = (e: React.FormEvent) => {
    e.preventDefault()
    if (editingIndex === -1) {
      addProject(formData)
      showToast('✅ New project added successfully!')
    } else if (editingIndex !== null) {
      updateProject(editingIndex, formData)
      showToast('✅ Project updated successfully!')
    }
    setEditingIndex(null)
  }

  const handleSaveSiteConfig = (e: React.FormEvent) => {
    e.preventDefault()
    updateSiteConfig(siteData)
    showToast('✅ Website hero & contact settings updated!')
  }

  const handleFeatureChange = (idx: number, val: string) => {
    const updated = [...formData.features]
    updated[idx] = val
    setFormData({ ...formData, features: updated })
  }

  const handleAddFeature = () => {
    setFormData({ ...formData, features: [...formData.features, 'New Feature'] })
  }

  const handleRemoveFeature = (idx: number) => {
    const updated = formData.features.filter((_, i) => i !== idx)
    setFormData({ ...formData, features: updated })
  }

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeEditorModal}
          className="absolute inset-0 bg-black/85 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative w-full max-w-4xl max-h-[88vh] bg-zinc-950 border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col z-10"
        >
          {/* Header Bar */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-zinc-900/60">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-white animate-pulse" />
              <h2 className="text-base sm:text-lg font-bold text-white tracking-tight">
                OneLap Studio — Website & Project Editor
              </h2>
            </div>

            <div className="flex items-center gap-2">
              {toast && (
                <span className="text-xs px-3 py-1 rounded-full bg-white/15 text-white font-medium">
                  {toast}
                </span>
              )}
              <button
                onClick={closeEditorModal}
                className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-colors"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center justify-between px-6 py-3 border-b border-white/5 bg-zinc-900/30">
            <div className="flex gap-2">
              <button
                onClick={() => {
                  setTab('projects')
                  setEditingIndex(null)
                }}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-colors ${
                  tab === 'projects'
                    ? 'bg-white text-black font-semibold'
                    : 'text-zinc-400 hover:text-white bg-white/5'
                }`}
              >
                <LayoutGrid size={15} />
                <span>Projects Management ({projectsList.length})</span>
              </button>

              <button
                onClick={() => {
                  setTab('settings')
                  setEditingIndex(null)
                }}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-colors ${
                  tab === 'settings'
                    ? 'bg-white text-black font-semibold'
                    : 'text-zinc-400 hover:text-white bg-white/5'
                }`}
              >
                <Settings size={15} />
                <span>Site & Contact Settings</span>
              </button>
            </div>

            <button
              onClick={() => {
                resetAllData()
                showToast('🔄 Reset website edits to default!')
              }}
              className="text-xs text-zinc-500 hover:text-red-400 flex items-center gap-1.5 transition-colors"
              title="Restore original project content"
            >
              <RotateCcw size={13} />
              <span>Reset Defaults</span>
            </button>
          </div>

          {/* Content Body */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {tab === 'projects' && (
              <div>
                {editingIndex === null ? (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-semibold text-zinc-300 uppercase tracking-wider">
                        Live Website Projects
                      </h3>
                      <button
                        onClick={handleStartAddProject}
                        className="px-4 py-2 rounded-xl bg-white text-black font-semibold text-xs flex items-center gap-1.5 hover:bg-zinc-200 transition-colors"
                      >
                        <Plus size={15} />
                        <span>Add New Project</span>
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {projectsList.map((product, idx) => (
                        <div
                          key={idx}
                          className="p-4 rounded-xl bg-zinc-900 border border-white/10 flex flex-col justify-between gap-4"
                        >
                          <div>
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-xs px-2.5 py-0.5 rounded-full bg-white/10 text-zinc-300 font-medium">
                                {product.tag}
                              </span>
                              <span className="text-[11px] text-white font-medium">
                                {product.status}
                              </span>
                            </div>
                            <h4 className="text-lg font-bold text-white mt-2">
                              {product.title}
                            </h4>
                            <p className="text-xs text-zinc-400 mt-1 line-clamp-2">
                              {product.description}
                            </p>
                          </div>

                          <div className="flex items-center justify-between pt-3 border-t border-white/5">
                            <button
                              onClick={() => handleStartEditProject(idx)}
                              className="px-3.5 py-1.5 rounded-lg bg-white text-black font-semibold text-xs hover:bg-zinc-200 transition-colors"
                            >
                              ✏️ Edit Project
                            </button>
                            <button
                              onClick={() => {
                                deleteProject(idx)
                                showToast('🗑️ Project removed')
                              }}
                              className="p-1.5 rounded-lg text-zinc-500 hover:text-red-400 transition-colors"
                              title="Delete project"
                            >
                              <Trash2 size={15} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSaveProject} className="space-y-5">
                    <div className="flex items-center justify-between border-b border-white/10 pb-3">
                      <h3 className="text-base font-bold text-white">
                        {editingIndex === -1 ? 'Add New Project' : `Edit Project: ${formData.title}`}
                      </h3>
                      <button
                        type="button"
                        onClick={() => setEditingIndex(null)}
                        className="text-xs text-zinc-400 hover:text-white"
                      >
                        ← Back to Projects List
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs uppercase tracking-wider font-semibold text-zinc-400 mb-1">
                          Project Title
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.title}
                          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-white text-sm outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs uppercase tracking-wider font-semibold text-zinc-400 mb-1">
                          Category / Tagline
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.tag}
                          onChange={(e) => setFormData({ ...formData, tag: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-white text-sm outline-none"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs uppercase tracking-wider font-semibold text-zinc-400 mb-1">
                          Status Badge
                        </label>
                        <input
                          type="text"
                          value={formData.status}
                          onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-white text-sm outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs uppercase tracking-wider font-semibold text-zinc-400 mb-1">
                          Image URL / Path
                        </label>
                        <input
                          type="text"
                          value={formData.image}
                          onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-white text-sm outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs uppercase tracking-wider font-semibold text-zinc-400 mb-1">
                        Detailed Description
                      </label>
                      <textarea
                        rows={3}
                        required
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-white text-sm outline-none"
                      />
                    </div>

                    {/* Features */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <label className="block text-xs uppercase tracking-wider font-semibold text-zinc-400">
                          Key Features List
                        </label>
                        <button
                          type="button"
                          onClick={handleAddFeature}
                          className="text-xs text-white hover:text-zinc-300 font-medium"
                        >
                          + Add Feature Bullet
                        </button>
                      </div>

                      <div className="space-y-2">
                        {formData.features.map((feat, i) => (
                          <div key={i} className="flex items-center gap-2">
                            <input
                              type="text"
                              value={feat}
                              onChange={(e) => handleFeatureChange(i, e.target.value)}
                              className="flex-1 px-3.5 py-2 rounded-xl bg-zinc-900 border border-white/10 text-white text-sm outline-none"
                            />
                            <button
                              type="button"
                              onClick={() => handleRemoveFeature(i)}
                              className="p-2 text-zinc-500 hover:text-red-400"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
                      <button
                        type="button"
                        onClick={() => setEditingIndex(null)}
                        className="px-4 py-2 rounded-xl text-zinc-400 hover:text-white text-sm"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-6 py-2 rounded-xl bg-white text-black font-semibold text-sm hover:bg-zinc-200 flex items-center gap-2"
                      >
                        <Save size={15} />
                        <span>Save Project Changes</span>
                      </button>
                    </div>
                  </form>
                )}
              </div>
            )}

            {tab === 'settings' && (
              <form onSubmit={handleSaveSiteConfig} className="space-y-5">
                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-zinc-400 mb-1">
                    Hero Availability Status Badge
                  </label>
                  <input
                    type="text"
                    value={siteData.availabilityBadge}
                    onChange={(e) => setSiteData({ ...siteData, availabilityBadge: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-white text-sm outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-zinc-400 mb-1">
                    Hero Main Headline
                  </label>
                  <input
                    type="text"
                    value={siteData.heroTitle}
                    onChange={(e) => setSiteData({ ...siteData, heroTitle: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-white text-sm outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-zinc-400 mb-1">
                    Hero Subtitle / About Bio
                  </label>
                  <textarea
                    rows={3}
                    value={siteData.heroSubtitle}
                    onChange={(e) => setSiteData({ ...siteData, heroSubtitle: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-white text-sm outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                  <div>
                    <label className="block text-xs uppercase tracking-wider font-semibold text-zinc-400 mb-1">
                      Contact Email
                    </label>
                    <input
                      type="email"
                      value={siteData.email}
                      onChange={(e) => setSiteData({ ...siteData, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-white text-sm outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider font-semibold text-zinc-400 mb-1">
                      Phone Number
                    </label>
                    <input
                      type="text"
                      value={siteData.phone}
                      onChange={(e) => setSiteData({ ...siteData, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-white text-sm outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider font-semibold text-zinc-400 mb-1">
                      Instagram Handle
                    </label>
                    <input
                      type="text"
                      value={siteData.instagram}
                      onChange={(e) => setSiteData({ ...siteData, instagram: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-white text-sm outline-none"
                    />
                  </div>
                </div>

                <div className="flex justify-end pt-4 border-t border-white/10">
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-white text-black font-semibold text-sm hover:bg-zinc-200 flex items-center gap-2"
                  >
                    <Save size={15} />
                    <span>Save Website Settings</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
