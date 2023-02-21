"use strict";

const Controller = require("egg").Controller;

class HomeController extends Controller {
  async index() {
    const { app, query } = this.ctx;
    // 给谁发, socket连接的id
    const id = query.id;
    const nsp = app.io.of("/");
    if (nsp.sockets[id]) {
      let msg = '{"id":2, "message":666}';
      let data = await JSON.parse(msg);
      // 通过id给指定socket连接发送消息
      nsp.sockets[id].emit("res", data);
    }
    this.ctx.body = "发送成功";
  }
}

module.exports = HomeController;
