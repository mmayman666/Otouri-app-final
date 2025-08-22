"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Upload,
  Sparkles,
  History,
  Camera,
  Scan,
  ImageIcon,
  Check,
  Trash2,
  Eye,
  AlertCircle,
  Crown,
  Rocket,
} from "lucide-react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Progress } from "@/components/ui/progress"
import { createClient } from "@/utils/supabase/client"
import { v4 as uuidv4 } from "uuid"
import { useToast } from "@/hooks/use-toast"
import { PerfumeShoppingModal } from "@/components/perfume-shopping-modal"
import { useCredits } from "@/hooks/use-credits"
import { useTranslation } from "@/lib/translations/context"
import Link from "next/link"

interface AnalysisResults {
  perfumeName: string
  brand: string
  type: string
  confidence: number
  notes: string[]
  similar: Array<{ name: string; brand: string; image: string }>
  description?: string
  gender?: string
  longevity?: string
  sillage?: string
  occasions?: string[]
  priceRange?: string
  availability?: string
}

interface SearchHistoryItem {
  id: string
  image_url: string
  analysis_results: AnalysisResults
  created_at: string
}

export default function ImageSearchPage() {
  const [isDragging, setIsDragging] = useState(false)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [analysisError, setAnalysisError] = useState<string | null>(null)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [supabaseImageUrl, setSupabaseImageUrl] = useState<string | null>(null)
  const [analysisResults, setAnalysisResults] = useState<AnalysisResults | null>(null)
  const [searchHistory, setSearchHistory] = useState<SearchHistoryItem[]>([])
  const [isLoadingHistory, setIsLoadingHistory] = useState(false)
  const [activeTab, setActiveTab] = useState("upload")

  // Credits exhausted state
  const [showCreditsExhausted, setShowCreditsExhausted] = useState(false)

  const { toast } = useToast()
  const supabase = createClient()
  const { checkCredits, isChecking } = useCredits()
  const { t, isRTL } = useTranslation()

  // Load search history on component mount
  useEffect(() => {
    loadSearchHistory()
  }, [])

  const loadSearchHistory = async () => {
    try {
      setIsLoadingHistory(true)
      const { data, error } = await supabase
        .from("image_search_history")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(10)

      if (error) throw error
      setSearchHistory(data || [])
    } catch (error) {
      console.error("Error loading search history:", error)
      toast({
        title: t("common.error"),
        description: t("imageSearch.errorLoadingHistory"),
        variant: "destructive",
      })
    } finally {
      setIsLoadingHistory(false)
    }
  }

  const saveToHistory = async (imageUrl: string, results: AnalysisResults) => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) return

      const { error } = await supabase.from("image_search_history").insert({
        user_id: user.id,
        image_url: imageUrl,
        analysis_results: results,
      })

      if (error) throw error

      // Reload history to show the new entry
      loadSearchHistory()
    } catch (error) {
      console.error("Error saving to history:", error)
    }
  }

  const deleteFromHistory = async (id: string) => {
    try {
      const { error } = await supabase.from("image_search_history").delete().eq("id", id)

      if (error) throw error

      setSearchHistory((prev) => prev.filter((item) => item.id !== id))
      toast({
        title: t("common.success"),
        description: t("imageSearch.historyDeleted"),
      })
    } catch (error) {
      console.error("Error deleting from history:", error)
      toast({
        title: t("common.error"),
        description: t("imageSearch.errorDeleting"),
        variant: "destructive",
      })
    }
  }

  const clearAllHistory = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) return

      const { error } = await supabase.from("image_search_history").delete().eq("user_id", user.id)

      if (error) throw error

      setSearchHistory([])
      toast({
        title: t("common.success"),
        description: t("imageSearch.historyCleared"),
      })
    } catch (error) {
      console.error("Error clearing history:", error)
      toast({
        title: t("common.error"),
        description: t("imageSearch.errorClearing"),
        variant: "destructive",
      })
    }
  }

  const loadHistoryItem = (item: SearchHistoryItem) => {
    setUploadedImage(item.image_url)
    setSupabaseImageUrl(item.image_url)
    setAnalysisResults(item.analysis_results)
    setActiveTab("results")
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)

    const files = e.dataTransfer.files
    if (files && files.length > 0) {
      handleImageUpload(files[0])
    }
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      handleImageUpload(files[0])
    }
  }

  const uploadToSupabase = async (file: File) => {
    try {
      const fileExt = file.name.split(".").pop()
      const fileName = `${uuidv4()}.${fileExt}`
      const filePath = `perfume-images/${fileName}`

      const { data, error } = await supabase.storage.from("media").upload(filePath, file, {
        cacheControl: "3600",
        upsert: false,
        onUploadProgress: (progress) => {
          const percentage = (progress.loaded / progress.total) * 100
          setUploadProgress(percentage)
        },
      })

      if (error) throw error

      const { data: urlData } = supabase.storage.from("media").getPublicUrl(filePath)
      return urlData.publicUrl
    } catch (error) {
      console.error("Error uploading to Supabase:", error)
      throw error
    }
  }

  const handleImageUpload = async (file: File) => {
    if (!file.type.startsWith("image/")) {
      setAnalysisError(t("imageSearch.imageOnly"))
      return
    }

    setAnalysisError(null)
    setUploadedFile(file)
    setIsAnalyzing(true || isChecking)

    setUploadProgress(0)

    const reader = new FileReader()
    reader.onload = async (e) => {
      if (e.target?.result) {
        setUploadedImage(e.target.result as string)

        try {
          const publicUrl = await uploadToSupabase(file)
          setSupabaseImageUrl(publicUrl)
          await analyzeImage(file, publicUrl)
        } catch (error) {
          console.error("Error in upload process:", error)
          setAnalysisError(t("imageSearch.uploadError"))
          setIsAnalyzing(false)
        }
      }
    }
    reader.readAsDataURL(file)
  }

  const analyzeImage = async (file: File, imageUrl: string) => {
    try {
      // Check credits before proceeding
      const canProceed = await checkCredits("image_search", 1)
      if (!canProceed) {
        setIsAnalyzing(false)
        setShowCreditsExhausted(true)
        return
      }

      const formData = new FormData()
      formData.append("imageUrl", imageUrl)
      formData.append("image", file)

      const response = await fetch("/api/image-analysis", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        if (response.status === 429) {
          throw new Error("تم تجاوز حد عمليات البحث المسموحة")
        }
        throw new Error(`Error: ${response.status}`)
      }

      const data = await response.json()
      setAnalysisResults(data)

      // Save to history
      await saveToHistory(imageUrl, data)

      // Switch to results tab
      setActiveTab("results")

      toast({
        title: t("common.success"),
        description: t("imageSearch.analysisSuccessDesc"),
      })
    } catch (error) {
      console.error("Error analyzing image:", error)
      setAnalysisError(t("imageSearch.analysisError"))
    } finally {
      setIsAnalyzing(false)
    }
  }

  const resetAnalysis = () => {
    setUploadedImage(null)
    setUploadedFile(null)
    setAnalysisResults(null)
    setIsAnalyzing(false)
    setAnalysisError(null)
    setSupabaseImageUrl(null)
    setUploadProgress(0)
    setActiveTab("upload")
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffTime = Math.abs(now.getTime() - date.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays === 1) return t("imageSearch.timeAgo.oneDay")
    if (diffDays === 2) return t("imageSearch.timeAgo.twoDays")
    if (diffDays <= 7) return t("imageSearch.timeAgo.days", { count: diffDays })
    if (diffDays <= 30) return t("imageSearch.timeAgo.weeks", { count: Math.ceil(diffDays / 7) })
    return t("imageSearch.timeAgo.months", { count: Math.ceil(diffDays / 30) })
  }

  return (
    <div className="p-6 space-y-6" dir={isRTL ? "rtl" : "ltr"}>
      {showCreditsExhausted ? (
        <motion.div
          key="credits-exhausted"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="flex justify-center items-center min-h-[60vh]"
        >
          <Card className="max-w-2xl w-full border-amber-200 shadow-2xl overflow-hidden">
            <div className="relative bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 p-8 text-center">
              {/* Personalized Credits Exhausted Image */}
              <div className="relative mb-6">
                <div className="w-48 h-48 mx-auto bg-gradient-to-br from-amber-100 to-orange-100 rounded-full flex items-center justify-center shadow-2xl border-4 border-amber-200">
                  <div className="relative">
                    {/* Empty perfume bottle illustration */}
                    <div className="w-24 h-32 bg-gradient-to-b from-amber-200 to-amber-300 rounded-t-full rounded-b-lg relative shadow-lg">
                      <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-4 h-6 bg-amber-400 rounded-t-lg"></div>
                      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-amber-400 rounded-full opacity-30"></div>
                      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-amber-400 rounded-full opacity-20"></div>
                    </div>
                    {/* Empty indicator */}
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center shadow-lg animate-pulse">
                      <span className="text-white text-xs font-bold">0</span>
                    </div>
                  </div>

                  {/* Floating elements */}
                  <div className="absolute top-4 left-8 w-6 h-6 bg-amber-300 rounded-full opacity-60 animate-bounce"></div>
                  <div
                    className="absolute top-12 right-12 w-4 h-4 bg-orange-300 rounded-full opacity-40 animate-bounce"
                    style={{ animationDelay: "0.5s" }}
                  ></div>
                  <div
                    className="absolute bottom-8 left-12 w-5 h-5 bg-red-300 rounded-full opacity-50 animate-bounce"
                    style={{ animationDelay: "1s" }}
                  ></div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-center gap-2 mb-4">
                    <AlertCircle className="h-8 w-8 text-amber-600 animate-pulse" />
                    <h2 className="text-3xl font-bold text-amber-800">{t("imageSearch.creditsExhausted")}</h2>
                  </div>

                  <p className="text-lg text-amber-700 mb-6 leading-relaxed">{t("imageSearch.creditsExhaustedDesc")}</p>

                  <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-amber-200 shadow-lg">
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-red-600 mb-1">0</div>
                        <div className="text-sm text-gray-600">{t("imageSearch.creditsRemaining")}</div>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-amber-600 mb-1">10</div>
                        <div className="text-sm text-gray-600">{t("imageSearch.monthlyLimit")}</div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <Link href="/dashboard/subscription">
                        <Button className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white py-4 text-lg font-semibold shadow-lg transform hover:scale-105 transition-all duration-200">
                          <Crown className="h-6 w-6 ml-2" />
                          {t("imageSearch.upgradePremium")}
                          <Rocket className="h-6 w-6 mr-2" />
                        </Button>
                      </Link>

                      <Button
                        variant="outline"
                        onClick={() => setShowCreditsExhausted(false)}
                        className="w-full border-amber-300 text-amber-700 hover:bg-amber-50"
                      >
                        {t("imageSearch.backToSearch")}
                      </Button>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-mint-50 to-sage-50 rounded-lg p-4 border border-mint-200">
                    <p className="text-sm text-gray-600 mb-2">
                      <strong>{t("imageSearch.premiumFeatures")}</strong>
                    </p>
                    <ul className="text-sm text-gray-600 space-y-1" style={{ textAlign: isRTL ? "right" : "left" }}>
                      <li>{t("imageSearch.unlimitedSearch")}</li>
                      <li>{t("imageSearch.advancedRecommendations")}</li>
                      <li>{t("imageSearch.unlimitedAI")}</li>
                      <li>{t("imageSearch.exclusiveFeatures")}</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      ) : (
        <div className="p-6 space-y-6" dir={isRTL ? "rtl" : "ltr"}>
          <div className={isRTL ? "text-right" : "text-left"} dir={isRTL ? "rtl" : "ltr"}>
            <h1 className="text-2xl md:text-3xl font-bold text-sage-900 mb-2" dir={isRTL ? "rtl" : "ltr"}>
              {t("imageSearch.title")}
            </h1>
            <p className="text-gray-600 text-base" dir={isRTL ? "rtl" : "ltr"}>
              {t("imageSearch.subtitle")}
            </p>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full" dir={isRTL ? "rtl" : "ltr"}>
            <TabsList className="mb-6 h-11 w-full sm:w-auto p-1 bg-sage-50 shadow-md" dir={isRTL ? "rtl" : "ltr"}>
              <TabsTrigger
                value="upload"
                className="text-sm h-9 px-4 data-[state=active]:bg-white data-[state=active]:shadow-sm flex flex-row-reverse"
                dir={isRTL ? "rtl" : "ltr"}
              >
                <span dir={isRTL ? "rtl" : "ltr"}>{t("imageSearch.uploadImage")}</span>
                <Upload className={`h-4 w-4 ${isRTL ? "mr-2" : "ml-2"}`} />
              </TabsTrigger>
              <TabsTrigger
                value="results"
                className="text-sm h-9 px-4 data-[state=active]:bg-white data-[state=active]:shadow-sm flex flex-row-reverse"
                disabled={!uploadedImage && !isAnalyzing}
                dir={isRTL ? "rtl" : "ltr"}
              >
                <span dir={isRTL ? "rtl" : "ltr"}>{t("imageSearch.analysisResults")}</span>
                <Scan className={`h-4 w-4 ${isRTL ? "mr-2" : "ml-2"}`} />
              </TabsTrigger>
              <TabsTrigger
                value="history"
                className="text-sm h-9 px-4 data-[state=active]:bg-white data-[state=active]:shadow-sm flex flex-row-reverse"
                dir={isRTL ? "rtl" : "ltr"}
              >
                <span dir={isRTL ? "rtl" : "ltr"}>{t("imageSearch.searchHistory")}</span>
                <History className={`h-4 w-4 ${isRTL ? "mr-2" : "ml-2"}`} />
              </TabsTrigger>
            </TabsList>

            <TabsContent value="upload" className="mt-0" dir={isRTL ? "rtl" : "ltr"}>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6" dir={isRTL ? "rtl" : "ltr"}>
                <div className="lg:col-span-2" dir={isRTL ? "rtl" : "ltr"}>
                  <Card
                    className="border-sage-100 shadow-lg hover:shadow-xl transition-shadow overflow-hidden"
                    dir={isRTL ? "rtl" : "ltr"}
                  >
                    <CardHeader
                      className="pb-3 pt-5 px-6 bg-gradient-to-r from-mint-50 to-sage-50"
                      dir={isRTL ? "rtl" : "ltr"}
                    >
                      <div
                        className={`flex items-center gap-2 mb-1 ${isRTL ? "justify-start" : "justify-start"}`}
                        dir={isRTL ? "rtl" : "ltr"}
                      >
                        <Sparkles className="h-5 w-5 text-mint-600" />
                        <CardTitle className="text-xl font-bold text-sage-900" dir={isRTL ? "rtl" : "ltr"}>
                          {t("imageSearch.aiAnalysisTitle")}
                        </CardTitle>
                      </div>
                      <CardDescription
                        className={`text-gray-600 ${isRTL ? "text-right" : "text-left"}`}
                        dir={isRTL ? "rtl" : "ltr"}
                      >
                        {t("imageSearch.aiAnalysisDesc")}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="px-6 py-8" dir={isRTL ? "rtl" : "ltr"}>
                      {analysisError && (
                        <div
                          className="mb-4 p-3 bg-red-50 text-red-700 rounded-md text-center"
                          dir={isRTL ? "rtl" : "ltr"}
                        >
                          {analysisError}
                        </div>
                      )}
                      <div
                        className={`border-3 border-dashed rounded-xl p-10 text-center cursor-pointer transition-all flex flex-col items-center justify-center min-h-[300px] relative overflow-hidden ${
                          isDragging
                            ? "border-mint-400 bg-mint-50/70"
                            : "border-sage-200 hover:border-mint-300 hover:bg-sage-50/50"
                        }`}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                        onClick={() => document.getElementById("file-upload")?.click()}
                        dir={isRTL ? "rtl" : "ltr"}
                      >
                        {!uploadedImage ? (
                          <>
                            <motion.div
                              initial={{ scale: 0.9, opacity: 0.5 }}
                              animate={{ scale: 1, opacity: 1 }}
                              transition={{ duration: 0.5, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
                            >
                              <Upload className="h-20 w-20 mx-auto text-mint-400 mb-6 drop-shadow-md" />
                            </motion.div>
                            <h3 className="text-xl font-medium text-sage-800 mb-3" dir={isRTL ? "rtl" : "ltr"}>
                              {t("imageSearch.dragDropText")}
                            </h3>
                            <p className="text-gray-600 mb-8 max-w-md" dir={isRTL ? "rtl" : "ltr"}>
                              {t("imageSearch.uploadDesc")}
                            </p>
                            <div className="flex flex-wrap gap-4 justify-center" dir={isRTL ? "rtl" : "ltr"}>
                              <Button
                                className="bg-mint-500 hover:bg-mint-600 text-white shadow-lg px-6 py-6 text-lg"
                                dir={isRTL ? "rtl" : "ltr"}
                              >
                                {t("imageSearch.chooseImage")}
                              </Button>
                              <Button
                                variant="outline"
                                className="border-mint-200 text-mint-600 hover:bg-mint-50 px-6 py-6 text-lg flex flex-row-reverse bg-transparent"
                                dir={isRTL ? "rtl" : "ltr"}
                              >
                                <span dir={isRTL ? "rtl" : "ltr"}>{t("imageSearch.takePhoto")}</span>
                                <Camera className={`h-5 w-5 ${isRTL ? "ml-2" : "mr-2"}`} />
                              </Button>
                            </div>
                            <input
                              type="file"
                              id="file-upload"
                              className="hidden"
                              accept="image/*"
                              onChange={handleFileInput}
                            />
                          </>
                        ) : (
                          <div className="relative w-full h-full min-h-[300px]" dir={isRTL ? "rtl" : "ltr"}>
                            <Image
                              src={uploadedImage || "/placeholder.svg"}
                              alt="الصورة المرفوعة"
                              fill
                              className="object-contain"
                            />
                            {isAnalyzing && (
                              <div
                                className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-white"
                                dir={isRTL ? "rtl" : "ltr"}
                              >
                                <Sparkles className="h-10 w-10 mb-4 animate-pulse" />
                                <h3 className="text-xl font-medium mb-4" dir={isRTL ? "rtl" : "ltr"}>
                                  {uploadProgress < 100 ? t("imageSearch.uploading") : t("imageSearch.analyzing")}
                                </h3>
                                <div className="w-64 mb-2" dir={isRTL ? "rtl" : "ltr"}>
                                  <Progress value={uploadProgress < 100 ? uploadProgress : 65} className="h-2" />
                                </div>
                                <p className="text-sm text-gray-200" dir={isRTL ? "rtl" : "ltr"}>
                                  {t("imageSearch.pleaseWait")}
                                </p>
                              </div>
                            )}
                            {!isAnalyzing && (
                              <div
                                className={`absolute bottom-4 ${isRTL ? "right-4" : "left-4"}`}
                                dir={isRTL ? "rtl" : "ltr"}
                              >
                                <Button
                                  variant="destructive"
                                  size="sm"
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    resetAnalysis()
                                  }}
                                  dir={isRTL ? "rtl" : "ltr"}
                                >
                                  {t("imageSearch.removeImage")}
                                </Button>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div dir={isRTL ? "rtl" : "ltr"}>
                  <Card
                    className="border-sage-100 shadow-lg hover:shadow-xl transition-shadow h-full"
                    dir={isRTL ? "rtl" : "ltr"}
                  >
                    <CardHeader
                      className="pb-3 pt-5 px-6 bg-gradient-to-r from-sage-50 to-mint-50"
                      dir={isRTL ? "rtl" : "ltr"}
                    >
                      <div
                        className={`flex items-center gap-2 mb-1 ${isRTL ? "justify-start" : "justify-start"}`}
                        dir={isRTL ? "rtl" : "ltr"}
                      >
                        <ImageIcon className="h-5 w-5 text-mint-600" />
                        <CardTitle className="text-xl font-bold text-sage-900" dir={isRTL ? "rtl" : "ltr"}>
                          {t("imageSearch.howItWorks")}
                        </CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent className="px-6 py-6" dir={isRTL ? "rtl" : "ltr"}>
                      <div className="space-y-5" dir={isRTL ? "rtl" : "ltr"}>
                        <div className="flex items-start gap-4" dir={isRTL ? "rtl" : "ltr"}>
                          <div
                            className="w-10 h-10 rounded-full bg-mint-100 flex items-center justify-center shadow-md shrink-0"
                            dir={isRTL ? "rtl" : "ltr"}
                          >
                            <span className="font-bold text-mint-600 text-lg" dir={isRTL ? "rtl" : "ltr"}>
                              ١
                            </span>
                          </div>
                          <div className={isRTL ? "text-right" : "text-left"} dir={isRTL ? "rtl" : "ltr"}>
                            <h3 className="font-medium text-sage-800 text-base mb-1" dir={isRTL ? "rtl" : "ltr"}>
                              {t("imageSearch.step1Title")}
                            </h3>
                            <p className="text-sm text-gray-600" dir={isRTL ? "rtl" : "ltr"}>
                              {t("imageSearch.step1Desc")}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start gap-4" dir={isRTL ? "rtl" : "ltr"}>
                          <div
                            className="w-10 h-10 rounded-full bg-mint-100 flex items-center justify-center shadow-md shrink-0"
                            dir={isRTL ? "rtl" : "ltr"}
                          >
                            <span className="font-bold text-mint-600 text-lg" dir={isRTL ? "rtl" : "ltr"}>
                              ٢
                            </span>
                          </div>
                          <div className={isRTL ? "text-right" : "text-left"} dir={isRTL ? "rtl" : "ltr"}>
                            <h3 className="font-medium text-sage-800 text-base mb-1" dir={isRTL ? "rtl" : "ltr"}>
                              {t("imageSearch.step2Title")}
                            </h3>
                            <p className="text-sm text-gray-600" dir={isRTL ? "rtl" : "ltr"}>
                              {t("imageSearch.step2Desc")}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start gap-4" dir={isRTL ? "rtl" : "ltr"}>
                          <div
                            className="w-10 h-10 rounded-full bg-mint-100 flex items-center justify-center shadow-md shrink-0"
                            dir={isRTL ? "rtl" : "ltr"}
                          >
                            <span className="font-bold text-mint-600 text-lg" dir={isRTL ? "rtl" : "ltr"}>
                              ٣
                            </span>
                          </div>
                          <div className={isRTL ? "text-right" : "text-left"} dir={isRTL ? "rtl" : "ltr"}>
                            <h3 className="font-medium text-sage-800 text-base mb-1" dir={isRTL ? "rtl" : "ltr"}>
                              {t("imageSearch.step3Title")}
                            </h3>
                            <p className="text-sm text-gray-600" dir={isRTL ? "rtl" : "ltr"}>
                              {t("imageSearch.step3Desc")}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start gap-4" dir={isRTL ? "rtl" : "ltr"}>
                          <div
                            className="w-10 h-10 rounded-full bg-mint-100 flex items-center justify-center shadow-md shrink-0"
                            dir={isRTL ? "rtl" : "ltr"}
                          >
                            <span className="font-bold text-mint-600 text-lg" dir={isRTL ? "rtl" : "ltr"}>
                              ٤
                            </span>
                          </div>
                          <div className={isRTL ? "text-right" : "text-left"} dir={isRTL ? "rtl" : "ltr"}>
                            <h3 className="font-medium text-sage-800 text-base mb-1" dir={isRTL ? "rtl" : "ltr"}>
                              {t("imageSearch.step4Title")}
                            </h3>
                            <p className="text-sm text-gray-600" dir={isRTL ? "rtl" : "ltr"}>
                              {t("imageSearch.step4Desc")}
                            </p>
                          </div>
                        </div>

                        <div className="pt-4 mt-4 border-t border-sage-100" dir={isRTL ? "rtl" : "ltr"}>
                          <div
                            className="bg-gradient-to-br from-mint-50 to-sage-50 rounded-lg p-4 shadow-inner"
                            dir={isRTL ? "rtl" : "ltr"}
                          >
                            <div
                              className={`flex items-center gap-2 mb-2 ${isRTL ? "justify-start" : "justify-start"}`}
                              dir={isRTL ? "rtl" : "ltr"}
                            >
                              <Check className="h-5 w-5 text-mint-600" />
                              <h4 className="font-medium text-mint-700 text-base" dir={isRTL ? "rtl" : "ltr"}>
                                {t("imageSearch.accuracyTitle")}
                              </h4>
                            </div>
                            <p
                              className={`text-sm text-gray-600 ${isRTL ? "text-right" : "text-left"}`}
                              dir={isRTL ? "rtl" : "ltr"}
                            >
                              {t("imageSearch.accuracyDesc")}
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="results" className="mt-0" dir={isRTL ? "rtl" : "ltr"}>
              {analysisResults && (
                <Card
                  className="border-sage-100 shadow-lg hover:shadow-xl transition-shadow overflow-hidden"
                  dir={isRTL ? "rtl" : "ltr"}
                >
                  <CardHeader
                    className="pb-3 pt-5 px-6 bg-gradient-to-r from-mint-50 to-sage-50"
                    dir={isRTL ? "rtl" : "ltr"}
                  >
                    <div
                      className={`flex items-center gap-2 mb-1 ${isRTL ? "justify-start" : "justify-start"}`}
                      dir={isRTL ? "rtl" : "ltr"}
                    >
                      <Sparkles className="h-5 w-5 text-mint-600" />
                      <CardTitle
                        className="text-xl font-bold text-sage-900"
                        dir={isRTL ? "rtl" : "ltr"}
                        style={{ direction: isRTL ? "rtl" : "ltr", textAlign: isRTL ? "right" : "left" }}
                      >
                        {t("imageSearch.analysisResultsTitle")}
                      </CardTitle>
                    </div>
                    <CardDescription
                      className={`text-gray-600 ${isRTL ? "text-right" : "text-left"}`}
                      dir={isRTL ? "rtl" : "ltr"}
                    >
                      {t("imageSearch.confidenceLevel", { confidence: analysisResults.confidence })}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="px-6 py-6" dir={isRTL ? "rtl" : "ltr"}>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6" dir={isRTL ? "rtl" : "ltr"}>
                      <div className="md:col-span-1" dir={isRTL ? "rtl" : "ltr"}>
                        <div
                          className="bg-white rounded-lg border border-sage-100 p-4 shadow-md"
                          dir={isRTL ? "rtl" : "ltr"}
                        >
                          <div className="aspect-square relative mb-4" dir={isRTL ? "rtl" : "ltr"}>
                            {supabaseImageUrl ? (
                              <Image
                                src={supabaseImageUrl || "/placeholder.svg"}
                                alt="الصورة المرفوعة"
                                fill
                                className="object-contain"
                              />
                            ) : uploadedImage ? (
                              <Image
                                src={uploadedImage || "/placeholder.svg"}
                                alt="الصورة المرفوعة"
                                fill
                                className="object-contain"
                              />
                            ) : null}
                          </div>
                          <div className="text-center space-y-2" dir={isRTL ? "rtl" : "ltr"}>
                            <Button
                              variant="outline"
                              className="border-mint-200 text-mint-600 hover:bg-mint-50 w-full bg-transparent"
                              onClick={resetAnalysis}
                              dir={isRTL ? "rtl" : "ltr"}
                            >
                              {t("imageSearch.uploadAnother")}
                            </Button>
                            <PerfumeShoppingModal
                              perfumeName={`${analysisResults.perfumeName} ${analysisResults.brand}`}
                              perfumeBrand=""
                              triggerClassName="w-full bg-gradient-to-r from-mint-500 to-sage-500 hover:from-mint-600 hover:to-sage-600 text-white shadow-lg"
                              triggerText={t("imageSearch.shopNow")}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="md:col-span-2" dir={isRTL ? "rtl" : "ltr"}>
                        <div
                          className="bg-white rounded-lg border border-sage-100 p-6 shadow-md h-full space-y-6"
                          dir={isRTL ? "rtl" : "ltr"}
                        >
                          {/* Main perfume info */}
                          <div className="border-b border-sage-100 pb-4" dir={isRTL ? "rtl" : "ltr"}>
                            <h3
                              className={`text-2xl font-bold text-sage-900 mb-2 ${isRTL ? "text-right" : "text-left"}`}
                              dir={isRTL ? "rtl" : "ltr"}
                            >
                              {analysisResults.perfumeName}
                            </h3>
                            <p
                              className={`text-lg text-gray-600 mb-3 ${isRTL ? "text-right" : "text-left"}`}
                              dir={isRTL ? "rtl" : "ltr"}
                            >
                              {analysisResults.brand}
                            </p>
                            <div
                              className="bg-gradient-to-r from-mint-50 to-sage-50 rounded-lg p-4"
                              dir={isRTL ? "rtl" : "ltr"}
                            >
                              <p
                                className={`text-gray-700 leading-relaxed ${isRTL ? "text-right" : "text-left"}`}
                                dir={isRTL ? "rtl" : "ltr"}
                              >
                                {analysisResults.description ||
                                  "عطر فاخر يتميز بتركيبة عطرية متوازنة ومميزة تناسب مختلف المناسبات"}
                              </p>
                            </div>
                          </div>

                          {/* Perfume type and gender */}
                          <div className="grid grid-cols-2 gap-4" dir={isRTL ? "rtl" : "ltr"}>
                            <div className="bg-sage-50 rounded-lg p-4" dir={isRTL ? "rtl" : "ltr"}>
                              <h4
                                className={`text-base font-semibold text-sage-800 mb-2 ${isRTL ? "text-right" : "text-left"}`}
                                dir={isRTL ? "rtl" : "ltr"}
                              >
                                {t("imageSearch.perfumeType")}
                              </h4>
                              <span
                                className="px-3 py-1 bg-white text-sage-700 rounded-md text-sm font-medium"
                                dir={isRTL ? "rtl" : "ltr"}
                              >
                                {analysisResults.type}
                              </span>
                            </div>
                            <div className="bg-mint-50 rounded-lg p-4" dir={isRTL ? "rtl" : "ltr"}>
                              <h4
                                className={`text-base font-semibold text-sage-800 mb-2 ${isRTL ? "text-right" : "text-left"}`}
                                dir={isRTL ? "rtl" : "ltr"}
                              >
                                {t("imageSearch.targetAudience")}
                              </h4>
                              <span
                                className="px-3 py-1 bg-white text-mint-700 rounded-md text-sm font-medium"
                                dir={isRTL ? "rtl" : "ltr"}
                              >
                                {analysisResults.gender || "للجنسين"}
                              </span>
                            </div>
                          </div>

                          {/* Notes section */}
                          <div
                            className="bg-gradient-to-br from-mint-50 to-sage-50 rounded-lg p-4"
                            dir={isRTL ? "rtl" : "ltr"}
                          >
                            <h4
                              className={`text-base font-semibold text-sage-800 mb-3 ${isRTL ? "text-right" : "text-left"}`}
                              dir={isRTL ? "rtl" : "ltr"}
                            >
                              {t("imageSearch.fragranceNotes")}
                            </h4>
                            <div
                              className="flex flex-wrap gap-2"
                              dir={isRTL ? "rtl" : "ltr"}
                              style={{
                                direction: isRTL ? "rtl" : "ltr",
                                justifyContent: isRTL ? "flex-end" : "flex-start",
                              }}
                            >
                              {analysisResults.notes.map((note, index) => (
                                <span
                                  key={index}
                                  className="px-3 py-1 bg-white text-mint-700 rounded-full text-sm shadow-sm"
                                  dir={isRTL ? "rtl" : "ltr"}
                                  style={{ direction: isRTL ? "rtl" : "ltr" }}
                                >
                                  {note}
                                </span>
                              ))}
                            </div>
                          </div>

                          {/* Performance metrics */}
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4" dir={isRTL ? "rtl" : "ltr"}>
                            <div
                              className="bg-white border border-sage-100 rounded-lg p-4 text-center"
                              dir={isRTL ? "rtl" : "ltr"}
                            >
                              <h5 className="font-medium text-sage-800 text-sm mb-2" dir={isRTL ? "rtl" : "ltr"}>
                                {t("imageSearch.longevity")}
                              </h5>
                              <div className="text-2xl font-bold text-mint-600 mb-1" dir={isRTL ? "rtl" : "ltr"}>
                                {analysisResults.longevity || "8-10"}
                              </div>
                              <p className="text-xs text-gray-600" dir={isRTL ? "rtl" : "ltr"}>
                                {t("imageSearch.hours")}
                              </p>
                            </div>
                            <div
                              className="bg-white border border-sage-100 rounded-lg p-4 text-center"
                              dir={isRTL ? "rtl" : "ltr"}
                            >
                              <h5 className="font-medium text-sage-800 text-sm mb-2" dir={isRTL ? "rtl" : "ltr"}>
                                {t("imageSearch.sillage")}
                              </h5>
                              <div className="text-2xl font-bold text-sage-600 mb-1" dir={isRTL ? "rtl" : "ltr"}>
                                {analysisResults.sillage || "متوسط"}
                              </div>
                              <p className="text-xs text-gray-600" dir={isRTL ? "rtl" : "ltr"}>
                                {t("imageSearch.strength")}
                              </p>
                            </div>
                            <div
                              className="bg-white border border-sage-100 rounded-lg p-4 text-center"
                              dir={isRTL ? "rtl" : "ltr"}
                            >
                              <h5 className="font-medium text-sage-800 text-sm mb-2" dir={isRTL ? "rtl" : "ltr"}>
                                {t("imageSearch.confidenceLevel2")}
                              </h5>
                              <div className="text-2xl font-bold text-mint-700 mb-1" dir={isRTL ? "rtl" : "ltr"}>
                                {analysisResults.confidence}%
                              </div>
                              <Progress
                                value={analysisResults.confidence}
                                className="w-full h-2 mt-2"
                                dir={isRTL ? "rtl" : "ltr"}
                              />
                            </div>
                          </div>

                          {/* Occasions */}
                          <div
                            className="bg-gradient-to-r from-sage-50 to-mint-50 rounded-lg p-4"
                            dir={isRTL ? "rtl" : "ltr"}
                          >
                            <h4
                              className={`text-base font-semibold text-sage-800 mb-3 ${isRTL ? "text-right" : "text-left"}`}
                              dir={isRTL ? "rtl" : "ltr"}
                            >
                              {t("imageSearch.suitableOccasions")}
                            </h4>
                            <div
                              className="flex flex-wrap gap-2"
                              dir={isRTL ? "rtl" : "ltr"}
                              style={{
                                direction: isRTL ? "rtl" : "ltr",
                                justifyContent: isRTL ? "flex-end" : "flex-start",
                              }}
                            >
                              {(analysisResults.occasions || ["المناسبات الرسمية", "الاستخدام اليومي", "المساء"]).map(
                                (occasion, index) => (
                                  <span
                                    key={index}
                                    className="px-3 py-1 bg-white text-sage-700 rounded-md text-sm border border-sage-200"
                                    dir={isRTL ? "rtl" : "ltr"}
                                    style={{ direction: isRTL ? "rtl" : "ltr" }}
                                  >
                                    {occasion}
                                  </span>
                                ),
                              )}
                            </div>
                          </div>

                          {/* Price and availability */}
                          <div className="grid grid-cols-2 gap-4" dir={isRTL ? "rtl" : "ltr"}>
                            <div className="bg-mint-50 rounded-lg p-4" dir={isRTL ? "rtl" : "ltr"}>
                              <h4
                                className={`text-base font-semibold text-sage-800 mb-2 ${isRTL ? "text-right" : "text-left"}`}
                                dir={isRTL ? "rtl" : "ltr"}
                              >
                                {t("imageSearch.priceRange")}
                              </h4>
                              <span className="text-lg font-bold text-mint-700" dir={isRTL ? "rtl" : "ltr"}>
                                {analysisResults.priceRange || "300 - 800 ريال"}
                              </span>
                            </div>
                            <div className="bg-sage-50 rounded-lg p-4" dir={isRTL ? "rtl" : "ltr"}>
                              <h4
                                className={`text-base font-semibold text-sage-800 mb-2 ${isRTL ? "text-right" : "text-left"}`}
                                dir={isRTL ? "rtl" : "ltr"}
                              >
                                {t("imageSearch.availability")}
                              </h4>
                              <span
                                className={`px-3 py-1 rounded-md text-sm font-medium ${
                                  (analysisResults.availability || "متوفر") === "متوفر"
                                    ? "bg-green-100 text-green-700"
                                    : "bg-yellow-100 text-yellow-700"
                                }`}
                                dir={isRTL ? "rtl" : "ltr"}
                              >
                                {analysisResults.availability || t("imageSearch.available")}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="history" className="mt-0" dir={isRTL ? "rtl" : "ltr"}>
              <Card className="border-sage-100 shadow-lg hover:shadow-xl transition-shadow" dir={isRTL ? "rtl" : "ltr"}>
                <CardHeader
                  className="pb-3 pt-5 px-6 bg-gradient-to-r from-sage-50 to-mint-50"
                  dir={isRTL ? "rtl" : "ltr"}
                >
                  <div className="flex items-center justify-between" dir={isRTL ? "rtl" : "ltr"}>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700 bg-transparent"
                      onClick={clearAllHistory}
                      disabled={searchHistory.length === 0}
                      dir={isRTL ? "rtl" : "ltr"}
                    >
                      {t("imageSearch.clearHistory")}
                    </Button>
                    <div className="flex items-center gap-2" dir={isRTL ? "rtl" : "ltr"}>
                      <CardTitle className="text-xl font-bold text-sage-900" dir={isRTL ? "rtl" : "ltr"}>
                        {t("imageSearch.searchHistoryTitle")}
                      </CardTitle>
                      <History className="h-5 w-5 text-mint-600" />
                    </div>
                  </div>
                  <CardDescription
                    className={`text-gray-600 ${isRTL ? "text-right" : "text-left"}`}
                    dir={isRTL ? "rtl" : "ltr"}
                  >
                    {t("imageSearch.searchHistoryDesc", { count: searchHistory.length })}
                  </CardDescription>
                </CardHeader>
                <CardContent className="px-6 py-6" dir={isRTL ? "rtl" : "ltr"}>
                  {isLoadingHistory ? (
                    <div className="flex items-center justify-center py-12" dir={isRTL ? "rtl" : "ltr"}>
                      <div className="text-center" dir={isRTL ? "rtl" : "ltr"}>
                        <Sparkles className="h-8 w-8 mx-auto text-mint-400 animate-pulse mb-2" />
                        <p className="text-gray-600" dir={isRTL ? "rtl" : "ltr"}>
                          {t("imageSearch.loadingHistory")}
                        </p>
                      </div>
                    </div>
                  ) : searchHistory.length === 0 ? (
                    <div className="text-center py-12" dir={isRTL ? "rtl" : "ltr"}>
                      <ImageIcon className="h-16 w-16 mx-auto text-gray-300 mb-4" />
                      <h3 className="text-lg font-medium text-gray-600 mb-2" dir={isRTL ? "rtl" : "ltr"}>
                        {t("imageSearch.noSearchHistory")}
                      </h3>
                      <p className="text-gray-500" dir={isRTL ? "rtl" : "ltr"}>
                        {t("imageSearch.noSearchHistoryDesc")}
                      </p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" dir={isRTL ? "rtl" : "ltr"}>
                      {searchHistory.map((search) => (
                        <motion.div
                          key={search.id}
                          whileHover={{ y: -5 }}
                          className="group"
                          dir={isRTL ? "rtl" : "ltr"}
                        >
                          <div
                            className="bg-white rounded-lg border border-sage-100 overflow-hidden hover:shadow-lg transition-shadow"
                            dir={isRTL ? "rtl" : "ltr"}
                          >
                            <div
                              className="aspect-video relative overflow-hidden bg-gradient-to-br from-mint-50 to-white"
                              dir={isRTL ? "rtl" : "ltr"}
                            >
                              <Image
                                src={search.image_url || "/placeholder.svg"}
                                alt={`بحث ${search.analysis_results.perfumeName}`}
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-105"
                              />
                            </div>
                            <div className="p-4" dir={isRTL ? "rtl" : "ltr"}>
                              <div className="mb-3" dir={isRTL ? "rtl" : "ltr"}>
                                <h4
                                  className="font-medium text-sage-800 text-sm mb-1 line-clamp-1"
                                  dir={isRTL ? "rtl" : "ltr"}
                                >
                                  {search.analysis_results.perfumeName}
                                </h4>
                                <p className="text-xs text-gray-600 line-clamp-1" dir={isRTL ? "rtl" : "ltr"}>
                                  {search.analysis_results.brand}
                                </p>
                              </div>
                              <div className="flex items-center justify-between mb-3" dir={isRTL ? "rtl" : "ltr"}>
                                <span
                                  className="text-sm bg-mint-50 text-mint-700 px-2 py-1 rounded-full"
                                  dir={isRTL ? "rtl" : "ltr"}
                                >
                                  {t("imageSearch.confidence", { confidence: search.analysis_results.confidence })}
                                </span>
                                <span className="text-sm text-gray-500" dir={isRTL ? "rtl" : "ltr"}>
                                  {formatDate(search.created_at)}
                                </span>
                              </div>
                              <div className="flex gap-2" dir={isRTL ? "rtl" : "ltr"}>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="flex-1 border-mint-200 text-mint-600 hover:bg-mint-50 hover:text-mint-700 flex items-center justify-center gap-1 flex-row-reverse bg-transparent"
                                  onClick={() => loadHistoryItem(search)}
                                  dir={isRTL ? "rtl" : "ltr"}
                                >
                                  <span dir={isRTL ? "rtl" : "ltr"}>{t("imageSearch.view")}</span>
                                  <Eye className="h-3 w-3" />
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700 bg-transparent"
                                  onClick={() => deleteFromHistory(search.id)}
                                  dir={isRTL ? "rtl" : "ltr"}
                                >
                                  <Trash2 className="h-3 w-3" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      )}
    </div>
  )
}
