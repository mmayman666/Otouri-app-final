"use client"

import { DialogTrigger } from "@/components/ui/dialog"
import { useCredits } from "@/hooks/use-credits"

import type React from "react"
import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import {
  ArrowRight,
  RefreshCw,
  Star,
  Sparkles,
  Clock,
  Calendar,
  Droplets,
  Zap,
  Heart,
  Share2,
  Filter,
  SortAsc,
  History,
  Trash2,
  ThumbsUp,
  ThumbsDown,
  ShoppingCart,
  Eye,
  AlertCircle,
  Crown,
  Rocket,
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import {
  generateRecommendations,
  addToFavorites,
  submitFeedback,
  getRecommendationHistory,
  deleteRecommendationHistory,
  type RecommendationFormData,
  type PerfumeRecommendation,
  type RecommendationHistory,
} from "./actions"
import { useToast } from "@/hooks/use-toast"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import PerfumeShoppingModal from "@/components/perfume-shopping-modal"
import Link from "next/link"
import { useTranslation } from "@/lib/translations/hooks"

export default function RecommendationsPage() {
  const { toast } = useToast()
  const { checkCredits } = useCredits()
  const { t } = useTranslation()

  // Form state
  const [priceMin, setPriceMin] = useState(100)
  const [priceMax, setPriceMax] = useState(500)
  const [gender, setGender] = useState<string | null>(null)
  const [occasion, setOccasion] = useState<string[]>([])
  const [season, setSeason] = useState<string[]>([])
  const [strength, setStrength] = useState<string | null>(null)
  const [longevity, setLongevity] = useState<string | null>(null)
  const [notes, setNotes] = useState<string[]>([])

  // Results state
  const [recommendations, setRecommendations] = useState<PerfumeRecommendation[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showResults, setShowResults] = useState(false)
  const [currentHistoryId, setCurrentHistoryId] = useState<string | null>(null)

  // Credits exhausted state
  const [showCreditsExhausted, setShowCreditsExhausted] = useState(false)

  // History state
  const [history, setHistory] = useState<RecommendationHistory[]>([])
  const [showHistory, setShowHistory] = useState(false)
  const [loadingHistory, setLoadingHistory] = useState(false)

  // Results filtering and sorting
  const [sortBy, setSortBy] = useState<"match" | "price" | "rating">("match")
  const [filterBy, setFilterBy] = useState<"all" | "available" | "high-rated">("all")

  // Detailed view state
  const [selectedPerfume, setSelectedPerfume] = useState<PerfumeRecommendation | null>(null)
  const [showDetailModal, setShowDetailModal] = useState(false)

  // Feedback state
  const [feedbackLoading, setFeedbackLoading] = useState<string | null>(null)
  const [favoriteLoading, setFavoriteLoading] = useState<string | null>(null)

  // Load history on component mount
  useEffect(() => {
    loadHistory()
  }, [])

  const loadHistory = async () => {
    setLoadingHistory(true)
    try {
      const historyData = await getRecommendationHistory()
      setHistory(historyData)
    } catch (error) {
      console.error("Error loading history:", error)
    } finally {
      setLoadingHistory(false)
    }
  }

  // Handle multiple selection categories
  const toggleSelection = (
    value: string,
    currentSelection: string[],
    setSelection: React.Dispatch<React.SetStateAction<string[]>>,
  ) => {
    if (currentSelection.includes(value)) {
      setSelection(currentSelection.filter((item) => item !== value))
    } else {
      setSelection([...currentSelection, value])
    }
  }

  // Reset form
  const resetForm = () => {
    setPriceMin(100)
    setPriceMax(500)
    setGender(null)
    setOccasion([])
    setSeason([])
    setStrength(null)
    setLongevity(null)
    setNotes([])
    setError(null)
    setShowCreditsExhausted(false)
  }

  // Load from history
  const loadFromHistory = (historyItem: RecommendationHistory) => {
    const prefs = historyItem.preferences
    setPriceMin(prefs.priceRange.min)
    setPriceMax(prefs.priceRange.max)
    setGender(prefs.gender)
    setOccasion(prefs.occasion)
    setSeason(prefs.season)
    setStrength(prefs.strength)
    setLongevity(prefs.longevity)
    setNotes(prefs.notes)
    setRecommendations(historyItem.recommendations)
    setCurrentHistoryId(historyItem.id)
    setShowResults(true)
    setShowHistory(false)

    toast({
      title: t("recommendations.preferencesLoaded"),
      description: t("recommendations.preferencesLoadedDesc"),
    })
  }

  // Delete history item
  const handleDeleteHistory = async (historyId: string) => {
    try {
      const result = await deleteRecommendationHistory(historyId)
      if (result.success) {
        setHistory((prev) => prev.filter((item) => item.id !== historyId))
        toast({
          title: t("recommendations.deleted"),
          description: result.message,
        })
      } else {
        toast({
          title: t("common.error"),
          description: result.message,
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: t("common.error"),
        description: t("recommendations.failedToDelete"),
        variant: "destructive",
      })
    }
  }

  // Submit form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)
    setShowResults(false)
    setShowCreditsExhausted(false)

    try {
      // Check credits before proceeding
      const canProceed = await checkCredits("recommendations", 1)
      if (!canProceed) {
        setShowCreditsExhausted(true)
        setIsLoading(false)
        return
      }

      const formData: RecommendationFormData = {
        priceRange: { min: priceMin, max: priceMax },
        gender,
        occasion,
        season,
        strength,
        longevity,
        notes,
      }

      const { recommendations: newRecommendations, historyId } = await generateRecommendations(formData)
      setRecommendations(newRecommendations)
      setCurrentHistoryId(historyId)
      setShowResults(true)

      // Refresh history
      await loadHistory()

      toast({
        title: t("recommendations.recommendationsCreated"),
        description: t("recommendations.recommendationsCreatedDesc", { count: newRecommendations.length }),
      })
    } catch (error) {
      console.error("Error generating recommendations:", error)
      setError(typeof error === "string" ? error : t("recommendations.errorGenerating"))
    } finally {
      setIsLoading(false)
    }
  }

  // Handle add to favorites
  const handleAddToFavorites = async (perfume: PerfumeRecommendation) => {
    setFavoriteLoading(perfume.id)
    try {
      const result = await addToFavorites(perfume)
      toast({
        title: result.success ? t("recommendations.added") : t("recommendations.alert"),
        description: result.message,
        variant: result.success ? "default" : "destructive",
      })
    } catch (error) {
      toast({
        title: t("common.error"),
        description: t("recommendations.failedToAddFavorite"),
        variant: "destructive",
      })
    } finally {
      setFavoriteLoading(null)
    }
  }

  // Handle feedback
  const handleFeedback = async (
    perfume: PerfumeRecommendation,
    feedbackType: "like" | "dislike" | "not_interested" | "purchased",
    rating?: number,
  ) => {
    if (!currentHistoryId) return

    setFeedbackLoading(perfume.id)
    try {
      const result = await submitFeedback(currentHistoryId, perfume.id, feedbackType, rating)
      if (result.success) {
        toast({
          title: t("recommendations.thankYou"),
          description: result.message,
        })
      }
    } catch (error) {
      toast({
        title: t("common.error"),
        description: t("recommendations.failedToSaveFeedback"),
        variant: "destructive",
      })
    } finally {
      setFeedbackLoading(null)
    }
  }

  // Filter and sort recommendations
  const filteredAndSortedRecommendations = recommendations
    .filter((rec) => {
      if (filterBy === "available") return rec.availability === "متوفر"
      if (filterBy === "high-rated") return rec.rating >= 4.5
      return true
    })
    .sort((a, b) => {
      if (sortBy === "match") return b.matchPercentage - a.matchPercentage
      if (sortBy === "price")
        return Number.parseFloat(a.price.replace(/[^\d]/g, "")) - Number.parseFloat(b.price.replace(/[^\d]/g, ""))
      if (sortBy === "rating") return b.rating - a.rating
      return 0
    })

  return (
    <div className="p-4 space-y-5">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-sage-900 mb-2">{t("recommendations.title")}</h1>
          <p className="text-gray-600 text-base">{t("recommendations.subtitle")}</p>
        </div>

        <Dialog open={showHistory} onOpenChange={setShowHistory}>
          <DialogTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2 bg-transparent">
              <History className="h-4 w-4" />
              {t("recommendations.history")}
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{t("recommendations.recommendationsHistory")}</DialogTitle>
              <DialogDescription>{t("recommendations.manageHistory")}</DialogDescription>
            </DialogHeader>

            {loadingHistory ? (
              <div className="flex justify-center py-8">
                <div className="animate-spin h-8 w-8 border-2 border-mint-500 border-t-transparent rounded-full"></div>
              </div>
            ) : history.length === 0 ? (
              <div className="text-center py-8 text-gray-500">{t("recommendations.noPreviousRecommendations")}</div>
            ) : (
              <div className="space-y-4">
                {history.map((item) => (
                  <Card key={item.id} className="border-sage-100">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <p className="font-semibold text-sage-900">
                            {new Date(item.created_at).toLocaleDateString("ar-SA")}
                          </p>
                          <p className="text-sm text-gray-600">
                            {item.recommendations.length} {t("recommendations.recommendations")}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" onClick={() => loadFromHistory(item)}>
                            {t("recommendations.load")}
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleDeleteHistory(item.id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {item.preferences.gender && <Badge variant="secondary">{item.preferences.gender}</Badge>}
                        {item.preferences.occasion.slice(0, 2).map((occ) => (
                          <Badge key={occ} variant="outline">
                            {occ}
                          </Badge>
                        ))}
                        <Badge variant="outline">
                          {item.preferences.priceRange.min} - {item.preferences.priceRange.max} ر.س
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>

      <AnimatePresence mode="wait">
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
                    <h2 className="text-3xl font-bold text-amber-800">{t("recommendations.searchExhausted")}</h2>
                  </div>

                  <p className="text-lg text-amber-700 mb-6 leading-relaxed">
                    {t("recommendations.searchExhaustedDesc")}
                  </p>

                  <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-amber-200 shadow-lg">
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-red-600 mb-1">0</div>
                        <div className="text-sm text-gray-600">{t("recommendations.operationsRemaining")}</div>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-amber-600 mb-1">10</div>
                        <div className="text-sm text-gray-600">{t("recommendations.monthlyLimit")}</div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <Link href="/dashboard/subscription">
                        <Button className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white py-4 text-lg font-semibold shadow-lg transform hover:scale-105 transition-all duration-200">
                          <Crown className="h-6 w-6 ml-2" />
                          {t("aiChat.upgradePremium")}
                          <Rocket className="h-6 w-6 mr-2" />
                        </Button>
                      </Link>

                      <Button
                        variant="outline"
                        onClick={() => setShowCreditsExhausted(false)}
                        className="w-full border-amber-300 text-amber-700 hover:bg-amber-50"
                      >
                        {t("recommendations.backToPreferences")}
                      </Button>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-mint-50 to-sage-50 rounded-lg p-4 border border-mint-200">
                    <p className="text-sm text-gray-600 mb-2">
                      <strong>{t("recommendations.tip")}</strong> {t("recommendations.premiumBenefits")}
                    </p>
                    <ul className="text-sm text-gray-600 space-y-1 text-right">
                      <li>{t("recommendations.unlimitedRecommendations")}</li>
                      <li>{t("recommendations.advancedImageSearch")}</li>
                      <li>{t("recommendations.unlimitedAIChat")}</li>
                      <li>{t("recommendations.exclusiveFeatures")}</li>
                    </ul>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        ) : !showResults ? (
          <motion.div
            key="form"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="border-sage-100 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="pb-2 pt-4 px-6">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl font-bold text-sage-900">{t("recommendations.preferences")}</CardTitle>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={resetForm}
                    className="text-mint-600 border-mint-200 hover:bg-mint-50 hover:text-mint-700 flex items-center gap-1 h-9 text-sm bg-transparent"
                  >
                    <RefreshCw className="h-4 w-4 ml-1" />
                    {t("recommendations.reset")}
                  </Button>
                </div>
                <p className="text-gray-500 text-sm mt-1">{t("recommendations.preferencesDesc")}</p>
              </CardHeader>

              <CardContent className="px-6 pb-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Budget */}
                  <div className="space-y-3">
                    <h3 className="font-semibold text-sage-800 text-base">{t("recommendations.budget")}</h3>
                    <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm text-gray-600 block">{t("recommendations.minBudget")}</label>
                        <div className="flex items-center gap-2">
                          <Slider
                            value={[priceMin]}
                            min={0}
                            max={1000}
                            step={50}
                            onValueChange={(value) => setPriceMin(value[0])}
                            className="flex-1"
                          />
                          <span className="bg-white border border-sage-200 rounded-md px-3 py-1 text-sm min-w-[70px] text-center">
                            {priceMin}
                          </span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm text-gray-600 block">{t("recommendations.maxBudget")}</label>
                        <div className="flex items-center gap-2">
                          <Slider
                            value={[priceMax]}
                            min={0}
                            max={2000}
                            step={50}
                            onValueChange={(value) => setPriceMax(value[0])}
                            className="flex-1"
                          />
                          <span className="bg-white border border-sage-200 rounded-md px-3 py-1 text-sm min-w-[70px] text-center">
                            {priceMax}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Gender */}
                  <div className="space-y-3">
                    <h3 className="font-semibold text-sage-800 text-base">{t("recommendations.gender")}</h3>
                    <div className="flex flex-wrap gap-2">
                      {[t("recommendations.men"), t("recommendations.women"), t("recommendations.unisex")].map(
                        (item) => (
                          <Button
                            key={item}
                            type="button"
                            variant={gender === item ? "default" : "outline"}
                            size="sm"
                            onClick={() => setGender(gender === item ? null : item)}
                            className={
                              gender === item
                                ? "bg-mint-500 hover:bg-mint-600 text-white"
                                : "border-sage-200 text-sage-700 hover:bg-sage-50"
                            }
                          >
                            {item}
                          </Button>
                        ),
                      )}
                    </div>
                  </div>

                  {/* Occasion */}
                  <div className="space-y-3">
                    <h3 className="font-semibold text-sage-800 text-base">{t("recommendations.occasion")}</h3>
                    <div className="flex flex-wrap gap-2">
                      {[
                        t("recommendations.daily"),
                        t("recommendations.work"),
                        t("recommendations.specialOccasions"),
                        t("recommendations.evening"),
                        t("recommendations.sports"),
                      ].map((item) => (
                        <Button
                          key={item}
                          type="button"
                          variant={occasion.includes(item) ? "default" : "outline"}
                          size="sm"
                          onClick={() => toggleSelection(item, occasion, setOccasion)}
                          className={
                            occasion.includes(item)
                              ? "bg-mint-500 hover:bg-mint-600 text-white"
                              : "border-sage-200 text-sage-700 hover:bg-sage-50"
                          }
                        >
                          {item}
                        </Button>
                      ))}
                    </div>
                  </div>

                  {/* Season */}
                  <div className="space-y-3">
                    <h3 className="font-semibold text-sage-800 text-base">{t("recommendations.season")}</h3>
                    <div className="flex flex-wrap gap-2">
                      {[
                        t("recommendations.summer"),
                        t("recommendations.spring"),
                        t("recommendations.winter"),
                        t("recommendations.autumn"),
                        t("recommendations.allSeasons"),
                      ].map((item) => (
                        <Button
                          key={item}
                          type="button"
                          variant={season.includes(item) ? "default" : "outline"}
                          size="sm"
                          onClick={() => toggleSelection(item, season, setSeason)}
                          className={
                            season.includes(item)
                              ? "bg-mint-500 hover:bg-mint-600 text-white"
                              : "border-sage-200 text-sage-700 hover:bg-sage-50"
                          }
                        >
                          {item}
                        </Button>
                      ))}
                    </div>
                  </div>

                  {/* Strength */}
                  <div className="space-y-3">
                    <h3 className="font-semibold text-sage-800 text-base">{t("recommendations.strength")}</h3>
                    <div className="flex flex-wrap gap-2">
                      {[t("recommendations.light"), t("recommendations.medium"), t("recommendations.strong")].map(
                        (item) => (
                          <Button
                            key={item}
                            type="button"
                            variant={strength === item ? "default" : "outline"}
                            size="sm"
                            onClick={() => setStrength(strength === item ? null : item)}
                            className={
                              strength === item
                                ? "bg-mint-500 hover:bg-mint-600 text-white"
                                : "border-sage-200 text-sage-700 hover:bg-sage-50"
                            }
                          >
                            {item}
                          </Button>
                        ),
                      )}
                    </div>
                  </div>

                  {/* Longevity */}
                  <div className="space-y-3">
                    <h3 className="font-semibold text-sage-800 text-base">{t("recommendations.longevity")}</h3>
                    <div className="flex flex-wrap gap-2">
                      {[
                        t("recommendations.shortTerm"),
                        t("recommendations.mediumTerm"),
                        t("recommendations.longTerm"),
                      ].map((item) => (
                        <Button
                          key={item}
                          type="button"
                          variant={longevity === item ? "default" : "outline"}
                          size="sm"
                          onClick={() => setLongevity(longevity === item ? null : item)}
                          className={
                            longevity === item
                              ? "bg-mint-500 hover:bg-mint-600 text-white"
                              : "border-sage-200 text-sage-700 hover:bg-sage-50"
                          }
                        >
                          {item}
                        </Button>
                      ))}
                    </div>
                  </div>

                  {/* Notes */}
                  <div className="space-y-3">
                    <h3 className="font-semibold text-sage-800 text-base">{t("recommendations.preferredNotes")}</h3>
                    <div className="flex flex-wrap gap-2">
                      {[
                        t("recommendations.oud"),
                        t("recommendations.musk"),
                        t("recommendations.amber"),
                        t("recommendations.vanilla"),
                        t("recommendations.flowers"),
                        t("recommendations.fruits"),
                        t("recommendations.citrus"),
                        t("recommendations.woods"),
                        t("recommendations.spices"),
                        t("recommendations.muskRum"),
                        t("recommendations.incense"),
                        t("recommendations.leather"),
                        t("recommendations.apple"),
                        t("recommendations.herbs"),
                      ].map((item) => (
                        <Button
                          key={item}
                          type="button"
                          variant={notes.includes(item) ? "default" : "outline"}
                          size="sm"
                          onClick={() => toggleSelection(item, notes, setNotes)}
                          className={
                            notes.includes(item)
                              ? "bg-mint-500 hover:bg-mint-600 text-white"
                              : "border-sage-200 text-sage-700 hover:bg-sage-50"
                          }
                        >
                          {item}
                        </Button>
                      ))}
                    </div>
                  </div>

                  {/* Submit button */}
                  <motion.div className="pt-2" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button
                      type="submit"
                      disabled={isLoading}
                      className="w-full bg-black hover:bg-gray-800 text-white py-6 text-lg font-medium flex items-center justify-center gap-2 shadow-lg"
                    >
                      {isLoading ? (
                        <>
                          <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                          {t("recommendations.generatingRecommendations")}
                        </>
                      ) : (
                        <>
                          {t("recommendations.showRecommendations")}
                          <ArrowRight className="h-5 w-5 mr-1 rtl:rotate-180" />
                        </>
                      )}
                    </Button>
                  </motion.div>

                  {error && (
                    <div className="bg-rose-50 text-rose-700 p-4 rounded-lg text-center mt-4 border border-rose-200 flex items-center gap-2">
                      <AlertCircle className="h-5 w-5 shrink-0" />
                      {error}
                    </div>
                  )}
                </form>
              </CardContent>
            </Card>
          </motion.div>
        ) : (
          <motion.div
            key="results"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            {/* Results Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h2 className="text-2xl font-bold text-sage-900">{t("recommendations.customRecommendations")}</h2>
                <p className="text-gray-600">{t("recommendations.foundPerfumes", { count: recommendations.length })}</p>
              </div>

              <div className="flex flex-wrap gap-2">
                <Select value={sortBy} onValueChange={(value: any) => setSortBy(value)}>
                  <SelectTrigger className="w-40">
                    <SortAsc className="h-4 w-4 mr-2" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="match">{t("recommendations.matchPercentage")}</SelectItem>
                    <SelectItem value="price">{t("recommendations.sortByPrice")}</SelectItem>
                    <SelectItem value="rating">{t("recommendations.sortByRating")}</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={filterBy} onValueChange={(value: any) => setFilterBy(value)}>
                  <SelectTrigger className="w-40">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">{t("recommendations.allResults")}</SelectItem>
                    <SelectItem value="available">{t("recommendations.availableOnly")}</SelectItem>
                    <SelectItem value="high-rated">{t("recommendations.highRated")}</SelectItem>
                  </SelectContent>
                </Select>

                <Button
                  variant="outline"
                  onClick={() => setShowResults(false)}
                  className="text-mint-600 border-mint-200 hover:bg-mint-50 hover:text-mint-700"
                >
                  {t("recommendations.backToPrefs")}
                </Button>
              </div>
            </div>

            {/* Results Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAndSortedRecommendations.map((recommendation, index) => (
                <motion.div
                  key={recommendation.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group"
                >
                  <Card className="border-sage-100 shadow-lg hover:shadow-xl transition-all h-full overflow-hidden">
                    <div className="relative bg-gradient-to-br from-mint-50 via-sage-50 to-mint-100 p-6 border-b border-sage-100">
                      <div className="absolute top-4 right-4 z-10 flex gap-2">
                        <div className="bg-mint-500 text-white text-sm font-bold px-3 py-1.5 rounded-full shadow-md flex items-center gap-1.5">
                          <Sparkles className="h-3.5 w-3.5" />
                          <span>{t("recommendations.match", { percentage: recommendation.matchPercentage })}</span>
                        </div>
                        {recommendation.availability === "متوفر" && (
                          <div className="bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                            {t("recommendations.available")}
                          </div>
                        )}
                      </div>
                      <div className="flex items-center justify-center h-24">
                        <div className="text-center">
                          <div className="w-16 h-16 mx-auto bg-white rounded-full flex items-center justify-center shadow-lg mb-2">
                            <Droplets className="h-8 w-8 text-mint-600" />
                          </div>
                          <p className="text-sm font-medium text-sage-700">{recommendation.brand}</p>
                        </div>
                      </div>
                    </div>

                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-sage-900 mb-1 group-hover:text-mint-600 transition-colors line-clamp-1">
                            {recommendation.name}
                          </h3>
                          <p className="text-gray-600 mb-1 font-medium">{recommendation.brand}</p>
                          <p className="text-sm text-gray-500">{recommendation.retailer}</p>
                        </div>
                        <div className="text-left">
                          <span className="text-xl font-bold text-mint-700">{recommendation.price}</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center">
                          <Star className="h-4 w-4 fill-amber-500 text-amber-500" />
                          <span className="text-sm text-gray-600 mr-1">{recommendation.rating}</span>
                          <span className="text-xs text-gray-500">({recommendation.reviews})</span>
                        </div>
                      </div>

                      <div className="bg-gradient-to-r from-mint-50 to-sage-50 p-4 rounded-lg mb-4 border border-mint-100">
                        <p className="text-gray-700 text-sm leading-relaxed line-clamp-3">
                          {recommendation.description}
                        </p>
                      </div>

                      <div className="space-y-3 mb-4">
                        <div className="flex flex-wrap gap-1.5 justify-end">
                          {recommendation.notes.slice(0, 4).map((note, idx) => (
                            <span
                              key={idx}
                              className="text-xs bg-sage-100 text-sage-700 px-2 py-1 rounded-full border border-sage-200"
                            >
                              {note}
                            </span>
                          ))}
                          {recommendation.notes.length > 4 && (
                            <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                              +{recommendation.notes.length - 4}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3 text-sm mb-5">
                        <div className="flex items-center gap-2 bg-mint-50 p-2 rounded-lg">
                          <div className="w-6 h-6 rounded-full bg-mint-200 flex items-center justify-center shrink-0">
                            <Droplets className="h-3.5 w-3.5 text-mint-700" />
                          </div>
                          <span className="text-gray-700 text-xs font-medium">{recommendation.strength}</span>
                        </div>
                        <div className="flex items-center gap-2 bg-sage-50 p-2 rounded-lg">
                          <div className="w-6 h-6 rounded-full bg-sage-200 flex items-center justify-center shrink-0">
                            <Clock className="h-3.5 w-3.5 text-sage-700" />
                          </div>
                          <span className="text-gray-700 text-xs font-medium">{recommendation.longevity}</span>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="space-y-3">
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleAddToFavorites(recommendation)}
                            disabled={favoriteLoading === recommendation.id}
                            className="flex-1 text-mint-600 border-mint-200 hover:bg-mint-50 hover:text-mint-700 hover:border-mint-300"
                          >
                            {favoriteLoading === recommendation.id ? (
                              <div className="animate-spin h-4 w-4 border-2 border-mint-500 border-t-transparent rounded-full" />
                            ) : (
                              <Heart className="h-4 w-4 ml-1" />
                            )}
                            {t("recommendations.addToFavorites")}
                          </Button>
                          <Button
                            variant="default"
                            size="sm"
                            className="flex-1 bg-gradient-to-r from-mint-500 to-mint-600 hover:from-mint-600 hover:to-mint-700 text-white shadow-md"
                            onClick={() => {
                              setSelectedPerfume(recommendation)
                              setShowDetailModal(true)
                            }}
                          >
                            <Eye className="h-4 w-4 ml-1" />
                            {t("recommendations.details")}
                          </Button>
                        </div>

                        {/* Shopping Button */}
                        <div className="flex justify-center">
                          <PerfumeShoppingModal
                            perfumeName={recommendation.name}
                            perfumeBrand={recommendation.brand}
                            triggerClassName="w-full"
                            hideIcon={true}
                          />
                        </div>

                        {/* Feedback Buttons */}
                        <div className="flex gap-1 justify-center pt-2 border-t border-sage-100">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleFeedback(recommendation, "like")}
                            disabled={feedbackLoading === recommendation.id}
                            className="text-green-600 hover:bg-green-50 hover:text-green-700 px-3"
                          >
                            <ThumbsUp className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleFeedback(recommendation, "dislike")}
                            disabled={feedbackLoading === recommendation.id}
                            className="text-red-600 hover:bg-red-50 hover:text-red-700 px-3"
                          >
                            <ThumbsDown className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleFeedback(recommendation, "purchased")}
                            disabled={feedbackLoading === recommendation.id}
                            className="text-blue-600 hover:bg-blue-50 hover:text-blue-700 px-3"
                          >
                            <ShoppingCart className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* AI Explanation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="bg-mint-50 rounded-xl p-6 border border-mint-100 shadow-md"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-mint-100 flex items-center justify-center shrink-0 shadow-md">
                  <Sparkles className="h-6 w-6 text-mint-600" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-mint-700 mb-2">{t("recommendations.howGenerated")}</h3>
                  <p className="text-gray-600 mb-2">{t("recommendations.aiExplanation")}</p>
                  <p className="text-gray-600">{t("recommendations.systemAnalysis")}</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Detailed View Modal */}
      <Dialog open={showDetailModal} onOpenChange={setShowDetailModal}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto" dir="rtl">
          {selectedPerfume && (
            <>
              <DialogHeader className="text-right">
                <DialogTitle className="text-xl font-bold text-sage-900 text-right">{selectedPerfume.name}</DialogTitle>
                <DialogDescription className="text-right">
                  {selectedPerfume.brand} - {selectedPerfume.retailer}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-6">
                <div className="flex gap-6 flex-row-reverse">
                  <div className="w-48 h-48 relative bg-gradient-to-br from-mint-50 to-white rounded-lg overflow-hidden border border-sage-200">
                    <div className="flex items-center justify-center h-full">
                      <div className="text-center">
                        <div className="w-20 h-20 mx-auto bg-mint-100 rounded-full flex items-center justify-center shadow-lg mb-3">
                          <Droplets className="h-10 w-10 text-mint-600" />
                        </div>
                        <p className="text-sm font-medium text-sage-700">{selectedPerfume.brand}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex-1 space-y-4">
                    <div className="flex items-center justify-between flex-row-reverse">
                      <span className="text-2xl font-bold text-mint-700">{selectedPerfume.price}</span>
                      <div className="flex items-center gap-2 flex-row-reverse">
                        <div className="flex items-center flex-row-reverse">
                          <span className="text-gray-500">({selectedPerfume.reviews} مراجعة)</span>
                          <span className="font-semibold mr-1">{selectedPerfume.rating}</span>
                          <Star className="h-5 w-5 fill-amber-500 text-amber-500 mr-1" />
                        </div>
                      </div>
                    </div>

                    <div className="bg-mint-50 p-4 rounded-lg">
                      <div className="flex items-center gap-2 mb-2 flex-row-reverse">
                        <span className="font-semibold text-mint-700">
                          {t("recommendations.matchWithPreferences", { percentage: selectedPerfume.matchPercentage })}
                        </span>
                        <Sparkles className="h-5 w-5 text-mint-600" />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center gap-2 flex-row-reverse">
                        <span className="text-sm">{selectedPerfume.gender}</span>
                        <Zap className="h-4 w-4 text-mint-600" />
                      </div>
                      <div className="flex items-center gap-2 flex-row-reverse">
                        <span className="text-sm">{selectedPerfume.strength}</span>
                        <Droplets className="h-4 w-4 text-mint-600" />
                      </div>
                      <div className="flex items-center gap-2 flex-row-reverse">
                        <span className="text-sm">{selectedPerfume.longevity}</span>
                        <Clock className="h-4 w-4 text-mint-600" />
                      </div>
                      <div className="flex items-center gap-2 flex-row-reverse">
                        <span className="text-sm">{selectedPerfume.season.join("، ")}</span>
                        <Calendar className="h-4 w-4 text-mint-600" />
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-sage-900 mb-2 text-right">{t("recommendations.description")}</h4>
                  <p className="text-gray-600 text-right leading-relaxed">{selectedPerfume.description}</p>
                </div>

                <div>
                  <h4 className="font-semibold text-sage-900 mb-2 text-right">{t("recommendations.fragranceNotes")}</h4>
                  <div className="flex flex-wrap gap-2 justify-end">
                    {selectedPerfume.notes.map((note, idx) => (
                      <Badge key={idx} variant="secondary" className="text-right">
                        {note}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-sage-900 mb-2 text-right">
                    {t("recommendations.suitableOccasions")}
                  </h4>
                  <div className="flex flex-wrap gap-2 justify-end">
                    {selectedPerfume.occasion.map((occ, idx) => (
                      <Badge key={idx} variant="outline" className="text-right">
                        {occ}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3 pt-4 flex-row-reverse">
                  <Button
                    onClick={() => handleAddToFavorites(selectedPerfume)}
                    disabled={favoriteLoading === selectedPerfume.id}
                    className="flex-1 bg-mint-500 hover:bg-mint-600 text-white"
                  >
                    {favoriteLoading === selectedPerfume.id ? (
                      <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full ml-2" />
                    ) : (
                      <Heart className="h-4 w-4 ml-2" />
                    )}
                    {t("recommendations.addToFavorites")}
                  </Button>
                  <Button variant="outline" className="flex-1 bg-transparent">
                    <Share2 className="h-4 w-4 ml-2" />
                    {t("recommendations.share")}
                  </Button>
                </div>

                {/* Add Shopping Modal in detail view */}
                <div className="mt-3">
                  <PerfumeShoppingModal
                    perfumeName={selectedPerfume.name}
                    perfumeBrand={selectedPerfume.brand}
                    triggerClassName="w-full"
                    triggerText={t("recommendations.shopThisPerfume")}
                    hideIcon={true}
                  />
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
