import React, { useState } from "react";
import "../Admin/CSS/addPlantForm.css";

const AddPlantForm = () => {
  const [formData, setFormData] = useState({
    id: "",
    image: "",
    discount: "",
    title: "",
    rating: "",
    quantity: "",
    price: "",
    originalPrice: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Saved Plant Data:", formData);
    alert("✅ Plant data saved successfully!");
    setFormData({
      id: "",
      image: "",
      discount: "",
      title: "",
      rating: "",
      quantity: "",
      price: "",
      originalPrice: "",
    });
  };

  return (
    <div className="form-container">
      <h2>Add New Plant 🌱</h2>
      <form onSubmit={handleSubmit} className="plant-form">
        <div className="input-with-preview">
          <input
            type="text"
            name="image"
            placeholder="Image URL"
            value={formData.image}
            onChange={handleChange}
            required
          />
          {formData.image && (
            <div className="image-preview">
              <img src={formData.image} alt="Preview" />
            </div>
          )}
        </div>

        <input
          type="text"
          name="id"
          placeholder="Plant ID"
          value={formData.id}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="discount"
          placeholder="Discount (e.g. 15%)"
          value={formData.discount}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="title"
          placeholder="Title (e.g. Aloe Vera)"
          value={formData.title}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="rating"
          placeholder="Rating (e.g. 4.5)"
          value={formData.rating}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="quantity"
          placeholder="Quantity"
          value={formData.quantity}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Selling Price"
          value={formData.price}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="originalPrice"
          placeholder="Original Price"
          value={formData.originalPrice}
          onChange={handleChange}
          required
        />

        <button type="submit">Save Plant</button>
      </form>
    </div>
  );
};

export default AddPlantForm;
