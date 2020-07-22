/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';

export function AccountDropDown() {

  // states
  const [isDroped, setIsDroped] = useState(false);
  return (
    <div 
      className="relative"
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
          <i 
            className="far fa-caret-square-down font-semibold text-xl tracking-tight" 
          />
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
                href="#" 
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
                href="#" 
                className="block px-4 py-2 text-gray-700 font-bold text-sm 
                  hover:bg-teal-400 hover:text-white"
              >
                <i 
                  className="fas fa-cog text-gray-700 text-sm hover:text-white" 
                  style={{marginRight: '4px'}} 
                />
                Settings
              </a>
              <hr />
              <a 
                href="#" 
                className="block px-4 py-2 text-gray-700 font-bold text-sm 
                  hover:bg-teal-400 hover:text-white"
              >
                <i 
                  className="fas fa-sign-out-alt text-gray-700 text-sm hover:text-white" 
                  style={{marginRight: '4px'}} 
                />
                Logout
              </a>
          </div>
          ) : null}
        </>
      </div>
    </div>
  )
}