import { useState, useEffect } from 'react';
import GalaxyBackground from '../../components/GalaxyBackground';

const ShopPage = ({ onAddToCart }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [loading, setLoading] = useState(true);

  // Hämtar produkterna live från Fake Store API
  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
        setFilteredProducts(data);
        
        // Skapar en ren array med unika kategorier
        const uniqueCategories = ['all', ...new Set(data.map(p => p.category))];
        setCategories(uniqueCategories);
        
        setLoading(false);
      })
      .catch((error) => {
        console.error('Kunde inte hämta produkter:', error);
        setLoading(false);
      });
  }, []);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    if (category === 'all') {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(p => p.category === category);
      setFilteredProducts(filtered);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050505] text-white flex items-center justify-center">
        <p className="text-xs uppercase tracking-[0.3em] text-[#d4af37] animate-pulse">
          Loading Orbit Market...
        </p>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen text-white p-6 md:p-12 overflow-hidden">
      {/* Bakgrundseffekter */}
      <div className="absolute inset-0 z-0">
        <GalaxyBackground />
      </div>
      <div className="absolute inset-0 bg-black/50 backdrop-blur-[1px] z-10" />

      {/* Innehåll */}
      <div className="relative z-20 max-w-7xl mx-auto space-y-10 pt-16">
        
        {/* Rubrik/Header */}
        <div className="text-center space-y-3">
          <p className="text-[10px] uppercase tracking-[0.4em] text-[#d4af37]">
            Curated Cosmic Collection
          </p>
          <h1 className="text-4xl md:text-5xl font-serif italic tracking-wide">
            The Shop
          </h1>
          <div className="h-[1px] w-32 bg-gradient-to-r from-transparent via-[#d4af37]/40 to-transparent mx-auto mt-4" />
        </div>

        {/* Kategori knappar */}
        <div className="flex flex-wrap justify-center items-center gap-3 md:gap-4 pb-6 max-w-4xl mx-auto">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryChange(category)}
              className={`px-5 py-2.5 rounded-full text-[10px] uppercase tracking-widest font-medium border transition-all duration-300 block ${
                selectedCategory === category
                  ? 'bg-[#d4af37] text-black border-[#d4af37] shadow-[0_0_15px_rgba(212,175,55,0.3)]'
                  : 'bg-black/40 text-white/60 border-white/10 hover:border-[#d4af37]/40 hover:text-white'
              }`}
            >
              {category === 'all' ? 'All Artifacts' : category}
            </button>
          ))}
        </div>

        {/* Produkt-grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <div 
              key={product.id} 
              className="group relative bg-black/30 backdrop-blur-md border border-white/5 hover:border-[#d4af37]/30 rounded-[2rem] p-6 transition-all duration-500 flex flex-col justify-between hover:bg-black/40 shadow-[0_10px_30px_rgba(0,0,0,0.3)]"
            >
              <div>
                {/* Produktbild */}
                <div className="w-full h-64 bg-white rounded-2xl border border-white/5 overflow-hidden mb-6 relative flex items-center justify-center p-4">
                  <img 
                    src={product.image} 
                    alt={product.title} 
                    className="max-w-full max-h-full object-contain opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                  />
                </div>

                {/* Produktinfo */}
                <div className="space-y-2">
                  <div className="flex flex-col gap-1">
                    <p className="text-[9px] uppercase tracking-widest text-[#d4af37]/60">
                      {product.category}
                    </p>
                    <h3 className="text-sm font-medium text-white/90 group-hover:text-white transition-colors line-clamp-1">
                      {product.title}
                    </h3>
                  </div>
                  
                  <p className="font-serif italic text-[#d4af37] text-lg mt-1">
                    ${product.price.toFixed(2)}
                  </p>
                  
                  <p className="text-xs text-white/50 leading-relaxed line-clamp-2">
                    {product.description}
                  </p>
                </div>
              </div>

              {/* Köpknapp */}
              <div className="mt-6 pt-4 border-t border-white/5">
                <button
                  onClick={() => onAddToCart({
                    id: product.id,
                    title: product.title,
                    price: product.price,
                    image: product.image
                  })}
                  className="w-full bg-transparent border border-[#d4af37]/30 text-[#d4af37] py-3 rounded-full text-[10px] uppercase tracking-widest font-medium hover:bg-[#d4af37] hover:text-black hover:border-[#d4af37] transition-all duration-300"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default ShopPage;
