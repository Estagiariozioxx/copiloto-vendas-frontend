import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import Chat from "./components/Chat";
import Header from "./components/Header";
import "./styles.css";

const App = () => {
  const [selectedChat, setSelectedChat] = useState(null);
  const [chatHistories, setChatHistories] = useState({});
  const [chats, setChats] = useState(["Chat 1"]);

  const handleSelectChat = (chatName) => setSelectedChat(chatName);

  const saveMessage = (chatName, message) => {
    setChatHistories((prev) => ({
      ...prev,
      [chatName]: [...(prev[chatName] || []), message],
    }));
  };

  const addNewChat = () => {
    const newChat = `Chat ${chats.length + 1}`;
    setChats([...chats, newChat]);
    setChatHistories((prev) => ({ ...prev, [newChat]: [] }));
    setSelectedChat(newChat);
  };

  const deleteChat = (chatToDelete) => {
    setChats(chats.filter(chat => chat !== chatToDelete));
    setChatHistories((prev) => {
      const updatedHistories = { ...prev };
      delete updatedHistories[chatToDelete];
      return updatedHistories;
    });
    if (selectedChat === chatToDelete) {
      setSelectedChat(null);
    }
  };

  const handleLogout = () => {
    // Lógica de logout
    console.log("Logout acionado!");
  };

  return (
    <div className="app">
      {/* Header fixo no topo */}
      <Header onLogout={handleLogout} />

      {/* Sidebar e Chat */}
      <Sidebar
        onSelectChat={handleSelectChat}
        selectedChat={selectedChat}
        chats={chats}
        addNewChat={addNewChat}
        deleteChat={deleteChat}
      />
      <Chat
        chatName={selectedChat}
        messages={chatHistories[selectedChat] || []}
        saveMessage={saveMessage}
      />
    </div>
  );
};

export default App;
