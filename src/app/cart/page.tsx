"use client";
import Link from "next/link";
import { useMemo } from "react";
import { useShopStore } from "@/store/useShopStore";
import { ShoppingCart, Trash2, Plus, Minus } from "lucide-react";
import Image from "next/image";

export default function CartPage() {
  const { cart, updateQuantity, removeFromCart, getMixedCatalog } = useShopStore();
  const mixedCatalog = getMixedCatalog();

  const items = useMemo(() =>
    cart.map((ci) => ({
      ...ci,
      product: mixedCatalog.find((p) => p.id === ci.productId)!
    }))
  , [cart, mixedCatalog]);

  const total = items.reduce((sum, it) => sum + (it.product?.price || 0) * it.quantity, 0);

  return (
    <div className="container-responsive space-y-6 sm:space-y-8 py-4 sm:py-8">
      <div className="text-center">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold dot-matrix mb-2">Shopping Cart</h1>
        <p className="text-sm sm:text-base text-gray-600" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
          Review your items
        </p>
      </div>

      {items.length === 0 ? (
        <div className="text-center py-12">
          <ShoppingCart size={48} className="sm:w-16 sm:h-16 mx-auto text-gray-300 mb-4" />
          <div className="text-base sm:text-lg text-gray-500 mb-4" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
            Your cart is empty
          </div>
          <Link 
            href="/" 
            className="btn-primary inline-flex items-center gap-2"
            style={{ fontFamily: 'JetBrains Mono, monospace' }}
          >
            Browse Products
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          <div className="lg:col-span-2 space-y-4">
            {items.map((it) => (
              <div key={it.productId} className="card p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0 mx-auto sm:mx-0">
                    {it.product?.imageUrl ? (
                      <Image
                        src={it.product.imageUrl}
                        alt={it.product.name}
                        width={96}
                        height={96}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="text-2xl">📦</span>
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-lg mb-2" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                      {it.product?.name}
                    </h3>
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                      {it.product?.description}
                    </p>
                    <div className="text-sm text-gray-500 mb-2" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                      Category: {it.product?.category}
                    </div>
                    <div className="text-lg font-bold" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                      ₹{((it.product?.price || 0) / 100).toFixed(2)}
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateQuantity(it.productId, it.quantity - 1)}
                        className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-all duration-200"
                      >
                        <Minus size={16} />
                      </button>
                      <input 
                        type="number" 
                        min={1} 
                        value={it.quantity} 
                        onChange={(e) => updateQuantity(it.productId, Number(e.target.value))} 
                        className="w-16 text-center border border-gray-300 rounded px-2 py-1"
                        style={{ fontFamily: 'JetBrains Mono, monospace' }}
                      />
                      <button
                        onClick={() => updateQuantity(it.productId, it.quantity + 1)}
                        className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-all duration-200"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                    <button 
                      onClick={() => removeFromCart(it.productId)} 
                      className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-all duration-200"
                      title="Remove item"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="card p-6 h-fit">
            <h2 className="text-xl font-semibold mb-4" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
              Order Summary
            </h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span style={{ fontFamily: 'JetBrains Mono, monospace' }}>Items ({items.length})</span>
                <span style={{ fontFamily: 'JetBrains Mono, monospace' }}>₹{(total / 100).toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span style={{ fontFamily: 'JetBrains Mono, monospace' }}>Shipping</span>
                <span style={{ fontFamily: 'JetBrains Mono, monospace' }}>Free</span>
              </div>
              <div className="border-t pt-3">
                <div className="flex items-center justify-between text-lg font-bold">
                  <span style={{ fontFamily: 'JetBrains Mono, monospace' }}>Total</span>
                  <span style={{ fontFamily: 'JetBrains Mono, monospace' }}>₹{(total / 100).toFixed(2)}</span>
                </div>
              </div>
            </div>
            <Link 
              href="/checkout" 
              className="btn-primary w-full text-center mt-6 block"
              style={{ fontFamily: 'JetBrains Mono, monospace' }}
            >
              Proceed to Checkout
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}


