import { createContext, useContext, useEffect, useState } from "react";
const PORT_BASE_URLS = import.meta.env.VITE_PORT_BASE_URL;

export const AuthContex = createContext();

export const AuthProvider = ({ children }) => {

    const [token, setToken] = useState(localStorage.getItem("token"));
    const [user, setUser] = useState("");
    const [OrderAddress, setOrderAddress] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [address, setAddress] = useState([]);
    const [multipaldata, setMultipaldata] = useState([]);
    const [plantHero, setPlantHero] = useState([]);
    const [categories, setCategories] = useState([]);
    const [shopcategories, setShopcategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [plantCategories, setPlantCategories] = useState([]);
    const [features, setFeatures] = useState([]);
    // token
    const authorizationToken = `Bearer ${token}`;

    const storeTokenInLS = (serverToken) => {
        setToken(serverToken);
        return localStorage.setItem("token", serverToken);
    };

    let isLoggedIn = !!token;

    // tackling the logout functionality
    const LogoutUser = () => {
        setToken("");
        return localStorage.removeItem("token");
    };

    // get address by ID
    const getAddressById = async (id) => {
        try {
            const response = await fetch(`${PORT_BASE_URLS}/api/admin/address/${id}`, {
                method: "GET",
                headers: {
                    Authorization: authorizationToken,
                },
            });

            if (response.ok) {
                const data = await response.json();
                return data;
            } else {
                console.error(`Failed to fetch address with id ${id}: ${response.status}`);
                return null;
            }
        } catch (error) {
            console.error(`Error fetching address by ID: ${error}`);
            return null;
        }
    };


    // jwt authentication to get currently loggedIN user data
    const userAuthentication = async () => {
        setIsLoading(true);
        try {
            const response = await fetch(`${PORT_BASE_URLS}/api/auth/user`, {
                method: "GET",
                headers: {
                    Authorization: authorizationToken,
                },
            });

            if (response.ok) {
                const data = await response.json();
                setUser(data.userData);
                setIsLoading(false);
            }
        } catch (error) {
            console.error("Error fetching user data");
            setIsLoading(false);
        }
    };


    const getOrderAddress = async () => {
        setIsLoading(true);
        try {
            const response = await fetch(`${PORT_BASE_URLS}/api/order`, {
                method: "GET",
                headers: {
                    Authorization: authorizationToken,
                },
            });
            if (response.ok) {
                const data = await response.json();
                setOrderAddress(data);
            }
        } catch (error) {
            console.error("Error fetching order address:", error);
        } finally {
            setIsLoading(false);
        }
    };


    // jwt authentication to get currently loggedIN user data
    const contactsAuthentication = async () => {
        try {
            const response = await fetch(`${PORT_BASE_URLS}/api/admin/contacts`, {
                method: "GET",
                headers: {
                    Authorization: authorizationToken,
                },
            });

            if (response.ok) {
                const data = await response.json();
                setUser(data.contactsData);
            }
        } catch (error) {
            console.error("Error fetching contacts data")
        }
    };

    // jwt authentication to get currently loggedIN address data
    const addressAuthentication = async () => {
        try {
            const response = await fetch(`${PORT_BASE_URLS}/api/admin/address`, {
                method: "GET",
                headers: {
                    Authorization: authorizationToken,
                },
            });

            if (response.ok) {
                const data = await response.json();
                setAddress(data.addressData);
            } else {
                console.error(`Failed to fetch address: ${response.status}`);
            }
        } catch (error) {
            console.error(`Error fetching Address data: ${error}`);
        }
    };


    // to fetch the multipalData data from the database
    const getmultipalData = async (req, res) => {
        try {
            const response = await fetch(`${PORT_BASE_URLS}/api/data/multipaldata`, {
                method: "GET",
            });

            if (response.ok) {
                const data = await response.json();
                setMultipaldata(data)
            }
        } catch (error) {
            console.log(`multipaldata frontend error: ${error}`);

        }
    };

    // to fetch the planthero data from the database
    const getPlantHero = async (req, res) => {
        try {
            const response = await fetch(`${PORT_BASE_URLS}/api/data/planthero`, {
                method: "GET",
            });

            if (response.ok) {
                const data = await response.json();
                setPlantHero(data.message)
            }
        } catch (error) {
            console.log(`planthero frontend error: ${error}`);

        }
    };

    // to fetch the categories data from the database
    const getCategories = async (req, res) => {
        try {
            const response = await fetch(`${PORT_BASE_URLS}/api/data/categories`, {
                method: "GET",
            });

            if (response.ok) {
                const data = await response.json();
                setCategories(data.message)
            }
        } catch (error) {
            console.log(`services frontend error: ${error}`);

        }
    };

    // to fetch the shopcategories data from the database
    const getShopcategories = async (req, res) => {
        try {
            const response = await fetch(`${PORT_BASE_URLS}/api/data/shopcategories`, {
                method: "GET",
            });

            if (response.ok) {
                const data = await response.json();
                setShopcategories(data.message)
            }
        } catch (error) {
            console.log(`Shopcategories frontend error: ${error}`);

        }
    };

    // to fetch the newProducts data from the database
    const getNewProducts = async (req, res) => {
        try {
            const response = await fetch(`${PORT_BASE_URLS}/api/data/newProducts`, {
                method: "GET",
            });

            if (response.ok) {
                const data = await response.json();
                setProducts(data.message)
            }
        } catch (error) {
            console.log(`newProducts frontend error: ${error}`);

        }
    };

    // to fetch the newProducts data from the database
    const getPlantCategories = async (req, res) => {
        try {
            const response = await fetch(`${PORT_BASE_URLS}/api/data/plantCategories`, {
                method: "GET",
            });

            if (response.ok) {
                const data = await response.json();
                setPlantCategories(data.message)
            }
        } catch (error) {
            console.log(`newProducts frontend error: ${error}`);

        }
    };

    // to fetch the Features data from the database
    const getFeatures = async (req, res) => {
        try {
            const response = await fetch(`${PORT_BASE_URLS}/api/data/features`, {
                method: "GET",
            });

            if (response.ok) {
                const data = await response.json();
                setFeatures(data.message)
            }
        } catch (error) {
            console.log(`features frontend error: ${error}`);

        }
    };


    useEffect(() => {
        getmultipalData();
        getPlantHero();
        getCategories();
        getShopcategories();
        getNewProducts();
        getPlantCategories();
        getFeatures();

        if (token) {
            addressAuthentication();
            userAuthentication();
            getOrderAddress()
        } else {
            setUser("");
        }
    }, [token]);



    return (
        <AuthContex.Provider value={{
            isLoggedIn,
            storeTokenInLS,
            LogoutUser,
            user,
            contactsAuthentication,
            address,
            getAddressById,
            OrderAddress,
            getOrderAddress,
            multipaldata,
            plantHero,
            categories,
            shopcategories,
            products,
            plantCategories,
            features,

            authorizationToken,
            isLoading
        }}>
            {children}
        </AuthContex.Provider>
    )
};

export const useAuth = () => {
    const authContexValue = useContext(AuthContex);

    if (!authContexValue) {
        throw new Error("useAuth used outside of the Provider");
    }

    return authContexValue;
};