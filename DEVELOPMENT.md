# 开发指南

## 🚀 快速开始

### 1. 环境准备
确保你的开发环境已安装：
- Node.js 18+
- Docker & Docker Compose
- Git

### 2. 克隆项目
```bash
git clone <repository-url>
cd to-do-list-task
```

### 3. 一键启动
```bash
# 方式1: 使用启动脚本 (推荐)
npm start

# 方式2: 使用 Docker Compose
npm run dev

# 方式3: 手动启动各服务
npm run setup          # 安装依赖
npm run docker:up       # 启动数据库
npm run dev:backend     # 启动后端
npm run dev:frontend    # 启动前端
```

### 4. 访问应用
- 前端: http://localhost:3000
- 后端: http://localhost:3001  
- API文档: http://localhost:3001/api

## 🏗️ 项目架构

### 技术选型理由

**前端 - React + TypeScript**
- **React 18**: 使用最新的 Hooks 和 Concurrent Features
- **TypeScript**: 类型安全，提高开发效率
- **Material-UI**: Google Material Design，组件丰富
- **React Query**: 强大的数据获取和缓存能力
- **Zustand**: 轻量级状态管理，比 Redux 更简单

**后端 - NestJS + TypeORM**
- **NestJS**: 企业级 Node.js 框架，模块化设计
- **TypeORM**: 功能强大的 ORM，支持 TypeScript
- **PostgreSQL**: 关系型数据库，ACID 特性
- **Redis**: 缓存和任务队列
- **Bull**: 基于 Redis 的任务队列系统

### 目录结构详解

```
backend/src/
├── entities/           # 数据库实体定义
├── auth/              # 认证模块 (JWT, Guards)
├── users/             # 用户管理模块
├── teams/             # 团队管理模块  
├── tasks/             # 任务管理模块
├── comments/          # 评论系统模块
├── notifications/     # 通知系统模块
├── common/            # 通用组件 (拦截器、管道、装饰器)
└── config/            # 配置文件

frontend/src/
├── components/        # 可复用组件
│   ├── Layout/       # 布局组件
│   ├── Task/         # 任务相关组件
│   ├── Team/         # 团队相关组件
│   └── Common/       # 通用组件
├── pages/            # 页面组件
├── stores/           # Zustand 状态管理
├── services/         # API 服务封装
├── hooks/            # 自定义 Hooks
├── utils/            # 工具函数
└── types/            # TypeScript 类型定义
```

## 🔧 开发工作流

### 1. 功能开发流程
1. 从 `main` 分支创建功能分支
2. 编写代码，遵循代码规范
3. 编写测试用例
4. 提交 PR，通过代码审查
5. 合并到 `main` 分支

### 2. 代码规范
- **ESLint + Prettier**: 自动代码格式化
- **Husky**: Git hooks，提交前检查
- **Conventional Commits**: 规范化提交信息

### 3. 分支管理
- `main`: 主分支，稳定版本
- `develop`: 开发分支
- `feature/xxx`: 功能分支
- `hotfix/xxx`: 紧急修复分支

## 📊 数据库设计

### 核心实体关系

```
User (用户)
├── createdTasks (创建的任务)
├── assignedTasks (指派的任务)  
├── teamMemberships (团队成员身份)
├── watchedTasks (关注的任务)
└── notifications (通知)

Team (团队)
├── owner (拥有者)
├── members (成员)
└── tasks (任务)

Task (任务)
├── creator (创建者)
├── assignee (执行者)
├── team (所属团队)
├── subtasks (子任务)
├── watchers (关注者)
├── comments (评论)
└── histories (历史记录)
```

### 数据库最佳实践
- 使用 UUID 作为主键
- 软删除代替硬删除
- 创建适当的索引
- 使用数据库约束保证数据完整性

## 🔌 API 设计

### RESTful 设计原则
- 使用标准 HTTP 方法 (GET, POST, PUT, DELETE)
- 统一的响应格式
- 合理的状态码使用
- API 版本控制

### 认证机制
```typescript
// JWT Token 结构
{
  sub: string,      // 用户ID
  email: string,    // 用户邮箱
  iat: number,      // 签发时间
  exp: number       // 过期时间
}
```

### 分页查询
```typescript
// 统一分页参数
interface PaginationQuery {
  page: number;     // 页码 (从1开始)
  limit: number;    // 每页数量
  sortBy?: string;  // 排序字段
  sortOrder?: 'ASC' | 'DESC';
}

// 统一分页响应
interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
```

## 🧪 测试策略

### 测试类型
- **单元测试**: Jest + Testing Library
- **集成测试**: Supertest
- **E2E测试**: Cypress
- **性能测试**: Artillery

### 测试覆盖率要求
- 单元测试覆盖率 > 80%
- 核心业务逻辑覆盖率 > 95%

## 🚀 部署指南

### 开发环境
```bash
# 使用 Docker Compose
docker-compose up -d
```

### 生产环境
```bash
# 构建生产镜像
docker-compose -f docker-compose.prod.yml build

# 启动生产服务
docker-compose -f docker-compose.prod.yml up -d
```

### 环境变量配置
```env
# .env.development
NODE_ENV=development
DATABASE_URL=postgresql://admin:password123@localhost:5432/todolist

# .env.production  
NODE_ENV=production
DATABASE_URL=postgresql://user:pass@prod-db:5432/todolist
```

## 🔍 调试技巧

### 后端调试
```bash
# 查看应用日志
docker-compose logs -f backend

# 进入容器调试
docker-compose exec backend sh

# 数据库调试
docker-compose exec postgres psql -U admin -d todolist
```

### 前端调试
- 使用 React DevTools
- Redux DevTools (如果使用 Redux)
- 网络面板查看 API 调用

## 🛠️ 常用命令

```bash
# 项目管理
npm start              # 一键启动
npm run setup          # 安装所有依赖
npm run clean          # 清理 Docker 资源
npm run reset          # 重置项目

# 开发
npm run dev:frontend   # 启动前端
npm run dev:backend    # 启动后端
npm run build          # 构建项目

# Docker
npm run docker:up      # 启动 Docker 服务
npm run docker:down    # 停止 Docker 服务
npm run docker:logs    # 查看 Docker 日志

# 测试
npm test               # 运行所有测试
npm run test:frontend  # 前端测试
npm run test:backend   # 后端测试
```

## 🐛 常见问题

### Q: Docker 启动失败
**A**: 检查端口是否被占用，确保 Docker Desktop 正在运行

### Q: 数据库连接失败
**A**: 等待数据库完全启动 (约10-15秒)，检查环境变量配置

### Q: 前端无法连接后端
**A**: 确认后端服务已启动，检查代理配置

### Q: 依赖安装失败
**A**: 清理 node_modules，使用 `npm run reset` 重新安装

## 📚 学习资源

- [NestJS 官方文档](https://docs.nestjs.com/)
- [React 官方文档](https://react.dev/)
- [TypeORM 文档](https://typeorm.io/)
- [Material-UI 文档](https://mui.com/)
- [Docker 官方文档](https://docs.docker.com/)

## 🤝 贡献指南

1. Fork 项目
2. 创建功能分支
3. 提交代码
4. 创建 Pull Request
5. 等待代码审查

欢迎提交 Issue 和 Pull Request！
