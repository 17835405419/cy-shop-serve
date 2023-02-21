"use strict";

const Service = require("egg").Service;
class UserService extends Service {
  // 增加用户信息
  async addUser(data) {
    const { ctx } = this;
    const { openId, userInfo } = data;
    await ctx.model.User.create({
      openId: openId,
      nickName: userInfo.nickName,
      avatarUrl: userInfo.avatarUrl,
    });
  }
  // 查找用户
  async searchUser(openId) {
    const { ctx } = this;
    const res = await ctx.model.User.findOne({ openId });
    if (!res) {
      return false;
    } else {
      return res;
    }
  }
  // 更新用户
  async updateUser(data) {
    const { ctx } = this;
    const { openId, userInfo } = data;
  }
}
module.exports = UserService;
