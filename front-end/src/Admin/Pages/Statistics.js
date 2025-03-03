import React, { useState } from 'react';
import {
    Box,
    TextField,
    Button,
    Typography,
    Select,
    MenuItem,
    InputLabel,
    FormControl,
} from '@mui/material';
import requestApi from '../../helpers/api';

const Statistics = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [duration, setDuration] = useState('');
    const [type, setType] = useState('');
 

 

    const handleSubmit = async () => {
        const payload = { title, description, duration: parseInt(duration), type};
        try {
          const response = await requestApi.postRequest('/challenges/create', payload);
          if (response.status === 201) {
            alert('Challenge đã được thêm thành công!');
            // Reset form
            setTitle('');
            setDescription('');
            setDuration('');
            setType('');
           
          } else {
            alert('Có lỗi xảy ra, vui lòng thử lại.');
          }
        } catch (error) {
          console.error(error);
          alert('Lỗi khi gửi yêu cầu!');
        }
      };

    return (
        <Box sx={{ maxWidth: 600, mx: 'auto', mt: 4 }}>
            <Typography variant="h4" component="h1" gutterBottom>
                Thêm Challenge mới
            </Typography>
            <TextField
                fullWidth
                label="Tiêu đề"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                margin="normal"
            />
            <TextField
                fullWidth
                label="Mô tả"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                margin="normal"
                multiline
                rows={4}
            />
            <TextField
                fullWidth
                label="Số ngày học"
                type="number"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                margin="normal"
            />
            <FormControl fullWidth margin="normal">
                <InputLabel>Loại</InputLabel>
                <Select
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                >
                    <MenuItem value="Spelling">Spelling</MenuItem>
                    <MenuItem value="Dictation">Dictation</MenuItem>
                </Select>
            </FormControl>
            <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit}
                sx={{ mt: 3 }}
            >
                Thêm Challenge
            </Button>
        </Box>
    );
};

export default Statistics;
