
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'

import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Metrics from './pages/Metrics/Metrics'
import Profile from './pages/Profile/Profile'
import Settings from './pages/Settings/Settings'
import Geo from './pages/geo/Geo'
import Verify from './pages/Verify'

const isAuthenticated = () => {
  return !!localStorage.getItem('auth');
};


export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/verify" element={<Verify />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={isAuthenticated() ? <Dashboard /> : <Navigate to="/login" />}
        />
        <Route
          path="/metrics"
          element={isAuthenticated() ? <Metrics /> : <Navigate to="/login" />}
        />
        <Route path="/geo" element={isAuthenticated() ? <Geo /> : <Navigate to="/login" />} />
        <Route
          path="/profile"
          element={isAuthenticated() ? <Profile /> : <Navigate to="/login" />}
        />
        <Route
          path="/settings"
          element={isAuthenticated() ? <Settings /> : <Navigate to="/login" />}
        />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  )
}
