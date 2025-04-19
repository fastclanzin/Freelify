"use client"

import { useState, useRef } from "react"
import { Search, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar } from "@/components/ui/avatar"
import Sidebar from "@/components/sidebar"
import { motion, AnimatePresence } from "framer-motion"
import { useMediaQuery } from "@/hooks/use-media-query"
import MobileNavbar from "@/components/mobile-navbar"
import { useRouter } from "next/navigation"
import Image from "next/image"
import ProjectDetailsModal, { type ProjectDetails } from "@/components/project-details-modal"

type FreelanceProject = ProjectDetails

const categories = [
  { id: "all", name: "All", icon: "/images/category-ai.png" },
  { id: "graphic-design", name: "Graphic Design", icon: "/images/category-design.png" },
  { id: "web-development", name: "Web Development", icon: "/images/category-development.png" },
  { id: "writing", name: "Writing", icon: "/images/category-writing.png" },
  { id: "marketing", name: "Marketing", icon: "/images/category-marketing.png" },
]

const priceRanges = [
  { value: 250, label: "R$ 250" },
  { value: 500, label: "R$ 500" },
  { value: 1000, label: "R$ 1000" },
  { value: 1500, label: "R$ 1500" },
  { value: 2000, label: "R$ 2000" },
  { value: 3000, label: "R$ 3000" },
  { value: 4000, label: "R$ 4000" },
  { value: 5000, label: "R$ 5000" },
  { value: 10000, label: "R$ 10000" },
  { value: 15000, label: "R$ 15000" },
  { value: 20000, label: "R$ 20000" },
  { value: 25000, label: "R$ 25000" },
]

