"use client";
import { useMemo, useState } from "react";
import { useParams } from "next/navigation";
import { mixedCatalog } from "@/lib/data";
import { useShopStore } from "@/store/useShopStore";
import Image from "next/image";

export default function BrowsePage() {
  const params = useParams<{ slug: string }>();
  const { addToCart } = useShopStore();
  const slug = Array.isArray(params.slug) ? params.slug[0] : params.slug;

  const items = useMemo(() => {
    const normalized = slug?.toLowerCase() || "";
    return mixedCatalog.filter((p) =>
      [p.category, p.name].some((s) => s.toLowerCase().includes(normalized))
    );
  }, [slug]);

  const brands = Array.from(new Set(items.map((i) => (i.name.split(" ")[0] || "Other"))));
  const [brand, setBrand] = useState<string>(brands[0] || "");

  const showBrandFilter = brands.length > 1;
  const filtered = items.filter((i) => (showBrandFilter && brand ? i.name.startsWith(brand) : true));

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold dot-matrix">{slug?.toString().toUpperCase()}</h1>
        <p className="text-gray-600" style={{ fontFamily: 'JetBrains Mono, monospace' }}>Explore curated items</p>
      </div>

      {showBrandFilter && (
        <div className="bg-white border border-gray-100 rounded-xl p-4 w-full max-w-xl mx-auto">
          <label className="block text-sm font-medium text-gray-700 mb-2" style={{ fontFamily: 'JetBrains Mono, monospace' }}>Brand</label>
          <select value={brand} onChange={(e) => setBrand(e.target.value)} className="input-field">
            {brands.map((b) => (
              <option key={b} value={b}>{b}</option>
            ))}
          </select>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filtered.slice(0, 8).map((p) => (
          <div key={p.id} className="card p-6 group">
            <div className="aspect-square bg-white rounded-lg mb-4 overflow-hidden border border-gray-200 flex items-center justify-center">
              <Image src={p.imageUrl} alt={p.name} width={500} height={500} className="object-cover w-full h-full" />
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold text-lg" style={{ fontFamily: 'JetBrains Mono, monospace' }}>{p.name}</h3>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600" style={{ fontFamily: 'JetBrains Mono, monospace' }}>{p.category}</span>
                <span className="text-yellow-600">⭐ {p.rating.toFixed(1)}</span>
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


