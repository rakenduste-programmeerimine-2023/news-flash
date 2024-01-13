import { NewsDataEntry } from "@/types/NewsData"
import { NewsFlashUser } from "@/types/NewsFlashUser"
import { SupabaseClient } from "@supabase/supabase-js"

/**
 * Stores article data into local storage.
 * @param article The NewsDataEntry to store
 */
export const storeArticleData = (article: NewsDataEntry) => {
  if (!localStorage[article.article_id]) {
    localStorage.setItem(article.article_id, JSON.stringify(article))
  }
}

/**
 * Get article data from local storage.
 * @param article_id The article ID
 * @returns The NewsDataEntry for the given article ID if successful, undefined otherwise
 */
export const fetchArticleData = (article_id: string) => {
  if (localStorage[article_id]) {
    return JSON.parse(
      localStorage.getItem(article_id) as string
    ) as NewsDataEntry
  } else {
    return undefined
  }
}

/**
 * Check if article data exists in local storage.
 * @param article_id The article ID
 * @returns true if article data is found, otherwise false
 */
export const checkStoredArticleData = (article_id: string) =>
  localStorage[article_id] !== undefined

/**
 * Gets the currently logged in user.
 * @param supabase Supabase client
 * @returns A NewsFlashUser if logged in, otherwise null
 */
export const getCurrentUser = async (supabase: SupabaseClient) => {
  const { data } = await supabase.auth.getUser()
  if (data.user) {
    const { data: user } = await supabase
      .from("users")
      .select()
      .eq("id", data.user.id)
      .single()
    return user as NewsFlashUser
  }

  return null
}