const freelanceProjects: FreelanceProject[] = [
  {
    id: 1,
    title: "Logo Design for Tech Startup",
    description:
      "Create a modern logo for a new tech startup in the AI space. We're looking for a clean, minimalist design that represents innovation and cutting-edge technology. The logo should be versatile and work well across different platforms and sizes.",
    price: 250,
    category: "Graphic Design",
    deadline: "3 days",
    skills: ["Logo Design", "Branding", "Adobe Illustrator"],
    client: {
      id: 1,
      name: "Cranting B",
      avatar: "/images/client-1.png",
      rating: 4.9,
      completedProjects: 15,
      location: "Rio de Janeiro, RJ",
    },
    deliverables: [
      "Logo in vector format (AI, EPS)",
      "High-resolution PNG with transparent background",
      "Logo variations (color, black, white)",
      "Brand style guide",
    ],
    revisions: 3,
    complexity: "Medium",
    timeEstimate: "3 days",
    additionalInfo:
      "The startup is in the artificial intelligence sector, focusing on natural language processing solutions for businesses.",
  },
  {
    id: 2,
    title: "WordPress Website Development",
    description:
      "Build a responsive WordPress website for a local restaurant. The site should include menu pages, reservation system, contact form, and integration with social media. Mobile responsiveness is crucial as most customers will be browsing on phones.",
    price: 750,
    category: "Web Development",
    deadline: "7 days",
    skills: ["WordPress", "PHP", "CSS", "JavaScript"],
    client: {
      id: 3,
      name: "Jesios R",
      avatar: "/images/client-3.png",
      rating: 4.7,
      completedProjects: 8,
      location: "Curitiba, PR",
    },
    platforms: ["WordPress", "WooCommerce", "Elementor"],
    scope:
      "Complete website development including design implementation, custom menu system, reservation functionality, and mobile optimization.",
    timeEstimate: "7-10 days",
    additionalInfo: "The restaurant has an existing logo and brand colors that should be incorporated into the design.",
  },
  {
    id: 3,
    title: "Social Media Content Creation",
    description:
      "Create engaging content for Instagram and Facebook for a fashion brand. We need a mix of product photos, lifestyle images, and promotional graphics. Content should align with our brand voice and appeal to our target demographic of 25-35 year old professionals.",
    price: 350,
    category: "Marketing",
    deadline: "5 days",
    skills: ["Social Media", "Copywriting", "Graphic Design"],
    client: {
      id: 2,
      name: "Jota W",
      avatar: "/images/client-2.png",
      rating: 4.8,
      completedProjects: 12,
      location: "Belo Horizonte, MG",
    },
    goals: ["Increase brand awareness", "Drive engagement with target audience", "Generate leads for online store"],
    targetAudience: "Urban professionals aged 25-35 with interest in sustainable fashion",
    platforms: ["Instagram", "Facebook", "TikTok"],
    timeEstimate: "1 month campaign",
  },
  {
    id: 4,
    title: "Product Description Writing",
    description:
      "Write compelling product descriptions for an e-commerce store selling home goods. Descriptions should be SEO-friendly, highlight key features and benefits, and encourage purchases. Approximately 50 products need descriptions of 150-200 words each.",
    price: 250,
    category: "Writing",
    deadline: "2 days",
    skills: ["Copywriting", "SEO", "E-commerce"],
    client: {
      id: 4,
      name: "Negon T",
      avatar: "/images/client-4.png",
      rating: 4.6,
      completedProjects: 20,
      location: "Salvador, BA",
    },
    deliverables: [
      "50 product descriptions (150-200 words each)",
      "SEO keywords incorporated",
      "Formatted text ready for upload",
    ],
    languages: ["Portuguese"],
    targetAudience: "Home decor enthusiasts, new homeowners, interior design professionals",
    revisions: 2,
  },
  {
    id: 5,
    title: "Mobile App UI Design",
    description:
      "Design user interface for a fitness tracking mobile application. The app will track workouts, nutrition, and progress. We need a clean, modern interface that's intuitive and motivating for users. Deliverables include screens for all main app functions.",
    price: 1200,
    category: "Graphic Design",
    deadline: "10 days",
    skills: ["UI Design", "Figma", "Mobile Design"],
    client: {
      id: 1,
      name: "Cranting B",
      avatar: "/images/client-1.png",
      rating: 4.9,
      completedProjects: 15,
      location: "Rio de Janeiro, RJ",
    },
    deliverables: [
      "Complete UI design for iOS and Android",
      "Interactive prototype",
      "Design system with components",
      "Handoff documentation for developers",
    ],
    complexity: "Complex",
    timeEstimate: "10-14 days",
    additionalInfo:
      "The app will be developed for both iOS and Android platforms. We already have the branding guidelines that should be followed.",
  },
  {
    id: 6,
    title: "Email Newsletter Template",
    description:
      "Create a responsive email newsletter template for a marketing campaign. The template should work across major email clients, be easily editable for future campaigns, and include sections for featured content, product highlights, and calls to action.",
    price: 300,
    category: "Web Development",
    deadline: "4 days",
    skills: ["HTML Email", "CSS", "Responsive Design"],
    client: {
      id: 3,
      name: "Jesios R",
      avatar: "/images/client-3.png",
      rating: 4.7,
      completedProjects: 8,
      location: "Curitiba, PR",
    },
    platforms: ["Mailchimp", "Campaign Monitor", "Major Email Clients"],
    scope:
      "Design and development of a responsive email template with modular sections that can be easily modified for future campaigns.",
    timeEstimate: "3-5 days",
  },
  {
    id: 7,
    title: "Corporate Brand Identity",
    description:
      "Develop a complete brand identity for a corporate consulting firm. The package should include logo design, color palette, typography, business cards, letterhead, and brand guidelines document.",
    price: 3500,
    category: "Graphic Design",
    deadline: "14 days",
    skills: ["Branding", "Logo Design", "Print Design"],
    client: {
      id: 1,
      name: "Cranting B",
      avatar: "/images/client-1.png",
      rating: 4.9,
      completedProjects: 15,
      location: "Rio de Janeiro, RJ",
    },
    deliverables: [
      "Logo in multiple formats",
      "Color palette with codes",
      "Typography guidelines",
      "Business card and letterhead designs",
      "Comprehensive brand guidelines document",
    ],
    complexity: "Complex",
    timeEstimate: "2-3 weeks",
    additionalInfo:
      "The consulting firm specializes in financial services for mid-sized businesses. They want a professional, trustworthy, and modern brand identity.",
  },
  {
    id: 8,
    title: "E-commerce Website Development",
    description:
      "Build a full-featured e-commerce website with product catalog, shopping cart, secure checkout, and customer account management. The site should be responsive, SEO-friendly, and integrate with payment gateways.",
    price: 5000,
    category: "Web Development",
    deadline: "30 days",
    skills: ["E-commerce", "JavaScript", "PHP", "MySQL"],
    client: {
      id: 3,
      name: "Jesios R",
      avatar: "/images/client-3.png",
      rating: 4.7,
      completedProjects: 8,
      location: "Curitiba, PR",
    },
    platforms: ["WooCommerce", "WordPress", "Custom Development"],
    scope:
      "Complete e-commerce solution including product management, inventory tracking, payment processing, shipping integration, and customer accounts.",
    timeEstimate: "4-6 weeks",
  },
  {
    id: 9,
    title: "Technical Documentation Writing",
    description:
      "Create comprehensive technical documentation for a software product. The documentation should include user guides, API documentation, and developer guides with clear explanations and examples.",
    price: 2000,
    category: "Writing",
    deadline: "15 days",
    skills: ["Technical Writing", "Documentation", "API"],
    client: {
      id: 4,
      name: "Negon T",
      avatar: "/images/client-4.png",
      rating: 4.6,
      completedProjects: 20,
      location: "Salvador, BA",
    },
    deliverables: ["User guide", "API documentation", "Developer guide", "Installation instructions"],
    languages: ["English", "Portuguese"],
    targetAudience: "Software developers, system administrators, end users",
    revisions: 3,
  },
  {
    id: 10,
    title: "Digital Marketing Campaign",
    description:
      "Plan and execute a comprehensive digital marketing campaign for a product launch. The campaign should include social media, email marketing, content marketing, and paid advertising components.",
    price: 4500,
    category: "Marketing",
    deadline: "21 days",
    skills: ["Digital Marketing", "Social Media", "PPC", "Analytics"],
    client: {
      id: 2,
      name: "Jota W",
      avatar: "/images/client-2.png",
      rating: 4.8,
      completedProjects: 12,
      location: "Belo Horizonte, MG",
    },
    goals: [
      "Generate awareness for new product launch",
      "Drive traffic to product landing page",
      "Convert visitors to customers",
      "Build email subscriber list",
    ],
    targetAudience: "Tech-savvy professionals aged 30-45 with interest in productivity tools",
    platforms: ["Google Ads", "Facebook/Instagram Ads", "Email", "Content Marketing"],
    timeEstimate: "3 month campaign",
  },
]

