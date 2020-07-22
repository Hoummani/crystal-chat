import React from 'react';

export function MyFriends() {
  return (
    <div className="bg-white pt-6 pl-4">
      <div
        className="py-2 pl-2 flex justify-between border-gray-100 border-2 rounded-lg"
      >
        <div className="text-teal-400 text-md font-bold">Chat Contacts</div>
        <button 
          type="button" 
          className="group py-1 px-4 mr-4 border border-transparent 
            text-sm leading-5 font-medium rounded-md text-gray-700 
            bg-gray-300 hover:bg-gray-400 focus:outline-none 
            focus:border-gray-400 focus:shadow-outline-gray 
            active:bg-gray-400 active:outline-none transition duration-150 ease-in-out" 
        >
          Add New
        </button>
      </div>
      <ul>
        <li className="py-2 pl-2 cursor-pointer hover:bg-gray-100 rounded-lg">
          <div className="flex justify-start items-center">
            <div className="relative mr-4">
              <div  
                className="text-sm w-10 h-10 leading-none 
                  rounded-full bg-local bg-cover"
                style={{ backgroundImage: " url('/img/bg-1.jpg')" }}
              />
              <span className="absolute w-3 h-3 bg-teal-300 rounded-full bottom-0 right-0" />
            </div>
            <div className="">
              <span className="block text-gray-700 text-md font-bold">Ahmed Amine</span>
              <span className="block text-gray-400 text-sm">02 Jully 2020</span>
            </div>
          </div>
        </li>
        <li className="py-2 pl-2 cursor-pointer hover:bg-gray-100 rounded-lg">
          <div className="flex justify-start items-center">
            <div className="relative mr-4">
              <div  
                className="text-sm w-10 h-10 leading-none 
                  rounded-full bg-local bg-cover"
                style={{ backgroundImage: " url('/img/bg-1.jpg')" }}
              />
              <span className="absolute w-3 h-3 bg-red-300 rounded-full bottom-0 right-0" />
            </div>
            <div className="">
              <span className="block text-gray-700 text-md font-bold">Ali Socrate</span>
              <span className="block text-gray-400 text-sm">05 Jully 2020</span>
            </div>
          </div>
        </li>
        <li className="py-2 pl-2 cursor-pointer hover:bg-gray-100 rounded-lg">
          <div className="flex justify-start items-center">
            <div className="relative mr-4">
              <div  
                className="text-sm w-10 h-10 leading-none 
                  rounded-full bg-local bg-cover"
                style={{ backgroundImage: " url('/img/bg-1.jpg')" }}
              />
              <span className="absolute w-3 h-3 bg-teal-300 rounded-full bottom-0 right-0" />
            </div>
            <div className="">
              <span className="block text-gray-700 text-md font-bold">Abderazzak</span>
              <span className="block text-gray-400 text-sm">16 March 2020</span>
            </div>
          </div>
        </li>
      </ul>
    </div>
  )
}