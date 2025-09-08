"use client";
import { useMemo } from "react";
import { useShopStore } from "@/store/useShopStore";
import Image from "next/image";

export default function ElectronicsPage() {
  const { products, addToCart } = useShopStore();

  const electronicIds = new Set([
    "iphone15promax",
    "s24ultra",
    "macbookpro16",
    "samsungtv-qled",
    "sonybravia-oled",
    "applewatch-ultra",
    "galaxywatch6",
  ]);

  const featured = useMemo(
    () => products.filter((p) => electronicIds.has(p.id)),
    [products]
  );

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold dot-matrix mb-2">Electronics Showcase</h1>
        <p className="text-gray-600" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
          Top-tier phones, laptops, TVs and wearables
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {featured.map((p) => (
          <div key={p.id} className="card p-6 group">
            <div className="aspect-square bg-white rounded-lg mb-4 overflow-hidden border border-gray-200 flex items-center justify-center">
              <Image
                src={p.imageUrl || "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9"}
                alt={p.name}
                width={400}
                height={400}
                className="object-contain w-full h-full"
              />
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold text-lg" style={{ fontFamily: 'JetBrains Mono, monospace' }}>{p.name}</h3>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 bg-gray-100 px-2 py-1 rounded" style={{ fontFamily: 'JetBrains Mono, monospace' }}>{p.category}</span>
                <div className="flex items-center gap-1 text-sm text-yellow-600">
                  <span>⭐</span>
                  <span style={{ fontFamily: 'JetBrains Mono, monospace' }}>{p.rating.toFixed(1)}</span>
                </div>
              </div>
              <p className="text-sm text-gray-600 line-clamp-2" style={{ fontFamily: 'JetBrains Mono, monospace' }}>{p.description}</p>
            </div>
            <div className="mt-6 flex items-center justify-between">
              <div className="text-2xl font-bold" style={{ fontFamily: 'JetBrains Mono, monospace' }}>₹{(p.price / 100).toFixed(2)}</div>
              <button onClick={() => addToCart(p.id)} className="btn-primary" style={{ fontFamily: 'JetBrains Mono, monospace' }}>Add to Cart</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


