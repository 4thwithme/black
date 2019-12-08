module.exports = {
   sendMsgToChat: function(client, chatEntity, msgEntity, type) {
    client.send(JSON.stringify({ 
      type, 
      data: {
        chat: chatEntity, 
        msg: msgEntity
      } 
    }));
  },
}