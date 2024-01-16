"use client"

import HomeHeader from "@/components/HomeHeader"
import { createClient } from "@/utils/supabase/client"
import { fetchArticleData, getCurrentUser } from "@/utils/util"
import DeleteConfirmationBox from "@/components/DeleteConfirmationBox"
import DeleteConfirmationButton from "@/components/DeleteConfirmationButton"
import ChangePasswordBox from "@/components/ChangePasswordBox"
import ChangePasswordButton from "@/components/ChangePasswordButton"
import { changePasswordAction, deleteUserAction } from "../actions"
import ConfirmationBox from "@/components/ConfirmationBox"
import Article from "@/components/Article"
import { useLayoutEffect, useState } from "react"
import { NewsFlashUser } from "@/types/NewsFlashUser"
import Comment from "@/components/Comment"
import { NewsFlashComment } from "@/types/NewsFlashComment"

export default function MyProfile({
  searchParams
}: {
  searchParams: { e: string; m: string }
}) {
  const supabase = createClient()
  const [user, setUser] = useState<NewsFlashUser>()
  const [loadingUser, setLoadingUser] = useState(true)
  const [articles, setArticles] = useState<JSX.Element[]>()
  const [comments, setComments] = useState<JSX.Element[]>()

  useLayoutEffect(() => {
    const getComments = async (user: NewsFlashUser) => {
      const { data } = await supabase
        .from("comments")
        .select("article_id, created_at, content, users(id, username)")
        .eq("commenter_uuid", user!.id)

      if (data?.length === 0) {
        setComments([
          <p className="text-center italic">Kommentaarid puuduvad.</p>
        ])
        return
      }

      const comments = data?.map((value, index) => {
        return (
          <Comment
            comment={value as unknown as NewsFlashComment}
            key={index}
            articleLink
          />
        )
      })

      setComments(comments)
    }

    const updateUser = async () => {
      const user = await getCurrentUser(supabase)
      if (user) {
        setUser(user)
        getComments(user)
      }

      setLoadingUser(false)
    }

    const getSavedArticles = async () => {
      const { data } = await supabase.from("saved_articles").select()

      if (data?.length === 0) {
        setArticles([
          <p className="text-center italic">Salvestatud uudised puuduvad.</p>
        ])
        return
      }

      const articles = data?.map(value => {
        const articleID = value.article_id
        const articleData = fetchArticleData(articleID)

        if (!articleData) return <></>

        return <Article article={articleData} />
      })
      setArticles(articles)
    }

    updateUser()
    getSavedArticles()
  }, [])

  if (loadingUser) return <></>

  const bgId = "half-opacity-bg"
  const deleteConfirmBoxId = "delete_confirmation"
  const changePasswordBoxId = "change_password_box"
  const confirmBoxId = "confirm_box"

  const anySearchParams =
    searchParams?.e !== undefined || searchParams?.m !== undefined

  return (
    <main>
      <div
        className="fixed h-screen w-screen z-[2] bg-black opacity-50 hidden"
        id={bgId}
      ></div>

      {anySearchParams ? (
        <></>
      ) : (
        <>
          <DeleteConfirmationBox
            bg_id={bgId}
            confirm_box_id={deleteConfirmBoxId}
            actionFunc={deleteUserAction}
          />

          <ChangePasswordBox
            bg_id={bgId}
            password_box_id={changePasswordBoxId}
            actionFunc={changePasswordAction}
          />
        </>
      )}

      {searchParams?.e && (
        <ConfirmationBox
          bg_id={bgId}
          confirm_box_id={confirmBoxId}
          message={searchParams.e}
          error
        />
      )}

      {searchParams?.m && (
        <ConfirmationBox
          bg_id={bgId}
          confirm_box_id={confirmBoxId}
          message={searchParams.m}
        />
      )}

      {/* actual page content starts from here */}

      <HomeHeader user={user!.username} />

      <div className="flex">
        <div className="flex flex-col gap-8 w-[50vw] items-center justify-center text-xl">
          <div className="text-2xl">
            <p>
              <b>Kasutajanimi:</b> {user?.username}
            </p>
            <p>
              <b>Eesnimi:</b> {user?.first_name}
            </p>
            <p>
              <b>Perekonnanimi:</b> {user?.last_name}
            </p>
            <p>
              <b>E-post:</b> {user?.email}
            </p>
          </div>

          <ChangePasswordButton
            bg_id={bgId}
            password_box_id={changePasswordBoxId}
          />
          <DeleteConfirmationButton
            bg_id={bgId}
            confirm_box_id={deleteConfirmBoxId}
          />
        </div>

        <div className="flex flex-col w-[50vw] items-center gap-4">
          <p className="text-2xl font-bold">Minu salvestatud uudised:</p>
          <div className="flex flex-col gap-4 p-4 w-[95%] h-96 overflow-hidden overflow-y-scroll mb-8 rounded-xl">
            {articles}
          </div>
          <p className="text-2xl font-bold">Minu kommentaarid:</p>
          <div className="flex flex-col gap-4 p-4 w-[95%] h-80 overflow-hidden overflow-y-scroll rounded-xl">
            {comments}
          </div>
        </div>
      </div>
    </main>
  )
}
