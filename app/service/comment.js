"use strict";

const await = require("await-stream-ready/lib/await");

const Service = require("egg").Service;

class CommentService extends Service {
  async add(comment) {
      const {ctx} = this
      const res = await ctx.model.Comment.create(comment)
    return res
  }
  async reply(reply){
    const {ctx} = this
    const res =  await ctx.model.Comment.findOne({openId:reply.replyId,commentId:reply.commentId},(err,doc)=>{
        doc.childComment.push({
            replyCommentId:reply.replyCommentId,
            nickName:reply.nickName,
            avatarUrl:reply.avatarUrl,
            childComment:reply.childComment,
            createTime:reply.createTime
        })
        doc.save()
    })
    if (res) {
        return reply
    }
  }

  async find(option){
    const {ctx} = this
    const {goodsId,num} = option
    let condition = {}
    Object.assign(condition,{goodsId:goodsId})
    const res = await ctx.model.Comment.find(condition).limit(Number(num)).sort({"commentTime":-1})
    if (res) {
        return res
    }
  }

  async del(option){
      const {ctx} = this
      const {openId,goodsId} = option
      let condition = {}
      Object.assign(condition,
        {openId:openId,goodsId:goodsId
      })
     const res =  await ctx.model.Comment.findOneAndRemove(condition)
     if (res) {
         return true
     }
  }
}

module.exports = CommentService;