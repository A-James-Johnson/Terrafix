import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from "./assets/components/Dashboard";
import Login from './assets/components/login';
import Signup from './assets/components/signup';
import Home from './assets/components/Home';
import Workspace from './assets/components/Workspace';
import { TerraformProvider } from './assets/components/TerraformContext';
import Overview from './assets/components/Overview';
import FileViewer from './assets/components/Fileviewer';
import Analysis from './assets/components/Analysis';
import Tokenverification from './assets/components/Tokenverification';

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* Protected Routes */}
      <Route
        path="/home"
        element={
          <Tokenverification>
            <Home />
          </Tokenverification>
        }
      />
      <Route
        path="/dashboard"
        element={
          <Tokenverification>
            <TerraformProvider>
              <Dashboard />
            </TerraformProvider>
          </Tokenverification>
        }
      />
      <Route
        path="/workspace"
        element={
          <Tokenverification>
            <Workspace />
          </Tokenverification>
        }
      />
      <Route
        path="/overview"
        element={
          <Tokenverification>
            <TerraformProvider>
              <Overview />
            </TerraformProvider>
          </Tokenverification>
        }
      />
      <Route
        path="/analysis"
        element={
          <Tokenverification>
            <Analysis />
          </Tokenverification>
        }
      />
      <Route
        path="/file/:filename"
        element={
          <Tokenverification>
            <FileViewer />
          </Tokenverification>
        }
      />
    </Routes>
  );
}

export default App;
