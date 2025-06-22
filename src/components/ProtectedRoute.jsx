import { Navigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  // console.log('ProtectedRoute - isAuthenticated:', isAuthenticated);

  if (!isAuthenticated) {
    // console.log('Usuario no autenticado, redirigiendo a /login');
    return <Navigate to="/login" />;
  }

  // console.log('Usuario autenticado, mostrando ruta protegida');
  return children;
};

export default ProtectedRoute;

// no uso outlet porque no tengo rutas anidadas en el dashboard 