import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Pagination, Spinner } from 'react-bootstrap';
import { useSearchParams } from 'react-router-dom';
import { productsAPI } from '../services/api';
import ProductCard from '../components/ProductCard';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({});
  const [searchParams, setSearchParams] = useSearchParams();

  // Filter states
  const [filters, setFilters] = useState({
    search: searchParams.get('search') || '',
    category: searchParams.get('category') || '',
    minPrice: searchParams.get('minPrice') || '',
    maxPrice: searchParams.get('maxPrice') || '',
    sortBy: searchParams.get('sortBy') || 'newest'
  });

  const [page, setPage] = useState(parseInt(searchParams.get('page')) || 1);

  useEffect(() => {
    fetchProducts();
  }, [page, filters]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const params = {
        page,
        limit: 12,
        ...filters
      };

      // Remove empty values
      Object.keys(params).forEach(key => {
        if (!params[key]) delete params[key];
      });

      const response = await productsAPI.getProducts(params);
      setProducts(response.data.products);
      setPagination(response.data.pagination);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    setPage(1);

    // Update URL params
    const newSearchParams = new URLSearchParams();
    Object.keys(newFilters).forEach(key => {
      if (newFilters[key]) {
        newSearchParams.set(key, newFilters[key]);
      }
    });
    if (page !== 1) newSearchParams.set('page', '1');
    setSearchParams(newSearchParams);
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set('page', newPage.toString());
    setSearchParams(newSearchParams);
  };

  const clearFilters = () => {
    setFilters({
      search: '',
      category: '',
      minPrice: '',
      maxPrice: '',
      sortBy: 'newest'
    });
    setPage(1);
    setSearchParams({});
  };

  return (
    <Container className="py-4">
      <Row>
        <Col className="mb-4">
          <h1>Products</h1>
        </Col>
      </Row>

      <Row>
        {/* Filters Sidebar */}
        <Col lg={3} className="mb-4">
          <div className="bg-light p-3 rounded">
            <h5>Filters</h5>
            
            {/* Search */}
            <Form.Group className="mb-3">
              <Form.Label>Search</Form.Label>
              <Form.Control
                type="text"
                placeholder="Search products..."
                value={filters.search}
                onChange={(e) => handleFilterChange('search', e.target.value)}
              />
            </Form.Group>

            {/* Category */}
            <Form.Group className="mb-3">
              <Form.Label>Category</Form.Label>
              <Form.Select
                value={filters.category}
                onChange={(e) => handleFilterChange('category', e.target.value)}
              >
                <option value="">All Categories</option>
                <option value="electronics">Electronics</option>
                <option value="clothing">Clothing</option>
                <option value="home">Home & Garden</option>
                <option value="sports">Sports</option>
                <option value="books">Books</option>
              </Form.Select>
            </Form.Group>

            {/* Price Range */}
            <Form.Group className="mb-3">
              <Form.Label>Price Range</Form.Label>
              <Row>
                <Col>
                  <Form.Control
                    type="number"
                    placeholder="Min"
                    value={filters.minPrice}
                    onChange={(e) => handleFilterChange('minPrice', e.target.value)}
                  />
                </Col>
                <Col>
                  <Form.Control
                    type="number"
                    placeholder="Max"
                    value={filters.maxPrice}
                    onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                  />
                </Col>
              </Row>
            </Form.Group>

            {/* Sort By */}
            <Form.Group className="mb-3">
              <Form.Label>Sort By</Form.Label>
              <Form.Select
                value={filters.sortBy}
                onChange={(e) => handleFilterChange('sortBy', e.target.value)}
              >
                <option value="newest">Newest</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </Form.Select>
            </Form.Group>

            <Button variant="outline-secondary" onClick={clearFilters} className="w-100">
              Clear Filters
            </Button>
          </div>
        </Col>

        {/* Products Grid */}
        <Col lg={9}>
          {loading ? (
            <div className="text-center py-5">
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            </div>
          ) : (
            <>
              <Row className="mb-3">
                <Col>
                  <p className="text-muted">
                    Showing {products.length} of {pagination.total} products
                  </p>
                </Col>
              </Row>

              {products.length === 0 ? (
                <div className="text-center py-5">
                  <h4>No products found</h4>
                  <p className="text-muted">Try adjusting your filters</p>
                </div>
              ) : (
                <>
                  <Row>
                    {products.map((product) => (
                      <Col key={product._id} sm={6} lg={4} className="mb-4">
                        <ProductCard product={product} />
                      </Col>
                    ))}
                  </Row>

                  {/* Pagination */}
                  {pagination.pages > 1 && (
                    <Row className="mt-4">
                      <Col className="d-flex justify-content-center">
                        <Pagination>
                          <Pagination.First 
                            onClick={() => handlePageChange(1)}
                            disabled={page === 1}
                          />
                          <Pagination.Prev 
                            onClick={() => handlePageChange(page - 1)}
                            disabled={!pagination.hasPrev}
                          />
                          
                          {Array.from({ length: pagination.pages }, (_, i) => i + 1)
                            .filter(pageNum => 
                              pageNum === 1 || 
                              pageNum === pagination.pages || 
                              Math.abs(pageNum - page) <= 2
                            )
                            .map((pageNum, index, array) => (
                              <React.Fragment key={pageNum}>
                                {index > 0 && array[index - 1] !== pageNum - 1 && (
                                  <Pagination.Ellipsis />
                                )}
                                <Pagination.Item
                                  active={pageNum === page}
                                  onClick={() => handlePageChange(pageNum)}
                                >
                                  {pageNum}
                                </Pagination.Item>
                              </React.Fragment>
                            ))
                          }
                          
                          <Pagination.Next 
                            onClick={() => handlePageChange(page + 1)}
                            disabled={!pagination.hasNext}
                          />
                          <Pagination.Last 
                            onClick={() => handlePageChange(pagination.pages)}
                            disabled={page === pagination.pages}
                          />
                        </Pagination>
                      </Col>
                    </Row>
                  )}
                </>
              )}
            </>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Products;
