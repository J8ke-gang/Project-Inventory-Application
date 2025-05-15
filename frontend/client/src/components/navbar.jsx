import { Link } from 'react-router-dom';
import '../styles/navbar.css';

const Navbar = () => (
  <nav>
    <Link to="/">Home</Link>
    <Link to="/category/powertools">Power Tools</Link>
    <Link to="/category/handtools">Hand Tools</Link>
    <Link to="/category/toolboxes">Tool Boxes</Link>
    <li><Link to="/contact">Contact Us</Link></li> 
    <Link to="/">About Us</Link>
  </nav>
);

export default Navbar;