import HomeHeader from "@/components/HomeHeader"
import NewsArticles from "@/components/NewsArticles"
import NewsSideFilters from "@/components/NewsSideFilters"

export default function Home() {
  return (
    <main>
      <HomeHeader />

      <div className="flex flex-1 pt-8 w-[93%] mx-auto gap-10">
        <NewsSideFilters />
        <NewsArticles />
      </div>
    </main>
  )
}
