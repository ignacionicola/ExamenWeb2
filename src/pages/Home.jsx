import { Link } from 'react-router-dom';
const Home = () => {
  return (
    <div className="container mt-5 text-center">
      {/* Logo  */}
      <img
       src='https://img.freepik.com/vector-gratis/plantilla-logotipo-tienda-instagram-gradiente_23-2149704603.jpg?semt=ais_hybrid&w=740'        
        alt="Logo de la tienda"
        className="img-fluid mb-4"

        style={{ maxWidth: '280px' , borderRadius: '10px' }}      
      />
      <h1 className="mb-3">Bienvenido a la Tienda Virtual</h1>
      <h4 className="mb-4 text-secondary">¡Todo lo que buscas, en un solo lugar!</h4>
      <p className="mb-4">
        Explora nuestra amplia variedad de productos.<br />
        Inicia sesión para ver el catálogo completo.
      </p>
      <div className="d-flex justify-content-center gap-3">
        <Link to="/login" className="btn btn-primary btn-lg">
          Iniciar Sesión
        </Link>
        <button
          className="btn btn-outline-secondary btn-lg"
          onClick={() => alert('¡Próximamente más información sobre nosotros!')}
        >
          Sobre nosotros
        </button>
      </div>
    </div>
  );
};

export default Home;