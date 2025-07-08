import React, { useEffect, useState } from "react";
import "../CSS/plantCart.css";
import { useAuth } from "../store/auth";

export const PlantCart = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const { user, OrderAddress, getOrderAddress } = useAuth();

  useEffect(() => {
    getOrderAddress();
  }, []);

  const toggleAddress = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // ✅ Filter orders based on logged-in user
  const userOrders = OrderAddress.filter(
    (order) => order.address?.username === user?.username
  );

  return (
    <div className="cart-products">
      <h2 className="heading">🛒 Your Cart</h2>

      {userOrders.length > 0 ? (
        <div className="product-grid">
          {userOrders.map((order, index) => (
            <div key={order._id || index} className="product-card">
              <span className="badge">{order.product.discount}% OFF</span>
              <img
                src={order.product.image}
                alt={order.product.title}
                className="product-image"
              />
              <h3>{order.product.title}</h3>
              <p>Quantity: {order.product.quantity}</p>
              <p className="price">
                ₹{(order.product.price * order.product.quantity).toFixed(2)}
                <span className="strike">
                  ₹{(order.product.price * order.product.quantity * 1.25).toFixed(2)}
                </span>
              </p>
              <button className="address-toggle" onClick={() => toggleAddress(index)}>
                {openIndex === index ? "Hide Delivery Address" : "Show Delivery Address"}
              </button>
              {openIndex === index && (
                <div className="address-details">
                  <p>{order.address.name}, {order.address.phone}</p>
                  <p>{order.address.address}, {order.address.locality}</p>
                  <p>{order.address.CityDistrictTown} - {order.address.pincode}</p>
                  <p>{order.address.state}</p>
                  <p>Type: {order.address.addressestype}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p>No recent orders found.</p>
      )}
    </div>
  );
};
