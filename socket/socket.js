const WebSocket = require('ws');
const Message = require('../models/Message.model');
const Chat = require('../models/Chat.model');

const { SOCKET_TYPE } = require('../const/const');

const socket = new WebSocket.Server({ port: 8888 });


module.exports = () => socket.on('connection', (ws) => {
  setInterval(() => {
    ws.send(JSON.stringify({ type: 'ping', data: 'ping' }));
  }, 10000);

  ws.onmessage = async ({ data }) => {
    const parsedData = JSON.parse(data);
    console.log(parsedData);

    const { data: payload } = parsedData;

    switch (parsedData.type) {
      case SOCKET_TYPE.message: {
        const message = await Message.collection.insertOne({ ...payload, date: Date.now() });

        const res = await Chat.updateLastInteraction(payload.chatId, message.insertedId);

        socket.clients.forEach(client => {
          console.log(client);
        });

        break;
      }
      default:
        break;
    }
  };
});