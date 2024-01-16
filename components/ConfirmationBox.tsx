"use client"

import { useRouter } from "next/navigation"

export default function ConfirmationBox({
  bg_id,
  confirm_box_id,
  message,
  error
}: {
  bg_id: string
  confirm_box_id: string
  message: string
  error?: boolean
}) {
  const router = useRouter()

  const handleClick = () => {
    const bg = document.getElementById(bg_id)
    const confirmBox = document.getElementById(confirm_box_id)

    bg!.style.display = "none"
    confirmBox!.style.display = "none"

    router.push("/my_profile")
  }

  const buttonStyle = error
    ? "transition ease-in-out p-2 bg-red-600 rounded-xl m-2 hover:bg-red-500"
    : "transition ease-in-out p-2 bg-green-500 rounded-xl m-2 hover:bg-green-400"

  return (
    <div
      className="fixed flex h-screen w-screen z-[3] items-center justify-center"
      id={confirm_box_id}
    >
      <div className="flex flex-col w-96 h-32 bg-slate-300 p-4 gap-2 items-center justify-center rounded-xl">
        <p className="text-black">{message}</p>
        <button
          type="button"
          className={buttonStyle}
          onClick={handleClick}
        >
          OK
        </button>
      </div>
    </div>
  )
}
