import { Skeleton } from "@/components/ui/skeleton"

export default function HelpLoading() {
  return (
    <div className="container mx-auto p-6 space-y-8">
      <Skeleton className="h-12 w-64 mb-6" />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="col-span-2">
          <Skeleton className="h-8 w-48 mb-4" />
          <div className="space-y-4">
            {Array(5)
              .fill(0)
              .map((_, i) => (
                <div key={i} className="space-y-2">
                  <Skeleton className="h-6 w-full max-w-md" />
                  <Skeleton className="h-24 w-full" />
                </div>
              ))}
          </div>
        </div>

        <div className="space-y-6">
          <Skeleton className="h-8 w-32 mb-4" />
          <Skeleton className="h-64 w-full" />

          <Skeleton className="h-8 w-32 mb-4" />
          <Skeleton className="h-48 w-full" />
        </div>
      </div>
    </div>
  )
}
