import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { FaShippingFast, FaShieldAlt, FaHeadset, FaUndoAlt } from 'react-icons/fa';
import { productsAPI } from '../services/api';
import ProductCard from '../components/ProductCard';

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        const response = await productsAPI.getProducts({ limit: 8 });
        setFeaturedProducts(response.data.products);
      } catch (error) {
        console.error('Error fetching featured products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedProducts();
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <section className="hero-section">
        <Container>
          <Row className="justify-content-center text-center">
            <Col lg={8}>
              <h1 className="display-4 fw-bold mb-4">
                Welcome to Our E-Commerce Store
              </h1>
              <p className="lead mb-4">
                Discover amazing products at unbeatable prices. 
                Shop with confidence and enjoy fast, secure delivery.
              </p>
              <LinkContainer to="/products">
                <Button variant="light" size="lg" className="me-3">
                  Shop Now
                </Button>
              </LinkContainer>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Features Section */}
      <section className="py-5">
        <Container>
          <Row className="text-center">
            <Col md={3} className="mb-4">
              <Card className="border-0 h-100">
                <Card.Body>
                  <FaShippingFast className="feature-icon" />
                  <Card.Title className="h5">Free Shipping</Card.Title>
                  <Card.Text>
                    Free shipping on orders over $50
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3} className="mb-4">
              <Card className="border-0 h-100">
                <Card.Body>
                  <FaShieldAlt className="feature-icon" />
                  <Card.Title className="h5">Secure Payment</Card.Title>
                  <Card.Text>
                    Your payment information is safe and secure
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3} className="mb-4">
              <Card className="border-0 h-100">
                <Card.Body>
                  <FaHeadset className="feature-icon" />
                  <Card.Title className="h5">24/7 Support</Card.Title>
                  <Card.Text>
                    Get help whenever you need it
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3} className="mb-4">
              <Card className="border-0 h-100">
                <Card.Body>
                  <FaUndoAlt className="feature-icon" />
                  <Card.Title className="h5">Easy Returns</Card.Title>
                  <Card.Text>
                    30-day return policy for your peace of mind
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Featured Products Section */}
      <section className="py-5 bg-light">
        <Container>
          <Row className="mb-5">
            <Col className="text-center">
              <h2 className="display-5 fw-bold">Featured Products</h2>
              <p className="lead text-muted">Check out our most popular items</p>
            </Col>
          </Row>
          
          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : (
            <Row>
              {featuredProducts.map((product) => (
                <Col key={product._id} sm={6} md={4} lg={3} className="mb-4">
                  <ProductCard product={product} />
                </Col>
              ))}
            </Row>
          )}
          
          <Row className="mt-4">
            <Col className="text-center">
              <LinkContainer to="/products">
                <Button variant="primary" size="lg">
                  View All Products
                </Button>
              </LinkContainer>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Categories Section */}
      <section className="py-5">
        <Container>
          <Row className="mb-5">
            <Col className="text-center">
              <h2 className="display-5 fw-bold">Shop by Category</h2>
              <p className="lead text-muted">Find what you're looking for</p>
            </Col>
          </Row>
          
          <Row>
            {['Electronics', 'Clothing', 'Home & Garden', 'Sports'].map((category) => (
              <Col key={category} md={6} lg={3} className="mb-4">
                <Card className="category-card h-100 text-center">
                  <Card.Body className="d-flex flex-column justify-content-center">
                    <Card.Title className="h4">{category}</Card.Title>
                    <LinkContainer to={`/products?category=${category.toLowerCase()}`}>
                      <Button variant="outline-primary">
                        Shop {category}
                      </Button>
                    </LinkContainer>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>
    </div>
  );
};

export default Home;
