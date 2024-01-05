"use client"

import NewsPage from "@/components/NewsPage"

export default function Majandus() {
  return (
    <>
      <NewsPage fetchProps={{ category: "business" }} />
    </>
  )
}