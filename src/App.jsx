import React from 'react'
import Navbar from './Components/Navbar'
import Todo from './Components/Todo'
const App = () => {


  
  return (
    < >
      <div className='min-h-screen bg-gradient-to-r from-blue-500 to-indigo-500 text-white p-6'>
      <Navbar />
      <Todo />
    </div>

    </>
  )
}

export default App