import React, { useState } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import ShopPage from "./features/shop/ShopPage"
import ProfilePage from "./features/profile/ProfilePage"

function App() {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);

  const handleLogout = () => {
    setUser(null);
  }

  const handleAddToCart = (product) =>{
    setCart((prevCart)=> {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if(existingItem){
        return prevCart.map((item) =>
        item.id === product.id ? {...item, quantity: item.quantity + 1} : item);
      }
      return [...prevCart, {...product, quantity: 1}];
    });
  };
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-space-black text-white pt-20">
        <Header user={user} setUser={setUser} cart={cart} />
        <Routes>
          <Route path="/" element={<ShopPage onAddToCart={handleAddToCart}/>} />
          <Route path="/profile" element={<ProfilePage user={user} onLogout={handleLogout} />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}
export default App;