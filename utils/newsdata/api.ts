"use client"

import { useSearchParams } from "next/navigation"

export type NewsFetchProps = {
  category?: string
  query?: string
  page?: string
}

export const fetchNews = async (props: NewsFetchProps) => {
  /*
  ühe API calliga saab max 10 artiklit kätte. need on "lehekülgedeks" jaotatud,
  seega lehekülgede vahetamiseks peab uue fetchi tegema.
  */

  const categoryParameter = props.category ? `&category=${props.category}` : ""
  const queryParameter = props.query ? `&q=${props.query}` : ""
  const pageParameter = props.page ? `&page=${props.page}` : ""

  const newsdataApiKey = process.env.NEXT_PUBLIC_NEWSDATA_API_KEY!
  const fNews = await fetch(
    `https://newsdata.io/api/1/news?apikey=${newsdataApiKey}&language=et${queryParameter}${categoryParameter}${pageParameter}`
  )

  if (!fNews.ok) {
    throw new Error(
      `Fetching news failed, status ${fNews.status} (${fNews.statusText})`
    )
  }

  return fNews.json()
}

export const updateNewsProps = (props: NewsFetchProps) => {
  const searchParams = useSearchParams()

  if (searchParams.has("q")) props.query = searchParams.get("q") as string
}
