import React from "react";
import ReactMarkdown from "react-markdown";

const Message = ({ text, sender }) => {
  return (
    <div className={`message ${sender}`}>
      <ReactMarkdown >{text}</ReactMarkdown>
    </div>
  );
};

export default Message;