export default function Home() {
  const isMobile = useMediaQuery("(max-width: 768px)")
  const router = useRouter()
  const [selectedProject, setSelectedProject] = useState<FreelanceProject | null>(null)
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedPrice, setSelectedPrice] = useState(250)
  const [showPriceFilter, setShowPriceFilter] = useState(false)
  const projectsRef = useRef<HTMLDivElement>(null)

  const handleProfileClick = () => {
    router.push("/portfolio")
  }

  const openProjectDetails = (project: FreelanceProject) => {
    setSelectedProject(project)
  }

  const closeProjectDetails = () => {
    setSelectedProject(null)
  }

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId)
  }

  const handlePriceSelect = (price: number) => {
    setSelectedPrice(price)
    setShowPriceFilter(false)
  }

  const togglePriceFilter = () => {
    setShowPriceFilter(!showPriceFilter)
  }

  const handleClientClick = (clientId: number) => {
    router.push(`/portfolio/${clientId}`)
  }

  // Filter projects based on selected category and price
  const filteredProjects = freelanceProjects.filter((project) => {
    const categoryMatch =
      selectedCategory === "all" || project.category === categories.find((c) => c.id === selectedCategory)?.name
    const priceMatch = project.price >= selectedPrice
    return categoryMatch && priceMatch
  })

  // For the mobile layout
  if (isMobile) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-[#131313]">
        <MobileNavbar title="Search" showBackButton={false} />

        <div className="p-4">
          {/* Categories - Mobile */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-800 dark:text-white">Categorias</h2>
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-1 dark:text-white dark:border-gray-700"
              onClick={togglePriceFilter}
            >
              <Filter size={14} />
              R$ {selectedPrice}+
            </Button>
          </div>

          {/* Price Filter Dropdown - Mobile */}
          <AnimatePresence>
            {showPriceFilter && (
              <motion.div
                className="bg-white dark:bg-[#1a1a1a] rounded-lg shadow-md p-3 mb-4"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <div className="grid grid-cols-3 gap-2">
                  {priceRanges.slice(0, 9).map((range) => (
                    <Button
                      key={range.value}
                      variant={selectedPrice === range.value ? "default" : "outline"}
                      size="sm"
                      className={`text-xs ${
                        selectedPrice === range.value
                          ? "bg-[#00e6a1] hover:bg-[#00cc8c] text-white"
                          : "dark:text-white dark:border-gray-700"
                      }`}
                      onClick={() => handlePriceSelect(range.value)}
                    >
                      {range.label}
                    </Button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="grid grid-cols-3 gap-3 mb-6 overflow-x-auto">
            {categories.map((category) => (
              <div
                key={category.id}
                className={`flex flex-col items-center cursor-pointer`}
                onClick={() => handleCategorySelect(category.id)}
              >
                <div
                  className={`w-20 h-20 rounded-xl overflow-hidden mb-2 flex items-center justify-center ${
                    selectedCategory === category.id ? "bg-[#00e6a1]" : "bg-transparent"
                  }`}
                >
                  <Image
                    src={category.icon || "/placeholder.svg"}
                    alt={category.name}
                    width={60}
                    height={60}
                    className="w-full h-full object-contain"
                  />
                </div>
                <h3 className="text-xs font-medium text-gray-800 dark:text-white text-center">{category.name}</h3>
              </div>
            ))}
          </div>

          {/* Freelance Projects - Mobile */}
          <div ref={projectsRef}>
            <h2 className="text-xl font-bold text-gray-800 mb-4 dark:text-white">Available Projects</h2>
            {filteredProjects.length > 0 ? (
              <div className="space-y-4">
                {filteredProjects.map((project) => (
                  <div
                    key={project.id}
                    className="bg-white rounded-xl p-4 shadow-sm dark:bg-[#1a1a1a] cursor-pointer"
                    onClick={() => openProjectDetails(project)}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center gap-2">
                        <Avatar
                          className="w-8 h-8 rounded-full overflow-hidden cursor-pointer"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleClientClick(project.client.id)
                          }}
                        >
                          <img
                            src={project.client.avatar || "/placeholder.svg"}
                            alt={project.client.name}
                            className="w-full h-full object-cover"
                          />
                        </Avatar>
                        <h3 className="font-medium text-base dark:text-white">{project.title}</h3>
                      </div>
                      <span className="text-[#00e6a1] font-bold">R${project.price}</span>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-3 line-clamp-2">{project.description}</p>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <span className="text-xs px-2 py-1 bg-[#e6fff9] text-[#00e6a1] rounded-full dark:bg-[#00e6a1]/20">
                          {project.category}
                        </span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">{project.deadline}</span>
                      </div>
                      <Button
                        className="bg-[#00e6a1] hover:bg-[#00cc8c] text-white text-xs px-3 py-1 h-7 rounded-full"
                        onClick={(e) => {
                          e.stopPropagation()
                          openProjectDetails(project)
                        }}
                      >
                        Apply
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-10 text-gray-500 dark:text-gray-400">
                No projects found matching your criteria
              </div>
            )}
          </div>
        </div>

        {/* Project Details Modal - Mobile */}
        <ProjectDetailsModal project={selectedProject} onClose={closeProjectDetails} />
      </div>
    )
  }

  // For the desktop layout
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
        <div className="flex-1 flex flex-col h-[calc(100vh-3rem)]">
          {/* Top Navigation with Search and Profile */}
          <div className="flex items-center justify-between p-6 border-b border-gray-100 dark:border-gray-800">
            <div className="relative w-full max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search"
                className="w-full pl-10 pr-4 py-2 rounded-full bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#00e6a1] dark:bg-gray-800 dark:text-white dark:placeholder-gray-400"
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

          {/* Main Content - Scrollable */}
          <div className="flex-1 overflow-y-auto p-6">
            {/* Categories Section */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Categorias</h2>
              <div className="relative">
                <Button
                  variant="outline"
                  className="flex items-center gap-2 dark:text-white dark:border-gray-700"
                  onClick={togglePriceFilter}
                >
                  <Filter size={16} />
                  Price: R$ {selectedPrice}+
                </Button>

                {/* Price Filter Dropdown */}
                <AnimatePresence>
                  {showPriceFilter && (
                    <motion.div
                      className="absolute right-0 top-full mt-2 bg-white dark:bg-[#1a1a1a] rounded-lg shadow-md p-4 z-10 w-[300px]"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                    >
                      <div className="grid grid-cols-3 gap-2">
                        {priceRanges.map((range) => (
                          <Button
                            key={range.value}
                            variant={selectedPrice === range.value ? "default" : "outline"}
                            size="sm"
                            className={
                              selectedPrice === range.value
                                ? "bg-[#00e6a1] hover:bg-[#00cc8c] text-white"
                                : "dark:text-white dark:border-gray-700"
                            }
                            onClick={() => handlePriceSelect(range.value)}
                          >
                            {range.label}
                          </Button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            <div className="grid grid-cols-6 gap-6 mb-10">
              {categories.map((category) => (
                <motion.div
                  key={category.id}
                  className={`flex flex-col items-center cursor-pointer`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                  onClick={() => handleCategorySelect(category.id)}
                >
                  <div
                    className={`w-24 h-24 rounded-xl overflow-hidden mb-3 flex items-center justify-center ${
                      selectedCategory === category.id ? "bg-[#00e6a1]" : "bg-transparent"
                    }`}
                  >
                    <Image
                      src={category.icon || "/placeholder.svg"}
                      alt={category.name}
                      width={80}
                      height={80}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <h3 className="text-sm font-medium text-gray-800 dark:text-white">{category.name}</h3>
                </motion.div>
              ))}
            </div>

            {/* Available Projects Section */}
            <div ref={projectsRef}>
              <h2 className="text-2xl font-bold text-gray-800 mb-6 dark:text-white">Available Projects</h2>
              {filteredProjects.length > 0 ? (
                <div className="space-y-4 mb-10">
                  {filteredProjects.map((project, index) => (
                    <motion.div
                      key={project.id}
                      className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 dark:bg-[#1a1a1a] dark:border-gray-800 w-full cursor-pointer"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      whileHover={{ y: -3, transition: { duration: 0.2 } }}
                      onClick={() => openProjectDetails(project)}
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex gap-4 items-start">
                          <Avatar
                            className="w-12 h-12 rounded-full overflow-hidden cursor-pointer"
                            onClick={(e) => {
                              e.stopPropagation()
                              handleClientClick(project.client.id)
                            }}
                          >
                            <img
                              src={project.client.avatar || "/placeholder.svg"}
                              alt={project.client.name}
                              className="w-full h-full object-cover"
                            />
                          </Avatar>
                          <div className="flex-1">
                            <h3 className="font-medium text-lg dark:text-white">{project.title}</h3>
                            <div className="flex items-center gap-2 mt-1 mb-2">
                              <span className="text-sm text-gray-500 dark:text-gray-400">
                                Posted by {project.client.name}
                              </span>
                              <span className="text-sm text-gray-500 dark:text-gray-400">•</span>
                              <span className="text-sm text-gray-500 dark:text-gray-400">
                                Deadline: {project.deadline}
                              </span>
                            </div>
                            <p className="text-gray-500 dark:text-gray-400 mb-3">{project.description}</p>
                            <div className="flex flex-wrap gap-2 mb-3">
                              {project.skills.map((skill, i) => (
                                <span
                                  key={i}
                                  className="text-xs px-2 py-1 bg-[#e6fff9] text-[#00e6a1] rounded-full dark:bg-[#00e6a1]/20"
                                >
                                  {skill}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-3">
                          <span className="text-[#00e6a1] font-bold text-lg">R${project.price}</span>
                          <Button
                            className="bg-[#00e6a1] hover:bg-[#00cc8c] text-white px-4 py-2 rounded-xl"
                            onClick={(e) => {
                              e.stopPropagation()
                              openProjectDetails(project)
                            }}
                          >
                            Apply Now
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-20 text-gray-500 dark:text-gray-400">
                  No projects found matching your criteria
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Project Details Modal */}
      <ProjectDetailsModal project={selectedProject} onClose={closeProjectDetails} />
    </div>
  )
}
