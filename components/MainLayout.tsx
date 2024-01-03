import "@/app/globals.css"

export default function MainLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <main className="bg-background text-foreground min-h-screen flex flex-col">
        {children}
      </main>
    </>
  )
}
