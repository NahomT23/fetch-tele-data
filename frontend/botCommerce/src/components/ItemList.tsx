import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchItems } from "../features/ShopCart/itemSlice";
import { AppDispatch, RootState } from "../app/store";
import ItemCard from "./ItemCard";
import { Item } from "../types";
import SearchAndFilter from "./SearchAndFilter";
import ScrollToTopButton from "./ScrollToTopButton";

const ItemList: React.FC = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState<Record<number, number>>({});
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("");
  const [minPrice, setMinPrice] = useState<string>("");
  const [maxPrice, setMaxPrice] = useState<string>("");
  const [showSortOptions, setShowSortOptions] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();

  const { items, status } = useSelector((state: RootState) => state.items);

  useEffect(() => {
    if (status === "idle") {
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

  const filteredItems = items
    .filter((item) => {
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesMinPrice = minPrice ? item.price >= parseFloat(minPrice) : true;
      const matchesMaxPrice = maxPrice ? item.price <= parseFloat(maxPrice) : true;
      return matchesSearch && matchesMinPrice && matchesMaxPrice;
    })
    .sort((a, b) => {
      if (sortOrder === "asc") {
        return a.price - b.price;
      } else if (sortOrder === "desc") {
        return b.price - a.price;
      }
      return 0;
    });

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="flex justify-center text-center">
        <p className="w-full whitespace-nowrap overflow-hidden animate-typing font-baskervville text-3xl text-red-950 my-2">
          KALIT WATCH STORE
        </p>
      </div>

      <main className="container mx-auto py-8">
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

        {status === "loading" ? (
          <p className="text-center text-2xl text-red-960">Loading items...</p>
        ) : filteredItems.length === 0 ? (
          <p className="text-center text-gray-700">No items available.</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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

      <ScrollToTopButton />
    </div>
  );
};

export default ItemList;
