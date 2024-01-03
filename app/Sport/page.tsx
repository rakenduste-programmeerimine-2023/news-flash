import HomeHeader from "@/components/HomeHeader"
import NewsArticlesSport from "@/components/NewsArticlesSport"
import NewsSideFilters from "@/components/NewsSideFilters"

export default function Sport() {
  return (
    <main>
      <HomeHeader />

      <div className="flex flex-1 pt-8 w-[93%] mx-auto gap-10">
        <NewsSideFilters />
        <NewsArticlesSport />
      </div>
    </main>
  )
}