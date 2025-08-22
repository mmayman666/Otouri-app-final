import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Users,
  ShoppingBag,
  TrendingUp,
  DollarSign,
  Activity,
  UserPlus,
  MessageSquare,
  Star,
  ArrowUpRight,
} from "lucide-react"

export default function AdminDashboardPage() {
  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-gray-900">لوحة التحكم</h1>
          <p className="text-gray-600 mt-2 text-lg">مرحباً بك في لوحة إدارة عُطوري</p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="secondary" className="bg-green-100 text-green-800 px-3 py-1">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
            متصل
          </Badge>
          <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
            تقرير جديد
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-blue-100 hover:shadow-xl transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-600 mb-1">إجمالي المستخدمين</p>
                <p className="text-3xl font-bold text-blue-900">1,234</p>
                <div className="flex items-center mt-2">
                  <ArrowUpRight className="h-4 w-4 text-green-600 mr-1" />
                  <p className="text-sm text-green-600 font-medium">+12% من الشهر الماضي</p>
                </div>
              </div>
              <div className="p-4 bg-blue-600 rounded-2xl shadow-lg">
                <Users className="h-8 w-8 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-green-50 to-green-100 hover:shadow-xl transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-600 mb-1">الطلبات اليوم</p>
                <p className="text-3xl font-bold text-green-900">89</p>
                <div className="flex items-center mt-2">
                  <ArrowUpRight className="h-4 w-4 text-green-600 mr-1" />
                  <p className="text-sm text-green-600 font-medium">+5% من أمس</p>
                </div>
              </div>
              <div className="p-4 bg-green-600 rounded-2xl shadow-lg">
                <ShoppingBag className="h-8 w-8 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-yellow-50 to-yellow-100 hover:shadow-xl transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-yellow-600 mb-1">الإيرادات</p>
                <p className="text-3xl font-bold text-yellow-900">$12,345</p>
                <div className="flex items-center mt-2">
                  <ArrowUpRight className="h-4 w-4 text-green-600 mr-1" />
                  <p className="text-sm text-green-600 font-medium">+8% من الشهر الماضي</p>
                </div>
              </div>
              <div className="p-4 bg-yellow-600 rounded-2xl shadow-lg">
                <DollarSign className="h-8 w-8 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-50 to-purple-100 hover:shadow-xl transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-600 mb-1">معدل النمو</p>
                <p className="text-3xl font-bold text-purple-900">23%</p>
                <div className="flex items-center mt-2">
                  <ArrowUpRight className="h-4 w-4 text-green-600 mr-1" />
                  <p className="text-sm text-green-600 font-medium">+2% من الشهر الماضي</p>
                </div>
              </div>
              <div className="p-4 bg-purple-600 rounded-2xl shadow-lg">
                <TrendingUp className="h-8 w-8 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Quick Actions */}
        <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-3 text-xl">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Activity className="h-6 w-6 text-blue-600" />
              </div>
              إجراءات سريعة
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button
              className="w-full justify-start h-12 bg-white border-2 border-gray-200 text-gray-700 hover:border-blue-500 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200"
              variant="outline"
            >
              <UserPlus className="h-5 w-5 ml-3" />
              إضافة مستخدم جديد
            </Button>
            <Button
              className="w-full justify-start h-12 bg-white border-2 border-gray-200 text-gray-700 hover:border-green-500 hover:text-green-600 hover:bg-green-50 transition-all duration-200"
              variant="outline"
            >
              <ShoppingBag className="h-5 w-5 ml-3" />
              عرض الطلبات الجديدة
            </Button>
            <Button
              className="w-full justify-start h-12 bg-white border-2 border-gray-200 text-gray-700 hover:border-purple-500 hover:text-purple-600 hover:bg-purple-50 transition-all duration-200"
              variant="outline"
            >
              <MessageSquare className="h-5 w-5 ml-3" />
              الرد على الرسائل
            </Button>
            <Button
              className="w-full justify-start h-12 bg-white border-2 border-gray-200 text-gray-700 hover:border-yellow-500 hover:text-yellow-600 hover:bg-yellow-50 transition-all duration-200"
              variant="outline"
            >
              <Star className="h-5 w-5 ml-3" />
              مراجعة التقييمات
            </Button>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-3 text-xl">
              <div className="p-2 bg-green-100 rounded-lg">
                <Activity className="h-6 w-6 text-green-600" />
              </div>
              النشاط الأخير
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-xl border border-green-200">
                <div className="w-3 h-3 bg-green-500 rounded-full shadow-lg"></div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-green-800">مستخدم جديد انضم</p>
                  <p className="text-xs text-green-600">منذ 5 دقائق</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl border border-blue-200">
                <div className="w-3 h-3 bg-blue-500 rounded-full shadow-lg"></div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-blue-800">طلب جديد تم استلامه</p>
                  <p className="text-xs text-blue-600">منذ 12 دقيقة</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-xl border border-yellow-200">
                <div className="w-3 h-3 bg-yellow-500 rounded-full shadow-lg"></div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-yellow-800">تقييم جديد تم إضافته</p>
                  <p className="text-xs text-yellow-600">منذ 25 دقيقة</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-purple-50 to-purple-100 rounded-xl border border-purple-200">
                <div className="w-3 h-3 bg-purple-500 rounded-full shadow-lg"></div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-purple-800">اشتراك جديد تم تفعيله</p>
                  <p className="text-xs text-purple-600">منذ 45 دقيقة</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
