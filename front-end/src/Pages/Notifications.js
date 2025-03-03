import React, { useState } from 'react';
import {
  Card,
  CardHeader,
  CardContent,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Typography,
  IconButton,
  Divider,
} from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import DeleteIcon from '@mui/icons-material/Delete';

const Notifications = () => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: 'Welcome to Fire Gaming!',
      message: 'Your account has been successfully created.',
      timestamp: '2024-12-06 09:00',
      type: 'info',
    },
    {
      id: 2,
      title: 'New Game Released!',
      message: 'Check out the latest update for Valorant.',
      timestamp: '2024-12-05 20:30',
      type: 'update',
    },
    {
      id: 3,
      title: 'Special Offer!',
      message: 'Exclusive discounts on in-game items for League of Legends.',
      timestamp: '2024-12-04 15:00',
      type: 'promo',
    },
  ]);

  const handleDeleteNotification = (id) => {
    setNotifications(notifications.filter((notification) => notification.id !== id));
  };

  return (
    <Card sx={{ maxWidth: 600, margin: 'auto', mt: 4, p: 2 }}>
      <CardHeader
        title="Notifications"
        subheader={`You have ${notifications.length} notifications`}
        avatar={<NotificationsIcon color="primary" />}
      />
      <Divider />
      <CardContent>
        {notifications.length > 0 ? (
          <List>
            {notifications.map((notification) => (
              <React.Fragment key={notification.id}>
                <ListItem alignItems="flex-start">
                  <ListItemAvatar>
                    <Avatar sx={{ bgcolor: getNotificationColor(notification.type) }}>
                      {notification.title[0]}
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Typography variant="subtitle1" fontWeight="bold">
                        {notification.title}
                      </Typography>
                    }
                    secondary={
                      <>
                        <Typography variant="body2" color="textSecondary">
                          {notification.message}
                        </Typography>
                        <Typography variant="caption" color="textSecondary">
                          {notification.timestamp}
                        </Typography>
                      </>
                    }
                  />
                  <IconButton
                    edge="end"
                    color="error"
                    onClick={() => handleDeleteNotification(notification.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </ListItem>
                <Divider variant="inset" component="li" />
              </React.Fragment>
            ))}
          </List>
        ) : (
          <Typography align="center" color="textSecondary">
            No new notifications.
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

// Utility function to assign colors based on notification type
const getNotificationColor = (type) => {
  switch (type) {
    case 'info':
      return '#2196f3'; // Blue
    case 'update':
      return '#4caf50'; // Green
    case 'promo':
      return '#ff9800'; // Orange
    default:
      return '#9e9e9e'; // Grey
  }
};

export default Notifications;
