// src/components/EditChatModal.js
import React, { useState } from "react";

const EditChatModal = ({ chatName, onSave, onCancel }) => {
  const [newName, setNewName] = useState(chatName);

  const handleSave = () => {
    if (newName.trim() !== "") {
      onSave(newName.trim());
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Renomear Chat</h3>
        <input
          type="text"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          placeholder="Novo nome do chat"
        />
        <div className="modal-actions">
          <button className="modal-btn cancel" onClick={onCancel}>
            Cancelar
          </button>
          <button className="modal-btn save" onClick={handleSave}>
            Salvar
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditChatModal;
