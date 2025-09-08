"use client";
import { useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { mixedCatalog } from "@/lib/data";
import { useShopStore } from "@/store/useShopStore";
import Image from "next/image";

export default function CategoryPage() {
  const params = useParams<{ slug: string }>();
  const router = useRouter();
  const { addToCart, buyNow } = useShopStore();
  const slug = Array.isArray(params.slug) ? params.slug[0] : params.slug;
  
  const [maxPrice, setMaxPrice] = useState<number>(15000000);
  const [minRating, setMinRating] = useState<number>(0);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const categoryMap: Record<string, string> = {
    'phones': 'Phones',
    'laptops': 'Laptops', 
    'watches': 'Watches',
    'fans': 'Fans',
    'fashion': 'Fashion'
  };

  const categoryName = categoryMap[slug?.toLowerCase() || ''] || slug;

  const items = useMemo(() => {
    return mixedCatalog.filter((p) => p.category === categoryName);
  }, [categoryName]);

  const filtered = useMemo(() => {
    return items.filter((p) => {
      const withinPrice = p.price <= maxPrice;
      const meetsRating = p.rating >= minRating;
      const matchesSearch = searchQuery === "" || 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase());
      return withinPrice && meetsRating && matchesSearch;
    });
  }, [items, maxPrice, minRating, searchQuery]);

  return (
    <div className="container-responsive space-y-6 sm:space-y-8 py-4 sm:py-8">
      <div className="text-center">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold dot-matrix mb-2">{categoryName}</h1>
        <p className="text-sm sm:text-base text-gray-600" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
          Explore {categoryName.toLowerCase()} collection
        </p>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
              Search Products
            </label>
            <input
              type="text"
              placeholder="Search by name or description..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input-field w-full"
              style={{ fontFamily: 'JetBrains Mono, monospace' }}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
              Max Price: ₹{(maxPrice / 100).toFixed(2)}
            </label>
            <input
              type="range"
              min={0}
              max={15000000}
              step={100000}
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
              Min Rating
            </label>
            <select
              value={minRating}
              onChange={(e) => setMinRating(Number(e.target.value))}
              className="input-field"
              style={{ fontFamily: 'JetBrains Mono, monospace' }}
            >
              <option value={0}>Any Rating</option>
              <option value={3}>3+ Stars</option>
              <option value={4}>4+ Stars</option>
              <option value={4.5}>4.5+ Stars</option>
            </select>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
        {filtered.map((p) => (
          <div key={p.id} className="card p-4 sm:p-6 group flex flex-col h-full">
            <div className="aspect-square bg-white rounded-lg mb-4 overflow-hidden border border-gray-200 flex items-center justify-center">
              <Image
                src={p.imageUrl}
                alt={p.name}
                width={400}
                height={400}
                className="object-cover w-full h-full"
              />
            </div>
            
            <div className="flex-1 flex flex-col">
              <div className="space-y-2 flex-1">
                <h3 className="font-semibold text-base sm:text-lg leading-tight" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                  {p.name}
                </h3>
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <span className="text-xs sm:text-sm text-gray-600 bg-gray-100 px-2 py-1 rounded" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                    {p.category}
                  </span>
                  <div className="flex items-center gap-1 text-xs sm:text-sm text-yellow-600">
                    <span>⭐</span>
                    <span style={{ fontFamily: 'JetBrains Mono, monospace' }}>{p.rating.toFixed(1)}</span>
                  </div>
                </div>
                <p className="text-xs sm:text-sm text-gray-600 line-clamp-2 leading-relaxed" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                  {p.description}
                </p>
              </div>

              <div className="mt-4 space-y-3">
                <div className="text-lg sm:text-xl lg:text-2xl font-bold" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                  ₹{(p.price / 100).toFixed(2)}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <button
                    onClick={() => addToCart(p.id)}
                    className="btn-primary w-full text-center"
                    style={{ fontFamily: 'JetBrains Mono, monospace' }}
                  >
                    Add to Cart
                  </button>
                  <button
                    onClick={() => {
                      buyNow(p.id);
                      router.push('/cart');
                    }}
                    className="btn-primary w-full text-center"
                    style={{ fontFamily: 'JetBrains Mono, monospace' }}
                  >
                    Buy Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-500 text-lg" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
            No products found matching your criteria
          </div>
        </div>
      )}
    </div>
  );
}
