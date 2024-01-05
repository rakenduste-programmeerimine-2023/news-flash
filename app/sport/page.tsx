"use client"

import NewsPage from "@/components/NewsPage"

export default function Sport() {
  return (
    <>
      <NewsPage fetchProps={{ category: "sports" }} />
    </>
  )
}