import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className="fixed top-0 left-0 right-0 z-999 border-b bg-white flex justify-between p-4">
        <h1 className="text-2xl font-bold">CRYPTO</h1>
        <ul className="flex gap-4">
            <li className="text-xl font-bold">
                <Link to="/">Home</Link>
            </li>
            <li className="text-xl font-bold">
                <Link to="/about">About</Link>
            </li>
            <li className="text-xl font-bold">
                <Link to="/contact">Contact</Link>
            </li>
        </ul>
    </div>
  )
}

export default Navbar