import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import logo from '../assets/logo.png'
import { FaShoppingCart, FaSearch } from "react-icons/fa";
import './Header.css'
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Header() {

  const cartItems = useSelector(
    state => state.cart.cartItems
  );

  return (  
    <Navbar collapseOnSelect expand="lg" className="header-navbar ">
      <Container>

        {/* Logo */}
        <Navbar.Brand as={Link} to='/' ><img src={logo} alt="logo" width={250} height={50} className='d-inline-block align-top' /></Navbar.Brand>

        {/* Toggle Button */}
        <Navbar.Toggle aria-controls="responsive-navbar-nav" className='' />

        {/* Menu */}
        <Navbar.Collapse id="responsive-navbar-nav ">
          <Nav className="mx-auto nav-menu ">
            <Nav.Link style={{ color: "#f7444e" }} as={Link} to="/">HOME</Nav.Link>
            <NavDropdown title="PAGES" id="pages-dropdown">
              <NavDropdown.Item className='dropdown-items' as={Link} to="/pages/about">About</NavDropdown.Item>
              <NavDropdown.Item className='dropdown-items' as={Link} to="/pages/testimonial">Testimonial</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link as={Link} to="/products">PRODUCTS</Nav.Link>
            <Nav.Link as={Link} to="/blog">BLOG</Nav.Link>
            <Nav.Link as={Link} to="/contact">CONTACT</Nav.Link>

            {/* Nav-Icons */}
            <Nav.Link as={Link} to="/cart">
              <FaShoppingCart className='icon' size={20} />
              {cartItems.length > 0 && (
                <span className='cart-badge'>{cartItems.length}</span>
              )}
            </Nav.Link>
            <Nav.Link as={Link} to="/search">
              <FaSearch className='icon' size={18} />
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;