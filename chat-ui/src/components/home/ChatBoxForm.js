import React from 'react';

export function ChatBoxForm() {
  return (
    <div className="chat-box-form fixed bottom-0" style={{width: '63%'}}>
      <form className="flex bg-white border-gray-200 border-t-2 py-4">
        <input 
          aria-label="Message" 
          name="message" 
          id="message"
          type="text" 
          placeholder="Message.." 
          className="bg-gray-200 appearance-none border-2 border-gray-200 
            rounded w-full py-2 px-4 text-gray-700 leading-tight 
            focus:outline-none focus:bg-white focus:border-teal-500"
          required 
        />
        <button 
          type="button" 
          className="px-3 rounded-full bg-teal-500 hover:bg-teal-400 ml-1 focus:outline-none"
        >
          <i className="fas fa-microphone text-xl text-white font-light" />
        </button>
      </form>
    </div>
  )
}