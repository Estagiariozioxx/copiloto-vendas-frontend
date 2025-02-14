import React from "react";

const Sidebar = ({ onSelectChat, selectedChat, chats, addNewChat, deleteChat }) => {
  return (
    <div className="sidebar">
      <button className="new-chat-btn" onClick={addNewChat}>+ Novo Chat</button>
      <ul>
        {chats.map((chat, index) => (
          <li
            key={index}
            className={chat === selectedChat ? "selected-chat" : ""}
            onClick={() => onSelectChat(chat)}
          >
            {chat}
            <button className="delete-btn" onClick={(e) => { 
              e.stopPropagation(); 
              deleteChat(chat);
            }}>X</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
