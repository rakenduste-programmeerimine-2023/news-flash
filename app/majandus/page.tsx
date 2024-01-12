
import AuthButton from "@/components/Header/AuthButton"
import NewsPage from "@/components/News/NewsPage"

export default function Majandus() {
  return (
    <>
      <NewsPage fetchProps={{ category: "business" }} />

      <AuthButton />

    </>
  )
}
