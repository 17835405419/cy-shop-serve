/* eslint valid-jsdoc: "off" */

"use strict";

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = (appInfo) => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = (exports = {});

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + "_1641521632859_5864";

  // add your middleware config here
  config.middleware = [];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  // 数据库配置
  config.mongoose = {
    client: {
      url: "mongodb://127.0.0.1:27017/cy-egg-serve", // 你的数据库地址，cy-egg-serve是你数据库得名字
      options: {
        useNewUrlParser: true,
      },
    },
  };

  // 允许提交post请求
  config.security = {
    csrf: {
      enable: false,
    },
  };
  // 配置跨域
  config.cors = {
    origin: "*", //匹配规则  域名+端口  *则为全匹配
    allowMethods: "GET,HEAD,PUT,POST,DELETE,PATCH",
  };

  // 配置jwt
  config.jwt = {
    secret: "cy-serve", //定义加密的秘钥
  };

  // 配置上传文件
  config.multipart = {
    mode: "stream",
    allowArrayField: true,
  };
  // 配置socket
  config.io = {
    init: {}, // passed to engine.io
    namespace: {
      "/": {
        connectionMiddleware: ["auth"],
        packetMiddleware: [],
      },
      "/example": {
        connectionMiddleware: [],
        packetMiddleware: [],
      },
    },
  };
  return {
    ...config,
    ...userConfig,
  };
};
