import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ItemList from "./components/ItemList";
import Navbar from "./components/Navbar";
import Cart from "./components/Cart";
import ItemDetailPage from "./components/ItemDetailPage";
import About from "./pages/About";
import Footer from "./components/Footer"

const App: React.FC = () => {
  return (
    <Router>
      <Navbar/>
        <Routes>
            <Route path="/" element={<ItemList/>}/>
            <Route path="/cart" element={<Cart/>}/>
            <Route path="/item/:id" element={<ItemDetailPage/>}/>
            <Route path="/about" element={<About/>}/>
        </Routes>
        <Footer/>
    </Router>
  );
};

export default App;
