import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import requestApi from '../helpers/api';

const AllExercises = ({ theme }) => {
  const [topics, setTopics] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const response = await requestApi.getRequest('/topic/getAll');
        if (response.status === 200) {
          setTopics(response.data);
        } else {
          throw new Error('Failed to fetch topics');
        }
      } catch (error) {
        setError(error.message);
      }
    };

    fetchTopics();
  }, []);

  const navigateToSections = (topicId, topicTitle) => {
    navigate(`/exercises/${topicTitle.toLowerCase().replace(/\s+/g, '-')}`, {
      state: { topicId: topicId }
    });
  };

  return (
    <div
      className={`w-full min-h-screen flex justify-center mt-20 ${
        theme === 'dark' ? 'bg-gray-900 text-gray-400' : 'bg-white text-black'
      }`}
    >
      <div className="max-w-4xl w-full">
        <h1 className="text-3xl font-semibold my-5">All topics</h1>
        <div className="grid grid-cols-3 gap-5">
          {topics.map((item, index) => (
            <div
              key={index}
              className={`px-3 border shadow-lg rounded flex gap-3 ${
                theme === 'dark' ? 'border-gray-500 bg-slate-800' : 'border-gray-300'
              }`}
            >
              <div className="flex items-center">
                <img
                  src={item.image}
                  alt={item.title}
                  className={`w-24 h-24 border p-2 rounded cursor-pointer ${
                    theme === 'dark' ? 'border-gray-500' : 'border-gray-300'
                  }`}
                  onClick={() => navigateToSections(item.id, item.title)}
                />
              </div>
              <div className="flex flex-col gap-2 justify-center">
                <p
                  className="text-blue-500 font-semibold underline text-2xl cursor-pointer"
                  onClick={() => navigateToSections(item.id, item.title)}
                >
                  {item.title}
                </p>
                <p>Level: <span>{item.level}</span></p>
                <p>{item.totalLessons} lessons</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllExercises;