import React from 'react'
import './productgrid.css'
import Image from 'next/image'

  type Product = {
    id: number;
    title: string;
    image: string;
    price: number;
    discount: number;
  };

function ProductGrid({ products,onProductClick  }: { products: Product[] ,onProductClick: (id: number) => void }) {

    const getDiscountedPrice = (price: number, discount: number): number => {
        return Math.round(price - (price * discount) / 100);
    };

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
    {products.map((product) => (
        <div
        key={product.id} onClick={() => onProductClick(product.id)}
        className="bg-white cursor-pointer rounded-xl shadow p-3 hover:shadow-md transition-transform duration-300 transform hover:scale-[1.04]"
        >
        <img width={200} height={128}
            src={product.image}
            alt={product.title}
            className="w-full h-32 sm:h-40 object-contain rounded"
        />

        <h3 className="text-sm sm:text-base font-medium text-gray-800 truncate mt-2">
            {product.title}
        </h3>

        <div className="flex items-center gap-2 text-sm mt-1">
            {product.discount ? (
            <>
                <span className="text-gray-500 line-through text-xs sm:text-sm">
                ${product.price}
                </span>
                <span className="text-primary font-semibold text-sm sm:text-base">
                ${getDiscountedPrice(product.price, product.discount)}
                </span>
            </>
            ) : (
            <span className="text-primary font-semibold text-sm sm:text-base">
                ${product.price}
            </span>
            )}
        </div>

        {product.discount && (
            <div className="text-xs px-2 py-0.5 bg-[#e6f7f7] text-[#006A71] font-semibold rounded-full mt-1 w-fit">
            {product.discount}% off
            </div>
        )}
        </div>
    ))}
    </div>

  )
}

export default ProductGrid