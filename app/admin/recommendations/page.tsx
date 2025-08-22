"use client"

import { useState, useEffect } from "react"
import {
  Target,
  Search,
  ChevronDown,
  ChevronUp,
  Users,
  Calendar,
  Percent,
  Filter,
  Tag,
  User,
  Clock,
  Star,
  DollarSign,
  Loader2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface Recommendation {
  id: string
  user_id: string
  preferences: any
  recommendations: any[]
  created_at: string
  updated_at: string
}

interface Stats {
  totalRecommendations: number
  uniqueUsers: number
  averageMatchPercentage: string
}

export default function RecommendationsPage() {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([])
  const [stats, setStats] = useState<Stats | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [expandedRows, setExpandedRows] = useState<Record<string, boolean>>({})

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        setLoading(true)
        const response = await fetch("/api/admin/recommendations")

        if (!response.ok) {
          throw new Error(`Error fetching recommendations: ${response.statusText}`)
        }

        const data = await response.json()
        setRecommendations(data.recommendations)
        setStats(data.stats)
      } catch (err) {
        setError(err instanceof Error ? err.message : "حدث خطأ أثناء جلب البيانات")
        console.error("Error fetching recommendations:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchRecommendations()
  }, [])

  const toggleRowExpansion = (id: string) => {
    setExpandedRows((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("ar-SA", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date)
  }

  const filteredRecommendations = recommendations.filter(
    (rec) =>
      rec.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rec.user_id.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const getPreferencesSummary = (preferences: any) => {
    if (!preferences) return "لا توجد تفضيلات"

    const items = []

    if (preferences.gender) items.push(`الجنس: ${preferences.gender}`)
    if (preferences.strength) items.push(`القوة: ${preferences.strength}`)
    if (preferences.longevity) items.push(`الثبات: ${preferences.longevity}`)

    if (preferences.notes && preferences.notes.length > 0) {
      items.push(`النوتات: ${preferences.notes.slice(0, 2).join(", ")}${preferences.notes.length > 2 ? "..." : ""}`)
    }

    if (preferences.season && preferences.season.length > 0) {
      items.push(`المواسم: ${preferences.season.slice(0, 2).join(", ")}${preferences.season.length > 2 ? "..." : ""}`)
    }

    if (preferences.occasion && preferences.occasion.length > 0) {
      items.push(
        `المناسبات: ${preferences.occasion.slice(0, 2).join(", ")}${preferences.occasion.length > 2 ? "..." : ""}`,
      )
    }

    return items.join(" | ") || "لا توجد تفضيلات محددة"
  }

  return (
    <div className="p-3 sm:p-6 space-y-4 sm:space-y-6 rtl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
            <Target className="h-7 w-7 text-purple-600" />
            التوصيات
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">إدارة ومراقبة توصيات العطور للمستخدمين</p>
        </div>

        <div className="w-full sm:w-auto flex items-center gap-2">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-500" />
            <Input
              placeholder="بحث بمعرف المستخدم..."
              className="pl-8 w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      {stats && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-500">إجمالي التوصيات</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold">{stats.totalRecommendations}</div>
                <Target className="h-5 w-5 text-purple-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-500">المستخدمين المستفيدين</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold">{stats.uniqueUsers}</div>
                <Users className="h-5 w-5 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-500">متوسط نسبة التطابق</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold">{stats.averageMatchPercentage}%</div>
                <Percent className="h-5 w-5 text-green-500" />
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Recommendations Table */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]"></TableHead>
                <TableHead>معرف التوصية</TableHead>
                <TableHead>معرف المستخدم</TableHead>
                <TableHead className="hidden md:table-cell">تاريخ الإنشاء</TableHead>
                <TableHead className="hidden lg:table-cell">ملخص التفضيلات</TableHead>
                <TableHead className="text-center">عدد التوصيات</TableHead>
                <TableHead className="text-center hidden sm:table-cell">متوسط التطابق</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-10">
                    <div className="flex items-center justify-center">
                      <Loader2 className="h-6 w-6 animate-spin text-slate-400 mr-2" />
                      <span>جاري تحميل البيانات...</span>
                    </div>
                  </TableCell>
                </TableRow>
              ) : error ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-10 text-red-500">
                    {error}
                  </TableCell>
                </TableRow>
              ) : filteredRecommendations.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-10 text-slate-500">
                    لا توجد توصيات متطابقة مع البحث
                  </TableCell>
                </TableRow>
              ) : (
                filteredRecommendations.map((rec) => {
                  const isExpanded = expandedRows[rec.id] || false
                  const recommendationsCount = Array.isArray(rec.recommendations) ? rec.recommendations.length : 0

                  // Calculate average match percentage for this recommendation set
                  let avgMatch = 0
                  if (recommendationsCount > 0) {
                    const totalMatch = rec.recommendations.reduce((sum, item) => {
                      return sum + (item.matchPercentage ? Number.parseFloat(item.matchPercentage) : 0)
                    }, 0)
                    avgMatch = Math.round(totalMatch / recommendationsCount)
                  }

                  return (
                    <>
                      <TableRow key={rec.id} className="cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/50">
                        <TableCell className="p-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0"
                            onClick={() => toggleRowExpansion(rec.id)}
                          >
                            {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                          </Button>
                        </TableCell>
                        <TableCell className="font-mono text-xs">{rec.id.substring(0, 8)}...</TableCell>
                        <TableCell className="font-mono text-xs">{rec.user_id.substring(0, 8)}...</TableCell>
                        <TableCell className="hidden md:table-cell">{formatDate(rec.created_at)}</TableCell>
                        <TableCell className="hidden lg:table-cell max-w-[300px] truncate">
                          {getPreferencesSummary(rec.preferences)}
                        </TableCell>
                        <TableCell className="text-center">{recommendationsCount}</TableCell>
                        <TableCell className="text-center hidden sm:table-cell">
                          <Badge variant={avgMatch > 90 ? "success" : avgMatch > 80 ? "default" : "secondary"}>
                            {avgMatch}%
                          </Badge>
                        </TableCell>
                      </TableRow>

                      {isExpanded && (
                        <TableRow>
                          <TableCell colSpan={7} className="bg-slate-50 dark:bg-slate-800/50 p-4">
                            <div className="space-y-4">
                              {/* User Preferences */}
                              <div className="bg-white dark:bg-slate-900 rounded-lg p-4 shadow-sm border border-slate-200 dark:border-slate-700">
                                <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                                  <Filter className="h-5 w-5 text-purple-500" />
                                  تفضيلات المستخدم
                                </h3>

                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                  {rec.preferences?.gender && (
                                    <div className="flex items-center gap-2">
                                      <User className="h-4 w-4 text-slate-500" />
                                      <span className="text-sm font-medium">الجنس:</span>
                                      <span className="text-sm">{rec.preferences.gender}</span>
                                    </div>
                                  )}

                                  {rec.preferences?.strength && (
                                    <div className="flex items-center gap-2">
                                      <Target className="h-4 w-4 text-slate-500" />
                                      <span className="text-sm font-medium">القوة:</span>
                                      <span className="text-sm">{rec.preferences.strength}</span>
                                    </div>
                                  )}

                                  {rec.preferences?.longevity && (
                                    <div className="flex items-center gap-2">
                                      <Clock className="h-4 w-4 text-slate-500" />
                                      <span className="text-sm font-medium">الثبات:</span>
                                      <span className="text-sm">{rec.preferences.longevity}</span>
                                    </div>
                                  )}

                                  {rec.preferences?.priceRange && (
                                    <div className="flex items-center gap-2">
                                      <DollarSign className="h-4 w-4 text-slate-500" />
                                      <span className="text-sm font-medium">نطاق السعر:</span>
                                      <span className="text-sm">
                                        {rec.preferences.priceRange.min} - {rec.preferences.priceRange.max} ريال
                                      </span>
                                    </div>
                                  )}
                                </div>

                                {/* Notes, Seasons, Occasions */}
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                                  {rec.preferences?.notes && rec.preferences.notes.length > 0 && (
                                    <div>
                                      <h4 className="text-sm font-medium mb-2 flex items-center gap-1">
                                        <Tag className="h-3 w-3" /> النوتات المفضلة:
                                      </h4>
                                      <div className="flex flex-wrap gap-1">
                                        {rec.preferences.notes.map((note: string, i: number) => (
                                          <Badge key={i} variant="outline" className="text-xs">
                                            {note}
                                          </Badge>
                                        ))}
                                      </div>
                                    </div>
                                  )}

                                  {rec.preferences?.season && rec.preferences.season.length > 0 && (
                                    <div>
                                      <h4 className="text-sm font-medium mb-2 flex items-center gap-1">
                                        <Calendar className="h-3 w-3" /> المواسم المفضلة:
                                      </h4>
                                      <div className="flex flex-wrap gap-1">
                                        {rec.preferences.season.map((season: string, i: number) => (
                                          <Badge key={i} variant="outline" className="text-xs">
                                            {season}
                                          </Badge>
                                        ))}
                                      </div>
                                    </div>
                                  )}

                                  {rec.preferences?.occasion && rec.preferences.occasion.length > 0 && (
                                    <div>
                                      <h4 className="text-sm font-medium mb-2 flex items-center gap-1">
                                        <Calendar className="h-3 w-3" /> المناسبات المفضلة:
                                      </h4>
                                      <div className="flex flex-wrap gap-1">
                                        {rec.preferences.occasion.map((occasion: string, i: number) => (
                                          <Badge key={i} variant="outline" className="text-xs">
                                            {occasion}
                                          </Badge>
                                        ))}
                                      </div>
                                    </div>
                                  )}
                                </div>
                              </div>

                              {/* Recommendations */}
                              <div>
                                <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                                  <Target className="h-5 w-5 text-purple-500" />
                                  التوصيات ({recommendationsCount})
                                </h3>

                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                  {Array.isArray(rec.recommendations) &&
                                    rec.recommendations.map((item, index) => (
                                      <Dialog key={index}>
                                        <DialogTrigger asChild>
                                          <Card className="cursor-pointer hover:shadow-md transition-shadow">
                                            <CardContent className="p-4">
                                              <div className="flex items-start gap-3">
                                                <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-md flex items-center justify-center">
                                                  <Target className="h-8 w-8 text-slate-400" />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                  <h4 className="font-medium text-sm truncate">{item.name}</h4>
                                                  <p className="text-xs text-slate-500 truncate">{item.brand}</p>
                                                  <div className="flex items-center gap-1 mt-1">
                                                    <Badge variant="success" className="text-xs">
                                                      {item.matchPercentage}%
                                                    </Badge>
                                                    <div className="flex items-center text-xs text-amber-500">
                                                      <Star className="h-3 w-3 fill-amber-500 mr-1" />
                                                      {item.rating}
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                            </CardContent>
                                          </Card>
                                        </DialogTrigger>
                                        <DialogContent className="sm:max-w-[600px]">
                                          <DialogHeader>
                                            <DialogTitle className="text-xl flex items-center gap-2">
                                              {item.name}
                                              <Badge variant="success" className="mr-2">
                                                {item.matchPercentage}% تطابق
                                              </Badge>
                                            </DialogTitle>
                                          </DialogHeader>

                                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                                            <div>
                                              <div className="aspect-square bg-slate-100 dark:bg-slate-800 rounded-md flex items-center justify-center">
                                                <Target className="h-16 w-16 text-slate-400" />
                                              </div>
                                            </div>

                                            <div className="space-y-4">
                                              <div>
                                                <h4 className="text-sm font-medium text-slate-500">العلامة التجارية</h4>
                                                <p>{item.brand}</p>
                                              </div>

                                              <div>
                                                <h4 className="text-sm font-medium text-slate-500">السعر</h4>
                                                <p>{item.price}</p>
                                              </div>

                                              <div>
                                                <h4 className="text-sm font-medium text-slate-500">التقييم</h4>
                                                <div className="flex items-center">
                                                  <Star className="h-4 w-4 fill-amber-500 mr-1" />
                                                  <span>{item.rating}</span>
                                                  <span className="text-slate-400 text-sm mr-1">
                                                    ({item.reviews} تقييم)
                                                  </span>
                                                </div>
                                              </div>

                                              <div>
                                                <h4 className="text-sm font-medium text-slate-500">الجنس</h4>
                                                <p>{item.gender}</p>
                                              </div>
                                            </div>
                                          </div>

                                          <div className="mt-4">
                                            <h4 className="text-sm font-medium text-slate-500 mb-2">النوتات</h4>
                                            <div className="flex flex-wrap gap-1">
                                              {item.notes &&
                                                item.notes.map((note: string, i: number) => (
                                                  <Badge key={i} variant="outline">
                                                    {note}
                                                  </Badge>
                                                ))}
                                            </div>
                                          </div>

                                          <div className="mt-4">
                                            <h4 className="text-sm font-medium text-slate-500 mb-2">الوصف</h4>
                                            <p className="text-sm">{item.description}</p>
                                          </div>

                                          <div className="grid grid-cols-2 gap-4 mt-4">
                                            <div>
                                              <h4 className="text-sm font-medium text-slate-500 mb-2">المواسم</h4>
                                              <div className="flex flex-wrap gap-1">
                                                {item.season &&
                                                  item.season.map((season: string, i: number) => (
                                                    <Badge key={i} variant="outline">
                                                      {season}
                                                    </Badge>
                                                  ))}
                                              </div>
                                            </div>

                                            <div>
                                              <h4 className="text-sm font-medium text-slate-500 mb-2">المناسبات</h4>
                                              <div className="flex flex-wrap gap-1">
                                                {item.occasion &&
                                                  item.occasion.map((occasion: string, i: number) => (
                                                    <Badge key={i} variant="outline">
                                                      {occasion}
                                                    </Badge>
                                                  ))}
                                              </div>
                                            </div>
                                          </div>

                                          <div className="grid grid-cols-3 gap-4 mt-4">
                                            <div>
                                              <h4 className="text-sm font-medium text-slate-500">القوة</h4>
                                              <p>{item.strength}</p>
                                            </div>

                                            <div>
                                              <h4 className="text-sm font-medium text-slate-500">الثبات</h4>
                                              <p>{item.longevity}</p>
                                            </div>

                                            <div>
                                              <h4 className="text-sm font-medium text-slate-500">التوفر</h4>
                                              <p>{item.availability}</p>
                                            </div>
                                          </div>
                                        </DialogContent>
                                      </Dialog>
                                    ))}
                                </div>
                              </div>
                            </div>
                          </TableCell>
                        </TableRow>
                      )}
                    </>
                  )
                })
              )}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  )
}
