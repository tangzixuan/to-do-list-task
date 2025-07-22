import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface User {
  id: string
  email: string
  username: string
  avatarUrl?: string
  createdAt: string
}

interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  login: (user: User, token: string) => void
  logout: () => void
  updateUser: (user: Partial<User>) => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,

      login: (user: User, token: string) => {
        // 保存 token 到 localStorage（用于 API 拦截器）
        localStorage.setItem('token', token)
        localStorage.setItem('user', JSON.stringify(user))
        
        set({
          user,
          token,
          isAuthenticated: true,
        })
      },

      logout: () => {
        // 清除 localStorage
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        
        set({
          user: null,
          token: null,
          isAuthenticated: false,
        })
      },

      updateUser: (userData: Partial<User>) => {
        const currentUser = get().user
        if (currentUser) {
          set({
            user: { ...currentUser, ...userData },
          })
        }
      },
    }),
    {
      name: 'auth-storage',
    }
  )
)
