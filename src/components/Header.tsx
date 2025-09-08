"use client";

import Link from "next/link";
import { ShoppingCart, Package, BarChart3, Store, LogOut, Home } from "lucide-react";
import { useShopStore, selectCartCount } from "@/store/useShopStore";
import { useRouter } from "next/navigation";

export default function Header() {
  const router = useRouter();
  const cartCount = useShopStore(selectCartCount);
  const { user, logout, isAuthenticated } = useShopStore();

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <header className="w-full border-b bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/60 sticky top-0 z-50">
      <div className="container-responsive py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-semibold dot-matrix">
          <Store size={20} />
          <span className="hidden sm:inline">E-Store</span>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-4 text-sm">
          <Link href="/" className="hover:underline flex items-center gap-1 transition-all duration-200" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
            <Home size={16}/> Home
          </Link>
          <Link href="/orders" className="hover:underline flex items-center gap-1 transition-all duration-200" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
            <Package size={16}/> Orders
          </Link>
          <Link href="/analytics" className="hover:underline flex items-center gap-1 transition-all duration-200" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
            <BarChart3 size={16}/> Analytics
          </Link>
          <Link href="/cart" className="relative flex items-center gap-1 hover:underline transition-all duration-200" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
            <ShoppingCart size={18} />
            <span>Cart</span>
            {cartCount > 0 && (
              <span className="absolute -right-2 -top-2 text-[10px] bg-black text-white rounded-full px-1.5 py-0.5">
                {cartCount}
              </span>
            )}
          </Link>
        </nav>

        {/* Mobile Navigation */}
        <nav className="flex md:hidden items-center gap-2">
          <Link href="/" className="p-2 hover:bg-gray-100 rounded-lg transition-all duration-200">
            <Home size={18}/>
          </Link>
          <Link href="/orders" className="p-2 hover:bg-gray-100 rounded-lg transition-all duration-200">
            <Package size={18}/>
          </Link>
          <Link href="/analytics" className="p-2 hover:bg-gray-100 rounded-lg transition-all duration-200">
            <BarChart3 size={18}/>
          </Link>
          <Link href="/cart" className="relative p-2 hover:bg-gray-100 rounded-lg transition-all duration-200">
            <ShoppingCart size={18} />
            {cartCount > 0 && (
              <span className="absolute -right-1 -top-1 text-[10px] bg-black text-white rounded-full px-1.5 py-0.5">
                {cartCount}
              </span>
            )}
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          {/* Desktop User Info */}
          <div className="hidden sm:flex items-center gap-2 bg-white rounded-lg px-3 py-2 border border-gray-200">
            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-bold">
              {user?.name?.charAt(0).toUpperCase()}
            </div>
            <div className="hidden lg:block text-sm">
              <div className="font-medium" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                {user?.name}
              </div>
              <div className="text-gray-500 text-xs" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                {user?.email || 'user@example.com'}
              </div>
            </div>
          </div>
          
          {/* Mobile User Avatar */}
          <div className="sm:hidden w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-bold">
            {user?.name?.charAt(0).toUpperCase()}
          </div>
          
          <button
            onClick={handleLogout}
            className="p-2 hover:bg-gray-100 rounded-lg transition-all duration-200"
            title="Logout"
          >
            <LogOut size={18} />
          </button>
        </div>
      </div>
    </header>
  );
}


