import { NewsData } from "@/types/NewsData"
import { NewsDataFilter } from "@/types/NewsDataFilter"
import { storeArticleData } from "@/utils/util"
import Article from "./Article"

export default function NewsDisplay({
  news,
  filter
}: {
  news: NewsData
  filter: NewsDataFilter
}) {
  if (news.results.length === 0) {
    return (
      <p className="text-2xl text-black font-bold text-center">
        Hetkel uudised puuduvad. Palun vaadake hiljem uuesti.
      </p>
    )
  }

  const filteredNews = news.results.filter(newsEntry => {
    const releaseDate = new Date(newsEntry.pubDate)

    if (filter.todayNews) {
      const today = new Date()

      return releaseDate.getDate() === today.getDate()
    } else if (filter.lastSevenDaysNews) {
      const sevenDaysAgo = new Date()
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)

      return releaseDate.getTime() >= sevenDaysAgo.getTime()
    } else if (filter.dateFrom && filter.dateTo) {
      // get rid of any time values on the dates so we're properly only comparing dates
      filter.dateFrom.setHours(0, 0, 0, 0)
      filter.dateTo.setHours(0, 0, 0, 0)
      releaseDate.setHours(0, 0, 0, 0)

      return (
        releaseDate.getTime() >= filter.dateFrom.getTime() &&
        releaseDate.getTime() <= filter.dateTo.getTime()
      )
    } else {
      return true
    }
  })

  if (filteredNews.length === 0) {
    return (
      <p className="text-2xl text-black font-bold text-center">
        Uudiseid nende filtritega ei leitud.
      </p>
    )
  }

  const newsInList = filteredNews.map(newsEntry => {
    storeArticleData(newsEntry) // gets called on homepage for each article

    return <Article article={newsEntry} />
  })

  return (
    <>
      <p className="text-2xl text-black font-bold text-center pb-2">
        Viimased uudised:
      </p>
      <ul className="flex flex-col gap-2 overflow-hidden overflow-y-scroll h-[95%]">
        {newsInList}
      </ul>
    </>
  )
}
