import React from "react";

const CartDropdown = ({isOpen, onClose}) => {
/*Test data */
    const cartItems = [
        {id: 1, 
        name: 'Watch', 
        price: '€299.00', 
        quantity: '1',
        image:'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=100&q=80'
    }
    ];
if (!isOpen) return null;
return (
    <div className="absolute right-0 top-full mt-3 w-80 bg-[#050505]/90 backdrop-blur-2xl 
                    border border-[#d4af37]/30 p-5 rounded-2xl
                    shadow-[0_20px_50px_rgba(0,0,0,0.8)] 
                    animate-in fade-in slide-in-from-top-2 duration-200">
        <div className="pb-3 border-b border-white/5 flex justify-between items-center">
            <span className="text-[10px] uppercase tracking-widest text-[#d4af37]/80 font-medium">
                Luxury Cart
            </span>
            <button onClick={onClose} className="text-white/40 hover:text-white text-[10px] uppercase tracking-widest">
                Close
            </button>
        </div>

        <div className="max-h-60 overflow-y-auto py-4 space-y-3">
            {cartItems.map((items) => (
                <div key={items.id} className="flex items-center justify-between gap-3 bg-white/5 border border-white/5 p-3 rounded-xl">
                    <div className="w-15 h-13 bg-black rounded-lg border border-white/10 overflow-hidden flex-shrink-0">
                        <img src={items.image} alt={items.name} className="w-full h-full object-cover mix-blend-screen opacity-80"></img>
                    </div>
                    
                    <div className="flex-1 min-w-0">
                        <h4 className="text-xs font-medium text-white">{items.name}</h4>
                        <p className="text-[10px] text-[#d4af37]/70 mt-0.5">{items.price}</p>
                    </div>
                    <span className="text-[10px] text-white/40">Qty: {items.quantity}</span>
                </div>    
            ))}
        </div>

    
        <div className="pt-3 border-t border-white/5 space-y-3">
            <div className="flex justify-between items-center text-xs">
                <span className="text-white/40 uppercase tracking-widest text-[9px]">Total</span>
                <span className="text-[#d4af37] font-bold">{cartItems[0]?.price}</span>
            </div>
            <button className="w-full bg-[#d4af37] text-black font-bold py-3 rounded-full uppercase tracking-widest text-[10px] hover:bg-[#f3e5ab] transition-all shadow-[0_5px_15px_rgba(212,175,55,0.1)]">
                Proceed to Checkout
            </button>
        </div>


    </div>
);
};

export default CartDropdown;