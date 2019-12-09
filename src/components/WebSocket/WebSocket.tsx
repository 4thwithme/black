import React, { useEffect, useCallback } from 'react';
import { addNewMsgToActiveChat } from '../../redux/activeChat/activeChatReducer';
import { connect } from 'react-redux';


const SocketWrapper = ({ component: Children, addNewMsgToActiveChat }: any) => {
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

      switch (type) {
        case 'ping': {

          ws.send(JSON.stringify({ data: 'pong', type: 'pong' }));
          console.log('CHAT SOCKET EVENT::::::>>> data:', data, 'type:', type);
          
          break;
        }
          
          case 'out': 
          case 'inc': 
          case 'sys': 
          case 'message': {
            addNewMsgToActiveChat(data.msg);
            break;
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
};

export default connect(null, mapDispatchToProps)(React.memo(SocketWrapper));
