import React, { useState, useRef, MutableRefObject } from 'react';
import { connect } from 'react-redux';

import './ChatInput.scss';
import { AppState } from '../..';
import { getCurrentUserId } from '../../redux/selectors';

interface IProps {
  activeChatId: string,
  senderId: string,
  sendMsg: (activeChatId: string, msg: string, senderId: string) => void,
};

const ChatInput = (props: IProps) => {
  const [msg, setMsg] = useState<string>('');

  const inputRef: MutableRefObject<any> = useRef();

  const onEnterHandler = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' && e.shiftKey) {
      return;
    }

    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();

      props.sendMsg(props.activeChatId, msg, props.senderId);
      inputRef.current.innerText = '';
      setMsg('');
    }
  };

  const onInputHandler = (e: any) => {
    setMsg(e.target.innerText);
  };

  return (
    <div className="chat-input">
      <div
        ref={inputRef}
        contentEditable
        onKeyDown={onEnterHandler}
        onInput={onInputHandler}
        className="chat-input__input" />

        {!msg.length && <span className="chat-input__placeholder">Message...</span>}
    </div>
  );
};

const mapStateToProps = (state: AppState) => ({
  activeChatId: state.activeChat.activeChatId,
  senderId: getCurrentUserId(state),
});

export default connect(mapStateToProps)(ChatInput);
