// import "./user.css"
import { FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
const PORT_BASE_URLS = import.meta.env.VITE_PORT_BASE_URL;
const URL = `${PORT_BASE_URLS}/api/admin/contacts`;
import { useEffect, useState } from "react";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";

export const AdmnContacts = () => {
    const [contacts, setContacts] = useState([]);
    const { authorizationToken } = useAuth();

    const getAllContactData = async () => {
        try {
            const response = await fetch(URL, {
                method: "GET",
                headers: {
                    Authorization: authorizationToken,
                },
            });
            const data = await response.json();
            setContacts(data)
        } catch (error) {
            console.log(error);
        }
    };

    // delete user data 
    const deleteContact = async (id) => {
        try {
            const response = await fetch(`${PORT_BASE_URLS}/api/admin/contacts/delete/${id}`, {
                method: "delete",
                headers: {
                    Authorization: authorizationToken,
                },
            });

            const res_data = await response.json();

            if (response.ok) {
                getAllContactData()
                toast.success(res_data.extraDetails ? res_data.extraDetails : res_data.message);
            };
        }
        catch (error) {
            console.log(error);
        }
    };


    useEffect(() => {
        getAllContactData();
    }, []);

    return (
        <section className="admin-user-section">
            <div className="container">
                <h1 className="heading">Admin Contacts Panel</h1>
            </div>
            <div className="container admin-users">
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Message</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {contacts.map((curContacts,) => {
                            const { id, phone, username, email, message } = curContacts;
                            return (
                                <tr key={id}>
                                    <td
                                        data-label="Name">
                                        {username}

                                    </td>
                                    <td
                                        data-label="Email">
                                        {email}

                                    </td>
                                    <td
                                        data-label="Phone">
                                        {phone}

                                    </td>
                                    <td
                                        data-label="Message">
                                        {message}

                                    </td>
                                    <td data-label="Delete">
                                        <Link className="action-btn delete" onClick={() => deleteContact(id)}>
                                            <FaTrash /> Delete
                                        </Link>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </section>
    );
};
