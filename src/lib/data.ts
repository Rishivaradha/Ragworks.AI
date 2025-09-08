import { Product } from "./types";

export const products: Product[] = [];

export const categories = ["Phones", "Laptops", "Watches", "Fans", "Fashion"];

// Mixed catalog entries for homepage scatter (id must be unique)
export const mixedCatalog: Product[] = [
  // Phones Section
  {
    id: "iphone16promax",
    name: "iPhone 16 Pro Max",
    description: "Apple flagship with A18 Bionic chip, Dynamic AMOLED display, 512GB storage",
    category: "Phones",
    price: 12999900,
    rating: 4.9,
    imageUrl: "https://www.apple.com/newsroom/images/2024/09/apple-debuts-iphone-16-pro-and-iphone-16-pro-max/tile/Apple-iPhone-16-Pro-hero-geo-240909-lp.jpg.og.jpg?202508281637",
    stock: 15
  },
  {
    id: "samsung-s24-ultra",
    name: "Samsung Galaxy S24 Ultra",
    description: "Dynamic AMOLED 2X display, 200MP camera, 512GB storage",
    category: "Phones",
    price: 10999900,
    rating: 4.8,
    imageUrl: "https://images.samsung.com/is/image/samsung/assets/in/smartphones/galaxy-s24-ultra/images/galaxy-s24-ultra-highlights-form-factor-start-mo_1.jpg?imbypass=true",
    stock: 20
  },
  {
    id: "nothing-phone",
    name: "Nothing A Phone",
    description: "Sleek design, Snapdragon 8 series, 256GB storage",
    category: "Phones",
    price: 4999900,
    rating: 4.5,
    imageUrl: "https://hurtel.com/data/include/img/news/1663248555.jpg",
    stock: 25
  },
  {
    id: "google-pixel-9",
    name: "Google Pixel 9",
    description: "Pure Android experience, 12GB RAM, 256GB storage",
    category: "Phones",
    price: 6999900,
    rating: 4.6,
    imageUrl: "https://media.wired.com/photos/67edf201cb5cd1bc48448b33/master/w_1600%2Cc_limit/Google-Pixel-9-Official-Case-Reviewer-Photo-SOURCE-Julian-Chokkattu-(no-border).jpg",
    stock: 18
  },
  {
    id: "xiaomi-mi-14",
    name: "Xiaomi Mi 14",
    description: "120Hz AMOLED, Snapdragon 8+, 128GB storage",
    category: "Phones",
    price: 3999900,
    rating: 4.4,
    imageUrl: "https://m.media-amazon.com/images/I/51wCsSph2UL.jpg",
    stock: 30
  },
  {
    id: "poco-x5-pro",
    name: "Poco X5 Pro",
    description: "120Hz AMOLED, MediaTek Dimensity 9200+, 256GB",
    category: "Phones",
    price: 3499900,
    rating: 4.3,
    imageUrl: "https://m.media-amazon.com/images/I/51dGqSFNrDL._UF1000,1000_QL80_.jpg",
    stock: 35
  },
  {
    id: "vivo-v30-pro",
    name: "Vivo V30 Pro",
    description: "AMOLED, Snapdragon 8 Gen 2, 256GB storage",
    category: "Phones",
    price: 4499900,
    rating: 4.4,
    imageUrl: "https://m.media-amazon.com/images/I/41T2+zcSoaL.jpg_BO30,255,255,255_UF900,850_SR1910,1000,0,C_QL100_.jpg",
    stock: 22
  },
  {
    id: "oppo-find-n3-flip",
    name: "Oppo Find N3 Flip",
    description: "Innovative flip design, Snapdragon 8+, 512GB",
    category: "Phones",
    price: 7499900,
    rating: 4.5,
    imageUrl: "https://image.oppo.com/content/dam/oppo/in/mkt/smartphone/card-image/find-n3-flip.jpg.thumb.webp",
    stock: 12
  },

  // Laptops Section
  {
    id: "macbook-air-m4",
    name: "MacBook Air M4",
    description: "Lightweight Apple laptop, M4 chip, 16GB RAM, 512GB SSD",
    category: "Laptops",
    price: 13999900,
    rating: 4.9,
    imageUrl: "https://techtoro.io/image/cache/catalog/Blogs/macbook%20m4%20news/mac-air-m4-1920x1080.jpg",
    stock: 10
  },
  {
    id: "lenovo-thinkpad-t480s",
    name: "Lenovo ThinkPad T480s",
    description: "Intel i7, 16GB RAM, 512GB SSD, Business Laptop",
    category: "Laptops",
    price: 8999900,
    rating: 4.6,
    imageUrl: "https://images-cdn.ubuy.co.in/641a0b8bfb2d784c8a1f8362-lenovo-thinkpad-t480s-windows-10-pro.jpg",
    stock: 15
  },
  {
    id: "samsung-galaxy-book-pro-360",
    name: "Samsung Galaxy Book Pro 360",
    description: "13.3\" AMOLED, 16GB RAM, 512GB SSD, Touchscreen",
    category: "Laptops",
    price: 9999900,
    rating: 4.7,
    imageUrl: "https://techcrunch.com/wp-content/uploads/2021/04/Galaxy_Book_Pro_360_13inch_MysticBronze_WiFi_D9_S_Pen_210416093710.jpg",
    stock: 12
  },
  {
    id: "hp-ryzen-5",
    name: "HP 15.6\" Ryzen 5",
    description: "8GB RAM, 256GB SSD, FHD display",
    category: "Laptops",
    price: 5499900,
    rating: 4.3,
    imageUrl: "https://images-cdn.ubuy.co.in/65f2705ce2164e61746dd058-hp-15-6-ryzen-5-8gb-256gb-laptop-rose.jpg",
    stock: 25
  },
  {
    id: "dell-tributo-platinum",
    name: "Dell Tributo Platinum",
    description: "Intel i7, 16GB RAM, 1TB SSD, 15.6\" FHD",
    category: "Laptops",
    price: 10500000,
    rating: 4.6,
    imageUrl: "https://www.dell.com/wp-uploads/2024/01/Tributo-Platinum-v2.jpg",
    stock: 8
  },
  {
    id: "asus-rog-gaming",
    name: "ASUS ROG 15.6\" 2019 Gaming Laptop",
    description: "8GB RAM, 512GB SSD, RTX 2060, 144Hz",
    category: "Laptops",
    price: 9999900,
    rating: 4.5,
    imageUrl: "https://m.media-amazon.com/images/I/51ZOFgc-4yL.jpg",
    stock: 18
  },
  {
    id: "hp-victus-ryzen",
    name: "HP Victus AMD Ryzen 5 5600H",
    description: "8GB DDR4, 512GB SSD, 144Hz IPS, RTX 3050",
    category: "Laptops",
    price: 7999900,
    rating: 4.4,
    imageUrl: "https://m.media-amazon.com/images/I/41levGXUOaL.jpg",
    stock: 20
  },
  {
    id: "asus-vivobook-go",
    name: "ASUS Vivobook Go 15 2023",
    description: "8GB RAM, 512GB SSD, 15.6\" FHD",
    category: "Laptops",
    price: 4999900,
    rating: 4.2,
    imageUrl: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcRYw33prvePmAJpOernOVagvjLBSbmPUsqPyG3L7g6CWkqmAdYcXw80siKDwi5YV58nZk0lMIp2LlNeNITOEFh-GE9YxXsTmW-HLGXMeHYN43nWDXJ0Ob6TrXg",
    stock: 30
  },

  // Watches Section
  {
    id: "longines-spirit-zulu",
    name: "LONGINES SPIRIT ZULU TIME",
    description: "Automatic watch, 39mm stainless steel & ceramic bezel",
    category: "Watches",
    price: 20000000,
    rating: 4.8,
    imageUrl: "https://api.ecom.longines.com/media/catalog/product/w/a/watch-collection-longines-spirit-zulu-time-l3-802-4-60-6-1747056705-hero.png?&w=1920",
    stock: 5
  },
  {
    id: "maxima-gold-men",
    name: "Maxima GOLD Men 69100CMGY",
    description: "Gold Dial, Analogue, Stainless Steel Strap",
    category: "Watches",
    price: 550000,
    rating: 4.2,
    imageUrl: "https://www.maximawatches.com/cdn/shop/files/69100CMGY.jpg?v=1739601046",
    stock: 15
  },
  {
    id: "iik-collection-analogue",
    name: "IIK COLLECTION Analogue",
    description: "Round Dial, Stainless Steel, Long Battery Life",
    category: "Watches",
    price: 280000,
    rating: 4.0,
    imageUrl: "https://m.media-amazon.com/images/I/61GsOX4QIlL._SX679_.jpg",
    stock: 25
  },
  {
    id: "golden-watch-analog",
    name: "Golden Watch Analog",
    description: "Real Gold Plated, Black Diamond Dial",
    category: "Watches",
    price: 450000,
    rating: 4.1,
    imageUrl: "https://rukminim2.flixcart.com/image/704/844/xif0q/watch/k/r/b/1-superb-looks-real-gold-plated-in-black-diomond-dial-watches-original-imah8z25mrezhuvs.jpeg?q=90&crop=false",
    stock: 20
  },
  {
    id: "timex-marlin-silver",
    name: "Timex Marlin Men Silver-Tone",
    description: "Stainless Steel Dial, Classic Analog",
    category: "Watches",
    price: 750000,
    rating: 4.4,
    imageUrl: "https://shop.timexindia.com/cdn/shop/files/TW2W10400_500x.jpg?v=1695633508",
    stock: 18
  },
  {
    id: "casio-vintage-b640",
    name: "Casio Vintage B640WC-5A",
    description: "Digital, Retro Style, Stainless Steel",
    category: "Watches",
    price: 300000,
    rating: 4.3,
    imageUrl: "https://www.casio.com/content/dam/casio/product-info/locales/in/en/timepiece/product/watch/B/B6/B64/B640WC-5A/assets/B640WC-5A_Seq1.jpg.transform/main-visual-sp/image.jpg",
    stock: 30
  },

  // Fans Section
  {
    id: "wooden-ceiling-fan-36",
    name: "36\" Wooden Ceiling Fan",
    description: "Indoor/Outdoor, 3 Solid Wood Blades, Remote Control",
    category: "Fans",
    price: 850000,
    rating: 4.5,
    imageUrl: "https://images-cdn.ubuy.co.in/663ab7ef7e4a712400214cd3-36-ceiling-fan-with-lighting-remote.jpg",
    stock: 12
  },
  {
    id: "longway-aero-1200mm",
    name: "LONGWAY Aero 1200mm BLDC",
    description: "5 Star Rated, Ultra High Speed, Anti-Dust",
    category: "Fans",
    price: 650000,
    rating: 4.4,
    imageUrl: "https://m.media-amazon.com/images/I/61dPZLYC-SL._UF894,1000_QL80_.jpg",
    stock: 20
  },
  {
    id: "usha-racer-1200mm",
    name: "Usha Racer 1200MM",
    description: "400RPM, High Speed, Brown, Indoor Use",
    category: "Fans",
    price: 420000,
    rating: 4.2,
    imageUrl: "https://m.media-amazon.com/images/I/51KQp7ArUPL.jpg",
    stock: 25
  },

  // Fashion Section
  {
    id: "men-polo-tshirt-grey",
    name: "Men Solid Slim Fit Polo T-shirt",
    description: "Premium cotton, slim fit, iron grey, breathable fabric",
    category: "Fashion",
    price: 120000,
    rating: 4.3,
    imageUrl: "https://www.technosport.in/cdn/shop/files/OR81IronGrey_1.jpg?v=1738839831&width=1206",
    stock: 50
  },
  {
    id: "z3-polo-white-tailored",
    name: "Z3 Polo Garment Dyed White Solid Tailored Fit T-Shirt",
    description: "100% cotton, tailored fit, garment-dyed for soft finish, breathable",
    category: "Fashion",
    price: 150000,
    rating: 4.4,
    imageUrl: "https://www.zodiaconline.com/media/catalog/product/z/3/z3_t_shirts_polo_ss25_zrs_001_zrs_solid_100_cotton_hsnc_cac_white_00_ab_a_01_c_01_ai.jpg?resize.width=500",
    stock: 40
  }
];


