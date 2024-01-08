import HomeHeader from '@/components/Header/HomeHeader'
import AuthButton from '@/components/Header/AuthButton'
import changePassword from '../changePassword/page'

export default function Home() {
  return (
    <main>
      <HomeHeader/>
      <AuthButton />

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
      <a href="/changePassword" id="change_password">Muuda oma parooli</a>
      <button id="delete_user">Kustuta kasutaja</button>
    </main>
   
  )
}