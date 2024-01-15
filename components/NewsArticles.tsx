import { NewsData } from "@/types/NewsData"
import NewsDisplay from "./NewsDisplay"
import { NewsDataFilter } from "@/types/NewsDataFilter"

export default function NewsArticles({
  news,
  filter
}: {
  news: NewsData | undefined
  filter: NewsDataFilter
}) {
  if (!news)
    return (
      <div className="h-[80vh] w-full bg-slate-300 rounded-xl px-4 py-4">
        <p className="text-2xl text-black font-bold">Laadimine...</p>
      </div>
    )

  return (
    <div className="h-[80vh] w-full bg-slate-300 rounded-xl px-4 py-4">
      <NewsDisplay
        news={news}
        filter={filter}
      />
    </div>
  )
}
