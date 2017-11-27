var config = {
  NODE_ENV:'production',
  options:{
    host:"1ac256e68d824785.m.cnsza.kvstore.aliyuncs.com",
    // "host":"127.0.0.1",
    pass:'1ac256e68d824785:HansRedis666666',
    auth:'1ac256e68d824785:HansRedis666666',
    port: "6379",
    db:31,
    ttl: 60 * 60 * 24 * 1   //Session的有效期为1天
  }
}

module.exports = config;