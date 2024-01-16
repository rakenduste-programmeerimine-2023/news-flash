"use client"

type PasswordActionFunc = (formData: FormData) => void

export default function ChangePasswordBox({
  bg_id,
  password_box_id,
  actionFunc
}: {
  bg_id: string
  password_box_id: string
  actionFunc: PasswordActionFunc
}) {
  return (
    <div
      className="fixed hidden h-screen w-screen z-[3] items-center justify-center"
      id={password_box_id}
    >
      <form
        className="flex flex-col w-96 bg-slate-300 p-4 gap-2 items-center justify-center rounded-xl"
        action={actionFunc}
      >
        <label className="text-black">Uus parool:</label>
        <input
          type="password"
          className="text-black"
          id="password"
          name="password"
          required
        />

        <label className="text-black">Kinnita parool:</label>
        <input
          type="password"
          name="confirm_password"
          className="text-black border border-transparent"
          onChange={e => {
            const ePassword = document.getElementById(
              "password"
            ) as HTMLInputElement
            const eConfirmPassword = e.target

            if (ePassword.value !== eConfirmPassword.value) {
              eConfirmPassword.style.borderColor = "rgb(239 68 68)"
            } else {
              eConfirmPassword.style.borderColor = "transparent"
            }
          }}
          required
        />

        <div>
          <button
            type="submit"
            className="transition ease-in-out p-3 bg-green-500 rounded-xl m-2 hover:bg-green-400"
          >
            Muuda parool
          </button>
          <button
            type="button"
            className="transition ease-in-out p-3 bg-red-700 rounded-xl m-2 hover:bg-red-600"
            onClick={() => {
              const bg = document.getElementById(bg_id)
              const confirmBox = document.getElementById(password_box_id)

              bg!.style.display = "none"
              confirmBox!.style.display = "none"
            }}
          >
            Tühista
          </button>
        </div>
      </form>
    </div>
  )
}
