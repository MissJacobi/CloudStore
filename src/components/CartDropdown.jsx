import { Link } from 'react-router-dom';

const CartDropdown = ({ isOpen, onClose, cart = [], onRemoveFromCart,onUpdateQuantity }) => {
  if (!isOpen) return null;

  // 2. Räkna ut totalsumman dynamiskt baserat på vad som faktiskt ligger i varukorgen
  const cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className="fixed md:absolute top-[135px] md:top-full left-1/2 md:left-auto md:right-0 
                  -translate-x-1/2 md:translate-x-0
                  w-[calc(100vw-32px)] md:w-96
                  bg-[#050505]/95 backdrop-blur-2xl border border-[#d4af37]/30 p-4 md:p-6 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.7)] z-50">
      
      <div className="flex justify-between items-center mb-6">
        <span className="text-[10px] tracking-widest text-[#d4af37] uppercase font-medium">Luxury Cart</span>
        <button onClick={onClose} className="text-[9px] tracking-widest uppercase text-white/40 hover:text-white transition-colors">Close</button>
      </div>

      {/* 3. PRODUKTLISTAN */}
      <div className="space-y-4 max-h-[240px] overflow-y-auto pr-1 scrollbar-none mb-6">
        {cart.length === 0 ? (
          <p className="text-xs text-white/40 text-center py-8 italic">Your cosmic cart is empty</p>
        ) : (
          cart.map((item) => (
            <div key={item.id} className="flex items-center gap-4 bg-white/5 border border-white/5 p-3 rounded-2xl">
              {/* Produktbild */}
              <div className="w-12 h-12 bg-white rounded-xl overflow-hidden p-1 flex items-center justify-center flex-shrink-0">
                <img src={item.image} alt={item.title} className="max-w-full max-h-full object-contain" />
              </div>
              
              {/* Produktinfo */}
              <div className="flex-1 min-w-0">
                <h4 className="text-xs font-medium text-white/90 truncate">{item.title}</h4>
                <p className="text-[11px] text-[#d4af37] mt-0.5">${item.price.toFixed(2)}</p>
              </div>

              {/* Antal */}
              <div className="flex items-center gap-2 bg-black/40 border border-white/10 px-2.5 py-1 rounded-full flex-shrink-0">
                <button
                    onClick={() => onUpdateQuantity(item.id, item.quantity -1)}
                    className="text-white/40 hover:text-[#d4af37] text-xs font-bold tansition-colors px-1">
                        -
                </button>
                <span className="text-[10px] text-white/80 font-medium min-w-[12px] text-center">
                  {item.quantity}
                </span>
                <button
                    onClick={() => onUpdateQuantity(item.id, item.quantity +1)}
                    className="text-white/40 hover:text-[#d4af37] text-xs font-bold tansition-colors px-1">
                        +
                </button>
              </div>

                <button
                onClick={() => onRemoveFromCart(item.id)}
                className="text-white/20 hover:text-white/80 text-sm font-medium transition-colors pl-1 hover:scale-110"
                title='Remove item'>
                    x
                </button>

            </div>
          ))
        )}
      </div>

      {/* Totalsumma och Checkout-knapp */}
      <div className="border-t border-white/5 pt-4 space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-[10px] tracking-widest uppercase text-white/40">Total</span>
          <span className="font-serif italic text-[#d4af37] text-base">${cartTotal.toFixed(2)}</span>
        </div>
        <Link
        to="/checkout"
        onClick={onClose}
        className="w-full block text-center bg-[#d4af37] text-black py-3 rounded-full text-[10px] uppercase tracking-widest font-bold hover:bg-[#b3922e] transition-all duration-300 shadow-[0_0_20px_rgba(212,175,55,0.2)]">
          Proceed to Checkout
        </Link>
      </div>

    </div>
  );
};

export default CartDropdown;
