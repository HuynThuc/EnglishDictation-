
import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';


import { Headphones, Keyboard, CheckCircle, Volume2 } from 'lucide-react';
import requestApi from '../helpers/api';

const Body = ({ theme }) => {

  const navigate = useNavigate();
  const [challenges, setChallenges] = useState([]);
  const [showAllVideos, setShowAllVideos] = useState(false);
  const [videos, setVideos] = useState([]); // Trạng thái lưu danh sách video
  const [currentChallengeId, setCurrentChallengeId] = useState(null); // trạng thái để hiển thị tất cả video

  useEffect(() => {
    const fetchChallengesWithVideos = async () => {
      try {
        // Fetch danh sách challenges
        const response = await requestApi('/challenges/getAllChallenge', 'GET');
        const challengesData = response.data;

        // Lấy video cho từng challenge
        const challengesWithVideos = await Promise.all(
          challengesData.map(async (challenge) => {
            const videoResponse = await requestApi(`/challenges/video/${challenge.id}`, 'GET');
            return {
              ...challenge,
              videos: videoResponse.data.videos, // Gắn danh sách video vào challenge
            };
          })
        );

        setChallenges(challengesWithVideos);
      } catch (error) {
        console.error('Error fetching challenges or videos:', error);
      }
    };

    fetchChallengesWithVideos();
  }, []);



  const handleChallengeClick = (challengeId, challengeTitle) => {
    if (!challengeTitle) {
      console.error("Challenge title is undefined");
      return; // Dừng thực hiện nếu challengeTitle không hợp lệ
    }

    const slug = challengeTitle.toLowerCase().replace(/\s+/g, '-');
    navigate(`/challenge/${slug}`, { state: { challengeId } }); // Truyền challengeId qua state
  };


  return (
    <main
      className={`container mx-auto px-4 ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-black'
        } min-h-screen`}

    >
      <section className="text-left py-8 w-full mx-auto">
        <h1 className="text-[2.5rem] font-semibold mb-4 text-center sm:text-left">Practice English with Dictation Exercises</h1>
        <p className="mb-4 text-center sm:text-left">Dictation is a method to learn languages by listening and writing down what you hear. With these challenges, you'll practice with curated YouTube videos using subtitles for effective learning!</p>
        <p className="mb-4 text-center sm:text-left">Take part in different challenges ranging from 3 to 15 days to sharpen your listening and comprehension skills.</p>
        <button className="bg-[#6ea8fe] text-white px-6 py-2 rounded-lg hover:bg-[#4e8fd7] transition-all duration-300">
          Start Challenge
        </button>
        <span className="ml-2 text-sm">- It's 100% FREE!</span>
      </section>
      <div className="w-full mx-auto border-t border-gray-300 mt-8 mb-20"></div>
      <section className="mb-8">
        <h2 className="text-[2rem] font-medium text-center mb-6">How participating in challenges will improve your English skills?</h2>
        <p className="mb-4 text-center mb-20 max-w-[500px] mx-auto">Each challenge is designed to take you through 4 main steps, all of which are essential for improving your listening, writing, and speaking skills!</p>
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-8">
          <div className="flex flex-col items-center text-center">
            <Headphones className="text-[#6ea8fe] mb-4" size={150} />
            <h3 className="font-medium mb-2 text-[1.75rem]">1. Watch the video</h3>
            <p>Each challenge video helps improve listening comprehension while exposing you to different accents and speech speeds.</p>
          </div>

          <div className="flex flex-col items-center text-center">
            <Keyboard className="text-[#6ea8fe] mb-4" size={150} />
            <h3 className="font-medium mb-2 text-[1.75rem]">2. Write down what you hear</h3>
            <p>Listening closely and typing helps sharpen your focus on key details, improving both comprehension and spelling.</p>
          </div>

          <div className="flex flex-col items-center text-center">
            <CheckCircle className="text-[#6ea8fe] mb-4" size={150} />
            <h3 className="font-medium mb-2 text-[1.75rem]">3. Check the subtitles</h3>
            <p>After writing, check the video subtitles to see what you missed, enhancing your ability to recognize correct sentence structures.</p>
          </div>

          <div className="flex flex-col items-center text-center">
            <Volume2 className="text-[#6ea8fe] mb-4" size={150} />
            <h3 className="font-medium mb-2 text-[1.75rem]">4. Repeat aloud</h3>
            <p>Read the subtitles out loud to further improve your pronunciation and fluency.</p>
          </div>
        </div>
      </section>
      <div className="w-full mx-auto border-t border-gray-300 mt-20 mb-20"></div>


      <section>
        <h2 className="text-[2rem] font-medium text-center mb-6">Available Challenges</h2>
        <h3 className="text-center mb-20 max-w-[650px] mx-auto">Currently, we offer several multi-day challenges to help you practice effectively. Below is the list of <span className="text-[#6ea8fe] underline">all the challenges</span> and the videos you’ll practice with:</h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-8">
          {challenges.map((challenge, index) => (
            <div
              key={index}
              className="border p-6 rounded-lg bg-gray-50 shadow-md transition-all hover:shadow-lg hover:scale-105 duration-300"
            >
              <h3 className="font-medium mb-2 text-[#6ea8fe] text-[1.75rem]">
                <button
                  onClick={() => handleChallengeClick(challenge.id, challenge.title)}
                  className="text-[#6ea8fe] underline"
                >
                  {challenge.title}
                </button>
              </h3>
              <p className="mb-4 text-gray-600">{challenge.description}</p>
              <ul className="list-disc list-inside mb-4">
                {/* Hiển thị tên video */}
                {challenge.videos.map((video, videoIndex) => (
                  <li key={videoIndex} className="text-[#6ea8fe] font-medium mb-1">
                    <Link to={`/video/${video.id}`} className="text-[#6ea8fe] underline">
                      {video.title}
                    </Link> {/* Hiển thị tên video và link đến trang chi tiết video */}
                  </li>
                ))}
              </ul>
              <button
              
                className="text-[#6ea8fe] underline font-medium"
              >
                View all videos
              </button>
            </div>
          ))}
        </div>
      </section>
      <div className="w-full mx-auto border-t border-gray-300 mt-20 mb-20"></div>
      <section className="mb-20">
        <h2 className="text-[2rem] font-semibold text-center mb-8">How participating in challenges will improve your English skills?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 px-4 sm:px-0">
          <div className="flex flex-col items-start bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
            <h3 className="font-semibold mb-2 text-[1.75rem] text-[#6ea8fe]">Is this program free?</h3>
            <p className="text-gray-700 dark:text-gray-300">Yes, it's 100% FREE!</p>
          </div>

          <div className="flex flex-col items-start bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
            <h3 className="font-semibold mb-2 text-[1.75rem] text-[#6ea8fe]">Is this website for beginners?</h3>
            <p className="text-gray-700 dark:text-gray-300">As long as you can understand this page, you're good to go! But it's better if you know basic English pronunciation. If you don’t, watch this <span className="text-[#6ea8fe] underline">YouTube series.</span></p>
          </div>

          <div className="flex flex-col items-start bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
            <h3 className="font-semibold mb-2 text-[1.75rem] text-[#6ea8fe]">How long will it take to become fluent with this website?</h3>
            <p className="text-gray-700 dark:text-gray-300">It depends on your current level and how much time you dedicate each day. This method will help you improve your English skills quickly!</p>
          </div>

          <div className="flex flex-col items-start bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
            <h3 className="font-semibold mb-2 text-[1.75rem] text-[#6ea8fe]">Will my speaking skills improve using this method?</h3>
            <p className="text-gray-700 dark:text-gray-300">Yes, improved listening makes speaking easier! Try reading out loud to quickly enhance your pronunciation and fluency.</p>
          </div>
        </div>
      </section>
    </main>




  );
};

export default Body;
