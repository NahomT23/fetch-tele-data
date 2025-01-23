import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../app/store";
import { addToCart, removeFromCart, clearCart, decrementQuantity } from "../features/ShopCart/cartSlice";
import { formatPrice } from "../utils/formatPrice";
import { Link } from "react-router-dom";

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


  const handleCheckout = async () => {
    try {

      const response = await fetch('https://fetch-tele-data.vercel.app/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items: items.map((item) => ({
            id: item.id,
            name: item.name,
            price: parseFloat(item.price.toString().replace(/,/g, '')),
            quantity: item.quantity,
          })),
        }),
      });
      
      const data = await response.json();
      if (data.url) {
        window.location.href = data.url; 
      } else {
        console.error('Failed to create checkout session:', data);
      }
    } catch (error) {
      console.error('Error during checkout:', error);
    }
  };
  

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <main className="container mx-auto py-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 text-center">
          Your Cart
        </h1>
        {items.length === 0 ? (
          <p className="text-center text-gray-600">Your cart is empty.</p>
        ) : (
          <div>
            <div className="grid gap-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="bg-white shadow-md rounded-lg p-4 flex flex-col md:flex-row items-center gap-4"
                >
                  <Link to={`/item/${item.id}`}>
                  {/* Image */}
                  <img
                    src={item.imageUrls[0]}
                    alt={item.name}
                    className="w-20 h-20 md:w-24 md:h-24 object-cover rounded"
                  />
                                    </Link>
                  {/* Item Details */}
                  <div className="flex-grow text-center md:text-left">
                    <h2 className="text-lg md:text-xl font-semibold text-red-950 truncate">
                      {item.name}
                    </h2>
                    <p className="text-gray-900 font-bold">
                      Price: ${formatPrice(Number(item.price))}
                    </p>

                  </div>
                  {/* Quantity Controls */}
                  <div className="flex items-center justify-center md:justify-start gap-2">
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
                  {/* Remove Button */}
                  <button
                    className="text-red-500 hover:underline text-sm md:text-base"
                    onClick={() => dispatch(removeFromCart(item.id))}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
            
            {/* Total Price and Actions */}

            <div className="mt-6">
              <h2 className="text-lg md:text-2xl font-semibold text-gray-950 text-center">
                Total Price: ${formatPrice(totalPrice)}
              </h2>
              <div className="mt-4 flex flex-col md:flex-row justify-center gap-4">
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 text-sm md:text-base"
                  onClick={handleClearCart}
                >
                  Clear Cart
                </button>
                <button
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 text-sm md:text-base"
                  onClick={handleCheckout}
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
