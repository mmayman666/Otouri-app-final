"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Check,
  Crown,
  Sparkles,
  Search,
  ImageIcon,
  Database,
  Heart,
  Bot,
  Zap,
  CreditCard,
  Settings,
  Loader2,
  Calendar,
  TrendingUp,
} from "lucide-react"
import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import { createCheckoutSession, createPortalSession, getUserSubscription } from "./actions"
import { useToast } from "@/hooks/use-toast"
import { useTranslation } from "@/lib/translations/hooks"

interface SubscriptionData {
  subscription: {
    id: string
    plan_type: string
    status: string
    current_period_end: string
    cancel_at_period_end: boolean
  } | null
  credits: {
    credits_used: number
    credits_limit: number
    reset_date: string
  } | null
}

export default function SubscriptionPage() {
  const [subscriptionData, setSubscriptionData] = useState<SubscriptionData | null>(null)
  const [loading, setLoading] = useState(true)
  const [actionLoading, setActionLoading] = useState<string | null>(null)
  const { toast } = useToast()
  const { t } = useTranslation()

  useEffect(() => {
    loadSubscriptionData()
  }, [])

  const loadSubscriptionData = async () => {
    try {
      const data = await getUserSubscription()
      setSubscriptionData(data)
    } catch (error) {
      console.error("Error loading subscription data:", error)
      toast({
        title: t("common.error"),
        description: t("subscription.errorLoadingSubscription"),
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleUpgrade = async () => {
    setActionLoading("upgrade")
    try {
      await createCheckoutSession()
    } catch (error) {
      console.error("Error creating checkout session:", error)
      toast({
        title: t("common.error"),
        description: t("subscription.errorCreatingCheckout"),
        variant: "destructive",
      })
    } finally {
      setActionLoading(null)
    }
  }

  const handleManageSubscription = async () => {
    setActionLoading("manage")
    try {
      await createPortalSession()
    } catch (error) {
      console.error("Error creating portal session:", error)
      toast({
        title: t("common.error"),
        description: t("subscription.errorOpeningPortal"),
        variant: "destructive",
      })
    } finally {
      setActionLoading(null)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]" dir="rtl">
        <Loader2 className="h-8 w-8 animate-spin text-mint-600" />
      </div>
    )
  }

  const currentPlan = subscriptionData?.subscription?.plan_type || "free"
  const isActive = subscriptionData?.subscription?.status === "active"
  const credits = subscriptionData?.credits
  const subscription = subscriptionData?.subscription

  const plans = [
    {
      id: "free",
      name: t("subscription.freePlan"),
      price: "0",
      period: "",
      description: t("subscription.startJourney"),
      features: [
        { name: t("subscription.textSearch"), included: true, icon: Search },
        { name: t("subscription.imageSearch"), included: true, icon: ImageIcon },
        { name: t("subscription.customRecommendations"), included: true, icon: Sparkles },
        { name: t("subscription.otouriAI"), included: true, icon: Bot },
        { name: t("subscription.perfumeDatabase"), included: true, icon: Database },
        { name: t("subscription.saveFavorites"), included: true, icon: Heart },
      ],
      limitations: [t("subscription.monthlyOperations")],
      buttonText: currentPlan === "free" ? t("subscription.currentPlanText") : t("subscription.downgradeToFree"),
      buttonVariant: currentPlan === "free" ? "outline" : "destructive",
      popular: false,
      current: currentPlan === "free",
    },
    {
      id: "premium",
      name: t("subscription.premiumPlan"),
      price: "20",
      period: t("subscription.perMonth"),
      description: t("subscription.enjoyComplete"),
      features: [
        { name: t("subscription.textSearch"), included: true, icon: Search },
        { name: t("subscription.imageSearch"), included: true, icon: ImageIcon },
        { name: t("subscription.customRecommendations"), included: true, icon: Sparkles },
        { name: t("subscription.otouriAI"), included: true, icon: Bot },
        { name: t("subscription.perfumeDatabase"), included: true, icon: Database },
        { name: t("subscription.saveFavorites"), included: true, icon: Heart },
      ],
      limitations: [t("subscription.unlimitedOperationsText")],
      buttonText:
        currentPlan === "premium" && isActive ? t("subscription.manageSubscription") : t("subscription.upgradeNow"),
      buttonVariant: currentPlan === "premium" && isActive ? "outline" : "default",
      popular: true,
      current: currentPlan === "premium" && isActive,
    },
  ]

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("ar-SA", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const remainingCredits = credits ? Math.max(0, credits.credits_limit - credits.credits_used) : 10
  const creditsPercentage =
    credits && credits.credits_limit > 0 ? (credits.credits_used / credits.credits_limit) * 100 : 0

  return (
    <div className="p-8 space-y-8" dir="rtl">
      {/* Header */}
      <div className="text-center space-y-6 px-4" dir="rtl">
        <div className="flex items-center justify-center gap-3 mb-6" dir="rtl">
          <Crown className="h-8 w-8 text-amber-500" />
          <h1 className="text-3xl font-bold text-sage-900" dir="rtl">
            {t("subscription.title")}
          </h1>
        </div>
        <p className="text-gray-600 text-lg max-w-3xl mx-auto leading-relaxed px-4" dir="rtl">
          {t("subscription.subtitle")}
        </p>
      </div>

      {/* Current Plan Status & Credits */}
      <div className="max-w-5xl mx-auto px-4" dir="rtl">
        <Card
          className="border-mint-200 bg-gradient-to-br from-mint-50 via-sage-50 to-mint-100 p-2 shadow-lg"
          dir="rtl"
        >
          <CardHeader className="pb-6 px-6 pt-6" dir="rtl">
            <div className="flex items-center justify-between" dir="rtl">
              <div className="flex items-center gap-4" dir="rtl">
                <div className="w-16 h-16 bg-gradient-to-br from-mint-500 to-mint-600 rounded-full flex items-center justify-center shadow-lg">
                  {currentPlan === "premium" && isActive ? (
                    <Crown className="h-8 w-8 text-white" />
                  ) : (
                    <Zap className="h-8 w-8 text-white" />
                  )}
                </div>
                <div className="text-right" dir="rtl">
                  <h3 className="text-2xl font-bold text-sage-900" dir="rtl">
                    {currentPlan === "premium" && isActive ? t("subscription.premiumPlan") : t("subscription.freePlan")}
                  </h3>
                  <p className="text-sage-600 text-lg" dir="rtl">
                    {currentPlan === "premium" && isActive && subscription?.current_period_end
                      ? `${t("subscription.nextRenewal")} ${formatDate(subscription.current_period_end)}`
                      : t("subscription.lifetimeFree")}
                  </p>
                </div>
              </div>
              <Badge
                variant={currentPlan === "premium" && isActive ? "default" : "secondary"}
                className={`${
                  currentPlan === "premium" && isActive
                    ? "bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700"
                    : "bg-gradient-to-r from-mint-500 to-mint-600"
                } px-6 py-3 text-lg font-medium text-white`}
                dir="rtl"
              >
                {currentPlan === "premium" && isActive ? t("subscription.premium") : t("subscription.free")}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-6 px-6 pb-6" dir="rtl">
            {/* Fancy Free Plan Metrics */}
            {currentPlan === "free" && (
              <div className="space-y-6" dir="rtl">
                {/* Main Credits Display */}
                <div
                  className="bg-gradient-to-br from-white via-mint-50 to-sage-50 rounded-2xl p-6 border-2 border-mint-200 shadow-lg"
                  dir="rtl"
                >
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6" dir="rtl">
                    {/* Remaining Credits */}
                    <div className="text-center space-y-3" dir="rtl">
                      <div className="w-20 h-20 mx-auto bg-gradient-to-br from-mint-500 to-mint-600 rounded-full flex items-center justify-center shadow-lg">
                        <span className="text-3xl font-bold text-white" dir="rtl">
                          {remainingCredits}
                        </span>
                      </div>
                      <div dir="rtl">
                        <h4 className="text-lg font-bold text-sage-900" dir="rtl">
                          {t("subscription.operationsRemaining")}
                        </h4>
                        <p className="text-sm text-sage-600" dir="rtl">
                          {t("subscription.thisMonth")}
                        </p>
                      </div>
                    </div>

                    {/* Total Limit */}
                    <div className="text-center space-y-3" dir="rtl">
                      <div className="w-20 h-20 mx-auto bg-gradient-to-br from-sage-500 to-sage-600 rounded-full flex items-center justify-center shadow-lg">
                        <span className="text-3xl font-bold text-white" dir="rtl">
                          {credits?.credits_limit || 10}
                        </span>
                      </div>
                      <div dir="rtl">
                        <h4 className="text-lg font-bold text-sage-900" dir="rtl">
                          {t("subscription.totalOperations")}
                        </h4>
                        <p className="text-sm text-sage-600" dir="rtl">
                          {t("subscription.monthly")}
                        </p>
                      </div>
                    </div>

                    {/* Usage Percentage */}
                    <div className="text-center space-y-3" dir="rtl">
                      <div className="w-20 h-20 mx-auto bg-gradient-to-br from-amber-500 to-amber-600 rounded-full flex items-center justify-center shadow-lg">
                        <span className="text-2xl font-bold text-white" dir="rtl">
                          {(100 - creditsPercentage).toFixed(0)}%
                        </span>
                      </div>
                      <div dir="rtl">
                        <h4 className="text-lg font-bold text-sage-900" dir="rtl">
                          {t("subscription.remaining")}
                        </h4>
                        <p className="text-sm text-sage-600" dir="rtl">
                          {t("subscription.fromMonthlyLimit")}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="mt-6 space-y-3" dir="rtl">
                    <div className="flex items-center justify-between text-sm font-medium text-sage-700" dir="rtl">
                      <span dir="rtl">{t("subscription.monthlyUsage")}</span>
                      <span dir="rtl">
                        {credits?.credits_used || 0} من {credits?.credits_limit || 10}
                      </span>
                    </div>
                    <div className="relative" dir="rtl">
                      <Progress value={creditsPercentage} className="h-4 bg-sage-100" dir="rtl" />
                      <div className="absolute inset-0 bg-gradient-to-r from-mint-400 to-mint-500 rounded-full opacity-20"></div>
                    </div>
                  </div>

                  {/* Reset Date */}
                  <div className="mt-4 flex items-center justify-center gap-2 text-sage-600" dir="rtl">
                    <Calendar className="h-4 w-4" />
                    <span className="text-sm" dir="rtl">
                      {t("subscription.renewsOn")} {credits ? formatDate(credits.reset_date) : "1 يونيو 2025"}
                    </span>
                  </div>
                </div>

                {/* Usage Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4" dir="rtl">
                  {/* This Month Usage */}
                  <div
                    className="bg-gradient-to-br from-mint-100 to-mint-200 rounded-xl p-4 border border-mint-300"
                    dir="rtl"
                  >
                    <div className="flex items-center justify-between" dir="rtl">
                      <div className="text-right" dir="rtl">
                        <h5 className="text-lg font-bold text-sage-900" dir="rtl">
                          {t("subscription.monthlyUsage")}
                        </h5>
                        <p className="text-sm text-sage-600" dir="rtl">
                          {t("subscription.usedOperations")}
                        </p>
                      </div>
                      <div className="text-left" dir="rtl">
                        <div className="text-2xl font-bold text-mint-700" dir="rtl">
                          {credits?.credits_used || 0}
                        </div>
                        <div className="text-xs text-sage-500" dir="rtl">
                          {t("subscription.used")}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Efficiency Score */}
                  <div
                    className="bg-gradient-to-br from-sage-100 to-sage-200 rounded-xl p-4 border border-sage-300"
                    dir="rtl"
                  >
                    <div className="flex items-center justify-between" dir="rtl">
                      <div className="text-right" dir="rtl">
                        <h5 className="text-lg font-bold text-sage-900" dir="rtl">
                          {t("subscription.efficiencyRate")}
                        </h5>
                        <p className="text-sm text-sage-600" dir="rtl">
                          {t("subscription.optimalUsage")}
                        </p>
                      </div>
                      <div className="text-left flex items-center gap-2" dir="rtl">
                        <TrendingUp className="h-5 w-5 text-sage-600" />
                        <div className="text-2xl font-bold text-sage-700" dir="rtl">
                          {remainingCredits >= 8
                            ? t("subscription.excellent")
                            : remainingCredits >= 5
                              ? t("subscription.good")
                              : t("subscription.low")}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Warning for Low Credits */}
                {remainingCredits <= 2 && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-300 rounded-xl p-4"
                    dir="rtl"
                  >
                    <div className="flex items-center gap-3" dir="rtl">
                      <div className="w-12 h-12 bg-amber-500 rounded-full flex items-center justify-center">
                        <Sparkles className="h-6 w-6 text-white" />
                      </div>
                      <div className="flex-1 text-right" dir="rtl">
                        <h6 className="text-lg font-bold text-amber-800" dir="rtl">
                          {t("subscription.fewOperationsLeft")}
                        </h6>
                        <p className="text-amber-700" dir="rtl">
                          {t("subscription.upgradeForUnlimited")}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            )}

            {/* Premium Plan Benefits */}
            {currentPlan === "premium" && isActive && (
              <div className="space-y-6" dir="rtl">
                {/* Premium Unlimited Display */}
                <div
                  className="bg-gradient-to-br from-amber-50 via-amber-100 to-amber-200 rounded-2xl p-6 border-2 border-amber-300 shadow-lg"
                  dir="rtl"
                >
                  <div className="text-center space-y-4" dir="rtl">
                    <div className="w-24 h-24 mx-auto bg-gradient-to-br from-amber-500 to-amber-600 rounded-full flex items-center justify-center shadow-lg">
                      <span className="text-4xl font-bold text-white" dir="rtl">
                        ∞
                      </span>
                    </div>
                    <div dir="rtl">
                      <h4 className="text-2xl font-bold text-sage-900" dir="rtl">
                        {t("subscription.unlimitedOperations")}
                      </h4>
                      <p className="text-amber-700 text-lg" dir="rtl">
                        {t("subscription.enjoyFullExperience")}
                      </p>
                    </div>
                  </div>
                </div>

                <div
                  className="grid grid-cols-1 md:grid-cols-3 gap-6 p-4 bg-white rounded-lg border border-mint-200"
                  dir="rtl"
                >
                  <div className="flex items-center gap-3 text-sage-700 justify-end" dir="rtl">
                    <span className="text-sm font-medium" dir="rtl">
                      {t("subscription.unlimitedSearch")}
                    </span>
                    <Search className="h-5 w-5 text-mint-600" />
                  </div>
                  <div className="flex items-center gap-3 text-sage-700 justify-end" dir="rtl">
                    <span className="text-sm font-medium" dir="rtl">
                      {t("subscription.advancedAI")}
                    </span>
                    <Bot className="h-5 w-5 text-mint-600" />
                  </div>
                  <div className="flex items-center gap-3 text-sage-700 justify-end" dir="rtl">
                    <span className="text-sm font-medium" dir="rtl">
                      {t("subscription.prioritySupport")}
                    </span>
                    <Crown className="h-5 w-5 text-mint-600" />
                  </div>
                </div>
              </div>
            )}

            {/* Quick Actions */}
            <div className="flex gap-4 pt-4 justify-end" dir="rtl">
              {currentPlan === "premium" && isActive && (
                <>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-2 px-4 py-2 bg-transparent"
                    onClick={handleManageSubscription}
                    disabled={actionLoading === "manage"}
                    dir="rtl"
                  >
                    {actionLoading === "manage" ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Settings className="h-4 w-4" />
                    )}
                    <span dir="rtl">{t("subscription.manageSubscription")}</span>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-2 px-4 py-2 bg-transparent"
                    onClick={handleManageSubscription}
                    disabled={actionLoading === "manage"}
                    dir="rtl"
                  >
                    <span dir="rtl">{t("subscription.billingHistory")}</span>
                    <CreditCard className="h-4 w-4" />
                  </Button>
                </>
              )}
              {currentPlan === "free" && (
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 px-8 py-3 text-lg font-medium shadow-lg hover:shadow-xl"
                  onClick={handleUpgrade}
                  disabled={actionLoading === "upgrade"}
                  dir="rtl"
                >
                  {actionLoading === "upgrade" ? (
                    <Loader2 className="h-5 w-5 animate-spin mr-2" />
                  ) : (
                    <Crown className="h-5 w-5 mr-2" />
                  )}
                  <span dir="rtl">{t("subscription.upgradeToPremium")}</span>
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Plans Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto px-4" dir="rtl">
        {plans.map((plan, index) => (
          <motion.div
            key={plan.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="relative"
            dir="rtl"
          >
            <Card
              className={`relative overflow-hidden transition-all duration-300 hover:shadow-xl p-2 ${
                plan.popular && !plan.current
                  ? "border-2 border-amber-300 shadow-lg scale-105"
                  : plan.current
                    ? "border-2 border-mint-300 shadow-md"
                    : "border-sage-200 hover:border-mint-300"
              }`}
              dir="rtl"
            >
              {plan.popular && !plan.current && (
                <div
                  className="absolute top-0 left-0 right-0 bg-gradient-to-r from-amber-500 to-amber-600 text-white text-center py-3 text-sm font-medium"
                  dir="rtl"
                >
                  <div className="flex items-center justify-center gap-2" dir="rtl">
                    <span dir="rtl">{t("subscription.mostPopular")}</span>
                    <Sparkles className="h-4 w-4" />
                  </div>
                </div>
              )}

              {plan.current && (
                <div
                  className="absolute top-0 left-0 right-0 bg-gradient-to-r from-mint-500 to-mint-600 text-white text-center py-3 text-sm font-medium"
                  dir="rtl"
                >
                  <div className="flex items-center justify-center gap-2" dir="rtl">
                    <span dir="rtl">{t("subscription.currentPlan")}</span>
                    <Check className="h-4 w-4" />
                  </div>
                </div>
              )}

              <CardHeader
                className={`text-center pb-6 px-8 ${(plan.popular && !plan.current) || plan.current ? "pt-16" : "pt-8"}`}
                dir="rtl"
              >
                <div className="space-y-6" dir="rtl">
                  <div className="flex items-center justify-center gap-3" dir="rtl">
                    <CardTitle className="text-2xl font-bold text-sage-900" dir="rtl">
                      {plan.name}
                    </CardTitle>
                    {plan.id === "premium" ? (
                      <Crown className="h-6 w-6 text-amber-500" />
                    ) : (
                      <Zap className="h-6 w-6 text-mint-500" />
                    )}
                  </div>

                  <div className="space-y-3" dir="rtl">
                    <div className="flex items-baseline justify-center gap-2" dir="rtl">
                      <span className="text-gray-600" dir="rtl">
                        {plan.period}
                      </span>
                      <span className="text-5xl font-bold text-sage-900" dir="rtl">
                        {plan.price}
                      </span>
                      <span className="text-sm text-gray-600" dir="rtl">
                        ر.س
                      </span>
                    </div>
                  </div>

                  <p className="text-gray-600 text-center leading-relaxed px-4" dir="rtl">
                    {plan.description}
                  </p>
                </div>
              </CardHeader>

              <CardContent className="px-8 pb-8" dir="rtl">
                <div className="space-y-8" dir="rtl">
                  {/* Features List */}
                  <div className="space-y-4" dir="rtl">
                    {plan.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center gap-4 justify-end" dir="rtl">
                        <span className="text-sage-700 font-medium" dir="rtl">
                          {feature.name}
                        </span>
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            feature.included
                              ? plan.id === "premium"
                                ? "bg-amber-100 text-amber-600"
                                : "bg-mint-100 text-mint-600"
                              : "bg-gray-100 text-gray-400"
                          }`}
                        >
                          {feature.included ? <feature.icon className="h-5 w-5" /> : <span className="text-sm">×</span>}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Limitations/Benefits */}
                  <div
                    className={`rounded-lg p-6 ${
                      plan.id === "premium"
                        ? "bg-gradient-to-br from-amber-50 to-amber-100 border border-amber-200"
                        : "bg-gradient-to-br from-mint-50 to-mint-100 border border-mint-200"
                    }`}
                    dir="rtl"
                  >
                    <div className="space-y-3" dir="rtl">
                      {plan.limitations.map((limitation, limitIndex) => (
                        <div key={limitIndex} className="flex items-center gap-3 justify-end" dir="rtl">
                          <span
                            className={`text-sm font-medium ${
                              plan.id === "premium" ? "text-amber-700" : "text-mint-700"
                            }`}
                            dir="rtl"
                          >
                            {limitation}
                          </span>
                          <div
                            className={`w-6 h-6 rounded-full flex items-center justify-center ${
                              plan.id === "premium" ? "bg-amber-200 text-amber-700" : "bg-mint-200 text-mint-700"
                            }`}
                          >
                            {plan.id === "premium" ? (
                              <Sparkles className="h-4 w-4" />
                            ) : (
                              <span className="text-xs font-bold">10</span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Action Button */}
                  <Button
                    variant={plan.buttonVariant as any}
                    size="lg"
                    className={`w-full py-6 text-lg font-medium transition-all ${
                      plan.buttonVariant === "default"
                        ? "bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white shadow-lg hover:shadow-xl"
                        : plan.current && plan.id === "free"
                          ? "border-mint-300 text-mint-700 bg-mint-50 cursor-default"
                          : plan.current && plan.id === "premium"
                            ? "border-amber-300 text-amber-700 bg-amber-50 hover:bg-amber-100"
                            : plan.buttonVariant === "destructive"
                              ? "border-red-300 text-red-700 hover:bg-red-50"
                              : "border-sage-300 text-sage-700 hover:bg-sage-50"
                    }`}
                    disabled={
                      (plan.current && plan.id === "free") || actionLoading === "upgrade" || actionLoading === "manage"
                    }
                    onClick={() => {
                      if (plan.id === "premium" && !plan.current) {
                        handleUpgrade()
                      } else if (plan.id === "premium" && plan.current) {
                        handleManageSubscription()
                      }
                    }}
                    dir="rtl"
                  >
                    {(actionLoading === "upgrade" && plan.id === "premium" && !plan.current) ||
                    (actionLoading === "manage" && plan.id === "premium" && plan.current) ? (
                      <Loader2 className="h-5 w-5 animate-spin mr-2" />
                    ) : null}
                    {plan.buttonText}
                  </Button>

                  {plan.id === "premium" && !plan.current && (
                    <div className="text-center pt-2" dir="rtl">
                      <p className="text-xs text-gray-500" dir="rtl">
                        {t("subscription.canCancelAnytime")}
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
