"use client"

export default function DeleteConfirmationButton({
  bg_id,
  confirm_box_id
}: {
  bg_id: string
  confirm_box_id: string
}) {
  return (
    <button
      type="button"
      onClick={() => {
        const bg = document.getElementById(bg_id)
        const confirmBox = document.getElementById(confirm_box_id)

        bg!.style.display = "block"
        confirmBox!.style.display = "flex"
      }}
      className="transition ease-in-out p-4 bg-red-700 rounded-xl hover:animate-pulsebright"
    >
      Kustuta oma kasutaja
    </button>
  )
}
