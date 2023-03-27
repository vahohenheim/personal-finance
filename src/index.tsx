import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './app';
import reportWebVitals from './reportWebVitals';
import SignUp from './components/sign-up';
import SignIn from './components/sign-in/sign-in';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import ProtectedRoute from './components/protected-route';
import Profile from './components/profile';
import Dashboard from './components/dashboard';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="sign-up" element={<SignUp />} />
          <Route path="sign-in" element={<SignIn />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.log);
