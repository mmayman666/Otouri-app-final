"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Search, Filter, Heart, Star, Trash2, Clock, Info, ArrowRight } from "lucide-react"
import { motion } from "framer-motion"
import { createClient } from "@/utils/supabase/client"
import { useToast } from "@/hooks/use-toast"
import { useTranslation } from "@/lib/translations/context"
import type { PerfumeRecommendation } from "../recommendations/actions"

interface FavoriteItem {
  id: string
  perfume_data: PerfumeRecommendation
  created_at: string
}

export default function FavoritesPage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [favorites, setFavorites] = useState<FavoriteItem[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const { toast } = useToast()
  const { t, isRTL } = useTranslation()

  const categories = [
    { id: "all", name: t("favorites.all") },
    { id: "رجالي", name: t("favorites.men") },
    { id: "نسائي", name: t("favorites.women") },
    { id: "للجنسين", name: t("favorites.unisex") },
  ]

  useEffect(() => {
    loadFavorites()
  }, [])

  const loadFavorites = async () => {
    try {
      const supabase = createClient()

      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser()
      if (userError || !user) {
        setLoading(false)
        return
      }

      const { data, error } = await supabase
        .from("user_favorites")
        .select("id, perfume_data, created_at")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })

      if (error) {
        console.error("Error loading favorites:", error)
        toast({
          title: t("common.error"),
          description: t("favorites.errorLoading"),
          variant: "destructive",
        })
      } else {
        setFavorites(data || [])
      }
    } catch (error) {
      console.error("Error loading favorites:", error)
      toast({
        title: t("common.error"),
        description: t("favorites.errorLoading"),
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const removeFavorite = async (favoriteId: string) => {
    setDeletingId(favoriteId)
    try {
      const supabase = createClient()

      const { error } = await supabase.from("user_favorites").delete().eq("id", favoriteId)

      if (error) {
        throw error
      }

      setFavorites((prev) => prev.filter((item) => item.id !== favoriteId))
      toast({
        title: t("common.success"),
        description: t("favorites.favoriteRemoved"),
      })
    } catch (error) {
      console.error("Error removing favorite:", error)
      toast({
        title: t("common.error"),
        description: t("favorites.errorRemoving"),
        variant: "destructive",
      })
    } finally {
      setDeletingId(null)
    }
  }

  const filteredFavorites = favorites.filter((item) => {
    const perfume = item.perfume_data
    const matchesSearch =
      searchQuery === "" ||
      perfume.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      perfume.brand.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesCategory = selectedCategory === "all" || perfume.gender === selectedCategory

    return matchesSearch && matchesCategory
  })

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffTime = Math.abs(now.getTime() - date.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays === 1) return t("favorites.timeAgo.oneDay")
    if (diffDays < 7) return t("favorites.timeAgo.days", { count: diffDays })
    if (diffDays < 30) return t("favorites.timeAgo.weeks", { count: Math.ceil(diffDays / 7) })
    return t("favorites.timeAgo.month", { count: Math.ceil(diffDays / 30) })
  }

  if (loading) {
    return (
      <div className="p-6 space-y-6" dir={isRTL ? "rtl" : "ltr"}>
        <div dir={isRTL ? "rtl" : "ltr"}>
          <h1 className="text-2xl font-bold text-sage-900 mb-1" dir={isRTL ? "rtl" : "ltr"}>
            {t("favorites.title")}
          </h1>
          <p className="text-gray-600 text-sm" dir={isRTL ? "rtl" : "ltr"}>
            {t("favorites.subtitle")}
          </p>
        </div>
        <div className="flex justify-center py-12" dir={isRTL ? "rtl" : "ltr"}>
          <div className="animate-spin h-8 w-8 border-2 border-mint-500 border-t-transparent rounded-full"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6" dir={isRTL ? "rtl" : "ltr"}>
      <div dir={isRTL ? "rtl" : "ltr"}>
        <h1 className="text-2xl font-bold text-sage-900 mb-1" dir={isRTL ? "rtl" : "ltr"}>
          {t("favorites.title")}
        </h1>
        <p className="text-gray-600 text-sm" dir={isRTL ? "rtl" : "ltr"}>
          {t("favorites.subtitle")}
        </p>
      </div>

      <Card className="border-sage-100 shadow-md" dir={isRTL ? "rtl" : "ltr"}>
        <CardHeader className="pb-2 pt-4 px-6" dir={isRTL ? "rtl" : "ltr"}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4" dir={isRTL ? "rtl" : "ltr"}>
            <div className="flex items-center gap-2" dir={isRTL ? "rtl" : "ltr"}>
              <Heart className="h-5 w-5 text-rose-500" />
              <CardTitle className="text-lg font-bold text-sage-900" dir={isRTL ? "rtl" : "ltr"}>
                {t("favorites.favoritesPerfumes")}
              </CardTitle>
              <span className="bg-rose-100 text-rose-700 text-xs px-2 py-0.5 rounded-full" dir={isRTL ? "rtl" : "ltr"}>
                {filteredFavorites.length} {t("favorites.perfume")}
              </span>
            </div>
            <div className="flex items-center gap-2" dir={isRTL ? "rtl" : "ltr"}>
              <div className="flex border border-sage-200 rounded-md overflow-hidden" dir={isRTL ? "rtl" : "ltr"}>
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  className={viewMode === "grid" ? "bg-mint-500 text-white rounded-none h-8" : "rounded-none h-8"}
                  dir={isRTL ? "rtl" : "ltr"}
                >
                  {t("favorites.grid")}
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className={viewMode === "list" ? "bg-mint-500 text-white rounded-none h-8" : "rounded-none h-8"}
                  dir={isRTL ? "rtl" : "ltr"}
                >
                  {t("favorites.list")}
                </Button>
              </div>
              <div className="relative flex-1 min-w-[200px]" dir={isRTL ? "rtl" : "ltr"}>
                <Search
                  className={`absolute ${isRTL ? "right-3" : "left-3"} top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400`}
                />
                <Input
                  placeholder={t("favorites.searchFavorites")}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`${isRTL ? "pr-10" : "pl-10"} border-sage-200 focus-visible:ring-mint-400 rounded-lg h-9 shadow-sm text-sm`}
                  dir={isRTL ? "rtl" : "ltr"}
                  style={{ textAlign: isRTL ? "right" : "left" }}
                />
              </div>
              <Button
                variant="outline"
                size="sm"
                className="text-mint-600 border-mint-200 hover:bg-mint-50 hover:text-mint-700 h-9 text-sm flex items-center gap-1 flex-row-reverse bg-transparent"
                dir={isRTL ? "rtl" : "ltr"}
              >
                <span dir={isRTL ? "rtl" : "ltr"}>{t("favorites.filter")}</span>
                <Filter className={`h-4 w-4 ${isRTL ? "ml-1" : "mr-1"}`} />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="px-6 pb-6" dir={isRTL ? "rtl" : "ltr"}>
          <Tabs
            value={selectedCategory}
            onValueChange={setSelectedCategory}
            className="w-full"
            dir={isRTL ? "rtl" : "ltr"}
          >
            <TabsList
              className="mb-6 h-9 w-full justify-start overflow-x-auto flex-nowrap whitespace-nowrap"
              dir={isRTL ? "rtl" : "ltr"}
            >
              {categories.map((category) => (
                <TabsTrigger key={category.id} value={category.id} className="text-xs" dir={isRTL ? "rtl" : "ltr"}>
                  {category.name}
                </TabsTrigger>
              ))}
            </TabsList>
            <TabsContent value={selectedCategory} className="mt-0" dir={isRTL ? "rtl" : "ltr"}>
              {filteredFavorites.length === 0 ? (
                <div className="text-center py-12" dir={isRTL ? "rtl" : "ltr"}>
                  <Heart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-600 mb-2" dir={isRTL ? "rtl" : "ltr"}>
                    {t("favorites.noFavorites")}
                  </h3>
                  <p className="text-gray-500 mb-4" dir={isRTL ? "rtl" : "ltr"}>
                    {searchQuery || selectedCategory !== "all"
                      ? t("favorites.noMatchingPerfumes")
                      : t("favorites.noFavoritesMessage")}
                  </p>
                  {(searchQuery || selectedCategory !== "all") && (
                    <Button
                      variant="outline"
                      onClick={() => {
                        setSearchQuery("")
                        setSelectedCategory("all")
                      }}
                      className="text-mint-600 border-mint-200 hover:bg-mint-50"
                      dir={isRTL ? "rtl" : "ltr"}
                    >
                      {t("favorites.clearFilters")}
                    </Button>
                  )}
                </div>
              ) : viewMode === "grid" ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" dir={isRTL ? "rtl" : "ltr"}>
                  {filteredFavorites.map((item) => (
                    <motion.div
                      key={item.id}
                      className="group"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      whileHover={{ y: -5 }}
                      dir={isRTL ? "rtl" : "ltr"}
                    >
                      <div
                        className="bg-white rounded-lg border border-sage-100 overflow-hidden hover:shadow-lg transition-all h-full flex flex-col"
                        dir={isRTL ? "rtl" : "ltr"}
                      >
                        <div
                          className="relative bg-gradient-to-br from-mint-50 via-sage-50 to-mint-100 p-6 border-b border-sage-100"
                          dir={isRTL ? "rtl" : "ltr"}
                        >
                          <div className={`absolute top-2 ${isRTL ? "right-2" : "left-2"}`} dir={isRTL ? "rtl" : "ltr"}>
                            <span
                              className="bg-rose-100 text-rose-700 text-xs px-2 py-0.5 rounded-full"
                              dir={isRTL ? "rtl" : "ltr"}
                            >
                              {item.perfume_data.gender}
                            </span>
                          </div>
                          <div className={`absolute top-2 ${isRTL ? "left-2" : "right-2"}`} dir={isRTL ? "rtl" : "ltr"}>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => removeFavorite(item.id)}
                              disabled={deletingId === item.id}
                              className="h-7 w-7 rounded-full bg-white/80 backdrop-blur-sm text-rose-500 hover:text-rose-600 hover:bg-white shadow-sm"
                              dir={isRTL ? "rtl" : "ltr"}
                            >
                              {deletingId === item.id ? (
                                <div className="animate-spin h-4 w-4 border-2 border-rose-500 border-t-transparent rounded-full" />
                              ) : (
                                <Trash2 className="h-4 w-4" />
                              )}
                              <span className="sr-only">{t("favorites.removeFromFavorites")}</span>
                            </Button>
                          </div>
                          <div className="flex items-center justify-center h-24" dir={isRTL ? "rtl" : "ltr"}>
                            <div className="text-center" dir={isRTL ? "rtl" : "ltr"}>
                              <div
                                className="w-16 h-16 mx-auto bg-white rounded-full flex items-center justify-center shadow-lg mb-2"
                                dir={isRTL ? "rtl" : "ltr"}
                              >
                                <Heart className="h-8 w-8 text-rose-500 fill-rose-500" />
                              </div>
                              <p className="text-sm font-medium text-sage-700" dir={isRTL ? "rtl" : "ltr"}>
                                {item.perfume_data.brand}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="p-4 flex-1 flex flex-col" dir={isRTL ? "rtl" : "ltr"}>
                          <div className="mb-2" dir={isRTL ? "rtl" : "ltr"}>
                            <h3
                              className="font-semibold text-sage-900 group-hover:text-mint-600 transition-colors"
                              dir={isRTL ? "rtl" : "ltr"}
                            >
                              {item.perfume_data.name}
                            </h3>
                            <p className="text-sm text-gray-600" dir={isRTL ? "rtl" : "ltr"}>
                              {item.perfume_data.brand}
                            </p>
                          </div>

                          <div className="mt-2 space-y-2 flex-1" dir={isRTL ? "rtl" : "ltr"}>
                            <div
                              className={`flex flex-wrap gap-1 mt-2 ${isRTL ? "justify-end" : "justify-start"}`}
                              dir={isRTL ? "rtl" : "ltr"}
                            >
                              {item.perfume_data.notes.slice(0, 3).map((note, idx) => (
                                <span
                                  key={idx}
                                  className="text-xs bg-sage-50 text-sage-700 px-2 py-0.5 rounded-full"
                                  dir={isRTL ? "rtl" : "ltr"}
                                >
                                  {note}
                                </span>
                              ))}
                              {item.perfume_data.notes.length > 3 && (
                                <span className="text-xs text-gray-500" dir={isRTL ? "rtl" : "ltr"}>
                                  +{item.perfume_data.notes.length - 3}
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-gray-500 line-clamp-2 mt-2" dir={isRTL ? "rtl" : "ltr"}>
                              {item.perfume_data.description}
                            </p>
                          </div>

                          <div className="flex items-center justify-between mt-3" dir={isRTL ? "rtl" : "ltr"}>
                            <div className="flex items-center" dir={isRTL ? "rtl" : "ltr"}>
                              <span className="text-sm font-bold text-mint-700" dir={isRTL ? "rtl" : "ltr"}>
                                {item.perfume_data.price}
                              </span>
                            </div>
                            <div className="flex items-center" dir={isRTL ? "rtl" : "ltr"}>
                              <Star className="h-4 w-4 fill-amber-500 text-amber-500" />
                              <span
                                className={`text-sm text-gray-600 ${isRTL ? "mr-1" : "ml-1"}`}
                                dir={isRTL ? "rtl" : "ltr"}
                              >
                                {item.perfume_data.rating}
                              </span>
                            </div>
                          </div>

                          <div
                            className="mt-3 pt-3 border-t border-sage-100 flex justify-between items-center"
                            dir={isRTL ? "rtl" : "ltr"}
                          >
                            <span className="text-xs text-gray-500 flex items-center" dir={isRTL ? "rtl" : "ltr"}>
                              <Clock className={`h-3 w-3 ${isRTL ? "ml-1" : "mr-1"} text-gray-400`} />
                              <span dir={isRTL ? "rtl" : "ltr"}>{formatDate(item.created_at)}</span>
                            </span>
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-xs border-mint-200 text-mint-600 hover:bg-mint-50 hover:text-mint-700 h-7 flex items-center gap-1 flex-row-reverse bg-transparent"
                              dir={isRTL ? "rtl" : "ltr"}
                            >
                              <span dir={isRTL ? "rtl" : "ltr"}>{t("favorites.details")}</span>
                              <Info className={`h-3 w-3 ${isRTL ? "ml-1" : "mr-1"}`} />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="overflow-hidden rounded-lg border border-sage-100 bg-white" dir={isRTL ? "rtl" : "ltr"}>
                  <div className="overflow-x-auto" dir={isRTL ? "rtl" : "ltr"}>
                    <table className="w-full border-collapse" dir={isRTL ? "rtl" : "ltr"}>
                      <thead dir={isRTL ? "rtl" : "ltr"}>
                        <tr className="bg-sage-50" dir={isRTL ? "rtl" : "ltr"}>
                          <th
                            className={`px-4 py-2 text-xs font-medium text-sage-700 border-b border-sage-200 ${isRTL ? "text-right" : "text-left"}`}
                            dir={isRTL ? "rtl" : "ltr"}
                          >
                            {t("favorites.brand")}
                          </th>
                          <th
                            className={`px-4 py-2 text-xs font-medium text-sage-700 border-b border-sage-200 ${isRTL ? "text-right" : "text-left"}`}
                            dir={isRTL ? "rtl" : "ltr"}
                          >
                            {t("favorites.brand")}
                          </th>
                          <th
                            className={`px-4 py-2 text-xs font-medium text-sage-700 border-b border-sage-200 ${isRTL ? "text-right" : "text-left"}`}
                            dir={isRTL ? "rtl" : "ltr"}
                          >
                            {t("favorites.category")}
                          </th>
                          <th
                            className={`px-4 py-2 text-xs font-medium text-sage-700 border-b border-sage-200 ${isRTL ? "text-right" : "text-left"}`}
                            dir={isRTL ? "rtl" : "ltr"}
                          >
                            {t("favorites.price")}
                          </th>
                          <th
                            className={`px-4 py-2 text-xs font-medium text-sage-700 border-b border-sage-200 ${isRTL ? "text-right" : "text-left"}`}
                            dir={isRTL ? "rtl" : "ltr"}
                          >
                            {t("favorites.rating")}
                          </th>
                          <th
                            className={`px-4 py-2 text-xs font-medium text-sage-700 border-b border-sage-200 ${isRTL ? "text-right" : "text-left"}`}
                            dir={isRTL ? "rtl" : "ltr"}
                          >
                            {t("favorites.dateAdded")}
                          </th>
                          <th
                            className="px-4 py-2 text-xs font-medium text-sage-700 border-b border-sage-200"
                            dir={isRTL ? "rtl" : "ltr"}
                          ></th>
                        </tr>
                      </thead>
                      <tbody dir={isRTL ? "rtl" : "ltr"}>
                        {filteredFavorites.map((item) => (
                          <tr key={item.id} className="hover:bg-sage-50/50" dir={isRTL ? "rtl" : "ltr"}>
                            <td
                              className={`px-4 py-3 border-b border-sage-100 ${isRTL ? "text-right" : "text-left"}`}
                              dir={isRTL ? "rtl" : "ltr"}
                            >
                              <div
                                className={`flex items-center gap-3 ${isRTL ? "justify-end" : "justify-start"}`}
                                dir={isRTL ? "rtl" : "ltr"}
                              >
                                <span className="font-medium text-sage-900" dir={isRTL ? "rtl" : "ltr"}>
                                  {item.perfume_data.name}
                                </span>
                                <div
                                  className="w-10 h-10 rounded-md overflow-hidden bg-mint-50 border border-sage-100 relative shrink-0 flex items-center justify-center"
                                  dir={isRTL ? "rtl" : "ltr"}
                                >
                                  <Heart className="h-5 w-5 text-rose-500 fill-rose-500" />
                                </div>
                              </div>
                            </td>
                            <td
                              className={`px-4 py-3 border-b border-sage-100 text-sm text-gray-600 ${isRTL ? "text-right" : "text-left"}`}
                              dir={isRTL ? "rtl" : "ltr"}
                            >
                              {item.perfume_data.brand}
                            </td>
                            <td
                              className={`px-4 py-3 border-b border-sage-100 ${isRTL ? "text-right" : "text-left"}`}
                              dir={isRTL ? "rtl" : "ltr"}
                            >
                              <span
                                className="text-xs bg-rose-50 text-rose-700 px-2 py-0.5 rounded-full"
                                dir={isRTL ? "rtl" : "ltr"}
                              >
                                {item.perfume_data.gender}
                              </span>
                            </td>
                            <td
                              className={`px-4 py-3 border-b border-sage-100 text-sm font-medium text-mint-700 ${isRTL ? "text-right" : "text-left"}`}
                              dir={isRTL ? "rtl" : "ltr"}
                            >
                              {item.perfume_data.price}
                            </td>
                            <td
                              className={`px-4 py-3 border-b border-sage-100 ${isRTL ? "text-right" : "text-left"}`}
                              dir={isRTL ? "rtl" : "ltr"}
                            >
                              <div
                                className={`flex items-center ${isRTL ? "justify-end" : "justify-start"}`}
                                dir={isRTL ? "rtl" : "ltr"}
                              >
                                <span
                                  className={`text-sm text-gray-600 ${isRTL ? "ml-1" : "mr-1"}`}
                                  dir={isRTL ? "rtl" : "ltr"}
                                >
                                  {item.perfume_data.rating}
                                </span>
                                <Star className="h-4 w-4 fill-amber-500 text-amber-500" />
                              </div>
                            </td>
                            <td
                              className={`px-4 py-3 border-b border-sage-100 text-sm text-gray-500 ${isRTL ? "text-right" : "text-left"}`}
                              dir={isRTL ? "rtl" : "ltr"}
                            >
                              <span dir={isRTL ? "rtl" : "ltr"}>{formatDate(item.created_at)}</span>
                            </td>
                            <td
                              className={`px-4 py-3 border-b border-sage-100 ${isRTL ? "text-right" : "text-left"}`}
                              dir={isRTL ? "rtl" : "ltr"}
                            >
                              <div
                                className={`flex items-center gap-2 ${isRTL ? "justify-end" : "justify-start"}`}
                                dir={isRTL ? "rtl" : "ltr"}
                              >
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="text-mint-600 hover:text-mint-700 hover:bg-mint-50 h-8 text-xs flex items-center gap-1 flex-row-reverse"
                                  dir={isRTL ? "rtl" : "ltr"}
                                >
                                  <span dir={isRTL ? "rtl" : "ltr"}>{t("favorites.details")}</span>
                                  <ArrowRight className={`h-3 w-3 ${isRTL ? "ml-1 rotate-180" : "mr-1"}`} />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => removeFavorite(item.id)}
                                  disabled={deletingId === item.id}
                                  className="text-rose-500 hover:text-rose-600 hover:bg-rose-50 h-8 w-8 p-0"
                                  dir={isRTL ? "rtl" : "ltr"}
                                >
                                  {deletingId === item.id ? (
                                    <div className="animate-spin h-4 w-4 border-2 border-rose-500 border-t-transparent rounded-full" />
                                  ) : (
                                    <Trash2 className="h-4 w-4" />
                                  )}
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
