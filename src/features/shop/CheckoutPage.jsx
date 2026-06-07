import { useState } from 'react';
import GalaxyBackground from '../../components/GalaxyBackground';

const CheckoutPage = ({ cart = [], user, onClearCart }) => {
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);
  const [loading, setLoading] = useState(false);

  const [addressData, setAddressData] = useState({
    street: '',
    postalCode: '',
    city: ''
  })

  const safeCart = Array.isArray(cart) ? cart : [];
  const cartTotal = safeCart.reduce((total, item) => total + item.price * item.quantity, 0);

  const handleAddressChange = (e) => {
    const {name, value } = e.target;
    setAddressData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    if (!user) return;
    setLoading(true);
    
    const token = localStorage.getItem("token");
    const baseUrl = import.meta.env.VITE_API_URL;

    const orderData =safeCart.map(item => ({
        id: item.id,
        title: item.title,
        price: item.price,
        quantity: item.quantity,
      }));

    try {
      const response = await fetch(`${baseUrl}/api/orders`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(orderData),
      });

      if(response.status === 401){
        alert("Your session has expired. Please log in again.")
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        window.location.href = "/"
        return;
      }
      if(response.ok){
        setIsOrderPlaced(true);
        if(onClearCart) onClearCart();
      } else {
        const errorText = await response.text();
        alert(`Could not process order: ${errorText || 'Unknown error'}`)
      }
    } catch (error){
      console.error("Error communicating with space network:", error)
      alert("Network error. Could not connect to AWS server.")
    } finally {
      setLoading(false);
    }
  };

  // 1. OM BESTÄLLNINGEN ÄR KLAR
  if (isOrderPlaced) {
    return (
      <div className="relative min-h-screen text-white flex items-center justify-center p-6">
        <div className="absolute inset-0 z-0"><GalaxyBackground /></div>
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm z-10" />
        
        <div className="relative z-20 text-center space-y-4 max-w-md bg-black/40 border border-[#d4af37]/30 p-10 rounded-[2rem]">
          <span className="text-3xl">✨</span>
          <h2 className="text-2xl font-serif italic text-[#d4af37]">Transmission Complete</h2>
          <p className="text-xs text-white/70 leading-relaxed">
            Your cosmic order has been locked into the orbit queue. Check your space profile to see your newly acquired loyalty points!
          </p>
        </div>
      </div>
    );
  }

  // 2. OM MAN INTE ÄR INLOGGAD (KRAV PÅ KONTO!)
  if (!user) {
    return (
      <div className="relative min-h-screen text-white flex items-center justify-center p-6">
        <div className="absolute inset-0 z-0"><GalaxyBackground /></div>
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm z-10" />
        
        <div className="relative z-20 text-center space-y-6 max-w-md bg-black/40 border border-white/10 p-10 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
          <h2 className="text-xl font-serif italic text-[#d4af37]">Authentication Required</h2>
          <p className="text-xs text-white/50 leading-relaxed">
            You must be a registered member of the Orbit Network to finalize an acquisition and accumulate loyalty status.
          </p>
          <div className="h-[1px] w-16 bg-gradient-to-r from-transparent via-[#d4af37]/40 to-transparent mx-auto" />
          <p className="text-[10px] text-[#d4af37]/70 uppercase tracking-widest leading-relaxed">
            Please use the Profile interface in the navigation bar to log in or establish a new space account.
          </p>
        </div>
      </div>
    );
  }

  // 3. OM MAN ÄR INLOGGAD – VISA SIDA
  return (
    <div className="relative min-h-screen text-white p-6 md:p-12 overflow-hidden">
      <div className="absolute inset-0 z-0"><GalaxyBackground /></div>
      <div className="absolute inset-0 bg-black/50 backdrop-blur-[1px] z-10" />

      {/* Vi omsluter hela layouten i ett <form> så att HTML-valideringen (required) kickar in automatiskt */}
      <form onSubmit={handlePlaceOrder} className="relative z-20 max-w-5xl mx-auto space-y-10 pt-16">
        <div className="text-center space-y-2">
          <p className="text-[10px] uppercase tracking-[0.4em] text-[#d4af37]">Secure Protocol</p>
          <h1 className="text-3xl md:text-4xl font-serif italic">Cosmic Checkout</h1>
          <div className="h-[1px] w-24 bg-gradient-to-r from-transparent via-[#d4af37]/40 to-transparent mx-auto mt-3" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          {/* VÄNSTERSPALT (7 av 12 kolumner): Adressformulär & Order Manifest */}
          <div className="md:col-span-7 space-y-8">
            
            {/* NYTT: COVERS-SEKTION FÖR FRAKTADRESS */}
            <div className="bg-black/30 border border-white/5 p-6 rounded-[2rem] space-y-4">
              <h3 className="text-xs uppercase tracking-widest text-[#d4af37]">Shipping Destination</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-[9px] uppercase tracking-widest text-white/40 mb-1.5 ml-1">Street Address</label>
                  <input 
                    type="text"
                    name="street"
                    value={addressData.street}
                    onChange={handleAddressChange}
                    required
                    placeholder="Nebula Boulevard 42"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-3 text-sm focus:outline-none focus:border-[#d4af37]/50 transition-all text-white"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[9px] uppercase tracking-widest text-white/40 mb-1.5 ml-1">Postal Code</label>
                    <input 
                      type="text"
                      name="postalCode"
                      value={addressData.postalCode}
                      onChange={handleAddressChange}
                      required
                      placeholder="123 45"
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-3 text-sm focus:outline-none focus:border-[#d4af37]/50 transition-all text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[9px] uppercase tracking-widest text-white/40 mb-1.5 ml-1">City</label>
                    <input 
                      type="text"
                      name="city"
                      value={addressData.city}
                      onChange={handleAddressChange}
                      required
                      placeholder="Stockholm"
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-3 text-sm focus:outline-none focus:border-[#d4af37]/50 transition-all text-white"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* PRODUKTLISTAN */}
            <div className="space-y-4">
              <h3 className="text-xs uppercase tracking-widest text-[#d4af37]">Your Order Manifest</h3>
              {safeCart.length === 0 ? (
                <p className="text-sm text-white/40 italic bg-black/20 p-6 rounded-2xl border border-white/5 text-center">No artifacts selected.</p>
              ) : (
                <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1 scrollbar-none">
                  {safeCart.map((item) => (
                    <div key={item.id} className="flex items-center gap-4 bg-black/30 border border-white/5 p-4 rounded-2xl">
                      <div className="w-12 h-12 bg-white rounded-xl p-1 flex items-center justify-center flex-shrink-0">
                        <img src={item.image} alt={item.title} className="max-w-full max-h-full object-contain" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs font-medium truncate">{item.title}</h4>
                        <p className="text-[10px] text-white/40 mt-0.5">Qty: {item.quantity}</p>
                      </div>
                      <p className="text-xs font-serif text-[#d4af37]">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* HÖGERSPALT (5 av 12 kolumner): Betalningsbox */}
          <div className="md:col-span-5 bg-black/40 border border-[#d4af37]/20 p-6 rounded-[2rem] h-fit space-y-6 shadow-[0_20px_50px_rgba(0,0,0,0.3)]">
            <div className="space-y-1">
              <p className="text-[9px] uppercase tracking-widest text-white/40">Secured for</p>
              <h3 className="text-sm font-medium text-white/90">
                {user?.firstname || user?.firstName || 'Explorer'}
              </h3>
              <p className="text-[10px] text-[#d4af37]">Points: {user?.totalPoints || 0}</p>
            </div>

            <div className="border-t border-white/5 pt-4 space-y-2">
              <div className="flex justify-between text-xs text-white/50">
                <span>Subtotal</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-xs text-white/50">
                <span>Space Shipping</span>
                <span className="text-emerald-400">Free</span>
              </div>
              <div className="flex justify-between items-center pt-2 border-t border-white/5">
                <span className="text-[10px] uppercase tracking-widest text-white/40">Total</span>
                <span className="font-serif italic text-lg text-[#d4af37]">${cartTotal.toFixed(2)}</span>
              </div>
            </div>

            {/* Eftersom knappen ligger inuti ett <form> och har type="submit" (default), så kommer den validera fälten automatiskt! */}
            <button
              type="submit"
              disabled={loading || safeCart.length === 0}
              className="w-full bg-[#d4af37] text-black py-4 rounded-full text-[10px] uppercase tracking-widest font-bold hover:bg-[#b3922e] disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-300 shadow-[0_10px_30px_rgba(212,175,55,0.1)]"
            >
              {loading ? 'Processing Hyperlink...' : 'Authorize Purchase'}
            </button>
          </div>

        </div>
      </form>
    </div>
  );
};

export default CheckoutPage;
