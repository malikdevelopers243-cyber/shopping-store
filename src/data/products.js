
    const reviewSamples = [
  {
    id: 1,
    user: "Ahmed Khan",
    rating: 5,
    text: "Excellent product! Highly recommended.",
    date: "2024-05-15"
  },
  {
    id: 2,
    user: "Fatima Ali",
    rating: 4,
    text: "Good quality, fast delivery.",
    date: "2024-05-10"
  },
  {
    id: 3,
    user: "Hassan Malik",
    rating: 5,
    text: "Best purchase ever!",
    date: "2024-05-05"
  }];

  
  const rawProducts = [
  {
      id: 1,
      name: 'Premium Wireless Headphones',
      price: 8999,
      originalPrice: 12999,
      image: '/images/Headphones.png',
      category: 'Electronics',
      rating: 4.5,
      reviews: 324,
      discount: 30
    },
    {
      id: 2,
      name: 'Smart Watch Pro',
      price: 15999,
      originalPrice: 19999,
      image: '/images/watch.png',
      category: 'Electronics',
      rating: 4.7,
      reviews: 512,
      discount: 20
    },
    {
      id: 3,
      name: 'Leather Crossbody Bag',
      price: 3499,
      originalPrice: 5999,
      image: '/images/Bags.png',
      category: 'Fashion',
      rating: 4.3,
      reviews: 189,
      discount: 42
    },
    {
      id: 4,
      name: '4K Webcam',
      price: 5999,
      originalPrice: 8999,
      image: '/images/camera.png',
      category: 'Electronics',
      rating: 4.6,
      reviews: 276,
      discount: 33
    },
    {
      id: 5,
      name: 'Portable Phone Charger',
      price: 1999,
      originalPrice: 2999,
      image: '/images/charger.png',
      category: 'Accessories',
      rating: 4.4,
      reviews: 431,
      discount: 33
    },
    {
      id: 6,
      name: 'USB-C Hub',
      price: 2499,
      originalPrice: 3999,
      image: '/images/Usb.png',
      category: 'Accessories',
      rating: 4.5,
      reviews: 198,
      discount: 37
    },

  {
    id: 7,
    name: 'Gaming Mouse Wireless',
    price: 2999,
    originalPrice: 4999,
    image: '/images/mouse.png',
    category: 'Electronics',
    rating: 4.4,
    reviews: 245,
    discount: 40
  },
  {
    id: 8,
    name: 'HD Monitor 24 inch',
    price: 12999,
    originalPrice: 17999,
    image: '/images/monitor.png',
    category: 'Electronics',
    rating: 4.7,
    reviews: 389,
    discount: 27
  },
  {
    id: 9,
    name: 'Bluetooth Speaker Portable',
    price: 3999,
    originalPrice: 5999,
    image: '/images/bluetooth.png',
    category: 'Electronics',
    rating: 4.5,
    reviews: 312,
    discount: 33
  },
  {
    id: 10,
    name: 'HD Webcam 1080p',
    price: 3499,
    originalPrice: 5499,
    image: '/images/webcam.png',
    category: 'Electronics',
    rating: 4.3,
    reviews: 156,
    discount: 36
  },

  {
    id: 11,
    name: 'Leather Crossbody Bag',
    price: 3499,
    originalPrice: 5999,
    image: '/images/bag.png',
    category: 'Fashion',
    rating: 4.3,
    reviews: 189,
    discount: 42
  },
  {
    id: 12,
    name: 'Casual T-Shirt Pack of 3',
    price: 1999,
    originalPrice: 3999,
     image: '/images/shirt.png',
    category: 'Fashion',
    rating: 4.4,
    reviews: 421,
    discount: 50
  },
  {
    id: 13,
    name: 'Premium Denim Jeans',
    price: 2999,
    originalPrice: 5999,
     image: '/images/denim.png',
    category: 'Fashion',
    rating: 4.6,
    reviews: 523,
    discount: 50
  },
  {
    id: 14,
    name: 'Formal Shirt Cotton',
    price: 1499,
    originalPrice: 2999,
    image: '/images/formal.png',
    category: 'Fashion',
    rating: 4.3,
    reviews: 267,
    discount: 50
  },
  {
    id: 15,
    name: 'Tracksuit Sports Wear',
    price: 2499,
    originalPrice: 4999,
    image: '/images/tracksuit.png',
    category: 'Fashion',
    rating: 4.5,
    reviews: 345,
    discount: 50
  },
  {
    id: 16,
    name: 'Casual Sneakers White',
    price: 2999,
    originalPrice: 5999,
     image: '/images/sneakers.png',
    category: 'Fashion',
    rating: 4.6,
    reviews: 478,
    discount: 50
  },
  {
    id: 17,
    name: 'Winter Jacket Warm',
    price: 3999,
    originalPrice: 7999,
    image: '/images/jacket.png',
    category: 'Fashion',
    rating: 4.4,
    reviews: 234,
    discount: 50
  },
  {
    id: 18,
    name: 'Cotton Socks Pack',
    price: 599,
    originalPrice: 1199,
    image: '/images/socks.png',
    category: 'Fashion',
    rating: 4.2,
    reviews: 189,
    discount: 50
  },
  {
    id: 19,
    name: 'Casual Shorts',
    price: 1299,
    originalPrice: 2299,
     image: '/images/shorts.png',
    category: 'Fashion',
    rating: 4.3,
    reviews: 156,
    discount: 43
  },
  {
    id: 20,
    name: 'Polo Shirt Pack of 2',
    price: 2199,
    originalPrice: 4399,
    image: '/images/polo.png',
    category: 'Fashion',
    rating: 4.4,
    reviews: 312,
    discount: 50
  },

  {
    id: 21,
    name: 'LED Bulb Smart 16W',
    price: 899,
    originalPrice: 1999,
    image: '/images/bulb.png',
    category: 'Home & Living',
    rating: 4.5,
    reviews: 412,
    discount: 55
  },
  {
    id: 22,
    name: 'Stainless Steel Water Bottle 1L',
    price: 1199,
    originalPrice: 2499,
    image: '/images/bottle.png',
    category: 'Home & Living',
    rating: 4.6,
    reviews: 534,
    discount: 52
  },
  {
    id: 23,
    name: 'Ceramic Tea Set 6 Cups',
    price: 1999,
    originalPrice: 3999,
     image: '/images/cup.png',
    category: 'Home & Living',
    rating: 4.4,
    reviews: 267,
    discount: 50
  },
  {
    id: 24,
    name: 'Non-Stick Cookware Set',
    price: 3499,
    originalPrice: 6999,
    image: '/images/cookware.png',
    category: 'Home & Living',
    rating: 4.5,
    reviews: 378,
    discount: 50
  },
  {
    id: 25,
    name: 'Bed Sheet Set Cotton',
    price: 1499,
    originalPrice: 2999,
    image: '/images/sheet.png',
    category: 'Home & Living',
    rating: 4.4,
    reviews: 289,
    discount: 50
  },
  {
    id: 26,
    name: 'Pillow Memory Foam',
    price: 1899,
    originalPrice: 3799,
     image: '/images/pillow.png',
    category: 'Home & Living',
    rating: 4.6,
    reviews: 445,
    discount: 50
  },
  {
    id: 27,
    name: 'Table Lamp Modern Design',
    price: 1699,
    originalPrice: 3399,
     image: '/images/lamp.png',
    category: 'Home & Living',
    rating: 4.3,
    reviews: 198,
    discount: 50
  },
  {
    id: 28,
    name: 'Vacuum Cleaner Cordless',
    price: 8999,
    originalPrice: 14999,
     image: '/images/vaccum.png',
    category: 'Home & Living',
    rating: 4.5,
    reviews: 234,
    discount: 40
  },
  {
    id: 29,
    name: 'Air Purifier HEPA Filter',
    price: 6999,
    originalPrice: 12999,
     image: '/images/purifier.png',
    category: 'Home & Living',
    rating: 4.6,
    reviews: 312,
    discount: 46
  },
  {
    id: 30,
    name: 'Microfiber Towels Set',
    price: 899,
    originalPrice: 1799,
      image: '/images/towels.png',
    category: 'Home & Living',
    rating: 4.4,
    reviews: 267,
    discount: 50
  },
  {
    id: 31,
    name: 'Gaming Headset RGB',
    price: 4999,
    originalPrice: 7999,
     image: '/images/headset.png',
    category: 'Gaming',
    rating: 4.7,
    reviews: 512,
    discount: 37
  },
  {
    id: 32,
    name: 'Gaming Mouse Pad XL',
    price: 1299,
    originalPrice: 2299,
    image: '/images/gaming mouse.png',
    category: 'Gaming',
    rating: 4.4,
    reviews: 334,
    discount: 43
  },
  {
    id: 33,
    name: 'Controller Gamepad Wireless',
    price: 3999,
    originalPrice: 5999,
   image: '/images/controller.png',
    category: 'Gaming',
    rating: 4.6,
    reviews: 423,
    discount: 33
  },
  {
    id: 34,
    name: 'Gaming Chair Ergonomic',
    price: 12999,
    originalPrice: 19999,
     image: '/images/gaming chair.png',
    category: 'Gaming',
    rating: 4.7,
    reviews: 567,
    discount: 35
  },
  {
    id: 35,
    name: 'Mechanical Gaming Keyboard',
    price: 6999,
    originalPrice: 10999,
     image: '/images/gaming keyboard.png',
    category: 'Gaming',
    rating: 4.6,
    reviews: 456,
    discount: 36
  },
  {
    id: 36,
    name: 'Gaming Monitor 144Hz',
    price: 16999,
    originalPrice: 24999,
     image: '/images/gaming monitor.png',
    category: 'Gaming',
    rating: 4.7,
    reviews: 378,
    discount: 32
  },
  {
    id: 37,
    name: 'Cooling Pad Laptop',
    price: 1999,
    originalPrice: 3999,
     image: '/images/cooling pad.png',
    category: 'Gaming',
    rating: 4.5,
    reviews: 245,
    discount: 50
  },
  {
    id: 38,
    name: 'RGB Light Strip Gaming',
    price: 1299,
    originalPrice: 2599,
     image: '/images/rgb.png',
    category: 'Gaming',
    rating: 4.4,
    reviews: 289,
    discount: 50
  },
  {
    id: 39,
    name: 'Desk Organizer Gaming',
    price: 1599,
    originalPrice: 2999,
      image: '/images/desk.png',
    category: 'Gaming',
    rating: 4.3,
    reviews: 167,
    discount: 46
  },
  {
    id: 40,
    name: 'Monitor Stand Adjustable',
    price: 2499,
    originalPrice: 4499,
     image: '/images/monitor stand.png',
    category: 'Gaming',
    rating: 4.5,
    reviews: 234,
    discount: 44
  },
  {
    id: 41,
    name: 'Notebook Set A4',
    price: 599,
    originalPrice: 1199,
     image: '/images/notebook.png',
    category: 'Books & Stationery',
    rating: 4.3,
    reviews: 234,
    discount: 50
  },
  {
    id: 42,
    name: 'Premium Pen Set 12 Colors',
    price: 999,
    originalPrice: 1999,
     image: '/images/premium pen.png',
    category: 'Books & Stationery',
    rating: 4.4,
    reviews: 312,
    discount: 50
  },
  {
    id: 43,
    name: 'Drawing Pad Sketchbook',
    price: 799,
    originalPrice: 1599,
     image: '/images/sketchbook.png',
    category: 'Books & Stationery',
    rating: 4.2,
    reviews: 156,
    discount: 50
  },
  {
    id: 44,
    name: 'Highlighter Pack Fluorescent',
    price: 399,
    originalPrice: 799,
     image: '/images/highlighter.png',
    category: 'Books & Stationery',
    rating: 4.3,
    reviews: 189,
    discount: 50
  },
  {
    id: 45,
    name: 'Desk Calendar 2024',
    price: 499,
    originalPrice: 999,
     image: '/images/calender.png',
    category: 'Books & Stationery',
    rating: 4.2,
    reviews: 123,
    discount: 50
  },
  {
    id: 46,
    name: 'Sticky Notes Assorted',
    price: 299,
    originalPrice: 599,
     image: '/images/stickynotes.png',
    category: 'Books & Stationery',
    rating: 4.1,
    reviews: 98,
    discount: 50
  },
  {
    id: 47,
    name: 'File Folder Set 10 Pack',
    price: 699,
    originalPrice: 1299,
     image: '/images/file folder.png',
    category: 'Books & Stationery',
    rating: 4.2,
    reviews: 145,
    discount: 46
  },
  {
    id: 48,
    name: 'Pencil Box Organizer',
    price: 899,
    originalPrice: 1799,
     image: '/images/pencil box.png',
    category: 'Books & Stationery',
    rating: 4.3,
    reviews: 178,
    discount: 50
  },
  {
    id: 49,
    name: 'Whiteboard Markers Set',
    price: 349,
    originalPrice: 699,
       image: '/images/whiteboard marker.png',
    category: 'Books & Stationery',
    rating: 4.2,
    reviews: 134,
    discount: 50
  },
  {
    id: 50,
    name: 'Graph Paper Pad',
    price: 299,
    originalPrice: 599,
   image: '/images/graph paper pad.png',
    category: 'Books & Stationery',
    rating: 4.1,
    reviews: 89,
    discount: 50
  },
  {
    id: 51,
    name: 'Face Wash Gel Cleanser',
    price: 599,
    originalPrice: 1199,
    image: '/images/facewash.png',
    category: 'Beauty & Skincare',
    rating: 4.5,
    reviews: 345,
    discount: 50
  },
  {
    id: 52,
    name: 'Moisturizer Cream 50ml',
    price: 799,
    originalPrice: 1599,
     image: '/images/cream.png',
    category: 'Beauty & Skincare',
    rating: 4.4,
    reviews: 289,
    discount: 50
  },
  {
    id: 53,
    name: 'Sunscreen SPF 50',
    price: 699,
    originalPrice: 1399,
     image: '/images/sunscreen.png',
    category: 'Beauty & Skincare',
    rating: 4.6,
    reviews: 412,
    discount: 50
  },
  {
    id: 54,
    name: 'Serum Vitamin C',
    price: 1299,
    originalPrice: 2599,
     image: '/images/serum.png',
    category: 'Beauty & Skincare',
    rating: 4.5,
    reviews: 267,
    discount: 50
  },
  {
    id: 55,
    name: 'Night Cream Hydrating',
    price: 899,
    originalPrice: 1799,
    image: '/images/night cream.png',
    category: 'Beauty & Skincare',
    rating: 4.4,
    reviews: 198,
    discount: 50
  },
  {
    id: 56,
    name: 'Lip Balm Pack of 3',
    price: 399,
    originalPrice: 799,
    image: '/images/lipbalm.png',
    category: 'Beauty & Skincare',
    rating: 4.3,
    reviews: 156,
    discount: 50
  },
  {
    id: 57,
    name: 'Hand Cream Lotion',
    price: 599,
    originalPrice: 1199,
    image: '/images/hand cream.png',
    category: 'Beauty & Skincare',
    rating: 4.2,
    reviews: 134,
    discount: 50
  },
  {
    id: 58,
    name: 'Facial Mask Sheet',
    price: 299,
    originalPrice: 599,
    image: '/images/face mask.png',
    category: 'Beauty & Skincare',
    rating: 4.3,
    reviews: 245,
    discount: 50
  },
  {
    id: 59,
    name: 'Body Lotion Moisturizing',
    price: 499,
    originalPrice: 999,
     image: '/images/body lotion.png',
    category: 'Beauty & Skincare',
    rating: 4.2,
    reviews: 167,
    discount: 50
  },
  {
    id: 60,
    name: 'Exfoliating Scrub',
    price: 699,
    originalPrice: 1299,
     image: '/images/scrub.png',
    category: 'Beauty & Skincare',
    rating: 4.4,
    reviews: 189,
    discount: 46
  },
  {
    id: 61,
    name: 'Sports Water Bottle 500ml',
    price: 599,
    originalPrice: 1199,
     image: '/images/sports water bottle.png',
    category: 'Sports & Outdoors',
    rating: 4.4,
    reviews: 312,
    discount: 50
  },
  {
    id: 62,
    name: 'Yoga Mat Non-Slip',
    price: 1499,
    originalPrice: 2999,
     image: '/images/yoga mat.png',
    category: 'Sports & Outdoors',
    rating: 4.5,
    reviews: 378,
    discount: 50
  },
  {
    id: 63,
    name: 'Dumbbells Set 10kg',
    price: 2999,
    originalPrice: 5999,
     image: '/images/dumbbells.png',
    category: 'Sports & Outdoors',
    rating: 4.6,
    reviews: 445,
    discount: 50
  },
  {
    id: 64,
    name: 'Resistance Bands Set',
    price: 899,
    originalPrice: 1799,
     image: '/images/bands.png',
    category: 'Sports & Outdoors',
    rating: 4.4,
    reviews: 267,
    discount: 50
  },
  {
    id: 65,
    name: 'Jump Rope Fitness',
    price: 499,
    originalPrice: 999,
    image: '/images/jump rope.png',
    category: 'Sports & Outdoors',
    rating: 4.3,
    reviews: 189,
    discount: 50
  },
  {
    id: 66,
    name: 'Running Shoes Sport',
    price: 3999,
    originalPrice: 7999,
     image: '/images/running shoes.png',
    category: 'Sports & Outdoors',
    rating: 4.6,
    reviews: 512,
    discount: 50
  },
  {
    id: 67,
    name: 'Gym Bag Sports',
    price: 1899,
    originalPrice: 3799,
    image: '/images/gym bag.png',
    category: 'Sports & Outdoors',
    rating: 4.3,
    reviews: 156,
    discount: 50
  },
  {
    id: 68,
    name: 'Bicycle Helmet Safety',
    price: 1499,
    originalPrice: 2999,
     image: '/images/helmet.png',
    category: 'Sports & Outdoors',
    rating: 4.5,
    reviews: 234,
    discount: 50
  },
  {
    id: 69,
    name: 'Skateboard Beginner',
    price: 3499,
    // originalPrice: 6999,
      image: '/images/skateboard.png',
    category: 'Sports & Outdoors',
    rating: 4.4,
    reviews: 178,
    // discount: 50
  },
  {
    id: 70,
    name: 'Camping Tent Outdoor',
    price: 4999,
    // originalPrice: 9999,
    image: '/images/tent.png',
    category: 'Sports & Outdoors',
    rating: 4.6,
    reviews: 267,
    // discount: 50
  }
];

