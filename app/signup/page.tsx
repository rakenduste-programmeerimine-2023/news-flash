import Link from "next/link"
import { headers, cookies } from "next/headers"
import { createClient } from "@/utils/supabase/server"
import { redirect } from "next/navigation"

export default function Signup({
  searchParams
}: {
  searchParams: { message: string }
}) {
  const signUp = async (formData: FormData) => {
    "use server"

    const origin = headers().get("origin")

    const username = formData.get("username") as string
    const firstName = formData.get("firstname") as string
    const lastName = formData.get("lastname") as string
    const email = formData.get("email") as string
    const password = formData.get("password") as string

    firstName.trim()
    lastName.trim()
    email.trim()
    username.trim()

    const cookieStore = cookies()
    const supabase = createClient(cookieStore)

    const { data: userEmail, error: userError } = await supabase
      .from("users")
      .select()
      .eq("email", email)
      .single()

    if (userError) {
      console.log(userError)
    }

    if (userEmail) {
      // if account with this email already exists
      return redirect(
        "/signup?message=An account with this email already exists"
      )
    }

    const { data: userUsername, error: userUsernameError } = await supabase
      .from("users")
      .select()
      .eq("username", username)
      .single()

    if (userUsernameError) {
      console.log(userUsernameError)
    }

    if (userUsername) {
      // if account with this username already exists
      return redirect(
        "/signup?message=An account with this username already exists"
      )
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${origin}/auth/callback`
      }
    })

    if (error) {
      return redirect(`/signup?message=${error.message}`)
    }

    const { error: insertError } = await supabase.from("users").insert({
      id: data.user?.id,
      username: username,
      first_name: firstName,
      last_name: lastName,
      email: email
    })

    if (insertError) {
      console.log(insertError)
    }

    return redirect("/login?message=Check email to continue sign up process")
  }

  return (
    <header className="min-h-screen flex flex-col items-center">
      <div className="flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2">
        <Link
          href="/login"
          className="absolute left-8 top-8 py-2 px-4 rounded-md no-underline text-foreground bg-btn-background hover:bg-btn-background-hover flex items-center group text-sm"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1"
          >
            <polyline points="15 18 9 12 15 6" />
          </svg>{" "}
          Back
        </Link>

        <form
          className="animate-in flex-1 flex flex-col w-full justify-center gap-2 text-foreground"
          action={signUp}
        >
          <label
            className="text-md"
            htmlFor="firstname"
          >
            First name
          </label>
          <input
            className="rounded-md px-4 py-2 bg-inherit border mb-6"
            name="firstname"
            placeholder="First name"
            required
          />

          <label
            className="text-md"
            htmlFor="lastname"
          >
            Last name
          </label>
          <input
            className="rounded-md px-4 py-2 bg-inherit border mb-6"
            name="lastname"
            placeholder="Last name"
            required
          />

          <label
            className="text-md"
            htmlFor="username"
          >
            Username
          </label>
          <input
            className="rounded-md px-4 py-2 bg-inherit border mb-6"
            name="username"
            placeholder="Username"
            required
          />

          <label
            className="text-md"
            htmlFor="email"
          >
            Email
          </label>
          <input
            className="rounded-md px-4 py-2 bg-inherit border mb-6"
            name="email"
            placeholder="you@example.com"
            required
          />
          <label
            className="text-md"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="rounded-md px-4 py-2 bg-inherit border mb-6"
            type="password"
            name="password"
            placeholder="••••••••"
            required
          />
          <button className="bg-green-700 rounded-md px-4 py-2 text-foreground mb-2">
            Sign Up
          </button>
          {searchParams?.message && (
            <p className="mt-4 p-4 bg-foreground/10 text-foreground text-center">
              {searchParams.message}
            </p>
          )}
        </form>
      </div>
    </header>
  )
}
