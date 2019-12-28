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

  throttle: function (func, ms) {
    let isThrottled = true;
    let savedArgs;
    let savedThis;
  
    function wrapper() {
      if (isThrottled) { 
        savedArgs = arguments;
        savedThis = this;
        return;
      }
  
      func.apply(this, arguments);
  
      isThrottled = true;
  
      setTimeout(function() {
        isThrottled = false; 
        if (savedArgs) {
          wrapper.apply(savedThis, savedArgs);
          savedArgs = savedThis = null;
        }
      }, ms);
    }
  
    return wrapper;
  }
}