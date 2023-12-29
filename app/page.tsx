import HomeHeader from '@/components/HomeHeader'

function NewsDisplay(props: { news: any }) {
  const newsInList = props.news.results.map(newsEntry => {
    return (
      <div
        className="border-solid rounded border-8 my-8"
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

  return <ul>{newsInList}</ul>
}

export default async function Home() {
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
    <main>
      <HomeHeader />

      <div className="search-container">
        <label htmlFor="searchbar">Otsi: </label>
        <input
          id="searchbar"
          type="text"
          placeholder=" Märksõna"
        ></input>
      </div>
      <div className="checkbox-container">
        <label htmlFor="date_checkboxDay">Tänased uudised</label>
        <input
          type="checkbox"
          className="checkboxes"
          id="date_checkboxDay"
          name="date_checkboxDay"
          value="day"
        ></input>
        <label htmlFor="date_checkboxWeek">Viimase 7 päeva uudised</label>
        <input
          type="checkbox"
          className="checkboxes"
          id="date_checkboxWeek"
          name="date_checkboxWeek"
          value="week"
        ></input>

        <div id="timeframe">
          <input
            className="searchByDate"
            id="searchbarFrom"
            type="text"
            placeholder="Alates"
          ></input>

          <input
            className="searchByDate"
            id="searchbarUntil"
            type="text"
            placeholder="Kuni"
          ></input>
        </div>
      </div>
      <div className="latestNews">
        <h1>Viimased Uudised:</h1>
        <NewsDisplay news={pNews} />
      </div>
    </main>
  )
}
