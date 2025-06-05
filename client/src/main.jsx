// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import { BrowserRouter } from 'react-router-dom';
// import App from './App';
// import './index.css';

// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//     <BrowserRouter>
//       <App />
//     </BrowserRouter>
//   </React.StrictMode>
// );
// import React from "react";
// import ReactDOM from "react-dom/client";
// import App from "./App";
// import { BrowserRouter } from 'react-router-dom';
// import { ThemeProvider } from "./assets/components/ThemeContext";
// import "./index.css";

// ReactDOM.createRoot(document.getElementById("root")).render(
//   <React.StrictMode>
//      <BrowserRouter>
//      <ThemeProvider>
//       <App />
//     </ThemeProvider>
//      </BrowserRouter>
    
//   </React.StrictMode>
// );




import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { TerraformProvider } from './assets/components/TerraformContext';
import "./index.css"

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <TerraformProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </TerraformProvider>
  </React.StrictMode>
);
