import React, { useEffect, useCallback } from 'react';
import { connect } from 'react-redux';

import { addNewMsgToActiveChat } from '../../redux/activeChat/activeChatReducer';
import { addNewChat } from '../../redux/chats/chatsReducer';
import { SOCKET_TYPE } from '../../api/const';



const SocketWrapper = ({ component: Children, addNewMsgToActiveChat, addNewChat }: any) => {
  const ws = new WebSocket('ws://localhost:8888');

  useEffect(() => {
    setupSocket();

    return () => {
      ws.close();
    };
  }, [ws]);

  const sendMsg = useCallback((chatId: string, msgForSend: string, senderId: string) => {
    ws.send(JSON.stringify({
      data: {
        body: msgForSend,
        chatId,
        senderId,
      },
      type: 'message',
    }));
  }, [ws]);

  const setupSocket = () => {
    ws.onopen = () => {
      console.log('Socket connected!)');
    };

    ws.onclose = () => {
      console.log('Socket disconnected!(');
    };

    ws.onerror = (err) => {
      console.log('Socket error: ', err);
    };

    ws.onmessage = (e) => {
      const { data, type } = JSON.parse(e.data);
      console.log('=====================================================');
      console.log('CHAT SOCKET EVENT::::::>>> data:', data, 'type:', type);
      console.log('=====================================================');

      switch (type) {
        case SOCKET_TYPE.ping: {
          ws.send(JSON.stringify({ data: 'pong', type: 'pong' }));
          break;
        }
        case SOCKET_TYPE.out: 
        case SOCKET_TYPE.inc: 
        case SOCKET_TYPE.sys: 
        case SOCKET_TYPE.message: {
          addNewMsgToActiveChat(data);
          break;
        }
        case SOCKET_TYPE.newChat: {
          addNewChat(data);
        }
        default:
          break;
      }
    }
  }

  return (
    <Children sendMsg={sendMsg} />
  );
};

const mapDispatchToProps = {
  addNewMsgToActiveChat,
  addNewChat,
};

export default connect(null, mapDispatchToProps)(React.memo(SocketWrapper));
