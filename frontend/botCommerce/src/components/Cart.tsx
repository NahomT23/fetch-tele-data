import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../app/store";
import { addToCart, removeFromCart, clearCart, decrementQuantity } from "../features/ShopCart/cartSlice";
import { formatPrice } from "../utils/formatPrice";



const Cart: React.FC = () => {
  const dispatch = useDispatch();
  const { items, totalPrice } = useSelector((state: RootState) => state.cart);

  const handleIncrement = (id: number) => {
    const item = items.find((item) => item.id === id);
    if (item) {
      dispatch(addToCart(item));
    }
  };

  const handleDecrement = (id: number) => {
    dispatch(decrementQuantity(id));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <main className="container mx-auto py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Your Cart</h1>
        {items.length === 0 ? (
          <p className="text-center text-gray-600">Your cart is empty.</p>
        ) : (
          <div>
            <div className="grid gap-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="bg-white shadow-md rounded-lg p-4 flex items-center gap-4"
                >
                  <img
                    src={item.imageUrls[0]}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded"
                  />
                  <div className="flex-grow">
                    <h2 className="text-xl font-semibold text-gray-800">
                      {item.name}
                    </h2>
                    <p className="text-blue-500 font-bold">
                      Price: ${formatPrice(Number(item.price))}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      className="bg-gray-200 px-2 py-1 rounded hover:bg-gray-300"
                      onClick={() => handleDecrement(item.id)}
                    >
                      -
                    </button>
                    <span className="text-gray-800 font-bold">{item.quantity}</span>
                    <button
                      className="bg-gray-200 px-2 py-1 rounded hover:bg-gray-300"
                      onClick={() => handleIncrement(item.id)}
                    >
                      +
                    </button>
                  </div>
                  <button
                    className="text-red-500 hover:underline"
                    onClick={() => dispatch(removeFromCart(item.id))}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
            <div className="mt-6">
              <h2 className="text-2xl font-semibold text-gray-800">
                Total Price: ${formatPrice(totalPrice)}
              </h2>
              <div className="mt-4 flex gap-4">
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                  onClick={handleClearCart}
                >
                  Clear Cart
                </button>
                <button
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                >
                  Checkout
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Cart;
