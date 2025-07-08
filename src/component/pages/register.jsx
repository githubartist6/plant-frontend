import "../CSS/register.css"
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";
const PORT_BASE_URLS = import.meta.env.VITE_PORT_BASE_URL;
const URL = `${PORT_BASE_URLS}/api/auth/register`
import { toast } from 'react-toastify';
import { FaEye, FaEyeSlash } from "react-icons/fa";

export const Register = () => {

    const [showPassword, setShowPassword] = useState(false);
    const togglePasswordVisibility = () => {
        setShowPassword(prev => !prev);
    };

    const [user, setUser] = useState({
        name: "",
        username: "",
        email: "",
        phone: "",
        password: "",
    });

    const navigate = useNavigate();
    const { storeTokenInLS } = useAuth();

    const handleInput = (e) => {
        let name = e.target.name;
        let value = e.target.value;

        setUser({
            ...user,
            [name]: value,
        })
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Back end connected
        try {
            const response = await fetch(URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(user),
            });

            const res_data = await response.json();

            if (response.ok) {
                toast.success("Success! You're now registered.");
                // stored the token in localhost
                storeTokenInLS(res_data.token);
                setUser({
                    name: "",
                    username: "",
                    email: "",
                    phone: "",
                    password: "",
                });
                navigate("/");
            } else {
                toast.error(res_data.extraDetails ? res_data.extraDetails : res_data.message);
                console.log("Invalid credentail");
            };
        } catch (error) {
            console.log("register form", error);
        }
    };

    return (
        <>
            <section>
                <main>
                    <div className="section-registeration">
                        {/* let tackle registration from */}
                        <div className="registration-form">
                            <form
                                onSubmit={handleSubmit}
                            >
                                <h1 className="heading">Registration form</h1>
                                <div className="form-child">
                                    <label htmlFor="name">name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        placeholder="name"
                                        id="name"
                                        className="name"
                                        required
                                        maxLength={45}
                                        autoComplete="off"
                                        value={user.name}
                                        onChange={handleInput}
                                    />
                                </div>

                                <div className="form-child">
                                    <label htmlFor="username">username</label>
                                    <input
                                        type="text"
                                        name="username"
                                        placeholder="username"
                                        id="username"
                                        required
                                        autoComplete="off"
                                        value={user.username}
                                        onChange={handleInput}
                                    />
                                </div>

                                <div className="form-child">
                                    <label htmlFor="email">email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="enter your email"
                                        id="email"
                                        required
                                        autoComplete="off"
                                        value={user.email}
                                        onChange={handleInput}
                                    />
                                </div>
                                <div className="form-child">
                                    <label htmlFor="phone">phone</label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        placeholder="Enter 10-digit phone number"
                                        id="phone"
                                        pattern="[0-9]{10}"
                                        required
                                        maxLength={10}
                                        autoComplete="off"
                                        value={user.phone}
                                        onChange={handleInput}
                                    />

                                </div>
                                <div className="form-child">
                                    <label htmlFor="password">password</label>
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        placeholder="password"
                                        id="password"
                                        className="password"
                                        required
                                        autoComplete="off"
                                        value={user.password}
                                        onChange={handleInput}
                                    />

                                    <span className="password-toggle-icon" onClick={togglePasswordVisibility}>
                                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                                    </span>
                                </div>
                                <br />
                                <button
                                    type="submit"
                                    className="btn btn-submit"
                                >
                                    register Now
                                </button>


                            </form>
                        </div>
                    </div>
                </main>
            </section>
        </>
    )
};