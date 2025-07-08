import React, { useEffect, useRef, useState } from "react";
import "../CSS/plantProfile.css";
import { useAuth } from "../store/auth";
import { useNavigate } from "react-router-dom";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

export const PlantProfile = () => {
    const navigate = useNavigate();
    const fileInputRef = useRef(null);
    const [profileImage, setProfileImage] = useState(
        "https://thumbs.dreamstime.com/b/hands-holding-baby-plant-growth-development-19675611.jpg"
    );


    const [contact, setContact] = useState({
        name: "",
        phone: "",
        email: "",
    });

    const { user, isLoggedIn } = useAuth();

    useEffect(() => {
        if (!isLoggedIn) {
            toast.warning("Please login first.");
            navigate("/login");
        }

        if (user) {
            setContact({
                name: user.name || "",
                phone: user.phone || "",
                email: user.email || "",
            });
        }
    }, [user, isLoggedIn, navigate]);

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setProfileImage(imageUrl);
        }
    };

    const handleEditClick = () => {
        fileInputRef.current.click();
    };

    return (
        <div className="profile-card">
            <div className="image-container">
                <img src={profileImage} alt="Profile" className="profile-img" />
                <button className="edit-btn" onClick={handleEditClick}>
                    Edit Photo
                </button>
                <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    onChange={handleImageChange}
                    style={{ display: "none" }}
                />
            </div>

            <h2 className="username">{contact.name || "Your Name"}</h2>
            <p className="bio">Web Developer | Plant Lover 🌿 | React Enthusiast</p>

            <div className="social-links">
                <a href="https://facebook.com" target="_blank" rel="noreferrer">
                    <FaFacebook />
                </a>
                <a href="https://twitter.com" target="_blank" rel="noreferrer">
                    <FaTwitter />
                </a>
                <a href="https://instagram.com" target="_blank" rel="noreferrer">
                    <FaInstagram />
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noreferrer">
                    <FaLinkedin />
                </a>
            </div>

            <div className="extra-info">
                <p><strong>📧 Email:</strong> {contact.email || "your@email.com"}</p>
                <p><strong>🪴 Total Plants Ordered:</strong> 128</p>  {/* ➕ ये लाइन जोड़ी गई */}
                <p><strong>📍 Location:</strong> Jaipur, India</p>
            </div>

        </div>
    );
};
