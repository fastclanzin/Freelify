"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { MessageSquare, FolderKanban, Settings, Search } from "lucide-react"
import { motion } from "framer-motion"
import Logo from "@/components/logo"

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="w-60 border-r border-gray-200 p-6 flex flex-col h-auto dark:border-gray-800 dark:bg-[#131313]">
      {/* Logo */}
      <div className="mb-10">
        <Logo />
      </div>

      {/* Navigation */}
      <nav className="flex-1">
        <ul className="space-y-2">
          <motion.li whileHover={{ x: 5 }} whileTap={{ scale: 0.95 }}>
            <Link
              href="/"
              className={`flex items-center gap-3 px-4 py-3 rounded-xl ${
                pathname === "/"
                  ? "bg-[#00e6a1] text-white"
                  : "text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
              }`}
            >
              <Search size={20} />
              <span className="font-medium">Search</span>
            </Link>
          </motion.li>
          <motion.li whileHover={{ x: 5 }} whileTap={{ scale: 0.95 }}>
            <Link
              href="/messages"
              className={`flex items-center gap-3 px-4 py-3 rounded-xl ${
                pathname === "/messages"
                  ? "bg-[#00e6a1] text-white"
                  : "text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
              }`}
            >
              <MessageSquare size={20} />
              <span className="font-medium">Messages</span>
            </Link>
          </motion.li>
          <motion.li whileHover={{ x: 5 }} whileTap={{ scale: 0.95 }}>
            <Link
              href="/projects"
              className={`flex items-center gap-3 px-4 py-3 rounded-xl ${
                pathname === "/projects"
                  ? "bg-[#00e6a1] text-white"
                  : "text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
              }`}
            >
              <FolderKanban size={20} />
              <span className="font-medium">Projects</span>
            </Link>
          </motion.li>
        </ul>
      </nav>

      {/* Bottom Links */}
      <div className="mt-auto">
        <motion.div whileHover={{ x: 5 }} whileTap={{ scale: 0.95 }}>
          <Link
            href="/settings"
            className={`flex items-center gap-3 px-4 py-3 rounded-xl ${
              pathname === "/settings"
                ? "bg-[#00e6a1] text-white"
                : "text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
            }`}
          >
            <Settings size={20} />
            <span className="font-medium">Settings</span>
          </Link>
        </motion.div>
      </div>
    </div>
  )
}
