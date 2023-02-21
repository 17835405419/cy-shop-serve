"use strict";

/** @type Egg.EggPlugin */
module.exports = {
  // had enabled by egg
  // static: {
  //   enable: true,
  // }

  //配置使用mogodb
  mongoose: {
    enable: true,
    package: "egg-mongoose",
  },
  // 开启跨域
  cors: {
    enable: true,
    package: "egg-cors",
  },
  // 启用jwt
  jwt: {
    enable: true,
    package: "egg-jwt",
  },
  // 开启socket.io
  io: {
    enable: true,
    package: "egg-socket.io",
  },
};
