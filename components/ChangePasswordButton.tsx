"use client"

export default function ChangePasswordButton({
  bg_id,
  password_box_id
}: {
  bg_id: string
  password_box_id: string
}) {
  return (
    <button
      type="button"
      onClick={() => {
        const bg = document.getElementById(bg_id)
        const confirmBox = document.getElementById(password_box_id)

        bg!.style.display = "block"
        confirmBox!.style.display = "flex"
      }}
      className="transition ease-in-out p-4 bg-cyan-600 rounded-xl hover:bg-cyan-500"
    >
      Muuda parooli
    </button>
  )
}
