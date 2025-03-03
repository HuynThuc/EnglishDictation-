import React, { useState, useEffect } from 'react';
import { Box, TextField, Button, Typography, Snackbar, Alert, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, LinearProgress } from '@mui/material';
import requestApi from '../../helpers/api';

const Lession = () => {
  const [url, setUrl] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [videos, setVideos] = useState([]); // Danh sách video
  const [loading, setLoading] = useState(false); // Trạng thái loading

  // Lấy danh sách video từ API
  const fetchVideos = async () => {
    setLoading(true); // Hiển thị trạng thái loading
    try {
      const response = await requestApi.getRequest('/videos/getAllVideo');
      setVideos(response.data);
    } catch (err) {
      console.error('Lỗi khi lấy danh sách video:', err);
      setError(true); // Hiển thị lỗi
    } finally {
      setLoading(false); // Tắt trạng thái loading
    }
  };

  useEffect(() => {
    fetchVideos(); // Gọi hàm lấy danh sách video khi component được render
  }, []);

  const handleCrawlPlaylist = async () => {
    setLoading(true); // Bắt đầu loading
    try {
      const response = await requestApi.postRequest('/videos/crawl-from-playlist', {
        playlistUrl: url,
      });

      if (response.status === 200) {
        setSuccess(true);
        fetchVideos(); // Cập nhật danh sách video sau khi crawl thành công
      } else {
        setError(true);
        setMessage(response.data || 'Có lỗi xảy ra khi crawl playlist.');
      }
    } catch (err) {
      setError(true);
      setMessage(err.response?.data || 'Lỗi kết nối tới server.');
    } finally {
      setLoading(false); // Kết thúc loading
    }
  };

  const handleCrawlSingleVideo = async () => {
    setLoading(true); // Bắt đầu loading
    try {
      const response = await fetch('/videos/crawl-single-video', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ videoUrl: url }),
      });

      const data = await response.text();
      if (response.ok) {
        setSuccess(true);
        setMessage(data);
        fetchVideos(); // Cập nhật danh sách video sau khi crawl thành công
      } else {
        setError(true);
        setMessage(data || 'Có lỗi xảy ra khi crawl video.');
      }
    } catch (err) {
      setError(true);
      setMessage('Lỗi kết nối tới server.');
    } finally {
      setLoading(false); // Kết thúc loading
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 3,
      }}
    >
      <Typography variant="h5" gutterBottom>
        Crawl Video từ Playlist hoặc Video URL
      </Typography>
      <TextField
        label="Playlist hoặc Video URL"
        variant="outlined"
        fullWidth
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        sx={{ marginBottom: 2, width: '100%', maxWidth: 600 }}
      />
      <Box sx={{ display: 'flex', gap: 2 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleCrawlPlaylist}
          disabled={loading} // Vô hiệu hóa nút khi đang loading
        >
          Crawl Playlist
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleCrawlSingleVideo}
          disabled={loading} // Vô hiệu hóa nút khi đang loading
        >
          Crawl Video
        </Button>
      </Box>

      {/* Hiển thị thanh progress bar khi loading */}
      {loading && (
        <Box sx={{ width: '100%', marginTop: 2 }}>
          <LinearProgress />
        </Box>
      )}

      <Snackbar
        open={success || error}
        autoHideDuration={6000}
        onClose={() => {
          setSuccess(false);
          setError(false);
        }}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }} // Vị trí góc phải trên
      >
        <Alert
          severity={success ? 'success' : 'error'}
          onClose={() => {
            setSuccess(false);
            setError(false);
          }}
        >
          {message}
        </Alert>
      </Snackbar>


      {/* Hiển thị danh sách video */}
      <Box sx={{ marginTop: 4, width: '100%', maxWidth: 800 }}>
        <Typography variant="h6" gutterBottom>
          Danh sách Video
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Tiêu đề</TableCell>
                <TableCell>URL</TableCell>
                <TableCell>Transcript Path</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {videos.map((video) => (
                <TableRow key={video.id}>
                  <TableCell>{video.title}</TableCell>
                  <TableCell>
                    <a href={video.url} target="_blank" rel="noopener noreferrer">
                      {video.url}
                    </a>
                  </TableCell>
                  <TableCell>{video.transcript_path || 'N/A'}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>


    </Box>
  );
};

export default Lession;
