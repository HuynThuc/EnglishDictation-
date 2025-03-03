import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  TextField,
  Button,
  Box,
  Typography,
} from '@mui/material';
import { useAuth } from '../ContextAPI/authContext';
import requestApi from '../helpers/api';

const ChangeEmail = () => {
  const [newEmail, setNewEmail] = useState('');
  const [confirmEmail, setConfirmEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { user, updateUserInfo } = useAuth(); // Lấy thông tin user từ Context API và hàm updateUserInfo

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Validation
    if (!newEmail) {
      setError('Vui lòng nhập email mới.');
      return;
    }
    if (!/\S+@\S+\.\S+/.test(newEmail)) {
      setError('Vui lòng nhập địa chỉ email hợp lệ.');
      return;
    }

    // Gửi yêu cầu đến API
    try {
      const response = await requestApi.putRequest(`/auth/update-email/${user.id}`, {
        newEmail,
      });

      // Kiểm tra phản hồi từ API
      if (response && response.status === 200) {
        // Cập nhật email mới vào ContextAPI
        updateUserInfo({ ...user, email: newEmail });
        setSuccess('Email đã được thay đổi thành công.');
        setNewEmail('');
      }
    } catch (err) {
      console.error(err);
      if (err.response) {
        console.error(err.response);
        setError(err.response?.data?.message || 'Đã xảy ra lỗi khi thay đổi email.');
      } else {
        setError('Đã xảy ra lỗi khi thay đổi email.');
      }
    }
  };

  return (
    <Card sx={{ maxWidth: 800, margin: 'auto', mt: 4, p: 2 }}>
      <CardHeader
        title="Thay Đổi Email"
        sx={{ textAlign: 'center', borderBottom: '1px solid #eee' }}
      />
      <CardContent>
        <Typography variant="body1" sx={{ mb: 2 }}>
          Current Email: <strong>{user?.email}</strong>
        </Typography>
        <form onSubmit={handleSubmit}>
          <Box mb={2}>
            <TextField
              label="New Email"
              type="email"
              fullWidth
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
            />
          </Box>
          {error && (
            <Typography color="error" sx={{ mb: 2 }}>
              {error}
            </Typography>
          )}
          {success && (
            <Typography color="success.main" sx={{ mb: 2 }}>
              {success}
            </Typography>
          )}
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Thay Đổi Email
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ChangeEmail;
