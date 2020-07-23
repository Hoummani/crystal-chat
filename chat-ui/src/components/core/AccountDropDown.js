/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useMutation } from '@apollo/react-hooks';
import { Link } from 'react-router-dom';
import { LOG_OUT } from '../../apollo-client/authGql';

export function AccountDropDown() {

  // states
  const [isDroped, setIsDroped] = useState(false);

  // apollo
  const [logOut, { data }] = useMutation(LOG_OUT);
  const history = useHistory();
  // functions
  const onLogOut = async () => {
    try {
      await logOut();
    } catch (err) {
      console.log(err);
    }
  };

  // effects
  useEffect(() => {
    if (data) {
      localStorage.removeItem("token");
      history.push("/login");
    }
  }, [data]);
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
              <Link
                to="/profile" 
                className="block px-4 py-2 text-gray-700 font-bold text-sm 
                  hover:bg-teal-400 hover:text-white"
              >
                <i 
                  className="fas fa-user-circle text-gray-700 text-sm" 
                  style={{marginRight: '4px'}} 
                />
                Profile
              </Link>
              <Link 
                to="/home" 
                className="block px-4 py-2 text-gray-700 font-bold text-sm 
                  hover:bg-teal-400 hover:text-white"
              >
                <i 
                  className="fas fa-tachometer-alt text-gray-700 text-sm hover:text-white" 
                  style={{marginRight: '4px'}} 
                />
                Dashboard
              </Link>
              <hr />
              <a 
                className="block px-4 py-2 text-gray-700 font-bold text-sm 
                  hover:bg-teal-400 hover:text-white"
                onClick={() => {
                  onLogOut();
                }}
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