import { useEffect } from 'react';


const Socket = () => {
  const ws = new WebSocket('ws://localhost:8888');

  useEffect(() => {
    setupSocket();

    return () => {
      ws.close();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

      console.log('data:', data, '\ntype:', type)
    }
  }

  return null;
};

export default Socket;