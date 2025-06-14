import { Routes, Route, Navigate, Link } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import useAuthStore from './store/authStore';
import Carrito from './pages/Carrito';

function App() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated); // para verificar si el usuario está autenticado
  return (
    <>
        <nav className="navbar navbar-expand navbar-dark bg-dark mb-4">
          <div className="container">
          <Link className="navbar-brand" to="/">Tienda De Ignacio</Link>
          <div>
            <Link className="btn btn-outline-light me-2" to="/">Home</Link>
            {!isAuthenticated && (
              <Link className="btn btn-outline-light" to="/login">Login</Link>
            )}
            
            
          </div>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
         <Route path="/carrito" element={<Carrito />} />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}

export default App;