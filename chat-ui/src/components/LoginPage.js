import React from 'react';
import { Navbar } from './core/Navbar';

export function LoginPage() {
  return (
    <div className="login-page">
      <Navbar />
      <br />
      <br />
      <div className="p-10">
        <h2 className="text-center text-3xl leading-9 font-extrabold text-gray-800">
          Sign In to your account
        </h2>
        <p className="text-sm mt-2 leading-5 text-center text-gray-600">
          If you don't have any account try to
          <span className="text-teal-400"> Create an account. </span> 
          Its simple and easy<br/>
        </p>
        <br />
        <br />
        <form className="">
          <div className="flex justify-center">
            <div className="md:w-1/3 w-full">
              <label 
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" 
                htmlFor="email">
                  Email
              </label>
              <input 
                aria-label="Email address" 
                name="email" 
                id="email"
                type="email" 
                placeholder="test.js@gmail.com" 
                className="bg-gray-200 appearance-none border-2 border-gray-200 
                  rounded w-full py-2 px-4 text-gray-700 leading-tight 
                  focus:outline-none focus:bg-white focus:border-teal-500"
                required 
              />
              <span 
                className="block text-red-500 text-xs italic"
              >
                Email address is required
              </span>
            </div>
          </div>
          <div className="flex justify-center mt-4">
            <div className="md:w-1/3 w-full">
              <label 
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" 
                htmlFor="password">
                  Password
              </label>
              <input 
                aria-label="Password" 
                name="password" 
                id="password"
                type="password" 
                placeholder="******" 
                className="bg-gray-200 appearance-none border-2 border-gray-200 
                  rounded w-full py-2 px-4 text-gray-700 leading-tight 
                  focus:outline-none focus:bg-white focus:border-teal-500"
                required 
              />
              <span 
                className="block text-red-500 text-xs italic"
              >
                Password is required
              </span>
            </div>
          </div>
          <div className="mt-6 flex justify-center">
            <button 
              type="submit" 
              className="group w-full md:w-1/3 
                py-2 px-4 mr-4 border border-transparent 
                text-sm leading-5 font-medium rounded-md text-white 
                bg-teal-500 hover:bg-teal-400 focus:outline-none 
                focus:border-teal-400 focus:shadow-outline-teal 
                active:bg-teal-400 active:outline-none transition duration-150 ease-in-out" 
            >
              Sign In
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}