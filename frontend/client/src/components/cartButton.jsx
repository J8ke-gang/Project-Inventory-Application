import { addToCart } from '../api/api';

export default function CartButton({ tool }) {
  return (
    <button onClick={() => addToCart(tool.id)}>
      Add to Cart
    </button>
  );
}
