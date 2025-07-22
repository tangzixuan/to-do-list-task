import React, { useState, useEffect } from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Typography,
} from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs, { Dayjs } from 'dayjs'
import 'dayjs/locale/zh-cn'

dayjs.locale('zh-cn')

export interface Task {
  id?: string
  title: string
  description: string
  status: 'pending' | 'in_progress' | 'completed'
  priority: 'low' | 'medium' | 'high'
  dueDate: string
  assigneeId?: string
  teamId?: string
}

interface TaskDialogProps {
  open: boolean
  onClose: () => void
  onSave: (task: Omit<Task, 'id'> | Task) => void
  task?: Task | null
  mode: 'create' | 'edit'
}

const TaskDialog: React.FC<TaskDialogProps> = ({
  open,
  onClose,
  onSave,
  task,
  mode,
}) => {
  const [formData, setFormData] = useState<Omit<Task, 'id'>>({
    title: '',
    description: '',
    status: 'pending',
    priority: 'medium',
    dueDate: dayjs().add(7, 'day').format('YYYY-MM-DD'),
  })

  const [dueDate, setDueDate] = useState<Dayjs | null>(dayjs().add(7, 'day'))
  const [errors, setErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    if (task && mode === 'edit') {
      setFormData({
        title: task.title,
        description: task.description,
        status: task.status,
        priority: task.priority,
        dueDate: task.dueDate,
        assigneeId: task.assigneeId,
        teamId: task.teamId,
      })
      setDueDate(dayjs(task.dueDate))
    } else {
      // 重置表单
      setFormData({
        title: '',
        description: '',
        status: 'pending',
        priority: 'medium',
        dueDate: dayjs().add(7, 'day').format('YYYY-MM-DD'),
      })
      setDueDate(dayjs().add(7, 'day'))
    }
    setErrors({})
  }, [task, mode, open])

  const handleInputChange = (field: keyof Omit<Task, 'id'>, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    // 清除相关错误
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  const handleDateChange = (date: Dayjs | null) => {
    setDueDate(date)
    if (date) {
      setFormData(prev => ({ ...prev, dueDate: date.format('YYYY-MM-DD') }))
      if (errors.dueDate) {
        setErrors(prev => ({ ...prev, dueDate: '' }))
      }
    }
  }

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}

    if (!formData.title.trim()) {
      newErrors.title = '任务标题不能为空'
    } else if (formData.title.trim().length < 2) {
      newErrors.title = '任务标题至少需要2个字符'
    }

    if (!formData.description.trim()) {
      newErrors.description = '任务描述不能为空'
    } else if (formData.description.trim().length < 5) {
      newErrors.description = '任务描述至少需要5个字符'
    }

    if (!dueDate) {
      newErrors.dueDate = '请选择截止日期'
    } else if (dueDate.isBefore(dayjs(), 'day')) {
      newErrors.dueDate = '截止日期不能早于今天'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSave = () => {
    if (!validateForm()) {
      return
    }

    const taskData = {
      ...formData,
      title: formData.title.trim(),
      description: formData.description.trim(),
    }

    if (mode === 'edit' && task) {
      onSave({ ...taskData, id: task.id })
    } else {
      onSave(taskData)
    }

    onClose()
  }

  const handleCancel = () => {
    onClose()
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        {mode === 'create' ? '创建新任务' : '编辑任务'}
      </DialogTitle>
      
      <DialogContent>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, pt: 1 }}>
          <TextField
            label="任务标题"
            variant="outlined"
            fullWidth
            value={formData.title}
            onChange={(e) => handleInputChange('title', e.target.value)}
            error={!!errors.title}
            helperText={errors.title}
            placeholder="请输入任务标题"
          />

          <TextField
            label="任务描述"
            variant="outlined"
            fullWidth
            multiline
            rows={3}
            value={formData.description}
            onChange={(e) => handleInputChange('description', e.target.value)}
            error={!!errors.description}
            helperText={errors.description}
            placeholder="请详细描述任务内容"
          />

          <Box sx={{ display: 'flex', gap: 2 }}>
            <FormControl fullWidth>
              <InputLabel>状态</InputLabel>
              <Select
                value={formData.status}
                label="状态"
                onChange={(e) => handleInputChange('status', e.target.value)}
              >
                <MenuItem value="pending">待处理</MenuItem>
                <MenuItem value="in_progress">进行中</MenuItem>
                <MenuItem value="completed">已完成</MenuItem>
              </Select>
            </FormControl>

            <FormControl fullWidth>
              <InputLabel>优先级</InputLabel>
              <Select
                value={formData.priority}
                label="优先级"
                onChange={(e) => handleInputChange('priority', e.target.value)}
              >
                <MenuItem value="low">低</MenuItem>
                <MenuItem value="medium">中</MenuItem>
                <MenuItem value="high">高</MenuItem>
              </Select>
            </FormControl>
          </Box>

          <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="zh-cn">
            <DatePicker
              label="截止日期"
              value={dueDate}
              onChange={handleDateChange}
              slotProps={{
                textField: {
                  fullWidth: true,
                  error: !!errors.dueDate,
                  helperText: errors.dueDate,
                },
              }}
              minDate={dayjs()}
            />
          </LocalizationProvider>

          {mode === 'edit' && (
            <Box sx={{ mt: 1 }}>
              <Typography variant="caption" color="text.secondary">
                任务 ID: {task?.id}
              </Typography>
            </Box>
          )}
        </Box>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={handleCancel} color="inherit">
          取消
        </Button>
        <Button onClick={handleSave} variant="contained">
          {mode === 'create' ? '创建' : '保存'}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default TaskDialog
