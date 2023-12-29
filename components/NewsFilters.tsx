export default function NewsFilters() {
  return (
    <div className="flex flex-col gap-2">
      <div>
        <label
          htmlFor="date_checkboxDay"
          className="text-black"
        >
          Tänased uudised
        </label>
        <input
          className="mx-2"
          type="checkbox"
          id="date_checkboxDay"
          name="date_checkboxDay"
          value="day"
        ></input>
      </div>
      <div>
        <label
          htmlFor="date_checkboxWeek"
          className="text-black"
        >
          Viimase 7 päeva uudised
        </label>
        <input
          className="mx-2"
          type="checkbox"
          id="date_checkboxWeek"
          name="date_checkboxWeek"
          value="week"
        ></input>
      </div>

      <div className="flex gap-8">
        <input
          className="w-20 text-black pl-1"
          id="searchbarFrom"
          type="text"
          placeholder="Alates"
        ></input>

        <input
          className="w-20 text-black pl-1"
          id="searchbarUntil"
          type="text"
          placeholder="Kuni"
        ></input>
      </div>
    </div>
  )
}
