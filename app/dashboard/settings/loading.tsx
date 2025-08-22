import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"

export default function SettingsLoading() {
  return (
    <div className="container mx-auto py-6 px-4 md:px-6">
      <div className="mb-6">
        <Skeleton className="h-10 w-48 mb-2" />
        <Skeleton className="h-5 w-72" />
      </div>

      <div className="mb-6">
        <Skeleton className="h-10 w-64 rounded-lg" />
      </div>

      <Card>
        <CardHeader className="space-y-2">
          <Skeleton className="h-7 w-32" />
          <Skeleton className="h-5 w-64" />
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Skeleton className="h-5 w-24" />
            <Skeleton className="h-10 w-full rounded-md" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-5 w-24" />
            <Skeleton className="h-10 w-full rounded-md" />
          </div>
        </CardContent>
        <CardFooter>
          <Skeleton className="h-10 w-32 rounded-md" />
        </CardFooter>
      </Card>
    </div>
  )
}
