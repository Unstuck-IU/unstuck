import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from "react-router-dom";
import App from './App.jsx'
import './app.css'
import AuthProvider from './Providers/AuthProvider.jsx';
// import SupabaseProvider from './Providers/SupabaseProvider.jsx';



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter> 

    <AuthProvider>
    <App />
    </AuthProvider>

    </BrowserRouter> 
  </React.StrictMode>,
)
