import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ItemList from "./components/ItemList";
import Navbar from "./components/Navbar";
import Cart from "./components/Cart";

const App: React.FC = () => {
  return (
    <Router>
      <Navbar/>
        <Routes>
            <Route path="/" element={<ItemList/>}/>
            <Route path="/cart" element={<Cart/>}/>
        </Routes>
    </Router>
  );
};

export default App;
