export const fetchNews = async (category?: string, query?: string) => {
  /*
  hetkene probleem newsdata API'ga, tasuta plaaniga saab pmst max 10 artiklit ainult kätte
  üle selle vist ei tundu et saab?
  arvatavasti peab välja uurima tegelikud official API otspunktid ja neilt info kätte saama.
  */

  const categoryParameter = category ? `&category=${category}` : ""
  const queryParameter = query ? `&q=${query}` : ""

  const newsdataApiKey = process.env.NEWSDATA_API_KEY!
  const fNews = await fetch(
    `https://newsdata.io/api/1/news?apikey=${newsdataApiKey}&language=et${queryParameter}${categoryParameter}`
  )

  if (!fNews.ok) {
    throw new Error("Fetching news failed")
  }

  return fNews.json()
}
