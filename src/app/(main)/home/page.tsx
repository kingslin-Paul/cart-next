'use client';
import ProductGrid from '@/app/components/product-grid/ProductGrid';
import './home.css'

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { capitalizeFirst } from '@/utils/commonMethods';
import Loader from '@/app/components/loader/Loader';
import ProductModal from '@/app/components/product-modal/ProductModal';

type Product = {
    id: number;
    title: string;
    image: string;
    price: number;
    description: string;
  };

  const images = ['/summer2.jpg','/electronics-sale.webp','/summer-big-sale.jpg'];
  const tabs = ['all', 'tv', 'audio', 'laptop', 'mobile', 'gaming', 'appliances'];

export default function Home() {

    const [loading, setLoading] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);

    const [activeTab, setActiveTab] = useState(0);
    const tabRefs = useRef<(HTMLDivElement | null)[]>([]);
    const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });

    const [selectedCategory, setSelectedCategory] = useState('all');
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState<any | null>(null);

    useEffect(() => {
      const currentTab = tabRefs.current[activeTab];
      if (currentTab) {
        const { offsetLeft, offsetWidth } = currentTab;
        setIndicatorStyle({ left: offsetLeft, width: offsetWidth });
      }
    }, [activeTab]);

    useEffect(() => {
      const fetchProducts = async () => {
        setLoading(true);
        try {
          const url =
            selectedCategory === 'all'
              ? 'https://fakestoreapi.in/api/products'
              : `https://fakestoreapi.in/api/products/category?type=${selectedCategory}`;
          const res = await fetch(url);
          const data = await res.json();

          if(data.status=="SUCCESS"){
            setProducts(data.products || []);
          }
        
        } catch (err) {
          console.error('Failed to fetch products:', err);
        }
        setLoading(false);
      };
  
      fetchProducts();
    }, [selectedCategory]);

    

    // Auto slide every 1 second
    useEffect(() => {
      const interval = setInterval(() => {
        handleNext();
      }, 3000);
      return () => clearInterval(interval);
    }, [currentIndex]);
  
    const handleNext = () => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    };
  
    const handlePrev = () => {
      setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    const onProductClick = async (id: number) => {
      try {
        setLoading(true);
        const res = await fetch(`https://fakestoreapi.in/api/products/${id}`);
        const data = await res.json();
        if (data.status === 'SUCCESS') {
          setSelectedProduct(data.product);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    

  return (
    <>
    <div>
    <p className='text-primary text-base font-semibold mb-3'>Hot Sale</p>

    <section className='mb-4'>
      <div className="relative max-h-60 sm:max-h-fit w-full sm:w-[425px] flex justify-center items-center overflow-hidden bg-secondary backdrop-blur-md shadow-md border border-white/20 rounded-2xl">
        <div className="relative w-[80%] sm:w-96 transition-transform duration-700 ease-in-out" style={{ transform: `translateX(-${currentIndex * 100}%)`, display: 'flex' }}>
          {images.map((src, index) => (
            <img key={index} src={src} className="w-full flex-shrink-0" alt={`Slide ${index}`} />
          ))}
        </div>

        {/* Left Arrow */}
        <button
          onClick={handlePrev}
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm px-1 py-5 rounded shadow-md border border-white/30 hover:bg-white/30 transition"
        >
          <ChevronLeft className='size-4 sm:size-5 text-gray-800' />
        </button>

        {/* Right Arrow */}
        <button
          onClick={handleNext}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm px-1 py-5 rounded shadow-md border border-white/30 hover:bg-white/30 transition">
          <ChevronRight className="size-4 sm:size-5 text-gray-800" />
        </button>
      </div>
    </section>
    
    </div>


    <div className="relative w-full overflow-x-auto bg-[#F2EFE7] rounded-md px-2 py-2 shadow-sm tab_box mb-4">
      <div className="flex gap-2 relative">
        {/* Sliding chip background */}
        <div
          className="absolute top-0 bottom-0 my-auto md:h-[30px] lg:h-9 rounded-full bg-[#9ACBD0] transition-all duration-300 ease-in-out z-0"
          style={{
            left: `${indicatorStyle.left}px`,
            width: `${indicatorStyle.width}px`,
          }}
        />

        {/* Tab items */}
        {tabs.map((tab, idx) => (
          <div
            key={tab}
            ref={(el:any) => (tabRefs.current[idx] = el)}
            onClick={() => {setSelectedCategory(tab),setActiveTab(idx);}}
            className={`z-10 cursor-pointer px-1.5 py-1 sm:px-3 sm:py-1.5 lg:px-4 lg:py-2 rounded-full transition-all duration-200 text-xs md:text-sm ${
              activeTab === idx
                ? 'text-[#006A71] font-semibold'
                : 'text-[#006A71]/70'
            }`}
          >
            {capitalizeFirst(tab)}
          </div>
        ))}
      </div>
    </div>

    <ProductGrid products={products} onProductClick={onProductClick}/>
    {loading && <Loader />}
    {selectedProduct && <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />}
    </>
    
  );
}
