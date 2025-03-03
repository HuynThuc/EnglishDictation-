import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import requestApi from '../helpers/api';
import DetailView from "./Detail";
import { useAuth } from '../ContextAPI/authContext';

const DetailDay = () => {
  // Lấy query string từ URL
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [userProgress, setUserProgress] = useState({}); // Lưu tiến trình học của người dùng
  const location = useLocation();
  const challengeId = location.state?.challengeId;
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("No filter");
  const { user, logout } = useAuth();

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await requestApi(`/challenges/video/${challengeId}`, 'GET');
        setVideos(response.data.videos);
      } catch (error) {
        console.error('Error fetching challenges:', error);
      }
    };

    fetchVideos();
  }, [challengeId]);

  useEffect(() => {
    // Fetch tiến trình học của người dùng cho mỗi video
    const fetchProgress = async (videoId) => {
      try {
        const response = await requestApi(`/user_process/${user.id}/${videoId}`, 'GET');
        if (response.data) {
          setUserProgress((prev) => ({
            ...prev,
            [videoId]: response.data.completionPercentage, // Lưu tỷ lệ hoàn thành của video
          }));
        }
      } catch (error) {
        console.error('Error fetching user progress:', error);
      }
    };

    // Lặp qua danh sách video và lấy tiến trình cho mỗi video
    videos.forEach((video) => {
      fetchProgress(video.id);
    });
  }, [videos]);

  const handleVideoClick = (video) => {
    const progress = userProgress[video.id] || 0; // Lấy tiến trình từ userProgress, nếu không có thì mặc định là 0
    setSelectedVideo({ ...video, progress });
  };
  
  const handleBack = () => setSelectedVideo(null);

  const handleSearchChange = (e) => setSearch(e.target.value);
  const handleFilterChange = (e) => setFilter(e.target.value);

  return (
    <div className="p-5">
      {selectedVideo ? (
        <DetailView
          title={selectedVideo.title}
          transcriptFile={selectedVideo.transcript_path}
          videoUrl={selectedVideo.url}
          onBack={handleBack}
        />
      ) : (
        <>
          <h2 className="text-2xl font-semibold mb-4">Danh sách Video</h2>
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Search"
                value={search}
                onChange={handleSearchChange}
                className="border rounded px-2 py-1"
              />
              <select
                value={filter}
                onChange={handleFilterChange}
                className="border rounded px-2 py-1"
              >
                <option value="No filter">No filter</option>
                <option value="Favorites">Favorites</option>
                <option value="Recent">Recent</option>
              </select>
              <button className="px-4 py-1 bg-gray-300 rounded">OK</button>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3 mb-4">
            {videos.map((video) => (
              <div
                key={video.id}
                className="border p-2 rounded flex flex-col items-center gap-2 cursor-pointer"
              >
                <FaStar className="text-gray-400" />
                {/* Liên kết đến trang chi tiết video */}
                <Link to={`/video/${video.id}`} className="text-[#6ea8fe]" onClick={() => handleVideoClick(video)}>
                  {video.title}
                </Link>

                {/* Hiển thị thanh tiến trình (progress bar) */}
                {userProgress[video.id] !== undefined && (
                  <div className="w-full mt-2">
                    <div className="flex justify-between text-xs">
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full">
                      <div
                        className="h-2 bg-blue-500 rounded-full"
                        style={{ width: `${userProgress[video.id]}%` }}
                      ></div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default DetailDay;
