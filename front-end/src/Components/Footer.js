import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook } from '@fortawesome/free-brands-svg-icons';

const Footer = ({ theme }) => {
  return (
    <footer className={`${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-black'} pt-8 border-t border-gray-250 mt-8`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-start mb-6">
          <a href="#" className="mr-9">
            <img src="/appstore.svg" alt="Download on App Store" className="h-10" />
          </a>
          <a href="#">
            <img src="/googleplay.svg" alt="Get it on Google Play" className="h-10" />
          </a>
        </div>

        <div className="grid grid-cols-4 gap-8 mb-8">
          <div>
            <a href="#" className="block text-[#6ea8fe] hover:underline mb-2">Home</a>
            <a href="#" className="block text-[#6ea8fe] hover:underline mb-2">All exercises</a>
            <a href="#" className="block text-[#6ea8fe] hover:underline mb-2">English expressions</a>
            <a href="#" className="block text-[#6ea8fe] hover:underline mb-2">English pronunciation</a>
            <a href="#" className="block text-[#6ea8fe] hover:underline mb-2">FluentPal - English Speaking App</a>
            <a href="#" className="block text-[#6ea8fe] hover:underline">Download audio files</a>
          </div>
          <div>
            <a href="#" className="block text-[#6ea8fe] hover:underline mb-2">Top users</a>
            <a href="#" className="block text-[#6ea8fe] hover:underline mb-2">Latest comments</a>
            <a href="#" className="block text-[#6ea8fe] hover:underline mb-2">Support DailyDictation 🙏</a>
            <a href="#" className="block text-[#6ea8fe] hover:underline mb-2">Learning English resources</a>
            <a href="#" className="block text-[#6ea8fe] hover:underline">Practice German Listening</a>
          </div>
          <div>
            <a href="#" className="block text-[#6ea8fe] hover:underline mb-2">Blog</a>
            <a href="#" className="block text-[#6ea8fe] hover:underline mb-2">Contact</a>
            <a href="#" className="block text-[#6ea8fe] hover:underline mb-2">Terms & rules</a>
            <a href="#" className="block text-[#6ea8fe] hover:underline">Privacy policy</a>
          </div>
          <div>
            <a href="#" className="block text-[#6ea8fe] hover:underline flex items-center">
              <FontAwesomeIcon icon={faFacebook} className="mr-2" />
              Like our Facebook
            </a>
          </div>
        </div>
      </div>
      <div className="text-center text-white text-sm bg-black py-4">
        © dailydictation.com - since 2019
      </div>
    </footer>
  );
}

export default Footer;
