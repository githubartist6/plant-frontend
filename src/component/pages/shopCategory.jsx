import React from "react";
import '../CSS/shopCategory.css';
import { useAuth } from "../store/auth";
import { Link } from "react-router-dom";
import Loading from "../Loding/loding";
// import shopcategories from "../Api/multipalData.json";


export const ShopCategory = () => {

    const {
        multipaldata,
        isLoggedIn,
        isLoading
    } = useAuth();
    const shopcategoriesData = multipaldata?.message?.[0]?.shopCategory || [];

    if (isLoading || shopcategoriesData.length === 0) {
    return <h2 className="loading"><Loading /></h2>;
  }

    return (
        <>
            <section className="shop-category-section">
                <h2 className="heading">Shop By Category</h2>
                <div className="shop-category-grid">
                    {shopcategoriesData.map((card) => (
                        <div key={card._id}
                            style={{
                                backgroundImage: `url(${card.image})`,
                            }}
                            className="shop-category-card">
                            <div className="shop-titelBox">
                                <h3>{card.title}</h3>
                                <Link to={isLoggedIn ? `${card.link}` : "/login"} className="shop-category btn">
                                    Shop Now
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </>
    );
};
