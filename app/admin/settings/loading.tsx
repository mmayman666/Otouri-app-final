import { Skeleton } from "@/components/ui/skeleton"

export default function SettingsLoading() {
  return (
    <div className="container mx-auto p-6">
      <div className="mb-8">
        <Skeleton className="h-10 w-1/3 mb-4" />
        <Skeleton className="h-4 w-2/3 mb-8" />
      </div>

      <div className="grid gap-8">
        {Array(3)
          .fill(null)
          .map((_, i) => (
            <div key={i} className="border rounded-lg p-6 bg-white dark:bg-gray-800">
              <Skeleton className="h-6 w-1/4 mb-4" />
              <div className="space-y-4">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-10 w-full" />
              </div>
            </div>
          ))}
      </div>
    </div>
  )
}
