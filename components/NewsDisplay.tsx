import { NewsData } from "@/types/NewsData"

export default function NewsDisplay({ news }: { news: NewsData }) {
  if (news.results.length === 0) {
    return (
      <p className="text-2xl text-black font-bold">Hetkel uudised puuduvad. Palun vaadake hiljem uuesti.</p>
    )
  }

  const newsInList = news.results.map(newsEntry => {
    return (
      <div
        className="border-solid rounded border-8 my-8 text-black border-red-900 p-2"
        key={newsEntry.article_id}
      >
        <a
          href={newsEntry.link}
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
