
/*"use client"*/
import AuthButton from '../components/Header/AuthButton'
import NewsPage from "@/components/News/NewsPage"

export default function Home() {
  return (
    <>

      <div className="w-full max-w-4xl flex justify-between items-center p-3 text-sm">
        <AuthButton />
      </div>
      <NewsPage fetchProps={{}} />

    </>
  )
}
