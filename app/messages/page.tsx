"use client"

import { useState, useEffect } from "react"
import { Search, Send } from "lucide-react"
import { Avatar } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import Sidebar from "@/components/sidebar"
import { motion } from "framer-motion"
import { useMediaQuery } from "@/hooks/use-media-query"
import { useRouter } from "next/navigation"
import MobileNavbar from "@/components/mobile-navbar"

type Message = {
  id: number
  sender: string
  avatar: string
  content: string
  timestamp: string
  isMe: boolean
}

type Contact = {
  id: number
  name: string
  role: string
  avatar: string
  status: "online" | "offline" | "away"
  lastMessage?: string
  unread?: number
  messages: Message[]
}

// Sample conversations for each contact
const contacts: Contact[] = [
  {
    id: 1,
    name: "Cranting B",
    role: "Melpomen Fee",
    avatar: "/images/client-1.png",
    status: "online",
    lastMessage: "Preciso de um novo logo para minha startup.",
    unread: 2,
    messages: [
      {
        id: 1,
        sender: "Cranting B",
        avatar: "/images/client-1.png",
        content: "Olá! Estou interessado nos seus serviços de design gráfico.",
        timestamp: "10:30",
        isMe: false,
      },
      {
        id: 2,
        sender: "Você",
        avatar: "/images/user-profile.jpeg",
        content:
          "Olá Cranting! Ficarei feliz em ajudar com suas necessidades de design. Que tipo de projeto você tem em mente?",
        timestamp: "10:35",
        isMe: true,
      },
      {
        id: 3,
        sender: "Cranting B",
        avatar: "/images/client-1.png",
        content: "Preciso de um novo logo para minha startup. Podemos discutir os detalhes?",
        timestamp: "10:40",
        isMe: false,
      },
    ],
  },
  {
    id: 2,
    name: "Jesios R",
    role: "Jonstockings",
    avatar: "/images/client-3.png",
    status: "offline",
    lastMessage: "Obrigado pelo trabalho. Ficou ótimo!",
    messages: [
      {
        id: 1,
        sender: "Jesios R",
        avatar: "/images/client-3.png",
        content: "Olá, gostaria de saber se você está disponível para um projeto de desenvolvimento web.",
        timestamp: "09:15",
        isMe: false,
      },
      {
        id: 2,
        sender: "Você",
        avatar: "/images/user-profile.jpeg",
        content: "Olá Jesios! Sim, estou disponível. Que tipo de projeto você tem em mente?",
        timestamp: "09:20",
        isMe: true,
      },
      {
        id: 3,
        sender: "Jesios R",
        avatar: "/images/client-3.png",
        content: "Preciso de um site para minha loja online. Você pode me ajudar com isso?",
        timestamp: "09:25",
        isMe: false,
      },
      {
        id: 4,
        sender: "Você",
        avatar: "/images/user-profile.jpeg",
        content: "Claro! Tenho experiência com e-commerce. Podemos marcar uma reunião para discutir os detalhes?",
        timestamp: "09:30",
        isMe: true,
      },
      {
        id: 5,
        sender: "Jesios R",
        avatar: "/images/client-3.png",
        content: "Perfeito! Que tal amanhã às 14h?",
        timestamp: "09:35",
        isMe: false,
      },
      {
        id: 6,
        sender: "Você",
        avatar: "/images/user-profile.jpeg",
        content: "Combinado! Vou enviar um link para a reunião.",
        timestamp: "09:40",
        isMe: true,
      },
      {
        id: 7,
        sender: "Jesios R",
        avatar: "/images/client-3.png",
        content: "Obrigado pelo trabalho. Ficou ótimo!",
        timestamp: "16:20",
        isMe: false,
      },
    ],
  },
  {
    id: 3,
    name: "Jota W",
    role: "Janey",
    avatar: "/images/client-2.png",
    status: "online",
    lastMessage: "Quando podemos agendar uma reunião?",
    unread: 1,
    messages: [
      {
        id: 1,
        sender: "Jota W",
        avatar: "/images/client-2.png",
        content: "Oi! Preciso de ajuda com uma campanha de marketing para minha empresa.",
        timestamp: "14:05",
        isMe: false,
      },
      {
        id: 2,
        sender: "Você",
        avatar: "/images/user-profile.jpeg",
        content: "Olá Jota! Posso ajudar com isso. Qual é o seu objetivo com a campanha?",
        timestamp: "14:10",
        isMe: true,
      },
      {
        id: 3,
        sender: "Jota W",
        avatar: "/images/client-2.png",
        content: "Queremos aumentar nossa presença nas redes sociais e atrair mais clientes.",
        timestamp: "14:15",
        isMe: false,
      },
      {
        id: 4,
        sender: "Você",
        avatar: "/images/user-profile.jpeg",
        content:
          "Entendi. Posso criar uma estratégia personalizada para suas redes sociais. Vamos precisar discutir seu público-alvo e objetivos específicos.",
        timestamp: "14:20",
        isMe: true,
      },
      {
        id: 5,
        sender: "Jota W",
        avatar: "/images/client-2.png",
        content: "Quando podemos agendar uma reunião?",
        timestamp: "14:25",
        isMe: false,
      },
    ],
  },
  {
    id: 4,
    name: "Negon T",
    role: "Skivey Lounge",
    avatar: "/images/client-4.png",
    status: "away",
    lastMessage: "Vou revisar o material e retorno.",
    messages: [
      {
        id: 1,
        sender: "Negon T",
        avatar: "/images/client-4.png",
        content: "Olá, preciso de conteúdo para o blog da minha empresa.",
        timestamp: "11:30",
        isMe: false,
      },
      {
        id: 2,
        sender: "Você",
        avatar: "/images/user-profile.jpeg",
        content: "Olá Negon! Posso ajudar com a criação de conteúdo. Qual é o nicho da sua empresa?",
        timestamp: "11:35",
        isMe: true,
      },
      {
        id: 3,
        sender: "Negon T",
        avatar: "/images/client-4.png",
        content: "Trabalhamos com produtos sustentáveis para casa.",
        timestamp: "11:40",
        isMe: false,
      },
      {
        id: 4,
        sender: "Você",
        avatar: "/images/user-profile.jpeg",
        content:
          "Ótimo! Posso criar artigos sobre sustentabilidade, dicas para um lar eco-friendly e análises de produtos. Isso atenderia suas necessidades?",
        timestamp: "11:45",
        isMe: true,
      },
      {
        id: 5,
        sender: "Negon T",
        avatar: "/images/client-4.png",
        content: "Parece perfeito. Pode me enviar uma proposta com preços e prazos?",
        timestamp: "11:50",
        isMe: false,
      },
      {
        id: 6,
        sender: "Você",
        avatar: "/images/user-profile.jpeg",
        content: "Claro! Vou preparar uma proposta detalhada e enviar ainda hoje.",
        timestamp: "11:55",
        isMe: true,
      },
      {
        id: 7,
        sender: "Negon T",
        avatar: "/images/client-4.png",
        content: "Vou revisar o material e retorno.",
        timestamp: "16:30",
        isMe: false,
      },
    ],
  },
]

