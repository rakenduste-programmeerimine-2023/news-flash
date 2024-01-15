import { Dispatch, SetStateAction } from "react"
import NewsFilters from "./NewsFilters"
import NewsSearchbar from "./NewsSearchbar"
import { NewsDataFilter } from "@/types/NewsDataFilter"

export default function NewsSideFilters({
  filter,
  setFilter
}: {
  filter: NewsDataFilter
  setFilter: Dispatch<SetStateAction<NewsDataFilter>>
}) {
  return (
    <>
      <NewsSearchbar />

      <div className="bg-slate-300 rounded-xl px-4 py-4">
        <NewsFilters
          filter={filter}
          setFilter={setFilter}
        />
      </div>
    </>
  )
}
