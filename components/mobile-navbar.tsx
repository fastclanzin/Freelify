"use client"

import { useState } from "react"
import { ChevronLeft, Menu, X } from "lucide-react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"

interface MobileNavbarProps {
  title: string
  showBackButton?: boolean
}

export default function MobileNavbar({ title, showBackButton = true }: MobileNavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const router = useRouter()

  const toggleMenu = () => {
    setMenuOpen(!menuOpen)
  }

  const goBack = () => {
    router.back()
  }

  return (
    <>
      <div className="sticky top-0 z-10 bg-white dark:bg-[#131313] shadow-sm">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-3">
            {showBackButton && (
              <button onClick={goBack} className="p-1">
                <ChevronLeft className="text-[#00e6a1] dark:text-white" size={24} />
              </button>
            )}
            <h1 className="text-lg font-bold text-[#00e6a1] dark:text-white">{title}</h1>
          </div>

          <button onClick={toggleMenu} className="p-1">
            {menuOpen ? (
              <X className="text-[#00e6a1] dark:text-white" size={24} />
            ) : (
              <Menu className="text-[#00e6a1] dark:text-white" size={24} />
            )}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-20 bg-white dark:bg-[#131313] pt-16"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            <div className="p-4 space-y-4">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 flex items-center justify-center bg-[#00e6a1] rounded-lg">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="3" y="3" width="18" height="18" rx="3" fill="#00e6a1" stroke="white" strokeWidth="1.5" />
                    <path d="M16 8H8V10H16V8Z" fill="white" />
                    <path d="M16 11.5H8V13.5H16V11.5Z" fill="white" />
                    <path d="M16 15H8V17H16V15Z" fill="white" />
                  </svg>
                </div>
                <span className="text-xl font-bold text-[#00e6a1] dark:text-white">Freelify</span>
              </div>

              <NavItem href="/" icon="search" label="Search" onClick={() => setMenuOpen(false)} />
              <NavItem href="/messages" icon="messages" label="Messages" onClick={() => setMenuOpen(false)} />
              <NavItem href="/projects" icon="projects" label="Projects" onClick={() => setMenuOpen(false)} />
              <NavItem href="/settings" icon="settings" label="Settings" onClick={() => setMenuOpen(false)} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

interface NavItemProps {
  href: string
  icon: string
  label: string
  onClick: () => void
}

function NavItem({ href, icon, label, onClick }: NavItemProps) {
  const getIcon = () => {
    switch (icon) {
      case "search":
        return (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle
              cx="11"
              cy="11"
              r="8"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M21 21l-4.35-4.35"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )
      case "messages":
        return (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )
      case "projects":
        return (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2v11z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )
      case "settings":
        return (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )
      default:
        return null
    }
  }

  return (
    <Link href={href} onClick={onClick}>
      <div className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800">
        <div className="text-[#00e6a1] dark:text-white">{getIcon()}</div>
        <span className="text-lg font-medium text-[#00e6a1] dark:text-white">{label}</span>
      </div>
    </Link>
  )
}
