import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="p-4 space-y-5">
      <div>
        <Skeleton className="h-8 w-64 mb-2" />
        <Skeleton className="h-5 w-96" />
      </div>

      <Card className="border-sage-100 shadow-lg">
        <CardHeader className="pb-2 pt-4 px-6">
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl font-bold text-sage-900">
              <Skeleton className="h-6 w-48" />
            </CardTitle>
            <Skeleton className="h-9 w-28" />
          </div>
          <Skeleton className="h-4 w-full mt-1" />
        </CardHeader>

        <CardContent className="px-6 pb-6">
          <div className="space-y-6">
            <div className="space-y-3">
              <Skeleton className="h-6 w-24" />
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-10 w-full" />
                </div>
                <div className="space-y-2">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-10 w-full" />
                </div>
              </div>
            </div>

            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="space-y-3">
                <Skeleton className="h-6 w-24" />
                <div className="flex flex-wrap gap-2">
                  {Array.from({ length: 4 }).map((_, j) => (
                    <Skeleton key={j} className="h-9 w-20" />
                  ))}
                </div>
              </div>
            ))}

            <Skeleton className="h-14 w-full mt-4" />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
