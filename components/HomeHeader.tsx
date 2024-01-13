"use client"

import Link from "next/link"
import { createClient } from "@/utils/supabase/client"
import { useRouter } from "next/navigation"

function NavLink(props: { link: string }) {
  return (
    <Link
      className="hover:bg-red-700 px-4 py-3 bg-red-900 mx-2 rounded-lg"
      href={props.link.toLowerCase()}
    >
      {props.link}
    </Link>
  )
}

function NewsFlashLogo() {
  return (
    <div>
      <Link
        href="/"
        className="font-bold text-4xl"
      >
        NewsFlash
      </Link>
    </div>
  )
}

function NavigationBar() {
  return (
    <div>
      <NavLink link="Majandus" />
      <NavLink link="Sport" />
      <NavLink link="Maailm" />
      <NavLink link="Poliitika" />
      <NavLink link="Teadus" />
    </div>
  )
}

export default function HomeHeader({ user }: { user?: string }) {
  const router = useRouter()

  const handleLogOut = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()

    router.replace("/login")
  }

  const loginObject =
    user === undefined ? (
      <Link
        className="hover:bg-sky-400 px-4 py-3 bg-sky-600 mx-2 rounded-lg"
        href="/login"
      >
        Logi sisse
      </Link>
    ) : (
      <div>
        <Link
          className="hover:bg-sky-400 px-4 py-3 bg-sky-600 mx-2 rounded-lg"
          href="/my_profile"
        >
          Tere tulemast, {user}
        </Link>
        <button
          className="hover:bg-sky-400 px-4 py-3 bg-sky-600 mx-2 rounded-lg"
          onClick={handleLogOut}
        >
          Logi välja
        </button>
      </div>
    )

  return (
    <nav className="py-8 flex flex-wrap gap-8 items-center justify-between w-[93%] mx-auto">
      <NewsFlashLogo />
      <NavigationBar />
      <div>{loginObject}</div>
    </nav>
  )
}
