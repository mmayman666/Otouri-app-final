import { checkAdminAccess } from "@/app/admin/middleware"
import { createAdminClient } from "@/utils/supabase/admin"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Users, Shield, User, Calendar } from "lucide-react"

export default async function UsersPage() {
  await checkAdminAccess()

  // Use admin client to get all users
  const adminClient = createAdminClient()
  const { data: users, error } = await adminClient
    .from("profiles")
    .select("*")
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching users:", error)
  }

  const totalUsers = users?.length || 0
  const adminUsers = users?.filter((user) => user.is_admin === true).length || 0
  const regularUsers = totalUsers - adminUsers

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-3 sm:p-6">
      <div className="max-w-7xl mx-auto space-y-4 sm:space-y-6">
        <div className="mb-4 sm:mb-6">
          <h1 className="text-3xl font-bold text-gray-900">إدارة المستخدمين</h1>
          <p className="text-gray-600 mt-2">عرض وإدارة جميع مستخدمي المنصة</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">إجمالي المستخدمين</p>
                  <p className="text-3xl font-bold text-gray-900">{totalUsers}</p>
                </div>
                <Users className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">المديرين</p>
                  <p className="text-3xl font-bold text-green-600">{adminUsers}</p>
                </div>
                <Shield className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">المستخدمين العاديين</p>
                  <p className="text-3xl font-bold text-gray-600">{regularUsers}</p>
                </div>
                <User className="h-8 w-8 text-gray-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Users List */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              قائمة المستخدمين
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 sm:space-y-4">
              {users?.map((user) => (
                <div
                  key={user.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between p-3 sm:p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors gap-3 sm:gap-4"
                >
                  <div className="flex items-center gap-3 sm:gap-4">
                    <Avatar>
                      <AvatarImage src={user.avatar_url || "/placeholder.svg"} />
                      <AvatarFallback>{user.full_name?.charAt(0) || "U"}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-medium text-gray-900">{user.full_name || "مستخدم غير محدد"}</h3>
                      <p className="text-sm text-gray-500">ID: {user.id.slice(0, 8)}...</p>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Calendar className="h-4 w-4" />
                      {new Date(user.created_at).toLocaleDateString("ar-SA")}
                    </div>
                    <Badge variant={user.is_admin ? "default" : "secondary"}>{user.is_admin ? "مدير" : "مستخدم"}</Badge>
                  </div>
                </div>
              ))}
            </div>

            {!users ||
              (users.length === 0 && (
                <div className="text-center py-8 text-gray-500">لا توجد مستخدمين مسجلين حالياً</div>
              ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
