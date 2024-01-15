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
import { NewsDataFilter } from "@/types/NewsDataFilter"
import { NewsData } from "@/types/NewsData"

export default function NewsPage({
  fetchProps
}: {
  fetchProps: NewsFetchProps
}) {
  const [user, setUser] = useState<NewsFlashUser>()
  const [loading, setLoading] = useState(true)
  const [loadingFetch, setLoadingFetch] = useState(true)

  // pagination states
  const [currentPage, setCurrentPage] = useState(0) // stored as an index
  const [maxPages, setMaxPages] = useState(0)
  const [pageIDs, setPageIDs] = useState<Array<string | undefined>>([undefined])
  const [lastPageButtonActive, setLastPageButtonActive] = useState(false)
  const [nextPageButtonActive, setNextPageButtonActive] = useState(false)

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
  const [newsFilters, setNewsFilters] = useState<NewsDataFilter>({
    todayNews: false,
    lastSevenDaysNews: false
  })

  const searchParams = useSearchParams()
  const searchQuery = searchParams && searchParams.get("q")

  useEffect(() => {
    const fetchData = async () => {
      const news = await fetchNews(props)
      setNews(news)

      if ((news as NewsData).results.length !== 0) {
        if (currentPage === 0) {
          // if we're on the first page
          const maxPages = ((news as NewsData).totalResults / 10) | 0 // bitwise OR for casting to number
          setMaxPages(maxPages)
          setNextPageButtonActive(true)

          const currPageIDs = Array.from({ length: maxPages }) as (
            | string
            | undefined
          )[]
          currPageIDs[1] = (news as NewsData).nextPage
          setPageIDs(currPageIDs)
        } else {
          const updatedPageIDs = pageIDs.map((value, i) => {
            // update next page ID
            if (i === currentPage + 1) return (news as NewsData).nextPage
            else return value
          })

          setPageIDs(updatedPageIDs)
        }
      }
    }

    props.page = pageIDs[currentPage]

    fetchData()
    setLoadingFetch(false)
  }, [searchQuery, currentPage])

  if (loading) return <main />

  const handleLastPageButton = () => {
    const updated = currentPage - 1
    setCurrentPage(updated)

    if (updated < maxPages - 1) setNextPageButtonActive(true)

    if (updated <= 0) setLastPageButtonActive(false)
    else setLastPageButtonActive(true)
  }

  const handleNextPageButton = () => {
    const updated = currentPage + 1
    setCurrentPage(updated)

    if (updated > 0) setLastPageButtonActive(true)

    if (updated >= maxPages - 1) setNextPageButtonActive(false)
    else setNextPageButtonActive(true)
  }

  return (
    <main>
      <HomeHeader user={user?.username ? user.username : undefined} />

      <div className="flex flex-1 pt-8 w-[93%] mx-auto gap-10">
        <div className="flex flex-col gap-4">
          <NewsSideFilters
            filter={newsFilters}
            setFilter={setNewsFilters}
          />

          <div className="bg-slate-300 rounded-xl px-4 py-4 text-black">
            <div className="flex gap-2 align-middle justify-center pb-2">
              <button
                onClick={handleLastPageButton}
                disabled={!lastPageButtonActive}
                className="transition ease-in-out text-xl text-white bg-red-800 px-1 rounded-xl disabled:text-black disabled:bg-slate-700 hover:bg-red-600"
              >
                &lt;-
              </button>
              <button
                onClick={handleNextPageButton}
                disabled={!nextPageButtonActive}
                className="transition ease-in-out text-xl text-white bg-red-800 px-1 rounded-xl disabled:text-black disabled:bg-slate-700 hover:bg-red-600"
              >
                -&gt;
              </button>
            </div>
            <p className="text-center font-bold">
              Lehekülg: {currentPage + 1}/{maxPages === 0 ? "?" : maxPages}
            </p>
          </div>
        </div>

        <NewsArticles
          news={news}
          filter={newsFilters}
        />
      </div>
    </main>
  )
}
