import React, { useState } from "react";
import "../CSS/plantCategories.css";
import { FaChevronDown } from "react-icons/fa";
import { useAuth } from "../store/auth";
import Loading from "../Loding/loding";

export const PlantCategories = () => {
    const {
        multipaldata,
        isLoggedIn,
        isLoading
    } = useAuth();

    const plantCategoriesData = multipaldata?.message?.[0]?.plantCategories || [];

    if (isLoading || plantCategoriesData.length === 0) {
        return <h2 className="loading"><Loading /></h2>;
    }

    const [openIndex, setOpenIndex] = useState(null);
    const [selectedOptions, setSelectedOptions] = useState({});

    const handleClick = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    const handleRadioChange = (category, option) => {
        setSelectedOptions((prev) => ({ ...prev, [category]: option }));
    };

    return (
        <section className="category-section">
            <h2 className="heading">🌱 Plant Categories</h2>
            <div className="category-list">
                {plantCategoriesData.map((plant, index) => (
                    <div key={plant._id} className={`category-item ${openIndex === index ? "open" : ""}`}>
                        <div className="category-title" onClick={() => handleClick(index)}>
                            {plant.title}
                            <FaChevronDown />
                        </div>
                        {openIndex === index && (
                            <div className="radio-options">
                                {plant.options.map((opt) => (
                                    <label key={opt.id || opt} className="radio-label">
                                        <input
                                            type="radio"
                                            name={plant.title}
                                            value={String(opt)}
                                            checked={selectedOptions[plant.title] === String(opt)}
                                            onChange={() => handleRadioChange(plant.title, String(opt))}
                                        />
                                        {opt}
                                    </label>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </section>
    );
};
