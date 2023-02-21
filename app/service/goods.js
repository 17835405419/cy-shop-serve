"use strict";

const await = require("await-stream-ready/lib/await");

const Service = require("egg").Service;

class GoodsService extends Service {
  async add(goods) {
    const { ctx } = this;
    // 添加商品
    try {
      const res = await ctx.model.Goods.create(goods);
      if (res) return true;
    } catch (error) {
      console.log("数据已存在", error);
    }
  }

  async del(goodsId) {
    const { ctx } = this;
    // 删除商品
    try {
      const res = await ctx.model.Goods.findOneAndRemove({ goodsId });
      if (res) {
        return res;
      }
    } catch (error) {
      console.log("删除失败", error);
    }
  }

  async change(shop) {
    // 修改商品
    const { ctx } = this;
    const {delStatus,goodsId} = shop
    let content = {};
    // 更改商品状态

    if (!String(delStatus)) {
      Object.assign(content, {
        goodsName: shop.goodsName,
        coverPhoto: shop.coverPhoto,
        contentPhoto: shop.contentPhoto,
        desc: shop.desc,
        goodsNum: shop.goodsNum,
        newPrice: shop.newPrice,
      });

    }else{
      Object.assign(content,{
        delStatus
      })  
    }

    try {
      const {nModified} = await ctx.model.Goods.updateOne(
        { goodsId: goodsId },
        content
      );
      if (String(nModified)) {
        return true;
      }
    } catch (error) {
      console.log("查询数据库失败", error);
    }
  }

  async find(options) {
    const { ctx } = this;
    let { shopType,authorId ,pageNum, pageSize } = options;
    // 设置查询条件
    let condition = {};

  // 按照商品类型查找
    shopType && Object.assign(condition, {
        shopType,
      });
      
  // 根据作者Id查找
  authorId && Object.assign(condition,{
    authorId
  })
console.log(condition)    // 判断页码
    if (!pageNum || isNaN(Number(pageNum))) {
      pageNum = 1;
    } else {
      pageNum = Number(pageNum);
    }
    // 计算总页数
    let count = 0; //总条数
    await ctx.model.Goods.find(condition)
      .count()
      .then((rel) => {
        count = rel;
      });

    //最后一页
    let totalPage = 0;
    if (count > 0) {
      //    向上取整
      totalPage = Math.ceil(count / pageSize);
    }
    //  判断当前页码的范围
    if (pageNum > 0 && pageNum > totalPage) {
      pageNum = totalPage;
    } else if (pageNum < 1) {
      pageNum = 1;
    }

    //   skip 是查询的起始位置  limit 是每页要查询多少条数据
    // 计算起始位置
    let start = (pageNum - 1) * pageSize;

    const res = await ctx.model.Goods.find(condition)
      .skip(start)
      .limit(Number(pageSize))
      .sort("-uptime")
      .select([
        "goodsId",
        "goodsName",
        "authorId",
        "coverPhoto",
        "contentPhoto",
        "desc",
        "goodsNum",
        "newPrice",
        "delStatus",
        "shopType",
        "uptime",
      ]);
    return {
      res,
      count,
      pageSize,
      pageNum,
    };
  }

  async findOne(goodsId) {
    const {ctx} = this
    const res = await ctx.model.Goods.findOne(goodsId)
    if (res) {
      return res
    }else{
      return false
    }
  }
}

module.exports = GoodsService;
