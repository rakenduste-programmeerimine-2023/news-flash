import AuthButton from '@/components/Header/AuthButton'
import NewsPage from "@/components/News/NewsPage"

export default function Sport() {
  return (
    <>
      <NewsPage fetchProps={{ category: "sports" }} />
      <AuthButton />
    </>
  )
}
