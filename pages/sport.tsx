import HomeHeader from "@/components/HomeHeader"
import NewsArticlesSport from "@/components/NewsArticlesSport"
import NewsSideFilters from "@/components/NewsSideFilters"
import MainLayout from "@/components/MainLayout"

export default function Sport() {
  return (
    <MainLayout>
      <HomeHeader />

      <div className="flex flex-1 pt-8 w-[93%] mx-auto gap-10">
        <NewsSideFilters />
        <NewsArticlesSport />
      </div>
    </MainLayout>
  )
}
