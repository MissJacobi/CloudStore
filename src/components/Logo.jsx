import logoImg from '../assets/cloudLogo.png';

const Logo = () => {
  return (
    <div className="flex items-center gap-5"> 
      <div className="relative flex items-center justify-center">
    
        <div className="absolute inset-0 bg-yellow-600/10 blur-2xl rounded-full scale-50" />
        
        <img 
          src={logoImg} 
          alt="Cloud Store Gold" 
          className="w-14 h-auto relative z-10 drop-shadow-[0_0_15px_rgba(212,175,55,0.4)] transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      
      <span 
        className="text-3xl tracking-tight leading-none" 
        style={{ 
          fontFamily: 'Georgia, serif',
          color: '#f0f0f0',
          textShadow: '0 2px 4px rgba(0,0,0,0.3)'
        }}
      >
        Cloud Store
      </span>
    </div>
  );
};

export default Logo;