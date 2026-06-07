import { useState } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import ShopPage from "./features/shop/ShopPage"
import ProfilePage from "./features/profile/ProfilePage"
import CheckoutPage from "./features/shop/CheckoutPage";

function App() {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [cart, setCart] = useState([]);

  const handleLoginSuccess = (userData, token) => {   
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('token', token);
    setUser(userData);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
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

  const handleRemoveFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const handleUpdateQuantity = (productId, newQuantity) => {
    if(newQuantity < 1){
      handleRemoveFromCart(productId);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId ? {...item, quantity: newQuantity} : item));
  };

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-space-black text-white pt-20">
        <Header user={user} onLoginSuccess={handleLoginSuccess} cart={cart} onRemoveFromCart={handleRemoveFromCart} onUpdateQuantity={handleUpdateQuantity} />
        <Routes>
          <Route path="/" element={<ShopPage onAddToCart={handleAddToCart}/>} />
          <Route path="/profile" element={<ProfilePage user={user} onLogout={handleLogout} />} />
          <Route path="/checkout" element={<CheckoutPage cart={cart} user={user} onClearCart={handleClearCart} />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}
export default App;
