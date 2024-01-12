
import AuthButton from '@/components/Header/AuthButton'
import NewsPage from "@/components/News/NewsPage"
=======
"use client"



export default function Teadus() {
  return (
    <>
      <NewsPage fetchProps={{ category: "science" }} />
      <AuthButton />
    </>
  )
}