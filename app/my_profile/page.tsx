import HomeHeader from '@/components/Header/HomeHeader'
import AuthButton from '@/components/Header/AuthButton'
import { cookies } from "next/headers"
import { createClient } from "@/utils/supabase/server"
import { redirect } from "next/navigation"

import Link from 'next/link'
export default async function changeUser({
  searchParams
}: {
  searchParams: { message: string }
}) {

  const cookieStore = cookies()
  const supabase = createClient(cookieStore)
  const {
    data: { user },
  } = await supabase.auth.getUser()
  
  const deleteUser = async () => {
    "use server"
    const cookieStore = cookies()
    
    const supabase = createClient(cookieStore)
 /*   const {
      data: { user },
    } = await supabase.auth.getUser()
*/
    const { data, error } = await supabase.auth.admin.deleteUser(
      "08011425-753e-4e84-94a2-12be3782d4ba"
     /*user.id */
    )
    /*await supabase.auth.signOut()*/
    if (data) return redirect("/?message=Kasutaja kustutatud")
    if (error) return redirect("/my_profile?message=Tekkis viga kasutaja kustutamisel")

  }

  const updateUser = async (formData: FormData) => {
    "use server"
    const cookieStore = cookies()
    const supabase = createClient(cookieStore)
    const {
      data: { user },
    } = await supabase.auth.getUser()
    const firstname = formData.get("firstname") as string
    const lastname = formData.get("lastname") as string
    const { data, error } = await supabase
      .from('users')
      .insert([
        {id: /*user ?.id*/ "08011425-753e-4e84-94a2-12be3782d4ba", firstname: firstname, lastname: lastname }
      ])

    if (data) return redirect("/my_profile?message=User updated")
    if (error) return redirect("/my_profile?message=Tekkis viga andmete lisamisel")

  }
  const updateEmail = async (formData: FormData) => {
    "use server"
    const cookieStore = cookies()
    const supabase = createClient(cookieStore)
    const email = formData.get("email") as string
    const { data, error } = await supabase.auth.updateUser({ email: email })
    if (data) return redirect("/my_profile?message=Jälgi saadetud emaili juhiseid (võib olla spam folderis)")
    if (error) return redirect("/my_profile?message=Sellist emaili ei eksisteeri")


  }

  return user ? (
    <main>
      <HomeHeader />
      <AuthButton />

      <div className="user-container">
        Minu kasutaja
      </div>
      <form action={updateEmail}>
        <div className="email-container">
          <label htmlFor="email">E-posti aadress</label>
          <input  placeholder= {user.email} required name="email" id="email" type="text" />

        </div>
        <button id="change_email_btn" className="bg-green-700 rounded-md px-4 py-2 text-foreground mb-2">
          Vaheta email
        </button>
      </form>
      <form action={updateUser}>
        <div className="firstname-container">
          <label htmlFor="firstname">Eesnimi</label>
          <input required name="firtname" id="firstname" type="text" />
        </div>
        <div className="lastname-container">
          <label htmlFor="lastname">Perekonnanimi</label>
          <input required name="lastname" id="lastname" type="text" />
        </div>
        <button id="update_user" className="bg-green-700 rounded-md px-4 py-2 text-foreground mb-2">
          Lisa andmed
        </button>
        {searchParams?.message && (
          <p className="mt-4 p-4 bg-foreground/10 text-foreground text-center">
            {searchParams.message}
          </p>
        )}
      </form>
      <div className="savedNews">Minu salvestatud Uudised:</div>
      <div className="myComments">Minu kommentaarid:</div>
      <a href="/changePassword" id="change_password" className="bg-green-700 rounded-md">Muuda oma parooli</a>
      <form action={deleteUser}>
      <button className="bg-red-700 rounded-md px-4 py-2 text-foreground mb-2" id="delete_user">Kustuta kasutaja</button>
      
      </form>
      
    </main>

  ) : (
    <Link
      href="/login"
      className="hover:bg-sky-400 px-4 py-3 bg-sky-600 mx-2 authButton flex rounded-md no-underline bg-btn-background hover:bg-btn-background-hover"
    >
      Login
    </Link>
  )
}