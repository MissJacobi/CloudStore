import React, { useState } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import ShopPage from "./features/shop/ShopPage"
import ProfilePage from "./features/profile/ProfilePage"

function App() {
  const [user, setUser] = useState(null);

  const handleLogout = () => {
    setUser(null);
  }
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-space-black text-white pt-20">
        <Header user={user} setUser={setUser} />
        <Routes>
          <Route path="/" element={<ShopPage />} />
          <Route path="/profile" element={<ProfilePage user={user} onLogout={handleLogout} />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}
export default App;