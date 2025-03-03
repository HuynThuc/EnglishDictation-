import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Select,
  MenuItem,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Checkbox,
  Paper,
} from '@mui/material';
import requestApi from '../../helpers/api';

const Dashboard = () => {
  const [challenges, setChallenges] = useState([]); // Danh sách challenge
  const [videos, setVideos] = useState([]); // Danh sách video
  const [selectedChallenge, setSelectedChallenge] = useState(''); // Challenge được chọn
  const [selectedVideos, setSelectedVideos] = useState([]); // Video được chọn
  const [loading, setLoading] = useState(false); // Trạng thái loading

  const fetchChallengesWithVideos = async () => {
    try {
      // Fetch danh sách challenges
      const response = await requestApi('/challenges/getAllChallenge', 'GET');
      setChallenges(response.data);
    } catch (error) {
      console.error('Error fetching challenges or videos:', error);
    }
  };

  console.log('c', challenges)

  // Lấy danh sách videos
  const fetchVideos = async () => {
    try {
      const response = await requestApi.getRequest('/videos/getAllVideo');
      setVideos(response.data);
    } catch (err) {
      console.error('Lỗi khi lấy danh sách video:', err);
    }
  };

  useEffect(() => {
    fetchChallengesWithVideos();
    fetchVideos();
  }, []);

  // Xử lý chọn/unselect video
  const handleVideoSelect = (videoId) => {
    if (selectedVideos.includes(videoId)) {
      setSelectedVideos(selectedVideos.filter((id) => id !== videoId));
    } else {
      setSelectedVideos([...selectedVideos, videoId]);
    }
  };

  // Gửi danh sách video vào challenge
  const handleAssignVideos = async () => {
    if (!selectedChallenge) {
      alert('Vui lòng chọn một challenge!');
      return;
    }
  
    if (selectedVideos.length === 0) {
      alert('Vui lòng chọn ít nhất một video!');
      return;
    }
  
    console.log('Sending data:', {
      challengeId: selectedChallenge,
      videoIds: selectedVideos,
    });
  
    setLoading(true);
    try {
      const response = await requestApi.postRequest(
        `/challenges/${selectedChallenge}/assignVideos`,
        { videoIds: selectedVideos }
      );
  
      if (response.status === 200) {
        alert('Gán video thành công!');
        setSelectedVideos([]); // Reset danh sách video chọn
      } else {
        alert('Có lỗi xảy ra, vui lòng thử lại.');
      }
    } catch (err) {
      console.error('Lỗi khi gán video:', err);
      alert('Lỗi kết nối tới server.');
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Gán Video cho Challenge
      </Typography>

      {/* Dropdown chọn Challenge */}
      <Typography variant="h6">Chọn Challenge</Typography>
      <Select
        fullWidth
        value={selectedChallenge}
        onChange={(e) => setSelectedChallenge(e.target.value)}
        displayEmpty
        sx={{ mb: 2 }}
      >
        <MenuItem value="" disabled>
          -- Chọn Challenge --
        </MenuItem>
        {challenges.map((challenge) => (
          <MenuItem key={challenge.id} value={challenge.id}>
            {challenge.title}
          </MenuItem>
        ))}
      </Select>

      {/* Bảng hiển thị danh sách video */}
      <Typography variant="h6" gutterBottom>
        Chọn Video
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Chọn</TableCell>
              <TableCell>Tiêu đề</TableCell>
              <TableCell>URL</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {videos.map((video) => (
              <TableRow key={video.id}>
                <TableCell>
                  <Checkbox
                    checked={selectedVideos.includes(video.id)}
                    onChange={() => handleVideoSelect(video.id)}
                  />
                </TableCell>
                <TableCell>{video.title}</TableCell>
                <TableCell>
                  <a href={video.url} target="_blank" rel="noopener noreferrer">
                    {video.url}
                  </a>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Nút gán video */}
      <Button
        variant="contained"
        color="primary"
        onClick={handleAssignVideos}
        disabled={loading}
        sx={{ mt: 3 }}
      >
        {loading ? 'Đang gán...' : 'Gán Video'}
      </Button>
    </Box>
  );
};

export default Dashboard;
