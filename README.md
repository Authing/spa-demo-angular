# 安装依赖

运行以下命令安装项目依赖：

```bash
yarn install
```

# 填写你的应用配置

```js
const authing = new AuthenticationClient({
	appId: 'APP_ID',
	appHost: 'https://{你的域名}.authing.cn',
	redirectUri: 'http://localhost:5000/callback'
});
```

# 运行

运行本示例程序：

```bash
$ yarn start
```

# 参考文档

[Vue 快速开始](https://docs.authing.cn/v2/quickstarts/spa/angular.html)

# License

spa-demo-angular is [MIT licensed](https://github.com/Authing/spa-demo-angular//blob/main/LICENSE)
