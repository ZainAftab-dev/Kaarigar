// Starting (demo) data for Kaarigar.
// Later the backend will return this data from the database.

export const categories = [
  { id: 'jewellery', name: 'Jewellery', icon: 'gem', color: '#FCD9B8' },
  { id: 'clothing', name: 'Clothing', icon: 'scarf', color: '#D6E9D2' },
  { id: 'footwear', name: 'Khussas & Footwear', icon: 'shoe', color: '#F9E4A6' },
  { id: 'home-decor', name: 'Home Décor', icon: 'lamp', color: '#FDE8D0' },
  { id: 'pottery', name: 'Pottery', icon: 'vase', color: '#C9DDF2' },
  { id: 'art', name: 'Art & Calligraphy', icon: 'frame', color: '#EAD3EF' },
  { id: 'gifts', name: 'Gifts', icon: 'gift', color: '#F6CACA' },
  { id: 'beauty', name: 'Bath & Beauty', icon: 'leaf', color: '#DCEFD9' },
  { id: 'bags', name: 'Bags & Purses', icon: 'bag', color: '#E8DFF5' },
]

export const cities = ['Lahore', 'Karachi', 'Islamabad', 'Multan', 'Hyderabad', 'Hala', 'Bahawalpur', 'Peshawar', 'Quetta', 'Faisalabad']

export const shops = [
  { id: 's1', name: 'Noor Jewels', ownerId: 'u2', city: 'Lahore', color: '#BE185D', since: 2024, status: 'approved', description: 'Kundan and oxidised jewellery made by Nasreen Akhtar and her daughters in Lahore.' },
  { id: 's2', name: 'Multani Khussa House', ownerId: 'u4', city: 'Multan', color: '#A16207', since: 2023, status: 'approved', description: 'Three generations of khussa makers from Multan. Every pair is stitched by hand with real tilla.' },
  { id: 's3', name: 'Kashi Kaar', ownerId: 'u5', city: 'Multan', color: '#1D4ED8', since: 2024, status: 'approved', description: 'Multani blue pottery shaped, painted and fired in Ustad Rafiq’s workshop.' },
  { id: 's4', name: 'Sindh Rang', ownerId: 'u6', city: 'Hala', color: '#9B1C1C', since: 2025, status: 'approved', description: 'Hand block-printed Ajrak from the famous workshops of Hala, Sindh.' },
  { id: 's5', name: 'Khat-e-Noor', ownerId: 'u7', city: 'Lahore', color: '#6D28D9', since: 2025, status: 'approved', description: 'Nastaliq and Naskh calligraphy on handmade paper, some with real gold leaf.' },
  { id: 's6', name: 'Rang Tanka', ownerId: 'u8', city: 'Bahawalpur', color: '#C2410C', since: 2024, status: 'approved', description: 'Phulkari embroidery by Shazia Bibi and six women from her village.' },
  { id: 's7', name: 'Desi Naturals', ownerId: 'u9', city: 'Islamabad', color: '#15803D', since: 2025, status: 'approved', description: 'Organic hair oils, ubtan and soaps made in small batches.' },
  { id: 's8', name: 'Rangeela Arts', ownerId: 'u10', city: 'Karachi', color: '#EA580C', since: 2023, status: 'approved', description: 'Truck art kettles, trays and décor painted by Ustad Bashir Ahmed.' },
  { id: 's9', name: 'Thar Tanka', ownerId: 'u11', city: 'Hyderabad', color: '#7C3AED', since: 2025, status: 'approved', description: 'Sindhi mirror-work bags and clutches made by women artisans of Thar.' },
  { id: 's10', name: 'Multan Crafts Co.', ownerId: 'u12', city: 'Multan', color: '#9A3412', since: 2024, status: 'approved', description: 'Camel skin lamps with traditional naqashi painting.' },
  { id: 's11', name: 'Hooked by Hira', ownerId: 'u13', city: 'Karachi', color: '#DB2777', since: 2026, status: 'pending', description: 'Crochet toys and baby sets made at home in Karachi.' },
]

// Demo accounts (password for all: 123456)
export const users = [
  { id: 'u1', name: 'Ahmed Khan', email: 'buyer@kaarigar.pk', password: '123456', role: 'buyer', phone: '03001234567', city: 'Lahore' },
  { id: 'u2', name: 'Nasreen Akhtar', email: 'seller@kaarigar.pk', password: '123456', role: 'seller', phone: '03211234567', city: 'Lahore', shopId: 's1' },
  { id: 'u3', name: 'Admin', email: 'admin@kaarigar.pk', password: '123456', role: 'admin', phone: '03331234567', city: 'Lahore' },
  { id: 'u13', name: 'Hira Siddiqui', email: 'hira@kaarigar.pk', password: '123456', role: 'seller', phone: '03451234567', city: 'Karachi', shopId: 's11' },
]

