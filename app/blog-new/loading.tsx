export default function BlogNewLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-sage-50 via-white to-mint-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-mint-500 mx-auto mb-4"></div>
        <p className="text-sage-600">جاري تحميل المدونة...</p>
      </div>
    </div>
  )
}
