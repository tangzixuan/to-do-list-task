#!/bin/bash

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}    Todo List 项目快速启动脚本${NC}"
echo -e "${BLUE}========================================${NC}"

# 检查 Docker 是否安装
if ! command -v docker &> /dev/null; then
    echo -e "${RED}错误: Docker 未安装。请先安装 Docker。${NC}"
    exit 1
fi

# 检查 Docker Compose 是否安装
if ! command -v docker-compose &> /dev/null; then
    echo -e "${RED}错误: Docker Compose 未安装。请先安装 Docker Compose。${NC}"
    exit 1
fi

# 检查 Node.js 是否安装
if ! command -v node &> /dev/null; then
    echo -e "${RED}错误: Node.js 未安装。请先安装 Node.js 18+。${NC}"
    exit 1
fi

echo -e "${GREEN}✓ 环境检查通过${NC}"

# 安装依赖
echo -e "${YELLOW}正在安装项目依赖...${NC}"
npm install

echo -e "${YELLOW}正在安装前端依赖...${NC}"
cd frontend && npm install
cd ..

echo -e "${YELLOW}正在安装后端依赖...${NC}"
cd backend && npm install
cd ..

echo -e "${GREEN}✓ 依赖安装完成${NC}"

# 启动 Docker 服务
echo -e "${YELLOW}正在启动 Docker 服务...${NC}"
docker-compose up -d postgres redis

# 等待数据库启动
echo -e "${YELLOW}等待数据库启动...${NC}"
sleep 10

# 检查数据库连接
echo -e "${YELLOW}检查数据库连接...${NC}"
docker-compose exec -T postgres pg_isready -h localhost -p 5432 -U admin

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ 数据库连接成功${NC}"
else
    echo -e "${RED}✗ 数据库连接失败${NC}"
    exit 1
fi

# 启动后端
echo -e "${YELLOW}正在启动后端服务...${NC}"
cd backend
npm run start:dev &
BACKEND_PID=$!
cd ..

# 等待后端启动
sleep 5

# 启动前端
echo -e "${YELLOW}正在启动前端服务...${NC}"
cd frontend
npm run dev &
FRONTEND_PID=$!
cd ..

echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}    项目启动成功！${NC}"
echo -e "${GREEN}========================================${NC}"
echo -e "${BLUE}前端地址: http://localhost:3000${NC}"
echo -e "${BLUE}后端地址: http://localhost:3001${NC}"
echo -e "${BLUE}API 文档: http://localhost:3001/api${NC}"
echo -e "${GREEN}========================================${NC}"

# 等待用户输入停止
echo -e "${YELLOW}按 Ctrl+C 停止所有服务${NC}"

# 捕获中断信号
trap 'echo -e "\n${YELLOW}正在停止服务...${NC}"; kill $BACKEND_PID $FRONTEND_PID; docker-compose down; echo -e "${GREEN}服务已停止${NC}"; exit 0' INT

# 保持脚本运行
while true; do
    sleep 1
done
