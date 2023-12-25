import Link from 'next/link'
import styles from '../components/styles/Home.module.css'

export default function Home() {
  return (
    <main>
      <div>
        <h1 className="newsFlash">NewsFlash</h1>
      </div>
      <nav>

        <Link href="/Majandus">Majandus</Link>
        <Link href="/Sport">Sport</Link>
        <Link href="/Maailm">Maailm</Link>
        <Link href="/Eesti">Eesti</Link>
        <Link href="/Kultuur">Kultuur</Link>
        <Link className="welcome" href="/my_profile">Tere tulemast,
        user</Link>

      </nav>
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