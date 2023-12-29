import NewsFilters from "./NewsFilters"

export default function NewsSideFilters() {
  return (
    <div className="flex flex-col gap-4">
      <div className="bg-slate-300 rounded-xl px-4 py-4">
        <label
          htmlFor="searchbar"
          className="pr-2 text-black"
        >
          Otsi:
        </label>
        <input
          className="text-black pl-1"
          id="searchbar"
          type="text"
          placeholder="Märksõna"
        ></input>
      </div>

      <div className="bg-slate-300 rounded-xl px-4 py-4">
        <NewsFilters />
      </div>
    </div>
  )
}
