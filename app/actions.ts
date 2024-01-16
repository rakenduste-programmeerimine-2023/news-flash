"use server"

import { createClient } from "@/utils/supabase/server"
import { getCurrentUser } from "@/utils/util"
import { createClient as supabaseCreateClient } from "@supabase/supabase-js"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export async function changePasswordAction(formData: FormData) {
  const supabase = createClient(cookies())
  const password = formData.get("password") as string
  const confirmPassword = formData.get("confirm_password") as string

  if (password !== confirmPassword) {
    redirect("/my_profile?e=Paroolid ei klapi.")
  }

  const { error } = await supabase.auth.updateUser({ password: password })

  if (error) {
    redirect(`/my_profile?e=${error.message}`)
  }

  redirect("/my_profile?m=Parool muudetud!")
}

export async function deleteUserAction(formData: FormData) {
  const supabaseURL = process.env.NEXT_PUBLIC_SUPABASE_URL!
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

  const authSupabase = supabaseCreateClient(supabaseURL, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  })

  const supabase = createClient(cookies())

  const user = await getCurrentUser(supabase)

  const { error } = await supabase.auth.signOut()

  if (error) {
    redirect(`/my_profile?e=${error.message}`)
  }

  const { error: deleteError } = await authSupabase.auth.admin.deleteUser(
    user!.id
  )

  if (deleteError) {
    redirect(`/my_profile?e=${deleteError.message}`)
  }

  redirect("/login?message=Teie kasutaja on kustutatud.")
}
