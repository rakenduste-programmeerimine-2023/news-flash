export type NewsDataEntry = {
  article_id: string
  title: string
  link: string
  keywords: Array<string>
  creator: Array<string>
  video_url: string | null
  description: string
  content: string
  pubDate: string
  image_url: string
  source_id: string
  source_priority: number
  country: Array<string>
  category: Array<string>
  language: string
}

export interface NewsData {
  status: string // "success" if successful
  totalResults: number
  results: Array<NewsDataEntry>
}
