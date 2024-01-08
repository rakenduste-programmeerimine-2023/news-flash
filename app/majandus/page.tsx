"use client"

import NewsPage from "@/components/News/NewsPage"

export default function Majandus() {
  return (
    <>
      <NewsPage fetchProps={{ category: "business" }} />
    </>
  )
}
