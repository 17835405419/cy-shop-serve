module.exports = (app) => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const GoodsSchema = new Schema({
    goodsId: {
      type: Number,
      unique: true,
      required: true,
    },
    goodsName: {
      type: String,
      required: true,
    },
    authorId: {
      type: String,
      required: true,
    },
    coverPhoto: {
      type: String,
      default: "",
    },
    contentPhoto: {
      type: Array,
      default: [],
    },
    desc: {
      type: String,
      default: "",
    },
    goodsNum: {
      type: Number,
      default: 1,
    },
    newPrice: {
      type: Number,
      required: true,
    },
    //商品状态 0为在售  1 为下架
    delStatus: {
      type: Number,
      default: 0,
    },
    // 商品类型区分  0为出售 1为求购
    shopType: {
      type: Number,
      required: true,
      default: 0,
    },
    // 上传时间
    uptime: {
      type: String,
      default: "",
    },
  });
  return mongoose.model("goods", GoodsSchema);
};
