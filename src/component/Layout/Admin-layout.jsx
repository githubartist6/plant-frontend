import "../Admin/CSS/admin-layout.css"
import { Navigate, NavLink, Outlet } from "react-router-dom";
import { FaMessage, FaUser, FaBars, FaBoxOpen } from "react-icons/fa6";
import { FaHome, FaRegListAlt, FaTimes } from "react-icons/fa";
import { MdCategory } from "react-icons/md";
import { useState } from "react";
import { useAuth } from "../store/auth";

export const AdminNavbar = () => {
    const { user, isLoading } = useAuth();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    if (isLoading) {
        return <h1>Loading ...</h1>
    }

    if (!user.isAdmin) {
        return <Navigate to="/" />
    }

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <div className="admin-layout">
            {/* Mobile Menu Icon */}
            {!isMenuOpen && (
                <div className="menu-btn" onClick={toggleMenu}>
                    <FaBars />
                </div>
            )}

            <aside className={`admin-navbar ${isMenuOpen ? "open" : ""}`}>
                {/* Close Icon */}
                {isMenuOpen && (
                    <div className="close-btn" onClick={toggleMenu}>
                        <FaTimes />
                    </div>
                )}

                <ul className="admin-ul">
                    <li className="admin-li">
                        <NavLink
                            to="/admin/user"
                            onClick={toggleMenu}>
                            <FaUser /> Users
                        </NavLink>
                    </li>
                    <li className="admin-li">
                        <NavLink
                            to="/admin/contact"
                            onClick={toggleMenu}>
                            <FaMessage /> Contacts
                        </NavLink>
                    </li>
                    <li className="admin-li">
                        <NavLink
                            to="/admin/service"
                            onClick={toggleMenu}>
                            <FaRegListAlt /> Service
                        </NavLink>
                    </li>
                    <li className="admin-li">
                        <NavLink
                            to="/admin/address"
                            onClick={toggleMenu}>
                            <FaHome /> Order-Address
                        </NavLink>
                    </li>
                </ul>
            </aside>

            <main className="admin-outlet">
                <h1 style={{
                    fontSize: "5rem",
                    fontWeight: "bold",
                    margin: "2.5rem 0",
                    color: "#fff"
                }}>
                    <span>Con</span>trol Panel
                </h1>

                <Outlet />
            </main>
        </div>
    );
};
