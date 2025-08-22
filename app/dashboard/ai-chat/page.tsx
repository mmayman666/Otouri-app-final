"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar } from "@/components/ui/avatar"
import {
  Sparkles,
  Send,
  Bot,
  User,
  Clock,
  History,
  Trash2,
  Plus,
  MessageSquare,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useToast } from "@/hooks/use-toast"
import { useCredits } from "@/hooks/use-credits"
import { useTranslation } from "@/lib/translations/context"
import {
  createConversation,
  saveMessage,
  getConversations,
  getConversationMessages,
  deleteConversation,
  type ChatConversation,
} from "./actions"

// Add custom scrollbar styling
const scrollbarStyles = `
  .custom-scrollbar::-webkit-scrollbar {
    width: 6px;
  }
  .custom-scrollbar::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 10px;
  }
  .custom-scrollbar::-webkit-scrollbar-thumb {
    background: #d1d5db;
    border-radius: 10px;
  }
  .custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background: #a3a3a3;
  }
`

// Function to format AI response text with proper styling
const formatAIResponse = (text: string, isRTL: boolean) => {
  // Split text into lines
  const lines = text.split("\n")

  return lines.map((line, index) => {
    // Handle headings (### text)
    if (line.startsWith("### ")) {
      const headingText = line.replace("### ", "")
      return (
        <h3
          key={index}
          className="text-base font-bold text-sage-900 mt-4 mb-2 border-b border-mint-200 pb-1"
          style={{ textAlign: isRTL ? "right" : "left", direction: isRTL ? "rtl" : "ltr" }}
        >
          {headingText}
        </h3>
      )
    }

    // Handle subheadings (## text)
    if (line.startsWith("## ")) {
      const headingText = line.replace("## ", "")
      return (
        <h2
          key={index}
          className="text-lg font-bold text-sage-900 mt-4 mb-2"
          style={{ textAlign: isRTL ? "right" : "left", direction: isRTL ? "rtl" : "ltr" }}
        >
          {headingText}
        </h2>
      )
    }

    // Handle main headings (# text)
    if (line.startsWith("# ")) {
      const headingText = line.replace("# ", "")
      return (
        <h1
          key={index}
          className="text-xl font-bold text-sage-900 mt-4 mb-3"
          style={{ textAlign: isRTL ? "right" : "left", direction: isRTL ? "rtl" : "ltr" }}
        >
          {headingText}
        </h1>
      )
    }

    // Handle bullet points (- text)
    if (line.startsWith("- ")) {
      const bulletText = line.replace("- ", "")
      return (
        <div key={index} className="flex items-start gap-2 my-1" style={{ direction: isRTL ? "rtl" : "ltr" }}>
          <span className="text-mint-600 mt-1">•</span>
          <span className="flex-1" style={{ textAlign: isRTL ? "right" : "left" }}>
            {formatInlineText(bulletText)}
          </span>
        </div>
      )
    }

    // Handle empty lines
    if (line.trim() === "") {
      return <br key={index} />
    }

    // Handle regular paragraphs
    return (
      <p
        key={index}
        className="mb-2 leading-relaxed"
        style={{ textAlign: isRTL ? "right" : "left", direction: isRTL ? "rtl" : "ltr" }}
      >
        {formatInlineText(line)}
      </p>
    )
  })
}

// Function to format inline text with bold and other formatting
const formatInlineText = (text: string) => {
  // Handle bold text (**text**)
  const parts = text.split(/(\*\*[^*]+\*\*)/g)

  return parts.map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      const boldText = part.replace(/\*\*/g, "")
      return (
        <strong key={index} className="font-bold text-sage-900">
          {boldText}
        </strong>
      )
    }
    return part
  })
}

interface Message {
  id: string
  role: "user" | "assistant" | "system"
  content: string
  createdAt?: Date
}

