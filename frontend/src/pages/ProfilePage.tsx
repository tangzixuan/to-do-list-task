import React, { useState } from 'react'
import {
  Container,
  Paper,
  Box,
  Typography,
  TextField,
  Button,
  Avatar,
  Grid,
  Divider,
  Alert,
  CircularProgress,
} from '@mui/material'
import { Edit, Save, Cancel } from '@mui/icons-material'
import { useAuthStore } from '../stores/authStore'

const ProfilePage: React.FC = () => {
  const { user, updateUser } = useAuthStore()
  const [isEditing, setIsEditing] = useState(false)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [formData, setFormData] = useState({
    username: user?.username || '',
    email: user?.email || '',
    avatarUrl: user?.avatarUrl || '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleEdit = () => {
    setIsEditing(true)
    setSuccess(false)
  }

  const handleCancel = () => {
    setIsEditing(false)
    setFormData({
      username: user?.username || '',
      email: user?.email || '',
      avatarUrl: user?.avatarUrl || '',
    })
  }

  const handleSave = async () => {
    setLoading(true)
    try {
      // TODO: 实际的 API 调用
      // await userAPI.updateProfile(formData)
      
      // 模拟保存成功
      updateUser(formData)
      setIsEditing(false)
      setSuccess(true)
      setTimeout(() => setSuccess(false), 3000)
    } catch (error) {
      console.error('更新失败:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Container maxWidth="md">
      <Box sx={{ py: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          个人资料
        </Typography>

        {success && (
          <Alert severity="success" sx={{ mb: 3 }}>
            个人资料更新成功！
          </Alert>
        )}

        <Paper sx={{ p: 4 }}>
          <Grid container spacing={3}>
            {/* 头像部分 */}
            <Grid item xs={12} md={4}>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <Avatar
                  src={formData.avatarUrl}
                  sx={{ width: 120, height: 120, mb: 2 }}
                >
                  {formData.username.charAt(0).toUpperCase()}
                </Avatar>
                <Typography variant="h6" gutterBottom>
                  {formData.username}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {formData.email}
                </Typography>
              </Box>
            </Grid>

            {/* 表单部分 */}
            <Grid item xs={12} md={8}>
              <Box component="form">
                <TextField
                  fullWidth
                  label="用户名"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  disabled={!isEditing}
                  margin="normal"
                />
                <TextField
                  fullWidth
                  label="邮箱"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={!isEditing}
                  margin="normal"
                />
                <TextField
                  fullWidth
                  label="头像URL"
                  name="avatarUrl"
                  value={formData.avatarUrl}
                  onChange={handleChange}
                  disabled={!isEditing}
                  margin="normal"
                  helperText="输入图片URL来设置头像"
                />

                <Divider sx={{ my: 3 }} />

                <Box sx={{ display: 'flex', gap: 2 }}>
                  {!isEditing ? (
                    <Button
                      variant="contained"
                      startIcon={<Edit />}
                      onClick={handleEdit}
                    >
                      编辑资料
                    </Button>
                  ) : (
                    <>
                      <Button
                        variant="contained"
                        startIcon={loading ? <CircularProgress size={20} /> : <Save />}
                        onClick={handleSave}
                        disabled={loading}
                      >
                        {loading ? '保存中...' : '保存'}
                      </Button>
                      <Button
                        variant="outlined"
                        startIcon={<Cancel />}
                        onClick={handleCancel}
                        disabled={loading}
                      >
                        取消
                      </Button>
                    </>
                  )}
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Paper>

        {/* 账户信息 */}
        <Paper sx={{ p: 4, mt: 3 }}>
          <Typography variant="h6" gutterBottom>
            账户信息
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Typography variant="body2" color="text.secondary">
                用户ID
              </Typography>
              <Typography variant="body1">{user?.id}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body2" color="text.secondary">
                注册时间
              </Typography>
              <Typography variant="body1">
                {user?.createdAt ? new Date(user.createdAt).toLocaleDateString('zh-CN') : '-'}
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </Container>
  )
}

export default ProfilePage
