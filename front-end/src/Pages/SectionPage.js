import React, { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { useParams, useLocation, Link } from 'react-router-dom';
import requestApi from '../helpers/api';

const SectionPage = ({ theme }) => {
  const { slug } = useParams();
  const location = useLocation();
  const { topicId } = location.state || {}; // Get topicId from location state

  const [openSection, setOpenSection] = useState(null);
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [topicTitle, setTopicTitle] = useState(slug.replace(/-/g, ' '));

  const toggleSection = (sectionId) => {
    if (openSection === sectionId) {
      setOpenSection(null);
    } else {
      setOpenSection(sectionId);
    }
  };

  useEffect(() => {
    const fetchSections = async () => {
      if (!topicId) {
        setError("Topic ID not found");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await requestApi.getRequest(`/section/by-topic/${topicId}`);

        if (response.status === 200) {
          setSections(response.data);
        } else {
          throw new Error('Failed to fetch sections');
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSections();
  }, [topicId]);

  return (
    <div className={`container mx-auto p-4 max-w-5xl ${theme === 'dark' ? 'bg-gray-900 text-gray-400' : 'bg-white text-black'
      }`}>
      {/* Breadcrumb */}
      <div className="text-sm mb-6">
        <a href="/exercises" className={`${theme === 'dark' ? 'text-blue-400' : 'text-blue-500'} hover:underline`}>All topics</a>
        <span className="mx-2 text-gray-500">/</span>
        <span className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>{topicTitle}</span>
      </div>

      {/* Title */}
      <div className="flex justify-between items-center mb-6">
        <h1 className={`text-3xl font-bold ${theme === 'dark' ? 'text-gray-300' : 'text-gray-800'} capitalize`}>
          {topicTitle}
        </h1>

        {/* Search and filter */}
        <div className="flex space-x-2">
          <input
            type="text"
            placeholder="Search"
            className={`border ${theme === 'dark' ? 'border-gray-600 bg-gray-800 text-white' : 'border-gray-300 bg-white'} rounded px-3 py-2`}
          />
          <select className={`border ${theme === 'dark' ? 'border-gray-600 bg-gray-800 text-white' : 'border-gray-300 bg-white'} rounded px-3 py-2`}>
            <option>All levels</option>
            <option>Beginner</option>
            <option>Intermediate</option>
            <option>Advanced</option>
          </select>
          <button className={`${theme === 'dark' ? 'bg-gray-600' : 'bg-gray-500'} text-white px-4 py-2 rounded`}>
            OK
          </button>
        </div>
      </div>

      {/* Error and Loading states */}
      {error && <div className="p-4 text-red-500 border border-red-300 rounded">{error}</div>}
      {loading && <div className="p-4 text-center">Loading sections...</div>}

      {/* Sections */}
      {!loading && !error && (
        <div className="space-y-4">
          {sections.length === 0 ? (
            <div className="text-center p-4">No sections found for this topic.</div>
          ) : (
            sections.map((section) => (
              <div key={section.id} className={`border-t ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'} py-4`}>
                <div
                  className="flex justify-between items-center cursor-pointer"
                  onClick={() => toggleSection(section.id)}
                >
                  <h2 className={`text-xl font-semibold ${theme === 'dark' ? 'text-gray-300' : 'text-gray-800'}`}>
                    {section.title}
                    <span className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'} font-normal ml-2`}>
                      ({section.lessons?.length || 0} lessons)
                    </span>
                  </h2>
                  <ChevronDown
                    className={`w-6 h-6 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'} transition-transform ${openSection === section.id ? 'transform rotate-180' : ''}`}
                  />
                </div>

                {/* Section content */}
                {openSection === section.id && (
                  <div className={`mt-4 pl-4 border-l-2 ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
                    <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                      {section.description}
                    </p>
                    {section.lessons && section.lessons.length > 0 && (
                      <div className="mt-4">
                        <h3 className={`text-lg font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                          Lessons:
                        </h3>
                        <ul className="space-y-2">
                          {section.lessons.map((lesson) => (
                            <li key={lesson.id} className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                              <Link
                                to={`/exercises/${slug}/${lesson.id}`}
                                className={`${theme === 'dark' ? 'text-blue-400' : 'text-blue-500'} hover:underline`}
                              >
                                {lesson.title}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default SectionPage;