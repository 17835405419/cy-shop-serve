module.exports = (app) => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const CommentSchema = new Schema({
    openId: {
      type: String,
      required: true,
    }, //评论者Id
    nickName: {
      type: String,
      default: "",
    }, //评论者昵称
    avatarUrl: {
      type: String,
      default: "",
    },
    goodsId: {
      type: Number,
      required: true,
    },
    authorId: {
      type: String,
      required: true,
    },
    commentId: {
      type: Number,
      required: true,
    }, //评论的Id
    goodsTitle: {
      type: String,
      default: "",
    },
    commentContent: {
      type: String,
      default: "",
    },
    childComment: {
      type: Array,
      default: [],
    }, //回复
    commentTime: {
      type: Number,
    },
  });
  return mongoose.model("comments", CommentSchema);
};
