"use client";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  const categories = [
    { 
      name: "Phones", 
      url: "https://www.stuff.tv/wp-content/uploads/sites/2/2025/01/Best-AI-phones-2025-lead.jpg",
      href: "/category/phones"
    },
    { 
      name: "Laptops", 
      url: "https://www.cnet.com/a/img/resize/749c306c97f14076499981fc018dace33d0e367d/hub/2018/02/13/517fda12-de2a-4c3f-bee5-05daaf870537/01laptops-with-longest-battery-life-2018-feb.jpg?auto=webp&width=1200",
      href: "/category/laptops"
    },
    { 
      name: "Watches", 
      url: "https://www.maximawatches.com/cdn/shop/files/69100CMGY-A_79d56a17-b371-4bba-9086-cbce49e8de86.jpg?v=1739601173",
      href: "/category/watches"
    },
    { 
      name: "Fans", 
      url: "https://images-cdn.ubuy.co.in/663ab7ef7e4a712400214cd3-36-ceiling-fan-with-lighting-remote.jpg",
      href: "/category/fans"
    },
    { 
      name: "Fashion", 
      url: "https://www.technosport.in/cdn/shop/files/OR81IronGrey_1.jpg?v=1738839831&width=1206",
      href: "/category/fashion"
    },
  ];

  return (
    <div className="container-responsive space-y-8 sm:space-y-12 py-4 sm:py-8">
      <div className="text-center">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold dot-matrix mb-2">E-Store</h1>
        <p className="text-sm sm:text-base text-gray-600" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
          Explore our categories
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
        {categories.map((category) => (
          <Link key={category.name} href={category.href} className="group">
            <div className="card p-4 sm:p-6 hover:bg-gray-50 transition-all duration-200">
              <div className="aspect-[4/3] w-full overflow-hidden rounded-lg border border-gray-200 bg-white mb-4">
                <Image
                  src={category.url}
                  alt={category.name}
                  width={600}
                  height={450}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                />
              </div>
              <div className="text-center">
                <h3 className="text-xl font-semibold" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                  {category.name}
                </h3>
                <p className="text-sm text-gray-600 mt-1" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                  Explore {category.name.toLowerCase()}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}