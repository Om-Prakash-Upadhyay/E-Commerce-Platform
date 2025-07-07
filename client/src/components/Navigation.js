import React from 'react';
import { Navbar, Nav, Container, Badge } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { FaShoppingCart, FaUser, FaSignOutAlt } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const Navigation = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const { getCartItemsCount } = useCart();

  const handleLogout = () => {
    logout();
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand>E-Commerce</Navbar.Brand>
        </LinkContainer>
        
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <LinkContainer to="/">
              <Nav.Link>Home</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/products">
              <Nav.Link>Products</Nav.Link>
            </LinkContainer>
          </Nav>
          
          <Nav className="ms-auto">
            <LinkContainer to="/cart">
              <Nav.Link className="position-relative">
                <FaShoppingCart />
                {getCartItemsCount() > 0 && (
                  <Badge 
                    bg="danger" 
                    className="position-absolute top-0 start-100 translate-middle rounded-pill"
                    style={{ fontSize: '0.7rem' }}
                  >
                    {getCartItemsCount()}
                  </Badge>
                )}
                <span className="ms-1">Cart</span>
              </Nav.Link>
            </LinkContainer>
            
            {isAuthenticated ? (
              <>
                <LinkContainer to="/profile">
                  <Nav.Link>
                    <FaUser className="me-1" />
                    {user?.name}
                  </Nav.Link>
                </LinkContainer>
                <LinkContainer to="/orders">
                  <Nav.Link>Orders</Nav.Link>
                </LinkContainer>
                <Nav.Link onClick={handleLogout} style={{ cursor: 'pointer' }}>
                  <FaSignOutAlt className="me-1" />
                  Logout
                </Nav.Link>
              </>
            ) : (
              <>
                <LinkContainer to="/login">
                  <Nav.Link>Login</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/register">
                  <Nav.Link>Register</Nav.Link>
                </LinkContainer>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
