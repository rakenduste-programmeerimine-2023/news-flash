import HomeHeader from '@/components/HomeHeader'

export default function Home() {
  return (
    <main>
      <HomeHeader />

      <div className="search-container">
        <label htmlFor="searchbar">Otsi: </label>
        <input id="searchbar" type="text" placeholder=" Märksõna"></input>
      </div>
      <div className="checkbox-container">
      <label htmlFor="date_checkboxDay">Tänased uudised</label>
        <input type="checkbox" className="checkboxes" id="date_checkboxDay" name="date_checkboxDay" value="day" ></input>
        <label htmlFor="date_checkboxWeek">Viimase 7 päeva uudised</label>
        <input type="checkbox" className="checkboxes" id="date_checkboxWeek" name="date_checkboxWeek" value="week" ></input>
       
        <div id="timeframe">

          <input className="searchByDate" id="searchbarFrom" type="text" placeholder="Alates"></input>
         
          <input className="searchByDate" id="searchbarUntil" type="text" placeholder="Kuni"></input>
        </div>
      </div>
      <div className="latestNews">Viimased Uudised:</div>
    </main>
  )
}