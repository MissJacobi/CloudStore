import { useEffect, useState } from 'react';
import GalaxyBackground from '../../components/GalaxyBackground';
import { useNavigate } from 'react-router-dom';

const ProfilePage = ({ user, onLogout }) => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadigOrders] = useState(true);

  useEffect(() => {
    const savedUserString = localStorage.getItem("user");
    if (!savedUserString) return;

    const savedUser = JSON.parse(savedUserString);
    if (!savedUser || !savedUser.email) return;
    
    const fetchOrderHistory = async () => {
      const token = localStorage.getItem("token");
      const baseUrl = import.meta.env.VITE_API_URL;
      const headers = {
        'Content-Type': 'application/json'
      };

      if (token && token !== "undefined" && token !== "null") {
        headers.Authorization = `Bearer ${token}`;
      }

      try {
        
        const response = await fetch(`${baseUrl}/orders/user/${savedUser.email}`, {
          method: 'GET',
          credentials: 'include',
          headers
        });

        if (response.ok) {
          const data = await response.json();
          setOrders(data);
        } else if (response.status === 401 || response.status === 403) {
          onLogout();
          navigate('/');
        }
      } catch (error) {
        console.error("Could not get cosmic orders:", error);
      } finally {
        setLoadigOrders(false);
      }
    };

    fetchOrderHistory();
  }, [user, onLogout, navigate]);

  if (!user) {
    return (
      <div className="min-h-screen bg-[#050505] text-white flex items-center justify-center p-6">
        <div className="-mt-24 text-center space-y-4 w-full max-w-md bg-[#050505]/40 backdrop-blur-2xl 
                        border border-[#d4af37]/20 p-10 rounded-3xl 
                        shadow-[0_20px_50px_rgba(0,0,0,0.6)] 
                        animate-in fade-in zoom-in-95 duration-300">
          <p className="text-[10px] tracking-[0.3em] text-[#d4af37]/60 uppercase font-medium">
            Access Denied
          </p>
          <h2 className="text-xl font-serif text-white italic">
            Please log in to view your profile
          </h2>
          <button 
            onClick={() => navigate('/')} 
            className="border border-[#d4af37]/40 text-[#d4af37] px-8 py-3 rounded-full 
                       text-[11px] uppercase tracking-widest mt-4 
                       hover:bg-[#d4af37]/10 hover:border-[#d4af37]/80 transition-all duration-300 font-medium"
          >
            Return to frontpage
          </button>
        </div>
      </div>
    );
  }
  
  const displayFirstName = user.firstname || user.firstName || "Explorer";
  const displayLastName = user.lastname || user.lastName || "";

  return (
    <div className="relative min-h-screen text-white flex items-center justify-center p-4 md:p-10 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <GalaxyBackground />
      </div>
      <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] z-10" />
      <div className="relative w-full max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-start z-20">
        
        <div className="lg:col-span-4 space-y-6 animate-in fade-in slide-in-from-left-8 duration-700">
          <div className="bg-black/40 backdrop-blur-xl border border-[#d4af37]/20 rounded-[2.5rem] p-8 shadow-[0_0_50px_rgba(0,0,0,0.5)]">
            
            <div className="relative group mx-auto w-32 h-32 mb-6">
                <div className="absolute inset-0 bg-[#d4af37]/20 rounded-full blur-xl group-hover:bg-[#d4af37]/40 transition-all" />
                <div className="relative w-full h-full rounded-full border-2 border-[#d4af37]/40 overflow-hidden bg-black flex items-center justify-center">
                    <span className="text-4xl font-serif italic text-[#d4af37]">{displayFirstName?.charAt(0)}</span>
                </div>
            </div>

            <div className="text-center space-y-2 mb-8">
              <h1 className="text-3xl font-serif italic tracking-wide">{displayFirstName} {displayLastName}</h1>
              <p className="text-[10px] uppercase tracking-[0.4em] text-[#d4af37]">
                {user?.membershipTier || "Member"}
              </p>
            </div>

            <div className="space-y-4">
               <div className="space-y-1">
                  <p className="text-[9px] uppercase tracking-widest text-white/40 ml-1">Current Email</p>
                  <input 
                    type="email" 
                    defaultValue={user.email}
                    disabled={!isEditing}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:border-[#d4af37]/50 disabled:opacity-50 transition-all"
                  />
               </div>
               <div className="space-y-1">
                  <p className="text-[9px] uppercase tracking-widest text-white/40 ml-1">Security Key (Password)</p>
                  <input 
                    type="password" 
                    placeholder="••••••••"
                    disabled={!isEditing}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:border-[#d4af37]/50 disabled:opacity-50 transition-all"
                  />
               </div>
            </div>

            <div className="mt-8 space-y-3">
              <button 
                onClick={() => setIsEditing(!isEditing)}
                className="w-full bg-transparent border border-[#d4af37]/40 text-[#d4af37] py-3 rounded-full text-[10px] uppercase tracking-widest hover:bg-[#d4af37]/10 transition-all">
                {isEditing ? 'Save Changes' : 'Edit Security'}
              </button>
              <button 
                onClick={() => { onLogout(); navigate('/'); }}
                className="w-full text-white/30 py-2 text-[9px] uppercase tracking-widest hover:text-red-400 transition-colors">
                Sign out of Orbit
              </button>
            </div>
          </div>
        </div>

        <div className="lg:col-span-8 animate-in fade-in slide-in-from-right-8 duration-700">
          <div className="bg-black/20 backdrop-blur-md border border-white/5 rounded-[2.5rem] p-8 h-full min-h-[600px] flex flex-col justify-between">
            
            <div className="flex flex-col flex-1 min-h-0">
              <div className="flex justify-between items-center mb-10">
                  <h2 className="text-xl font-serif italic tracking-wider">Order History</h2>
                  <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-[#d4af37]/30 to-transparent mx-6" />
              </div>

              <div className="space-y-4 max-h-[420px] overflow-y-auto pr-2 scrollbar-none">
                {loadingOrders ? (
                  <p className="text-xs text-white/40 text-center py-12 animate-pulse uppercase tracking-wider">Fetching historical transmissions...</p>
                ) : orders.length === 0 ? (
                  <p className="text-xs text-white/40 text-center py-12 italic">No cosmic orders recorded yet.</p>
                ) : (
                  orders.map((order, index) => (
                    <div key={index} className="group relative flex items-center justify-between bg-white/5 border border-white/5 hover:border-[#d4af37]/30 p-5 rounded-3xl transition-all duration-500 hover:bg-white/10">
                      <div className="flex items-center gap-6">
                        <div className="w-16 h-16 bg-black rounded-2xl border border-white/10 overflow-hidden flex items-center justify-center">
                            <img src={order.productImage} alt="Order item" className="max-w-full max-h-full object-contain mix-blend-screen opacity-80 group-hover:opacity-100 transition-opacity" />
                        </div>
                        <div>
                            <p className="text-[10px] text-[#d4af37] font-medium tracking-widest mb-1">Order #{order.id}</p>
                            <h3 className="text-sm font-medium text-white/90">Cosmic Package</h3>
                            <p className="text-[10px] text-white/40 mt-1">
                              {order.orderDate ? new Date(order.orderDate).toLocaleDateString() : 'Processing Date'}
                            </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xs font-serif italic text-white mb-1">${order.totalAmount?.toFixed(2)}</p>
                        <span className="text-[9px] px-3 py-1 rounded-full border border-white/10 bg-white/5 text-white/60 tracking-widest group-hover:border-[#d4af37]/30 group-hover:text-[#d4af37] transition-all">
                            CONFIRMED
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            <div className="mt-12 p-6 border border-[#d4af37]/10 rounded-3xl bg-[#d4af37]/5 flex justify-between items-center">
                <div>
                    <p className="text-[9px] uppercase tracking-widest text-[#d4af37] mb-1">Loyalty Points (1 $ = 1 Point)</p>
                    <p className="text-xl font-serif italic">
                        {user?.totalPoints !== undefined ? user.totalPoints.toLocaleString() : "0"} / 10,000
                    </p>
                </div>
                {user?.totalPoints >= 10000 ? (
                  <span className="text-[9px] uppercase tracking-widest text-emerald-400 border border-emerald-500/30 bg-emerald-500/5 px-4 py-2 rounded-full">
                      ★ Premium Unlocked
                  </span>
                ) : (
                  <p className="text-[9px] text-white/40 tracking-wider">
                      {10000 - (user?.totalPoints || 0)} points left to Premium
                  </p>
                )}
            </div>
            
          </div>
        </div>

      </div>
    </div>
  );
};

export default ProfilePage;
