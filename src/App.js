import React from 'react';
import Login from './Login';

import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.min';

import { Routes, Route, Navigate, useLocation } from 'react-router-dom';

import { AuthProvider, useAuth } from './Auth/AuthContext';

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();

  // If user is not authenticated, redirect to login page
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return children;
}

function App() {
  const location = useLocation();
  const shouldShowNav = location.pathname !== '/login';

  return (
    <AuthProvider>
      <div className="container-xxl">
        {shouldShowNav && (
          <>

            <div className='container-fluid'>


              <Routes>

                {/* <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />

                <Route path="/customerList" element={<ProtectedRoute><CustomerList /></ProtectedRoute>} /> */}

                <Route path="*" element={<Navigate to="/login" />} />
              </Routes>
            </div>


          </>
        )}
      </div>

      {/* Routes outside the flex layout */}
      <Routes>
        <Route path="/login" element={<Login />} /> {/* Make sure the login page is here */}
      </Routes>

    </AuthProvider >
  );
};

export default App;