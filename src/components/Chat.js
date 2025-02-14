import React, { useState, useEffect } from "react";
import Message from "./Message";
import axios from "axios";

const Chat = ({ chatName, messages, saveMessage }) => {
  const [input, setInput] = useState("");
  const [chatMessages, setChatMessages] = useState(messages || []);
  const [typedText, setTypedText] = useState("");
  const fullText = "Seu copiloto para inseminação de gado";

  useEffect(() => {
    setChatMessages(messages || []);
  }, [chatName, messages]);

  useEffect(() => {
    if (!chatName) {
      let timeoutId;
      let index = 1; // Começa em 1 para exibir o primeiro caractere imediatamente
  
      const animateText = () => {
        if (index <= fullText.length) {
          setTypedText(fullText.slice(0, index));
          index++;
          timeoutId = setTimeout(animateText, 100);
        } else {
          // Aguarda 2000ms e reinicia
          timeoutId = setTimeout(() => {
            index = 1;
            animateText();
          }, 2000);
        }
      };
  
      animateText();
  
      return () => clearTimeout(timeoutId);
    }
  }, [chatName]);
  
  

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { text: input, sender: "user" };
    setChatMessages([...chatMessages, userMessage]);
    saveMessage(chatName, userMessage);
    setInput("");

    try {
      const response = await axios.post("http://localhost:5000/chat", { message: input });
      const botMessage = { text: response.data.response, sender: "bot" };
      setChatMessages((prev) => [...prev, botMessage]);
      saveMessage(chatName, botMessage);
    } catch (error) {
      const errorMessage = { text: "Erro ao conectar com o servidor", sender: "bot" };
      setChatMessages((prev) => [...prev, errorMessage]);
      saveMessage(chatName, errorMessage);
    }
  };

  if (!chatName) {
    return (
      <div className="chat-container start-screen">
        <h1>COPILOTO DE VENDAS</h1>
        <p className="typing-effect">{typedText}</p> {/* Mantém o texto visível */}
      </div>
    );
  }

  return (
    <div className="chat-container">
      <h2>{chatName}</h2>
      <div className="messages">
        {chatMessages.map((msg, index) => (
          <Message key={index} text={msg.text} sender={msg.sender} />
        ))}
      </div>
      <div className="input-container">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Digite sua mensagem..."
        />
        <button onClick={sendMessage}>➤</button>
      </div>
    </div>
  );
};

export default Chat;
