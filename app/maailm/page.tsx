"use client"

import NewsPage from "@/components/NewsPage"

export default function Maailm() {
  return (
    <>
      <NewsPage fetchProps={{ category: "world" }} />
    </>
  )
}