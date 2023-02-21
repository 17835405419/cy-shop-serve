"use strict";

const Controller = require("egg").Controller;
const { getOpenId, getAccess_token } = require("../common/wxLogin");
class UserController extends Controller {
  async login() {
    // 微信登录
    let { ctx } = this;
    let res = ctx.request.body;
    try {
      const { userInfo, code } = res; //解构出用户信息

      // 获取openId
      const openId = await getOpenId(code, ctx);

      // 调用serve操作数据库 查找用户
      const result1 = await ctx.service.user.searchUser(openId);
      // 判断用户是否注册
      if (result1 === false) {
        // 没有注册则进行注册
        await ctx.service.user.addUser({ openId, userInfo });
      }

      // 返回token
      const token = this.app.jwt.sign(
        { openId: openId, nickName: userInfo.nickName },
        this.app.config.jwt.secret,
        { expiresIn: "2h" }
      );

      // 返回数据
      ctx.body = {
        code: 200,
        msg: "登陆成功",
        token: token,
      };
    } catch (error) {
      console.log(error);
      ctx.status = 500;
      ctx.body = {
        code: 400,
        errMsg: "登录时发生错误",
      };
    }
  }
  async getUserInfo() {
    const { ctx } = this;
    // 获取用户信息接口
    try {
      const users = await ctx.service.user.searchUser(ctx.userInfo.openId);
      if (users !== false) {
        ctx.body = {
          code: 200,
          msg: "获取用户信息成功",
          userInfo: users,
        };
      } else {
        ctx.status = 400;
        ctx.body = {
          code: 400,
          msg: "获取用户信息失败",
        };
      }
    } catch (error) {
      ctx.status = 500;
      console.log(error);
    }
  }
}

module.exports = UserController;
