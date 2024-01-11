import { NewsData } from "@/types/NewsData"
import { storeArticleData } from "@/utils/util"

export default function NewsDisplay({ news }: { news: NewsData }) {
  if (news.results.length === 0) {
    return (
      <p className="text-2xl text-black font-bold">
        Hetkel uudised puuduvad. Palun vaadake hiljem uuesti.
      </p>
    )
  }

  const newsInList = news.results.map(newsEntry => {
    storeArticleData(newsEntry) // gets called on homepage for each article

    return (
      <div
        className="border-solid rounded border-8 my-8 text-black border-red-900 p-2"
        key={newsEntry.article_id}
      >
        <a
          href={`article/${newsEntry.article_id}`}
          className="font-bold"
        >
          {newsEntry.title}
        </a>

        <p>{newsEntry.description}</p>
      </div>
    )
  })

  return (
    <ul className="overflow-hidden overflow-y-scroll h-[97%]">{newsInList}</ul>
  )
}
