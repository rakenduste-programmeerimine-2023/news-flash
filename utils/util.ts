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

/**
 * Formats a Date object into an Estonian date representation string.
 * @param date The date to format from.
 * @returns The formatted Estonian string of the supplied date
 */
export const constructDate = (date: Date) => {
  const monthNames = [
    "jaanuar",
    "veebruar",
    "märts",
    "aprill",
    "mai",
    "juuni",
    "juuli",
    "august",
    "september",
    "oktoober",
    "november",
    "detsember"
  ]

  return `${date.getDate()}. ${
    monthNames[date.getMonth()]
  } ${date.getFullYear()}`
}

/**
 * Formats a Date object into an Estonian time representation string.
 * @param date The date to format from.
 * @returns The formatted Estonian string of the supplied date's time
 */
export const constructTime = (date: Date) => {
  const hours = date.getHours().toString().padStart(2, "0")
  const minutes = date.getMinutes().toString().padStart(2, "0")

  return `${hours}:${minutes}`
}

/**
 * Formats a Date object into an Estonian date and time representation string.
 * @param date The date to format from.
 * @returns The formatted Estonian string of the supplied date's date and time
 */
export const constructDateAndTime = (date: Date) => {
  return `${constructDate(date)}, ${constructTime(date)}`
}

/**
 * Constructs a Date object from the given timestamptz string.
 * @param timestamptz The date representation in timestamptz format.
 * @returns A new Date object
 */
export const constructDateFromTimestamptz = (timestamptz: string) => {
  // find the index of where the microseconds and timezone start, we don't need those
  const cutIndex = timestamptz.lastIndexOf(".")

  // convert to proper date representation string
  const dateString = timestamptz.substring(0, cutIndex)

  return new Date(dateString)
}
