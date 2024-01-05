"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"

export default function NewsSearchbar() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")

  const handleQuery = () => {
    if (searchQuery) router.push(`/?q=${searchQuery}`)
    else router.push("/")
  }

  return (
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
        onKeyDown={e => {
          if (e.key === "Enter") handleQuery()
        }}
        onChange={e => setSearchQuery(e.target.value)}
      />
    </div>
  )
}
