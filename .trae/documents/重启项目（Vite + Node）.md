## 目标
- 在项目根目录重启本地开发环境：前端（Vite React，默认 `5173`）与后端（Node/Nodemon，默认 `3001`）。

## 执行位置
- 项目根目录：`/Users/tongzhang/Desktop/solelybootcamp/trae-04 sneat b-saas web/new ecommerce dashboard`
- 关键文件：`package.json`、`vite.config.ts`、`.env`

## 重启步骤
1. 停止当前进程
- 在运行开发服务器的终端按 `Ctrl + C` 结束（`concurrently` 会同时终止前后端）。
- 如遇端口仍占用：
  - 查看占用：`lsof -i :5173`、`lsof -i :3001`
  - 结束占用进程：`kill -9 <PID>`（必要时：`killall node`）

2. 启动开发环境
- 从项目根运行：`npm run dev`
- 仅前端：`npm run client:dev`
- 仅后端：`npm run server:dev`

3. 验证运行
- 前端：打开 `http://localhost:5173`，确认页面正常加载。
- 后端：终端应显示后端监听 `3001`；前端访问 `/api/...` 应通过 Vite 代理到后端。

## 配置要点
- 前端端口：Vite 默认 `5173`（`vite.config.ts` 未覆盖）。
- 后端端口：`.env` 中 `PORT=3001`；后端代码兜底 `process.env.PORT || 3001`。
- CORS/跨域：`.env` 中 `CORS_ORIGIN=http://localhost:5173`；后端读取 `FRONTEND_URL` 或默认 `http://localhost:5173`。
- Vite 代理：`/api` → `http://localhost:3001`（见 `vite.config.ts`）。

## 故障排查
- 依赖问题：`npm ci`（或 `npm install`）后再 `npm run dev`。
- 端口冲突：确认 5173/3001 未被其他进程占用。
- 环境变量：确保 `.env` 存在且包含 `PORT`、`CORS_ORIGIN` 等必要项。

## 预期结果
- 浏览器访问 `http://localhost:5173` 正常；终端日志显示前端 Vite 与后端 Nodemon 均已启动，代理 `/api` 可用。