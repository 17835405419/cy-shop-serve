// {app_root}/app/io/middleware/auth.js

module.exports = () => {
  return async (ctx, next) => {
    const { socket } = ctx;
    const { room } = socket.handshake.query;

    socket.join(room);

    await next();
  };
};