const categoryDefaults = {
  Electronics: {
    defaultSpecs: {
      dimensions: '22 x 16 x 8 cm',
      weight: '480g',
      material: 'Aluminum & ABS',
      colorOptions: ['Black', 'Silver', 'White'],
    },
    seller: { name: 'TechBay', rating: 4.9, location: 'Karachi, Pakistan' },
    shipping: { deliveryTime: '2-4 business days', freeShippingThreshold: 3000 },
    tag: 'Top Tech',
    sizeOptions: ['One Size'],
  },
  Fashion: {
    defaultSpecs: {
      dimensions: 'Varies by style',
      weight: '200g',
      material: 'Cotton blend',
      colorOptions: ['Black', 'Navy', 'Grey', 'White'],
    },
    seller: { name: 'StyleStreet', rating: 4.8, location: 'Lahore, Pakistan' },
    shipping: { deliveryTime: '3-5 business days', freeShippingThreshold: 2000 },
    tag: 'Trending',
    sizeOptions: ['S', 'M', 'L', 'XL'],
  },
  Accessories: {
    defaultSpecs: {
      dimensions: '12 x 8 x 3 cm',
      weight: '120g',
      material: 'Plastic & Metal',
      colorOptions: ['Black', 'Grey', 'Blue'],
    },
    seller: { name: 'AccessoryHub', rating: 4.7, location: 'Islamabad, Pakistan' },
    shipping: { deliveryTime: '2-4 business days', freeShippingThreshold: 1500 },
    tag: 'Best Value',
    sizeOptions: ['One Size'],
  },
  'Home & Living': {
    defaultSpecs: {
      dimensions: '30 x 20 x 10 cm',
      weight: '650g',
      material: 'Stainless steel & glass',
      colorOptions: ['White', 'Silver', 'Matte Black'],
    },
    seller: { name: 'Home Essentials', rating: 4.6, location: 'Faisalabad, Pakistan' },
    shipping: { deliveryTime: '3-6 business days', freeShippingThreshold: 2500 },
    tag: 'Home Pick',
    sizeOptions: ['Standard'],
  },
  Gaming: {
    defaultSpecs: {
      dimensions: '28 x 16 x 9 cm',
      weight: '520g',
      material: 'ABS plastic & mesh',
      colorOptions: ['Black', 'RGB'],
    },
    seller: { name: 'GameZone', rating: 4.8, location: 'Karachi, Pakistan' },
    shipping: { deliveryTime: '2-3 business days', freeShippingThreshold: 2500 },
    tag: 'Gamer Favorite',
    sizeOptions: ['One Size'],
  },
  'Books & Stationery': {
    defaultSpecs: {
      dimensions: '23 x 17 x 2 cm',
      weight: '350g',
      material: 'Paper & cardboard',
      colorOptions: ['Blue', 'Green', 'Black'],
    },
    seller: { name: 'StudyMart', rating: 4.7, location: 'Multan, Pakistan' },
    shipping: { deliveryTime: '3-5 business days', freeShippingThreshold: 1500 },
    tag: 'Study Essentials',
    sizeOptions: ['One Size'],
  },
  'Beauty & Skincare': {
    defaultSpecs: {
      dimensions: '10 x 6 x 4 cm',
      weight: '180g',
      material: 'Glass & plastic',
      colorOptions: ['Pink', 'Green', 'White'],
    },
    seller: { name: 'GlowCare', rating: 4.9, location: 'Karachi, Pakistan' },
    shipping: { deliveryTime: '2-4 business days', freeShippingThreshold: 2000 },
    tag: 'Skin Favorite',
    sizeOptions: ['50ml', '100ml'],
  },
  'Sports & Outdoors': {
    defaultSpecs: {
      dimensions: '40 x 20 x 15 cm',
      weight: '700g',
      material: 'Polyester & rubber',
      colorOptions: ['Black', 'Red', 'Blue'],
    },
    seller: { name: 'ActiveLife', rating: 4.7, location: 'Peshawar, Pakistan' },
    shipping: { deliveryTime: '3-6 business days', freeShippingThreshold: 2500 },
    tag: 'Outdoor Ready',
    sizeOptions: ['Standard'],
  },
  default: {
    defaultSpecs: {
      dimensions: '25 x 18 x 8 cm',
      weight: '500g',
      material: 'Premium blend',
      colorOptions: ['Black', 'Grey'],
    },
    seller: { name: 'Everyday Store', rating: 4.6, location: 'Pakistan' },
    shipping: { deliveryTime: '3-5 business days', freeShippingThreshold: 2000 },
    tag: 'Popular',
    sizeOptions: ['Standard'],
  },
};

