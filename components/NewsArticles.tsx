import NewsDisplay from "./NewsDisplay"

export default async function NewsArticles() {
  /*
  hetkene probleem newsdata API'ga, tasuta plaaniga saab pmst max 10 artiklit ainult kätte
  üle selle vist ei tundu et saab?
  arvatavasti peab välja uurima tegelikud official API otspunktid ja neilt info kätte saama.
  */
  const newsdataApiKey = process.env.NEWSDATA_API_KEY!
  const fNews = await fetch(
    `https://newsdata.io/api/1/news?country=ee&apikey=${newsdataApiKey}`
  )
  const pNews = await fNews.json()

  return (
    <div className="h-screen w-[80vh] bg-slate-300 rounded-xl px-4 py-4">
      <p className="text-2xl text-black font-bold">Viimased uudised:</p>
      <NewsDisplay news={pNews} />
    </div>
  )
}
