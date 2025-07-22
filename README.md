# Todo List - 协作任务管理系统

> demo preview: [demo](./demo.mp4)

---
---

<div align="center">

![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![NestJS](https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)

**基于 TypeScript 的全栈协作任务管理系统**

参考 Lark 任务清单，支持团队协作的现代化任务管理平台

[功能特性](#-功能特性) • [快速开始](#-快速开始) • [技术栈](#-技术栈) • [项目结构](#-项目结构) • [API 文档](#-api-文档)

</div>

---

## 📋 功能特性

### 🔐 用户认证
- ✅ 用户注册/登录
- ✅ JWT Token 认证
- ✅ 密码加密存储
- ✅ 权限控制

### 👥 团队协作
- ✅ 多人共享任务团队
- ✅ 团队成员管理
- ✅ 角色权限 (Owner/Admin/Member)
- ✅ 成员邀请机制

### 📝 任务管理
- ✅ 任务增删改查
- ✅ 任务状态管理 (待处理/进行中/已完成/已取消)
- ✅ 任务优先级 (低/中/高/紧急)
- ✅ 任务指派与关注
- ✅ 子任务支持 (无限层级)
- ✅ 任务拖拽排序

### 🗨️ 协作功能
- ✅ 任务评论系统
- ✅ 任务历史记录
- ✅ 任务关注者通知
- ✅ 实时消息提醒

### 🔍 高级功能
- ✅ 内容筛选 (时间段/创建者/执行者)
- ✅ 多维度排序 (时间/优先级/创建者)
- ✅ 定时重复任务
- ✅ 到期提醒通知

---

## 🚀 快速开始

### 环境要求
- **Node.js** 18+
- **Docker** & **Docker Compose**
- **Git**

### 一键启动

```bash
# 1. 克隆项目
git clone <repository-url>
cd to-do-list-task

# 2. 一键启动 (推荐)
npm start

# 3. 访问应用
# 前端: http://localhost:3000
# 后端: http://localhost:3001
# API文档: http://localhost:3001/api
```

### 手动启动

```bash
# 安装依赖
npm run setup

# 启动数据库
npm run docker:up

# 启动后端 (新终端)
npm run dev:backend

# 启动前端 (新终端)
npm run dev:frontend
```

---

## 🛠️ 技术栈

### 前端技术
- **React 18** - 用户界面框架
- **TypeScript** - 类型安全
- **Material-UI** - UI 组件库
- **React Query** - 数据获取与缓存
- **Zustand** - 状态管理
- **React Hook Form** - 表单处理
- **Vite** - 构建工具

### 后端技术
- **NestJS** - Node.js 企业级框架
- **TypeORM** - ORM 数据库工具
- **PostgreSQL** - 关系型数据库
- **Redis** - 缓存与任务队列
- **JWT** - 身份认证
- **Swagger** - API 文档

### DevOps
- **Docker** - 容器化
- **Docker Compose** - 服务编排
- **Nginx** - 反向代理

---

## 📁 项目结构

```
to-do-list-task/
├── 📂 frontend/              # React 前端应用
│   ├── 📂 src/
│   │   ├── 📂 components/    # 可复用组件
│   │   ├── 📂 pages/         # 页面组件
│   │   ├── 📂 stores/        # 状态管理
│   │   ├── 📂 services/      # API 服务
│   │   └── 📂 types/         # TypeScript 类型
│   ├── 📄 Dockerfile
│   └── 📄 package.json
├── 📂 backend/               # NestJS 后端 API
│   ├── 📂 src/
│   │   ├── 📂 entities/      # 数据库实体
│   │   ├── 📂 auth/          # 认证模块
│   │   ├── 📂 users/         # 用户管理
│   │   ├── 📂 teams/         # 团队管理
│   │   ├── 📂 tasks/         # 任务管理
│   │   └── 📂 comments/      # 评论系统
│   ├── 📄 Dockerfile
│   └── 📄 package.json
├── 📂 docker/                # Docker 配置
│   └── 📄 init.sql          # 数据库初始化
├── 📄 docker-compose.yml    # 服务编排
├── 📄 start.sh             # 一键启动脚本
└── 📄 README.md            # 项目说明
```

---

## 🗄️ 数据库设计

### 核心实体关系

```mermaid
erDiagram
    User ||--o{ TeamMember : belongs_to
    User ||--o{ Task : creates
    User ||--o{ Task : assigned_to
    Team ||--o{ TeamMember : has
    Team ||--o{ Task : contains
    Task ||--o{ Task : has_subtask
    Task ||--o{ TaskComment : has
    Task ||--o{ TaskWatcher : watched_by
    Task ||--o{ TaskHistory : has_history
```

### 数据表
- **users** - 用户信息
- **teams** - 团队信息
- **team_members** - 团队成员关系
- **tasks** - 任务主表
- **task_watchers** - 任务关注者
- **task_comments** - 任务评论
- **task_history** - 任务历史
- **recurring_tasks** - 定时任务配置
- **notifications** - 通知消息

---

## 📡 API 文档

### 认证相关
```http
POST /auth/register    # 用户注册
POST /auth/login       # 用户登录
POST /auth/refresh     # 刷新令牌
```

### 用户管理
```http
GET  /users/profile    # 获取用户信息
PUT  /users/profile    # 更新用户信息
```

### 团队管理
```http
GET  /teams           # 获取团队列表
POST /teams           # 创建团队
GET  /teams/:id       # 获取团队详情
PUT  /teams/:id       # 更新团队信息
POST /teams/:id/members    # 邀请成员
DELETE /teams/:id/members/:userId  # 移除成员
```

### 任务管理
```http
GET  /tasks           # 获取任务列表
POST /tasks           # 创建任务
GET  /tasks/:id       # 获取任务详情
PUT  /tasks/:id       # 更新任务
DELETE /tasks/:id     # 删除任务
POST /tasks/:id/watchers     # 添加关注者
DELETE /tasks/:id/watchers/:userId  # 取消关注
```

> 🔗 **完整 API 文档**: 启动项目后访问 http://localhost:3001/api

---

## 🧪 开发指南

### 代码规范
- **ESLint** + **Prettier** - 代码格式化
- **Husky** - Git 提交钩子
- **Conventional Commits** - 规范化提交

### 测试策略
- **单元测试** - Jest + Testing Library
- **集成测试** - Supertest
- **E2E 测试** - Cypress

### 分支管理
- `main` - 主分支 (稳定版本)
- `develop` - 开发分支
- `feature/*` - 功能分支
- `hotfix/*` - 紧急修复

---

## 🚀 部署说明

### 开发环境
```bash
docker-compose up -d
```

### 生产环境
```bash
docker-compose -f docker-compose.prod.yml up -d
```

### 环境变量
```env
DATABASE_URL=postgresql://user:pass@localhost:5432/todolist
REDIS_URL=redis://localhost:6379
JWT_SECRET=your-secret-key
```

---

## 📊 项目特色

- ✅ **企业级架构** - 模块化可扩展设计
- ✅ **类型安全** - 全栈 TypeScript 开发
- ✅ **容器化部署** - Docker 一键部署
- ✅ **API 优先** - RESTful + Swagger 文档
- ✅ **现代化 UI** - Material Design 响应式界面
- ✅ **实时协作** - WebSocket 实时通信
- ✅ **性能优化** - 查询优化 + Redis 缓存

---

## 📚 相关文档

- 📖 [开发指南](./DEVELOPMENT.md) - 详细开发文档
- 🏗️ [架构设计](./README_IMPLEMENTATION.md) - 系统架构说明
- 📋 [项目总结](./PROJECT_SUMMARY.md) - 功能实现总结
- 🔧 [部署手册](./DEPLOYMENT.md) - 生产环境部署

---

## 🤝 贡献指南

1. **Fork** 本项目
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 **Pull Request**

---

## 📄 许可证

本项目基于 **MIT** 许可证开源 - 查看 [LICENSE](LICENSE) 文件了解详情

---

## 👨‍💻 联系方式

如有问题或建议，欢迎提交 **Issue** 或 **Pull Request**！

<div align="center">

**⭐ 如果这个项目对你有帮助，请给个 Star 支持一下！**

</div>