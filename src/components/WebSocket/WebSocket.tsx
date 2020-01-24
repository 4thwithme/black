import React, { useEffect, useCallback, ReactType } from "react";
import { connect } from "react-redux";

import { addNewMsgToActiveChat } from "../../redux/activeChat/activeChatReducer";
import { addNewChat } from "../../redux/chats/chatsReducer";
import { SOCKET_TYPE } from "../../api/const";
import { INewMsg, INewChat } from "../../redux/types";
import { SOCKET_ROOT } from "../../clientConfig/socketConfig";

interface IProps {
  addNewMsgToActiveChat: (data: INewMsg) => void;
  addNewChat: (data: INewChat) => void;
  component: ReactType;
}

const SocketWrapper = (props: IProps) => {
  const { component: Children, addNewMsgToActiveChat, addNewChat } = props;
  const ws = new WebSocket(SOCKET_ROOT);

  useEffect(() => {
    setupSocket();

    return () => {
      ws.close();
    };
  }, [ws]);

  const sendMsg = useCallback(
    (chatId: string, msgForSend: string, senderId: string) => {
      ws.send(
        JSON.stringify({
          data: {
            body: msgForSend,
            chatId,
            senderId
          },
          type: "message"
        })
      );
    },
    [ws]
  );

  const setupSocket = () => {
    ws.onopen = () => {
      console.log("Socket connected!)");
    };

    ws.onclose = () => {
      console.log("Socket disconnected!(");
    };

    ws.onerror = (err) => {
      console.log("Socket error: ", err);
    };

    ws.onmessage = (e) => {
      const { data, type } = JSON.parse(e.data);
      console.log("CHAT SOCKET EVENT::::::>>> data:", data, "type:", type);

      switch (type) {
        case SOCKET_TYPE.ping: {
          ws.send(JSON.stringify({ data: "pong", type: "pong" }));
          break;
        }
        case SOCKET_TYPE.out:
        case SOCKET_TYPE.inc:
        case SOCKET_TYPE.sys:
        case SOCKET_TYPE.message: {
          addNewMsgToActiveChat(data);
          break;
        }
        case SOCKET_TYPE.newChat: {
          addNewChat(data);
        }
        default:
          break;
      }
    };
  };

  return <Children sendMsg={sendMsg} />;
};

const mapDispatchToProps = {
  addNewMsgToActiveChat,
  addNewChat
};

export default connect(null, mapDispatchToProps)(React.memo(SocketWrapper));
