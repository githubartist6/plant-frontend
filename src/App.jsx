import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

// Toast
import { ToastContainer, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Navbar (your plant navbar)
import { NavBarPlant } from "./component/Layout/NavBarPlant";
import { Error } from "./component/Layout/Error"
import Footer from "./component/Layout/Footer";

// Pages
import { Home } from "./component/pages/home";
import { CategoryBanner } from "./component/pages/categoryBanner";
import { ShopCategory } from "./component/pages/shopCategory";
import { NewProducts } from "./component/pages/newProducts";
import { FeaturesDate } from "./component/pages/featuresDate";
import Contact from "./component/pages/contact";
import { PlantCatBox } from "./component/pages/plantCatBox";
import { PlantCart } from "./component/pages/plantCart";
// import { PlantSavedProducts } from "./component/pages/plantSavedProducts";
import { PlantProfile } from "./component/pages/plantProfile";
import { OrderAddresses } from "./component/pages/plant-OrderAddresses";
import ProductList from "./component/pages/plant-productList";
import { Register } from "./component/pages/register";
import { Login } from "./component/pages/login";
import { Logout } from "./component/pages/logout";
import PaymentMethod from "./component/PaymentMethod/paymentMethod";


// Admin Panel
import AddPlantForm from "./component/Admin/AddPlantForm";
import AdminDashboard from "./component/Admin/adminDashboard";
import { AdminNavbar } from "./component/Layout/Admin-layout";
import { useEffect } from "react";
import { AdminUser } from "./component/Admin/admin-user";
import { AdminUserUpdate } from "./component/Admin/admin-user-update";
import { AdmnContacts } from "./component/Admin/admin-contacts";
import { AdmnAddress } from "./component/Admin/admin-addresses";
import { AdminService } from "./component/Admin/admin-service";
// import { AdminService } from "./pages/Admin/Admin-service";
// import { Adminupdate } from "./pages/Admin/Admin-Update";
// import { AddServiceForm } from "./pages/Admin/service-newdat-add";

const App = () => {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <BrowserRouter>
        {/* Your custom navbar for the plant website */}
        <NavBarPlant />

        <Routes>
          <Route path="/" element={
            <>
              <Home />
              <CategoryBanner />
              <ShopCategory />
              <NewProducts />
              <FeaturesDate />
              <Contact />
            </>
          } />
          <Route path="/category" element={<PlantCatBox />} />
          <Route path="/product" element={<ShopCategory />} />
          <Route path="/deal" element={<ShopCategory />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/cart" element={<PlantCart />} />
          {/* <Route path="/save" element={<PlantSavedProducts />} /> */}
          <Route path="/profile" element={<PlantProfile />} />

          {/* <Route path="/address" element={<OrderAddresses />} /> */}
          <Route path="/address/:id" element={<OrderAddresses />} />
          <Route path="/productList" element={<ProductList />} />

          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="*" element={<Error />} />

          {/* PaymentMethod */}
          <Route path="/payment" element={<PaymentMethod />} />

          {/* Admin Panel */}
          <Route path="add" element={<AddPlantForm />} />
          <Route path="adminDashboard" element={<AdminDashboard />} />
          <Route path="/admin" element={<AdminNavbar />} >
            <Route path="user" element={<AdminUser />} />
            <Route path="user/:id" element={<AdminUserUpdate />} />
            <Route path="contact" element={<AdmnContacts />} />
            <Route path="address" element={<AdmnAddress />} />
            <Route path="service" element={<AdminService />} />
            {/*
            <Route path="newdata" element={<AddServiceForm />} />
            */}
          </Route>
        </Routes>

        <Footer />

        {/* ✅ Toast container (only once in the app) */}
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
          transition={Bounce}
        />
      </BrowserRouter>
    </>
  );
};

export default App;
