import React from 'react'

export const Footer = () => {
  return (
    <div>
        <footer className=" bottom-0 left-0 z-40 w-full p-4 bg-gray-300   shadow md:flex md:items-center md:justify-between md:p-6 bg-gradient-to-r from-primary1 to-blue  dark:border-gray-600">
    <span className="text-sm text-white sm:text-center dark:text-white-400">© 2023 <a href="" className="hover:underline">LuxeStay</a>. All Rights Reserved.
    </span>
    <ul class="flex flex-wrap items-center mt-3 text-sm font-medium text-white dark:text-white-400 sm:mt-0">
        <li>
            <a href="#" className="mr-4 hover:underline md:mr-6">About</a>
        </li>
        <li>
            <a href="#" className="mr-4 hover:underline md:mr-6">Privacy Policy</a>
        </li>
        <li>
            <a href="#" className="mr-4 hover:underline md:mr-6">Licensing</a>
        </li>
        <li>
            <a href="#" className="hover:underline">Contact</a>
        </li>
    </ul>
</footer>
    </div>
  )
}