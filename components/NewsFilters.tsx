"use client"

import { NewsDataFilter } from "@/types/NewsDataFilter"
import { Dispatch, SetStateAction, useState } from "react"
import DatePicker from "react-date-picker"
import "react-date-picker/dist/DatePicker.css"
import "react-calendar/dist/Calendar.css"

type ValuePiece = Date | null

type Value = ValuePiece | [ValuePiece, ValuePiece]

export default function NewsFilters({
  filter,
  setFilter
}: {
  filter: NewsDataFilter
  setFilter: Dispatch<SetStateAction<NewsDataFilter>>
}) {
  const [dateFilter, setDateFilter] = useState<[ValuePiece, ValuePiece]>([
    null,
    null
  ])

  const onDateChange = (values: Value) => {
    setDateFilter(values as [ValuePiece, ValuePiece])

    var fromFilter = undefined
    var toFilter = undefined

    if (values) {
      fromFilter = (values as [ValuePiece, ValuePiece])[0]!
      toFilter = (values as [ValuePiece, ValuePiece])[1]!
    }

    const { dateFrom, dateTo, ...rest } = filter

    setFilter({
      dateFrom: fromFilter,
      dateTo: toFilter,
      ...rest
    })
  }

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
          onChange={() => {
            const { todayNews, ...rest } = filter
            setFilter({
              todayNews: !todayNews,
              ...rest
            })
          }}
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
          onChange={() => {
            const { lastSevenDaysNews, ...rest } = filter
            setFilter({
              lastSevenDaysNews: !lastSevenDaysNews,
              ...rest
            })
          }}
        ></input>
      </div>

      <div className="flex gap-8 text-black items-center">
        <p>Ajavahemik:</p>
        <DatePicker
          returnValue="range"
          selectRange
          onChange={onDateChange}
          value={dateFilter}
        />
      </div>
    </div>
  )
}
