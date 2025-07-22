import React, { useState, useEffect } from 'react'
import {
  Container,
  Box,
  Typography,
  Paper,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Chip,
  Snackbar,
  Alert,
  CircularProgress,
} from '@mui/material'
import {
  Add,
  Edit,
  Delete,
  Assignment,
} from '@mui/icons-material'
import TaskDialog, { Task } from '../components/TaskDialog'
import ConfirmDeleteDialog from '../components/ConfirmDeleteDialog'
import { tasksAPI } from '../services/tasksAPI'

const TasksPage: React.FC = () => {
  // 状态管理
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)

  // 对话框状态
  const [taskDialogOpen, setTaskDialogOpen] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [currentTask, setCurrentTask] = useState<Task | null>(null)
  const [dialogMode, setDialogMode] = useState<'create' | 'edit'>('create')

  // 消息提示状态
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success' as 'success' | 'error' | 'warning' | 'info',
  })

  // 加载任务列表
  const loadTasks = async () => {
    try {
      setLoading(true)
      const tasksData = await tasksAPI.getTasks()
      
      // 转换后端数据格式为前端格式
      const formattedTasks = tasksData.map(task => ({
        id: task.id,
        title: task.title,
        description: task.description || '',
        status: convertBackendStatus(task.status),
        priority: convertBackendPriority(task.priority),
        dueDate: task.dueDate || '',
      }))
      
      setTasks(formattedTasks)
    } catch (error: any) {
      console.error('加载任务失败:', error)
      showMessage('加载任务失败，请稍后重试', 'error')
    } finally {
      setLoading(false)
    }
  }

  // 转换后端状态到前端格式
  const convertBackendStatus = (status: string): 'pending' | 'in_progress' | 'completed' => {
    switch (status) {
      case 'pending': return 'pending'
      case 'in_progress': return 'in_progress'
      case 'completed': return 'completed'
      default: return 'pending'
    }
  }

  // 转换前端状态到后端格式
  const convertFrontendStatus = (status: string): 'todo' | 'in_progress' | 'completed' => {
    switch (status) {
      case 'pending': return 'todo'
      case 'in_progress': return 'in_progress'
      case 'completed': return 'completed'
      default: return 'todo'
    }
  }

  // 转换后端优先级到前端格式
  const convertBackendPriority = (priority: string): 'low' | 'medium' | 'high' => {
    switch (priority) {
      case 'low': return 'low'
      case 'medium': return 'medium'
      case 'high': return 'high'
      default: return 'medium'
    }
  }

  // 页面加载时获取任务列表
  useEffect(() => {
    loadTasks()
  }, [])

  // 显示消息提示
  const showMessage = (message: string, severity: 'success' | 'error' | 'warning' | 'info' = 'success') => {
    setSnackbar({ open: true, message, severity })
  }

  // 关闭消息提示
  const handleSnackbarClose = () => {
    setSnackbar(prev => ({ ...prev, open: false }))
  }

  // 创建任务
  const handleCreateTask = () => {
    setCurrentTask(null)
    setDialogMode('create')
    setTaskDialogOpen(true)
  }

  // 编辑任务
  const handleEditTask = (task: Task) => {
    setCurrentTask(task)
    setDialogMode('edit')
    setTaskDialogOpen(true)
  }

  // 删除任务 - 打开确认对话框
  const handleDeleteTask = (task: Task) => {
    setCurrentTask(task)
    setDeleteDialogOpen(true)
  }

  // 确认删除任务
  const handleConfirmDelete = async () => {
    if (currentTask && currentTask.id) {
      try {
        await tasksAPI.deleteTask(currentTask.id)
        
        // 从本地状态中移除任务
        setTasks(prev => prev.filter(task => task.id !== currentTask.id))
        showMessage(`任务"${currentTask.title}"已删除`, 'success')
        setCurrentTask(null)
      } catch (error: any) {
        console.error('删除任务失败:', error)
        if (error.response?.status === 403) {
          showMessage('您没有权限删除此任务', 'error')
        } else if (error.response?.status === 404) {
          showMessage('任务不存在', 'error')
        } else {
          showMessage('删除任务失败，请稍后重试', 'error')
        }
      }
    }
  }

  // 保存任务（创建或编辑）
  const handleSaveTask = async (taskData: Omit<Task, 'id'> | Task) => {
    try {
      if (dialogMode === 'create') {
        // 创建新任务
        const createData = {
          title: taskData.title,
          description: taskData.description || undefined,
          status: convertFrontendStatus(taskData.status),
          priority: taskData.priority,
          dueDate: taskData.dueDate || undefined,
        }
        
        const newTask = await tasksAPI.createTask(createData)
        
        // 转换后端数据格式并添加到列表
        const formattedTask: Task = {
          id: newTask.id,
          title: newTask.title,
          description: newTask.description || '',
          status: convertBackendStatus(newTask.status),
          priority: convertBackendPriority(newTask.priority),
          dueDate: newTask.dueDate || '',
        }
        
        setTasks(prev => [formattedTask, ...prev])
        showMessage('任务创建成功！', 'success')
      } else {
        // 编辑现有任务
        const editedTask = taskData as Task
        const updateData = {
          title: editedTask.title,
          description: editedTask.description || undefined,
          status: convertFrontendStatus(editedTask.status),
          priority: editedTask.priority,
          dueDate: editedTask.dueDate || undefined,
        }
        
        const updatedTask = await tasksAPI.updateTask(editedTask.id!, updateData)
        
        // 转换后端数据格式并更新列表
        const formattedTask: Task = {
          id: updatedTask.id,
          title: updatedTask.title,
          description: updatedTask.description || '',
          status: convertBackendStatus(updatedTask.status),
          priority: convertBackendPriority(updatedTask.priority),
          dueDate: updatedTask.dueDate || '',
        }
        
        setTasks(prev => prev.map(task => 
          task.id === formattedTask.id ? formattedTask : task
        ))
        showMessage('任务更新成功！', 'success')
      }
    } catch (error: any) {
      console.error('保存任务失败:', error)
      if (error.response?.status === 403) {
        showMessage('您没有权限操作此任务', 'error')
      } else if (error.response?.status === 404) {
        showMessage('任务不存在', 'error')
      } else {
        showMessage(`${dialogMode === 'create' ? '创建' : '更新'}任务失败，请稍后重试`, 'error')
      }
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'success'
      case 'in_progress':
        return 'warning'
      case 'pending':
        return 'default'
      default:
        return 'default'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed':
        return '已完成'
      case 'in_progress':
        return '进行中'
      case 'pending':
        return '待处理'
      default:
        return '未知'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'error'
      case 'medium':
        return 'warning'
      case 'low':
        return 'info'
      default:
        return 'default'
    }
  }

  const getPriorityText = (priority: string) => {
    switch (priority) {
      case 'high':
        return '高'
      case 'medium':
        return '中'
      case 'low':
        return '低'
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
            任务管理
          </Typography>
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={handleCreateTask}
          >
            创建任务
          </Button>
        </Box>

        <Paper>
          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
              <CircularProgress />
            </Box>
          ) : tasks.length === 0 ? (
            <Box sx={{ textAlign: 'center', py: 8 }}>
              <Assignment sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
              <Typography variant="h6" color="text.secondary" gutterBottom>
                还没有任务
              </Typography>
              <Typography variant="body2" color="text.secondary">
                点击"创建任务"按钮开始添加您的第一个任务
              </Typography>
            </Box>
          ) : (
            <List>
              {tasks.map((task, index) => (
                <ListItem
                  key={task.id}
                  divider={index < tasks.length - 1}
                  sx={{ py: 2 }}
                >
                  <ListItemText
                    primary={
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Typography variant="h6">{task.title}</Typography>
                        <Chip
                          label={getStatusText(task.status)}
                          color={getStatusColor(task.status) as any}
                          size="small"
                        />
                        <Chip
                          label={getPriorityText(task.priority)}
                          color={getPriorityColor(task.priority) as any}
                          size="small"
                          variant="outlined"
                        />
                      </Box>
                    }
                    secondary={
                      <Box sx={{ mt: 1 }}>
                        <Typography variant="body2" color="text.secondary">
                          {task.description}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          截止日期: {task.dueDate}
                        </Typography>
                      </Box>
                    }
                  />
                  <ListItemSecondaryAction>
                    <IconButton 
                      edge="end" 
                      aria-label="edit" 
                      sx={{ mr: 1 }}
                      onClick={() => handleEditTask(task)}
                    >
                      <Edit />
                    </IconButton>
                    <IconButton 
                      edge="end" 
                      aria-label="delete"
                      onClick={() => handleDeleteTask(task)}
                    >
                      <Delete />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
          )}
        </Paper>

        {/* 任务对话框 */}
        <TaskDialog
          open={taskDialogOpen}
          onClose={() => setTaskDialogOpen(false)}
          onSave={handleSaveTask}
          task={currentTask}
          mode={dialogMode}
        />

        {/* 删除确认对话框 */}
        <ConfirmDeleteDialog
          open={deleteDialogOpen}
          onClose={() => setDeleteDialogOpen(false)}
          onConfirm={handleConfirmDelete}
          taskTitle={currentTask?.title || ''}
        />

        {/* 消息提示 */}
        <Snackbar
          open={snackbar.open}
          autoHideDuration={4000}
          onClose={handleSnackbarClose}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <Alert 
            onClose={handleSnackbarClose} 
            severity={snackbar.severity}
            variant="filled"
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Box>
    </Container>
  )
}

export default TasksPage
