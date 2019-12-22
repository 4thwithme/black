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
  debounce: function(func, ms, initialState = false) {
    let isCan = initialState;
  
    return function (...args) {
      if (!isCan) return;
  
      isCan = false;
      setTimeout(() => isCan = true, ms);
      return func.call(this, ...args);
    };
  },

  throttle: function(func, ms, initialState = false) {
    let isCan = initialState;
    let delayedContext;
    let delayedArguments;
  
    return function wrapper(...args) {
      const _self = wrapper;
  
      if (!isCan) {
        delayedContext = _self;
        delayedArguments = args;
        return;
      }
  
      func.apply(_self, args);
      isCan = false;
  
      setTimeout(() => {
        isCan = true;
  
        if (delayedArguments) {
          wrapper.apply(delayedContext, delayedArguments);
          delayedArguments = delayedContext = null;
        }
      }, ms);
    };
  }
}