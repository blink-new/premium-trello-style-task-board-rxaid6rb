import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { Toaster as SonnerToaster } from './components/ui/sonner'; // Corrected import for ShadCN Sonner

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
    <SonnerToaster richColors position="top-right" /> {/* Use SonnerToaster from ShadCN */}
  </React.StrictMode>,
);