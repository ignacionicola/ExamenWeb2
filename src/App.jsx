import { Routes, Route, Navigate, Link } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import useAuthStore from './store/authStore';
import Carrito from './pages/Carrito';

function App() {
  const { isAuthenticated, logout } = useAuthStore(); // para verificar si el usuario está autenticado
  
  const handleLogout = () => {
    logout();
    
  };

  return (
    <>
        <nav className="navbar navbar-expand navbar-dark bg-dark mb-4">
          <div className="container">
          <Link className="navbar-brand" to="/">Tienda De Ignacio</Link>
          <div className="d-flex align-items-center">
            <Link className="btn btn-outline-light me-2" to="/">Home</Link>
            
            {isAuthenticated ? (
              <>
                <Link className="btn btn-outline-light me-2" to="/dashboard">Dashboard</Link>
                <Link className="btn btn-outline-light me-2" to="/carrito">Carrito</Link>
                <button className="btn btn-danger" onClick={handleLogout}>
                  Cerrar Sesión
                </button>
              </>
            ) : (
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
        <Route 
          path="/carrito" 
          element={
            <ProtectedRoute>
              <Carrito />
            </ProtectedRoute>
          } 
        />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}

export default App;