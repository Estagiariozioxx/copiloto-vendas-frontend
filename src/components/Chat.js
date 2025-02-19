import React, { useState, useEffect } from "react";
import Message from "./Message";
import axios from "axios";

const Chat = ({ chatId, chatName, messages, saveMessage }) => {
  const [input, setInput] = useState("");
  const [chatMessages, setChatMessages] = useState(messages || []);
  const [typedText, setTypedText] = useState("");
  const fullText = "Seu copiloto para inseminação de gado";

  useEffect(() => {
    setChatMessages(messages || []);
  }, [chatId, messages]);

  useEffect(() => {
    if (!chatId) {
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
  }, [chatId]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { text: input, sender: "user" };
    setChatMessages([...chatMessages, userMessage]);
    saveMessage(chatId, userMessage);
    setInput("");

    try {
      const response = await axios.post(
        "http://localhost:8000/chat",
        { message: String(input), chat_id: String(chatId) },
        { headers: { "Content-Type": "application/json" } }
      );
      const botMessage = { text: response.data.response, sender: "bot" };
      setChatMessages((prev) => [...prev, botMessage]);
      saveMessage(chatId, botMessage);
    } catch (error) {
      const errorMessage = { text: String(error), sender: "bot" };
      setChatMessages((prev) => [...prev, errorMessage]);
      saveMessage(chatId, errorMessage);
    }
    
  };

  if (!chatId) {
    return (
      <div className="chat-container start-screen">
        <h1>COPILOTO DE VENDAS</h1>
        <p className="typing-effect">{typedText}</p>
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