export default function AIChatPage() {
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const { toast } = useToast()
  const { checkCredits } = useCredits()
  const { t, isRTL } = useTranslation()

  const [conversations, setConversations] = useState<ChatConversation[]>([])
  const [currentConversationId, setCurrentConversationId] = useState<string | null>(null)
  const [isLoadingConversations, setIsLoadingConversations] = useState(true)
  const [isLoadingMessages, setIsLoadingMessages] = useState(false)
  const [showCreditsExhausted, setShowCreditsExhausted] = useState(false)

  // Chat state
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: t("aiChat.welcomeMessage"),
      createdAt: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1)
  const conversationsPerPage = 5

  // Suggested questions
  const suggestedQuestions = [
    "ما هي أفضل العطور الشرقية للرجال؟",
    "اقترح لي عطراً مناسباً لمناسبة رسمية",
    "ما هي أفضل العطور ذات رائحة الورد؟",
    "ما الفرق بين العطر والكولونيا؟",
  ]

  // Calculate pagination
  const totalPages = Math.ceil(conversations.length / conversationsPerPage)
  const startIndex = (currentPage - 1) * conversationsPerPage
  const endIndex = startIndex + conversationsPerPage
  const currentConversations = conversations.slice(startIndex, endIndex)

  // Load conversations on component mount
  useEffect(() => {
    loadConversations()
  }, [])

  // Scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Update welcome message when language changes
  useEffect(() => {
    setMessages((prev) =>
      prev.map((msg) => (msg.id === "welcome" ? { ...msg, content: t("aiChat.welcomeMessage") } : msg)),
    )
  }, [t])

  const loadConversations = async () => {
    try {
      setIsLoadingConversations(true)
      const convs = await getConversations()
      setConversations(convs)
    } catch (error) {
      console.error("Error loading conversations:", error)
      toast({
        title: t("common.error"),
        description: t("aiChat.errorLoading"),
        variant: "destructive",
      })
    } finally {
      setIsLoadingConversations(false)
    }
  }

  const loadConversationMessages = async (conversationId: string) => {
    try {
      setIsLoadingMessages(true)
      const msgs = await getConversationMessages(conversationId)

      // Convert to chat format and set messages
      const chatMessages: Message[] = msgs.map((msg) => ({
        id: msg.id,
        role: msg.role as "user" | "assistant" | "system",
        content: msg.content,
        createdAt: new Date(msg.created_at),
      }))

      setMessages(chatMessages)
      setCurrentConversationId(conversationId)
    } catch (error) {
      console.error("Error loading messages:", error)
      toast({
        title: t("common.error"),
        description: t("aiChat.errorLoadingMessages"),
        variant: "destructive",
      })
    } finally {
      setIsLoadingMessages(false)
    }
  }

  const startNewConversation = async () => {
    try {
      const title = `محادثة جديدة - ${new Date().toLocaleDateString("ar-SA")}`
      const conversation = await createConversation(title)

      // Reset to welcome message
      setMessages([
        {
          id: "welcome",
          role: "assistant",
          content: t("aiChat.welcomeMessage"),
          createdAt: new Date(),
        },
      ])

      setCurrentConversationId(conversation.id)
      await loadConversations()

      // Reset to first page to show the new conversation
      setCurrentPage(1)

      toast({
        title: t("common.success"),
        description: t("aiChat.conversationCreated"),
      })
    } catch (error) {
      console.error("Error creating conversation:", error)
      toast({
        title: t("common.error"),
        description: t("aiChat.errorCreating"),
        variant: "destructive",
      })
    }
  }

  const handleDeleteConversation = async (conversationId: string) => {
    try {
      await deleteConversation(conversationId)
      await loadConversations()

      // If deleted conversation was current, start new one
      if (currentConversationId === conversationId) {
        setCurrentConversationId(null)
        setMessages([
          {
            id: "welcome",
            role: "assistant",
            content: t("aiChat.welcomeMessage"),
            createdAt: new Date(),
          },
        ])
      }

      // Adjust current page if necessary
      const newTotalPages = Math.ceil((conversations.length - 1) / conversationsPerPage)
      if (currentPage > newTotalPages && newTotalPages > 0) {
        setCurrentPage(newTotalPages)
      }

      toast({
        title: t("common.success"),
        description: t("aiChat.conversationDeleted"),
      })
    } catch (error) {
      console.error("Error deleting conversation:", error)
      toast({
        title: t("common.error"),
        description: t("aiChat.errorDeleting"),
        variant: "destructive",
      })
    }
  }

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e as unknown as React.FormEvent)
    }
  }

  const handleSuggestedQuestion = (question: string) => {
    setInput(question)
    setTimeout(() => {
      const formEvent = new Event("submit", { cancelable: true, bubbles: true }) as any
      formEvent.preventDefault = () => {}
      handleSubmit(formEvent)
    }, 50)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const userMessage = input.trim()
    if (!userMessage || isLoading) return

    setIsLoading(true)

    try {
      // Add user message to UI immediately
      const userMsg: Message = {
        id: Date.now().toString(),
        role: "user",
        content: userMessage,
        createdAt: new Date(),
      }

      setMessages((prev) => [...prev, userMsg])
      setInput("")

      // If no current conversation, create one first
      let conversationId = currentConversationId
      if (!conversationId) {
        const title = userMessage.slice(0, 50) + (userMessage.length > 50 ? "..." : "")
        const conversation = await createConversation(title)
        conversationId = conversation.id
        setCurrentConversationId(conversationId)

        // Refresh conversations list
        setTimeout(() => {
          loadConversations()
        }, 500)
      }

      // Save user message to database
      if (conversationId) {
        await saveMessage(conversationId, "user", userMessage)
      }

      // Prepare messages for API
      const apiMessages = messages
        .concat([userMsg])
        .filter((msg) => msg.role !== "system")
        .map((msg) => ({
          role: msg.role,
          content: msg.content,
        }))

      // Call AI API
      const response = await fetch("/api/ai-chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: apiMessages,
        }),
      })

      if (!response.ok) {
        let errorMessage = "Failed to get AI response"

        try {
          const errorData = await response.json()
          errorMessage = errorData.error || errorMessage
        } catch (e) {
          // If we can't parse JSON, use the status text
          errorMessage = `HTTP ${response.status}: ${response.statusText}`
        }

        if (response.status === 429) {
          setShowCreditsExhausted(true)
          return
        }

        throw new Error(errorMessage)
      }

      // Check if response has a body
      if (!response.body) {
        throw new Error("No response body received")
      }

      // Handle streaming response
      const reader = response.body.getReader()
      const decoder = new TextDecoder()

      // Add assistant message placeholder
      const assistantMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "",
        createdAt: new Date(),
      }

      setMessages((prev) => [...prev, assistantMsg])

      let fullResponse = ""

      try {
        while (true) {
          const { done, value } = await reader.read()
          if (done) break

          const chunk = decoder.decode(value, { stream: true })
          fullResponse += chunk

          // Update the assistant message with accumulated content
          setMessages((prev) =>
            prev.map((msg) =>
              msg.id === assistantMsg.id
                ? {
                    ...msg,
                    content: fullResponse,
                  }
                : msg,
            ),
          )
        }
      } finally {
        reader.releaseLock()
      }

      // Save AI response to database
      if (conversationId && fullResponse) {
        await saveMessage(conversationId, "assistant", fullResponse)
        // Refresh conversations list
        setTimeout(() => {
          loadConversations()
        }, 500)
      }
    } catch (error) {
      console.error("Chat error:", error)
      if (error instanceof Error && error.message.includes("429")) {
        setShowCreditsExhausted(true)
      } else {
        toast({
          title: t("common.error"),
          description: t("aiChat.chatError"),
          variant: "destructive",
        })
      }
    } finally {
      setIsLoading(false)
    }
  }

  const formatRelativeDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))

    if (diffInHours < 1) return t("aiChat.timeAgo.minutes")
    if (diffInHours < 24) return t("aiChat.timeAgo.hour", { count: diffInHours })
    if (diffInHours < 48) return t("aiChat.timeAgo.day")
    if (diffInHours < 168) return t("aiChat.timeAgo.days", { count: Math.floor(diffInHours / 24) })
    return t("aiChat.timeAgo.week", { count: Math.floor(diffInHours / 168) })
  }

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
    }
  }

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  return (
    <div
      className="p-6 space-y-6"
      dir={isRTL ? "rtl" : "ltr"}
      style={{ direction: isRTL ? "rtl" : "ltr", textAlign: isRTL ? "right" : "left" }}
    >
      <style jsx global>
        {scrollbarStyles}
      </style>
      <div style={{ direction: isRTL ? "rtl" : "ltr", textAlign: isRTL ? "right" : "left" }}>
        <h1 className="text-2xl font-bold text-sage-900 mb-1" style={{ textAlign: isRTL ? "right" : "left" }}>
          {t("aiChat.title")}
        </h1>
        <p className="text-gray-600 text-sm" style={{ textAlign: isRTL ? "right" : "left" }}>
          {t("aiChat.subtitle")}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6" style={{ direction: isRTL ? "rtl" : "ltr" }}>
        {/* Main Chat Area */}
        <div className="lg:col-span-3" style={{ direction: isRTL ? "rtl" : "ltr" }}>
          <Card className="border-sage-100 shadow-md h-full flex flex-col" style={{ direction: isRTL ? "rtl" : "ltr" }}>
            <CardHeader
              className="pb-3 pt-5 px-6 bg-gradient-to-l from-mint-50 to-sage-50 border-b border-sage-100"
              style={{ direction: isRTL ? "rtl" : "ltr", textAlign: isRTL ? "right" : "left" }}
            >
              <div style={{ direction: isRTL ? "rtl" : "ltr", textAlign: isRTL ? "right" : "left" }}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: isRTL ? "flex-start" : "flex-start",
                    gap: "0.5rem",
                  }}
                >
                  <div className="w-8 h-8 rounded-full bg-mint-100 flex items-center justify-center shadow-sm">
                    <Bot className="h-4 w-4 text-mint-600" />
                  </div>
                  <CardTitle className="text-xl font-bold text-sage-900">{t("aiChat.title")}</CardTitle>
                </div>
                <CardDescription className="text-sm text-gray-600 mt-1" style={{ textAlign: isRTL ? "right" : "left" }}>
                  {t("aiChat.subtitle")}
                </CardDescription>
              </div>
            </CardHeader>

            <CardContent
              className="px-6 py-6 flex-1 overflow-hidden flex flex-col"
              style={{ minHeight: "70vh", direction: isRTL ? "rtl" : "ltr" }}
            >
              {/* Messages Container */}
              <div
                className="flex-1 overflow-y-auto mb-4 space-y-6 pr-2 custom-scrollbar max-h-[60vh]"
                style={{ direction: isRTL ? "rtl" : "ltr" }}
              >
                {isLoadingMessages ? (
                  <div className="flex justify-center items-center h-32">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-mint-500"></div>
                  </div>
                ) : (
                  <AnimatePresence>
                    {messages.map((message) => (
                      <motion.div
                        key={message.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className={`flex ${message.role === "user" ? (isRTL ? "justify-start" : "justify-end") : isRTL ? "justify-end" : "justify-start"}`}
                        style={{ direction: isRTL ? "rtl" : "ltr" }}
                      >
                        <div
                          className={`flex gap-3 max-w-[80%] ${message.role === "user" ? (isRTL ? "flex-row" : "flex-row-reverse") : isRTL ? "flex-row-reverse" : "flex-row"}`}
                          style={{ direction: isRTL ? "rtl" : "ltr" }}
                        >
                          {message.role === "user" ? (
                            <Avatar className="h-8 w-8 border-2 border-sage-200">
                              <User className="h-4 w-4 text-sage-600" />
                            </Avatar>
                          ) : (
                            <Avatar className="h-8 w-8 bg-mint-100 border-2 border-mint-200">
                              <Bot className="h-4 w-4 text-mint-600" />
                            </Avatar>
                          )}
                          <div>
                            <div
                              className={`rounded-lg p-4 shadow-sm ${
                                message.role === "user"
                                  ? "bg-white border border-sage-100 text-sage-900"
                                  : "bg-mint-50 border border-mint-100 text-sage-900"
                              }`}
                              style={{ textAlign: isRTL ? "right" : "left", direction: isRTL ? "rtl" : "ltr" }}
                            >
                              {message.role === "assistant" ? (
                                <div className="text-sm leading-relaxed">
                                  {formatAIResponse(message.content, isRTL)}
                                </div>
                              ) : (
                                <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
                              )}
                            </div>
                            <div
                              className={`mt-1 flex items-center text-xs text-gray-500 ${
                                message.role === "user"
                                  ? isRTL
                                    ? "justify-start"
                                    : "justify-end"
                                  : isRTL
                                    ? "justify-end"
                                    : "justify-start"
                              }`}
                              style={{ direction: isRTL ? "rtl" : "ltr" }}
                            >
                              <span>
                                {message.createdAt
                                  ? new Intl.DateTimeFormat(isRTL ? "ar-SA" : "en-US", {
                                      hour: "2-digit",
                                      minute: "2-digit",
                                    }).format(message.createdAt)
                                  : "الآن"}
                              </span>
                              <Clock className={`h-3 w-3 ${isRTL ? "mr-1" : "ml-1"}`} />
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                )}

                {isLoading && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className={`flex ${isRTL ? "justify-end" : "justify-start"}`}
                    style={{ direction: isRTL ? "rtl" : "ltr" }}
                  >
                    <div
                      className={`flex gap-3 ${isRTL ? "flex-row-reverse" : "flex-row"}`}
                      style={{ direction: isRTL ? "rtl" : "ltr" }}
                    >
                      <Avatar className="h-8 w-8 bg-mint-100 border-2 border-mint-200">
                        <Bot className="h-4 w-4 text-mint-600" />
                      </Avatar>
                      <div className="bg-mint-50 border border-mint-100 rounded-lg p-4 flex items-center">
                        <div className="flex space-x-1 rtl:space-x-reverse">
                          <div className="h-2 w-2 bg-mint-400 rounded-full animate-bounce"></div>
                          <div className="h-2 w-2 bg-mint-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                          <div className="h-2 w-2 bg-mint-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Suggested Questions */}
              {messages.length <= 1 && (
                <div className="mb-6" style={{ direction: isRTL ? "rtl" : "ltr", textAlign: isRTL ? "right" : "left" }}>
                  <h4
                    className="text-sm font-medium text-sage-800 mb-3"
                    style={{ textAlign: isRTL ? "right" : "left" }}
                  >
                    {t("aiChat.suggestedQuestions")}
                  </h4>
                  <div
                    className="flex flex-wrap gap-2"
                    style={{ direction: isRTL ? "rtl" : "ltr", justifyContent: isRTL ? "flex-end" : "flex-start" }}
                  >
                    {suggestedQuestions.map((question, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        onClick={() => handleSuggestedQuestion(question)}
                        className="text-xs border-mint-200 text-mint-600 hover:bg-mint-50 hover:text-mint-700"
                        disabled={isLoading}
                      >
                        {question}
                      </Button>
                    ))}
                  </div>
                </div>
              )}

              {/* Input Area */}
              <form onSubmit={handleSubmit} className="relative mt-auto" style={{ direction: isRTL ? "rtl" : "ltr" }}>
                <div className={`absolute ${isRTL ? "right-3" : "left-3"} top-3`}>
                  <Sparkles className="h-5 w-5 text-mint-400" />
                </div>
                <div className={`absolute ${isRTL ? "left-3" : "right-3"} top-3`}>
                  <Button
                    type="submit"
                    size="icon"
                    disabled={!input.trim() || isLoading}
                    className={`h-8 w-8 rounded-full ${
                      input.trim() && !isLoading
                        ? "bg-mint-500 hover:bg-mint-600 text-white"
                        : "bg-gray-100 text-gray-400"
                    }`}
                  >
                    <Send className={`h-4 w-4 ${isRTL ? "rotate-180" : ""}`} />
                  </Button>
                </div>
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder={t("aiChat.placeholder")}
                  className={`${isRTL ? "pr-12 pl-14" : "pl-12 pr-14"} py-6 border-mint-200 focus-visible:ring-mint-400 rounded-xl shadow-md`}
                  disabled={isLoading}
                  style={{ direction: isRTL ? "rtl" : "ltr", textAlign: isRTL ? "right" : "left" }}
                />
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1" style={{ direction: isRTL ? "rtl" : "ltr" }}>
          <Card className="border-sage-100 shadow-md h-full" style={{ direction: isRTL ? "rtl" : "ltr" }}>
            <CardHeader
              className="pb-3 pt-5 px-4"
              style={{ direction: isRTL ? "rtl" : "ltr", textAlign: isRTL ? "right" : "left" }}
            >
              <div className="flex items-center justify-between" style={{ direction: isRTL ? "rtl" : "ltr" }}>
                <CardTitle className="text-base font-bold text-sage-900 flex items-center gap-2">
                  <History className="h-4 w-4" />
                  {t("aiChat.chatHistory")}
                </CardTitle>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={startNewConversation}
                  className="text-mint-600 border-mint-200 hover:bg-mint-50 hover:text-mint-700 h-8 text-sm bg-transparent"
                  disabled={isLoading}
                >
                  <Plus className={`h-3 w-3 ${isRTL ? "mr-1" : "ml-1"}`} />
                  {t("aiChat.newConversation")}
                </Button>
              </div>
            </CardHeader>
            <CardContent className="px-4 pb-4 flex flex-col h-full" style={{ direction: isRTL ? "rtl" : "ltr" }}>
              {/* Conversations List */}
              <div className="flex-1 overflow-auto" style={{ direction: isRTL ? "rtl" : "ltr" }}>
                <div className="space-y-3" style={{ direction: isRTL ? "rtl" : "ltr" }}>
                  {isLoadingConversations ? (
                    <div className="flex justify-center py-8">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-mint-500"></div>
                    </div>
                  ) : currentConversations.length > 0 ? (
                    currentConversations.map((conv) => (
                      <div
                        key={conv.id}
                        className={`bg-white rounded-lg border p-3 hover:border-mint-200 hover:shadow-sm cursor-pointer transition-all ${
                          currentConversationId === conv.id ? "border-mint-300 bg-mint-50" : "border-sage-100"
                        }`}
                        style={{ direction: isRTL ? "rtl" : "ltr", textAlign: isRTL ? "right" : "left" }}
                        onClick={() => !isLoading && loadConversationMessages(conv.id)}
                      >
                        <div
                          className="flex items-center justify-between mb-2"
                          style={{ direction: isRTL ? "rtl" : "ltr" }}
                        >
                          <h4 className="font-medium text-sage-800 text-sm truncate flex-1">{conv.title}</h4>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation()
                              handleDeleteConversation(conv.id)
                            }}
                            className={`h-6 w-6 p-0 text-gray-400 hover:text-rose-500 hover:bg-rose-50 ${isRTL ? "ml-2" : "mr-2"}`}
                            disabled={isLoading}
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </Button>
                        </div>
                        <div
                          className="flex items-center justify-between text-xs text-gray-500"
                          style={{ direction: isRTL ? "rtl" : "ltr" }}
                        >
                          <span>
                            {conv.message_count} {t("aiChat.messages")}
                          </span>
                          <span>{formatRelativeDate(conv.updated_at)}</span>
                        </div>
                        <p
                          className="text-xs text-gray-400 mt-1 truncate"
                          style={{ textAlign: isRTL ? "right" : "left" }}
                        >
                          {conv.last_message}
                        </p>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8" style={{ direction: isRTL ? "rtl" : "ltr" }}>
                      <MessageSquare className="h-10 w-10 text-gray-300 mx-auto mb-2" />
                      <p className="text-gray-500 text-sm">{t("aiChat.noConversations")}</p>
                      <p className="text-gray-400 text-xs mt-1">{t("aiChat.startNewChat")}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Pagination Controls */}
              {totalPages > 1 && (
                <div className="mt-4 pt-3 border-t border-sage-100" style={{ direction: isRTL ? "rtl" : "ltr" }}>
                  <div className="flex items-center justify-between" style={{ direction: isRTL ? "rtl" : "ltr" }}>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={goToPreviousPage}
                      disabled={currentPage === 1 || isLoading}
                      className="h-8 px-2 text-xs bg-transparent"
                    >
                      <ChevronRight className="h-3 w-3" />
                      {t("common.previous")}
                    </Button>

                    <div className="flex items-center gap-1" style={{ direction: isRTL ? "rtl" : "ltr" }}>
                      <span className="text-xs text-gray-500">
                        {currentPage} {isRTL ? "من" : "of"} {totalPages}
                      </span>
                    </div>

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={goToNextPage}
                      disabled={currentPage === totalPages || isLoading}
                      className="h-8 px-2 text-xs bg-transparent"
                    >
                      {t("common.next")}
                      <ChevronLeft className="h-3 w-3" />
                    </Button>
                  </div>

                  <div className="text-center mt-2" style={{ direction: isRTL ? "rtl" : "ltr" }}>
                    <span className="text-xs text-gray-400">
                      {conversations.length} {t("aiChat.totalConversations")}
                    </span>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
      {/* Credits Exhausted Modal */}
      {showCreditsExhausted && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl p-8 max-w-md w-full text-center shadow-2xl"
            style={{ direction: isRTL ? "rtl" : "ltr" }}
          >
            <div className="w-16 h-16 bg-gradient-to-br from-amber-100 to-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Sparkles className="h-8 w-8 text-amber-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">{t("aiChat.creditsExhausted")}</h3>
            <p className="text-gray-600 mb-6 leading-relaxed">{t("aiChat.creditsExhaustedMessage")}</p>
            <div className="space-y-3">
              <Button
                onClick={() => (window.location.href = "/dashboard/subscription")}
                className="w-full bg-gradient-to-r from-mint-500 to-sage-500 hover:from-mint-600 hover:to-sage-600 text-white font-medium py-3"
              >
                {t("aiChat.upgradePremium")}
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowCreditsExhausted(false)}
                className="w-full border-gray-300 text-gray-700 hover:bg-gray-50"
              >
                {t("common.close")}
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}
