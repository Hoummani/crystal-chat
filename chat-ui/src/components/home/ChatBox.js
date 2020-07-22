import React from 'react';

export function ChatBox() {
  return (
    <div 
      className="md:col-span-2 p-6 bg-local"
      style={{backgroundImage: "url('/img/bg_oc_things_grey.jpeg')"}}
    >
      <ul>
        <li>
          <strong>Ahmed Amine</strong>
          <span>Hi there i'am here</span>
        </li>
        <li>
          <strong>Abderrazak Lahmidi</strong>
          <span>It's too late baby</span>
        </li>
      </ul>
    </div>
  )
}