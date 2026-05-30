import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import DiscussionDetail from './pages/DiscussionDetail';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-slate-50 flex flex-col">
          <Navbar />
          <main className="flex-1">
            <Routes>
              {/* Default landing redirects straight to dashboard */}
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              
              {/* Authentication Routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              
              {/* Core Forum Routes */}
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/discussion/:id" element={<DiscussionDetail />} />
              
              {/* Catch-all 404 Route */}
              <Route path="*" element={
                <div className="text-center p-20 text-xl font-semibold text-gray-600">
                  Page Not Found
                </div>
              } />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}