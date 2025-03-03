import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./Components/Header";
import Home from "./Pages/Home";
import Body from "./Components/Body";
import Footer from "./Components/Footer";
import LearnTogether from "./Pages/LearnTogether";
import "./App.css";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import AllExercises from "./Pages/AllExercises";
import TopUsers from "./Pages/TopUsers";
import Help from "./Pages/Help";
import SectionPage from "./Pages/SectionPage";

import PronunciationComponent from "./Pages/english-pronunciation";

import VideoList from "./Detail/VideoList";
import DetailView from "./Detail/Detail";


import { AuthProvider } from './ContextAPI/authContext';


import AdminLayout from './Admin/Components/AdminLayout';
import Dashboard from './Admin/Pages/Dashboard';
import Lessons from './Admin/Pages/Lessons';
import Statistics from './Admin/Pages/Statistics';
import Settings from './Admin/Pages/Settings';
import NotFound from './Admin/Pages/NotFound';

import AccountInformation from "./Pages/AccountInformation";
import Notifications from "./Pages/Notifications";
import Comments from "./Pages/Comments";
import ChangePassword from "./Pages/ChangePassword";
import ChangeEmail from "./Pages/ChangeEmail";
import FavoritesLessons from "./Pages/FavoritesLessons";
import Completion from "./Pages/Completion";
import DetailLession from "./Pages/DetailLession";

const App = () => {
  const [theme, setTheme] = useState("light"); // default to 'light'

  // Lấy giá trị theme từ localStorage khi component được mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  // Cập nhật theme và lưu vào localStorage
  const toggleTheme = () => {
    setTheme((prevTheme) => {
      const newTheme = prevTheme === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', newTheme);
      return newTheme;
    });
  };

  return (
    <AuthProvider>
      <Router>
        <div className={`${theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-black"} app-container`}>
          {/* Chỉ hiển thị Header và Footer khi không phải route admin */}
          {!window.location.pathname.startsWith('/admin') && (
            <Header theme={theme} toggleTheme={toggleTheme} />
          )}
          <div className="content">
            <Routes>
              <Route path="/" element={<Home theme={theme} />} />
              <Route path="/exercises" element={<AllExercises theme={theme} />} />
              <Route path="/exercises/:slug" element={<SectionPage theme={theme} />} />
              <Route path="/exercises/:slug/:lessonId" element={<DetailLession theme={theme}/>} />
              <Route path="/top-users" element={<TopUsers theme={theme} />} />
              <Route path="/learntogether" element={<LearnTogether theme={theme} />} />
              <Route path="/support-dailydictation" element={<Help theme={theme} />} />

              <Route path="/account-information" element={<AccountInformation theme={theme} />} />
              <Route path="/notifications" element={<Notifications theme={theme} />} />
              <Route path="/comments" element={<Comments theme={theme} />} />
              <Route path="/completion" element={<Completion theme={theme} />} />
              <Route path="/favorite-lessons" element={<FavoritesLessons theme={theme} />} />
              <Route path="/change-password" element={<ChangePassword theme={theme} />} />
              <Route path="/change-email" element={<ChangeEmail theme={theme} />} />

           


              <Route path="/login" element={<Login theme={theme} />} />
              <Route path="/register" element={<Register theme={theme} />} />
              <Route path="/english-pronunciation" element={<PronunciationComponent theme={theme} />} />

              {/* Admin Routes */}
              <Route path="/admin/*" element={<AdminLayout />}>
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="lessons" element={<Lessons />} />
                <Route path="statistics" element={<Statistics />} />
                <Route path="settings" element={<Settings />} />
                <Route path="*" element={<NotFound />} />
              </Route>

            </Routes>
          </div>
          <Footer theme={theme} />
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
