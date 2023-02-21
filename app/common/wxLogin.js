const appId = "wx54a2ebeaf7870a44"; //小程序id
const secret = "b46f3b49cbf07526c18efcf22df6e7c9"; //小程序秘钥

module.exports = {
  // 获取openid
  async getOpenId(code, ctx) {
    const wxUrl = `https://api.weixin.qq.com/sns/jscode2session?appid=${appId}&secret=${secret}&js_code=${code}&grant_type=authorization_code`;
    const { data } = await ctx.curl(wxUrl, {
      // 自动解析 JSON response
      dataType: "json",
      // 3 秒超时
      timeout: 3000,
    });
    return data.openid;
  },

  // 调用微信接口颁发access_token 调用微信其他功能
  async getAccess_token(ctx) {
    const tokenUrl = `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${appId}&secret=${secret}`;
    const { data } = await ctx.curl(tokenUrl, {
      // 自动解析 JSON response
      dataType: "json",
      // 3 秒超时
      timeout: 3000,
    });
    return data;
  },
};
