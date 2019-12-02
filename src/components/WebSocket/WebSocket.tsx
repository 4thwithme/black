import React, { useEffect, useCallback } from 'react';


const SocketWrapper = (props: any) => {
  const {
    component: Children,
  } = props;

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

      ws.send(JSON.stringify({ data: 'pong', type: 'pong' }));

      console.log('CHAT SOCKET EVENT::::::>>> data:', data, 'type:', type)
    }
  }

  return (
    <Children sendMsg={sendMsg} />
  )
};


export default SocketWrapper;