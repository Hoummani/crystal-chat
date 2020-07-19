import React from 'react';

export function Navbar() {
  return (
    <div className="navbar">
      <nav 
        className="flex items-center justify-between 
          flex-wrap bg-teal-500 shadow-md p-6"
        >
          <div className="flex items-center flex-shrink-0 text-white mr-6">
            <i 
              className="fab fa-rocketchat font-semibold text-2xl tracking-tight" 
              style={{marginRight: '5px'}} 
            />
            <span className="font-semibold text-2xl tracking-tight">Crystal Chat</span>
          </div>
        </nav>
    </div>
  )
};