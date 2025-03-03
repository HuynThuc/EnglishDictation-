import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import {
  FaRedo,
  FaArrowLeft,
  FaArrowRight,
  FaVolumeUp,
  FaCheck,
  FaTimes,
  FaPlayCircle,
  FaPause,
  FaPaperPlane,
  FaThumbsUp,
  FaThumbsDown,
  FaReply
} from "react-icons/fa";
import requestApi from '../helpers/api';
import { useAuth } from '../ContextAPI/authContext';


const DetailView = ({ onBack, progress }) => {
  const [transcript, setTranscript] = useState([]);
  const [inputText, setInputText] = useState("");
  const [currentCaption, setCurrentCaption] = useState(null);
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [completedCount, setCompletedCount] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isStarted, setIsStarted] = useState(false);
  const [currentCaptionIndex, setCurrentCaptionIndex] = useState(0);
  const [videoSize, setVideoSize] = useState("medium");
  const [isVideoHidden, setIsVideoHidden] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [isSkipped, setIsSkipped] = useState(false);


  const videoRef = useRef(null);
  const playerRef = useRef(null);
  const intervalRef = useRef(null);
  const { videoId } = useParams();
  const [video, setVideo] = useState(null);



  // Thêm state mới
  // Đếm số câu đã hoàn thành




  const [newComment, setNewComment] = useState('');
  const [repComment, setRepComment] = useState('');
  const { user, logout } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  const handleCreateComment = async () => {
    if (!newComment.trim()) {
      alert('Nội dung bình luận không được để trống!');
      return;
    }

    if (!user) {
      alert('Vui lòng đăng nhập trước khi bình luận!');
      return;
    }

    try {
      const createCommentDto = {
        content: newComment,
        userId: user.id, // ID người dùng hiện tại
        videoId: video.id, // ID video hiện tại
      };

      // Gửi yêu cầu tạo bình luận
      const response = await requestApi.postRequest('/comment/create', createCommentDto);
      if (response.status === 201) {
        setNewComment(''); // Xóa nội dung bình luận sau khi gửi thành công
        fetchComments();
      } else {
        console.error('Tạo bình luận thất bại:', response);
      }
    } catch (error) {
      console.error('Đã xảy ra lỗi khi tạo bình luận:', error);
    }
  };

  const handleReplySubmit = async (parentId) => {
    if (!repComment.trim()) {
      alert('Nội dung bình luận không được để trống!');
      return;
    }

    if (!user) {
      alert('Vui lòng đăng nhập trước khi bình luận!');
      return;
    }

    try {
      const createCommentDto = {
        content: repComment,
        userId: user.id, // ID người dùng hiện tại
        videoId: video.id,
        parentId, // ID bình luận cha // ID video hiện tại
      };

      // Gửi yêu cầu tạo bình luận
      const response = await requestApi.postRequest('/comment/create', createCommentDto);
      if (response.status === 201) {
        setRepComment('');
        fetchComments();// Xóa nội dung bình luận sau khi gửi thành công
      } else {
        console.error('Tạo bình luận thất bại:', response);
      }
    } catch (error) {
      console.error('Đã xảy ra lỗi khi tạo bình luận:', error);
    }
  };

  const fetchComments = async () => {
    try {
      setLoading(true);
      const response = await requestApi.getRequest(`/comment/${videoId}`); // Endpoint lấy tất cả comments
      setComments(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    const fetchComments = async () => {
      try {
        setLoading(true);
        const response = await requestApi.getRequest(`/comment/${videoId}`); // Endpoint lấy tất cả comments
        setComments(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, []);

  const handleLike = (id) => {
    setComments(
      comments.map((comment) =>
        comment.id === id ? { ...comment, likes: comment.likes + 1 } : comment
      )
    );
  };

  const handleDislike = (id) => {
    setComments(
      comments.map((comment) =>
        comment.id === id ? { ...comment, dislikes: comment.dislikes + 1 } : comment
      )
    );
  };

  const toggleReplyBox = (id) => {
    setComments(
      comments.map((comment) =>
        comment.id === id
          ? { ...comment, showReplyBox: !comment.showReplyBox }
          : comment
      )
    );
  };



  const timeToSeconds = (timeString) => {
    const [hours, minutes, seconds] = timeString.split(":");
    return parseFloat(hours) * 3600 + parseFloat(minutes) * 60 + parseFloat(seconds);
  };

  const fetchAndParseVTT = async (transcriptFile) => {
    try {
      const response = await fetch(`/transcripts/${transcriptFile}`);
      const vttText = await response.text();
      const cuePattern = /(\d{2}:\d{2}:\d{2}.\d{3}) --> (\d{2}:\d{2}:\d{2}.\d{3})\s*(?:position:[^%]*%)?\n([^]*?)(?=\n{2}|\s*$)/g;
      const transcriptData = [];
      let match;

      while ((match = cuePattern.exec(vttText)) !== null) {
        transcriptData.push({
          startTime: timeToSeconds(match[1]),
          endTime: timeToSeconds(match[2]),
          captionText: match[3].trim(),
          originalStartTime: match[1],
          originalEndTime: match[2]
        });
      }

      setTranscript(transcriptData);
      if (progress && progress.currentCaptionIndex) {
        setCurrentTime(progress.currentTime || 0);
      }
    } catch (error) {
      console.error("Error fetching VTT file:", error);
    }
  };

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const response = await requestApi(`/videos/getVideo/${videoId}`, 'GET');
        if (response.status !== 200) {
          throw new Error('Video not found');
        }
        const videoData = response.data;
        setVideo(videoData);

        if (videoData.transcript_path) {
          fetchAndParseVTT(videoData.transcript_path);
        }
      } catch (err) {
        console.error('Error fetching video:', err);
      }
    };
    fetchVideo();
  }, [videoId]);

  useEffect(() => {
    if (video) {
      const loadYouTubeAPI = () => {
        if (!window.YT) {
          const script = document.createElement("script");
          script.src = "https://www.youtube.com/iframe_api";
          document.body.appendChild(script);
        }
        window.onYouTubeIframeAPIReady = initializePlayer;
      };

      const initializePlayer = () => {
        const videoId = new URL(video.url).searchParams.get("v");
        playerRef.current = new window.YT.Player(videoRef.current, {
          videoId,
          events: {
            onReady: onPlayerReady,
            onStateChange: onPlayerStateChange,
          },
        });
        if (progress && progress.currentTime) {
          playerRef.current.seekTo(progress.currentTime, true);
        }
      };

      const onPlayerReady = () => {
        console.log("YouTube Player is ready");
      };

      const onPlayerStateChange = (event) => {
        if (event.data === window.YT.PlayerState.PLAYING) {
          setIsPaused(false);
          intervalRef.current = setInterval(() => {
            const currentVideoTime = playerRef.current.getCurrentTime();
            setCurrentTime(currentVideoTime);
          }, 100);
        } else if (event.data === window.YT.PlayerState.PAUSED || event.data === window.YT.PlayerState.ENDED) {
          setIsPaused(true);
          clearInterval(intervalRef.current);
        }
      };

      loadYouTubeAPI();

      if (video.transcript_path) {
        fetchAndParseVTT(video.transcript_path);
      }

      return () => {
        if (intervalRef.current) clearInterval(intervalRef.current);
        window.onYouTubeIframeAPIReady = null;
      };
    }
  }, [video, progress]);

  useEffect(() => {
    if (playerRef.current && transcript.length > 0 && isStarted) {
      const currentCaption = transcript[currentCaptionIndex];
      if (currentTime >= currentCaption.startTime && currentTime <= currentCaption.endTime) {
        setCurrentCaption(currentCaption);

        if (currentTime >= currentCaption.endTime - 0.2) {
          playerRef.current.pauseVideo();
          setCompletedCount(currentCaptionIndex + 1);
          setCurrentCaptionIndex(currentCaptionIndex);
        }
      }
    }
  }, [currentTime, transcript, currentCaption, isStarted, currentCaptionIndex]);

  const checkSpelling = () => {
    if (currentCaption) {
      const input = inputText.trim().toLowerCase().replace(/\s+/g, ' ');
      const caption = currentCaption.captionText.trim().toLowerCase().replace(/\s+/g, ' ');

      if (input === caption) {
        setFeedbackMessage("Correct! Well done.");
        saveProcess();
      } else {
        setFeedbackMessage(`Oops! The correct caption is: "${currentCaption.captionText}"`);
      }
    }
  };

  const handleContinue = () => {
    if (currentCaption) {
      setInputText(currentCaption.captionText);
    }
    setIsSkipped(true); // Khi bấm "Skip", chuyển sang trạng thái bấm "Next"
  };



  const handlePausePlay = () => {
    if (playerRef.current) {
      if (isPaused) {
        playerRef.current.playVideo();
      } else {
        playerRef.current.pauseVideo();
      }
    }
  };

  const handleStartDictation = () => {
    setIsStarted(true);
    if (playerRef.current) {
      // If progress exists, don't seek to 0
      if (!progress) {
        playerRef.current.seekTo(0, true);
      }
      playerRef.current.playVideo();
    }
  };



  const handlePrevCaption = () => {
    if (currentCaptionIndex > 0) {
      setCurrentCaptionIndex(currentCaptionIndex - 1);
      setInputText(""); // Reset input
      setFeedbackMessage(null); // Xóa thông báo phản hồi
      const prevCaption = transcript[currentCaptionIndex - 1];
      if (playerRef.current) {
        playerRef.current.seekTo(prevCaption.startTime, true);
        playerRef.current.playVideo();
      }
    }
  };

  const handleNextCaption = () => {
    if (currentCaptionIndex < transcript.length - 1) {
      setCurrentCaptionIndex(currentCaptionIndex + 1);
      setInputText(""); // Reset input
      setFeedbackMessage(null); // Xóa thông báo phản hồi
      setIsSkipped(false);
      const nextCaption = transcript[currentCaptionIndex + 1];
      if (playerRef.current) {
        playerRef.current.seekTo(nextCaption.startTime, true);
        playerRef.current.playVideo();
      }
    }
  };

  const saveProcess = async () => {
    try {
      // Ensure we have a user and video
      if (!user || !video) {
        console.error('User or video not found');
        return;
      }
      // Calculate completion percentage
      const progress = (completedCount / transcript.length) * 100;
      // Get the current time of the last completed caption
      const currentProcessTime = transcript[completedCount - 1]?.startTime || 0;
      // Prepare the payload for saving process
      const processPayload = {
        userId: user.id,
        videoId: parseInt(videoId),
        currentTime: currentProcessTime,
        completionPercentage: progress
      };
      // Make API call to save process
      const response = await requestApi.postRequest('/user_process/save', processPayload);

      // Optional: Log success or handle response
      console.log('Learning progress saved:', response);
    } catch (error) {
      console.error('Error saving learning progress:', error);
    }
  };



  return (
    <div className="bg-gradient-to-br from-blue-50 to-blue-100 min-h-screen flex justify-center items-center p-4">
      <div className="bg-white shadow-2xl rounded-3xl w-full max-w-4xl overflow-hidden border border-blue-100">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-5 flex justify-between items-center">
          <button
            onClick={onBack}
            className="hover:bg-blue-600 p-3 rounded-full transition-colors"
          >
            <FaArrowLeft className="text-2xl" />
          </button>
          <h2 className="text-2xl font-bold text-center flex-grow">
            {video?.title || "Dictation Learning"}
          </h2>
        </div>

        {/* Video Section */}
        <div className={`transition-all duration-300 ${isVideoHidden ? 'h-0 overflow-hidden' : ''}`}>
          <div
            className={`border-b p-2 bg-gray-100 ${videoSize === 'small' ? 'h-64' :  // Tăng từ 'h-48'
              videoSize === 'medium' ? 'h-96' : // Tăng từ 'h-64'
                'h-[500px]'                      // Tăng từ 'h-80'
              }`}
          >
            <div ref={videoRef} className="video-player w-full h-full rounded-lg" />
          </div>
        </div>

        {/* Controls */}
        {isStarted && (
          <div className="px-6 py-4 bg-gray-50 flex justify-between items-center">
            <div className="flex items-center space-x-6">
              <FaRedo
                className="text-blue-500 hover:text-blue-600 cursor-pointer text-2xl"
                title="Replay"
              />
              <div className="flex items-center space-x-4">
                <FaArrowLeft
                  className={`text-2xl ${currentCaptionIndex === 0
                    ? 'text-gray-300 cursor-not-allowed'
                    : 'text-blue-500 hover:text-blue-600 cursor-pointer'
                    }`}
                  onClick={handlePrevCaption}
                  title="Previous Caption"
                />
                <span className="text-sm text-gray-600 font-semibold">
                  {currentCaptionIndex + 1} / {transcript.length}
                </span>
                <FaArrowRight
                  className={`text-2xl ${currentCaptionIndex === transcript.length - 1
                    ? 'text-gray-300 cursor-not-allowed'
                    : 'text-blue-500 hover:text-blue-600 cursor-pointer'
                    }`}
                  onClick={handleNextCaption}
                  title="Next Caption"
                />
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={handlePausePlay}
                className="text-blue-500 hover:text-blue-600"
              >
                {isPaused ? <FaPlayCircle className="text-2xl" /> : <FaPause className="text-2xl" />}
              </button>
              <select
                value={videoSize}
                onChange={(e) => setVideoSize(e.target.value)}
                className="rounded px-3 py-2 text-sm border border-blue-200"
              >
                <option value="small">Small</option>
                <option value="medium">Medium</option>
                <option value="large">Large</option>
              </select>
              <button
                onClick={() => setIsVideoHidden(!isVideoHidden)}
                className="bg-blue-100 hover:bg-blue-200 text-blue-700 px-4 py-2 rounded-lg text-sm transition-colors"
              >
                {isVideoHidden ? 'Show Video' : 'Hide Video'}
              </button>
            </div>
          </div>
        )}

        {/* Caption and Input Section */}
        {/* Caption and Input Section */}
        {isStarted && (
          <div className="p-6 space-y-5">
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Type what you hear..."
              className="w-full border-2 border-blue-200 rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-blue-300 h-32 resize-none text-gray-800 text-base"
            />

            <div className="flex justify-center space-x-6">
              {/* Hiển thị nút Check nếu chưa skip */}
              {!isSkipped && (
                <button
                  onClick={checkSpelling}
                  className="bg-blue-500 text-white px-8 py-3 rounded-lg hover:bg-blue-600 transition-colors flex items-center shadow-md"
                >
                  <FaCheck className="mr-2 text-lg" /> Check
                </button>
              )}

              {/* Hiển thị nút Skip */}
              <button
                onClick={handleContinue}
                className="border-2 border-blue-500 text-blue-500 px-8 py-3 rounded-lg hover:bg-blue-50 transition-colors flex items-center"
              >
                <FaTimes className="mr-2 text-lg" /> Skip
              </button>

              {/* Hiển thị nút Next khi đã Skip */}
              {isSkipped && currentCaptionIndex < transcript.length - 1 && (
                <button
                  onClick={handleNextCaption}
                  className="bg-blue-500 text-white px-8 py-3 rounded-lg hover:bg-blue-600 transition-colors flex items-center"
                >
                  <FaArrowRight className="mr-2 text-lg" /> Next
                </button>
              )}
            </div>

            {feedbackMessage && (
              <div
                className={`p-4 rounded-lg text-center font-semibold text-lg shadow-md ${feedbackMessage.includes("Correct")
                  ? 'bg-green-500 text-white'
                  : 'bg-red-500 text-white'
                  }`}
              >
                {feedbackMessage}
              </div>
            )}
          </div>
        )}


        {/* Main Content */}
        <div className="p-6 space-y-6">
          {/* Comments Section */}
          {isStarted && (
            <div className="mt-6">
              <h3 className="text-xl font-semibold text-gray-800">Comments</h3>
              <div className="space-y-4 mt-4">
                {/* Comment List */}
                <div className="max-h-72 overflow-y-auto">
                  {comments.map((comment) => (
                    <div
                      key={comment.id}
                      className="flex flex-col space-y-3 bg-gray-50 border border-blue-200 rounded-lg p-4 shadow-sm"
                    >
                      <div className="flex items-start space-x-3">
                        <div className="bg-blue-100 rounded-full h-10 w-10 flex items-center justify-center font-bold text-blue-600">
                          <img
                            src={`/avatar/${comment.user.avatar}`}  // Trỏ tới thư mục public/avatar
                            alt="User Avatar"
                            className="rounded-full h-full w-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <p className="text-gray-800">{comment.user.username}</p>
                          <span className="text-sm text-gray-500">{comment.content}</span>
                        </div>
                      </div>

                      {/* Like, Dislike, and Reply */}
                      <div className="flex space-x-4 text-sm text-gray-600">
                        <button
                          onClick={() => handleLike(comment.id)}
                          className="flex items-center space-x-1 hover:text-blue-500"
                        >
                          <FaThumbsUp />
                          <span>{comment.likes}</span>
                        </button>
                        <button
                          onClick={() => handleDislike(comment.id)}
                          className="flex items-center space-x-1 hover:text-red-500"
                        >
                          <FaThumbsDown />
                          <span>{comment.dislikes}</span>
                        </button>
                        <button
                          onClick={() => toggleReplyBox(comment.id)}
                          className="flex items-center space-x-1 hover:text-green-500"
                        >
                          <FaReply />
                          <span>Reply</span>
                        </button>
                      </div>


                      {/* Reply Input Box */}
                      {comment.showReplyBox && (
                        <div className="mt-3 pl-12">
                          <input
                            type="text"
                            value={repComment}
                            onChange={(e) => setRepComment(e.target.value)} // Cập nhật repComment
                            placeholder="Write your reply..."
                            className="w-full border border-blue-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                            onKeyDown={(e) => {
                              if (e.key === "Enter") {
                                handleReplySubmit(comment.id); // Truyền ID bình luận cha
                              }
                            }}
                          />
                        </div>
                      )}



                      {/* Replies */}
                      {/* Replies */}
                      {comment.replies.length > 0 && (
                        <div className="pl-12 mt-3 space-y-2">
                          {comment.replies.map((reply) => (
                            <div
                              key={reply.id}
                              className="flex flex-col bg-gray-100 border border-gray-200 rounded-lg p-3"
                            >
                              {/* Avatar và Nội dung */}
                              <div className="flex items-start space-x-3">
                                <div className="bg-green-100 rounded-full h-8 w-8 flex items-center justify-center font-bold text-green-600">
                                  <img
                                    src={`/avatar/${reply.user.avatar}`} // Trỏ tới thư mục public/avatar
                                    alt="User Avatar"
                                    className="rounded-full h-full w-full object-cover"
                                  />
                                </div>
                                <div className="flex-1">
                                  <p className="text-gray-800">{reply.user.username}</p>
                                  <span className="text-sm text-gray-500">{reply.content}</span>
                                </div>
                              </div>

                              {/* Các nút hành động */}
                              <div className="flex space-x-4 text-sm text-gray-600 mt-2">
                                <button
                                  onClick={() => handleLike(reply.id)} // Thích reply
                                  className="flex items-center space-x-1 hover:text-blue-500"
                                >
                                  <FaThumbsUp />
                                  <span>{reply.likes}</span>
                                </button>
                                <button
                                  onClick={() => handleDislike(reply.id)} // Không thích reply
                                  className="flex items-center space-x-1 hover:text-red-500"
                                >
                                  <FaThumbsDown />
                                  <span>{reply.dislikes}</span>
                                </button>
                                <button
                                  onClick={() => toggleReplyBox(reply.id)} // Mở hộp trả lời cho reply này
                                  className="flex items-center space-x-1 hover:text-green-500"
                                >
                                  <FaReply />
                                  <span>Reply</span>
                                </button>
                              </div>

                              {/* Reply Input Box */}
                              {reply.showReplyBox && (
                                <div className="mt-3 pl-12">
                                  <input
                                    type="text"
                                    value={repComment}
                                    onChange={(e) => setRepComment(e.target.value)} // Cập nhật repComment
                                    placeholder="Write your reply..."
                                    className="w-full border border-blue-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                                    onKeyDown={(e) => {
                                      if (e.key === "Enter") {
                                        handleReplySubmit(reply.id); // Truyền ID bình luận cha
                                      }
                                    }}
                                  />
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      )}

                    </div>
                  ))}
                  {comments.length === 0 && (
                    <p className="text-gray-500 text-center">No comments yet. Be the first to comment!</p>
                  )}
                </div>

                {/* Comment Input */}
                <div className="flex items-center space-x-3">
                  <input
                    type="text"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Write a comment..."
                    className="flex-grow border border-blue-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                  />
                  <button
                    onClick={handleCreateComment}
                    className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-blue-600 transition-all flex items-center"
                  >
                    <FaPaperPlane className="mr-2" /> Send
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Start Button */}
        {!isStarted && (
          <div className="flex justify-center p-8">
            <button
              onClick={handleStartDictation}
              className="bg-blue-500 text-white px-12 py-4 rounded-full hover:bg-blue-600 transition-colors shadow-2xl text-xl flex items-center"
            >
              <FaPlayCircle className="mr-3" /> Start Dictation
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DetailView;