"use client"

import HomeHeader from "../Header/HomeHeader"
import NewsArticles from "./NewsArticles"
import NewsSideFilters from "./NewsSideFilters"
import {
  NewsFetchProps,
  fetchNews,
  updateNewsProps
} from "@/utils/newsdata/api"
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

export default function NewsPage({
  fetchProps
}: {
  fetchProps: NewsFetchProps
}) {
  const props = fetchProps
  updateNewsProps(props)

  const [news, setNews] = useState()

  const searchParams = useSearchParams()
  const searchQuery = searchParams && searchParams.get("q")

  useEffect(() => {
    const fetchData = async () => {
      const news = await fetchNews(props)
      setNews(news)
    }

    fetchData()
  }, [searchQuery])

  return (
    <main>
      <HomeHeader />

      <div className="flex flex-1 pt-8 w-[93%] mx-auto gap-10">
        <NewsSideFilters />
        <NewsArticles news={news} />
      </div>
    </main>
  )
}
