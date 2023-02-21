"use strict";

const Controller = require("egg").Controller;

class UtilsController extends Controller {
  // 上传文件
  async uploadFiles() {
    const { ctx } = this;
    const res = await ctx.service.utils.uploadFiles();
    ctx.body = {
      res,
    };
  }
}

module.exports = UtilsController;
