import { useState } from 'react';
import Logo from './Logo';
import { Link, useNavigate } from 'react-router-dom';
import AuthModal from './AuthModal';
import CartDropdown from './CartDropdown';
import cartIcon from '../assets/cartIcon.png';

const Header = ({ user, onLoginSuccess, cart = [], onRemoveFromCart, onUpdateQuantity }) => {
    const [isAuthOpen, setIsAuthOpen] = useState(false);
    const [isCartOpen, setIsCartOpen] = useState(false);

    const totalItemsInCart = cart.reduce((total, item) => total + item.quantity, 0);

    const navigate = useNavigate();

    const handleProfileClick = () => {
      if (user) {
        navigate('/profile');
      } else {
        setIsAuthOpen(true);
      }
    };

    const handleLoginSuccess = (userData, token) => {
      onLoginSuccess(userData, token);
      setIsAuthOpen(false);
      navigate('/profile');
    };

  return (
    <>
    <header className="fixed top-4 left-0 w-full z-[100] px-6">
      <div className="max-w-7xl mx-auto h-24 px-10 flex items-center justify-between 
                      bg-[#050505]/40 backdrop-blur-2xl 
                      border border-[#d4af37]/20 rounded-3xl
                      shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
        
        {/* Logo */}
        <Link to="/" className="flex items-center hover:opacity-90 transition-opacity scale-110">
          <Logo />
        </Link>

        {/* Navbar */}
        <nav className="flex items-center gap-10">
          <Link to="/" className="text-[11px] tracking-[0.4em] uppercase text-white/70 hover:text-[#f3e5ab] transition-colors font-medium">
            Shop
          </Link>
        
          <button 
              onClick={handleProfileClick}
              className="text-[11px] tracking-[0.4em] uppercase border border-[#d4af37]/40 px-8 py-3 rounded-full text-[#d4af37] hover:bg-[#d4af37]/10 hover:border-[#d4af37]/80 transition-all duration-500 shadow-[0_0_25px_rgba(212,175,55,0.1)]">
              {user ? `Hi, ${user.firstName}` : 'Profile'}
          </button>

          <div className='relative flex items-center'>
              <button
                  onClick={() => setIsCartOpen(!isCartOpen)}
                  className='relative flex items-center justify-center hover:opacity-80 transition-opacity'>
                  <img 
                    src={cartIcon}
                    alt="Cart"
                    className='w-14 h-14 object-contain'
                  />

                  {totalItemsInCart > 0 && (
                    <span className='absolute top-[4px] right-[4px] 
                                    bg-[#050505]/80 backdrop-blur-md
                                    border border-[#d4af37]/60
                                    w-5 h-5 flex items-center justify-center
                                    rounded-full shadow-[0_0_10px_rgba(212,175,55,0.1)]'>
                        <span className='h-full flex items-center justify-center text-[10px] font-bold text-[#d4af37] select-none'>
                            {totalItemsInCart > 99 ? '99+' : totalItemsInCart}
                        </span>                
                    </span>
                  )}
              </button>
              <CartDropdown isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} cart={cart} onRemoveFromCart={onRemoveFromCart} onUpdateQuantity={onUpdateQuantity}/>
          </div>
        
        </nav>
      </div>
      <AuthModal 
        isOpen={isAuthOpen} 
        onClose={() => setIsAuthOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />
    </header>
    </>
  );
};

export default Header;
