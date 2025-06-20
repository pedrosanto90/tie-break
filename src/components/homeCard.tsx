export default function HomeCard() {
  return (
    <div className='flex flex-col items-center justify-center border-blue-200 border-1 shadow-2xl rounded-md mt-10 w-[400px] mx-auto p-2'>
      <h1 className='text-2xl mb-5'>Tie Player 🎾 🥎</h1>
      <p className='text-lg m-2'>Manage tournaments, games and players.</p>
      <p className='text-lg m-2'>All in one place</p>
      <a href='/signup' className='text-lg mt-2 text-blue-500'>Create your account here</a>
    </div>
  )
}
