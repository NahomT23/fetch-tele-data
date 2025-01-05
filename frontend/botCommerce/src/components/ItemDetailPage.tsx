// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import { formatPrice } from '../utils/formatPrice';
// import { Item } from '../types';
// import { useSelector, useDispatch } from 'react-redux';
// import { RootState } from '../app/store';
// import { addToCart, decrementQuantity } from '../features/ShopCart/cartSlice';
// import LoadingPage from './LoadingPage';


// const ItemDetailPage: React.FC = () => {
//   const { id } = useParams<{ id: string }>();
//   const [item, setItem] = useState<Item | null>(null);
//   const { items } = useSelector((state: RootState) => state.items); 
//   const [currentIndex, setCurrentIndex] = useState(0); // For image slider
//   const dispatch = useDispatch();

//   useEffect(() => {
//     if (id) {
//       const foundItem = items.find((item) => String(item.id) === String(id));

//       setItem(foundItem || null)
//     }
//   }, [id, items]);

//   if (!item) {
//     return <p>Item not found</p>;
//   }

//   const cartItem = items.find((cartItem) => cartItem.id === item?.id);
//   const quantity = cartItem ? cartItem.quantity : 0;


// const handleAddToCart = () => {
//       dispatch(
//         addToCart({
//           id: item!.id,
//           name: item!.name,
//           price: item!.price,
//           imageUrls: item!.imageUrls,
//           quantity: 1,
//           description: item!.description,
//           specs: item!.specs,
//         })
//       );
//     };
  

//   const handleIncrement = () => {
//     dispatch(addToCart(item)); // This will trigger the increment logic
//   };
  
//   const handleDecrement = () => {
//     dispatch(decrementQuantity(item.id)); // This will decrement the quantity
//   };
  
//   const handleNext = () => {
//     if (item) {
//       setCurrentIndex((prevIndex) => (prevIndex + 1) % item.imageUrls.length);
//     }
//   };

//   const handlePrev = () => {
//     if (item) {
//       setCurrentIndex(
//         (prevIndex) => (prevIndex - 1 + item.imageUrls.length) % item.imageUrls.length
//       );
//     }
//   };

//   const handleThumbnailClick = (index: number) => setCurrentIndex(index);


//   return (
//       <div className="container mx-auto p-4">
//         <div className="flex flex-col md:flex-row justify-center gap-8">
//           {/* Image Slider */}
//           <div className="flex-1">
//             <div className="relative">
//               <img
//                 src={item.imageUrls[currentIndex]}
//                 alt={`Image ${currentIndex + 1}`}
//                 className="max-w-md h-auto object-cover rounded-lg mx-auto"
//                 style={{height: '300px', width: '400px'}}
//               />
//               <button
//                 className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-gray-200 rounded-full p-2 hover:bg-gray-300"
//                 onClick={handlePrev}
//               >
//                 &lt;
//               </button>
//               <button
//                 className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-gray-200 rounded-full p-2 hover:bg-gray-300"
//                 onClick={handleNext}
//               >
//                 &gt;
//               </button>
//             </div>
//             {item.imageUrls.length > 1 && (
//               <div className="flex justify-center mt-4 gap-2">
//                 {item.imageUrls.map((src, index) => (
//                   <img
//                   key={item.name}
//                     src={src}
//                     alt={`Thumbnail ${index + 1}`}
//                     className={`w-16 h-16 object-cover border-2 cursor-pointer rounded ${
//                       currentIndex === index ? 'border-blue-500' : 'border-gray-200'
//                     }`}
//                     onClick={() => handleThumbnailClick(index)}
//                   />
//                 ))}
//               </div>
//             )}
  
  
//           </div>
  
//           {/* Item Details */}
//           <div className="flex-1 bg-white shadow-lg rounded-lg p-4">
//             <h2 className="text-2xl font-semibold text-gray-800">{item.name}</h2>
//             <p className="text-gray-600 mt-2">{item.description}</p>
//             <p className="text-blue-500 font-bold mt-2">Price: ${formatPrice(item.price)}</p>
//             <p className="text-sm text-gray-500 mt-2">{item.specs}</p>
//             <p className=''>ITEM ID: {item.id}</p>
  
//                   <div className="flex flex-col items-center mt-4">
//         {quantity > 0 ? (
//           <div className="flex items-center space-x-2 mb-2">
//             <button
//               onClick={handleDecrement}
//               className="w-8 h-8 border-2 border-red-950 rounded-full text-xl hover:bg-red-900 hover:text-white transition-all duration-200 flex items-center justify-center"
//             >
//               -
//             </button>
//             <span>{quantity}</span>
//             <button
//               onClick={handleIncrement}
//               className="w-8 h-8 border-2 border-red-950 rounded-full text-xl hover:bg-red-900 hover:text-white transition-all duration-200 flex items-center justify-center"
//             >
//               +
//             </button>
//           </div>
//         ) : (
//           <button
//             onClick={handleAddToCart}
//             className="w-32 h-10 border-2 border-red-950 rounded-lg hover:bg-red-900 hover:text-white transition-all duration-300 flex items-center justify-center mb-2"
//           >
//             Add To Cart
//           </button>
//         )}
//       </div>
//           </div>
//         </div>
//       </div>
//   );
// };

