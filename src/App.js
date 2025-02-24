import React, { useState } from "react";
import "./styles.css";
import Login from "./components/Login";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Chat from "./components/Chat";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // Inicializa com o primeiro chat já criado
  const [chats, setChats] = useState([{ id: "chat-1", name: "Chat 1" }]);
  // Variável para controlar o próximo ID (começa em 2, pois já existe chat-1)
  const [nextChatId, setNextChatId] = useState(2);
  const [selectedChat, setSelectedChat] = useState(null);
  const [chatHistories, setChatHistories] = useState({});

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  const handleSelectChat = (chat) => setSelectedChat(chat);

  const saveMessage = (chatId, message) => {
    setChatHistories((prev) => ({
      ...prev,
      [chatId]: [...(prev[chatId] || []), message],
    }));
  };

  const addNewChat = () => {
    // Usa o nextChatId para garantir a sequência
    const newChat = { id: "chat-" + nextChatId, name: "Chat " + nextChatId };
    setChats([...chats, newChat]);
    setChatHistories((prev) => ({ ...prev, [newChat.id]: [] }));
    setSelectedChat(newChat);
    // Incrementa o contador para o próximo chat
    setNextChatId(nextChatId + 1);
  };

  const deleteChat = (chatToDelete) => {
    setChats(chats.filter((chat) => chat.id !== chatToDelete.id));
    setChatHistories((prev) => {
      const updatedHistories = { ...prev };
      delete updatedHistories[chatToDelete.id];
      return updatedHistories;
    });
    if (selectedChat && selectedChat.id === chatToDelete.id) {
      setSelectedChat(null);
    }
  };

  const renameChat = (oldChat, newName) => {
    setChats((prevChats) =>
      prevChats.map((chat) =>
        chat.id === oldChat.id ? { ...chat, name: newName } : chat
      )
    );
    if (selectedChat && selectedChat.id === oldChat.id) {
      setSelectedChat({ ...selectedChat, name: newName });
    }
  };

  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />;
  }

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
          chatId={selectedChat ? selectedChat.id : null}
          chatName={selectedChat ? selectedChat.name : ""}
          messages={
            selectedChat ? chatHistories[selectedChat.id] || [] : []
          }
          saveMessage={saveMessage}
        />
      </div>
    </div>
  );
};

export default App;
