"use strict";

const Controller = require("egg").Controller;
const room = "default_room";

class ChatController extends Controller {
  async exchange() {
    const { ctx, app } = this;
    const nsp = app.io.of("/");
    const id = socket.id;
    nsp.sockets[id].emit("res", "hello ....");
    ctx.socket.disconnect();
  }
}
module.exports = ChatController;
