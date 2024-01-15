"use client"

import Link from "next/link"
import Image from "next/image"
import { createClient } from "@/utils/supabase/client"
import { useRouter } from "next/navigation"

function NavLink(props: { link: string }) {
  return (
    <Link
      className="transition ease-in-out hover:bg-red-700 px-4 py-3 bg-red-900 mx-2 rounded-lg"
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
        className="font-bold text-4xl hover:animate-[pulse_1s_ease-in-out_infinite]"
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
        className="transition ease-in-out hover:bg-sky-400 px-4 py-3 bg-sky-600 mx-2 rounded-lg"
        href="/login"
      >
        Logi sisse
      </Link>
    ) : (
      <div className="flex">
        <Link
          className="transition ease-in-out inline-flex gap-1 hover:bg-sky-400 px-4 py-3 bg-sky-600 mx-2 rounded-lg"
          href="/my_profile"
        >
          <Image
            src="/icons8-user-96.png"
            width={24}
            height={24}
            alt="usericon"
          />
          <p className="font-semibold">{user}</p>
        </Link>
        <button
          className="transition ease-in-out hover:bg-sky-400 px-4 py-3 bg-sky-600 mx-2 rounded-lg"
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
      {loginObject}
    </nav>
  )
}
