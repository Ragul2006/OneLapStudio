import {
  Brain, Smartphone, Cloud, Globe, Palette, Zap,
  Rocket, Code2, Cpu, LayoutGrid, Users, MonitorSmartphone,
  type LucideIcon,
} from 'lucide-react'

/* ─── Navigation ─── */
export const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Projects', href: '#projects' },
  { label: 'Process', href: '#process' },
  { label: 'Contact', href: '#contact' },
]

/* ─── Services ─── */
export interface Service {
  icon: LucideIcon
  title: string
  description: string
}

export const services: Service[] = [
  { icon: Brain, title: 'AI Development', description: 'Intelligent systems powered by cutting-edge machine learning and natural language processing.' },
  { icon: Smartphone, title: 'Mobile Apps', description: 'Native and cross-platform mobile applications with fluid interactions and premium UX.' },
  { icon: Cloud, title: 'SaaS Platforms', description: 'Scalable cloud-based software solutions built for growth and performance.' },
  { icon: Globe, title: 'Web Development', description: 'Modern web applications with server-side rendering, real-time features, and blazing speed.' },
  { icon: Palette, title: 'UI/UX Design', description: 'Human-centered design with pixel-perfect interfaces and intuitive user flows.' },
  { icon: Zap, title: 'Automation Systems', description: 'End-to-end workflow automation that eliminates repetitive tasks and boosts efficiency.' },
]

/* ─── Products ─── */
export interface Product {
  id?: string
  title: string
  tag: string
  description: string
  status: string
  features: string[]
  image: string
}

export const products: Product[] = [
  {
    title: 'TamilWedHub',
    tag: 'Wedding Vendor Discovery App',
    description: 'TamilWedHub is a wedding vendor discovery platform designed to help users find nearby wedding service providers easily. Users can search and explore services like photography, catering, wedding halls, stage decoration, and more based on their location.',
    status: 'Currently Under Development',
    features: [
      'Search nearby wedding vendors',
      'Vendor category browsing',
      'Location-based discovery',
      'Simple and clean mobile experience',
    ],
    image: '/tamilwedhub.png',
  },
  {
    title: 'AIThedicate',
    tag: 'AI Interview Monitoring Extension',
    description: 'AIThedicate is a browser extension concept focused on helping interviewers identify whether online interview answers may be AI-generated during platforms like Google Meet and Zoom.',
    status: 'Research & Prototype Stage',
    features: [
      'Browser extension interface',
      'AI-generated answer analysis concept',
      'Interview assistance workflow',
      'Google Meet & Zoom compatibility concept',
    ],
    image: '/aithedicate.png',
  },
]

/* ─── Process ─── */
export const processSteps = [
  { step: 1, title: 'Idea', description: 'We understand your vision, goals, and target audience deeply.' },
  { step: 2, title: 'Design', description: 'Creating wireframes and high-fidelity designs that bring ideas to life.' },
  { step: 3, title: 'Development', description: 'Building with modern tech, clean architecture, and best practices.' },
  { step: 4, title: 'Testing', description: 'Rigorous testing to ensure quality, performance, and reliability.' },
  { step: 5, title: 'Launch', description: 'Deploying to production with monitoring and ongoing support.' },
]

/* ─── Why Choose Us ─── */
export const whyChooseUs: Service[] = [
  { icon: Rocket, title: 'Fast Development', description: 'Rapid prototyping and agile delivery without compromising quality.' },
  { icon: Code2, title: 'Clean Architecture', description: 'Maintainable, scalable code following industry best practices.' },
  { icon: Cpu, title: 'AI Integration', description: 'Seamless AI capabilities embedded into your products.' },
  { icon: LayoutGrid, title: 'Scalable Systems', description: 'Infrastructure built to grow with your business from day one.' },
  { icon: Users, title: 'Startup-Friendly', description: 'We understand the startup ecosystem and move at startup speed.' },
  { icon: MonitorSmartphone, title: 'Modern UI Focus', description: 'Interfaces that look stunning and feel intuitive on every device.' },
]

/* ─── Contact ─── */
export const contactInfo = {
  email: 'onelapstudio7@gmail.com',
  phone: '+91 9360893246',
  instagram: '@onelap_studio',
  instagramUrl: 'https://instagram.com/onelap_studio',
}
