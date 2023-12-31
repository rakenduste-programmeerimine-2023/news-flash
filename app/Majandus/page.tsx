import HomeHeader from "@/components/HomeHeader"
import NewsArticlesMajandus from "@/components/NewsArticlesMajandus"
import NewsSideFilters from "@/components/NewsSideFilters"

export default function Majandus() {
  return (
    <main>
      <HomeHeader />

      <div className="flex flex-1 pt-8 w-[93%] mx-auto gap-10">
        <NewsSideFilters />
        <NewsArticlesMajandus />
      </div>
    </main>
  )
}