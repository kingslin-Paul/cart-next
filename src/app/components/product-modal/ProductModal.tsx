'use client';
import { useCart } from '@/app/context/CartContext';
import React, { useState } from 'react';
import Image from 'next/image'

type Product = {
  id: number;
  title: string;
  image: string;
  price: number;
  description: string;
  brand: string;
  model: string;
  color: string;
  discount?: number;
};

const getDiscountedPrice = (price: number, discount?: number) => {
  return discount ? Math.round(price - (price * discount) / 100) : price;
};

export default function ProductModal({ product, onClose }: { product: Product; onClose: () => void }) {

  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

    const handleAdd = () => {
    if (added) return;
    addToCart(product);
    setAdded(true);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex justify-center items-center p-4">
      <div className="bg-white max-w-4xl w-full rounded-xl shadow-lg overflow-y-auto max-h-[90vh] relative flex flex-col md:flex-row">
        {/* Close Button */}
        <button onClick={onClose} className="absolute top-3 right-4 text-gray-600 hover:text-black text-2xl">&times;</button>

        {/* Image */}
        <div className="md:w-1/2 bg-gray-100 flex justify-center items-center p-4">
          <Image width={300} height={240} src={product.image} alt={product.title} className="object-contain h-60 md:h-80" />
        </div>

        {/* Details */}
        <div className="md:w-1/2 p-4 flex flex-col gap-2">
          <h2 className="text-lg font-semibold text-gray-800 line-clamp-3">{product.title}</h2>

          {/* Pricing */}
          <div className="flex items-center gap-3">
            {product.discount ? (
              <>
                <span className="text-gray-500 line-through">${product.price}</span>
                <span className="text-lg font-bold text-primary">${getDiscountedPrice(product.price, product.discount)}</span>
                <span className="text-xs bg-green-100 text-green-700 font-medium px-2 py-0.5 rounded-full">{product.discount}% off</span>
              </>
            ) : (
              <span className="text-lg font-bold text-primary">${product.price}</span>
            )}
          </div>

          {/* Info */}
          <div className="text-sm mt-2 text-gray-700">
            <p><strong>Brand:</strong> {product.brand}</p>
            <p><strong>Model:</strong> {product.model}</p>
            <p><strong>Color:</strong> {product.color}</p>
          </div>

          {/* Description */}
          <p className="text-sm text-gray-600 whitespace-break-spaces line-clamp-5 mt-2">{product.description}</p>

          {/* Add to Cart Button */}
          {/* <button    onClick={() =>addToCart(product)} className="mt-auto bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-md font-medium transition">
            Add to Cart
          </button> */}

          <button
            onClick={handleAdd}
            disabled={added}
            className={`mt-auto px-4 py-2 rounded-md font-medium transition-transform duration-300
              ${added ? 'bg-green-600 cursor-not-allowed' : 'bg-primary hover:bg-primary/90'} 
              text-white transform ${added ? 'animate-flip' : 'hover:scale-105'}`}
          >
            {added ? 'Added' : 'Add to Cart'}
          </button>

        </div>
      </div>
    </div>
  );
}
