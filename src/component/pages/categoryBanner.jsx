import React from "react";
import { Link } from "react-router-dom";
import "../CSS/CategoryBanner.css";
// import categories from "../Api/multipalData.json";
import { useAuth } from "../store/auth";
import Loading from "../Loding/loding";

export const CategoryBanner = () => {

  const {
    multipaldata,
    isLoggedIn,
    isLoading
  } = useAuth();

  const categoriesData = multipaldata?.message?.[0]?.categories || [];

  if (isLoading || categoriesData.length === 0) {
    return <h2 className="loading"><Loading /></h2>;
  }

  return (
    <>
      <section className="category-banner">
        {categoriesData?.map((category) => (
          <div
            className="category-card"
            key={category._id}
            style={{
              backgroundImage: `url(${category.image})`,
            }}
          >
            <div className="text-content">
              <p>{category.subtitle}</p>
              <h2>{category.title}</h2>
              <Link to={isLoggedIn ? `${category.link}` : "/login"} className="btn">
                {category.buttonText}
              </Link>
            </div>
          </div>
        ))}
      </section>
    </>
  );
};
