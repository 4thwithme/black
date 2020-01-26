let socketHost: string;

const hostname = window && window.location && window.location.hostname;

if (hostname === "localhost") {
  socketHost = "ws://localhost:8888";
} else if (hostname === "blackq.herokuapp.com") {
  socketHost = "ws://blackq.herokuapp.com:8888";
} else {
  socketHost = "ws://127.0.0.1:8888";
}

export const SOCKET_ROOT = `${socketHost}`;
