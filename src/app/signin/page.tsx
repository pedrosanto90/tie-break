'use client'

import { useState } from "react"

export default function SignIn() {
  const [error, setError] = useState('')
  const handleSubmit = () => {
    console.log('submit')
  }
  return (
    <>
      <div className='flex flex-col items-center justify-center border-blue-200 border-1 shadow-2xl rounded-lg mt-10 w-[400px] mx-auto p-2'>
        <h1 className='text-2xl mb-5'>Login to your Account</h1>
        <p className='text-red-500 mb-3'>{error}</p>
        <form onSubmit={handleSubmit} className='flex flex-col items-center justify-center'>
          <p className='self-start text-sm mb-2'>Email</p>
          <input name='email' type="email" placeholder="Email" className="mb-4 w-full p-2 border rounded" />
          <p className='self-start text-sm mb-2'>Password</p>
          <input name='password' type="password" placeholder="Password" className="mb-4 w-full p-2 border rounded" />
          <button type="submit" className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition">
            Login
          </button>
        </form>
      </div>
    </>
  )
}
