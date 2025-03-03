import React, { useEffect, useState } from 'react';
import {
  Card,
  CardHeader,
  CardContent,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Typography,
  Divider,
} from '@mui/material';
import { deepPurple } from '@mui/material/colors';
import { useAuth } from '../ContextAPI/authContext';
import requestApi from '../helpers/api';


const Comments = ({ userId }) => {
  const [comments, setComments] = useState([]);
  const [error, setError] = useState(null);
  const { user, logout } = useAuth();

  const fetchComments = async () => {
    try {
      const response = await requestApi.getRequest(`/comment/user/${user.id}`);

      // Kiểm tra nếu API trả về dữ liệu đúng
      if (response.status === 200) {
        setComments(response.data); // Dữ liệu trả về từ API
        console.log('commnet',comments);
        
      } else {
        throw new Error('Failed to fetch comments');
      }
    } catch (error) {
      setError(error.message); // Lưu lỗi nếu có
    }
  };

  // Gọi API khi component được render
  useEffect(() => {
    fetchComments();
  });
  return (
    <Card sx={{ maxWidth: 1000, margin: 'auto', mt: 4, p: 2 }}>
      <CardHeader
        title="Comments"
        subheader={`${comments.length} comments`}
        sx={{ borderBottom: '1px solid #eee' }}
      />
      <CardContent>
       

        {/* Danh sách bình luận */}
        {comments.length > 0 ? (
          <List>
            {comments.map((comment) => (
              <React.Fragment key={comment.id}>
                <ListItem alignItems="flex-start">
                  <ListItemAvatar>
                    <Avatar sx={{ bgcolor: deepPurple[500] }}>
                    <img
                                    src={`/avatar/${comment.user.avatar}`} // Trỏ tới thư mục public/avatar
                                    alt="User Avatar"
                                    className="rounded-full h-full w-full object-cover"
                                  />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Typography variant="subtitle1" fontWeight="bold">
                        {comment.user.username}
                      </Typography>
                    }
                    secondary={
                      <>
                        <Typography variant="body2" color="textSecondary" component="span">
                          {comment.content}
                        </Typography>
                        <Typography variant="caption" color="textSecondary" component="span">
                          {comment.timestamp}
                        </Typography>
                      </>
                    }
                  />

                </ListItem>
                <Divider variant="inset" component="li" />
              </React.Fragment>
            ))}
          </List>
        ) : (
          <Typography align="center" color="textSecondary">
            No comments available.
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default Comments;
