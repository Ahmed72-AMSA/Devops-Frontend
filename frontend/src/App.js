import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard.jsx';
import Mprojects from './pages/mprojects.jsx';
import Mteam from './pages/mteam.jsx';
import Mtasks from './pages/mtasks.jsx';
import Project from './pages/nproject.jsx';
import Task from './pages/ntask.jsx';
import Home from './home/Home.js';
import Projects from './home/Projects.js';
import Developer from './pages/dev-proj.jsx';
import DashboardNavbar from './pages/navbar.jsx';
import { Signup } from './pages/signup.jsx';
import AssignProject from './pages/assignProject.jsx';
import DeveloperTask from './pages/dev-task.jsx';
import SearchTasks from './pages/searchTasks.jsx';
import LoginSignup from './pages/loginsignup.jsx';
import TaskAttachement from './pages/TasksAttatchement.jsx';
import InboxPage from './pages/Inbox.jsx';
import TaskComments from './pages/TaskComments.jsx';
import { AuthGuard } from './guards/AuthGuard.js';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LoginSignup />} />
        <Route path="/signup" element={<Signup />} />

        <Route
          path="/dashboard/*"
          element={
            <AuthGuard roles={['Admin']}>
              <DashboardNavbar />
              <Sidebar>
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="mprojects" element={<Mprojects />} />
                  <Route path="mtasks" element={<Mtasks />} />
                  <Route path="nproject" element={<Project />} />
                  <Route path="mteam" element={<Mteam />} />
                  <Route path="dev-proj" element={<Developer />} />
                  <Route path="ntask" element={<Task />} />
                  <Route path="assignProject" element={<AssignProject />} />
                  <Route path="dev-task" element={<DeveloperTask />} />
                  <Route path="searchtasks" element={<SearchTasks />} />
                  <Route path="taskAttach" element={<TaskAttachement />} />
                  <Route path="inbox" element={<InboxPage />} />
                  <Route path="taskComments" element={<TaskComments />} />
                </Routes>
              </Sidebar>
            </AuthGuard>
          }
        />

        <Route
          path="/home"
          element={
            <AuthGuard roles={['Admin', 'User']}>
              <Home />
            </AuthGuard>
          }
        />

        <Route
          path="/projects"
          element={
            <AuthGuard roles={['Admin', 'User']}>
              <Projects />
            </AuthGuard>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
