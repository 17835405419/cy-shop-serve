"use strict";

const Controller = require("egg").Controller;
const { momentTime } = require("../common/untils");
class GoodsController extends Controller {
  async add() {
    // 发布商品
    const { ctx } = this;
    const upGoods = ctx.request.body;
    let uptime = momentTime(Date.now());
    // 格式化上传时间
    const goods = Object.assign(upGoods, { uptime: uptime });
    // 调用serve层操纵数据库
    const res = await ctx.service.goods.add(goods);
    if (res) {
      ctx.body = {
        code: 200,
        msg: "发布成功",
      };
    }
  }
  async del() {
    //删除商品
    const { ctx } = this;
    const goodsId = ctx.params.goodsId;
    const res = await ctx.service.goods.del(goodsId);

    if (res) {
      ctx.body = {
        code: 200,
        msg: "删除成功",
        res,
      };
    } else {
      ctx.status = 400;
      ctx.body = {
        code: 400,
        msg: "无商品数据",
      };
    }
  }

  async downShop() {
    // 上下架商品
    const { ctx } = this;
    try {
      const goodsId = ctx.params.goodsId; //取出商品Id
      const { delStatus } = ctx.request.body;
      const res = await ctx.service.goods.change({ goodsId, delStatus });
      if (delStatus == 0 && res === true) {
        ctx.body = {
          code: 200,
          msg: "商品上架成功",
        };
      } else if (delStatus == 1 && res === true) {
        ctx.body = {
          code: 200,
          msg: "商品下架成功",
        };
      }
    } catch (error) {
      console.log(error);
    }
  }

  async change() {
    // 修改商品
    const { ctx } = this;
    try {
      const goodsId = ctx.params.goodsId;
      const { goodsName, coverPhoto, contentPhoto, desc, goodsNum, newPrice } =
        ctx.request.body;
      const res = await ctx.service.goods.change({
        goodsId,
        goodsName,
        coverPhoto,
        contentPhoto,
        desc,
        goodsNum,
        newPrice,
      });
      if (res === true) {
        ctx.body = {
          code: 200,
          msg: "商品修改成功",
        };
      }
    } catch (error) {
      console.log(error);
    }
  }

  async find() {
    // 分页查询商品列表
    const { ctx } = this;
    const { shopType, pageNum, pageSize } = ctx.query; // pageSize  是指一页有多少条数据

    const { res } = await ctx.service.goods.find({
      shopType,
      pageNum,
      pageSize,
    });
    ctx.body = {
      code: 200,
      msg: "查询成功",
      res,
    };
  }

  async findOne() {
    // 查找单个商品详情
    const { ctx } = this;
    try {
      const goodsId = ctx.params;
      const res = await ctx.service.goods.findOne(goodsId);
      if (res !== false) {
        ctx.body = {
          code: 200,
          goodsInfo: res,
        };
      } else {
        ctx.status = 400;
        ctx.body = {
          msg: "查询失败",
        };
      }
    } catch (error) {
      ctx.status = 500;
      console.log(error);
    }
  }

  async findByOpenId() {
    // 根据作者Id查询已经发布的商品信息
    const { ctx } = this;
    const { authorId, pageNum, pageSize } = ctx.query;
    const res = await ctx.service.goods.find({ authorId, pageNum, pageSize });
    ctx.body = {
      code: 200,
      msg: "查询成功",
      res,
    };
  }
}

module.exports = GoodsController;
