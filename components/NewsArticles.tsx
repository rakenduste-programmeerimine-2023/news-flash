import { NewsData } from "@/types/NewsData"
import NewsDisplay from "./NewsDisplay"

export default function NewsArticles({ news }: { news: NewsData | undefined }) {
  if (!news) return <div />

  return (
    <div className="h-screen w-[80vh] bg-slate-300 rounded-xl px-4 py-4">
      {news.results.length > 0 && (
        <p className="text-2xl text-black font-bold">Viimased uudised:</p>
      )}
      <NewsDisplay news={news} />
    </div>
  )
}
