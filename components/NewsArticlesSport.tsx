import NewsDisplaySport from "./NewsDisplaySport"

export default async function NewsArticlesSport() {
  const newsdataApiKey = process.env.NEWSDATA_API_KEY!
  const fNews = await fetch(
    `https://newsdata.io/api/1/news?country=ee&apikey=${newsdataApiKey}`
  )
  const pNews = await fNews.json()

  return (
    <div className="h-screen w-[80vh] bg-slate-300 rounded-xl px-4 py-4">
      <p className="text-2xl text-black font-bold">Viimased uudised:</p>
      <NewsDisplaySport news={pNews} />
    </div>
  )
}
