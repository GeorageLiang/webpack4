# 基本webpack搭建
## webpack配置
  环境变量: node_env(DefinePlugin)
## webpack-dev配置
  热更新
  端口：3005
## 加入基本依赖：loader，plugins
  html: HtmlWebpackPlugin
  css: 支持sass(),单独提取css文件(MiniCssExtractPlugin)
  js: 支持es6-es5(babel),压缩js(UglifyjsWebpackPlugin)
  img: 超过8M返回dataUrl(url-loader)
## eslint