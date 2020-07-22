import React from 'react';
import { DashNavBar } from './DashNavBar';
import { MyFriends } from './MyFriends';
import { ChatBox } from './ChatBox';

export function Home() {
  return (
    <div className="home">
      <DashNavBar />
      <div 
        className="grid md:grid-cols-3" 
      >
        <MyFriends />
        <ChatBox />
      </div>
    </div>
  );
}