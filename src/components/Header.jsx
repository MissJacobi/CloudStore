import React, {useState} from 'react';
import Logo from './Logo';
import { Link } from 'react-router-dom';
import AuthModal from './AuthModal';
import cartIcon from '../assets/cartIcon.png'

const Header = () => {
    const [isAuthOpen, setIsAuthOpen] = useState(false);
    const [cartCount, setCartCount] = useState(1);

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
        <nav className="relative flex items-center gap-10">
          <Link to="/" className="text-[11px] tracking-[0.4em] uppercase text-white/70 hover:text-[#f3e5ab] transition-colors font-medium">
            Shop
          </Link>
        
            <button 
                onClick={() => setIsAuthOpen(true)}
                className="text-[11px] tracking-[0.4em] uppercase border border-[#d4af37]/40 px-8 py-3 rounded-full text-[#d4af37] hover:bg-[#d4af37]/10 hover:border-[#d4af37]/80 transition-all duration-500 shadow-[0_0_25px_rgba(212,175,55,0.1)]">
                Profile
            </button>

            <Link
                to="/cart"
                className='relative flex items-center ml-2 hover:opacity-80 transition-opacity'>
                <img 
                src={cartIcon}
                alt="Cart"
                className='w-14 h-14 object-contain'/>

                   {cartCount > 0 && (
                    <span className='absolute top-[2px] right-[2px] 
                                    bg-[#050505]/80 backdrop-blur-md
                                    border border-[#d4af37]/60
                                    w-5 h-5 flex items-center justify-center
                                    rounded-full shadow-[0_0_10px_rgba(212,175,55,0.1)]'>
                        <span className='text-[10px] font-bold text-[#d4af37] leading-none select-none'>
                            {cartCount > 99 ? '99+' : cartCount}
                        </span>                
                    </span>
                     )}
            </Link>
        </nav>
      </div>
      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
    </header>
    </>
  );
};

export default Header;