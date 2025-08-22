"use client"

import { useRouter } from "next/navigation"
import { useEffect } from "react"

const AdminPage = () => {
  const router = useRouter()

  useEffect(() => {
    const isAdmin = localStorage.getItem("isAdmin")

    if (isAdmin !== "true") {
      router.push("/")
    }
  }, [router])

  return (
    <div>
      <h1>Admin Page</h1>
      <p>Welcome to the admin area!</p>
    </div>
  )
}

export default AdminPage
