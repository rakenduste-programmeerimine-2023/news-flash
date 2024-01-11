"use client"

import HomeHeader from "@/components/HomeHeader"

export default function ArticlePage({ params }: { params: { id: string } }) {
  const articleExistsInStorage = sessionStorage[params.id] !== undefined

  // if (!articleExistsInStorage) {
  //   throw Error("Article not found in session storage")
  // }

  return (
    <main>
      <HomeHeader />
      <p>
        Test article {params.id} {articleExistsInStorage ? "true" : "false"}
      </p>
    </main>
  )
}
