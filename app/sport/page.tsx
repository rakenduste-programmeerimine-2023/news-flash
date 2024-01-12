
import AuthButton from '@/components/Header/AuthButton'
import NewsPage from "@/components/News/NewsPage"

"use client"



export default function Sport() {
  return (
    <>
      <NewsPage fetchProps={{ category: "sports" }} />

      <AuthButton />

    </>
  )
}
