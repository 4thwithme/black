const WebSocket = require('ws');
const jwt = require("jsonwebtoken");
const config = require("config");

const Message = require('../models/Message.model');
const Chat = require('../models/Chat.model');

const { sendMsgToChat } =require('../utils/utils')
const { SOCKET_TYPE } = require('../const/const');

const socket = new WebSocket.Server({ port: 8888 });



module.exports = {
  onConnectSocket: () => socket.on('connection', (ws, req) => {
    ws.send(JSON.stringify({ type: 'ping', data: 'ping' }));

    if (req.headers.cookie) {
      const token =  req.headers.cookie.split('=')[1];
      const decoded = jwt.verify(token, config.get("myprivatekey"));
      ws.connectedUserId = decoded._id;
    }
    
    ws.onmessage = async ({ data }) => {
      const parsedData = JSON.parse(data);
      
      const { type: payloadType } = parsedData;

      switch (payloadType) {
        case SOCKET_TYPE.pong: {
          console.log(parsedData);

          setTimeout(() => {
            ws.send(JSON.stringify({ type: 'ping', data: 'ping' }));
          }, 5000);
          break;
        }

        case SOCKET_TYPE.message: {
          const newChatMsg = await Message.collection.insertOne({ ...parsedData, date: Date.now() });      

          const updatedChat = await Chat.updateLastInteraction(parsedData.data.chatId, JSON.stringify(newChatMsg.ops[0]));

          for (const client of socket.clients) {
            if (client.connectedUserId === parsedData.data.senderId ) {
              sendMsgToChat(client, updatedChat, newChatMsg.ops[0], 'out');
              continue;
            }

            if (updatedChat.participants.includes(client.connectedUserId)) {
              sendMsgToChat(client, updatedChat, newChatMsg.ops[0], 'inc');
              continue;
            }
          }
          break;
        }
        default:
          break;
      }
    };
  }),

  sendSocket: (ids, data, type) => {
    for (const client of socket.clients) {
      if (ids.includes(client.connectedUserId)) {
        client.send(JSON.stringify({ type, data }));
      }
    }
  }
}