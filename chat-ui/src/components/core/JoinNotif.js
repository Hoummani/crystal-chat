import React, { useState } from 'react';

export function JoinNotif () {

  // states
  const [isDroped, setIsDroped] = useState(false);
  return (
    <div 
      className="relative z-50"
      onMouseEnter={() => {
        setIsDroped(true);
      }}
    >
      <div 
        className="text-white ml-2 cursor-pointer"
      >
        <button 
          className="focus:outline-none" 
          type="button"
          onClick={() => {
            setIsDroped(!isDroped);
          }}
        >
          <a href="#" className="text-white mr-8 relative">
            <span>
              <i 
                className="fas fa-user-friends font-semibold text-2xl tracking-tight" 
              />
            </span>
            <span 
              className="bg-red-500 text-xs text-white rounded-full px-1 font-bold absolute top-0"
            >
              5
            </span>
          </a>
        </button>
        <>
          {isDroped ? (
            <div 
              className="w-48 mt-2 py-2 shadow-md absolute right-0 bg-white rounded"
              onMouseLeave={() => {
                setIsDroped(false);
              }}
            >
              <a
                href="/profile" 
                className="block px-4 py-2 text-gray-700 font-bold text-sm 
                  hover:bg-teal-400 hover:text-white"
              >
                <i 
                  className="fas fa-user-circle text-gray-700 text-sm" 
                  style={{marginRight: '4px'}} 
                />
                Profile
              </a>
              <a
                href="/home" 
                className="block px-4 py-2 text-gray-700 font-bold text-sm 
                  hover:bg-teal-400 hover:text-white"
              >
                <i 
                  className="fas fa-tachometer-alt text-gray-700 text-sm hover:text-white" 
                  style={{marginRight: '4px'}} 
                />
                Dashboard
              </a>
          </div>
          ) : null}
        </>
      </div>
    </div>
  )
}