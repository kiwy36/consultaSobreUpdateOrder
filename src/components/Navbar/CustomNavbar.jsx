import { Navbar, Container, Nav} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { CartContext } from '../../context/CartContext';
import { useContext } from 'react';
import './CustomNavbar.css';
import CartWidget from '../CartWidget/CartWidget';

const CustomNavbar = () => {
    const { getCartTotal } = useContext(CartContext);
    const redirectToHome = () => {
        window.location.href = "/";
    }

    return (
        <Navbar bg="dark" variant="dark" sticky="top">
            <Container>
                <Navbar.Brand className="justify-content-start">
                    <Link to="/" onClick={redirectToHome}>
                        <h1>TIENDA DE BICIS</h1>
                    </Link>
                </Navbar.Brand>
                <Nav className="ms-auto">
                    <Link to="/category/bici"><h2>Bicicletas</h2></Link>
                    <Link to="/category/accesorios"><h2>Accesorios</h2></Link>
                </Nav>
                <Nav>
                    <Link to="/cart"><h2>🛒{getCartTotal() !== 0 && (<span className="cartTotal">{getCartTotal()}</span>)}$</h2></Link>
                </Nav>
            </Container>
        </Navbar>
    );
}

export default CustomNavbar;
