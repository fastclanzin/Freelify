"use client"

import { useState } from "react"
import { X, ExternalLink, Calendar, Clock, Award, Briefcase, Star } from "lucide-react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar } from "@/components/ui/avatar"
import { useRouter } from "next/navigation"

// Define project type with all necessary fields
export type ProjectDetails = {
  id: number
  title: string
  description: string
  price: number
  category: string
  deadline: string
  skills: string[]
  client: {
    id: number
    name: string
    avatar: string
    rating?: number
    completedProjects?: number
    location?: string
  }
  // Category-specific fields
  deliverables?: string[]
  revisions?: number
  timeEstimate?: string
  complexity?: "Simple" | "Medium" | "Complex"
  platforms?: string[]
  languages?: string[]
  targetAudience?: string
  goals?: string[]
  scope?: string
  additionalInfo?: string
  attachments?: { name: string; url: string }[]
}

interface ProjectDetailsModalProps {
  project: ProjectDetails | null
  onClose: () => void
}

export default function ProjectDetailsModal({ project, onClose }: ProjectDetailsModalProps) {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<"details" | "client">("details")

  if (!project) return null

  // Get category-specific fields
  const getCategorySpecificFields = () => {
    switch (project.category) {
      case "Graphic Design":
        return (
          <div className="space-y-4">
            <div>
              <h4 className="font-medium text-gray-800 dark:text-white mb-2">Deliverables</h4>
              <ul className="list-disc pl-5 text-gray-600 dark:text-gray-300 space-y-1">
                {project.deliverables?.map((item, index) => <li key={index}>{item}</li>) || (
                  <>
                    <li>Source files (AI, PSD, etc.)</li>
                    <li>High-resolution JPG/PNG files</li>
                    <li>Print-ready PDF files</li>
                  </>
                )}
              </ul>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium text-gray-800 dark:text-white mb-2">Revisions</h4>
                <p className="text-gray-600 dark:text-gray-300">{project.revisions || "Up to 3 revisions"}</p>
              </div>
              <div>
                <h4 className="font-medium text-gray-800 dark:text-white mb-2">Complexity</h4>
                <p className="text-gray-600 dark:text-gray-300">{project.complexity || "Medium"}</p>
              </div>
            </div>
          </div>
        )
      case "Web Development":
        return (
          <div className="space-y-4">
            <div>
              <h4 className="font-medium text-gray-800 dark:text-white mb-2">Platforms & Technologies</h4>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.platforms?.map((platform, index) => (
                  <Badge key={index} variant="secondary" className="bg-gray-100 dark:bg-gray-800">
                    {platform}
                  </Badge>
                )) || (
                  <>
                    <Badge variant="secondary" className="bg-gray-100 dark:bg-gray-800">
                      Responsive Design
                    </Badge>
                    <Badge variant="secondary" className="bg-gray-100 dark:bg-gray-800">
                      Cross-browser Compatible
                    </Badge>
                    <Badge variant="secondary" className="bg-gray-100 dark:bg-gray-800">
                      SEO Optimized
                    </Badge>
                  </>
                )}
              </div>
            </div>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-white mb-2">Scope</h4>
              <p className="text-gray-600 dark:text-gray-300">
                {project.scope ||
                  "Development of a fully functional website including design implementation, responsive layout, and basic SEO optimization."}
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium text-gray-800 dark:text-white mb-2">Time Estimate</h4>
                <p className="text-gray-600 dark:text-gray-300">{project.timeEstimate || "3-4 weeks"}</p>
              </div>
              <div>
                <h4 className="font-medium text-gray-800 dark:text-white mb-2">Support</h4>
                <p className="text-gray-600 dark:text-gray-300">30 days after delivery</p>
              </div>
            </div>
          </div>
        )
      case "Writing":
        return (
          <div className="space-y-4">
            <div>
              <h4 className="font-medium text-gray-800 dark:text-white mb-2">Content Type</h4>
              <p className="text-gray-600 dark:text-gray-300">
                {project.deliverables?.join(", ") || "Blog posts, product descriptions, website content"}
              </p>
            </div>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-white mb-2">Target Audience</h4>
              <p className="text-gray-600 dark:text-gray-300">
                {project.targetAudience || "General audience, professionals in the industry"}
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium text-gray-800 dark:text-white mb-2">Languages</h4>
                <p className="text-gray-600 dark:text-gray-300">
                  {project.languages?.join(", ") || "English, Portuguese"}
                </p>
              </div>
              <div>
                <h4 className="font-medium text-gray-800 dark:text-white mb-2">Revisions</h4>
                <p className="text-gray-600 dark:text-gray-300">{project.revisions || "Up to 2 revisions"}</p>
              </div>
            </div>
          </div>
        )
      case "Marketing":
        return (
          <div className="space-y-4">
            <div>
              <h4 className="font-medium text-gray-800 dark:text-white mb-2">Campaign Goals</h4>
              <ul className="list-disc pl-5 text-gray-600 dark:text-gray-300 space-y-1">
                {project.goals?.map((goal, index) => <li key={index}>{goal}</li>) || (
                  <>
                    <li>Increase brand awareness</li>
                    <li>Generate leads and conversions</li>
                    <li>Improve online presence</li>
                  </>
                )}
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-white mb-2">Target Audience</h4>
              <p className="text-gray-600 dark:text-gray-300">
                {project.targetAudience || "25-45 year old professionals, urban areas, middle to high income"}
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium text-gray-800 dark:text-white mb-2">Platforms</h4>
                <p className="text-gray-600 dark:text-gray-300">
                  {project.platforms?.join(", ") || "Social Media, Email, Content Marketing"}
                </p>
              </div>
              <div>
                <h4 className="font-medium text-gray-800 dark:text-white mb-2">Duration</h4>
                <p className="text-gray-600 dark:text-gray-300">{project.timeEstimate || "3 months campaign"}</p>
              </div>
            </div>
          </div>
        )
      default:
        return (
          <div className="space-y-4">
            <div>
              <h4 className="font-medium text-gray-800 dark:text-white mb-2">Project Scope</h4>
              <p className="text-gray-600 dark:text-gray-300">
                {project.scope || "Comprehensive project covering all aspects of the required work."}
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium text-gray-800 dark:text-white mb-2">Time Estimate</h4>
                <p className="text-gray-600 dark:text-gray-300">
                  {project.timeEstimate || "Based on project complexity"}
                </p>
              </div>
              <div>
                <h4 className="font-medium text-gray-800 dark:text-white mb-2">Support</h4>
                <p className="text-gray-600 dark:text-gray-300">Available upon request</p>
              </div>
            </div>
          </div>
        )
    }
  }

  const handleClientClick = () => {
    onClose()
    router.push(`/portfolio/${project.client.id}`)
  }

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm bg-black/30"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="bg-white dark:bg-[#1a1a1a] rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Project Details</h2>
          <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full h-10 w-10">
            <X size={20} />
          </Button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200 dark:border-gray-700">
          <button
            className={`px-6 py-3 font-medium text-sm ${
              activeTab === "details"
                ? "border-b-2 border-[#00e6a1] text-[#00e6a1]"
                : "text-gray-500 dark:text-gray-400"
            }`}
            onClick={() => setActiveTab("details")}
          >
            Project Details
          </button>
          <button
            className={`px-6 py-3 font-medium text-sm ${
              activeTab === "client" ? "border-b-2 border-[#00e6a1] text-[#00e6a1]" : "text-gray-500 dark:text-gray-400"
            }`}
            onClick={() => setActiveTab("client")}
          >
            Client Info
          </button>
        </div>

        {activeTab === "details" ? (
          <div className="p-6">
            <div className="flex items-center gap-4 mb-6">
              <Avatar className="w-14 h-14 rounded-full overflow-hidden cursor-pointer" onClick={handleClientClick}>
                <img
                  src={project.client.avatar || "/placeholder.svg"}
                  alt={project.client.name}
                  className="w-full h-full object-cover"
                />
              </Avatar>
              <div>
                <h3 className="font-medium text-lg text-gray-800 dark:text-white">{project.client.name}</h3>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500 dark:text-gray-400">Client</span>
                  {project.client.rating && (
                    <div className="flex items-center">
                      <span className="text-sm text-gray-500 dark:text-gray-400">•</span>
                      <div className="flex items-center ml-2">
                        <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                        <span className="text-sm ml-1 text-gray-700 dark:text-gray-300">{project.client.rating}</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-3">{project.title}</h3>

            <div className="flex flex-wrap items-center gap-3 mb-6">
              <Badge variant="outline" className="bg-[#e6fff9] text-[#00e6a1] border-[#00e6a1]/20 dark:bg-[#00e6a1]/20">
                {project.category}
              </Badge>
              <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                <Calendar className="w-4 h-4 mr-1" />
                Deadline: {project.deadline}
              </div>
              <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                <Clock className="w-4 h-4 mr-1" />
                Posted: {new Date().toLocaleDateString()}
              </div>
            </div>

            <div className="mb-6">
              <h4 className="font-medium text-lg text-gray-800 dark:text-white mb-2">Description</h4>
              <p className="text-gray-600 dark:text-gray-300">{project.description}</p>
            </div>

            <div className="mb-6">
              <h4 className="font-medium text-lg text-gray-800 dark:text-white mb-2">Skills Required</h4>
              <div className="flex flex-wrap gap-2">
                {project.skills.map((skill, index) => (
                  <Badge key={index} variant="secondary" className="bg-gray-100 dark:bg-gray-800">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Category-specific fields */}
            <div className="mb-8 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
              <h4 className="font-medium text-lg text-gray-800 dark:text-white mb-4">Project Specifications</h4>
              {getCategorySpecificFields()}
            </div>

            {project.additionalInfo && (
              <div className="mb-6">
                <h4 className="font-medium text-lg text-gray-800 dark:text-white mb-2">Additional Information</h4>
                <p className="text-gray-600 dark:text-gray-300">{project.additionalInfo}</p>
              </div>
            )}

            {project.attachments && project.attachments.length > 0 && (
              <div className="mb-8">
                <h4 className="font-medium text-lg text-gray-800 dark:text-white mb-2">Attachments</h4>
                <div className="flex flex-wrap gap-2">
                  {project.attachments.map((attachment, index) => (
                    <a
                      key={index}
                      href={attachment.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-3 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                    >
                      <ExternalLink className="w-4 h-4" />
                      {attachment.name}
                    </a>
                  ))}
                </div>
              </div>
            )}

            <div className="flex justify-between items-center">
              <div className="text-3xl font-bold text-[#00e6a1]">R${project.price}</div>
              <Button className="bg-[#00e6a1] hover:bg-[#00cc8c] text-white px-6 py-2 text-lg">Apply Now</Button>
            </div>
          </div>
        ) : (
          <div className="p-6">
            <div className="flex items-center gap-4 mb-6 cursor-pointer" onClick={handleClientClick}>
              <Avatar className="w-20 h-20 rounded-full overflow-hidden">
                <img
                  src={project.client.avatar || "/placeholder.svg"}
                  alt={project.client.name}
                  className="w-full h-full object-cover"
                />
              </Avatar>
              <div>
                <h3 className="font-medium text-xl text-gray-800 dark:text-white">{project.client.name}</h3>
                <div className="flex items-center gap-2 mt-1">
                  {project.client.location && (
                    <span className="text-sm text-gray-500 dark:text-gray-400">{project.client.location}</span>
                  )}
                  {project.client.rating && (
                    <div className="flex items-center">
                      <span className="text-sm text-gray-500 dark:text-gray-400">•</span>
                      <div className="flex items-center ml-2">
                        <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                        <span className="text-sm ml-1 text-gray-700 dark:text-gray-300">{project.client.rating}</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6 mb-6">
              <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg flex flex-col items-center">
                <Briefcase className="w-8 h-8 text-[#00e6a1] mb-2" />
                <span className="text-2xl font-bold text-gray-800 dark:text-white">
                  {project.client.completedProjects || 12}
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400">Completed Projects</span>
              </div>
              <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg flex flex-col items-center">
                <Award className="w-8 h-8 text-[#00e6a1] mb-2" />
                <span className="text-2xl font-bold text-gray-800 dark:text-white">{project.client.rating || 4.8}</span>
                <span className="text-sm text-gray-500 dark:text-gray-400">Average Rating</span>
              </div>
            </div>

            <div className="mb-6">
              <h4 className="font-medium text-lg text-gray-800 dark:text-white mb-3">About</h4>
              <p className="text-gray-600 dark:text-gray-300">
                {project.client.name} is a valued client on our platform with a history of successful projects. They are
                known for clear communication and fair evaluations of freelancers' work.
              </p>
            </div>

            <div className="mb-6">
              <h4 className="font-medium text-lg text-gray-800 dark:text-white mb-3">Recent Projects</h4>
              <div className="space-y-3">
                <div className="p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                  <h5 className="font-medium text-gray-800 dark:text-white">Website Redesign</h5>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Completed on May 15, 2025</p>
                </div>
                <div className="p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                  <h5 className="font-medium text-gray-800 dark:text-white">Logo Design</h5>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Completed on April 2, 2025</p>
                </div>
              </div>
            </div>

            <Button className="w-full bg-[#00e6a1] hover:bg-[#00cc8c] text-white" onClick={handleClientClick}>
              View Full Profile
            </Button>
          </div>
        )}
      </motion.div>
    </motion.div>
  )
}
