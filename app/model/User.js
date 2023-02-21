module.exports = (app) => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const UserSchema = new Schema({
    openId: {
      type: String,
      unique: true,
    },
    nickName: {
      type: String,
      default: "",
    },
    avatarUrl: {
      type: String,
      default: "",
    },
    phone: {
      type: String,
      default: "",
    },
    shopNum: {
      type: Number,
      default: 0,
    },
    saleNum: {
      type: Number,
      default: 0,
    },
  });
  return mongoose.model("user", UserSchema);
};
