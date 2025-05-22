import { Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar";
import HomePage from "./components/homePage";
import ContactUs from "./components/contactUs";
import ToolsPage from "./components/toolsPage";
import AboutUs from "./components/aboutUs";
import CartPage from './components/cartPage';


const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/tools" element={<ToolsPage />} />
        <Route path="/category/:categoryName" element={<ToolsPage />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/cart" element={<CartPage />} /> 

      </Routes>
    </>
  );
};

export default App;
