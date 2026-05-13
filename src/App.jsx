import React from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import ShopPage from "./features/shop/ShopPage"
import ProfilePage from "./features/profile/ProfilePage"

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-space-black text-white pt-20">
        <Header />
        <Routes>
          <Route path="/" element={<ShopPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}
export default App;