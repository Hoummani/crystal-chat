import React from 'react';
import { useHistory } from 'react-router-dom';
import { Navbar } from './core/Navbar';

export function Unauthorized() {

  const history = useHistory();
  return (
    <>
    <Navbar />
    <div className="p-6">
      <div className="rounded-lg shadow-lg overflow-hidden p-4">
        <h2 className="text-center text-3xl leading-9 font-extrabold text-gray-800">
          Page Not Found
        </h2>
        <div className="flex justify-center mt-6">
          <img 
            src="/img/unauthorized.svg" 
            className="object-cover lg:w-1/3 md:w-2/3 w-full"
            alt="unauthorized" 
          />
        </div>
        <div className="mt-6 flex justify-center">
          <button 
            type="button" 
            className="group w-full lg:w-1/3 md:w-2/3 
              py-2 px-4 mr-4 border border-transparent 
              text-sm leading-5 font-medium rounded-md text-white 
              bg-teal-500 hover:bg-teal-400 focus:outline-none 
              focus:border-teal-400 focus:shadow-outline-teal 
              active:bg-teal-400 active:outline-none transition duration-150 ease-in-out" 
            onClick={() => {
              history.push("/");
            }}
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
    </>
  )
}