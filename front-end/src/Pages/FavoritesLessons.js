import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Box,
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import DeleteIcon from '@mui/icons-material/Delete';

const favoriteLessons = [
  { id: 1, title: 'Lesson 1: Basics of English Grammar', addedDate: '2024-11-15' },
  { id: 2, title: 'Lesson 2: Advanced Vocabulary', addedDate: '2024-11-16' },
  { id: 3, title: 'Lesson 3: Listening Practice', addedDate: '2024-11-17' },
  { id: 4, title: 'Lesson 4: Writing Skills', addedDate: '2024-11-18' },
];

const FavoritesLessons = () => {
  const handleRemove = (id) => {
    console.log(`Removed favorite lesson with ID: ${id}`);
    // Implement remove logic here
  };

  return (
    <Card sx={{ maxWidth: 600, margin: 'auto', mt: 4, p: 2 }}>
      <CardContent>
        <Typography variant="h5" sx={{ mb: 3, textAlign: 'center' }}>
          Favorites Lessons
        </Typography>
        {favoriteLessons.length > 0 ? (
          <List>
            {favoriteLessons.map((lesson) => (
              <ListItem
                key={lesson.id}
                secondaryAction={
                  <IconButton
                    edge="end"
                    aria-label="remove"
                    onClick={() => handleRemove(lesson.id)}
                  >
                    <DeleteIcon color="error" />
                  </IconButton>
                }
              >
                <FavoriteIcon color="primary" sx={{ mr: 2 }} />
                <ListItemText
                  primary={lesson.title}
                  secondary={`Added on: ${lesson.addedDate}`}
                />
              </ListItem>
            ))}
          </List>
        ) : (
          <Typography variant="body1" color="text.secondary" sx={{ textAlign: 'center' }}>
            No favorite lessons added yet.
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default FavoritesLessons;
