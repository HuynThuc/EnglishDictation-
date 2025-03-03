import React from "react";
import { Headphones, Keyboard, CheckCircle, Volume2 } from "lucide-react";

const Home = ({ theme }) => {
  return (
    <main
      className={`container mx-auto px-4 ${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-black"
      } min-h-screen`}
    >
      <section className="text-left py-8 w-1/3">
        <h1 className="text-[2.5rem] font-medium mb-4">
          Practice English with dictation exercises
        </h1>
        <p className="mb-4">
          Dictation is a method to learn languages by listening and writing down
          what you hear. With these challenges, you'll practice with curated
          YouTube videos using subtitles for effective learning!
        </p>
        <p className="mb-4">
          Take part in different challenges ranging from 3 to 15 days to sharpen
          your listening and comprehension skills.
        </p>
        <button className="bg-[#0d6efd] text-white px-6 py-2 rounded">
          Start Challenge
        </button>
        <span className="ml-5">It's 100% FREE!</span>
      </section>

      <div className="w-full mx-auto border-t border-gray-300 mt-4 mb-20"></div>

      <section className="mb-8">
        <h2 className="text-[2rem] font-medium text-center mb-6">
          How participating in challenges will improve your English skills?
        </h2>
        <p className="mb-4 text-center mb-20 max-w-[500px] mx-auto">
          Each challenge is designed to take you through 4 main steps, all of
          which are essential for improving your listening, writing, and
          speaking skills!
        </p>
        <div className="grid grid-cols-2 gap-8">
          <div className="flex flex-col items-center text-center">
            <Headphones className="text-[#6ea8fe] mb-4" size={150} />
            <div>
              <h3 className="font-medium mb-2 text-[1.75rem]">
                1. Watch the video
              </h3>
              <p>
                Each challenge video helps improve listening comprehension while
                exposing you to different accents and speech speeds.
              </p>
            </div>
          </div>

          <div className="flex flex-col items-center text-center">
            <Keyboard className="text-[#6ea8fe] mb-4" size={150} />
            <div>
              <h3 className="font-medium mb-2 text-[1.75rem]">
                2. Write down what you hear
              </h3>
              <p>
                Listening closely and typing helps sharpen your focus on key
                details, improving both comprehension and spelling.
              </p>
            </div>
          </div>

          <div className="flex flex-col items-center text-center">
            <CheckCircle className="text-[#6ea8fe] mb-4" size={150} />
            <div>
              <h3 className="font-medium mb-2 text-[1.75rem]">
                3. Check the subtitles
              </h3>
              <p>
                After writing, check the video subtitles to see what you missed,
                enhancing your ability to recognize correct sentence structures.
              </p>
            </div>
          </div>

          <div className="flex flex-col items-center text-center">
            <Volume2 className="text-[#6ea8fe] mb-4" size={150} />
            <div>
              <h3 className="font-medium mb-2 text-[1.75rem]">
                4. Repeat aloud
              </h3>
              <p>
                Read the subtitles out loud to further improve your
                pronunciation and fluency.
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="w-full mx-auto border-t border-gray-300 mt-20 mb-20"></div>

      <section>
        <h2 className="text-[2rem] font-medium text-center mb-6">
          Available Challenges
        </h2>
        <h3 className="text-center mb-20 max-w-[650px] mx-auto">
          Currently, we offer several multi-day challenges to help you practice
          effectively. Below is the list of{" "}
          <span className="text-[#6ea8fe] underline">all the challenges</span>{" "}
          and the videos you’ll practice with:
        </h3>

        
      </section>

      <div className="w-full mx-auto border-t border-gray-300 mt-20 mb-20"></div>

      <section className="mb-20">
        <h2 className="text-[2rem] font-medium text-center mb-6">
          How participating in challenges will improve your English skills?
        </h2>
        <div className="grid grid-cols-2 gap-8">
          <div className="flex flex-col items-start text-start">
            <div>
              <h3 className="font-medium mb-2 text-[1.75rem]">
                Is this program free?
              </h3>
              <p>Yes, it's 100% FREE!</p>
            </div>
          </div>

          <div className="flex flex-col items-start text-start">
            <div>
              <h3 className="font-medium mb-2 text-[1.75rem]">
                Is this website for beginners?
              </h3>
              <p>
                As long as you can understand this page, you're good to go! But
                it's better if you know basic English pronunciation, if you
                don't, watch this{" "}
                <span className="text-[#6ea8fe] underline">
                  YouTube series.
                </span>
              </p>
            </div>
          </div>

          <div className="flex flex-col items-start text-start">
            <div>
              <h3 className="font-medium mb-2 text-[1.75rem]">
                How long will it take to become fluent with this website?
              </h3>
              <p>
                It depends on many things (such as your current level, how many
                hours you will spend each day). I can only say that your English
                will improve very quickly with this method.
              </p>
            </div>
          </div>

          <div className="flex flex-col items-start text-start">
            <div>
              <h3 className="font-medium mb-2 text-[1.75rem]">
                Will my speaking skills improve using this method?
              </h3>
              <p>
                Speaking and listening skills are related together, once you
                have better listening skills, it's much easier and faster to
                improve your speaking skills. Also, you can try to read out loud
                what you hear, your skills will improve really quickly!
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
