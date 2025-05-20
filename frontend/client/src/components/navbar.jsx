import { Link, NavLink } from "react-router-dom";
import "../styles/navbar.css";

const Navbar = () => (
  <nav className="navbar">
    <ul className="nav-links">
      <li><Link to="/">Home</Link></li>
      <li><Link to="/category/powertools">Power Tools</Link></li>
      <li><Link to="/category/handtools">Hand Tools</Link></li>
      <li><Link to="/category/toolboxes">Tool Boxes</Link></li>
      <li><Link to="/contact">Contact Us</Link></li>
      <li><Link to="/about">About Us</Link></li>
      <li><NavLink to="/cart">Cart</NavLink></li>
    </ul>
  </nav>
);

export default Navbar;

