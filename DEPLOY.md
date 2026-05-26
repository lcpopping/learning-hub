# 一键部署到 Vercel（免费）

## 部署步骤（全程浏览器操作，无需命令行）

### 1. 打包项目
将 `F:\大开大合\ai-learning-hub` 文件夹压缩成 zip 文件。

### 2. 访问 Vercel
浏览器打开：https://vercel.com/new

### 3. 导入项目
- 点击 "Import Project" 或 "Add New..."
- 选择 "Import Git Repository" 或上传压缩包
- 如果上传，选择 `ai-learning-hub.zip` 并解压后的内容

### 4. 配置项目
- Framework Preset: **Next.js**（自动检测）
- 其他选项保持默认

### 5. 部署
- 点击 "Deploy"
- 等待 1-2 分钟完成

### 6. 获得公网地址
部署成功后，你会获得一个类似 `https://your-project.vercel.app` 的地址，这就是你的永久公网地址！

---

## 之后的访问方式

### 任何设备访问
直接在浏览器输入你获得的 Vercel 地址，如：
```
https://learning-hub-xxx.vercel.app
```

- 手机移动数据：✅ 可以
- 任何 WiFi：✅ 可以
- 任何电脑：✅ 可以

---

## 更新内容

修改代码后，重新部署：
1. 重新压缩 zip
2. 在 Vercel Dashboard 点击项目 → "Deployments" → "Create New Deployment"
3. 上传新版本

---

## 预估时间
- 打包：1 分钟
- 部署：2 分钟
- 总计：约 5 分钟即可完成！