import HomeHeader from '@/components/HomeHeader'

export default function Home() {
  return (
    <main>
      <HomeHeader user="user" />

      <div className="user-container">
        Minu kasutaja
      </div>
      <div className="email-container">
        <label htmlFor="email">E-posti aadress</label>
      <input id ="email" type="text" />
      </div>
      <div className="firstname-container">
        <label htmlFor="firstname">Eesnimi</label>
      <input id ="firstname" type="text" />
      </div>
      <div className="lastname-container">
        <label htmlFor="lastname">Eesnimi</label>
      <input id ="lastname" type="text" />
      </div>
      <div className="savedNews">Minu salvestatud Uudised:</div>
      <div className="myComments">Minu kommentaarid:</div>
      <button id="change_password">Muuda oma parooli</button>
      <button id="delete_user">Kustuta kasutaja</button>
    </main>
   
  )
}