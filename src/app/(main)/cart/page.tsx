'use client';

import { useCart } from "@/app/context/CartContext";
import { Trash2 } from "lucide-react";
import Image from 'next/image'
import Link from "next/link";

export default function CartPage() {
  const { cartItems, updateQuantity,removeFromCart } = useCart();

  const getDiscountedPrice = (price: number, discount: number) => 
    Math.round(price - (price * discount) / 100);

  const subtotal = cartItems.reduce((sum, item) => {
    const price = item.discount ? getDiscountedPrice(item.price, item.discount) : item.price;
    return sum + price * (item.quantity || 1);
  }, 0);

  const totalDiscount = cartItems.reduce((sum, item) => {
    if (!item.discount) return sum;
    return sum + ((item.price * item.discount) / 100) * (item.quantity || 1);
  }, 0);

  return (
    <div className="flex flex-col-reverse lg:flex-row gap-4 p-4">
      {/* Cart Items */}

      { 
      cartItems.length > 0 && <div className="lg:w-[74%] space-y-4">
        {cartItems.map((item) => (
          <div key={item.id} className="relative flex gap-4 bg-[#F2EFE7] p-4 rounded-lg shadow-sm">

              {/* Delete button */}
              <button
                onClick={() => removeFromCart(item.id)}
                className="absolute top-2 right-2 text-gray-400 hover:text-red-500"
                title="Remove from cart"
              >
                <Trash2 size={18} />
              </button>
            <Image src={item.image} alt={item.title} width={96} height={96} className="w-24 h-24 object-contain rounded" />
            <div className="flex-1">
              <h3 className="font-semibold text-[#006A71] line-clamp-2">{item.title}</h3>
              {/* <p className="text-sm text-gray-600">Brand: {item.brand}</p>
              <p className="text-sm text-gray-600">Model: {item.model}</p>
              <p className="text-sm text-gray-600">Color: {item.color}</p> */}

              <div className="flex items-center gap-2 mt-1">
                {item.discount ? (
                  <>
                    <span className="line-through text-gray-400 text-sm">${item.price}</span>
                    <span className="text-[#006A71] font-bold text-base">
                      ${getDiscountedPrice(item.price, item.discount)}
                    </span>
                  </>
                ) : (
                  <span className="text-[#006A71] font-bold text-base">${item.price}</span>
                )}
              </div>

              {/* Quantity */}
              <div className="mt-2 flex items-center gap-2">
                <button onClick={() => updateQuantity(item.id, (item.quantity || 1) - 1)} className="px-2 rounded bg-[#9ACBD0] text-white">-</button>
                <span>{item.quantity}</span>
                <button onClick={() => updateQuantity(item.id, (item.quantity || 1) + 1)} className="px-2 rounded bg-[#006A71] text-white">+</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      }
      

      {/* Summary */}
      {
        cartItems.length > 0 && 
        <div className="lg:w-[26%] bg-white rounded-lg shadow-sm p-4 space-y-2 h-fit sticky top-[-16px] lg:top-0">
        <h2 className="text-xl font-semibold text-[#006A71]">Order Summary</h2>
        <p className="flex justify-between"><span>Price:</span> <span>${subtotal + totalDiscount}</span></p>
        <p className="flex justify-between"><span>Delivery:</span> <span className="text-green-600">Free</span></p>
        <p className="flex justify-between text-red-500"><span>Discount:</span> <span>-${totalDiscount.toFixed(0)}</span></p>
        <hr />
        <p className="flex justify-between font-bold text-lg"><span>Subtotal:</span> <span>${subtotal.toFixed(0)}</span></p>
      </div>
      }

      {
        cartItems.length <= 0 && <div className="flex flex-col items-center mx-auto justify-center py-4 text-center">
      <Image
        src="/empty-cart.jfif"
        alt="Empty cart"
        width={192}
        height={192}
        className="size-48 lg:size-60 object-contain"
      />
      <h2 className="text-2xl font-semibold text-[#006A71] mb-2">Your cart is empty</h2>
      <p className="text-gray-500 mb-4">Looks like you haven't added anything to your cart yet.</p>
      <Link
        href="/home"
        className="inline-block bg-[#006A71] hover:bg-[#00555a] text-white px-6 py-2 rounded-lg transition"
      >
        Shop Now
      </Link>
    </div>
      }
      
      
    </div>
  );
}
