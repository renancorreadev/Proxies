import Link from 'next/link'
import React from 'react'

export const Header = () => {
  return (
    <div className="dark flex items-center justify-between bg-gray-800 px-6 py-4 text-white">
      <Link className="flex items-center space-x-2" href="#">
        <span className="text-lg font-semibold">RewardsApp</span>
      </Link>
      <nav className="hidden space-x-6 lg:flex">
        <Link className="text-sm font-medium hover:underline" href="#">
          Home
        </Link>
        <Link className="text-sm font-medium hover:underline" href="#">
          Rewards
        </Link>
        <Link className="text-sm font-medium hover:underline" href="#">
          My Account
        </Link>
        <Link className="text-sm font-medium hover:underline" href="#">
          Contact
        </Link>
      </nav>
      <div className="ml-auto">
        <Button />
      </div>
    </div>
  )
}

const Button = () => {
  return <button className="border-white text-white">Login / Sign Up</button>
}
