import React from 'react'
import {
  Container,
  Grid,
  Paper,
  Box,
  Typography,
  Card,
  CardContent,
  Avatar,
  IconButton,
} from '@mui/material'
import {
  Assignment,
  Group,
  TrendingUp,
  Notifications,
} from '@mui/icons-material'
import { useAuthStore } from '../stores/authStore'

const DashboardPage: React.FC = () => {
  const { user } = useAuthStore()

  const stats = [
    {
      title: '我的任务',
      value: '12',
      icon: <Assignment />,
      color: '#1976d2',
    },
    {
      title: '团队数量',
      value: '3',
      icon: <Group />,
      color: '#388e3c',
    },
    {
      title: '已完成',
      value: '8',
      icon: <TrendingUp />,
      color: '#f57c00',
    },
    {
      title: '待处理',
      value: '4',
      icon: <Notifications />,
      color: '#d32f2f',
    },
  ]

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          欢迎回来，{user?.username}！
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          这里是您的任务管理仪表盘
        </Typography>

        {/* 统计卡片 */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {stats.map((stat, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card>
                <CardContent>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}
                  >
                    <Box>
                      <Typography variant="h4" component="div">
                        {stat.value}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {stat.title}
                      </Typography>
                    </Box>
                    <Avatar sx={{ bgcolor: stat.color }}>
                      {stat.icon}
                    </Avatar>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* 最近任务 */}
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                最近任务
              </Typography>
              <Box sx={{ textAlign: 'center', py: 4 }}>
                <Typography variant="body2" color="text.secondary">
                  暂无任务数据
                </Typography>
              </Box>
            </Paper>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                团队活动
              </Typography>
              <Box sx={{ textAlign: 'center', py: 4 }}>
                <Typography variant="body2" color="text.secondary">
                  暂无活动数据
                </Typography>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Container>
  )
}

export default DashboardPage
