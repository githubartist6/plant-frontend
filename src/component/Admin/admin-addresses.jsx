import "./CSS/admin-addresses.css"
import { FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
const PORT_BASE_URLS = import.meta.env.VITE_PORT_BASE_URL;
const URL = `${PORT_BASE_URLS}/api/admin/address`;
import { useEffect, useState } from "react";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";

export const AdmnAddress = () => {
    const [address, setAddress] = useState([]);
    const { authorizationToken } = useAuth();

    const getAllAddressData = async () => {
        try {
            const response = await fetch(URL, {
                method: "GET",
                headers: {
                    Authorization: authorizationToken,
                },
            });
            const data = await response.json();
            setAddress(data)
        } catch (error) {
            console.log(error);
        }
    };

    // delete user data 
    const deleteAddress = async (id) => {
        try {
            const response = await fetch(`${PORT_BASE_URLS}/api/admin/address/delete/${id}`, {
                method: "delete",
                headers: {
                    Authorization: authorizationToken,
                },
            });

            const res_data = await response.json();

            if (response.ok) {
                getAllAddressData()
                toast.success(res_data.extraDetails ? res_data.extraDetails : res_data.message);
            };
        }
        catch (error) {
            console.log(error);
        }
    };


    useEffect(() => {
        getAllAddressData();
    }, []);

    return (
        <section className="admin-user-section admin-addresses">
            <div className="container">
                <h1 className="heading">Admin address Panel</h1>
            </div>
            <div className="container admin-users">
                <table>
                    <thead>
                        <tr>
                            <th>Username</th>
                            <th>Name</th>
                            <th>Phone</th>
                            <th>Phone Optional</th>
                            <th>Pincode</th>
                            <th>Locality</th>
                            <th>Address</th>
                            <th>City/District/Town</th>
                            <th>State</th>
                            <th>Landmark</th>
                            <th>Address Type</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody className="admin-addresses-tbody">
                        {address.map((curAddress) => {
                            const {
                                id,
                                username,
                                name,
                                phone,
                                phoneoptional,
                                pincode,
                                locality,
                                address,
                                CityDistrictTown,
                                state,
                                landmarkoptional,
                                addressestype
                            } = curAddress;

                            return (
                                <tr key={id}>
                                    <td data-label="Username">{username}</td>
                                    <td data-label="Name">{name}</td>
                                    <td data-label="Phone">{phone}</td>
                                    <td data-label="Phone Optional">{phoneoptional}</td>
                                    <td data-label="Pincode">{pincode}</td>
                                    <td data-label="Locality">{locality}</td>
                                    <td data-label="Address">{address}</td>
                                    <td data-label="City/District/Town">{CityDistrictTown}</td>
                                    <td data-label="State">{state}</td>
                                    <td data-label="Landmark">{landmarkoptional}</td>
                                    <td data-label="Address Type">{addressestype}</td>
                                    <td data-label="Delete">
                                        <Link className="action-btn delete" onClick={() => deleteAddress(id)}>
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
