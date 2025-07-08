import React, { useEffect, useState } from "react";
import "../CSS/orderAddresses.css";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";

const PORT_BASE_URLS = import.meta.env.VITE_PORT_BASE_URL;

export const OrderAddresses = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, multipaldata, OrderAddress, getOrderAddress } = useAuth();

  useEffect(() => {
    getOrderAddress();
  }, []);

  const productsData = multipaldata?.message?.[0]?.newProducts || [];
  const productData = productsData.find((item) => item.id.toString() === id);
  const quantityFromLocalStorage = parseInt(
    localStorage.getItem(`quantity_${id}`) || productData?.quantity || 1
  );
  const totalPrice = quantityFromLocalStorage * (productData?.price || 0);

  const [address, setAddress] = useState({
    username: "",
    name: "",
    phone: "",
    pincode: "",
    locality: "",
    address: "",
    CityDistrictTown: "",
    state: "",
    landmarkoptional: "",
    phoneoptional: "",
    addressestype: "",
  });

  useEffect(() => {
    if (user) {
      setAddress((prev) => ({
        ...prev,
        username: user.username || "",
        name: user.name || "",
        phone: user.phone || "",
      }));
    }
  }, [user]);

  const userOrders = OrderAddress.filter(
    (order) => order.address?.username === user?.username
  );

  useEffect(() => {
    if (userOrders.length > 0) {
      const savedAddress = userOrders[userOrders.length - 1];
      if (savedAddress?.address) {
        setAddress((prev) => ({
          ...prev,
          name: savedAddress.address.name || prev.name,
          phone: savedAddress.address.phone || prev.phone,
          pincode: savedAddress.address.pincode || "",
          locality: savedAddress.address.locality || "",
          address: savedAddress.address.address || "",
          CityDistrictTown: savedAddress.address.CityDistrictTown || "",
          state: savedAddress.address.state || "",
          landmarkoptional: savedAddress.address.landmarkoptional || "",
          phoneoptional: savedAddress.address.phoneoptional || "",
          addressestype: savedAddress.address.addressestype || "",
        }));
      }
    }
  }, [OrderAddress, user?.username]);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setAddress((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const orderData = {
      address,
      product: {
        id: productData?.id,
        title: productData?.title,
        discount: productData?.discount,
        image: productData?.image,
        price: productData?.price,
        quantity: quantityFromLocalStorage,
        totalPrice: totalPrice,
      },
    };

    try {
      const response = await fetch(`${PORT_BASE_URLS}/api/order`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      const res_data = await response.json();

      if (response.ok) {
        toast.success("Order placed successfully!");
        await getOrderAddress();
        navigate("/cart");
      } else {
        toast.error(res_data.message || "Something went wrong");
      }
    } catch (error) {
      console.log("Submit error", error);
      toast.error("Error while placing order.");
    }
  };

  return (
    <div className="form-container">
      {productData && (
        <div className="product-preview">
          <img
            src={productData.image}
            alt={productData.title}
            className="preview-image"
          />
          <div className="preview-details">
            <div className="top-bottom">
              <p className="titel">{productData.title}</p>
              <p>{productData.discount}% OFF</p>
              <p>Quantity: {quantityFromLocalStorage}</p>
            </div>
            <div className="top-bottom">
              <p>Price (Each): ₹{totalPrice.toFixed(2)}</p>
            </div>
          </div>
        </div>
      )}

      <form className="address-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          value={address.username}
          onChange={handleInput}
          style={{ display: "none" }}
        />
        <div className="row">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={address.name}
            onChange={handleInput}
          />
          <input
            type="number"
            name="phone"
            placeholder="Mobile"
            value={address.phone}
            onChange={handleInput}
          />
        </div>
        <div className="row">
          <input
            type="number"
            name="pincode"
            placeholder="Pin code"
            value={address.pincode}
            onChange={handleInput}
          />
          <input
            type="text"
            name="locality"
            placeholder="Locality"
            value={address.locality}
            onChange={handleInput}
          />
        </div>
        <textarea
          name="address"
          placeholder="Address"
          value={address.address}
          onChange={handleInput}
        />
        <div className="row">
          <input
            type="text"
            name="CityDistrictTown"
            placeholder="City"
            value={address.CityDistrictTown}
            onChange={handleInput}
          />
          <input
            type="text"
            name="state"
            placeholder="State"
            value={address.state}
            onChange={handleInput}
          />
        </div>
        <div className="row">
          <input
            type="text"
            name="landmarkoptional"
            placeholder="Landmark"
            value={address.landmarkoptional}
            onChange={handleInput}
          />
          <input
            type="text"
            name="phoneoptional"
            placeholder="Alt Phone"
            value={address.phoneoptional}
            onChange={handleInput}
          />
        </div>
        <div className="row">
          <input
            type="text"
            name="addressestype"
            placeholder="Address Type"
            value={address.addressestype}
            onChange={handleInput}
          />
        </div>
        <button type="submit" className="save-btn">
          Save
        </button>
      </form>
    </div>
  );
};
