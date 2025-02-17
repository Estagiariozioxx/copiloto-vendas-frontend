// src/App.js
import React, { useState } from "react";
import "./styles.css";
import Login from "./components/Login";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Chat from "./components/Chat";

const App = () => {
  // Inicia deslogado para mostrar a tela de login
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedChat, setSelectedChat] = useState(null);
  const [chatHistories, setChatHistories] = useState({});
  const [chats, setChats] = useState(["Chat 1"]);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    // Ao deslogar, retorna para a tela de login
    setIsLoggedIn(false);
  };

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
    setChats(chats.filter((chat) => chat !== chatToDelete));
    setChatHistories((prev) => {
      const updatedHistories = { ...prev };
      delete updatedHistories[chatToDelete];
      return updatedHistories;
    });
    if (selectedChat === chatToDelete) {
      setSelectedChat(null);
    }
  };

  const renameChat = (oldName, newName) => {
    setChats((prevChats) =>
      prevChats.map((chat) => (chat === oldName ? newName : chat))
    );
    setChatHistories((prevHistories) => {
      const updatedHistories = { ...prevHistories };
      updatedHistories[newName] = updatedHistories[oldName];
      delete updatedHistories[oldName];
      return updatedHistories;
    });
    if (selectedChat === oldName) {
      setSelectedChat(newName);
    }
  };

  // Se não estiver logado, renderiza a tela de Login
  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />;
  }

  // Se estiver logado, renderiza a aplicação principal
  return (
    <div className="app">
      <Header onLogout={handleLogout} />

      <div className="main-content">
        <Sidebar
          onSelectChat={handleSelectChat}
          selectedChat={selectedChat}
          chats={chats}
          addNewChat={addNewChat}
          deleteChat={deleteChat}
          renameChat={renameChat}
        />
        <Chat
          chatName={selectedChat}
          messages={chatHistories[selectedChat] || []}
          saveMessage={saveMessage}
        />
      </div>
    </div>
  );
};

export default App;
