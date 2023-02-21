"use strict";

const Service = require("egg").Service;
// 上传文件到七牛云
const fs = require("fs");
const path = require("path");
const md5 = require("md5");
const qiniu = require("qiniu");
const awaitWriteStream = require("await-stream-ready").write; //可以使用await操作
const sendToWormhole = require("stream-wormhole"); //当上传失败时可以将流消耗掉
const bucket = "cy-egg-serve"; //要上传的空间名
const imageUrl = "r5mld7zsq.hb-bkt.clouddn.com"; // 空间绑定的域名
const accessKey = "4qHZaK8ItQ9GFr9kfHM2cUsEiPl5J9PHydVcGHlt"; //Access Key
const secretKey = "fU_stp9coHT8h0_Fi7UCL9PK9sNfd_0oUb7LK8DL"; //Secret Key
const mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
const options = {
  scope: bucket,
  expires: 7200,
};
const putPolicy = new qiniu.rs.PutPolicy(options);
const uploadToken = putPolicy.uploadToken(mac);

let config = new qiniu.conf.Config();
// 空间对应的机房
config.zone = qiniu.zone.Zone_z1;

class UtilsService extends Service {
  async uploadFiles() {
    const { ctx } = this;
    const stream = await ctx.getFileStream(); //流形式上传
    const filename =
      md5(stream.filename) + path.extname(stream.filename).toLocaleLowerCase(); //md5加密文件名
    const localFilePath = path.join(__dirname, "../public/uploads", filename); //保存的路径
    const writeStream = fs.createWriteStream(localFilePath); //写入流文件
    try {
      await awaitWriteStream(stream.pipe(writeStream));
      const formUploader = new qiniu.form_up.FormUploader(config);
      const putExtra = new qiniu.form_up.PutExtra();
      const imgSrc = await new Promise((resolve, reject) => {
        formUploader.putFile(
          uploadToken,
          filename,
          localFilePath,
          putExtra,
          (respErr, respBody, respInfo) => {
            if (respErr) {
              reject(respErr);
            }
            if (respInfo.statusCode == 200) {
              resolve(imageUrl + respBody.key);
            } else {
              reject("意外错误");
            }
            // 上传之后删除本地文件
            fs.unlinkSync(localFilePath);
          }
        );
      });

      // 进行判断
      if (imgSrc !== "") {
        return {
          url: imgSrc,
        };
      } else {
        return false;
      }
    } catch (error) {
      //如果出现错误，关闭管道
      await sendToWormhole(stream);
      return false;
    }
  }
}

module.exports = UtilsService;
