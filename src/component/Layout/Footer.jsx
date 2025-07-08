import "../CSS/footer.css";
import {
    FaFacebookF,
    FaTwitter,
    FaInstagram,
    FaLinkedinIn,
    FaChevronUp,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Footer() {
    const [showScrollTop, setShowScrollTop] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 250) {
                setShowScrollTop(true);
            } else {
                setShowScrollTop(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    return (
        <>
            <footer className="footer">
                <div className="footer-column">
                    <h3>About Us</h3>
                    <p>
                        Lorem Ipsum Dolor Sit Amet Consectetur Adipisicing Elit.
                        Recusandae Voluptates Libero Iusto Dolorum Corporis
                        Consequatur Sunt Eos Eveniet Quia Enim.
                    </p>
                </div>

                <div className="footer-column">
                    <h3>Branch Locations</h3>
                    <ul>
                        <li>India</li>
                    </ul>
                </div>

                <div className="footer-column">
                    <h3>Quick Links</h3>
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/category">Category</Link></li>
                        <li><Link to="/product">Product</Link></li>
                        <li><Link to="/deal">Deal</Link></li>
                        <li><Link to="/contact">Contact</Link></li>
                    </ul>
                </div>

                <div className="footer-column">
                    <h3>Follow Us</h3>
                    <ul className="social-icons">
                        <li><a href="#" target="_blank"><FaFacebookF className="i" /> Facebook</a></li>
                        <li><a href="#" target="_blank"><FaTwitter className="i" /> Twitter</a></li>
                        <li><a href="#" target="_blank"><FaInstagram className="i" /> Instagram</a></li>
                        <li><a href="#" target="_blank"><FaLinkedinIn className="i" /> LinkedIn</a></li>
                    </ul>
                </div>
            </footer>

            {/* Scroll to Top Button */}
            {showScrollTop && (
                <div className="scroleTop" onClick={scrollToTop}>
                    <FaChevronUp className="scroll-top" />
                </div>
            )}

            {/* Created By */}
            <div className="createdBy">
                <h2>
                    Created By: <span>Jkcoder01</span> | All Rights Reserved!
                </h2>
            </div>
        </>
    );
}
