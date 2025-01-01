import React, { useEffect, useState } from "react";
import axios from "axios";

interface Item {
  id: number;
  name: string;
  description: string;
  price: string;
  specs: string;
  imageUrls: string[];
}

const ItemList: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [currentImageIndex, setCurrentImageIndex] = useState<Record<number, number>>({});

  useEffect(() => {
    const fetchItems = async () => {
      try {
        // const response = await axios.get("http://localhost:5000/api/items");
        const response = await axios.get("https://fetch-tele-data.vercel.app/api/items");
        
        setItems(response.data);

        // Initialize image indexes for all items
        const initialIndexes = response.data.reduce((acc: Record<number, number>, item: Item) => {
          acc[item.id] = 0;
          return acc;
        }, {}); 
        setCurrentImageIndex(initialIndexes);
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    };

    fetchItems();
  }, []);

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

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <main className="container mx-auto py-8">
        {items.length === 0 ? (
          <p className="text-center text-gray-700">No items available.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((item) => (
              <div
                key={item.id}
                className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition duration-200"
              >
                <div className="relative h-64">
                  {item.imageUrls.length > 0 ? (
                    <>
                      <img
                        src={item.imageUrls[currentImageIndex[item.id]]}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                      <button
                        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-1 rounded-full hover:bg-gray-600"
                        onClick={() => handlePrevImage(item.id, item.imageUrls.length)}
                      >
                        ◀
                      </button>
                      <button
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-1 rounded-full hover:bg-gray-600"
                        onClick={() => handleNextImage(item.id, item.imageUrls.length)}
                      >
                        ▶
                      </button>
                    </>
                  ) : (
                    <div className="flex items-center justify-center h-full bg-gray-200">
                      <span className="text-gray-500">No Image</span>
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h2 className="text-xl font-semibold text-gray-800">{item.name}</h2>
                  <p className="text-gray-600">{item.description}</p>
                  <p className="text-blue-500 font-bold mt-2">Price: {item.price}</p>
                  <p className="text-sm text-gray-500 mt-2">{item.specs}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default ItemList;
