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
import {
  checkStoredArticleData,
  fetchArticleData,
  getCurrentUser
} from "@/utils/util"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState, useLayoutEffect } from "react"
import { createClient } from "@/utils/supabase/client"
import { NewsFlashUser } from "@/types/NewsFlashUser"
import { NewsFlashComment } from "@/types/NewsFlashComment"
import { useRouter, useSearchParams } from "next/navigation"

export default function ArticlePage({ params }: { params: { id: string } }) {
  const [articleExists, setArticleExists] = useState(false)
  const [loadingArticle, setLoadingArticle] = useState(true)
  const [loadingUser, setLoadingUser] = useState(true)
  const [user, setUser] = useState<NewsFlashUser>()
  const [comments, setComments] = useState<NewsFlashComment[]>()
  const supabase = createClient()
  const searchParams = useSearchParams()
  const router = useRouter()

  const handleComments = () => {
    return comments?.map((comment, index) => {
      return (
        <div
          className="bg-slate-300 rounded-xl px-4 py-4 w-[70%] text-black"
          key={index}
        >
          <p>{comment.users.username}</p>
          <p>{comment.content}</p>
        </div>
      )
    })
  }

  const handleSavingArticle = async () => {
    const button = document.getElementById("save_article_button")
    if (!button) return

    const { data, error: selectError } = await supabase
      .from("saved_articles")
      .select()
      .eq("article_id", params.id)
      .single()

    if (selectError?.code === "42501") {
      router.push(`/article/${params.id}?message=Te ei ole sisse logitud.`)
      return
    }

    if (data) {
      button.innerHTML = "Uudis on juba salvestatud!"
      setTimeout(() => {
        button.innerHTML = "Salvesta uudis"
      }, 3000)
      return
    }

    const { error } = await supabase
      .from("saved_articles")
      .insert({ article_id: params.id })

    if (error?.code === "42501") {
      router.push(`/article/${params.id}?message=Te ei ole sisse logitud.`)
      return
    }

    button.innerHTML = "Uudis salvestatud!"
    setTimeout(() => {
      button.innerHTML = "Salvesta uudis"
    }, 3000)
  }

  useLayoutEffect(() => {
    const updateUser = async () => {
      const user = await getCurrentUser(supabase)
      if (user) {
        setUser(user)
      }

      setLoadingUser(false)
    }

    updateUser()
  }, [])

  useEffect(() => {
    const fetchComments = async () => {
      const { data } = await supabase
        .from("comments")
        .select("content, users(id, username)")
        .eq("article_id", params.id)
      setComments(data as unknown as NewsFlashComment[])
    }

    setArticleExists(checkStoredArticleData(params.id))
    setLoadingArticle(false)
    fetchComments()
  }, [])

  if (loadingUser) {
    return <main />
  }

  if (loadingArticle) {
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

      {searchParams.get("message") && (
        <p className="text-center text-red-600 italic">
          {searchParams.get("message")}
        </p>
      )}

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

          <button
            className="hover:bg-red-700 px-4 py-3 bg-red-900 mx-2 rounded-lg"
            onClick={handleSavingArticle}
            id="save_article_button"
          >
            Salvesta uudis
          </button>
        </div>

        <div className="relative w-full h-[500px]">
          <Image
            src={article.image_url}
            alt="artikli pilt"
            fill
            style={{ objectFit: "contain" }}
            priority
          />
        </div>

        <p className="w-[70%]">{article.content}</p>

        <p className="text-3xl w-[70%]">Kommentaarid:</p>

        {comments?.length !== 0 ? (
          handleComments()
        ) : (
          <div className="bg-slate-300 rounded-xl px-4 py-4 w-[70%]">
            <p className="italic text-black">Kommentaarid puuduvad.</p>
          </div>
        )}
      </div>
    </main>
  )
}
