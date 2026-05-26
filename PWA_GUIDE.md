# PWA 安装指南

## 生成图标

PWA 需要多个尺寸的图标。请访问以下网站生成：

1. 打开 https://realfavicongenerator.net/
2. 上传 `public/icon.svg` 或使用下面的 SVG 内容
3. 下载生成的文件包
4. 将 `icons` 文件夹内容复制到 `public/icons/`

## 或者手动生成 PNG 图标

需要创建以下尺寸的图标 (PNG 格式):
- 72x72
- 96x96
- 128x128
- 144x144
- 152x152
- 192x192
- 384x384
- 512x512

## 安装应用

### Android
1. 用 Chrome 打开应用
2. 点击右上角菜单
3. 选择 "添加主屏幕" 或 "安装应用"

### iOS
1. 用 Safari 打开应用
2. 点击分享按钮
3. 向下滑动，选择 "添加到主屏幕"

## Service Worker

Service Worker 已在应用启动时自动注册，用于:
- 离线缓存
- 加速再次访问
- 后台更新

## manifest.json 配置

已配置：
- 应用名称：Learning Hub
- 显示模式：standalone（独立窗口）
- 主题色：#0ea5e9
- 支持方向：portrait（竖屏优先）