import NewsDisplayMajandus from "./NewsDisplayMajandus"

export default async function NewsArticlesMajandus() {
  /*
  ma tegin neid API calle veel yhe API-ga, et vaadata kas need funktsioonid toimivad, panen selle ka siia:
  
  NEWSDATA_API_KEY=pub_3560362c67f1305c7a3b58c00f87cbbef3955

  URL: https://newsdata.io/api/1/news?apikey=pub_3560362c67f1305c7a3b58c00f87cbbef3955&language=et
  */
  const newsdataApiKey = process.env.NEWSDATA_API_KEY!
  const fNews = await fetch(
    `https://newsdata.io/api/1/news?country=ee&apikey=${newsdataApiKey}`
  )
  const pNews = await fNews.json()

  return (
    <div className="h-screen w-[80vh] bg-slate-300 rounded-xl px-4 py-4">
      <p className="text-2xl text-black font-bold">Viimased uudised:</p>
      <NewsDisplayMajandus news={pNews} />
    </div>
  )
}
