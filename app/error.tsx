'use client' // Error components must be Client Components
 
import { useEffect, useState } from 'react'
 
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {

  const [errorMessage, setErrorMessage] = useState<string>("Something went wrong")

  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])
 
  return (
    <div className='flex flex-col items-center justify-center w-full'>
      <h2 className='text-2xl font-semibold'>{errorMessage}</h2>
      <div>
        <button
          className='mt-4 px-4 py-2 border border-gray-300 rounded-md shadow-sm hover:bg-gray-100'
          onClick={() => reset()}>
          Try Again
        </button>
      </div>
    </div>
  )
}