"use strict";

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = (app) => {
  const { router, controller, io } = app;
  router.get("/", controller.home.index);
  // 用户接口
  router.post("/user/login", controller.user.login); //登录接口
  router.get(
    "/user/getUserInfo",
    app.middleware.jwtVerify(),
    controller.user.getUserInfo
  ); //获取用户信息
  // 商品接口
  router.post("/goods/add", controller.goods.add); //添加商品
  router.delete("/goods/del/:goodsId", controller.goods.del); //删除商品
  router.put("/goods/downShop/:goodsId", controller.goods.downShop); //上下架商品
  router.put("/goods/change/:goodsId", controller.goods.change); //修改商品信息
  router.get("/goods/find", controller.goods.find); //分页查询商品数据
  router.get("/goods/findByOpenId", controller.goods.findByOpenId); //根据作者ID查询商品
  router.get("/goods/findOne/:goodsId", controller.goods.findOne); //查询具體商品数据
  router.post("/goods/upload", controller.utils.uploadFiles); //上传

  //评论接口
  router.post("/comment/add", controller.comment.add); //添加评论
  router.put("/comment/reply", controller.comment.reply); //回复评论
  router.get("/comment/find", controller.comment.find); //查找评论
  router.delete("/comment/del", controller.comment.del); //删除评论

  //  socket, 指向app/io/controller/chat.js的index方法
  io.route("chat", app.io.controller.chat.exchange);
};
