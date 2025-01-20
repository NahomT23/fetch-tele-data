// import React from 'react';
// import { Link } from 'react-router-dom';
// import { Item } from '../types';
// import ImageSlider from './ImageSlider';
// import { formatPrice } from '../utils/formatPrice';
// import { useSelector, useDispatch } from "react-redux";
// import { RootState } from "../app/store";
// import { addToCart, decrementQuantity } from "../features/ShopCart/cartSlice";


// interface ItemCardProps {
//   item: Item;
//   currentImageIndex: number;
//   onNextImage: () => void;
//   onPrevImage: () => void;
// }

// const ItemCard: React.FC<ItemCardProps> = ({ item, currentImageIndex, onNextImage, onPrevImage }) => {
//   const dispatch = useDispatch();
//   const { items } = useSelector((state: RootState) => state.cart);

//   // Get the item's quantity from the cart
//   const cartItem = items.find((cartItem) => cartItem.id === item.id);
//   const quantity = cartItem ? cartItem.quantity : 0;

  // const handleAddToCart = () => {
  //   dispatch(
  //     addToCart({
  //       id: item.id,
  //       name: item.name,
  //       price: item.price,
  //       imageUrls: item.imageUrls,
  //       quantity: 1,
  //       description: item.description,
  //       specs: item.specs,
  //     })
  //   );
  // };

//   const handleIncreaseQuantity = () => {
//     if (cartItem) {
//       dispatch(addToCart(cartItem));
//     }
//   };

//   const handleDecreaseQuantity = () => {
//     if (quantity > 0) {
//       dispatch(decrementQuantity(item.id));
//     }
//   };


//   return (
//     <div className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition duration-200">
//       <ImageSlider
//         images={item.imageUrls}
//         currentIndex={currentImageIndex}
//         onNext={onNextImage}
//         onPrev={onPrevImage}
//       />



//       <Link to={`/item/${item.id}`}>
//         <div className="p-4">
//           <h2 className="text-xl font-bold text-red-950">{item.name.length > 14 ? item.name.slice(0, 14) : item.name}</h2>
//           <p className="text-gray-950">{item.description.length > 15 ?  `${item.description.slice(0, 15)}`  :  item.description}</p>
//           <p className="text-gray-900 font-bold mt-1">Price: ${formatPrice(Number(item.price))}</p>
          
//         </div>
//       </Link>

//       <div className="flex flex-col items-center mt-1">
//         {quantity > 0 ? (
//           <div className="flex items-center space-x-2 mb-2">
//             <button
//               onClick={handleDecreaseQuantity}
//               className="w-8 h-8 border-2 border-red-950 rounded-full text-xl hover:bg-red-900 hover:text-white transition-all duration-200 flex items-center justify-center"
//             >
//               -
//             </button>
//             <span>{quantity}</span>
//             <button
//               onClick={handleIncreaseQuantity}
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
//     </div>
//   );
// };

// export default ItemCard;
import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../app/store';
import { addToCart, decrementQuantity } from '../features/ShopCart/cartSlice';
import ImageSlider from './ImageSlider';
import { formatPrice } from '../utils/formatPrice';

interface Item {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrls: string[];
  specs: string;
}

interface ItemCardProps {
  item: Item;
  currentImageIndex: number;
  onNextImage: () => void;
  onPrevImage: () => void;
}

const ItemCard: React.FC<ItemCardProps> = ({ item, currentImageIndex, onNextImage, onPrevImage }) => {
  const dispatch = useDispatch();
  const { items } = useSelector((state: RootState) => state.cart);

  // Get the item's quantity from the cart
  const cartItem = items.find((cartItem) => cartItem.id === item.id);
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

  const handleIncreaseQuantity = () => {
    if (cartItem) {
      dispatch(addToCart(cartItem));
    }
  };

  const handleDecreaseQuantity = () => {
    if (quantity > 0) {
      dispatch(decrementQuantity(item.id));
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition duration-200">
      <ImageSlider
        images={item.imageUrls.map((base64Image) => `data:image/jpeg;base64,${base64Image}`)}
        currentIndex={currentImageIndex}
        onNext={onNextImage}
        onPrev={onPrevImage}
      />

      <Link to={`/item/${item.id}`}>
        <div className="p-4">
          <h2 className="text-xl font-bold text-red-950">
            {item.name.length > 14 ? item.name.slice(0, 14) : item.name}
          </h2>
          <p className="text-gray-950">
            {item.description.length > 15 ? `${item.description.slice(0, 15)}...` : item.description}
          </p>
          <p className="text-gray-900 font-bold mt-1">Price: ${formatPrice(Number(item.price))}</p>
        </div>
      </Link>

      <div className="flex flex-col items-center mt-1">
        {quantity > 0 ? (
          <div className="flex items-center space-x-2 mb-2">
            <button
              onClick={handleDecreaseQuantity}
              className="w-8 h-8 border-2 border-red-950 rounded-full text-xl hover:bg-red-900 hover:text-white transition-all duration-200 flex items-center justify-center"
            >
              -
            </button>
            <span>{quantity}</span>
            <button
              onClick={handleIncreaseQuantity}
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
  );
};

export default ItemCard;
