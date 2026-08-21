import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import logo from '../../assets/logo.png';
import { FaShoppingCart, FaSearch, FaUserCircle } from "react-icons/fa";

import './Header.css'

import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import axios from "axios";

function Header() {

  const cartItems = useSelector(

    state => state.cart.cartItems

  );

  const [userInfo, setUserInfo] = useState(

    JSON.parse(localStorage.getItem("userInfo"))

  );

  const navigate = useNavigate();

  const [wishlistCount, setWishlistCount] = useState(0);

  useEffect(() => {

    const syncUserInfo = () => {

      setUserInfo(JSON.parse(localStorage.getItem("userInfo")));

    };

    syncUserInfo();
    fetchWishlistCount();

    window.addEventListener("userInfoChanged", syncUserInfo);
    window.addEventListener("wishlistUpdated", fetchWishlistCount);

    return () => {
      window.removeEventListener("userInfoChanged", syncUserInfo);
      window.removeEventListener("wishlistUpdated", fetchWishlistCount);
    };

  }, []);

  const handleLogout = () => {

    localStorage.removeItem("userInfo");
    window.dispatchEvent(new Event("userInfoChanged"));

    navigate("/login");

  };

  const fetchWishlistCount = async () => {

    try {

      const userInfo = JSON.parse(localStorage.getItem("userInfo"));

      if (!userInfo) return;

      const { data } = await axios.get(
        "http://localhost:5000/api/users/wishlist",
        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      );

      setWishlistCount(data.length);

    } catch (error) {

      console.log(error);

    }

  };

  return (
    <Navbar collapseOnSelect expand="lg" className="header-navbar ">
      <Container fluid>

        {/* Logo */}
        <Navbar.Brand as={Link} to='/' ><img src={logo} alt="logo" width={250} height={50} className='d-inline-block align-top' /></Navbar.Brand>

        {/* Toggle Button */}
        <Navbar.Toggle aria-controls="responsive-navbar-nav" className='' />

        {/* Menu */}
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ms-auto nav-menu ">
            <Nav.Link style={{ color: "#f7444e" }} as={Link} to="/">HOME</Nav.Link>
            <NavDropdown title="PAGES" id="pages-dropdown">
              <NavDropdown.Item className='dropdown-items' as={Link} to="/pages/about">About</NavDropdown.Item>
              <NavDropdown.Item className='dropdown-items' as={Link} to="/pages/testimonial">Testimonial</NavDropdown.Item>
            </NavDropdown>

            <Nav.Link as={Link} to="/products">PRODUCTS</Nav.Link>
            <Nav.Link as={Link} to="/blog">BLOG</Nav.Link>
            <Nav.Link as={Link} to="/contact">CONTACT</Nav.Link>

            <NavDropdown
              title={<FaUserCircle size={22} />}
              id="user-dropdown"
              align="end"
            >
              <NavDropdown.Item as={Link} to="/profile">
                My Profile
              </NavDropdown.Item>

              <NavDropdown.Item as={Link} to="/myorders">
                My Orders
              </NavDropdown.Item>

              <NavDropdown.Item as={Link} to="/wishlist">
                Wishlist ({wishlistCount})
              </NavDropdown.Item>

              <NavDropdown.Divider />

              <NavDropdown.Item onClick={handleLogout}>
                Logout
              </NavDropdown.Item>
            </NavDropdown>

            {/* 👇 Conditional: only show Add Product link if logged in */}
            {userInfo?.role === "admin" && (
              <Nav.Link as={Link} to="/admin/add-product">ADD PRODUCT</Nav.Link>
            )}

            {userInfo?.role === "admin" && (
              <Nav.Link as={Link} to="/admin/orders">
                ALL ORDERS
              </Nav.Link>
            )}

            {/* 👇 Conditional: LOGIN link vs LOGOUT button */}
            {!userInfo && (
              <Nav.Link as={Link} to="/login">
                LOGIN
              </Nav.Link>
            )}

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