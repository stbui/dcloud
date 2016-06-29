
export default {
  on: true, //是否开启 WebSocket
  type: "socket.io",
  allow_origin: "",
  sub_protocal: "",
  adapter: undefined,
  path: "", //url path for websocket
  messages: {
    open: 'admin/install/open',
    close: 'admin/install/close',
    launcher: 'admin/install/launcher'
  }
};