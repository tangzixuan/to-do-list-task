import api from './api'

export interface LoginRequest {
  email: string
  password: string
}

export interface RegisterRequest {
  email: string
  password: string
  username: string
}

export interface User {
  id: string
  email: string
  username: string
  avatarUrl?: string
  createdAt: string
}

export interface AuthResponse {
  user: User
  token: string
}

export const authAPI = {
  // 用户登录
  login: async (data: LoginRequest): Promise<AuthResponse> => {
    const response = await api.post('/auth/login', data)
    return response.data
  },

  // 用户注册
  register: async (data: RegisterRequest): Promise<AuthResponse> => {
    const response = await api.post('/auth/register', data)
    return response.data
  },

  // 获取当前用户信息
  getProfile: async (): Promise<User> => {
    const response = await api.get('/auth/profile')
    return response.data
  },
}
