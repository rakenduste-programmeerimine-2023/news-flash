export const fetchNews = async (props: {
  category?: string
  query?: string
}) => {
  /*
  ühe API calliga saab max 10 artiklit kätte. need on "lehekülgedeks" jaotatud,
  seega lehekülgede vahetamiseks peab uue fetchi tegema.
  */

  const categoryParameter = props.category ? `&category=${props.category}` : ""
  const queryParameter = props.query ? `&q=${props.query}` : ""

  const newsdataApiKey = process.env.NEWSDATA_API_KEY!
  const fNews = await fetch(
    `https://newsdata.io/api/1/news?apikey=${newsdataApiKey}&language=et${queryParameter}${categoryParameter}`
  )

  if (!fNews.ok) {
    throw new Error("Fetching news failed")
  }

  return fNews.json()
}
