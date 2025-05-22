import { useNavigate } from "react-router-dom";
import { addToCart } from "../api/api";

export default function CartButton({ tool }) {
  const navigate = useNavigate();

  const handleClick = async () => {
    try {
      await addToCart(tool.id);
      navigate("/cart");
    } catch (err) {
      console.error("Add to cart failed:", err);
    }
  };

  return <button onClick={handleClick}>Add to Cart</button>;
}
