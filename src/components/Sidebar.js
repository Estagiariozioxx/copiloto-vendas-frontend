import React, { useState } from "react";
import { FaTrash, FaEdit } from "react-icons/fa";
import EditChatModal from "./EditChatModal";

const Sidebar = ({ onSelectChat, selectedChat, chats, addNewChat, deleteChat, renameChat }) => {
  const [editingChat, setEditingChat] = useState(null);

  const handleEditChat = (chat) => {
    setEditingChat(chat);
  };

  const handleSaveEdit = (newName) => {
    renameChat(editingChat, newName);
    setEditingChat(null);
  };

  const handleCancelEdit = () => {
    setEditingChat(null);
  };

  return (
    <div className="sidebar">
      <button className="new-chat-btn" onClick={addNewChat}>
        + Novo Chat
      </button>
      <ul>
        {chats.map((chat) => (
          <li
            key={chat.id}
            className={selectedChat && selectedChat.id === chat.id ? "selected-chat" : ""}
            onClick={() => onSelectChat(chat)}
          >
            {chat.name}
            <div className="chat-actions">
              <button
                className="edit-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  handleEditChat(chat);
                }}
              >
                <FaEdit />
              </button>
              <button
                className="delete-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  deleteChat(chat);
                }}
              >
                <FaTrash />
              </button>
            </div>
          </li>
        ))}
      </ul>
      {editingChat && (
        <EditChatModal
          chatName={editingChat.name}
          onSave={handleSaveEdit}
          onCancel={handleCancelEdit}
        />
      )}
    </div>
  );
};

export default Sidebar;
