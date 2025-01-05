import React from 'react';


interface ImageSliderProps {
  images: string[];
  currentIndex: number;
  onNext: () => void;
  onPrev: () => void;
}
const ImageSlider: React.FC<ImageSliderProps> = ({ images, currentIndex, onNext, onPrev }) => (
  <div className="relative h-48 sm:h-64">
    {images.length > 0 ? (
      <>
        <img
          src={images[currentIndex]}
          alt="Item"
          className="w-full h-full object-cover rounded-md"
        />
        <button
          className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-1 rounded-full hover:bg-gray-600"
          onClick={onPrev}
        >
                      &lt;
        </button>
        <button
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-1 rounded-full hover:bg-gray-600"
          onClick={onNext}
        >
        &gt;
        </button>
      </>
    ) : (
      <div className="flex items-center justify-center h-full bg-gray-200">
        <span className="text-gray-500">No Image</span>
      </div>
    )}
  </div>
);



export default ImageSlider;
