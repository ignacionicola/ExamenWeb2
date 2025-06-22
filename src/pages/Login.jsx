import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';
import { loginUser } from '../services/authService';
import { Form, Button, Card, Alert } from 'react-bootstrap';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const { login, isAuthenticated } = useAuthStore();
  const navigate = useNavigate();

  // Verificar si ya está autenticado al cargar el componente
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = await loginUser(username, password);
      login(token);
      navigate('/dashboard');
    } catch (err) {
      setError('Usuario o contraseña incorrectos');
    }
  };

  // Si ya está autenticado, no mostrar el formulario
  if (isAuthenticated) {
    return null; 
  }

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <Card style={{ width: '28rem', padding: '2rem', boxShadow: '20px 10px 20px #ccc' }}>

        <Card.Body>
          {/* Icono de usuario */}
          <div className="text-center mb-3">
            <img
          src='https://img.freepik.com/vector-gratis/plantilla-logotipo-tienda-instagram-gradiente_23-2149704603.jpg?semt=ais_hybrid&w=740'        

              alt="user"
              style={{ width: 170, marginBottom: 10, borderRadius: 10 }}
            />
          </div>
          <Card.Title className="mb-2 text-center" style={{ fontSize: '2rem' }}>
            ¡Bienvenido!
          </Card.Title>
          <Card.Subtitle className="mb-4 text-muted text-center">
            Inicia sesión para acceder a la tienda
          </Card.Subtitle>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                placeholder="Usuario"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                autoFocus
                size="lg"
              />
            </Form.Group>
            <Form.Group className="mb-4">
              <Form.Control
                type="password"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                size="lg"
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="w-100 btn-lg">
              Ingresar
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Login;