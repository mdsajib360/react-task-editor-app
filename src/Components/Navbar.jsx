import React from 'react'

const Navbar = () => {
    return (
        
      <nav className="bg-gray-900 text-gray-100 shadow-md flex justify-between py-2 mb-5">
          <div className="logo mx-8">
              <span className="font-bold text-xl ">iTask</span>
          </div>
          <ul className="nav-items flex gap-8 mx-9 ">
              <li className="cursor-pointer hover:font-bold transition-all">Home</li>
              <li className="cursor-pointer hover:font-bold transition-all">Your Tasks</li>
          </ul>
    </nav>
        
  )
}

export default Navbar