"use client"

import NewsPage from "@/components/News/NewsPage"

export default function Sport() {
  return (
    <>
      <NewsPage fetchProps={{ category: "sports" }} />
    </>
  )
}
