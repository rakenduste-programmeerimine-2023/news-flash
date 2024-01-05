"use client"

import NewsPage from "@/components/NewsPage"

export default function Teadus() {
  return (
    <>
      <NewsPage fetchProps={{ category: "science" }} />
    </>
  )
}