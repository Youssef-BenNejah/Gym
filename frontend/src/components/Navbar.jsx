'use client'
export function Navbar() {
  return (
    <header className="h-16 bg-white shadow-sm flex items-center justify-between px-6">
      <h2 className="text-xl font-semibold text-gym-secondary">Dashboard</h2>
      <div className="flex items-center gap-3">
        <span className="font-medium">Ziyed</span>
        <img src="/avatar.png" alt="Admin" className="w-8 h-8 rounded-full border" />
      </div>
    </header>
  )
}
