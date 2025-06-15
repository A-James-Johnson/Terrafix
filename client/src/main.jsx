

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
