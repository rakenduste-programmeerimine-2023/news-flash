"use client"

import { NewsFlashComment } from "@/types/NewsFlashComment"
import {
  constructDateAndTime,
  constructDateFromTimestamptz
} from "@/utils/util"

export default function Comment({
  comment,
  key,
  articleLink = false
}: {
  comment: NewsFlashComment
  key: any
  articleLink?: boolean
}) {
  const date = constructDateFromTimestamptz(comment.created_at)

  return (
    <div
      className="bg-slate-300 rounded-xl px-4 py-4 text-black"
      key={key}
    >
      <p className="font-bold">{comment.users.username}</p>
      <p className="text-xs">{constructDateAndTime(date)}</p>
      <p className="my-3">{comment.content}</p>
      {articleLink && (
        <a
          className="transition ease-in-out ml-3 text-blue-600 underline hover:text-blue-400"
          href={`/article/${comment.article_id}`}
        >
          Artikli juurde
        </a>
      )}
    </div>
  )
}
