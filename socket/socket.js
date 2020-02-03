// const WebSocket = require("ws");
const jwt = require("jsonwebtoken");
const config = require("config");

// const server = require("../index");
const Message = require("../models/Message.model");
const Chat = require("../models/Chat.model");
const { User } = require("../models/User.model");

const { sendMsgToChat } = require("../utils/utils");
const { SOCKET_TYPE } = require("../const/const");

// const wss = new WebSocket.Server({ server });
let wss;

function heartbeat(ws) {
  ws.isAlive = true;
}

setInterval(function() {
  wss.clients.forEach(function each(ws) {
    if (ws.isAlive === false) {
      return ws.terminate();
    }

    ws.isAlive = false;
    ws.send(JSON.stringify({ type: "ping", data: "ping" }));
  });
}, 8000);

module.exports = {
  onConnectSocket: (socket) => {
    wss = socket;

    wss.on("connection", async (ws, req) => {
      if (req.headers.cookie) {
        const token = req.headers.cookie.split("=")[1];
        const decoded = jwt.verify(token, config.get("myprivatekey"));
        ws.connectedUserId = decoded._id;
      }

      ws.isAlive = true;
      await User.reloginForReload(ws.connectedUserId);

      ws.onclose = () => {
        console.log("socket stoped and logouted user");
        ws.isAlive = false;

        User.logoutById(ws.connectedUserId);
      };

      ws.onmessage = async ({ data }) => {
        const parsedData = JSON.parse(data);

        const { type: payloadType } = parsedData;

        switch (payloadType) {
          case SOCKET_TYPE.pong: {
            console.log(parsedData);
            heartbeat(ws);

            break;
          }

          case SOCKET_TYPE.message: {
            const newChatMsg = await Message.collection.insertOne({
              ...parsedData,
              date: Date.now()
            });

            const allUsers = await User.find({});

            const getUsersForChat = (participants) => {
              const entites = {};

              participants.forEach((id) => {
                entites[id] = allUsers.find((user) => String(user._id) === id);
              });
              return entites;
            };

            const updatedChat = await Chat.updateLastInteraction(
              parsedData.data.chatId,
              JSON.stringify(newChatMsg.ops[0]),
              newChatMsg.ops[0].date
            );

            const chatWithParticipants = {
              ...updatedChat._doc,
              users: {
                ids: updatedChat.participants,
                entities: getUsersForChat(updatedChat.participants)
              }
            };

            for (const client of wss.clients) {
              if (client.connectedUserId === parsedData.data.senderId) {
                sendMsgToChat(client, chatWithParticipants, newChatMsg.ops[0], "out");
                continue;
              }

              if (updatedChat.participants.includes(client.connectedUserId)) {
                sendMsgToChat(client, chatWithParticipants, newChatMsg.ops[0], "inc");
                continue;
              }
            }
            break;
          }
          default:
            break;
        }
      };
    });
  },

  sendSocket: (ids, data, type) => {
    for (const client of wss.clients) {
      if (ids.includes(client.connectedUserId)) {
        client.send(JSON.stringify({ type, data }));
      }
    }
  }
};
