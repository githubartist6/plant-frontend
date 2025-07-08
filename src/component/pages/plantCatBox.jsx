import { ShopCategory } from "./shopCategory";
import "../CSS/plantCatBox.css"
import { PlantCategories } from "./plantCategories";

export const PlantCatBox = () => {
    return (
        <>
            <div className="multipal">
                {/* <div className="left">
                    <PlantCategories />
                </div> */}
                <div className="right">
                    <h1 className="heading">Welcome to the Nursery 🌿</h1>
                    <ShopCategory />
                </div>
            </div>
        </>
    );
};
