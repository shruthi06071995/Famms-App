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
import { motion } from "framer-motion";

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

      const userInfo = JSON.parse(localStorage.getItem("userInfo") || "null");

      if (!userInfo) return;

      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/users/wishlist`,
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

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.div
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Navbar collapseOnSelect expand="lg" className={`header-navbar ${scrolled ? "scrolled" : ""}`}>
          <Container fluid>

            {/* Logo */}
            <Navbar.Brand as={Link} to='/' ><img src={logo} alt="logo" width={250} height={50} className='d-inline-block align-top' /></Navbar.Brand>

            {/* Toggle Button */}
            <Navbar.Toggle aria-controls="responsive-navbar-nav" className='' />

            {/* Menu */}
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="ms-auto nav-menu ">
                <motion.div whileHover={{ scale: 1.1 }}>
                  <Nav.Link style={{ color: "#f7444e" }} as={Link} to="/">HOME</Nav.Link>
                </motion.div>

                <motion.div whileHover={{ scale: 1.1 }}>
                  <NavDropdown title="PAGES" id="pages-dropdown">
                    <motion.div whileHover={{ scale: 1.2 }}>
                      <NavDropdown.Item className='dropdown-items' as={Link} to="/pages/about">About</NavDropdown.Item>
                      <NavDropdown.Item className='dropdown-items' as={Link} to="/pages/testimonial">Testimonial</NavDropdown.Item>
                    </motion.div>
                  </NavDropdown>
                </motion.div>

                <motion.div whileHover={{ scale: 1.1 }}>
                  <Nav.Link as={Link} to="/products">PRODUCTS</Nav.Link>
                </motion.div>

                <motion.div whileHover={{ scale: 1.1 }}>
                  <Nav.Link as={Link} to="/blog">BLOG</Nav.Link>
                </motion.div>

                <motion.div whileHover={{ scale: 1.1 }}>
                  <Nav.Link as={Link} to="/contact">CONTACT</Nav.Link>
                </motion.div>

                <motion.div whileHover={{ scale: 1.2 }}>
                  <NavDropdown
                    title={<FaUserCircle className="icon" size={22} />}
                    id="user-dropdown"
                    align="end"
                  >
                    <motion.div whileHover={{ scale: 1.2 }}>
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
                    </motion.div>
                  </NavDropdown>
                </motion.div>

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
                <motion.div whileHover={{ scale: 1.1 }}>
                  {!userInfo && (
                    <Nav.Link as={Link} to="/login">
                      LOGIN
                    </Nav.Link>
                  )}
                </motion.div>

                {/* Nav-Icons */}
                <Nav.Link as={Link} to="/cart" style={{ position: "relative" }}>
                  <div className='cart-icon-wrapper'>
                    <motion.div whileHover={{ scale: 1.2 }}>
                      <FaShoppingCart id="cart-icon" className='icon' size={20} />
                    </motion.div>

                    {cartItems.length > 0 && (
                      <motion.span
                        className="cart-badge"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                      >
                        {cartItems.length}
                      </motion.span>
                    )}

                  </div>
                </Nav.Link>

                <Nav.Link as={Link} to="/search">
                  <motion.div whileHover={{ scale: 1.2 }}>
                    <FaSearch className='icon' size={18} />
                  </motion.div>
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </motion.div >
    </>
  );
}

export default Header;