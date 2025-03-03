import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  Grid,
  Typography,
  TextField,
  Button,
  Divider,
} from '@mui/material';
import { useAuth } from '../ContextAPI/authContext';

const AccountInformation = () => {
  
  const { user, updateUserInfo } = useAuth(); 
  const [googleLogin, setGoogleLogin] = useState(true);
  const [joinDate] = useState('2024-10-27');
  const [totalDays] = useState(40);
  const [activeDays] = useState(3);
  const [inactiveDays] = useState(37);
  const [activeHours] = useState(0.2);

  // const handleEmailChange = (event) => {
  //   setEmail(event.target.value);
  // };

  // const handleDisplayNameChange = (event) => {
  //   setDisplayName(event.target.value);
  // };

  const handleGoogleLoginDisconnect = () => {
    setGoogleLogin(false);
  };

  return (
    <Card sx={{ maxWidth: 1500, margin: 'auto', mt: 4, p: 2 }}>
      <CardHeader title="Account Information" subheader="Manage your account details" />
      <Divider />
      <CardContent>
        <Grid container spacing={3}>
          {/* Email */}
          <Grid item xs={12}>
            <Typography variant="subtitle1">Email</Typography>
            <TextField
              fullWidth
              value={user?.email}
              // onChange={handleEmailChange}
              InputProps={{
                endAdornment: (
                  <Button color="primary" size="small">
                    Edit
                  </Button>
                ),
              }}
            />
          </Grid>

          {/* Display Name */}
          <Grid item xs={12}>
            <Typography variant="subtitle1">Display Name</Typography>
            <TextField
              fullWidth
              value={user?.username}
              // onChange={handleDisplayNameChange}
              InputProps={{
                endAdornment: (
                  <Button color="primary" size="small">
                    Edit
                  </Button>
                ),
              }}
            />
          </Grid>

          {/* Google Login */}
          <Grid item xs={12}>
            <Typography variant="subtitle1">Google Login</Typography>
            <Typography>
              {googleLogin ? 'Yes' : 'No'}{' '}
              {googleLogin && (
                <Button
                  color="secondary"
                  size="small"
                  onClick={handleGoogleLoginDisconnect}
                >
                  Disconnect
                </Button>
              )}
            </Typography>
          </Grid>

          <Divider sx={{ width: '100%', mt: 2, mb: 2 }} />

          {/* Additional Information */}
          <Grid item xs={6}>
            <Typography variant="subtitle1">Join Date</Typography>
            <Typography>{joinDate}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="subtitle1">Total Days</Typography>
            <Typography>{totalDays}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="subtitle1">Active Days</Typography>
            <Typography>{activeDays}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="subtitle1">Inactive Days</Typography>
            <Typography>{inactiveDays}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="subtitle1">Active Hours</Typography>
            <Typography>{activeHours} hours</Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default AccountInformation;
