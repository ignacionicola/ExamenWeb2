import { useCartStore } from '../store/carritoStore';
import { Card, Button } from 'react-bootstrap';
import styles from '../styles/Carrito.module.css';

const Carrito = () => {
  // se obtiene el carrito y las funciones de manejo desde el store
  const { cart, eliminarCarrito, limpiarCarrito } = useCartStore();

  return (
    <div className="container mt-4">
      <h2 className={styles.titulo}> Tu Carrito</h2>

      {/* Si el carrito está vacío, se muestra un mensaje */}
      {cart.length === 0 ? (
        <div className="alert alert-info">Tu carrito está vacío</div>
      ) : (
        <>
          <div className="row">
            {cart.map((producto, index) => (
              <div key={index} className="col-md-4 mb-4">
                <Card className={styles.card}>
                  <Card.Img variant="top" src={producto.imagen} className={styles.cardImg} />
                  <Card.Body>
                    <Card.Title>{producto.nombre}</Card.Title>
                    <Card.Text>Categoría: {producto.categoria}</Card.Text>
                    <Card.Text>Precio: ${producto.precio}</Card.Text>
                    <Button variant="danger" onClick={() => eliminarCarrito(index)}>
                      Eliminar del carrito
                    </Button>
                  </Card.Body>
                </Card>
              </div>
            ))}
          </div>

          {/* Botón para vaciar todo el carrito */}
          <div className="text-end mt-3">
            <Button variant="warning" onClick={limpiarCarrito}>
              Vaciar carrito
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default Carrito;
