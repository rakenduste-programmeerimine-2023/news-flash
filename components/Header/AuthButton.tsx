
import { createClient } from '@/utils/supabase/server'
import Link from 'next/link'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export default async function AuthButton() {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  const {
    data: { user },
  } = await supabase.auth.getUser()

  const signOut = async () => {
    'use server'

    const cookieStore = cookies()
    const supabase = createClient(cookieStore)
    await supabase.auth.signOut()
    return redirect('/login')
  }

  return user ? (
    
    <div className="authButton">
      <a href="/my_profile">Tere tulemast, {user.email}! </a>
      <form action={signOut}>
        <button className=" hover:bg-sky-400 px-4 py-3 bg-sky-600 mx-2 rounded-md no-underline bg-btn-background hover:bg-btn-background-hover"> 
          Logout
        </button>
      </form>
    </div>
  ) : (
    <Link
      href="/login"
      className="hover:bg-sky-400 px-4 py-3 bg-sky-600 mx-2 authButton flex rounded-md no-underline bg-btn-background hover:bg-btn-background-hover"
    >
      Login
    </Link>
  )
}
