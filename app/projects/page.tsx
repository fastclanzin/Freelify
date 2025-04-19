"use client"

import { useState } from "react"
import { Search, FileIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar } from "@/components/ui/avatar"
import Sidebar from "@/components/sidebar"
import { motion } from "framer-motion"
import { useMediaQuery } from "@/hooks/use-media-query"
import MobileNavbar from "@/components/mobile-navbar"
import { useRouter } from "next/navigation"

type Project = {
  id: number
  title: string
  category: string
  icon: string
  status: "finished" | "in progress"
  deliveryDate: string
}

const projects: Project[] = [
  {
    id: 1,
    title: "Graphic Design - Brand identity",
    category: "Graphic Design",
    icon: "/images/graphic-design-icon.png",
    status: "in progress",
    deliveryDate: "19/04/25",
  },
  {
    id: 2,
    title: "E-commerce Website Development",
    category: "Web Development",
    icon: "/images/web-dev-icon.png",
    status: "in progress",
    deliveryDate: "25/04/25",
  },
  {
    id: 3,
    title: "Content Marketing Strategy",
    category: "Marketing",
    icon: "/images/marketing-icon.png",
    status: "finished",
    deliveryDate: "15/03/25",
  },
  {
    id: 4,
    title: "Technical Documentation",
    category: "Writing",
    icon: "/images/writing-icon.png",
    status: "finished",
    deliveryDate: "10/03/25",
  },
  {
    id: 5,
    title: "Mobile App UI Design",
    category: "UI/UX Design",
    icon: "/images/graphic-design-icon.png",
    status: "in progress",
    deliveryDate: "30/04/25",
  },
  {
    id: 6,
    title: "Blog Content Creation",
    category: "Writing",
    icon: "/images/writing-icon.png",
    status: "finished",
    deliveryDate: "05/03/25",
  },
  {
    id: 7,
    title: "Social Media Campaign",
    category: "Marketing",
    icon: "/images/marketing-icon.png",
    status: "in progress",
    deliveryDate: "22/04/25",
  },
  {
    id: 8,
    title: "Landing Page Redesign",
    category: "Web Development",
    icon: "/images/web-dev-icon.png",
    status: "finished",
    deliveryDate: "01/03/25",
  },
]

export default function ProjectsPage() {
  const [filter, setFilter] = useState<"all" | "finished" | "in progress">("in progress")
  const [searchTerm, setSearchTerm] = useState("")
  const isMobile = useMediaQuery("(max-width: 768px)")
  const router = useRouter()

  const filteredProjects = projects.filter((project) => {
    const matchesFilter = filter === "all" || project.status === filter
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesFilter && matchesSearch
  })

  const handleProfileClick = () => {
    router.push("/portfolio")
  }

  // Mobile layout
  if (isMobile) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-[#131313]">
        <MobileNavbar title="Projects" showBackButton={false} />

        <div className="p-4">
          {/* Search Bar */}
          <div className="relative w-full mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search projects"
              className="w-full pl-10 pr-4 py-2 rounded-full bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#00e6a1] dark:bg-gray-800 dark:text-white dark:placeholder-gray-400"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Filter Tabs */}
          <div className="flex gap-2 mb-6">
            <Button
              variant={filter === "finished" ? "default" : "outline"}
              className={`rounded-full text-sm ${
                filter === "finished"
                  ? "bg-white text-gray-800 border border-gray-200"
                  : "bg-transparent text-gray-600 border border-gray-200"
              }`}
              onClick={() => setFilter("finished")}
            >
              finished
            </Button>
            <Button
              variant={filter === "in progress" ? "default" : "outline"}
              className={`rounded-full text-sm ${
                filter === "in progress"
                  ? "bg-[#00e6a1]/20 text-[#00e6a1] border border-[#00e6a1]/20"
                  : "bg-transparent text-gray-600 border border-gray-200"
              }`}
              onClick={() => setFilter("in progress")}
            >
              in progress
            </Button>
          </div>

          {/* Projects List */}
          <div className="space-y-3">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="bg-white rounded-xl p-4 shadow-sm flex items-center justify-between dark:bg-[#1a1a1a]"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#00e6a1]/20 flex items-center justify-center">
                    <FileIcon className="text-[#00e6a1]" size={20} />
                  </div>
                  <div>
                    <h3 className="font-medium text-sm dark:text-white">{project.title}</h3>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs font-medium text-[#00e6a1]">
                    {project.status === "in progress" ? "In Progress" : "Finished"}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    delivery time
                    <br />
                    {project.deliveryDate}
                  </div>
                </div>
              </div>
            ))}

            {filteredProjects.length === 0 && (
              <div className="text-center py-10 text-gray-500 dark:text-gray-400">No projects found</div>
            )}
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

        {/* Main Content - Made scrollable independently */}
        <div className="flex-1 flex flex-col h-[calc(100vh-3rem)]">
          {/* Top Navigation with Profile */}
          <div className="flex items-center justify-between p-6 border-b border-gray-100 dark:border-gray-800">
            <div className="relative w-full max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search projects"
                className="w-full pl-10 pr-4 py-2 rounded-full bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#00e6a1] dark:bg-gray-800 dark:text-white dark:placeholder-gray-400"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="ml-4">
              <Avatar
                className="w-10 h-10 rounded-full cursor-pointer hover:ring-2 hover:ring-[#00e6a1] transition-all"
                onClick={handleProfileClick}
              >
                <img src="/images/user-profile.jpeg" alt="User profile" className="w-full h-full object-cover" />
              </Avatar>
            </div>
          </div>

          {/* Filter Tabs */}
          <div className="flex gap-3 px-6 pt-6">
            <Button
              variant={filter === "finished" ? "default" : "outline"}
              className={`rounded-full px-6 ${
                filter === "finished"
                  ? "bg-white text-gray-800 border border-gray-200 hover:bg-gray-50"
                  : "bg-transparent text-gray-600 border border-gray-200"
              }`}
              onClick={() => setFilter("finished")}
            >
              finished
            </Button>
            <Button
              variant={filter === "in progress" ? "default" : "outline"}
              className={`rounded-full px-6 ${
                filter === "in progress"
                  ? "bg-[#00e6a1]/20 text-[#00e6a1] border border-[#00e6a1]/20 hover:bg-[#00e6a1]/30"
                  : "bg-transparent text-gray-600 border border-gray-200"
              }`}
              onClick={() => setFilter("in progress")}
            >
              in progress
            </Button>
          </div>

          {/* Projects List - Scrollable */}
          <div className="flex-1 overflow-y-auto p-6 pt-4">
            <div className="space-y-4">
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 flex items-center justify-between dark:bg-[#1a1a1a] dark:border-gray-800"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  whileHover={{ y: -3, transition: { duration: 0.2 } }}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-[#00e6a1]/20 flex items-center justify-center">
                      <FileIcon className="text-[#00e6a1]" size={24} />
                    </div>
                    <div>
                      <h3 className="font-medium text-lg dark:text-white">{project.title}</h3>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-[#00e6a1] mb-1">
                      {project.status === "in progress" ? "In Progress" : "Finished"}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      delivery time
                      <br />
                      {project.deliveryDate}
                    </div>
                  </div>
                </motion.div>
              ))}

              {filteredProjects.length === 0 && (
                <div className="text-center py-20 text-gray-500 dark:text-gray-400">No projects found</div>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
