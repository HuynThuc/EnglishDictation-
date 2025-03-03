import React from "react";

const LearnTogether = ({ theme }) => {
  const resources = [
    {
      name: "NÀO 990 TOEIC ĐỔI TÊN",
      link: "https://www.tiktok.com/@naotoeic990doiten",
      language: "Vietnamese vn",
    },
    {
      name: "English with Lyna",
      link: "https://www.tiktok.com/@lynabiu",
      language: "Vietnamese vn",
    },
    {
      name: "Tracy English",
      link: "https://www.tiktok.com/@tracy.studye",
      language: "Vietnamese vn",
    },
    {
      name: "lenaenglish1",
      link: "https://www.tiktok.com/@lenaenglish1",
      language: "Vietnamese vn",
    },
    {
      name: "studyenglishwithnhhi",
      link: "https://www.tiktok.com/@studyenglishwithnhhi",
      language: "Vietnamese vn",
    },
    {
      name: "hoamiqng",
      link: "https://www.tiktok.com/@hoamiqng",
      language: "Vietnamese vn",
    },
  ];

  return (
    <div
      className={`w-full min-h-screen ${
        theme === "dark" ? "bg-gray-900 text-gray-400" : "bg-white text-black"
      }`}
    >
      {/* Heading - COMPLETELY OUTSIDE the styled div */}
      <h1 className="text-3xl font-semibold text-center mb-4 mt-20">
        Learn together
      </h1>
      {/* Content within styled container */}
      <div
        className={`max-w-3xl mx-auto p-6 rounded-lg border custom-shadow mt-6 ${
          theme === "dark"
            ? "bg-gray-900 border-gray-500"
            : "bg-white border-gray-300"
        }`}
      >
        <p className="text-center mb-6">
          Do you want to learn with others? Here, you can find people who
          livestream their practice regularly. Follow them and have fun
          together! 😃😄😃
        </p>
        <table
          className={`min-w-full border rounded-lg ${
            theme === "dark" ? "border-gray-500" : "border-gray-300"
          }`}
        >
          <thead>
            <tr
              className={`${
                theme === "dark" ? "border-gray-500" : "border-gray-300"
              }`}
            >
              <th className="py-3 px-4 border-b text-left">Name / Link</th>
              <th className="py-3 px-4 border-b text-left">Language</th>
            </tr>
          </thead>
          <tbody>
            {resources.map((resource, index) => (
              <tr key={index}>
                <td className="py-3 px-4 border-b border-r border-gray-300">
                  {/* Display the name */}
                  <div>{resource.name}</div>
                  {/* Display the link below the name */}
                  <a
                    href={resource.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline block mt-1"
                  >
                    {resource.link}
                  </a>
                </td>
                <td className="py-3 px-4 border-b">{resource.language}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Footer Note - Below Table */}
      <div className="text-center mt-20 mb-20">
        <p>
          Want to share your channel?{" "}
          <a href="#" className="text-blue-500 hover:underline">
            Send me your details now!
          </a>{" "}
          (It's free)
        </p>
      </div>
    </div>
  );
};

export default LearnTogether;
