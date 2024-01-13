"use client"

import HomeHeader from "./HomeHeader"
import NewsArticles from "./NewsArticles"
import NewsSideFilters from "./NewsSideFilters"
import {
  NewsFetchProps,
  fetchNews,
  updateNewsProps
} from "@/utils/newsdata/api"
import { useSearchParams } from "next/navigation"
import { useEffect, useState, useLayoutEffect } from "react"
import { createClient } from "@/utils/supabase/client"
import { NewsFlashUser } from "@/types/NewsFlashUser"
import { getCurrentUser } from "@/utils/util"

export default function NewsPage({
  fetchProps
}: {
  fetchProps: NewsFetchProps
}) {
  const [user, setUser] = useState<NewsFlashUser>()
  const [loading, setLoading] = useState(true)

  useLayoutEffect(() => {
    const updateUser = async () => {
      const supabase = createClient()
      const user = await getCurrentUser(supabase)
      if (user) {
        setUser(user)
      }

      setLoading(false)
    }

    updateUser()
  }, [])

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

  if (loading) return <main />

  return (
    <main>
      <HomeHeader user={user?.username ? user.username : undefined} />

      <div className="flex flex-1 pt-8 w-[93%] mx-auto gap-10">
        <NewsSideFilters />
        <NewsArticles news={news} />
      </div>
    </main>
  )
}
