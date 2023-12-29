export default function NewsDisplay(props: { news: any }) {
  const newsInList = props.news.results.map(newsEntry => {
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
