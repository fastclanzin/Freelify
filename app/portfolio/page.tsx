"use client"

import { useState } from "react"
import Image from "next/image"
import { MapPin, ExternalLink, X, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import Logo from "@/components/logo"

// Sample portfolio data
const portfolioData = {
  user: {
    name: "Jovem Sábio",
    location: "São Paulo, SP",
    bio: "Creative designer with 5+ years of experience specializing in user interface design, branding, and digital illustration.",
    avatar: "/images/user-profile.jpeg",
    stats: {
      completed: 12,
      inProgress: 5,
    },
    pricing: {
      message: 250,
    },
  },
  specializations: ["Design Digital", "MI", "Augmentao", "Aug"],
  projects: [
    {
      id: 1,
      title: "Design That Inspires",
      category: "Web Design",
      description: "Modern web design with creative elements and intuitive user experience.",
      image: "/placeholder.svg?height=400&width=400&text=Design+That+Inspires",
      color: "#00e6a1",
    },
    {
      id: 2,
      title: "Brand Identity",
      category: "Branding",
      description: "Complete brand identity design including logo, color palette, typography, and brand guidelines.",
      image: "/placeholder.svg?height=400&width=400&text=Brand+Identity",
      color: "#00e6a1",
    },
    {
      id: 3,
      title: "Mobile App Analytics",
      category: "UI/UX",
      description: "User interface design for a mobile analytics application with a focus on data visualization.",
      image: "/placeholder.svg?height=400&width=400&text=Mobile+App",
      color: "#00e6a1",
    },
    {
      id: 4,
      title: "Abstract Waves",
      category: "Illustration",
      description: "Abstract digital illustration with flowing organic shapes and gradients.",
      image: "/placeholder.svg?height=400&width=400&text=Abstract+Waves",
      color: "#00e6a1",
    },
    {
      id: 5,
      title: "Robot Character",
      category: "3D Design",
      description: "Friendly robot character design for a children's educational app.",
      image: "/placeholder.svg?height=400&width=400&text=Robot+Character",
      color: "#00e6a1",
    },
    {
      id: 6,
      title: "Abstract Art",
      category: "Digital Art",
      description: "Minimalist abstract art with geometric shapes and bold colors.",
      image: "/placeholder.svg?height=400&width=400&text=Abstract+Art",
      color: "#00e6a1",
    },
  ],
}

export default function PortfolioPage() {
  const [selectedProject, setSelectedProject] = useState<any>(null)

  const openProjectDetails = (project: any) => {
    setSelectedProject(project)
  }

  const closeProjectDetails = () => {
    setSelectedProject(null)
  }

  return (
    <div className="flex min-h-screen bg-gray-50 p-6 dark:bg-[#131313]">
      <motion.div
        className="flex w-full rounded-3xl overflow-hidden shadow-lg bg-white dark:bg-[#131313]"
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Logo and content container */}
        <div className="w-full p-6">
          {/* Logo and Back Button */}
          <div className="flex items-center justify-between mb-8">
            <Logo />
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full h-10 w-10"
              onClick={() => window.history.back()}
            >
              <ArrowLeft className="h-5 w-5 text-gray-500 dark:text-gray-400" />
            </Button>
          </div>

          <div className="flex flex-col md:flex-row gap-8">
            {/* Left Sidebar - Profile */}
            <div className="md:w-[280px] shrink-0">
              <div className="flex flex-col items-center">
                {/* Profile Image - make it smaller */}
                <div className="w-[150px] h-[150px] rounded-lg overflow-hidden mb-4">
                  <Image
                    src={portfolioData.user.avatar || "/placeholder.svg"}
                    alt={portfolioData.user.name}
                    width={150}
                    height={150}
                    className="object-cover w-full h-full"
                  />
                </div>

                {/* Name and Location */}
                <h2 className="text-xl font-bold text-[#00a082] mb-1">{portfolioData.user.name}</h2>
                <p className="text-gray-500 text-sm flex items-center gap-1 mb-4 dark:text-gray-400">
                  <MapPin size={14} />
                  <span>@ {portfolioData.user.location}</span>
                </p>

                {/* Follow Button */}
                <Button className="w-full bg-[#00e6a1] hover:bg-[#00cc8c] text-white mb-6">Follow</Button>

                {/* Pricing */}
                <div className="w-full mb-6">
                  <h3 className="text-xl font-bold text-center mb-1 dark:text-white">
                    R$ {portfolioData.user.pricing.message}
                  </h3>
                  <p className="text-gray-500 text-sm text-center dark:text-gray-400">Mensagem</p>
                </div>

                {/* Stats */}
                <div className="flex w-full justify-between mb-6">
                  <div className="text-center">
                    <p className="text-lg font-bold dark:text-white">{portfolioData.user.stats.completed}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Complete</p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-bold dark:text-white">{portfolioData.user.stats.inProgress}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">In Progress</p>
                  </div>
                </div>

                {/* Specializations */}
                <div className="w-full">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-4 h-4 rounded-sm bg-[#00e6a1]"></div>
                    <h3 className="font-medium dark:text-white">Speccialization</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {portfolioData.specializations.map((spec, index) => (
                      <span
                        key={index}
                        className="text-xs px-3 py-1 bg-gray-100 text-gray-600 rounded-full dark:bg-gray-800 dark:text-gray-300"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content - Portfolio */}
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-[#00a082] mb-6 dark:text-white">Portfolio</h1>

              {/* Portfolio Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {portfolioData.projects.map((project) => (
                  <motion.div
                    key={project.id}
                    className="bg-[#e6fff9] rounded-xl overflow-hidden cursor-pointer dark:bg-[#00e6a1]/20"
                    whileHover={{ y: -5, transition: { duration: 0.2 } }}
                    onClick={() => openProjectDetails(project)}
                  >
                    <div className="relative h-[220px] w-full">
                      <Image
                        src={project.image || "/placeholder.svg"}
                        alt={project.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Project Details Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm bg-black/30"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeProjectDetails}
          >
            <motion.div
              className="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 border-b border-gray-200 flex justify-between items-center">
                <h2 className="text-2xl font-bold text-[#00a082]">{selectedProject.title}</h2>
                <Button variant="ghost" size="icon" onClick={closeProjectDetails} className="rounded-full h-10 w-10">
                  <X size={20} />
                </Button>
              </div>

              <div className="p-6">
                <div className="relative h-[300px] w-full mb-6 rounded-lg overflow-hidden">
                  <Image
                    src={selectedProject.image || "/placeholder.svg"}
                    alt={selectedProject.title}
                    fill
                    className="object-cover"
                  />
                </div>

                <Badge className="mb-4 bg-[#00e6a1] text-white">{selectedProject.category}</Badge>

                <p className="text-gray-600 mb-6">{selectedProject.description}</p>

                <div className="flex justify-end">
                  <Button className="bg-[#00e6a1] hover:bg-[#00cc8c] text-white">
                    <ExternalLink size={16} className="mr-2" />
                    View Project
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
