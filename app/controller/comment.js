"use strict";

const await = require("await-stream-ready/lib/await");

const Controller = require("egg").Controller;

class CommentController extends Controller {
  async add() {
    //   发布评论
    const { ctx } = this;
try {
    const comment = ctx.request.body;
    let commentTime = Date.now()
    Object.assign(comment,{commentTime:commentTime})
    const res = await ctx.service.comment.add(comment)  
    if (res) {
        ctx.body = {
            code:200,
            msg:"发布评论成功",
            res
        }
    }else{
        ctx.status = 400
        ctx.body = {
            msg:"发布评论失败"
        } 
    }
} catch (error) {
    ctx.status = 500
    console.log(error);
}
      

  }
  async reply(){
    //   回复接口
    const { ctx } = this;
    try {
    const reply = ctx.request.body;
    let createTime = Date.now()
    Object.assign(reply,{createTime:createTime})
    const res = await this.service.comment.reply(reply)
    if (res) {
        ctx.body = {
            code:200,
            msg:"回复成功",
            res
        }
    }
    } catch (error) {
        ctx.status = 500
        console.log(error);
    }
    
  }
  async find(){
    //   查找评论
      const {ctx} = this
      try {
        const option =ctx.query
        const res = await ctx.service.comment.find(option) 
        if (res) {
            ctx.body = {
                code:200,
                msg:res
            }
        }
      } catch (error) {
         ctx.status = 500
         console.log(error); 
      }
     
  }
  async del(){
      const {ctx} = this
      try {
        const option = ctx.query
        const res = await ctx.service.comment.del(option)
        if (res == true) {
            ctx.body = {
                code:200,
                msg:"刪除成功"
            }
        }else{
            ctx.status = 400
            ctx.body = {
                msg:"刪除失敗"
            }
        }
      } catch (error) {
        ctx.status = 500
        console.log(error);
      }
     
  }
}

module.exports = CommentController;
