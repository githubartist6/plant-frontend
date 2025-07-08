import { useEffect, useState } from "react";
import "../CSS/contact.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";

const PORT_BASE_URLS = import.meta.env.VITE_PORT_BASE_URL;
const URL = `${PORT_BASE_URLS}/api/form/contact`;

export default function Contact() {
    const [contact, setContact] = useState({
        name: "",
        phone: "",
        email: "",
        message: "",
    });

    const { user, isLoggedIn } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            setContact({
                name: user.name || "",
                phone: user.phone || "",
                email: user.email || "",
                message: "",
            });
        }
    }, [user]);


    const handleInput = (e) => {
        const { name, value } = e.target;
        setContact((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();


        if (!isLoggedIn) {
            toast.warning("Please login to submit the form.");
            navigate("/login");
            return;
        }

        try {
            const response = await fetch(URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(contact),
            });

            const res_data = await response.json();

            if (response.ok) {
                toast.success("Thank you! We'll get back to you soon.");
                setContact((prev) => ({ ...prev, message: "" }));
            } else {
                toast.error(res_data.extraDetails || res_data.message || "Something went wrong");
            }
        } catch (error) {
            console.log("contacts form", error);
            toast.error("Something went wrong while submitting the form.");
        }
    };

    return (
        <section className="contact-container">
            <h2 className="header">Get in Touch</h2>
            <div className="contact-box">
                <div className="contact-map">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7160.968719850609!2d86.24743263895975!3d26.1809176365153!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39edd801e9b0b37f%3A0x1dc90e7d8f671f48!2sSakatraipur%2C%20Bihar!5e0!3m2!1sen!2sin!4v1748935263179!5m2!1sen!2sin"
                        width="100%"
                        height="450"
                        style={{ border: 0 }}
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    />
                </div>

                <div className="contact-form">
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            name="name"
                            placeholder="Your Name"
                            required
                            autoComplete="off"
                            value={contact.name}
                            onChange={handleInput}
                        />
                        <input
                            type="email"
                            name="email"
                            placeholder="Your Email"
                            required
                            autoComplete="off"
                            value={contact.email}
                            onChange={handleInput}
                        />
                        <input
                            type="tel"
                            name="phone"
                            placeholder="Your Number"
                            maxLength="10"
                            pattern="[0-9]{10}"
                            title="Please enter a 10-digit phone number"
                            required
                            autoComplete="off"
                            value={contact.phone}
                            onChange={handleInput}
                        />
                        <textarea
                            name="message"
                            placeholder="Your Message"
                            rows="5"
                            required
                            value={contact.message}
                            onChange={handleInput}
                        />
                        <hr className="border" />
                        <button type="submit" className="btn button">
                            Send Message
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
}
