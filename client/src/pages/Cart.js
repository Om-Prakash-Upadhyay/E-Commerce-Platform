import React from 'react';
import { Container, Row, Col, Card, Button, ListGroup, Badge } from 'react-bootstrap';
import { FaPlus, FaMinus, FaTrash } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Cart = () => {
  const { items, updateQuantity, removeFromCart, getCartTotal } = useCart();

  const handleQuantityChange = (productId, currentQuantity, change) => {
    const newQuantity = currentQuantity + change;
    if (newQuantity > 0) {
      updateQuantity(productId, newQuantity);
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  if (items.length === 0) {
    return (
      <Container className="py-5">
        <Row className="justify-content-center">
          <Col md={8} className="text-center">
            <h2>Your Cart is Empty</h2>
            <p className="text-muted mb-4">
              Looks like you haven't added any items to your cart yet.
            </p>
            <Link to="/products">
              <Button variant="primary" size="lg">
                Continue Shopping
              </Button>
            </Link>
          </Col>
        </Row>
      </Container>
    );
  }

  return (
    <Container className="py-4">
      <Row>
        <Col>
          <h1 className="mb-4">Shopping Cart</h1>
        </Col>
      </Row>

      <Row>
        <Col lg={8}>
          <Card>
            <Card.Header>
              <h5 className="mb-0">Cart Items ({items.length})</h5>
            </Card.Header>
            <ListGroup variant="flush">
              {items.map((item) => (
                <ListGroup.Item key={item.product._id}>
                  <Row className="align-items-center">
                    <Col xs={3} md={2}>
                      <img
                        src={item.product.images[0] || '/placeholder-image.jpg'}
                        alt={item.product.name}
                        className="img-fluid rounded"
                        style={{ maxHeight: '80px', objectFit: 'cover' }}
                      />
                    </Col>
                    
                    <Col xs={9} md={4}>
                      <h6 className="mb-1">{item.product.name}</h6>
                      <p className="text-muted small mb-1">
                        {item.product.category}
                      </p>
                      <div className="d-flex align-items-center">
                        <Badge bg="success" className="me-2">
                          {formatPrice(item.product.price)}
                        </Badge>
                        {item.product.stock < 10 && (
                          <Badge bg="warning">Low Stock</Badge>
                        )}
                      </div>
                    </Col>

                    <Col xs={6} md={3}>
                      <div className="d-flex align-items-center">
                        <Button
                          variant="outline-secondary"
                          size="sm"
                          onClick={() => handleQuantityChange(item.product._id, item.quantity, -1)}
                          disabled={item.quantity <= 1}
                        >
                          <FaMinus />
                        </Button>
                        <span className="mx-3 fw-bold">{item.quantity}</span>
                        <Button
                          variant="outline-secondary"
                          size="sm"
                          onClick={() => handleQuantityChange(item.product._id, item.quantity, 1)}
                          disabled={item.quantity >= item.product.stock}
                        >
                          <FaPlus />
                        </Button>
                      </div>
                    </Col>

                    <Col xs={3} md={2} className="text-end">
                      <div className="fw-bold mb-1">
                        {formatPrice(item.product.price * item.quantity)}
                      </div>
                      <Button
                        variant="outline-danger"
                        size="sm"
                        onClick={() => removeFromCart(item.product._id)}
                      >
                        <FaTrash />
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Card>
        </Col>

        <Col lg={4}>
          <Card>
            <Card.Header>
              <h5 className="mb-0">Order Summary</h5>
            </Card.Header>
            <Card.Body>
              <div className="d-flex justify-content-between mb-2">
                <span>Subtotal:</span>
                <span>{formatPrice(getCartTotal())}</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span>Shipping:</span>
                <span>
                  {getCartTotal() > 50 ? (
                    <span className="text-success">Free</span>
                  ) : (
                    formatPrice(9.99)
                  )}
                </span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span>Tax:</span>
                <span>{formatPrice(getCartTotal() * 0.08)}</span>
              </div>
              <hr />
              <div className="d-flex justify-content-between mb-3">
                <strong>Total:</strong>
                <strong>
                  {formatPrice(
                    getCartTotal() + 
                    (getCartTotal() > 50 ? 0 : 9.99) + 
                    (getCartTotal() * 0.08)
                  )}
                </strong>
              </div>

              <div className="d-grid gap-2">
                <Link to="/checkout">
                  <Button variant="primary" size="lg" className="w-100">
                    Proceed to Checkout
                  </Button>
                </Link>
                <Link to="/products">
                  <Button variant="outline-secondary" className="w-100">
                    Continue Shopping
                  </Button>
                </Link>
              </div>

              {getCartTotal() < 50 && (
                <div className="mt-3 p-2 bg-light rounded">
                  <small className="text-muted">
                    Add {formatPrice(50 - getCartTotal())} more for free shipping!
                  </small>
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Cart;
