import React, { useContext, useState, useEffect } from 'react';
import { ChatContext } from '../../contexts/ChatContext';
import { InviteContactModal } from './InviteContactModal';

export function MyContacts() {

  // states
  const [contacts, setContacts] = useState([]);
  const [openInviteContactModal, setOpenInviteContactModal] = useState(false);
  // contexts
  const { chatState } = useContext(ChatContext);
  const { myContacts } = chatState;

  // effects
  useEffect(() => {
    if (myContacts) {
      let arrContacts = [];
      myContacts.forEach(element => {
        arrContacts.push(element.friend);
      });
      setContacts(arrContacts);
    }
  }, [myContacts]);
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
          onClick={() => {
            setOpenInviteContactModal(true);
          }}
        >
          Add New
        </button>
      </div>
      {/** List of contacts */}
      <>
        {contacts && contacts.length > 0 ? (
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
          </ul>
        ) : (
          <div 
            className="bg-teal-100 border-t-4 border-teal-500 rounded-b text-teal-900 
              px-4 py-3 shadow-md" 
              role="alert"
            >
            <div className="flex">
              <div className="py-1">
                <svg 
                  className="fill-current h-6 w-6 text-teal-500 mr-4" 
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 20 20"
                >
                  <path 
                    d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 
                      0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z"
                  />
                </svg>
              </div>
              <div>
                <p className="font-bold">Contact list is empty</p>
                <p className="text-sm">Try to add new contact, this platform<br />
                  allow you to make a new friends.
                </p>
              </div>
            </div>
          </div>
        )}
      </>
      <>
        {openInviteContactModal ? 
          <InviteContactModal setOpenInviteContactModal={setOpenInviteContactModal} />
        :null}
      </>
    </div>
  )
}