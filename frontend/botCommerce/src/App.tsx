import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ItemList from "./components/ItemList";
import Navbar from "./components/Navbar";
import Cart from "./components/Cart";
import ItemDetailPage from "./components/ItemDetailPage";

const App: React.FC = () => {
  return (
    <Router>
      <Navbar/>
        <Routes>
            <Route path="/" element={<ItemList/>}/>
            <Route path="/cart" element={<Cart/>}/>
            <Route path="/item/:id" element={<ItemDetailPage/>}/>
           
        </Routes>
    </Router>
  );
};

export default App;
