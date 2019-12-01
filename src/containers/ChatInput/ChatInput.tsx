import React, { useState } from 'react';

import './ChatInput.scss';


const ChatInput = () => {
  const [msg, setMsg] = useState('');

  const onEnterHandler = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' && e.shiftKey) {
      return;
    }
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();

      alert(msg);
    }
  };

  const onInputHandler = (e: any) => {
    setMsg(e.target.innerText);
  }

  return (
    <div className="chat-input">
      <div
        contentEditable
        onKeyDown={onEnterHandler}
        onInput={onInputHandler}
        className="chat-input__input" />
    </div>
  );
};

export default ChatInput;
