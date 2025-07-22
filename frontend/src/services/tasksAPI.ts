import api from './api'

export interface Task {
  id: string
  title: string
  description?: string
  status: 'todo' | 'in_progress' | 'completed'
  priority: 'low' | 'medium' | 'high'
  dueDate?: string
  assigneeId?: string
  assignee?: {
    id: string
    username: string
    email: string
    avatarUrl?: string
  }
  createdAt: string
  updatedAt: string
}

export interface CreateTaskRequest {
  title: string
  description?: string
  status?: 'todo' | 'in_progress' | 'completed'
  priority?: 'low' | 'medium' | 'high'
  dueDate?: string
  assigneeId?: string
}

export interface UpdateTaskRequest extends Partial<CreateTaskRequest> {}

export interface TaskFilters {
  status?: 'todo' | 'in_progress' | 'completed'
  priority?: 'low' | 'medium' | 'high'
  assigneeId?: string
  search?: string
}

export const tasksAPI = {
  // 获取任务列表
  getTasks: async (filters?: TaskFilters): Promise<Task[]> => {
    const params = new URLSearchParams()
    if (filters?.status) params.append('status', filters.status)
    if (filters?.priority) params.append('priority', filters.priority)
    if (filters?.assigneeId) params.append('assigneeId', filters.assigneeId)
    if (filters?.search) params.append('search', filters.search)

    const response = await api.get(`/tasks?${params}`)
    return response.data
  },

  // 创建任务
  createTask: async (data: CreateTaskRequest): Promise<Task> => {
    const response = await api.post('/tasks', data)
    return response.data
  },

  // 更新任务
  updateTask: async (id: string, data: UpdateTaskRequest): Promise<Task> => {
    const response = await api.put(`/tasks/${id}`, data)
    return response.data
  },

  // 删除任务
  deleteTask: async (id: string): Promise<void> => {
    await api.delete(`/tasks/${id}`)
  },

  // 获取单个任务
  getTask: async (id: string): Promise<Task> => {
    const response = await api.get(`/tasks/${id}`)
    return response.data
  },
}
