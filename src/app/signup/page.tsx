'use client'

import { createUser } from "@/lib/users"
import { useState } from "react";

export default function SignUp() {
  const [error, setError] = useState('')

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const user = {
      full_name: formData.get("full-name"),
      email: formData.get("email"),
      password: formData.get("password"),
      _password: formData.get("confirm_password"),
      birthdate: formData.get("birthdate"),
      role: formData.get("role"),
    };


    if (user.password !== user._password) {
      setError("Passwords doens't match")
      console.log("Passwords doesnt match")
      return
    }
    await createUser(user)

    // Create logic to redirect to login page (or some other page)

  }
  return (
    <div className='flex flex-col items-center justify-center border-blue-200 border-1 shadow-2xl rounded-md mt-10 w-[400px] mx-auto p-2'>
      <h1 className='text-2xl mb-5'>Create Account</h1>
      <p className='text-red-500 mb-3'>{error}</p>
      <form onSubmit={handleSubmit} className='flex flex-col items-center justify-center'>
        <p className='self-start text-sm mb-2'>You are a:</p>
        <select required name="role" id="">
          <option value="organizer">Organizer</option>
          <option value="player">Player</option>
          <option value="" disabled selected hidden>Select</option>
        </select>
        <p className='self-start text-sm mb-2'>Full Name</p>
        <input required name='full-name' type="text" placeholder="Full Name" />
        <p className='self-start text-sm mb-2'>Email</p>
        <input required name='email' type="email" placeholder="Email" />
        <p className='self-start text-sm mb-2'>Password</p>
        <input required name='password' type="password" placeholder="Password" />
        <p className='self-start text-sm mb-2'>Repeat Password</p>
        <input required name='confirm_password' type="password" placeholder="Password" />
        <p className='self-start text-sm mb-2'>Birthdate</p>
        <input required name='birthdate' type="date" />
        <button>Create Account</button>
      </form>
    </div>
  )
}
