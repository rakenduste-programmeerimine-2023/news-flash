"use client"

import HomeHeader from "@/components/HomeHeader"
import { createClient } from "@/utils/supabase/client"
import { useLayoutEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { NewsFlashUser } from "@/types/NewsFlashUser"

export default function MyProfile() {
  const [user, setUser] = useState<NewsFlashUser>()
  const router = useRouter()

  useLayoutEffect(() => {
    const enforceAuth = async () => {
      const supabase = createClient()
      const { data } = await supabase.auth.getSession()

      if (!data.session) {
        router.push("/login")
      }

      const { data: user } = await supabase.from("users").select().single()
      setUser(user)
    }

    enforceAuth()
  }, [])

  if (!user) return <main></main>

  return (
    <main>
      <HomeHeader user={user.username} />

      <div className="user-container">Minu kasutaja</div>
      <div className="email-container">
        <label htmlFor="email">E-posti aadress</label>
        <input
          id="email"
          type="text"
        />
      </div>
      <div className="firstname-container">
        <label htmlFor="firstname">Eesnimi</label>
        <input
          id="firstname"
          type="text"
        />
      </div>
      <div className="lastname-container">
        <label htmlFor="lastname">Eesnimi</label>
        <input
          id="lastname"
          type="text"
        />
      </div>
      <div className="savedNews">Minu salvestatud Uudised:</div>
      <div className="myComments">Minu kommentaarid:</div>
      <button id="change_password">Muuda oma parooli</button>
      <button id="delete_user">Kustuta kasutaja</button>
    </main>
  )
}
