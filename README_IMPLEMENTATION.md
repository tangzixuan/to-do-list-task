# Todo List 协作任务管理系统

## 项目概述

这是一个基于 TypeScript 的全栈协作任务管理系统，参考 Lark 任务清单功能，支持多人协作的任务管理。

### 技术栈

**前端:**
- React 18 + TypeScript
- Material-UI (MUI) - UI 组件库
- React Router - 路由管理
- React Query - 数据获取和缓存
- Zustand - 状态管理
- React Hook Form + Yup - 表单处理
- Axios - HTTP 客户端
- Vite - 构建工具

**后端:**
- NestJS - Node.js 框架
- TypeORM - ORM 工具
- PostgreSQL - 数据库
- JWT - 身份认证
- Bull + Redis - 任务队列
- Swagger - API 文档

**DevOps:**
- Docker + Docker Compose - 容器化
- Nginx - 反向代理

## 功能特性

### 已实现功能架构设计

1. **用户认证系统**
   - 用户注册/登录
   - JWT Token 认证
   - 密码加密存储

2. **团队管理**
   - 创建团队
   - 邀请成员
   - 角色权限管理 (Owner/Admin/Member)

3. **任务管理**
   - 任务增删改查
   - 任务状态管理 (待处理/进行中/已完成/已取消)
   - 任务优先级 (低/中/高/紧急)
   - 任务指派和关注
   - 子任务支持
   - 任务位置排序

4. **协作功能**
   - 任务评论系统
   - 任务历史记录
   - 任务关注者
   - 实时通知

5. **高级功能**
   - 内容筛选 (时间段、创建者、执行者)
   - 多种排序方式
   - 定时重复任务
   - 到期提醒

## 数据库设计

### 核心表结构

- `users` - 用户表
- `teams` - 团队表  
- `team_members` - 团队成员表
- `tasks` - 任务表
- `task_watchers` - 任务关注者表
- `task_comments` - 任务评论表
- `task_history` - 任务历史记录表
- `recurring_tasks` - 定时任务配置表
- `notifications` - 通知表

## API 设计

### 认证相关
- `POST /auth/register` - 用户注册
- `POST /auth/login` - 用户登录
- `POST /auth/refresh` - 刷新 Token

### 用户管理
- `GET /users/profile` - 获取用户信息
- `PUT /users/profile` - 更新用户信息

### 团队管理
- `GET /teams` - 获取用户所在团队
- `POST /teams` - 创建团队
- `GET /teams/:id` - 获取团队详情
- `PUT /teams/:id` - 更新团队信息
- `POST /teams/:id/members` - 邀请成员
- `DELETE /teams/:id/members/:userId` - 移除成员

### 任务管理
- `GET /tasks` - 获取任务列表
- `POST /tasks` - 创建任务
- `GET /tasks/:id` - 获取任务详情
- `PUT /tasks/:id` - 更新任务
- `DELETE /tasks/:id` - 删除任务
- `POST /tasks/:id/watchers` - 添加关注者
- `DELETE /tasks/:id/watchers/:userId` - 取消关注

### 评论系统
- `GET /tasks/:id/comments` - 获取任务评论
- `POST /tasks/:id/comments` - 添加评论
- `PUT /comments/:id` - 更新评论
- `DELETE /comments/:id` - 删除评论

## 项目结构

```
to-do-list-task/
├── docker-compose.yml          # Docker 编排文件
├── package.json               # 根目录包配置
├── backend/                   # 后端项目
│   ├── src/
│   │   ├── entities/         # 数据库实体
│   │   ├── auth/            # 认证模块
│   │   ├── users/           # 用户模块
│   │   ├── teams/           # 团队模块
│   │   ├── tasks/           # 任务模块
│   │   ├── comments/        # 评论模块
│   │   └── notifications/   # 通知模块
│   ├── Dockerfile
│   └── package.json
├── frontend/                  # 前端项目
│   ├── src/
│   │   ├── components/      # 可复用组件
│   │   ├── pages/          # 页面组件
│   │   ├── stores/         # 状态管理
│   │   ├── services/       # API 服务
│   │   └── utils/          # 工具函数
│   ├── Dockerfile
│   └── package.json
└── docker/
    └── init.sql              # 数据库初始化脚本
```

## 快速开始

### 环境要求

- Node.js 18+
- Docker & Docker Compose
- Git

### 安装依赖

```bash
# 安装根目录依赖
npm install

# 安装前后端依赖
npm run setup
```

### 启动开发环境

```bash
# 使用 Docker Compose 启动完整环境
npm run dev

# 或者分别启动前后端 (需要手动启动 PostgreSQL 和 Redis)
npm run dev:backend    # 后端: http://localhost:3001
npm run dev:frontend   # 前端: http://localhost:3000
```

### 访问应用

- 前端应用: http://localhost:3000
- 后端API: http://localhost:3001
- API 文档: http://localhost:3001/api

### 数据库管理

```bash
# 查看数据库状态
docker-compose ps

# 进入数据库容器
docker-compose exec postgres psql -U admin -d todolist

# 查看数据库日志
docker-compose logs postgres
```

## 开发指南

### 代码规范

- 使用 TypeScript 严格模式
- 遵循 ESLint 和 Prettier 配置
- 提交前运行 `npm run lint` 和 `npm test`

### Git 工作流

1. 从 `main` 分支创建功能分支
2. 开发完成后提交 PR
3. 代码审查通过后合并到 `main`

### 环境变量

创建 `.env` 文件配置环境变量:

```env
# 数据库配置
DATABASE_URL=postgresql://admin:password123@localhost:5432/todolist

# Redis 配置  
REDIS_URL=redis://localhost:6379

# JWT 配置
JWT_SECRET=your-super-secret-jwt-key

# 前端 API 地址
REACT_APP_API_URL=http://localhost:3001
```

## 部署

### 生产环境部署

```bash
# 构建生产镜像
docker-compose -f docker-compose.prod.yml build

# 启动生产环境
docker-compose -f docker-compose.prod.yml up -d
```

### 健康检查

应用提供以下健康检查端点：

- `GET /health` - 应用健康状态
- `GET /health/db` - 数据库连接状态

## 许可证

MIT License

## 贡献

欢迎提交 Issue 和 Pull Request！
