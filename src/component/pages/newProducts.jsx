import React, { useState, useEffect } from 'react';
import '../CSS/newProducts.css';
import { Link } from 'react-router-dom';
import { FaEye } from 'react-icons/fa';
import { IoMdShareAlt } from 'react-icons/io';
import { useAuth } from '../store/auth';
import { toast } from 'react-toastify';
import Loading from '../Loding/loding';

// Component to display rating stars
const RatingStars = ({ rating }) => (
  <div className="stars">
    {'★'.repeat(rating)}{'☆'.repeat(5 - rating)}
  </div>
);

// Single Product Card with controlled quantity and total price
const ProductCard = ({ product, isLoggedIn }) => {
  const { id } = product;

  const initialQty = parseInt(
    localStorage.getItem(`quantity_${id}`) || product.quantity || 1,
    10
  );
  const [qty, setQty] = useState(initialQty);

  useEffect(() => {
    localStorage.setItem(`quantity_${id}`, qty);
  }, [qty, id]);

  const totalPrice = qty * product.price;

  const handleShare = () => {
    const productUrl = `${window.location.origin}/${product.link || 'product/' + product._id}`;
    if (navigator.share) {
      navigator.share({
        title: product.title,
        text: 'Check out this product!',
        url: productUrl,
      });
    } else {
      navigator.clipboard.writeText(productUrl);
      toast.success('Link copied to clipboard!');
    }
  };

  return (
    <div className="product-card" key={id}>
      <span className="discount-badge">{product.discount} %</span>
      <div className="image-wrapper">
        <img src={product.image} alt={product.title} className="product-img" />
        <div className="image-overlay">
          <IoMdShareAlt className="icon" title="Share" onClick={handleShare} />
          <FaEye className="icon" title="View" style={{ cursor: 'pointer' }} />
        </div>
      </div>
      <h1>{product.title}</h1>
      <RatingStars rating={product.rating} />
      <div className="quantity">
        Quantity:
        <input
          type="number"
          min="1"
          inputMode="numeric"
          value={qty}
          onChange={(e) => setQty(parseInt(e.target.value, 10) || 1)}
        />
      </div>
      <div className="price">
        <span className="sale-price">₹{totalPrice.toFixed(2)}</span>
        <span className="original-price">₹{product.originalPrice.toFixed(2)}</span>
      </div>
      <Link
        to={isLoggedIn ? `${product.link}/${product.id}` : '/login'}
        className="add-btn btn"
      >
        Add To Cart
      </Link>
    </div>
  );
};

// Main NewProducts component
export const NewProducts = () => {
  const { multipaldata, isLoggedIn, isLoading } = useAuth();
  const productsData = multipaldata?.message?.[0]?.newProducts || [];

  if (isLoading || productsData.length === 0) {
    return (
      <h2 className="loading">
        <Loading />
      </h2>
    );
  }

  return (
    <div className="product-container">
      <h2 className="heading">New Products</h2>
      <div className="product-grid">
        {productsData.map((product) => (
          <ProductCard key={product.id} product={product} isLoggedIn={isLoggedIn} />
        ))}
      </div>
    </div>
  );
};
