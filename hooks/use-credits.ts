"use client"

import { useState, useCallback } from "react"
import { checkAndConsumeCredits } from "@/app/dashboard/subscription/actions"
import { useToast } from "@/hooks/use-toast"

export function useCredits() {
  const [isChecking, setIsChecking] = useState(false)
  const { toast } = useToast()

  const checkCredits = useCallback(
    async (actionType: string, creditsNeeded = 1) => {
      setIsChecking(true)
      try {
        const result = await checkAndConsumeCredits(actionType, creditsNeeded)

        if (!result.success) {
          toast({
            title: "عذراً، لا توجد عمليات بحث متبقية",
            description: result.error,
            variant: "destructive",
          })
          return false
        }

        return true
      } catch (error) {
        console.error("Error checking credits:", error)
        toast({
          title: "خطأ",
          description: "فشل في التحقق من الرصيد المتاح",
          variant: "destructive",
        })
        return false
      } finally {
        setIsChecking(false)
      }
    },
    [toast],
  )

  return { checkCredits, isChecking }
}
