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
function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/home" element={<Home />} />
      <Route path="/dashboard" element={<TerraformProvider><Dashboard /></TerraformProvider>} />
      <Route path="/workspace" element={<Workspace />} />
      <Route path="/overview" element={<TerraformProvider><Overview /></TerraformProvider>} />
      <Route 
        path="/analysis" 
        element={<Analysis />}
      />
      <Route path="/file/:filename" element={<FileViewer />} />
    </Routes>
  );
}

export default App;
