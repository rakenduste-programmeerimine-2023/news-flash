import NewsFilters from "./NewsFilters"
import NewsSearchbar from "./NewsSearchbar"

export default function NewsSideFilters() {
  return (
    <div className="flex flex-col gap-4">
      <NewsSearchbar />

      <div className="bg-slate-300 rounded-xl px-4 py-4">
        <NewsFilters />
      </div>
    </div>
  )
}