const p = (id, shopId, categoryId, name, price, extra = {}) => ({
  id, shopId, categoryId, name, price,
  oldPrice: null, stock: 15, rating: 4.7, reviewCount: 40, freeDelivery: false,
  createdAt: '2026-09-01', image: '',
  description: 'Handmade with care by a verified Kaarigar artisan. Each piece is made by hand, so small differences in colour and pattern make it truly one of a kind.',
  ...extra,
})

export const products = [
  p('p1', 's2', 'footwear', 'Handmade Golden Tilla Khussa', 2500, { oldPrice: 3000, rating: 4.9, reviewCount: 312, stock: 22, createdAt: '2026-10-10', description: 'Traditional Multani khussa with golden tilla embroidery on soft leather. Cushioned sole for all-day comfort at weddings and Eid.' }),
  p('p2', 's3', 'pottery', 'Multani Blue Pottery Vase', 3200, { rating: 4.8, reviewCount: 128, freeDelivery: true, createdAt: '2026-10-18', description: 'Hand-thrown vase painted in the classic Kashigari style with cobalt blue and turquoise. Height 30 cm.' }),
  p('p3', 's1', 'jewellery', 'Kundan Jhumka Set with Tikka', 4800, { oldPrice: 5500, rating: 4.9, reviewCount: 540, freeDelivery: true, createdAt: '2026-10-05', description: 'Kundan jhumkay with a matching maang tikka, set with pearls and green stones. Perfect for mehndi and baraat.' }),
  p('p4', 's6', 'clothing', 'Phulkari Hand-embroidered Dupatta', 5500, { rating: 4.7, reviewCount: 86, stock: 6, createdAt: '2026-10-20', description: 'Saffron phulkari dupatta with silk thread embroidery. Takes about three weeks to complete by hand.' }),
  p('p5', 's10', 'home-decor', 'Camel Skin Lamp, Naqashi', 6900, { rating: 4.8, reviewCount: 64, stock: 4, createdAt: '2026-09-22' }),
  p('p6', 's8', 'gifts', 'Truck Art Chai Kettle', 2200, { rating: 4.7, reviewCount: 210, createdAt: '2026-09-14', description: 'Steel kettle hand-painted in bright Karachi truck art style. Decorative and fully usable.' }),
  p('p7', 's4', 'clothing', 'Hand-block Ajrak Shawl', 3900, { rating: 4.8, reviewCount: 172, freeDelivery: true, createdAt: '2026-09-30', description: 'Pure cotton ajrak printed by hand with natural indigo and madder dyes. 2.5 metres.' }),
  p('p8', 's7', 'beauty', 'Organic Rosemary Hair Oil', 1200, { oldPrice: 1500, rating: 4.6, reviewCount: 430, stock: 40, createdAt: '2026-10-12' }),
  p('p9', 's5', 'art', 'Ayat-ul-Kursi Nastaliq Frame', 4500, { rating: 4.9, reviewCount: 210, createdAt: '2026-08-28', description: 'Ayat-ul-Kursi written in Nastaliq on handmade wasli paper with gold leaf border. 16 x 20 inch frame.' }),
  p('p10', 's9', 'bags', 'Sindhi Mirror-work Clutch', 1800, { rating: 4.7, reviewCount: 95, createdAt: '2026-10-01' }),
  p('p11', 's1', 'jewellery', 'Oxidised Silver Jhumkay', 1200, { rating: 4.8, reviewCount: 380, stock: 30, createdAt: '2026-09-18' }),
  p('p12', 's2', 'footwear', 'Velvet Zardozi Khussa', 4200, { rating: 4.8, reviewCount: 74, createdAt: '2026-10-15' }),
  p('p13', 's3', 'pottery', 'Blue Pottery Dinner Plates (Set of 4)', 4600, { rating: 4.7, reviewCount: 58, freeDelivery: true, createdAt: '2026-09-09' }),
  p('p14', 's6', 'bags', 'Phulkari Tote Bag', 1900, { rating: 4.6, reviewCount: 66, createdAt: '2026-10-08' }),
  p('p15', 's5', 'art', 'Bismillah Calligraphy, Gold Leaf', 8900, { rating: 5.0, reviewCount: 31, stock: 3, createdAt: '2026-10-19' }),
  p('p16', 's7', 'beauty', 'Haldi & Ubtan Soap (Pack of 3)', 950, { rating: 4.7, reviewCount: 260, stock: 50, createdAt: '2026-09-25' }),
  p('p17', 's8', 'home-decor', 'Truck Art Serving Tray', 2600, { rating: 4.6, reviewCount: 88, createdAt: '2026-09-02' }),
  p('p18', 's4', 'home-decor', 'Ajrak Cushion Covers (Set of 2)', 2100, { rating: 4.7, reviewCount: 104, createdAt: '2026-10-03' }),
  p('p19', 's1', 'jewellery', 'Beaded Kundan Bangles', 2300, { rating: 4.6, reviewCount: 150, createdAt: '2026-08-20' }),
  p('p20', 's9', 'bags', 'Rilli Patchwork Backpack', 3400, { rating: 4.5, reviewCount: 41, createdAt: '2026-10-17' }),
  p('p21', 's10', 'home-decor', 'Camel Skin Table Lamp, Small', 3800, { rating: 4.7, reviewCount: 52, createdAt: '2026-10-11' }),
  p('p22', 's8', 'gifts', 'Wooden Mehndi Tray, Hand-painted', 2700, { rating: 4.6, reviewCount: 48, createdAt: '2026-10-21' }),
  p('p23', 's6', 'clothing', 'Phulkari Kurti, Cotton', 4400, { rating: 4.7, reviewCount: 39, createdAt: '2026-10-14' }),
  p('p24', 's7', 'gifts', 'Eid Gift Box, Self-care', 3500, { oldPrice: 4000, rating: 4.8, reviewCount: 70, freeDelivery: true, createdAt: '2026-10-22' }),
  p('p25', 's11', 'gifts', 'Crochet Bunny Toy', 1400, { rating: 4.9, reviewCount: 12, createdAt: '2026-10-22' }),
]

