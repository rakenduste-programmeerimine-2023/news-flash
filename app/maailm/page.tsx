
import AuthButton from "@/components/Header/AuthButton"
import NewsPage from "@/components/News/NewsPage"


export default function Maailm() {
  return (
    <>
      <NewsPage fetchProps={{ category: "world" }} />

      <AuthButton />


    </>
  )
}