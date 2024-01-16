"use client"

import { NewsDataEntry } from "@/types/NewsData"
import Image from "next/image"

export default function Article({ article }: { article: NewsDataEntry }) {
  const descriptionElement =
    article.description === null ? (
      <p className="text-justify italic">Kirjeldus puudub.</p>
    ) : (
      <p className="text-justify">{article.description}</p>
    )

  return (
    <div
      className="flex p-2 gap-4 bg-slate-200 text-black border-4 border-slate-400 rounded-lg mr-2"
      key={article.article_id}
    >
      <div className="relative min-w-[200px] w-[200px] h-full mt-1">
        <a href={`article/${article.article_id}`}>
          <Image
            src={article.image_url}
            alt="artikli pilt"
            width={200}
            height={200}
            style={{ objectFit: "contain", overflow: "hidden" }}
            className="rounded-md"
            priority
          />
        </a>
      </div>

      <div className="flex flex-col gap-2">
        <a
          href={`article/${article.article_id}`}
          className="transition ease-in-out font-bold hover:text-blue-500"
        >
          {article.title}
        </a>
        {descriptionElement}
      </div>
    </div>
  )
}