export const reviews = [
  { id: 'r1', productId: 'p1', name: 'Sana M.', rating: 5, text: 'Very comfortable and the tilla work is beautiful. Wore it at my cousin’s wedding.', date: '2026-10-12' },
  { id: 'r2', productId: 'p1', name: 'Usman R.', rating: 5, text: 'Exactly like the picture. Delivered to Karachi in 3 days.', date: '2026-10-05' },
  { id: 'r3', productId: 'p1', name: 'Ayesha K.', rating: 4, text: 'Lovely khussa, slightly tight at first but softened after two days.', date: '2026-09-28' },
  { id: 'r4', productId: 'p3', name: 'Mahnoor S.', rating: 5, text: 'Got so many compliments at my mehndi. Packaging was very good too.', date: '2026-10-09' },
  { id: 'r5', productId: 'p2', name: 'Bilal H.', rating: 5, text: 'Real Multani work. The colours are even better in person.', date: '2026-10-19' },
]

export const sampleOrders = [
  {
    id: 'KG-10421', userId: 'u1', date: '2026-10-18', status: 'Delivered', payment: 'Cash on Delivery',
    address: { name: 'Ahmed Khan', phone: '03001234567', city: 'Lahore', address: 'House 12, Street 4, Johar Town' },
    items: [{ productId: 'p3', name: 'Kundan Jhumka Set with Tikka', price: 4800, qty: 1, shopId: 's1' }],
    subtotal: 4800, shipping: 0, discount: 0, total: 4800,
  },
  {
    id: 'KG-10466', userId: 'u1', date: '2026-10-22', status: 'Shipped', payment: 'JazzCash',
    address: { name: 'Ahmed Khan', phone: '03001234567', city: 'Lahore', address: 'House 12, Street 4, Johar Town' },
    items: [
      { productId: 'p11', name: 'Oxidised Silver Jhumkay', price: 1200, qty: 2, shopId: 's1' },
      { productId: 'p8', name: 'Organic Rosemary Hair Oil', price: 1200, qty: 1, shopId: 's7' },
    ],
    subtotal: 3600, shipping: 0, discount: 0, total: 3600,
  },
  {
    id: 'KG-10478', userId: 'u1', date: '2026-10-23', status: 'Pending', payment: 'Cash on Delivery',
    address: { name: 'Ahmed Khan', phone: '03001234567', city: 'Lahore', address: 'House 12, Street 4, Johar Town' },
    items: [{ productId: 'p19', name: 'Beaded Kundan Bangles', price: 2300, qty: 1, shopId: 's1' }],
    subtotal: 2300, shipping: 200, discount: 0, total: 2500,
  },
]
