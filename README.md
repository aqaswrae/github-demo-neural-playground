# NOVA LAB｜GitHub 动态网页演示项目

这是一个专门用于 GitHub 教学演示的纯静态网页项目。它不需要安装依赖，也不需要后端服务，适合演示：

- `git clone` 拉取项目；
- 修改 HTML、CSS 和 JavaScript；
- `git pull` 获取更新；
- 使用 GitHub Pages 发布网页。

## 页面效果

- 鼠标响应式粒子连线背景；
- 3D AI 能量核心与动态轨道；
- 极光、脉冲、日蚀三种能量模式；
- 自动运行的终端日志；
- 数字滚动动画；
- 随机灵感生成器；
- 手机与电脑自适应布局；
- 支持“减少动态效果”系统设置。

## 直接运行

下载或克隆项目后，直接双击 `index.html` 即可打开。

也可以在项目目录中启动一个本地服务器：

```bash
python -m http.server 8080
```

然后在浏览器访问：

```text
http://localhost:8080
```

## 项目结构

```text
github-demo-neural-playground/
├─ index.html   # 页面内容
├─ styles.css   # 视觉样式与动画
├─ script.js    # 粒子、交互与动态效果
└─ README.md    # 项目说明
```

## 发布到 GitHub Pages

1. 把项目上传到 GitHub 仓库；
2. 打开仓库的 **Settings**；
3. 进入 **Pages**；
4. 选择从主分支发布；
5. 保存并等待 GitHub 生成公开网址。

## 可以快速修改的内容

- 修改 `index.html` 中的主标题和介绍文字；
- 修改 `styles.css` 顶部的颜色变量；
- 修改 `script.js` 中的灵感词库和终端日志。
