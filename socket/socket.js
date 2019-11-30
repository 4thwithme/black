const WebSocket = require('ws');

const socket = new WebSocket.Server({ port: 8888 });


module.exports = () => socket.on('connection', (ws) => {
  setInterval(() => {
    ws.send(JSON.stringify({ type: 'ping', data: 'ping' }));
  }, 5000);

  ws.onmessage = ({ data }) => {
    const parsedData = JSON.parse(data)
    console.log(parsedData);
  };
});