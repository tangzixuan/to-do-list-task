import React from 'react'
import {
  Container,
  Box,
  Typography,
  Paper,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  IconButton,
  Chip,
} from '@mui/material'
import {
  Add,
  Group,
  People,
  Settings,
} from '@mui/icons-material'

const TeamsPage: React.FC = () => {
  // 模拟团队数据
  const teams = [
    {
      id: '1',
      name: '前端开发团队',
      description: '负责用户界面和用户体验开发',
      memberCount: 5,
      role: 'owner',
    },
    {
      id: '2',
      name: '后端开发团队',
      description: '负责服务器端开发和API设计',
      memberCount: 3,
      role: 'member',
    },
    {
      id: '3',
      name: '设计团队',
      description: '负责产品设计和视觉设计',
      memberCount: 2,
      role: 'admin',
    },
  ]

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'owner':
        return 'error'
      case 'admin':
        return 'warning'
      case 'member':
        return 'info'
      default:
        return 'default'
    }
  }

  const getRoleText = (role: string) => {
    switch (role) {
      case 'owner':
        return '拥有者'
      case 'admin':
        return '管理员'
      case 'member':
        return '成员'
      default:
        return '未知'
    }
  }

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 3 }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 3,
          }}
        >
          <Typography variant="h4" component="h1">
            团队管理
          </Typography>
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={() => {
              // TODO: 打开创建团队对话框
            }}
          >
            创建团队
          </Button>
        </Box>

        <Paper>
          {teams.length === 0 ? (
            <Box sx={{ textAlign: 'center', py: 8 }}>
              <Group sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
              <Typography variant="h6" color="text.secondary" gutterBottom>
                还没有团队
              </Typography>
              <Typography variant="body2" color="text.secondary">
                点击"创建团队"按钮开始创建您的第一个团队
              </Typography>
            </Box>
          ) : (
            <List>
              {teams.map((team, index) => (
                <ListItem
                  key={team.id}
                  divider={index < teams.length - 1}
                  sx={{ py: 2 }}
                  secondaryAction={
                    <IconButton edge="end" aria-label="settings">
                      <Settings />
                    </IconButton>
                  }
                >
                  <ListItemAvatar>
                    <Avatar sx={{ bgcolor: 'primary.main' }}>
                      <Group />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Typography variant="h6">{team.name}</Typography>
                        <Chip
                          label={getRoleText(team.role)}
                          color={getRoleColor(team.role) as any}
                          size="small"
                        />
                      </Box>
                    }
                    secondary={
                      <Box sx={{ mt: 1 }}>
                        <Typography variant="body2" color="text.secondary">
                          {team.description}
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                          <People sx={{ fontSize: 16, mr: 0.5 }} />
                          <Typography variant="caption" color="text.secondary">
                            {team.memberCount} 名成员
                          </Typography>
                        </Box>
                      </Box>
                    }
                  />
                </ListItem>
              ))}
            </List>
          )}
        </Paper>
      </Box>
    </Container>
  )
}

export default TeamsPage
