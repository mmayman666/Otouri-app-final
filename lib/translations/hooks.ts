import { useTranslation as useTranslationContext } from "./context"

export const useTranslation = useTranslationContext

export function useDirection() {
  const { isRTL } = useTranslation()
  return {
    isRTL,
    dir: isRTL ? "rtl" : "ltr",
    textAlign: isRTL ? "text-right" : "text-left",
    marginStart: isRTL ? "mr" : "ml",
    marginEnd: isRTL ? "ml" : "mr",
    paddingStart: isRTL ? "pr" : "pl",
    paddingEnd: isRTL ? "pl" : "pr",
    borderStart: isRTL ? "border-r" : "border-l",
    borderEnd: isRTL ? "border-l" : "border-r",
    roundedStart: isRTL ? "rounded-r" : "rounded-l",
    roundedEnd: isRTL ? "rounded-l" : "rounded-r",
  }
}
