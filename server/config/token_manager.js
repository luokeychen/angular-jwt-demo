var redisClient = require('./redis_database').redisClient;
// 设置 token 过期时间。
var TOKEN_EXPIRATION = '2m';
// 用户退出 存 redis 数据库过期时间
var TOKEN_EXPIRATION_SEC = 60;

//  这里处理logout 之后的 token 问题
exports.verifyToken = function (req, res, next) {
	var token = getToken(req.headers);
	redisClient.get(token, function (err, reply) {
		if (err) {
			console.log(err);
			return res.send(500);
		}
		console.log("比对的token：" + token)
		console.log(reply + 'reply')
		// redis 中存在 返回 401
		if (reply) {
			console.log(3333);
			res.send(401);
		}
		else {
			console.log(5555);
			next();
		}

	});
};

//  这里加这一层是为了 用户登出后 token 保存起来。
exports.expireToken = function(headers) {
	var token = getToken(headers);
	if (token != null) {
		redisClient.set(token, { is_expired: true });
		console.log("退出得token："+token)
    	redisClient.expire(token, TOKEN_EXPIRATION_SEC);
	}
};

// 从浏览器端取得 token
var getToken = function(headers) {
	if (headers && headers.authorization) {
		var authorization = headers.authorization;
		var part = authorization.split(' ');

		if (part.length == 2) {
			var token = part[1];

			return part[1];
		}
		else {
			return null;
		}
	}
	else {
		return null;
	}
};

exports.TOKEN_EXPIRATION = TOKEN_EXPIRATION;
exports.TOKEN_EXPIRATION_SEC = TOKEN_EXPIRATION_SEC;