import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchItems } from '../features/ShopCart/itemSlice';
import { AppDispatch, RootState } from '../app/store';
import ItemCard from './ItemCard';
import { Item } from '../types';
import SearchAndFilter from './SearchAndFilter'; 

const ItemList: React.FC = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState<Record<number, number>>({});
  const [searchQuery, setSearchQuery] = useState<string>(''); // State for search query
  const [sortOrder, setSortOrder] = useState<string>(''); // State for sorting
  const [minPrice, setMinPrice] = useState<string>(''); // State for minimum price
  const [maxPrice, setMaxPrice] = useState<string>(''); // State for maximum price
  const [showSortOptions, setShowSortOptions] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();

  const { items, status } = useSelector((state: RootState) => state.items);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchItems());
    }
  }, [status]);

  useEffect(() => {
    if (items.length > 0) {
      const initialIndexes = items.reduce((acc: Record<number, number>, item: Item) => {
        acc[item.id] = 0;
        return acc;
      }, {});
      setCurrentImageIndex(initialIndexes);
    }
  }, [items]);

  const handleNextImage = (id: number, totalImages: number) => {
    setCurrentImageIndex((prev) => ({
      ...prev,
      [id]: (prev[id] + 1) % totalImages,
    }));
  };

  const handlePrevImage = (id: number, totalImages: number) => {
    setCurrentImageIndex((prev) => ({
      ...prev,
      [id]: prev[id] === 0 ? totalImages - 1 : prev[id] - 1,
    }));
  };

  // Filter and sort logic
  const filteredItems = items
    .filter((item) => {
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesMinPrice = minPrice ? item.price >= parseFloat(minPrice) : true;
      const matchesMaxPrice = maxPrice ? item.price <= parseFloat(maxPrice) : true;
      return matchesSearch && matchesMinPrice && matchesMaxPrice;
    })
    .sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.price - b.price;
      } else if (sortOrder === 'desc') {
        return b.price - a.price;
      }
      return 0;
    });

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <main className="container mx-auto py-8">
        {/* Search and Filter Component */}
        <SearchAndFilter
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          sortOrder={sortOrder}
          setSortOrder={setSortOrder}
          minPrice={minPrice}
          setMinPrice={setMinPrice}
          maxPrice={maxPrice}
          setMaxPrice={setMaxPrice}
          showSortOptions={showSortOptions}
          setShowSortOptions={setShowSortOptions}
        />

        {status === 'loading' ? (
          <p className="text-center text-gray-700">Loading items...</p>
        ) : filteredItems.length === 0 ? (
          <p className="text-center text-gray-700">No items available.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-center">
            {/* Center the content of grid */}
            {filteredItems.map((item) => (
              <ItemCard
                key={item.id}
                item={item}
                currentImageIndex={currentImageIndex[item.id]}
                onNextImage={() => handleNextImage(item.id, item.imageUrls.length)}
                onPrevImage={() => handlePrevImage(item.id, item.imageUrls.length)}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default ItemList;