const sampleReviews = [
  {
    author: 'Ayesha',
    rating: 5,
    comment: 'Great quality and fast delivery. Truly exceeded expectations.',
    date: '2 days ago',
  },
  {
    author: 'Bilal',
    rating: 4,
    comment: 'Very good value for money. Comfortable and well-made.',
    date: '1 week ago',
  },
  {
    author: 'Sara',
    rating: 4,
    comment: 'The product arrived well-packed and works exactly as described.',
    date: '3 weeks ago',
  },
];

const buildProductDetails = (product) => {
  const category = categoryDefaults[product.category] || categoryDefaults.default;
  const stockQuantity = product.id % 7 === 0 ? 0 : 12 + (product.id % 5) * 6;
  const inStock = stockQuantity > 0;

  return {
    shortDescription: `${product.name} is a premium ${product.category.toLowerCase()} item designed for everyday use with a polished finish and dependable performance.`,
    fullDescription: `${product.name} delivers exceptional quality and a refined experience for modern shoppers. It combines reliable materials, smart design, and comfortable function so you can enjoy long-lasting performance every day. Perfect for both casual use and special occasions.`,
    specifications: {
      dimensions: category.defaultSpecs.dimensions,
      weight: category.defaultSpecs.weight,
      material: category.defaultSpecs.material,
      colorOptions: category.defaultSpecs.colorOptions.join(', '),
    },
    inStock,
    stockQuantity,
    seller: category.seller,
    shipping: category.shipping,
    returnPolicy: '30-day return',
    tags: [product.discount >= 40 ? 'Best Seller' : 'Trending', category.tag],
    images: [product.image, product.image, product.image],
    colorOptions: category.defaultSpecs.colorOptions,
    sizeOptions: product.category === 'Fashion' ? ['S', 'M', 'L', 'XL'] : category.sizeOptions,
    reviewSamples,
  };
};

export const FEATURED_PRODUCTS = rawProducts.map((product) => ({
  ...product,
  ...buildProductDetails(product),
}));

