import React, { useState } from 'react';
import { Card, CardContent, CardHeader, TextField, Button, Box, Typography } from '@mui/material';
import { useAuth } from '../ContextAPI/authContext';
import requestApi from '../helpers/api';

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { user } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Validate passwords
    if (!oldPassword || !newPassword || !confirmPassword) {
      setError('Please fill in all fields.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setError('New password and confirm password do not match.');
      return;
    }
    if (newPassword.length < 8) {
      setError('New password must be at least 8 characters long.');
      return;
    }

    try {
      // Gửi yêu cầu đổi mật khẩu đến API backend
      const response = await requestApi.putRequest(`/auth/update-password/${user.id}`, {
        oldPassword,
        newPassword,
      });
      
      if (response.data.message) {
        setSuccess('Password changed successfully.');
        setOldPassword('');
        setNewPassword('');
        setConfirmPassword('');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred while changing password.');
    }
  };

  return (
    <Card sx={{ maxWidth: 800, margin: 'auto', mt: 4, p: 2 }}>
      <CardHeader
        title="Change Password"
        sx={{ textAlign: 'center', borderBottom: '1px solid #eee' }}
      />
      <CardContent>
        <form onSubmit={handleSubmit}>
          <Box mb={2}>
            <TextField
              label="Current Password"
              type="password"
              fullWidth
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
            />
          </Box>
          <Box mb={2}>
            <TextField
              label="New Password"
              type="password"
              fullWidth
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </Box>
          <Box mb={2}>
            <TextField
              label="Confirm New Password"
              type="password"
              fullWidth
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
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
            Change Password
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ChangePassword;
