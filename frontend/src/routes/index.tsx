import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import StartPage from '@/pages/StartPage'
import LoginPage from '@/pages/LoginPage'
import SignupStepOne from '@/pages/SignupStepOne'
import SignupStepTwo from '@/pages/SignupStepTwo'
import Dashboard from '@/pages/Dashboard'
import { useAuth } from '@/hooks/useAuth'

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
}

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupStepOne />} />
        <Route path="/signup-step-2" element={<SignupStepTwo />} />
        <Route 
          path="/dashboard" 
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          } 
        />
      </Routes>
    </BrowserRouter>
  )
}
