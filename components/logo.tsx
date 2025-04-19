"use client"

export default function Logo() {
  return (
    <div className="flex items-center gap-2">
      <div className="w-8 h-8 flex items-center justify-center bg-[#00e6a1] rounded-lg">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="3" y="3" width="18" height="18" rx="3" fill="#00e6a1" stroke="white" strokeWidth="1.5" />
          <path d="M16 8H8V10H16V8Z" fill="white" />
          <path d="M16 11.5H8V13.5H16V11.5Z" fill="white" />
          <path d="M16 15H8V17H16V15Z" fill="white" />
        </svg>
      </div>
      <span className="text-xl font-bold text-[#00e6a1] dark:text-white">Freelify</span>
    </div>
  )
}
