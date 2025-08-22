"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Users, Crown, UserCheck, TrendingUp, Search } from "lucide-react"

interface Subscription {
  id: string
  user_id: string
  stripe_customer_id: string | null
  stripe_subscription_id: string | null
  stripe_price_id: string | null
  status: string
  plan_type: string
  current_period_start: string | null
  current_period_end: string | null
  cancel_at_period_end: boolean
  created_at: string
  updated_at: string
}

interface SubscriptionStats {
  total: number
  active: number
  premium: number
  free: number
}

export default function AdminSubscriptionsPage() {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([])
  const [stats, setStats] = useState<SubscriptionStats>({
    total: 0,
    active: 0,
    premium: 0,
    free: 0,
  })
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [planFilter, setPlanFilter] = useState("all")

  useEffect(() => {
    fetchSubscriptions()
  }, [])

  const fetchSubscriptions = async () => {
    try {
      const response = await fetch("/api/admin/subscriptions")
      const data = await response.json()

      if (response.ok) {
        setSubscriptions(data.subscriptions)
        setStats(data.stats)
      } else {
        console.error("Error fetching subscriptions:", data.error)
      }
    } catch (error) {
      console.error("Error fetching subscriptions:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const filteredSubscriptions = subscriptions.filter((subscription) => {
    const matchesSearch =
      subscription.user_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      subscription.stripe_customer_id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      subscription.stripe_subscription_id?.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || subscription.status === statusFilter
    const matchesPlan = planFilter === "all" || subscription.plan_type === planFilter

    return matchesSearch && matchesStatus && matchesPlan
  })

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "غير محدد"
    return new Date(dateString).toLocaleDateString("ar-SA", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      active: { label: "نشط", variant: "default" as const },
      canceled: { label: "ملغي", variant: "destructive" as const },
      past_due: { label: "متأخر", variant: "secondary" as const },
      incomplete: { label: "غير مكتمل", variant: "outline" as const },
    }

    const config = statusConfig[status as keyof typeof statusConfig] || { label: status, variant: "outline" as const }
    return <Badge variant={config.variant}>{config.label}</Badge>
  }

  const getPlanBadge = (planType: string) => {
    const planConfig = {
      free: { label: "مجاني", variant: "secondary" as const },
      premium: { label: "مميز", variant: "default" as const },
    }

    const config = planConfig[planType as keyof typeof planConfig] || { label: planType, variant: "outline" as const }
    return <Badge variant={config.variant}>{config.label}</Badge>
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
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
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">جميع الاشتراكات</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">عرض جميع بيانات الاشتراكات في النظام</p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">إجمالي الاشتراكات</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.total}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">الاشتراكات النشطة</CardTitle>
              <UserCheck className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{stats.active}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">الاشتراكات المميزة</CardTitle>
              <Crown className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">{stats.premium}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">الاشتراكات المجانية</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{stats.free}</div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardHeader>
            <CardTitle>البحث والتصفية</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <div className="flex-1 w-full">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="البحث بمعرف المستخدم أو Stripe..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full sm:w-auto px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">جميع الحالات</option>
                <option value="active">نشط</option>
                <option value="canceled">ملغي</option>
                <option value="past_due">متأخر</option>
              </select>

              <select
                value={planFilter}
                onChange={(e) => setPlanFilter(e.target.value)}
                className="w-full sm:w-auto px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">جميع الخطط</option>
                <option value="free">مجاني</option>
                <option value="premium">مميز</option>
              </select>
            </div>
          </CardContent>
        </Card>

        {/* Subscriptions Table */}
        <Card>
          <CardHeader>
            <CardTitle>جميع بيانات الاشتراكات</CardTitle>
            <CardDescription>
              عرض جميع الاشتراكات في قاعدة البيانات ({filteredSubscriptions.length} من {subscriptions.length})
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto -mx-3 sm:mx-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>معرف الاشتراك</TableHead>
                    <TableHead>معرف المستخدم</TableHead>
                    <TableHead>نوع الخطة</TableHead>
                    <TableHead>الحالة</TableHead>
                    <TableHead>معرف عميل Stripe</TableHead>
                    <TableHead>معرف اشتراك Stripe</TableHead>
                    <TableHead className="hidden sm:table-cell">معرف السعر</TableHead>
                    <TableHead>تاريخ البداية</TableHead>
                    <TableHead>تاريخ النهاية</TableHead>
                    <TableHead>إلغاء في نهاية الفترة</TableHead>
                    <TableHead>تاريخ الإنشاء</TableHead>
                    <TableHead className="hidden sm:table-cell">تاريخ التحديث</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredSubscriptions.map((subscription) => (
                    <TableRow key={subscription.id}>
                      <TableCell>
                        <code className="text-xs bg-gray-100 px-2 py-1 rounded">
                          {subscription.id.substring(0, 8)}...
                        </code>
                      </TableCell>
                      <TableCell>
                        <code className="text-xs bg-gray-100 px-2 py-1 rounded">
                          {subscription.user_id.substring(0, 8)}...
                        </code>
                      </TableCell>
                      <TableCell>{getPlanBadge(subscription.plan_type)}</TableCell>
                      <TableCell>{getStatusBadge(subscription.status)}</TableCell>
                      <TableCell>
                        <code className="text-xs bg-gray-100 px-2 py-1 rounded">
                          {subscription.stripe_customer_id || "غير متوفر"}
                        </code>
                      </TableCell>
                      <TableCell>
                        <code className="text-xs bg-gray-100 px-2 py-1 rounded">
                          {subscription.stripe_subscription_id || "غير متوفر"}
                        </code>
                      </TableCell>
                      <TableCell className="hidden sm:table-cell">
                        <code className="text-xs bg-gray-100 px-2 py-1 rounded">
                          {subscription.stripe_price_id || "غير متوفر"}
                        </code>
                      </TableCell>
                      <TableCell>{formatDate(subscription.current_period_start)}</TableCell>
                      <TableCell>{formatDate(subscription.current_period_end)}</TableCell>
                      <TableCell>
                        <Badge variant={subscription.cancel_at_period_end ? "destructive" : "secondary"}>
                          {subscription.cancel_at_period_end ? "نعم" : "لا"}
                        </Badge>
                      </TableCell>
                      <TableCell>{formatDate(subscription.created_at)}</TableCell>
                      <TableCell className="hidden sm:table-cell">{formatDate(subscription.updated_at)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              {filteredSubscriptions.length === 0 && (
                <div className="text-center py-8 text-gray-500">لا توجد اشتراكات تطابق معايير البحث</div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
