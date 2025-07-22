import React from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Alert,
} from '@mui/material'
import { Warning } from '@mui/icons-material'

interface ConfirmDeleteDialogProps {
  open: boolean
  onClose: () => void
  onConfirm: () => void
  taskTitle: string
}

const ConfirmDeleteDialog: React.FC<ConfirmDeleteDialogProps> = ({
  open,
  onClose,
  onConfirm,
  taskTitle,
}) => {
  const handleConfirm = () => {
    onConfirm()
    onClose()
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Warning color="error" />
        确认删除任务
      </DialogTitle>
      
      <DialogContent>
        <Box sx={{ py: 1 }}>
          <Alert severity="warning" sx={{ mb: 2 }}>
            此操作无法撤销，请谨慎操作！
          </Alert>
          
          <Typography variant="body1" gutterBottom>
            您确定要删除以下任务吗？
          </Typography>
          
          <Typography 
            variant="h6" 
            sx={{ 
              mt: 2, 
              p: 2, 
              bgcolor: 'grey.100', 
              borderRadius: 1,
              border: '1px solid',
              borderColor: 'grey.300'
            }}
          >
            "{taskTitle}"
          </Typography>
          
          <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
            删除后，与该任务相关的所有数据（包括评论、附件等）都将被永久删除。
          </Typography>
        </Box>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={onClose} color="inherit">
          取消
        </Button>
        <Button onClick={handleConfirm} variant="contained" color="error">
          确认删除
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default ConfirmDeleteDialog
