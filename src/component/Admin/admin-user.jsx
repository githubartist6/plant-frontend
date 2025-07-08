import "./CSS/admin-user.css"
import { FaEdit, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
const PORT_BASE_URLS = import.meta.env.VITE_PORT_BASE_URL;
const URL = `${PORT_BASE_URLS}/api/admin/users`;
import { useEffect, useState } from "react";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";

export const AdminUser = () => {
    const [users, setUsers] = useState([]);
    const { authorizationToken } = useAuth();

    const getAllUserData = async () => {
        try {
            const response = await fetch(URL, {
                method: "GET",
                headers: {
                    Authorization: authorizationToken,
                },
            });
            const data = await response.json();
            setUsers(data)
        } catch (error) {
            console.log(error);
        }
    };

    // delete user data 
    const deleteUser = async (id) => {
        try {
            const response = await fetch(`${PORT_BASE_URLS}/api/admin/users/delete/${id}`, {
                method: "delete",
                headers: {
                    Authorization: authorizationToken,
                },
            });

            const res_data = await response.json();

            if (response.ok) {
                getAllUserData()
                toast.success(res_data.extraDetails ? res_data.extraDetails : res_data.message);
            };
        }
        catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getAllUserData();
    }, []);

    return (
        <section className="admin-user-section">
            <div className="container">
                <h1 className="heading">Admin User Panel</h1>
            </div>
            <div className="container admin-users">
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((curUser) => {
                            const { id, username, email, phone } = curUser;
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
                                    <td data-label="Edit">
                                        <Link to={`/admin/user/${id}`} className="action-btn edit">
                                            <FaEdit /> Edit
                                        </Link>
                                    </td>
                                    <td data-label="Delete">
                                        <Link className="action-btn delete" onClick={() => deleteUser(id)}>
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
