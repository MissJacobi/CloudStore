import Logo from './Logo';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
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
        <nav className="flex items-center gap-12">
          <Link to="/" className="text-[11px] tracking-[0.4em] uppercase text-white/70 hover:text-[#f3e5ab] transition-colors font-medium">
            Shop
          </Link>
        
          <Link 
            to="/profile" 
            className="text-[11px] tracking-[0.4em] uppercase border border-[#d4af37]/40 px-8 py-3 rounded-full text-[#d4af37] hover:bg-[#d4af37]/10 hover:border-[#d4af37]/80 transition-all duration-500 shadow-[0_0_25px_rgba(212,175,55,0.1)]"
          >
            Profile
          </Link>
        </nav>

      </div>
    </header>
  );
};

export default Header;