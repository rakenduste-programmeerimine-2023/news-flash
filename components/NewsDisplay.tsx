import { NewsData } from "@/types/NewsData"
import { NewsDataFilter } from "@/types/NewsDataFilter"
import { storeArticleData } from "@/utils/util"
import Image from "next/image"

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

    const descriptionElement =
      newsEntry.description === null ? (
        <p className="text-justify italic">Kirjeldus puudub.</p>
      ) : (
        <p className="text-justify">{newsEntry.description}</p>
      )

    return (
      <div
        className="flex p-2 gap-4 bg-slate-200 text-black border-4 border-slate-400 rounded-lg mr-2"
        key={newsEntry.article_id}
      >
        <div className="relative min-w-[200px] w-[200px] h-full mt-1">
          <a href={`article/${newsEntry.article_id}`}>
            <Image
              src={newsEntry.image_url}
              alt="artikli pilt"
              width={200}
              height={200}
              style={{ objectFit: "contain", overflow: "hidden" }}
              className="rounded-md"
              priority
            />
          </a>
        </div>

        <div className="flex flex-col gap-2">
          <a
            href={`article/${newsEntry.article_id}`}
            className="transition ease-in-out font-bold hover:text-blue-500"
          >
            {newsEntry.title}
          </a>
          {descriptionElement}
        </div>
      </div>
    )
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
