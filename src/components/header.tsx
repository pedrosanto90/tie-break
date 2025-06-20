import Link from "next/link"

export default function Header() {
  return (
    <div className="flex flex-col items-center justify-center p-5 bg-blue-500">
      <h1 className="text-2xl"><Link href="/">Tie Break 🎾 🥎</Link></h1>
      <p className="mt-2">All about your padel games</p>
    </div>
  )
}
