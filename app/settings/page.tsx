"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Moon, Sun, Bell, Globe, Lock, HelpCircle } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Sidebar from "@/components/sidebar"
import { motion } from "framer-motion"
import { useMediaQuery } from "@/hooks/use-media-query"
import MobileNavbar from "@/components/mobile-navbar"
import { useRouter } from "next/navigation"
import { Avatar } from "@/components/ui/avatar"

type SettingCard = {
  id: string
  title: string
  description: string
  icon: React.ReactNode
  action?: React.ReactNode
}

export default function SettingsPage() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [language, setLanguage] = useState("pt-BR")
  const [siteLanguage, setSiteLanguage] = useState("pt-BR")
  const isMobile = useMediaQuery("(max-width: 768px)")
  const router = useRouter()

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  const handleThemeChange = () => {
    const newTheme = theme === "dark" ? "light" : "dark"
    setTheme(newTheme)
    // Force theme update
    if (newTheme === "dark") {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }

  const settingCards: SettingCard[] = [
    {
      id: "theme",
      title: "Aparência",
      description: "Alternar entre modo claro e escuro",
      icon: theme === "dark" ? <Moon size={24} /> : <Sun size={24} />,
      action: (
        <div className="flex items-center gap-2">
          <Sun size={16} className="text-gray-500 dark:text-gray-400" />
          <Switch checked={theme === "dark"} onCheckedChange={handleThemeChange} />
          <Moon size={16} className="text-gray-500 dark:text-gray-400" />
        </div>
      ),
    },
    {
      id: "language",
      title: "Idioma",
      description: "Altere o idioma da plataforma",
      icon: <Globe size={24} />,
      action: (
        <Select
          value={siteLanguage}
          onValueChange={(value) => {
            setSiteLanguage(value)
            // Here you would typically update the site-wide language
            console.log("Site language changed to:", value)
          }}
        >
          <SelectTrigger className="w-[120px] dark:border-gray-700 dark:text-gray-300">
            <SelectValue placeholder="Idioma" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="pt-BR">Português</SelectItem>
            <SelectItem value="en-US">English</SelectItem>
          </SelectContent>
        </Select>
      ),
    },
    {
      id: "notifications",
      title: "Notificações",
      description: "Gerencie suas preferências de notificação",
      icon: <Bell size={24} />,
      action: (
        <Switch
          defaultChecked
          onCheckedChange={(checked) => console.log("Notificações:", checked ? "ativadas" : "desativadas")}
        />
      ),
    },
    {
      id: "privacy",
      title: "Privacidade & Segurança",
      description: "Gerencie suas configurações de privacidade",
      icon: <Lock size={24} />,
      action: (
        <Button
          variant="outline"
          className="text-sm dark:border-gray-700 dark:text-gray-300"
          onClick={() => alert("Gerenciar privacidade")}
        >
          Gerenciar
        </Button>
      ),
    },
    {
      id: "help",
      title: "Ajuda & Suporte",
      description: "Obtenha ajuda ou entre em contato com o suporte",
      icon: <HelpCircle size={24} />,
      action: (
        <Button
          variant="outline"
          className="text-sm dark:border-gray-700 dark:text-gray-300"
          onClick={() => alert("Contato com suporte")}
        >
          Contato
        </Button>
      ),
    },
  ]

  if (!mounted) {
    return null
  }

  // Mobile layout
  if (isMobile) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-[#131313]">
        <MobileNavbar title="Configurações" />

        <div className="p-4">
          {/* Appearance Card - Separate for mobile */}
          <div className="bg-white dark:bg-[#1a1a1a] rounded-xl p-4 mb-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-50 rounded-lg text-[#00e6a1] dark:bg-green-900/30 dark:text-green-300">
                  {theme === "dark" ? <Moon size={20} /> : <Sun size={20} />}
                </div>
                <div>
                  <h3 className="font-medium text-base dark:text-white">Aparência</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Alternar entre modo claro e escuro</p>
                </div>
              </div>
              <Switch checked={theme === "dark"} onCheckedChange={handleThemeChange} />
            </div>
          </div>

          {/* Other settings */}
          <div className="space-y-3">
            {settingCards.slice(1).map((card) => (
              <div key={card.id} className="bg-white dark:bg-[#1a1a1a] rounded-xl p-4 shadow-sm">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-green-50 rounded-lg text-[#00e6a1] dark:bg-green-900/30 dark:text-green-300">
                      {card.icon}
                    </div>
                    <div>
                      <h3 className="font-medium text-base dark:text-white">{card.title}</h3>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{card.description}</p>
                    </div>
                  </div>
                  <div className="scale-90 origin-right">{card.action}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  // Desktop layout
  return (
    <div className="flex min-h-screen bg-gray-50 p-6 dark:bg-[#131313]">
      <motion.div
        className="flex w-full rounded-3xl overflow-hidden shadow-lg bg-white dark:bg-[#131313]"
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Left Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <div className="flex-1 p-6">
          {/* Standardize the header with profile avatar in the Settings page */}
          <div className="flex items-center justify-between p-6 border-b border-gray-100 dark:border-gray-800 mb-8">
            <div className="relative w-full max-w-md">
              <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Settings</h1>
            </div>
            <div className="ml-4">
              <Avatar
                className="w-10 h-10 rounded-full cursor-pointer hover:ring-2 hover:ring-[#00e6a1] transition-all"
                onClick={() => router.push("/portfolio")}
              >
                <img src="/images/user-profile.jpeg" alt="User profile" className="w-full h-full object-cover" />
              </Avatar>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {settingCards.map((card, index) => (
              <motion.div
                key={card.id}
                className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 dark:bg-[#1a1a1a] dark:border-gray-800"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-green-50 rounded-lg text-[#00e6a1] dark:bg-green-900/30 dark:text-green-300">
                      {card.icon}
                    </div>
                    <div>
                      <h3 className="font-medium text-lg dark:text-white">{card.title}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{card.description}</p>
                    </div>
                  </div>
                  <div>{card.action}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  )
}
