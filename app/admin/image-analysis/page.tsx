"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ImageIcon, Users, CheckCircle, XCircle, Search, Eye } from "lucide-react"
import Image from "next/image"

interface ImageAnalysis {
  id: string
  user_id: string
  image_url: string
  analysis_results: any
  created_at: string
  updated_at: string
}

interface AnalysisStats {
  total: number
  uniqueUsers: number
  successful: number
  failed: number
}

export default function AdminImageAnalysisPage() {
  const [imageHistory, setImageHistory] = useState<ImageAnalysis[]>([])
  const [stats, setStats] = useState<AnalysisStats>({
    total: 0,
    uniqueUsers: 0,
    successful: 0,
    failed: 0,
  })
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedAnalysis, setSelectedAnalysis] = useState<ImageAnalysis | null>(null)

  useEffect(() => {
    fetchImageHistory()
  }, [])

  const fetchImageHistory = async () => {
    try {
      const response = await fetch("/api/admin/image-analysis")
      const data = await response.json()

      if (response.ok) {
        setImageHistory(data.imageHistory)
        setStats(data.stats)
      } else {
        console.error("Error fetching image history:", data.error)
      }
    } catch (error) {
      console.error("Error fetching image history:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const filteredHistory = imageHistory.filter((item) => {
    const searchLower = searchTerm.toLowerCase()
    return (
      item.user_id.toLowerCase().includes(searchLower) ||
      item.id.toLowerCase().includes(searchLower) ||
      (item.analysis_results && JSON.stringify(item.analysis_results).toLowerCase().includes(searchLower))
    )
  })

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("ar-SA", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const getAnalysisResults = (results: any) => {
    try {
      return typeof results === "string" ? JSON.parse(results) : results
    } catch {
      return null
    }
  }

  const getConfidenceBadge = (results: any) => {
    const analysisData = getAnalysisResults(results)
    if (!analysisData || !analysisData.confidence) {
      return <Badge variant="destructive">فشل</Badge>
    }

    const confidence = analysisData.confidence
    if (confidence >= 80) {
      return <Badge variant="default">عالي ({confidence}%)</Badge>
    } else if (confidence >= 50) {
      return <Badge variant="secondary">متوسط ({confidence}%)</Badge>
    } else {
      return <Badge variant="destructive">منخفض ({confidence}%)</Badge>
    }
  }

  const AnalysisDetailsModal = ({ analysis }: { analysis: ImageAnalysis }) => {
    const results = getAnalysisResults(analysis.analysis_results)

    if (!results) {
      return <div className="text-center py-8 text-red-500">فشل في تحليل البيانات</div>
    }

    return (
      <div className="space-y-6 max-h-[70vh] overflow-y-auto">
        {/* Image */}
        <div className="flex justify-center">
          <div className="relative w-48 h-48 rounded-lg overflow-hidden border">
            <Image
              src={analysis.image_url || "/placeholder.svg"}
              alt="صورة العطر"
              fill
              className="object-cover"
              onError={(e) => {
                e.currentTarget.src = "/placeholder.svg?height=200&width=200&text=صورة غير متوفرة"
              }}
            />
          </div>
        </div>

        {/* Basic Info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <h4 className="font-semibold text-gray-700">اسم العطر</h4>
            <p className="text-lg">{results.perfumeName || "غير محدد"}</p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-700">العلامة التجارية</h4>
            <p className="text-lg">{results.brand || "غير محدد"}</p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-700">النوع</h4>
            <p className="text-lg">{results.type || "غير محدد"}</p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-700">الجنس</h4>
            <p className="text-lg">{results.gender || "غير محدد"}</p>
          </div>
        </div>

        {/* Description */}
        {results.description && (
          <div>
            <h4 className="font-semibold text-gray-700 mb-2">الوصف</h4>
            <p className="text-gray-600 leading-relaxed">{results.description}</p>
          </div>
        )}

        {/* Notes */}
        {results.notes && results.notes.length > 0 && (
          <div>
            <h4 className="font-semibold text-gray-700 mb-2">النوتات العطرية</h4>
            <div className="flex flex-wrap gap-2">
              {results.notes.map((note: string, index: number) => (
                <Badge key={index} variant="outline">
                  {note}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Performance */}
        <div className="grid grid-cols-2 gap-4">
          {results.longevity && (
            <div>
              <h4 className="font-semibold text-gray-700">الثبات</h4>
              <p>{results.longevity}</p>
            </div>
          )}
          {results.sillage && (
            <div>
              <h4 className="font-semibold text-gray-700">الإشعاع</h4>
              <p>{results.sillage}</p>
            </div>
          )}
        </div>

        {/* Price */}
        {results.price_range && (
          <div>
            <h4 className="font-semibold text-gray-700">النطاق السعري</h4>
            <p className="text-lg font-medium text-green-600">{results.price_range}</p>
          </div>
        )}

        {/* Occasions */}
        {results.occasions && results.occasions.length > 0 && (
          <div>
            <h4 className="font-semibold text-gray-700 mb-2">المناسبات</h4>
            <div className="flex flex-wrap gap-2">
              {results.occasions.map((occasion: string, index: number) => (
                <Badge key={index} variant="secondary">
                  {occasion}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Similar Perfumes */}
        {results.similar && results.similar.length > 0 && (
          <div>
            <h4 className="font-semibold text-gray-700 mb-3">عطور مشابهة</h4>
            <div className="grid grid-cols-1 gap-3 max-h-48 overflow-y-auto">
              {results.similar.map((similar: any, index: number) => (
                <div key={index} className="flex items-center gap-3 p-3 border rounded-lg">
                  <div className="w-12 h-12 bg-gray-100 rounded flex items-center justify-center">
                    <ImageIcon className="w-6 h-6 text-gray-400" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{similar.name}</p>
                    <p className="text-sm text-gray-600">{similar.brand}</p>
                    {similar.price && <p className="text-sm text-green-600">{similar.price}</p>}
                  </div>
                  {similar.similarity && <Badge variant="outline">{similar.similarity}</Badge>}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Technical Info */}
        <div className="border-t pt-4 text-sm text-gray-500">
          <div className="grid grid-cols-2 gap-2">
            <div>معرف التحليل: {analysis.id.substring(0, 8)}...</div>
            <div>معرف المستخدم: {analysis.user_id.substring(0, 8)}...</div>
            <div>تاريخ التحليل: {formatDate(analysis.created_at)}</div>
            <div>مستوى الثقة: {results.confidence}%</div>
          </div>
        </div>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-3 sm:p-6">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-3 sm:p-6">
      <div className="max-w-7xl mx-auto space-y-4 sm:space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">تحليلات الصور</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">عرض جميع تحليلات صور العطور في النظام</p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">إجمالي التحليلات</CardTitle>
              <ImageIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.total}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">المستخدمين الفريدين</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{stats.uniqueUsers}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">التحليلات الناجحة</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{stats.successful}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">التحليلات الفاشلة</CardTitle>
              <XCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{stats.failed}</div>
            </CardContent>
          </Card>
        </div>

        {/* Search */}
        <Card>
          <CardHeader>
            <CardTitle>البحث والتصفية</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="البحث بمعرف المستخدم أو معرف التحليل..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        {/* Analysis History Table */}
        <Card>
          <CardHeader>
            <CardTitle>سجل تحليلات الصور</CardTitle>
            <CardDescription>
              عرض جميع تحليلات الصور في قاعدة البيانات ({filteredHistory.length} من {imageHistory.length})
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto -mx-3 sm:mx-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>الصورة</TableHead>
                    <TableHead>معرف التحليل</TableHead>
                    <TableHead>معرف المستخدم</TableHead>
                    <TableHead>اسم العطر</TableHead>
                    <TableHead>العلامة التجارية</TableHead>
                    <TableHead>مستوى الثقة</TableHead>
                    <TableHead>تاريخ التحليل</TableHead>
                    <TableHead>الإجراءات</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredHistory.map((analysis) => {
                    const results = getAnalysisResults(analysis.analysis_results)
                    return (
                      <TableRow key={analysis.id}>
                        <TableCell>
                          <div className="relative w-16 h-16 rounded overflow-hidden border">
                            <Image
                              src={analysis.image_url || "/placeholder.svg"}
                              alt="صورة العطر"
                              fill
                              className="object-cover"
                              onError={(e) => {
                                e.currentTarget.src = "/placeholder.svg?height=64&width=64&text=صورة"
                              }}
                            />
                          </div>
                        </TableCell>
                        <TableCell>
                          <code className="text-xs bg-gray-100 px-2 py-1 rounded">
                            {analysis.id.substring(0, 8)}...
                          </code>
                        </TableCell>
                        <TableCell>
                          <code className="text-xs bg-gray-100 px-2 py-1 rounded">
                            {analysis.user_id.substring(0, 8)}...
                          </code>
                        </TableCell>
                        <TableCell>{results?.perfumeName || "غير محدد"}</TableCell>
                        <TableCell>{results?.brand || "غير محدد"}</TableCell>
                        <TableCell>{getConfidenceBadge(analysis.analysis_results)}</TableCell>
                        <TableCell>{formatDate(analysis.created_at)}</TableCell>
                        <TableCell>
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="outline" size="sm">
                                <Eye className="w-4 h-4 sm:mr-1" />{" "}
                                <span className="hidden sm:inline">عرض التفاصيل</span>
                                <span className="sm:hidden">عرض</span>
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto mx-4 sm:mx-auto">
                              <DialogHeader>
                                <DialogTitle>تفاصيل تحليل العطر</DialogTitle>
                                <DialogDescription>عرض تفاصيل كاملة لتحليل الصورة</DialogDescription>
                              </DialogHeader>
                              <AnalysisDetailsModal analysis={analysis} />
                            </DialogContent>
                          </Dialog>
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>

              {filteredHistory.length === 0 && (
                <div className="text-center py-8 text-gray-500">لا توجد تحليلات تطابق معايير البحث</div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
