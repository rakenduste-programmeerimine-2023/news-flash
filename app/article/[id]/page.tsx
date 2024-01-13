/*
Probleem - hetkel on ajutiselt artiklid salvestatud local storage'isse homepage juurest.
NewsData API ei luba teha sellist requesti, kus sa saad välja võtta ainult ühe artikli tema ID järgi.
See tähendab seda, et otse artikli ID kaudu ei saa artiklit näha, kui seda pole homepage genereerinud.

Refactori käigus, siis kui teha tabelid andmebaasi, saab ümber korraldada.
Arvatavasti on vaja teha artiklite tabel ja ka kommentaaride tabel. 
(võimalik et pole vaja isegi artikleid andmebaasi lisada, ainult kommentaarid)
*/

"use client"

import HomeHeader from "@/components/HomeHeader"
import { NewsDataEntry } from "@/types/NewsData"
import { checkStoredArticleData, fetchArticleData } from "@/utils/util"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState, useLayoutEffect } from "react"
import { createClient } from "@/utils/supabase/client"
import { NewsFlashUser } from "@/types/NewsFlashUser"

export default function ArticlePage({ params }: { params: { id: string } }) {
  const [articleExists, setArticleExists] = useState(false)
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<NewsFlashUser>()

  useLayoutEffect(() => {
    const updateUser = async () => {
      const supabase = createClient()
      const { data: user } = await supabase.from("users").select().single()
      setUser(user)
    }

    updateUser()
  }, [])

  useEffect(() => {
    setLoading(false)
    setArticleExists(checkStoredArticleData(params.id))
  }, [])

  if (!user && loading) {
    return <main />
  }

  if (loading) {
    return (
      <main>
        <HomeHeader user={user?.username ? user.username : undefined} />
      </main>
    )
  }

  if (!articleExists) {
    return (
      <main>
        <HomeHeader user={user?.username ? user.username : undefined} />
        <div className="w-full py-8 text-center text-4xl">
          <p>Artiklit ei leitud.</p>
        </div>
      </main>
    )
  }

  const monthNames = [
    "jaanuar",
    "veebruar",
    "märts",
    "aprill",
    "mai",
    "juuni",
    "juuli",
    "august",
    "september",
    "oktoober",
    "november",
    "detsember"
  ]

  const article = fetchArticleData(params.id) as NewsDataEntry
  const releaseDate = new Date(article.pubDate)
  const releaseDateText = `${releaseDate.getDate()}. ${
    monthNames[releaseDate.getMonth()]
  } ${releaseDate.getFullYear()}`

  const releaseTimeText = `${releaseDate.getHours()}:${releaseDate.getMinutes()}`

  return (
    <main>
      <HomeHeader user={user?.username ? user.username : undefined} />

      <div className="flex flex-col py-8 w-[80%] mx-auto gap-10 text-justify items-center">
        <Link
          href={article.link}
          className="text-4xl text-left underline"
          target="_blank"
        >
          {article.title}
        </Link>

        <div className="self-start flex w-full justify-between">
          <div>
            <p>{article.creator}</p>
            <p className="text-xs">{`${releaseDateText}, ${releaseTimeText}`}</p>
          </div>

          <button className="hover:bg-red-700 px-4 py-3 bg-red-900 mx-2 rounded-lg">
            Salvesta uudis
          </button>
        </div>

        <div className="relative w-full h-[500px]">
          <Image
            src={article.image_url}
            alt="artikli pilt"
            fill
            style={{ objectFit: "contain" }}
          />
        </div>

        <p className="w-[70%]">{article.content}</p>

        <p className="text-3xl w-[70%]">Kommentaarid:</p>

        <div className="bg-slate-300 rounded-xl px-4 py-4 w-[70%]">
          <p className="italic text-black">Kommentaarid puuduvad.</p>
        </div>
      </div>
    </main>
  )
}
