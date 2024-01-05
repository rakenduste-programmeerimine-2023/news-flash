"use client"

import NewsPage from "@/components/NewsPage"

export default function Poliitika() {
  return (
    <>
      <NewsPage fetchProps={{ category: "politics" }} />
    </>
  )
}