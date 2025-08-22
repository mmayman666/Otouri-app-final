import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function SubscriptionLoading() {
  return (
    <div className="p-6 space-y-6" dir="rtl">
      <div className="text-center space-y-4" dir="rtl">
        <Skeleton className="h-10 w-96 mx-auto" />
        <Skeleton className="h-6 w-[600px] mx-auto" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto" dir="rtl">
        {[1, 2].map((i) => (
          <Card key={i} className="border-sage-200" dir="rtl">
            <CardHeader className="text-center pb-4 pt-6 px-6" dir="rtl">
              <div className="space-y-4" dir="rtl">
                <Skeleton className="h-8 w-48 mx-auto" />
                <Skeleton className="h-12 w-32 mx-auto" />
                <Skeleton className="h-4 w-64 mx-auto" />
              </div>
            </CardHeader>
            <CardContent className="px-6 pb-6" dir="rtl">
              <div className="space-y-6" dir="rtl">
                <div className="space-y-3" dir="rtl">
                  {[1, 2, 3, 4, 5, 6].map((j) => (
                    <div key={j} className="flex items-center gap-3 justify-end" dir="rtl">
                      <Skeleton className="h-4 w-32" />
                      <Skeleton className="h-8 w-8 rounded-full" />
                    </div>
                  ))}
                </div>
                <Skeleton className="h-16 w-full rounded-lg" />
                <Skeleton className="h-12 w-full" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
