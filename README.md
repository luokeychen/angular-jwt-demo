
# angular-jwt-demo

这是一个 DEMO， node + express 实现 jwt（json web token)。

分为 client 和 server 两个文件夹。

server 主要使用 express-jwt、node-jsonwebtoken、 redis。

server 文件下执行 `npm install`, 并且安装 redis,打开 redis。

然后执行 `node server`。

再在client下打开个服务器 访问 client。

更多请见注释。


## 未解决的问题：

- [ ] 为什么要把 logout 撤销的令牌存 redis，直接撤销不行吗？（who can tell me ?）
	  + 使用 express-jwt-blacklist 或者使用 express-jwt 的 revoke 方法？

- [ ] refresh-token:如何保持过期时间为最后一次请求之后的过期时间，而不是加上jwt之后的过期时间，这样不就是永久不		过期了？

- [ ] 对密码进行加密

## 已经解决的问题：

- [x] 客户端和服务器端的权限限制；
- [x] 服务器端 API 使用 json-server 实现 restful, 并使用 jwt 认证授权；
- [x] 服务端静态文件不需要授权可访问。