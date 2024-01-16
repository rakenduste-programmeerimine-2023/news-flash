"use client"

type DeleteActionFunc = (formData: FormData) => void

export default function DeleteConfirmationBox({
  bg_id,
  confirm_box_id,
  actionFunc
}: {
  bg_id: string
  confirm_box_id: string
  actionFunc: DeleteActionFunc
}) {
  return (
    <div
      className="fixed hidden h-screen w-screen z-[3] items-center justify-center"
      id={confirm_box_id}
    >
      <form
        className="flex flex-col w-96 h-32 bg-slate-300 p-4 gap-2 items-center justify-center rounded-xl"
        action={actionFunc}
      >
        <p className="text-black">Kas olete kindel?</p>
        <div>
          <button
            type="submit"
            className="transition ease-in-out p-2 bg-green-500 rounded-xl m-2 hover:bg-green-400"
          >
            Jah
          </button>
          <button
            type="button"
            className="transition ease-in-out py-2 px-[0.8rem] bg-red-700 rounded-xl m-2 hover:bg-red-600"
            onClick={() => {
              const bg = document.getElementById(bg_id)
              const confirmBox = document.getElementById(confirm_box_id)

              bg!.style.display = "none"
              confirmBox!.style.display = "none"
            }}
          >
            Ei
          </button>
        </div>
      </form>
    </div>
  )
}
