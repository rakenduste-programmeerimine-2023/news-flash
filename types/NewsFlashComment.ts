export type NewsFlashComment = {
  id: number
  article_id: string
  content: string
  created_at: string
  commenter_uuid: string
  users: {
    id: string
    username: string
  }
}
