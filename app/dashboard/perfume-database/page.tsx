"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Search, Filter, Database, Star, Clock, Droplets, Heart, Users } from "lucide-react"
import { PerfumeShoppingModal } from "@/components/perfume-shopping-modal"
import { useTranslation } from "@/lib/translations/context"

export default function PerfumeDatabasePage() {
  const { t, isRTL } = useTranslation()

  const categories = [
    { id: "all", name: t("perfumeDatabase.all") },
    { id: "oriental", name: t("perfumeDatabase.oriental") },
    { id: "french", name: t("perfumeDatabase.french") },
    { id: "woody", name: t("perfumeDatabase.woody") },
    { id: "floral", name: t("perfumeDatabase.floral") },
  ]

  const [selectedPerfume, setSelectedPerfume] = useState<(typeof perfumes)[0] | null>(null)

  // Helper function to get translated perfume data
  const getPerfumeData = (key: string, field: string) => {
    return t(`perfumeDatabase.perfumeData.${key}.${field}`)
  }

  const getPerfumeNotes = (key: string, noteType: string) => {
    const notes = t(`perfumeDatabase.perfumeData.${key}.${noteType}`, { returnObjects: true })
    return Array.isArray(notes) ? notes : []
  }

  const perfumes = [
    {
      id: 1,
      key: "sauvage",
      name: getPerfumeData("sauvage", "name"),
      brand: getPerfumeData("sauvage", "brand"),
      price: "٤٥٠ ر.س",
      rating: 4.8,
      year: 2015,
      image: "/placeholder.svg?height=60&width=60&text=Sauvage",
      category: getPerfumeData("sauvage", "category"),
      description: getPerfumeData("sauvage", "description"),
      notes: getPerfumeNotes("sauvage", "topNotes").slice(0, 3),
      topNotes: getPerfumeNotes("sauvage", "topNotes"),
      middleNotes: getPerfumeNotes("sauvage", "middleNotes"),
      baseNotes: getPerfumeNotes("sauvage", "baseNotes"),
      longevity: getPerfumeData("sauvage", "longevity"),
      sillage: getPerfumeData("sauvage", "sillage"),
      season: getPerfumeData("sauvage", "season"),
      occasion: getPerfumeData("sauvage", "occasion"),
      concentration: "Eau de Toilette",
      perfumer: getPerfumeData("sauvage", "perfumer"),
      reviews: 2847,
      gender: getPerfumeData("sauvage", "gender"),
    },
    {
      id: 2,
      key: "bleuDeChanel",
      name: getPerfumeData("bleuDeChanel", "name"),
      brand: getPerfumeData("bleuDeChanel", "brand"),
      price: "٥٢٠ ر.س",
      rating: 4.7,
      year: 2010,
      image: "/placeholder.svg?height=60&width=60&text=Bleu",
      category: getPerfumeData("bleuDeChanel", "category"),
      description: getPerfumeData("bleuDeChanel", "description"),
      notes: getPerfumeNotes("bleuDeChanel", "topNotes").slice(0, 3),
      topNotes: getPerfumeNotes("bleuDeChanel", "topNotes"),
      middleNotes: getPerfumeNotes("bleuDeChanel", "middleNotes"),
      baseNotes: getPerfumeNotes("bleuDeChanel", "baseNotes"),
      longevity: getPerfumeData("bleuDeChanel", "longevity"),
      sillage: getPerfumeData("bleuDeChanel", "sillage"),
      season: getPerfumeData("bleuDeChanel", "season"),
      occasion: getPerfumeData("bleuDeChanel", "occasion"),
      concentration: "Eau de Parfum",
      perfumer: getPerfumeData("bleuDeChanel", "perfumer"),
      reviews: 1923,
      gender: getPerfumeData("bleuDeChanel", "gender"),
    },
    {
      id: 3,
      key: "oudIspahan",
      name: getPerfumeData("oudIspahan", "name"),
      brand: getPerfumeData("oudIspahan", "brand"),
      price: "١٢٠٠ ر.س",
      rating: 4.9,
      year: 2018,
      image: "/placeholder.svg?height=60&width=60&text=Oud",
      category: getPerfumeData("oudIspahan", "category"),
      description: getPerfumeData("oudIspahan", "description"),
      notes: getPerfumeNotes("oudIspahan", "topNotes").slice(0, 3),
      topNotes: getPerfumeNotes("oudIspahan", "topNotes"),
      middleNotes: getPerfumeNotes("oudIspahan", "middleNotes"),
      baseNotes: getPerfumeNotes("oudIspahan", "baseNotes"),
      longevity: getPerfumeData("oudIspahan", "longevity"),
      sillage: getPerfumeData("oudIspahan", "sillage"),
      season: getPerfumeData("oudIspahan", "season"),
      occasion: getPerfumeData("oudIspahan", "occasion"),
      concentration: "Parfum",
      perfumer: getPerfumeData("oudIspahan", "perfumer"),
      reviews: 856,
      gender: getPerfumeData("oudIspahan", "gender"),
    },
    {
      id: 4,
      key: "laVieEstBelle",
      name: getPerfumeData("laVieEstBelle", "name"),
      brand: getPerfumeData("laVieEstBelle", "brand"),
      price: "٣٨٠ ر.س",
      rating: 4.6,
      year: 2012,
      image: "/placeholder.svg?height=60&width=60&text=LVEB",
      category: getPerfumeData("laVieEstBelle", "category"),
      description: getPerfumeData("laVieEstBelle", "description"),
      notes: getPerfumeNotes("laVieEstBelle", "topNotes").slice(0, 3),
      topNotes: getPerfumeNotes("laVieEstBelle", "topNotes"),
      middleNotes: getPerfumeNotes("laVieEstBelle", "middleNotes"),
      baseNotes: getPerfumeNotes("laVieEstBelle", "baseNotes"),
      longevity: getPerfumeData("laVieEstBelle", "longevity"),
      sillage: getPerfumeData("laVieEstBelle", "sillage"),
      season: getPerfumeData("laVieEstBelle", "season"),
      occasion: getPerfumeData("laVieEstBelle", "occasion"),
      concentration: "Eau de Parfum",
      perfumer: getPerfumeData("laVieEstBelle", "perfumer"),
      reviews: 3421,
      gender: getPerfumeData("laVieEstBelle", "gender"),
    },
    {
      id: 5,
      key: "tomFordOudWood",
      name: getPerfumeData("tomFordOudWood", "name"),
      brand: getPerfumeData("tomFordOudWood", "brand"),
      price: "٨٥٠ ر.س",
      rating: 4.8,
      year: 2007,
      image: "/placeholder.svg?height=60&width=60&text=OudWood",
      category: getPerfumeData("tomFordOudWood", "category"),
      description: getPerfumeData("tomFordOudWood", "description"),
      notes: getPerfumeNotes("tomFordOudWood", "topNotes").slice(0, 3),
      topNotes: getPerfumeNotes("tomFordOudWood", "topNotes"),
      middleNotes: getPerfumeNotes("tomFordOudWood", "middleNotes"),
      baseNotes: getPerfumeNotes("tomFordOudWood", "baseNotes"),
      longevity: getPerfumeData("tomFordOudWood", "longevity"),
      sillage: getPerfumeData("tomFordOudWood", "sillage"),
      season: getPerfumeData("tomFordOudWood", "season"),
      occasion: getPerfumeData("tomFordOudWood", "occasion"),
      concentration: "Eau de Parfum",
      perfumer: getPerfumeData("tomFordOudWood", "perfumer"),
      reviews: 1567,
      gender: getPerfumeData("tomFordOudWood", "gender"),
    },
    {
      id: 6,
      key: "cocoMademoiselle",
      name: getPerfumeData("cocoMademoiselle", "name"),
      brand: getPerfumeData("cocoMademoiselle", "brand"),
      price: "٤٧٠ ر.س",
      rating: 4.7,
      year: 2001,
      image: "/placeholder.svg?height=60&width=60&text=Coco",
      category: getPerfumeData("cocoMademoiselle", "category"),
      description: getPerfumeData("cocoMademoiselle", "description"),
      notes: getPerfumeNotes("cocoMademoiselle", "topNotes").slice(0, 3),
      topNotes: getPerfumeNotes("cocoMademoiselle", "topNotes"),
      middleNotes: getPerfumeNotes("cocoMademoiselle", "middleNotes"),
      baseNotes: getPerfumeNotes("cocoMademoiselle", "baseNotes"),
      longevity: getPerfumeData("cocoMademoiselle", "longevity"),
      sillage: getPerfumeData("cocoMademoiselle", "sillage"),
      season: getPerfumeData("cocoMademoiselle", "season"),
      occasion: getPerfumeData("cocoMademoiselle", "occasion"),
      concentration: "Eau de Parfum",
      perfumer: getPerfumeData("cocoMademoiselle", "perfumer"),
      reviews: 2156,
      gender: getPerfumeData("cocoMademoiselle", "gender"),
    },
    {
      id: 7,
      key: "acquaDiGio",
      name: getPerfumeData("acquaDiGio", "name"),
      brand: getPerfumeData("acquaDiGio", "brand"),
      price: "٣٢٠ ر.س",
      rating: 4.5,
      year: 1996,
      image: "/placeholder.svg?height=60&width=60&text=AdG",
      category: getPerfumeData("acquaDiGio", "category"),
      description: getPerfumeData("acquaDiGio", "description"),
      notes: getPerfumeNotes("acquaDiGio", "topNotes").slice(0, 3),
      topNotes: getPerfumeNotes("acquaDiGio", "topNotes"),
      middleNotes: getPerfumeNotes("acquaDiGio", "middleNotes"),
      baseNotes: getPerfumeNotes("acquaDiGio", "baseNotes"),
      longevity: getPerfumeData("acquaDiGio", "longevity"),
      sillage: getPerfumeData("acquaDiGio", "sillage"),
      season: getPerfumeData("acquaDiGio", "season"),
      occasion: getPerfumeData("acquaDiGio", "occasion"),
      concentration: "Eau de Toilette",
      perfumer: getPerfumeData("acquaDiGio", "perfumer"),
      reviews: 4521,
      gender: getPerfumeData("acquaDiGio", "gender"),
    },
    {
      id: 8,
      key: "blackOpium",
      name: getPerfumeData("blackOpium", "name"),
      brand: getPerfumeData("blackOpium", "brand"),
      price: "٤٩٠ ر.س",
      rating: 4.6,
      year: 2013,
      image: "/placeholder.svg?height=60&width=60&text=BlackOpium",
      category: getPerfumeData("blackOpium", "category"),
      description: getPerfumeData("blackOpium", "description"),
      notes: getPerfumeNotes("blackOpium", "topNotes").slice(0, 3),
      topNotes: getPerfumeNotes("blackOpium", "topNotes"),
      middleNotes: getPerfumeNotes("blackOpium", "middleNotes"),
      baseNotes: getPerfumeNotes("blackOpium", "baseNotes"),
      longevity: getPerfumeData("blackOpium", "longevity"),
      sillage: getPerfumeData("blackOpium", "sillage"),
      season: getPerfumeData("blackOpium", "season"),
      occasion: getPerfumeData("blackOpium", "occasion"),
      concentration: "Eau de Parfum",
      perfumer: getPerfumeData("blackOpium", "perfumer"),
      reviews: 2834,
      gender: getPerfumeData("blackOpium", "gender"),
    },
    {
      id: 9,
      key: "creedAventus",
      name: getPerfumeData("creedAventus", "name"),
      brand: getPerfumeData("creedAventus", "brand"),
      price: "١٥٠٠ ر.س",
      rating: 4.9,
      year: 2010,
      image: "/placeholder.svg?height=60&width=60&text=Aventus",
      category: getPerfumeData("creedAventus", "category"),
      description: getPerfumeData("creedAventus", "description"),
      notes: getPerfumeNotes("creedAventus", "topNotes").slice(0, 3),
      topNotes: getPerfumeNotes("creedAventus", "topNotes"),
      middleNotes: getPerfumeNotes("creedAventus", "middleNotes"),
      baseNotes: getPerfumeNotes("creedAventus", "baseNotes"),
      longevity: getPerfumeData("creedAventus", "longevity"),
      sillage: getPerfumeData("creedAventus", "sillage"),
      season: getPerfumeData("creedAventus", "season"),
      occasion: getPerfumeData("creedAventus", "occasion"),
      concentration: "Eau de Parfum",
      perfumer: getPerfumeData("creedAventus", "perfumer"),
      reviews: 1876,
      gender: getPerfumeData("creedAventus", "gender"),
    },
    {
      id: 10,
      key: "goodGirl",
      name: getPerfumeData("goodGirl", "name"),
      brand: getPerfumeData("goodGirl", "brand"),
      price: "٤١٠ ر.س",
      rating: 4.4,
      year: 2016,
      image: "/placeholder.svg?height=60&width=60&text=GoodGirl",
      category: getPerfumeData("goodGirl", "category"),
      description: getPerfumeData("goodGirl", "description"),
      notes: getPerfumeNotes("goodGirl", "topNotes").slice(0, 3),
      topNotes: getPerfumeNotes("goodGirl", "topNotes"),
      middleNotes: getPerfumeNotes("goodGirl", "middleNotes"),
      baseNotes: getPerfumeNotes("goodGirl", "baseNotes"),
      longevity: getPerfumeData("goodGirl", "longevity"),
      sillage: getPerfumeData("goodGirl", "sillage"),
      season: getPerfumeData("goodGirl", "season"),
      occasion: getPerfumeData("goodGirl", "occasion"),
      concentration: "Eau de Parfum",
      perfumer: getPerfumeData("goodGirl", "perfumer"),
      reviews: 1654,
      gender: getPerfumeData("goodGirl", "gender"),
    },
  ]

  return (
    <div className="space-y-6 p-6" dir={isRTL ? "rtl" : "ltr"}>
      <div>
        <h1 className="text-2xl font-bold text-sage-900 mb-1">{t("perfumeDatabase.title")}</h1>
        <p className="text-gray-600 text-sm">{t("perfumeDatabase.subtitle")}</p>
      </div>

      <Card className="border-sage-100 shadow-md">
        <CardHeader className="pb-2 pt-4 px-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className={`flex items-center gap-2 ${isRTL ? "flex-row-reverse" : ""}`}>
              <span className="bg-mint-100 text-mint-700 text-xs px-2 py-0.5 rounded-full">
                {perfumes.length} {t("perfumeDatabase.perfumes")}
              </span>
              <CardTitle className="text-lg font-bold text-sage-900">{t("perfumeDatabase.database")}</CardTitle>
              <Database className="h-5 w-5 text-mint-500" />
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                className={`text-mint-600 border-mint-200 hover:bg-mint-50 hover:text-mint-700 h-9 text-sm flex items-center gap-1 ${isRTL ? "flex-row-reverse" : ""}`}
              >
                {t("perfumeDatabase.filter")}
                <Filter className={`h-4 w-4 ${isRTL ? "ml-1" : "mr-1"}`} />
              </Button>
              <div className="relative flex-1 min-w-[200px]">
                <Search
                  className={`absolute ${isRTL ? "right-3" : "left-3"} top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400`}
                />
                <Input
                  placeholder={t("perfumeDatabase.searchPerfume")}
                  className={`${isRTL ? "pr-10 text-right" : "pl-10"} border-sage-200 focus-visible:ring-mint-400 rounded-lg h-9 shadow-sm text-sm`}
                />
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="px-4 pb-4">
          <Tabs defaultValue="all" className="w-full">
            <TabsList
              className={`mb-4 h-9 w-full ${isRTL ? "justify-end" : "justify-start"} overflow-x-auto flex-nowrap whitespace-nowrap`}
            >
              {categories.map((category) => (
                <TabsTrigger key={category.id} value={category.id} className="text-xs">
                  {category.name}
                </TabsTrigger>
              ))}
            </TabsList>
            <TabsContent value="all" className="mt-0">
              <div className="overflow-x-auto" dir={isRTL ? "rtl" : "ltr"}>
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-sage-50">
                      <th
                        className={`px-4 py-2 text-xs font-medium text-sage-700 border-b border-sage-200 ${isRTL ? "text-right" : "text-left"}`}
                      >
                        {t("perfumeDatabase.perfume")}
                      </th>
                      <th
                        className={`px-4 py-2 text-xs font-medium text-sage-700 border-b border-sage-200 ${isRTL ? "text-right" : "text-left"}`}
                      >
                        {t("perfumeDatabase.brand")}
                      </th>
                      <th
                        className={`px-4 py-2 text-xs font-medium text-sage-700 border-b border-sage-200 ${isRTL ? "text-right" : "text-left"}`}
                      >
                        {t("perfumeDatabase.category")}
                      </th>
                      <th
                        className={`px-4 py-2 text-xs font-medium text-sage-700 border-b border-sage-200 ${isRTL ? "text-right" : "text-left"}`}
                      >
                        {t("perfumeDatabase.year")}
                      </th>
                      <th
                        className={`px-4 py-2 text-xs font-medium text-sage-700 border-b border-sage-200 ${isRTL ? "text-right" : "text-left"}`}
                      >
                        {t("perfumeDatabase.price")}
                      </th>
                      <th
                        className={`px-4 py-2 text-xs font-medium text-sage-700 border-b border-sage-200 ${isRTL ? "text-right" : "text-left"}`}
                      >
                        {t("perfumeDatabase.rating")}
                      </th>
                      <th className="px-4 py-2 text-xs font-medium text-sage-700 border-b border-sage-200"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {perfumes.map((perfume) => (
                      <tr key={perfume.id} className="hover:bg-sage-50/50">
                        <td className={`px-4 py-3 border-b border-sage-100 ${isRTL ? "text-right" : "text-left"}`}>
                          <span className="font-medium text-sage-900">{perfume.name}</span>
                        </td>
                        <td
                          className={`px-4 py-3 border-b border-sage-100 text-sm text-gray-600 ${isRTL ? "text-right" : "text-left"}`}
                        >
                          {perfume.brand}
                        </td>
                        <td className={`px-4 py-3 border-b border-sage-100 ${isRTL ? "text-right" : "text-left"}`}>
                          <span className="text-xs bg-sage-50 text-sage-700 px-2 py-0.5 rounded-full">
                            {perfume.category}
                          </span>
                        </td>
                        <td
                          className={`px-4 py-3 border-b border-sage-100 text-sm text-gray-600 ${isRTL ? "text-right" : "text-left"}`}
                        >
                          {perfume.year}
                        </td>
                        <td
                          className={`px-4 py-3 border-b border-sage-100 text-sm font-medium text-mint-700 ${isRTL ? "text-right" : "text-left"}`}
                        >
                          {perfume.price}
                        </td>
                        <td className={`px-4 py-3 border-b border-sage-100 ${isRTL ? "text-right" : "text-left"}`}>
                          <div className={`flex items-center ${isRTL ? "justify-end" : "justify-start"}`}>
                            <span className={`text-sm text-gray-600 ${isRTL ? "mr-1" : "ml-1"}`}>{perfume.rating}</span>
                            <Star className="h-4 w-4 fill-amber-500 text-amber-500" />
                          </div>
                        </td>
                        <td className={`px-4 py-3 border-b border-sage-100 ${isRTL ? "text-right" : "text-left"}`}>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-mint-600 hover:text-mint-700 hover:bg-mint-50 h-8 text-xs"
                            onClick={() => setSelectedPerfume(perfume)}
                          >
                            {t("perfumeDatabase.viewDetails")}
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="flex items-center justify-between mt-4 pt-2 border-t border-sage-100">
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-mint-600 border-mint-200 hover:bg-mint-50 hover:text-mint-700 h-8 text-xs bg-transparent"
                  >
                    {t("perfumeDatabase.next")}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-mint-600 border-mint-200 hover:bg-mint-50 hover:text-mint-700 h-8 text-xs bg-transparent"
                    disabled
                  >
                    {t("perfumeDatabase.previous")}
                  </Button>
                </div>
                <div className="text-xs text-gray-500">{t("perfumeDatabase.showing")}</div>
              </div>
            </TabsContent>
            <TabsContent value="oriental" className="mt-0">
              <div className="h-60 flex items-center justify-center text-gray-500 text-sm">
                {t("perfumeDatabase.orientalPerfumes")}
              </div>
            </TabsContent>
            <TabsContent value="french" className="mt-0">
              <div className="h-60 flex items-center justify-center text-gray-500 text-sm">
                {t("perfumeDatabase.frenchPerfumes")}
              </div>
            </TabsContent>
            <TabsContent value="woody" className="mt-0">
              <div className="h-60 flex items-center justify-center text-gray-500 text-sm">
                {t("perfumeDatabase.woodyPerfumes")}
              </div>
            </TabsContent>
            <TabsContent value="floral" className="mt-0">
              <div className="h-60 flex items-center justify-center text-gray-500 text-sm">
                {t("perfumeDatabase.floralPerfumes")}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <Dialog open={!!selectedPerfume} onOpenChange={() => setSelectedPerfume(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto" dir={isRTL ? "rtl" : "ltr"}>
          <DialogHeader>
            <DialogTitle className={`text-2xl font-bold text-sage-900 ${isRTL ? "text-right" : "text-left"}`}>
              {selectedPerfume?.name}
            </DialogTitle>
          </DialogHeader>

          {selectedPerfume && (
            <div className="space-y-6">
              {/* Header Section */}
              <div className="flex items-start gap-6">
                <img
                  src={selectedPerfume.image || "/placeholder.svg"}
                  alt={selectedPerfume.name}
                  className="w-32 h-32 rounded-lg object-cover border border-sage-200 shadow-md"
                />
                <div className="flex-1 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="bg-sage-100 text-sage-700">
                        {selectedPerfume.category}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {selectedPerfume.gender}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-5 w-5 fill-amber-500 text-amber-500" />
                      <span className="text-lg font-bold">{selectedPerfume.rating}</span>
                      <span className="text-sm text-gray-500">
                        ({selectedPerfume.reviews} {t("perfumeDatabase.reviews")})
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium text-gray-700">{t("perfumeDatabase.brand")}:</span>
                      <span className={`${isRTL ? "mr-2" : "ml-2"}`}>{selectedPerfume.brand}</span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">{t("perfumeDatabase.releaseYear")}</span>
                      <span className={`${isRTL ? "mr-2" : "ml-2"}`}>{selectedPerfume.year}</span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">{t("perfumeDatabase.concentration")}</span>
                      <span className={`${isRTL ? "mr-2" : "ml-2"}`}>{selectedPerfume.concentration}</span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">{t("perfumeDatabase.perfumer")}</span>
                      <span className={`${isRTL ? "mr-2" : "ml-2"}`}>{selectedPerfume.perfumer}</span>
                    </div>
                  </div>

                  <div className="text-2xl font-bold text-mint-700">{selectedPerfume.price}</div>
                </div>
              </div>

              {/* Description */}
              <div className="bg-sage-50 p-4 rounded-lg">
                <h3 className="font-semibold text-sage-900 mb-2">{t("perfumeDatabase.description")}</h3>
                <p className="text-gray-700 leading-relaxed">{selectedPerfume.description}</p>
              </div>

              {/* Performance Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-mint-50 p-3 rounded-lg text-center">
                  <Clock className="h-6 w-6 text-mint-600 mx-auto mb-1" />
                  <div className="text-xs text-gray-600">{t("perfumeDatabase.longevity")}</div>
                  <div className="font-semibold text-mint-700">{selectedPerfume.longevity}</div>
                </div>
                <div className="bg-blue-50 p-3 rounded-lg text-center">
                  <Droplets className="h-6 w-6 text-blue-600 mx-auto mb-1" />
                  <div className="text-xs text-gray-600">{t("perfumeDatabase.sillage")}</div>
                  <div className="font-semibold text-blue-700">{selectedPerfume.sillage}</div>
                </div>
                <div className="bg-amber-50 p-3 rounded-lg text-center">
                  <Heart className="h-6 w-6 text-amber-600 mx-auto mb-1" />
                  <div className="text-xs text-gray-600">{t("perfumeDatabase.suitableSeason")}</div>
                  <div className="font-semibold text-amber-700">{selectedPerfume.season}</div>
                </div>
                <div className="bg-purple-50 p-3 rounded-lg text-center">
                  <Users className="h-6 w-6 text-purple-600 mx-auto mb-1" />
                  <div className="text-xs text-gray-600">{t("perfumeDatabase.occasion")}</div>
                  <div className="font-semibold text-purple-700">{selectedPerfume.occasion}</div>
                </div>
              </div>

              {/* Fragrance Notes */}
              <div className="space-y-4">
                <h3 className="font-semibold text-sage-900">{t("perfumeDatabase.fragrancePyramid")}</h3>

                <div className="space-y-3">
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">{t("perfumeDatabase.topNotes")}</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedPerfume.topNotes.map((note, index) => (
                        <Badge
                          key={index}
                          variant="outline"
                          className="text-xs bg-green-50 border-green-200 text-green-700"
                        >
                          {note}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">{t("perfumeDatabase.middleNotes")}</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedPerfume.middleNotes.map((note, index) => (
                        <Badge
                          key={index}
                          variant="outline"
                          className="text-xs bg-pink-50 border-pink-200 text-pink-700"
                        >
                          {note}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">{t("perfumeDatabase.baseNotes")}</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedPerfume.baseNotes.map((note, index) => (
                        <Badge
                          key={index}
                          variant="outline"
                          className="text-xs bg-amber-50 border-amber-200 text-amber-700"
                        >
                          {note}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Shop Button */}
              <div className="flex justify-center pt-4 border-t border-sage-100">
                <PerfumeShoppingModal
                  perfumeName={selectedPerfume.name}
                  perfumeBrand={selectedPerfume.brand}
                  triggerText={t("perfumeDatabase.shopThisPerfume")}
                  triggerClassName="w-full max-w-md"
                />
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
