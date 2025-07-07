import React from 'react';
import { Card, Button, Badge } from 'react-bootstrap';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={i} className="text-warning" />);
    }

    if (hasHalfStar) {
      stars.push(<FaStarHalfAlt key="half" className="text-warning" />);
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<FaRegStar key={`empty-${i}`} className="text-warning" />);
    }

    return stars;
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(product, 1);
  };

  const handleCardClick = () => {
    navigate(`/products/${product._id}`);
  };

  return (
    <Card className="h-100 product-card" style={{ cursor: 'pointer' }} onClick={handleCardClick}>
      <Card.Img
        variant="top"
        src={product.images[0] || '/placeholder-image.jpg'}
        alt={product.name}
        className="product-image"
      />
      <Card.Body className="d-flex flex-column">
        <Card.Title className="h6">{product.name}</Card.Title>
        <Card.Text className="text-muted small flex-grow-1">
          {product.description.length > 100 
            ? `${product.description.substring(0, 100)}...` 
            : product.description
          }
        </Card.Text>
        
        <div className="mb-2">
          <div className="d-flex align-items-center mb-1">
            {renderStars(product.ratings.average)}
            <span className="ms-2 text-muted small">
              ({product.ratings.count} reviews)
            </span>
          </div>
        </div>

        <div className="d-flex justify-content-between align-items-center mb-2">
          <div>
            <span className="price-current">${product.price}</span>
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="price-original ms-2">${product.originalPrice}</span>
            )}
          </div>
          {product.stock === 0 ? (
            <Badge bg="danger">Out of Stock</Badge>
          ) : product.stock < 10 ? (
            <Badge bg="warning">Low Stock</Badge>
          ) : (
            <Badge bg="success">In Stock</Badge>
          )}
        </div>

        <Button
          variant="primary"
          onClick={handleAddToCart}
          disabled={product.stock === 0}
          className="mt-auto"
        >
          {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
        </Button>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
