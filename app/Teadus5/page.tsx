import HomeHeader from "@/components/HomeHeader"
import NewsArticles from "@/components/NewsArticles"
import NewsSideFilters from "@/components/NewsSideFilters"
import { fetchNews } from "@/utils/newsdata/api"

export default async function Teadus() {
  const news = await fetchNews("science")

  return (
    <main>
      <HomeHeader />

      <div className="flex flex-1 pt-8 w-[93%] mx-auto gap-10">
        <NewsSideFilters />
        <NewsArticles news={news} />
      </div>
    </main>
  )
}