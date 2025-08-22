"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/utils/supabase/client"
import { User, UserIcon, Lock, Mail, Save, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"
import ProtectedRoute from "@/components/auth/protected-route"
import { useTranslation } from "@/lib/translations/hooks"

export default function SettingsPage() {
  const router = useRouter()
  const supabase = createClient()
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState<any>(null)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const { t } = useTranslation()

  // Fetch user data on component mount
  useEffect(() => {
    async function getUser() {
      setLoading(true)
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser()

        console.log("Auth user:", user) // Debug log

        if (user) {
          setUser(user)
          setEmail(user.email || "")

          // Get user profile from profiles table
          const { data: profile, error } = await supabase.from("profiles").select("*").eq("id", user.id).single()

          console.log("Profile data:", profile) // Debug log
          console.log("Profile error:", error) // Debug log

          if (profile) {
            setName(profile.full_name || "")
          } else {
            // Use metadata if no profile
            setName(user.user_metadata?.name || "")
          }
        }
      } catch (error) {
        console.error("Error fetching user:", error)
        toast({
          title: t("common.error"),
          description: t("settings.errorLoadingUser"),
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    getUser()
  }, [supabase, t])

  const updateProfile = async () => {
    setLoading(true)
    try {
      // Check if profiles table exists
      const { count } = await supabase.from("profiles").select("*", { count: "exact", head: true })

      if (count !== null) {
        // Update profile in profiles table
        const { error } = await supabase.from("profiles").upsert({
          id: user.id,
          full_name: name,
          updated_at: new Date().toISOString(),
        })

        if (error) throw error
      }

      // Update user metadata
      const { error } = await supabase.auth.updateUser({
        data: { name },
      })

      if (error) throw error

      toast({
        title: t("settings.updated"),
        description: t("settings.profileUpdated"),
      })

      router.refresh()
    } catch (error: any) {
      console.error("Error updating profile:", error)
      toast({
        title: t("common.error"),
        description: error.message || t("settings.errorUpdatingProfile"),
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const changePassword = async () => {
    if (newPassword !== confirmPassword) {
      toast({
        title: t("common.error"),
        description: t("settings.passwordMismatch"),
        variant: "destructive",
      })
      return
    }

    setLoading(true)
    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      })

      if (error) throw error

      setCurrentPassword("")
      setNewPassword("")
      setConfirmPassword("")

      toast({
        title: t("settings.updated"),
        description: t("settings.passwordChanged"),
      })
    } catch (error: any) {
      console.error("Error changing password:", error)
      toast({
        title: t("common.error"),
        description: error.message || t("settings.errorChangingPassword"),
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <ProtectedRoute>
      <div className="container mx-auto py-6 px-4 md:px-6 rtl text-right" dir="rtl">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">{t("settings.title")}</h1>
          <p className="text-gray-500 mt-1">{t("settings.subtitle")}</p>
        </div>

        <Tabs defaultValue="profile" dir="rtl" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <UserIcon className="h-4 w-4" />
              <span>{t("settings.profile")}</span>
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center gap-2">
              <Lock className="h-4 w-4" />
              <span>{t("settings.security")}</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="mt-6">
            <Card className="p-6">
              <CardHeader className="pb-4">
                <CardTitle>{t("settings.profileTitle")}</CardTitle>
                <CardDescription>{t("settings.profileDescription")}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6 px-6">
                <div className="space-y-2">
                  <Label htmlFor="name">{t("settings.name")}</Label>
                  <div className="flex flex-row-reverse items-center border rounded-md focus-within:ring-1 focus-within:ring-mint-500">
                    <div className="px-3 py-2 text-gray-400">
                      <User className="h-5 w-5" />
                    </div>
                    <Input
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="border-0 focus-visible:ring-0"
                      placeholder={t("settings.enterFullName")}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">{t("settings.email")}</Label>
                  <div className="flex flex-row-reverse items-center border rounded-md focus-within:ring-1 focus-within:ring-mint-500">
                    <div className="px-3 py-2 text-gray-400">
                      <Mail className="h-5 w-5" />
                    </div>
                    <Input
                      id="email"
                      value={email}
                      disabled
                      className="border-0 focus-visible:ring-0 bg-gray-50"
                      placeholder={t("settings.enterEmail")}
                    />
                  </div>
                  <p className="text-sm text-gray-500">{t("settings.cannotChangeEmail")}</p>
                </div>
              </CardContent>
              <CardFooter className="pt-6 px-6">
                <Button onClick={updateProfile} disabled={loading} className="bg-mint-500 hover:bg-mint-600 text-white">
                  {loading ? (
                    <>
                      <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                      {t("settings.saving")}
                    </>
                  ) : (
                    <>
                      <Save className="ml-2 h-4 w-4" />
                      {t("settings.saveChanges")}
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="security" className="mt-6">
            <Card className="p-6">
              <CardHeader className="pb-4">
                <CardTitle>{t("settings.securityTitle")}</CardTitle>
                <CardDescription>{t("settings.securityDescription")}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6 px-6">
                <div className="space-y-2">
                  <Label htmlFor="current-password">{t("settings.currentPassword")}</Label>
                  <div className="flex flex-row-reverse items-center border rounded-md focus-within:ring-1 focus-within:ring-mint-500">
                    <div className="px-3 py-2 text-gray-400">
                      <Lock className="h-5 w-5" />
                    </div>
                    <Input
                      id="current-password"
                      type="password"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      className="border-0 focus-visible:ring-0"
                      placeholder={t("settings.enterCurrentPassword")}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="new-password">{t("settings.newPassword")}</Label>
                  <div className="flex flex-row-reverse items-center border rounded-md focus-within:ring-1 focus-within:ring-mint-500">
                    <div className="px-3 py-2 text-gray-400">
                      <Lock className="h-5 w-5" />
                    </div>
                    <Input
                      id="new-password"
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="border-0 focus-visible:ring-0"
                      placeholder={t("settings.enterNewPassword")}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirm-password">{t("settings.confirmPassword")}</Label>
                  <div className="flex flex-row-reverse items-center border rounded-md focus-within:ring-1 focus-within:ring-mint-500">
                    <div className="px-3 py-2 text-gray-400">
                      <Lock className="h-5 w-5" />
                    </div>
                    <Input
                      id="confirm-password"
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="border-0 focus-visible:ring-0"
                      placeholder={t("settings.confirmNewPassword")}
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="pt-6 px-6">
                <Button
                  onClick={changePassword}
                  disabled={loading || !newPassword || !confirmPassword}
                  className="bg-mint-500 hover:bg-mint-600 text-white"
                >
                  {loading ? (
                    <>
                      <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                      {t("settings.updating")}
                    </>
                  ) : (
                    <>
                      <Lock className="ml-2 h-4 w-4" />
                      {t("settings.changePassword")}
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>

        <Toaster />
      </div>
    </ProtectedRoute>
  )
}
