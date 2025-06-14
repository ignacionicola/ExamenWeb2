import { useEffect, useState } from 'react';
import productosData from '../data/productos.json';
import { Card, Button } from 'react-bootstrap';
import useAuthStore from '../store/authStore';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/Dashboard.module.css';
import { useCartStore } from '../store/carritoStore';

const Dashboard = () => {
  const { isAuthenticated } = useAuthStore(); // Verifica que  el usuario está autenticado
  const navigate = useNavigate();

  const [productos, setProductos] = useState([]);
  const [filtro, setFiltro] = useState('');
  const [categoria, setCategoria] = useState('todos');
  const aggregarCarrito = useCartStore((state) => state.aggregarCarrito);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    } else {
      setProductos(productosData);
    }
  }, [isAuthenticated, navigate]);

  // Filtro los productos según el texto y la categoría
  const productosFiltrados = productos.filter((producto) => {
    const coincideTexto = producto.nombre.toLowerCase().includes(filtro.toLowerCase());
    const coincideCategoria = categoria === 'todos' || producto.categoria === categoria;
    return coincideTexto && coincideCategoria;
  });

  // Función para cerrar sesión
  const handleLogout = () => {
    useAuthStore.getState().logout();
    navigate('/login');
  };

  return (
    <div className="container mt-4">
      {}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className={styles.titulo}>Productos</h2>
        <Button variant="danger" onClick={handleLogout}>
          Cerrar sesión
        </Button>

        <Button variant="primary" onClick={() => navigate('/carrito')}>
        Ir al carrito
       </Button>
      </div>

      {/* Filtros */}
      <div className="row mb-3">
        <div className="col-md-6">
          <input
            type="text"
            className="form-control"
            placeholder="Buscar por nombre..."
            value={filtro}
            onChange={(e) => setFiltro(e.target.value)}
          />
        </div>
        <div className="col-md-4">
          <select
            className="form-select"
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
          >
            <option value="todos">Todas las categorías</option>
            <option value="ropa">Ropa</option>
            <option value="calzado">Calzado</option>
            <option value="accesorios">Accesorios</option>
          </select>
        </div>
        <div className="col-md-2">
          <Button variant="secondary" className="w-100" onClick={() => {
            setFiltro('');
            setCategoria('todos');
          }}>
            Limpiar
          </Button>
        </div>
      </div>

      {/* Productos */}
      <div className="row">
        {productosFiltrados.length === 0 ? (
          <div className="col-12">
            <div className="alert alert-info">No se encontraron productos.</div>
          </div>
        ) : (
          productosFiltrados.map((prod) => (
            <div key={prod.id} className="col-md-3 mb-4">
                <Card className={styles.card}>
                <Card.Img variant="top" src={prod.imagen} className={styles.cardImg} />
                <Card.Body>
                  <Card.Title>{prod.nombre}</Card.Title>
                  <Card.Text>Categoría: {prod.categoria}</Card.Text>
                  <Card.Text>Precio: ${prod.precio}</Card.Text>
                  <Button variant="success" onClick={() => aggregarCarrito(prod)}>
                  Agregar al carrito
                  </Button>

                </Card.Body>
              </Card> 
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Dashboard;
