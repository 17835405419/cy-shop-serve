"use strict";

module.exports = (options) => {
  return async function (ctx, next) {
    const token = ctx.request.header.authorization.replace("Bearer ", "");

    if (token) {
      try {
        // 解码token
        const decode = ctx.app.jwt.verify(token, ctx.app.config.jwt.secret); // 验证token
        // 获取用户信息
        ctx.userInfo = decode;
      } catch (error) {
        ctx.status = 401;
        ctx.body = {
          message: error.message,
        };
        return;
      }
      //切记先解析token并存储数据后再执行回调，否则解析数据获取不到
      await next();
    } else {
      ctx.status = 401;
      ctx.body = {
        message: "token不存在",
      };
      return;
    }
  };
};
