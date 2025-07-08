import React, { useState } from "react";
import "../CSS/productList.css";
import products from "../Api/c-newProducts.json";

const ProductList = () => {
    const [selectedOptions, setSelectedOptions] = useState({});

    const handleRadioChange = (category, product) => {
        setSelectedOptions((prev) => ({ ...prev, [category]: product }));

        const cartItems = JSON.parse(localStorage.getItem("plantCart")) || [];

        const newItem = {
            category,
            image: product.image,
            title: product.title,
            price: product.price,
            quantity: product.quantity
        };

        // Remove duplicate category
        const updatedItems = cartItems.filter(item => item.category !== category);
        updatedItems.push(newItem);

        localStorage.setItem("plantCart", JSON.stringify(updatedItems));
    };


    return (
        <>
            {products.map((product) => (
                <div className="product-card" key={product.id}>
                    <img
                        src={product.image}
                        alt={product.title}
                        className="product-image"
                    />
                    <div className="product-info">
                        <p>Seller: {product.title}</p>
                        <p className="discount">Discount: {product.discount}%</p>
                        <p className="price">₹{product.price}</p>
                        <p className="originalprice">₹{product.originalPrice}</p>
                        <p className="delivery">Delivery by {product.deliveryDate}</p>
                        <p>Qty: {product.quantity}</p>
                        <button
                            className="btn"
                            onClick={() => handleRadioChange(product.title, product)}
                        >
                            Order Now
                        </button>

                    </div>
                </div>
            ))}
        </>
    );
};

export default ProductList;