const handleContactProfileClick = (contactId: number, router: any) => {
  router.push(`/portfolio/${contactId}`)
}

export default function MessagesPage() {
  const [activeContactId, setActiveContactId] = useState<number>(1)
  const [newMessage, setNewMessage] = useState("")
  const [activeContact, setActiveContact] = useState<Contact>(contacts[0])
  const [messages, setMessages] = useState<Message[]>(contacts[0].messages)
  const isMobile = useMediaQuery("(max-width: 768px)")
  const router = useRouter()

  // Update active contact and messages when activeContactId changes
  useEffect(() => {
    const contact = contacts.find((c) => c.id === activeContactId)
    if (contact) {
      setActiveContact(contact)
      setMessages(contact.messages)
    }
  }, [activeContactId])

  const handleSendMessage = () => {
    if (newMessage.trim() === "") return

    const message: Message = {
      id: messages.length + 1,
      sender: "Você",
      avatar: "/images/user-profile.jpeg",
      content: newMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      isMe: true,
    }

    // Update messages for the active contact
    const updatedMessages = [...messages, message]
    setMessages(updatedMessages)

    // Update the contact's messages in the contacts array
    const updatedContacts = contacts.map((contact) => {
      if (contact.id === activeContactId) {
        return {
          ...contact,
          messages: updatedMessages,
          lastMessage: newMessage,
        }
      }
      return contact
    })

    // Clear the input field
    setNewMessage("")
  }

  const handleContactSelect = (contactId: number) => {
    setActiveContactId(contactId)

    // Clear unread messages for the selected contact
    const updatedContacts = contacts.map((contact) => {
      if (contact.id === contactId) {
        return {
          ...contact,
          unread: 0,
        }
      }
      return contact
    })
  }

  const handleProfileClick = () => {
    router.push("/portfolio")
  }

  // Mobile layout
  if (isMobile) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col dark:bg-[#131313]">
        <MobileNavbar title="Mensagens" />

        {/* Search Bar */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-800">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
            <input
              type="text"
              placeholder="Pesquisar mensagens"
              className="w-full pl-9 pr-4 py-2 text-sm rounded-full bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#00e6a1] dark:bg-gray-800 dark:text-white dark:placeholder-gray-400"
            />
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 bg-gray-50 dark:bg-gray-900">
          {messages.map((message) => (
            <div key={message.id} className={`flex mb-4 ${message.isMe ? "justify-end" : "justify-start"}`}>
              <div className={`flex ${message.isMe ? "flex-row-reverse" : "flex-row"} max-w-[80%]`}>
                <Avatar
                  className="w-8 h-8 rounded-full overflow-hidden cursor-pointer"
                  onClick={() => {
                    if (!message.isMe) {
                      const contactId = contacts.find((c) => c.name === message.sender)?.id
                      if (contactId) handleContactProfileClick(contactId, router)
                    }
                  }}
                >
                  <img src={message.avatar || "/placeholder.svg"} alt={message.sender} />
                </Avatar>
                <div className={`mx-2 ${message.isMe ? "text-right" : "text-left"}`}>
                  <div
                    className={`p-3 rounded-xl ${
                      message.isMe ? "bg-[#00e6a1] text-white" : "bg-white dark:bg-gray-800 dark:text-white"
                    } shadow-sm`}
                  >
                    {message.content}
                  </div>
                  <div className="text-xs text-gray-500 mt-1 dark:text-gray-400">{message.timestamp}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Message Input */}
        <div className="p-3 border-t border-gray-200 bg-white dark:bg-gray-800 dark:border-gray-700">
          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Digite sua mensagem..."
              className="flex-1 bg-gray-100 dark:bg-gray-700 rounded-full px-4 py-2 focus:outline-none dark:text-white dark:placeholder-gray-400"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSendMessage()
                }
              }}
            />
            <Button onClick={handleSendMessage} className="bg-[#00e6a1] hover:bg-[#00cc8c] rounded-full p-2 h-10 w-10">
              <Send size={18} className="text-white" />
            </Button>
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
          {/* Top Navigation with Search - Removed duplicate profile photo */}
          <div className="flex items-center justify-between p-6 border-b border-gray-100 dark:border-gray-800">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Pesquisar mensagens"
                className="w-full pl-10 pr-4 py-2 rounded-full bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#00e6a1] dark:bg-gray-800 dark:text-white dark:placeholder-gray-400"
              />
            </div>
          </div>

          {/* Messages - Scrollable */}
          <div className="flex-1 overflow-y-auto p-6 bg-gray-50 dark:bg-[#1a1a1a]">
            {messages.map((message, index) => (
              <motion.div
                key={message.id}
                className={`flex mb-4 ${message.isMe ? "justify-end" : "justify-start"}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <div className={`flex ${message.isMe ? "flex-row-reverse" : "flex-row"} max-w-[70%]`}>
                  <Avatar
                    className="w-10 h-10 rounded-full overflow-hidden cursor-pointer"
                    onClick={() => {
                      if (!message.isMe) {
                        const contactId = contacts.find((c) => c.name === message.sender)?.id
                        if (contactId) handleContactProfileClick(contactId, router)
                      }
                    }}
                  >
                    <img
                      src={message.avatar || "/placeholder.svg"}
                      alt={message.sender}
                      className="w-full h-full object-cover"
                    />
                  </Avatar>
                  <div className={`mx-2 ${message.isMe ? "text-right" : "text-left"}`}>
                    <div
                      className={`p-3 rounded-xl ${
                        message.isMe ? "bg-[#00e6a1] text-white" : "bg-white dark:bg-gray-700 dark:text-white"
                      } shadow-sm`}
                    >
                      {message.content}
                    </div>
                    <div className="text-xs text-gray-500 mt-1 dark:text-gray-400">{message.timestamp}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Message Input */}
          <div className="flex items-center gap-2 bg-gray-100 p-3 mx-6 mb-6 rounded-xl dark:bg-gray-800">
            <input
              type="text"
              placeholder="Digite sua mensagem..."
              className="flex-1 bg-transparent border-none focus:outline-none dark:text-white dark:placeholder-gray-400"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSendMessage()
                }
              }}
            />
            <Button onClick={handleSendMessage} className="bg-[#00e6a1] hover:bg-[#00cc8c] rounded-full p-2 h-10 w-10">
              <Send size={18} />
            </Button>
          </div>
        </div>

        {/* Right Sidebar - Contacts */}
        <div className="w-72 border-l border-gray-200 p-0 dark:border-gray-800 dark:bg-[#1a1a1a]">
          <div className="p-5">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-800 dark:text-white">Contacts</h2>
              <Avatar
                className="w-10 h-10 rounded-full cursor-pointer hover:ring-2 hover:ring-[#00e6a1] transition-all"
                onClick={handleProfileClick}
              >
                <img src="/images/user-profile.jpeg" alt="User profile" className="w-full h-full object-cover" />
              </Avatar>
            </div>

            <div className="space-y-4">
              {contacts.map((contact) => (
                <motion.div
                  key={contact.id}
                  className={`flex items-center p-2 rounded-xl cursor-pointer ${
                    activeContactId === contact.id
                      ? "bg-[#e6fff9] dark:bg-[#00e6a1]/20"
                      : "hover:bg-gray-100 dark:hover:bg-gray-800"
                  }`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  whileHover={{ x: 3 }}
                  onClick={() => handleContactSelect(contact.id)}
                >
                  <div className="relative">
                    <Avatar
                      className="w-12 h-12 rounded-full overflow-hidden cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleContactProfileClick(contact.id, router)
                      }}
                    >
                      <img
                        src={contact.avatar || "/placeholder.svg"}
                        alt={contact.name}
                        className="w-full h-full object-cover"
                      />
                    </Avatar>
                    <span
                      className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white dark:border-gray-800 ${
                        contact.status === "online"
                          ? "bg-green-500"
                          : contact.status === "away"
                            ? "bg-yellow-500"
                            : "bg-gray-400"
                      }`}
                    ></span>
                  </div>
                  <div className="ml-3 flex-1 overflow-hidden">
                    <div className="flex justify-between items-center">
                      <h3 className="font-medium text-gray-800 dark:text-white truncate">{contact.name}</h3>
                      {contact.unread && contact.unread > 0 && (
                        <span className="bg-[#00e6a1] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                          {contact.unread}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{contact.lastMessage}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
