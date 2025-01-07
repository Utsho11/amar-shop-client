import { useDispatch } from "react-redux";

import { Link } from "react-router-dom";
import {
  CartItem,
  clearCart,
  removeProduct,
  updateQuantity,
} from "../../redux/features/cartSlice";
import { useAppSelector } from "../../hooks/hook";

const CartPage = () => {
  const cartItems = useAppSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  // Handle increasing or decreasing quantity for a product
  const handleIncrease = (product: CartItem) => {
    if (Number(product.inventoryCount) > product.quantity) {
      dispatch(
        updateQuantity({
          productId: product.id,
          quantity: product.quantity + 1,
        })
      );
    }
  };

  const handleDecrease = (product: CartItem) => {
    if (product.quantity > 1) {
      dispatch(
        updateQuantity({
          productId: product.id,
          quantity: product.quantity - 1,
        })
      );
    } else {
      alert("Quantity cannot be less than 1.");
    }
  };

  const handleRemove = (productId: string) => {
    dispatch(removeProduct(productId)); // Remove product from the cart
  };

  const handleChangeQuantity = (productId: string, quantity: number) => {
    if (quantity < 1) {
      alert("Quantity cannot be less than 1.");
      return;
    }
    dispatch(updateQuantity({ productId, quantity }));
  };

  const totalPrice = cartItems.reduce(
    (total, product) => total + parseFloat(product.price) * product.quantity,
    0
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl text-center font-bold mb-6">My Cart</h1>

      {cartItems.length === 0 ? (
        <p className="text-center">Your cart is empty</p>
      ) : (
        <div className=" p-6 rounded-lg">
          {cartItems.map((product) => (
            <div key={product.id}>
              <div className="lg:flex lg:flex-row flex-col justify-between items-center mb-4">
                <div className="flex items-center gap-8">
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-16 h-16 object-cover mr-4 rounded-lg"
                  />
                  <div>
                    <h2 className="font-semibold">{product.name}</h2>
                    <p>{product.description}</p>
                    <p className="font-bold text-xl">${product.price}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => handleDecrease(product)}
                    className="bg-gray-300 text-red-500 font-semibold text-3xl p-1 rounded-md"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    value={product.quantity}
                    min="1"
                    className="w-16 text-center"
                    onChange={(e) =>
                      handleChangeQuantity(product.id, parseInt(e.target.value))
                    }
                  />
                  <button
                    onClick={() => handleIncrease(product)}
                    className="bg-gray-300 text-green-500 font-semibold text-3xl p-1 rounded-md"
                  >
                    +
                  </button>
                  <button
                    onClick={() => handleRemove(product.id)}
                    className="text-red-500 bg-gray-300 ml-4 btn-sm btn"
                  >
                    Remove
                  </button>
                </div>
              </div>
              <div className="divider"></div>
            </div>
          ))}

          <div className="flex justify-between items-center mt-6">
            <h3 className="font-bold text-xl">Total:</h3>
            <p className="text-xl">${totalPrice.toFixed(2)}</p>
          </div>

          <div className="mt-6 flex justify-between items-center">
            <Link to="/checkout" className="btn btn-primary btn-sm">
              Proceed to Checkout
            </Link>
            <button
              onClick={() => dispatch(clearCart())}
              className="btn btn-secondary btn-sm"
            >
              Clear Cart
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
