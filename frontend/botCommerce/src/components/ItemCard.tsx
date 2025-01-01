import React from 'react';
import { Item } from '../types';
import { useDispatch } from 'react-redux';
import { addToCart } from '../features/ShopCart/cartSlice';
import ImageSlider from './ImageSlider';
import { formatPrice } from '../utils/formatPrice';

interface ItemCardProps {
  item: Item;
  currentImageIndex: number;
  onNextImage: () => void;
  onPrevImage: () => void;
}

const ItemCard: React.FC<ItemCardProps> = ({ item, currentImageIndex, onNextImage, onPrevImage }) => {
  


  const dispatch = useDispatch();

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition duration-200">
      <ImageSlider
        images={item.imageUrls}
        currentIndex={currentImageIndex}
        onNext={onNextImage}
        onPrev={onPrevImage}
      />
      <div className="p-4">
        <h2 className="text-xl font-semibold text-gray-800">{item.name}</h2>
        <p className="text-gray-600">{item.description}</p>
        <p className="text-blue-500 font-bold mt-2">Price: ${formatPrice(Number(item.price))}</p>
        <p className="text-sm text-gray-500 mt-2">{item.specs}</p>
      </div>
      <button
        className="bg-gray-200 border border-gray-950 px-4 py-2 ml-2 rounded hover:bg-gray-300"
        onClick={() =>
          dispatch(
            addToCart({
              id: item.id,
              name: item.name,
              price: item.price,
              imageUrls: item.imageUrls,
              quantity: 1,
              description: '',
              specs: ''
            })
          )
        }
      >
        Add To Cart
      </button>
    </div>
  );
};

export default ItemCard;