// export default ItemDetailPage;
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { formatPrice } from '../utils/formatPrice';
import { Item } from '../types';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../app/store';
import { addToCart, decrementQuantity } from '../features/ShopCart/cartSlice';

const ItemDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [item, setItem] = useState<Item | null>(null);
  const { items: itemList } = useSelector((state: RootState) => state.items);
  const { items: cartItems } = useSelector((state: RootState) => state.cart); // Access the cart state
  const [currentIndex, setCurrentIndex] = useState(0); // For image slider
  const dispatch = useDispatch();

  useEffect(() => {
    if (id) {
      const foundItem = itemList.find((item) => String(item.id) === String(id));
      setItem(foundItem || null);
    }
  }, [id, itemList]);

  if (!item) {
    return <p>Item not found</p>;
  }

  const cartItem = cartItems.find((cartItem) => cartItem.id === item.id);
  const quantity = cartItem ? cartItem.quantity : 0;

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        id: item.id,
        name: item.name,
        price: item.price,
        imageUrls: item.imageUrls,
        quantity: 1,
        description: item.description,
        specs: item.specs,
      })
    );
  };

  const handleIncrement = () => {
    dispatch(addToCart(cartItem || { ...item, quantity: 1 }));
  };

  const handleDecrement = () => {
    dispatch(decrementQuantity(item.id));
  };

  const handleNext = () => {
    if (item) {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % item.imageUrls.length);
    }
  };

  const handlePrev = () => {
    if (item) {
      setCurrentIndex(
        (prevIndex) => (prevIndex - 1 + item.imageUrls.length) % item.imageUrls.length
      );
    }
  };

  const handleThumbnailClick = (index: number) => setCurrentIndex(index);

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col md:flex-row justify-center gap-8">
        {/* Image Slider */}
        <div className="flex-1">
          <div className="relative">
            <img
              src={item.imageUrls[currentIndex]}
              alt={`Image ${currentIndex + 1}`}
              className="max-w-md h-auto object-cover rounded-lg mx-auto"
              style={{ height: '300px', width: '400px' }}
            />
            <button
              className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-gray-200 rounded-full p-2 hover:bg-gray-300"
              onClick={handlePrev}
            >
              &lt;
            </button>
            <button
              className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-gray-200 rounded-full p-2 hover:bg-gray-300"
              onClick={handleNext}
            >
              &gt;
            </button>
          </div>
          {item.imageUrls.length > 1 && (
            <div className="flex justify-center mt-4 gap-2">
              {item.imageUrls.map((src, index) => (
                <img
                  key={src}
                  src={src}
                  alt={`Thumbnail ${index + 1}`}
                  className={`w-16 h-16 object-cover border-2 cursor-pointer rounded ${
                    currentIndex === index ? 'border-blue-500' : 'border-gray-200'
                  }`}
                  onClick={() => handleThumbnailClick(index)}
                />
              ))}
            </div>
          )}
        </div>

        {/* Item Details */}
        <div className="flex-1 bg-white shadow-lg rounded-lg p-4">
          <h2 className="text-2xl font-semibold text-gray-800">{item.name}</h2>
          <p className="text-gray-600 mt-2">{item.description}</p>
          <p className="text-blue-500 font-bold mt-2">Price: ${formatPrice(item.price)}</p>
          <p className="text-sm text-gray-500 mt-2">{item.specs}</p>
          <p className="">ITEM ID: {item.id}</p>

          <div className="flex flex-col items-center mt-4">
            {quantity > 0 ? (
              <div className="flex items-center space-x-2 mb-2">
                <button
                  onClick={handleDecrement}
                  className="w-8 h-8 border-2 border-red-950 rounded-full text-xl hover:bg-red-900 hover:text-white transition-all duration-200 flex items-center justify-center"
                >
                  -
                </button>
                <span>{quantity}</span>
                <button
                  onClick={handleIncrement}
                  className="w-8 h-8 border-2 border-red-950 rounded-full text-xl hover:bg-red-900 hover:text-white transition-all duration-200 flex items-center justify-center"
                >
                  +
                </button>
              </div>
            ) : (
              <button
                onClick={handleAddToCart}
                className="w-32 h-10 border-2 border-red-950 rounded-lg hover:bg-red-900 hover:text-white transition-all duration-300 flex items-center justify-center mb-2"
              >
                Add To Cart
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemDetailPage;
