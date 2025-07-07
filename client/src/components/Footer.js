import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="footer bg-dark text-light mt-auto">
      <Container>
        <Row>
          <Col md={6} lg={3} className="mb-4">
            <h5>E-Commerce</h5>
            <p>
              Your one-stop shop for all your needs. Quality products, 
              great prices, and excellent customer service.
            </p>
          </Col>
          
          <Col md={6} lg={3} className="mb-4">
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li><a href="/" className="text-light text-decoration-none">Home</a></li>
              <li><a href="/products" className="text-light text-decoration-none">Products</a></li>
              <li><a href="/about" className="text-light text-decoration-none">About Us</a></li>
              <li><a href="/contact" className="text-light text-decoration-none">Contact</a></li>
            </ul>
          </Col>
          
          <Col md={6} lg={3} className="mb-4">
            <h5>Customer Service</h5>
            <ul className="list-unstyled">
              <li><a href="/help" className="text-light text-decoration-none">Help Center</a></li>
              <li><a href="/returns" className="text-light text-decoration-none">Returns</a></li>
              <li><a href="/shipping" className="text-light text-decoration-none">Shipping Info</a></li>
              <li><a href="/privacy" className="text-light text-decoration-none">Privacy Policy</a></li>
            </ul>
          </Col>
          
          <Col md={6} lg={3} className="mb-4">
            <h5>Follow Us</h5>
            <div className="d-flex gap-3">
              <a href="#" className="text-light">
                <FaFacebook size={24} />
              </a>
              <a href="#" className="text-light">
                <FaTwitter size={24} />
              </a>
              <a href="#" className="text-light">
                <FaInstagram size={24} />
              </a>
              <a href="#" className="text-light">
                <FaLinkedin size={24} />
              </a>
            </div>
          </Col>
        </Row>
        
        <hr className="my-4" />
        
        <Row>
          <Col className="text-center">
            <p className="mb-0">
              &copy; 2025 E-Commerce Platform. All rights reserved.
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
