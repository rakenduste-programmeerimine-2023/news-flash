import AuthButton from '@/components/Header/AuthButton'
import NewsPage from "@/components/News/NewsPage"

export default function Poliitika() {
  return (
    <>
      <NewsPage fetchProps={{ category: "politics" }} />
      <AuthButton />
    </>
  )
}