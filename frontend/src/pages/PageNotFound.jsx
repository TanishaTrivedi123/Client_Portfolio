import React from 'react'
import { Link } from 'react-router-dom'

const PageNotFound = () => {
  return (
    <section className="min-h-screen w-full flex flex-col justify-center items-center bg-primaryBg text-primaryText p-6">
      
      <h1 className="text-7xl sm:text-8xl font-bold mb-6">404</h1>
      <h2 className="text-3xl sm:text-4xl font-semibold font-carterone mb-4 text-center">
        Oops! Page Not Found
      </h2>
      <p className="text-lg sm:text-xl font-quintessential opacity-80 mb-8 text-center max-w-md">
        The page you are looking for doesn’t exist or has been moved. 
        Please check the URL or return to the homepage.
      </p>

      <Link 
        to="/" 
        className="px-6 py-3 bg-primaryText text-primaryBg font-semibold font-quintessential rounded-lg hover:bg-opacity-90 transition"
      >
        Go Back Home
      </Link>
    </section>
  )
}

export default PageNotFound