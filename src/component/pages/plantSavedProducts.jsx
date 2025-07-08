// import React, { useState, useEffect, useContext } from "react";
// import "../CSS/plantSavedProducts.css";
// import { useAuth } from "../store/auth";
// import { CartContext } from "../../Context/CartContext";
// import { toast } from "react-toastify";
// import { useNavigate } from "react-router-dom";

// export const PlantSavedProducts = () => {
//   const { products, isLoggedIn } = useAuth();
//   const [saved, setSaved] = useState(products);
//   const { addToCart } = useContext(CartContext);
//   const navigate = useNavigate();

//   // 🔒 Redirect if not logged in
//   useEffect(() => {
//     if (!isLoggedIn) {
//       toast.warning("Please login first.");
//       navigate("/login");
//     }
//   }, [isLoggedIn, navigate]);

//   const handleRemove = (id) => {
//     const filtered = saved.filter((product) => product.id !== id);
//     setSaved(filtered);
//     toast.info("Product removed from saved list.");
//   };

//   const handleAddToCart = (product) => {
//     addToCart(product);
//     toast.success(`${product.title} added to cart!`);
//   };

//   if (saved.length === 0)
//     return <p className="empty-msg">No saved products found.</p>;

//   return (
//     <div className="saved-products">
//       <h2 className="heading">❤️ Saved Products</h2>
//       <div className="product-grid">
//         {saved?.map((product) => (
//           <div className="product-card" key={product.id}>
//             <img
//               src={product.image}
//               alt={product.title}
//               className="product-img"
//             />
//             <h3>{product.title}</h3>
//             <p>Price: ${product.price?.toFixed(2)}</p>

//             <div className="btn-group">
//               <button
//                 className="cart-btn"
//                 onClick={() => handleAddToCart(product)}
//               >
//                 Add to Cart
//               </button>
//               <button
//                 className="remove-btn"
//                 onClick={() => handleRemove(product.id)}
//               >
//                 Remove
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };
