import React, { useEffect, useState } from "react";
import "../CSS/NavBarPlant.css";
import { NavLink } from "react-router-dom";
import {
    FaFacebook,
    FaHeart,
    FaInstagram,
    FaSearch,
    FaSeedling,
    FaShoppingCart,
    FaUserCircle,
    FaWhatsappSquare,
    FaTimes,
} from "react-icons/fa";
import { IoMenu } from "react-icons/io5";
import { useAuth } from "../store/auth";

export const NavBarPlant = () => {
    const [navVisible, setNavVisible] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const { isLoggedIn, user } = useAuth();

    const toggleNavbar = () => {
        setNavVisible((prev) => !prev);
    };

    // Scroll event listener
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 250) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div className="navbar-section">
            {/* Top header with social NavLinks and contact */}
            <div className="header-1">
                <div className="share">
                    <span>Follow us: </span>
                    <FaFacebook className="i" />
                    <FaInstagram className="i" />
                    <FaWhatsappSquare className="i" />
                </div>

                <div className="call">
                    <span>Call us: </span>
                    <a href="tel:+1234567890">+1234567890</a>
                </div>
            </div>

            {/* Middle header with logo and search */}
            <div className="header-2">
                <NavLink to="/" className="logo">
                    <FaSeedling className="i" /> LOGO
                </NavLink>

                <form className="search-bar-container" onSubmit={(e) => e.preventDefault()}>
                    <input
                        type="search"
                        id="search-bar"
                        placeholder="Search here..."
                    />
                    <label>
                        <FaSearch />
                    </label>
                </form>
            </div>

            {/* Navigation and user icons */}
            <div className={`header-3 ${isScrolled ? "active1" : ""}`}>
                <div id="menu-bar" onClick={toggleNavbar}>
                    {navVisible ? <FaTimes /> : <IoMenu />}
                </div>

                <nav className={`navbar ${navVisible ? "active" : ""}`}>
                    <NavLink to="/" className={({ isActive }) => (isActive ? "navactive" : "")} onClick={toggleNavbar}>Home</NavLink>
                    <NavLink to="/category" className={({ isActive }) => (isActive ? "navactive" : "")} onClick={toggleNavbar}>Category</NavLink>
                    <NavLink to="/product" className={({ isActive }) => (isActive ? "navactive" : "")} onClick={toggleNavbar}>Product</NavLink>
                    <NavLink to="/deal" className={({ isActive }) => (isActive ? "navactive" : "")} onClick={toggleNavbar}>Deal</NavLink>
                    <NavLink to="/contact" className={({ isActive }) => (isActive ? "navactive" : "")} onClick={toggleNavbar}>Contact</NavLink>

                    {user?.isAdmin && (
                        <NavLink to="/admin" className={({ isActive }) => (isActive ? "navactive" : "")} onClick={toggleNavbar}>Admin</NavLink>
                    )}




                    {isLoggedIn ? (
                        <NavLink to="/logout" className={({ isActive }) => (isActive ? "navactive" : "")} onClick={toggleNavbar}>Logout</NavLink>
                    ) : (
                        <>
                            <NavLink to="/register" className={({ isActive }) => (isActive ? "navactive" : "")} onClick={toggleNavbar}>Register</NavLink>
                            <NavLink to="/login" className={({ isActive }) => (isActive ? "navactive" : "")} onClick={toggleNavbar}>Login</NavLink>
                        </>
                    )}

                </nav>

                <div className="icons">
                    <NavLink to="/cart"><FaShoppingCart className="i" /></NavLink>
                    {/* <NavLink to="/save"><FaHeart className="i" /></NavLink> */}
                    <NavLink to="/profile"><FaUserCircle className="i" /></NavLink>
                </div>
            </div>
        </div>
    );
};
