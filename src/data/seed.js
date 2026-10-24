// Starting (demo) data for Kaarigar.
// Later the backend will return this data from the database.

// Product photos are free-to-use images from Pexels (pexels.com/license).
export function photo(id, width = 800) {
  return `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${width}`
}

export const categories = [
  { id: 'jewellery', image: photo(33154729, 400), name: 'Jewellery', icon: 'gem', color: '#FCD9B8' },
  { id: 'clothing', image: photo(20702676, 400), name: 'Clothing', icon: 'scarf', color: '#D6E9D2' },
  { id: 'footwear', image: photo(6387629, 400), name: 'Khussas & Footwear', icon: 'shoe', color: '#F9E4A6' },
  { id: 'home-decor', image: photo(31102561, 400), name: 'Home Décor', icon: 'lamp', color: '#FDE8D0' },
  { id: 'pottery', image: photo(18633243, 400), name: 'Pottery', icon: 'vase', color: '#C9DDF2' },
  { id: 'art', image: photo(34769256, 400), name: 'Art & Calligraphy', icon: 'frame', color: '#EAD3EF' },
  { id: 'gifts', image: photo(38687446, 400), name: 'Gifts', icon: 'gift', color: '#F6CACA' },
  { id: 'beauty', image: photo(6621497, 400), name: 'Bath & Beauty', icon: 'leaf', color: '#DCEFD9' },
  { id: 'bags', image: photo(32719962, 400), name: 'Bags & Purses', icon: 'bag', color: '#E8DFF5' },
]

export const cities = ['Lahore', 'Karachi', 'Islamabad', 'Multan', 'Hyderabad', 'Hala', 'Bahawalpur', 'Peshawar', 'Quetta', 'Faisalabad']

export const shops = [
  { id: 's1', cover: photo(37485307, 1600), name: 'Noor Jewels', ownerId: 'u2', city: 'Lahore', color: '#BE185D', since: 2024, status: 'approved', description: 'Kundan and oxidised jewellery made by Nasreen Akhtar and her daughters in Lahore.' },
  { id: 's2', cover: photo(6387629, 1600), name: 'Multani Khussa House', ownerId: 'u4', city: 'Multan', color: '#A16207', since: 2023, status: 'approved', description: 'Three generations of khussa makers from Multan. Every pair is stitched by hand with real tilla.' },
  { id: 's3', cover: photo(15898443, 1600), name: 'Kashi Kaar', ownerId: 'u5', city: 'Multan', color: '#1D4ED8', since: 2024, status: 'approved', description: 'Multani blue pottery shaped, painted and fired in Ustad Rafiq’s workshop.' },
  { id: 's4', cover: photo(37619027, 1600), name: 'Sindh Rang', ownerId: 'u6', city: 'Hala', color: '#9B1C1C', since: 2025, status: 'approved', description: 'Hand block-printed Ajrak from the famous workshops of Hala, Sindh.' },
  { id: 's5', cover: photo(16160327, 1600), name: 'Khat-e-Noor', ownerId: 'u7', city: 'Lahore', color: '#6D28D9', since: 2025, status: 'approved', description: 'Nastaliq and Naskh calligraphy on handmade paper, some with real gold leaf.' },
  { id: 's6', cover: photo(37757334, 1600), name: 'Rang Tanka', ownerId: 'u8', city: 'Bahawalpur', color: '#C2410C', since: 2024, status: 'approved', description: 'Phulkari embroidery by Shazia Bibi and six women from her village.' },
  { id: 's7', cover: photo(10155373, 1600), name: 'Desi Naturals', ownerId: 'u9', city: 'Islamabad', color: '#15803D', since: 2025, status: 'approved', description: 'Organic hair oils, ubtan and soaps made in small batches.' },
  { id: 's8', cover: photo(32972165, 1600), name: 'Rangeela Arts', ownerId: 'u10', city: 'Karachi', color: '#EA580C', since: 2023, status: 'approved', description: 'Hand-hammered copper, painted trays and truck-art inspired homeware by Ustad Bashir Ahmed in Karachi.' },
  { id: 's9', cover: photo(32822921, 1600), name: 'Thar Tanka', ownerId: 'u11', city: 'Hyderabad', color: '#7C3AED', since: 2025, status: 'approved', description: 'Handwoven and embroidered bags made by women artisans from Thar and Hyderabad.' },
  { id: 's10', cover: photo(31102561, 1600), name: 'Multan Crafts Co.', ownerId: 'u12', city: 'Multan', color: '#9A3412', since: 2024, status: 'approved', description: 'Mosaic glass and brass jaali lamps, made and assembled by hand in Multan.' },
  { id: 's11', cover: photo(30295975, 1600), name: 'Hooked by Hira', ownerId: 'u13', city: 'Karachi', color: '#DB2777', since: 2026, status: 'pending', description: 'Crochet toys and baby sets made at home in Karachi.' },
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
  p('p1', 's2', 'footwear', 'Handmade Golden Tilla Khussa', 2500, { image: photo(6387629), oldPrice: 3000, rating: 4.9, reviewCount: 312, stock: 22, createdAt: '2026-10-10', description: 'Traditional Multani khussa with golden tilla embroidery on soft leather. Cushioned sole for all-day comfort at weddings and Eid.' }),
  p('p2', 's3', 'pottery', 'Multani Blue Pottery Vases (Set of 3)', 3200, { image: photo(18633243), rating: 4.8, reviewCount: 128, freeDelivery: true, createdAt: '2026-10-18', description: 'Three hand-thrown vases painted in the classic Kashigari style with cobalt blue on white glaze. Heights 18, 22 and 26 cm.' }),
  p('p3', 's1', 'jewellery', 'Kundan Necklace & Jhumka Set with Tikka', 4800, { image: photo(33154729), oldPrice: 5500, rating: 4.9, reviewCount: 540, freeDelivery: true, createdAt: '2026-10-05', description: 'Kundan necklace with matching jhumkay and maang tikka, set with pearls and turquoise drops. Perfect for mehndi and baraat.' }),
  p('p4', 's6', 'clothing', 'Hand-embroidered Phulkari Shawl', 5500, { image: photo(39375026), rating: 4.7, reviewCount: 86, stock: 6, createdAt: '2026-10-20', description: 'Black wool-blend shawl covered in hand-stitched floral embroidery. Each shawl takes about three weeks to complete by hand.' }),
  p('p5', 's10', 'home-decor', 'Mosaic Glass Hanging Lamp', 6900, { image: photo(31102561), rating: 4.8, reviewCount: 64, stock: 4, createdAt: '2026-09-22', description: 'Hanging lamp made from hundreds of hand-cut glass pieces set into a brass frame. Casts warm, colourful patterns across the room. Bulb holder included.' }),
  p('p6', 's8', 'home-decor', 'Hand-hammered Copper Chai Kettle', 4200, { image: photo(38495637), rating: 4.7, reviewCount: 210, createdAt: '2026-09-14', description: 'Pure copper kettle shaped and hammered by hand, with a brass finial. Decorative and fully usable on the stove.' }),
  p('p7', 's4', 'clothing', 'Hand-block Ajrak Shawl', 3900, { image: photo(36703928), rating: 4.8, reviewCount: 172, freeDelivery: true, createdAt: '2026-09-30', description: 'Pure cotton ajrak printed by hand with natural indigo and madder dyes in Hala, Sindh. 2.5 metres long.' }),
  p('p8', 's7', 'beauty', 'Organic Rosemary Hair Oil', 1200, { image: photo(4408447), oldPrice: 1500, rating: 4.6, reviewCount: 430, stock: 40, createdAt: '2026-10-12', description: 'Cold-pressed oil blend with rosemary, amla and coconut in a 30 ml glass dropper bottle. No added fragrance or chemicals.' }),
  p('p9', 's5', 'art', 'Arabic Calligraphy in Gold Frame', 4500, { image: photo(34769256), rating: 4.9, reviewCount: 210, createdAt: '2026-08-28', description: 'Hand-written calligraphy on cream wasli paper, mounted in a carved gold frame. 16 x 20 inches, ready to hang.' }),
  p('p10', 's9', 'bags', 'Handwoven Patchwork Clutch', 1800, { image: photo(15568698), rating: 4.7, reviewCount: 95, createdAt: '2026-10-01', description: 'Hand-woven clutch made from small leather and fabric squares, with a sturdy strap and zip pocket inside.' }),
  p('p11', 's1', 'jewellery', 'Oxidised Silver Jhumkay', 1200, { image: photo(35137273), rating: 4.8, reviewCount: 380, stock: 30, createdAt: '2026-09-18', description: 'Lightweight oxidised silver jhumkay with detailed dome work. Comfortable for daily wear and festive outfits.' }),
  p('p12', 's2', 'footwear', 'Embroidered Velvet Khussa', 4200, { image: photo(18337713), rating: 4.8, reviewCount: 74, createdAt: '2026-10-15', description: 'Navy velvet khussa with hand-embroidered roses in silk thread. Soft leather lining and flat padded sole.' }),
  p('p13', 's3', 'pottery', 'Hand-painted Ceramic Plates (Set of 4)', 4600, { image: photo(30259432), rating: 4.7, reviewCount: 58, freeDelivery: true, createdAt: '2026-09-09', description: 'Four hand-painted ceramic plates with blue line drawings. Each one is different. Food-safe glaze, 20 cm across.' }),
  p('p14', 's6', 'bags', 'Embroidered Floral Tote Bag', 1900, { image: photo(32719962), rating: 4.6, reviewCount: 66, createdAt: '2026-10-08', description: 'Heavy cotton tote with hand-stitched floral embroidery. Big enough for a laptop, books and daily essentials.' }),
  p('p15', 's5', 'art', 'Gold Calligraphy Wall Hanging', 8900, { image: photo(32323933), rating: 5.0, reviewCount: 31, stock: 3, createdAt: '2026-10-19', description: 'Brass wall hanging with cut-out calligraphy and a gold silk tassel. Hand-polished and lacquered so it stays bright.' }),
  p('p16', 's7', 'beauty', 'Natural Handmade Soap (Pack of 3)', 950, { image: photo(6621497), rating: 4.7, reviewCount: 260, stock: 50, createdAt: '2026-09-25', description: 'Three cold-process soap bars with charcoal, oats and goat milk. Gentle on skin and made in small batches.' }),
  p('p17', 's8', 'home-decor', 'Hand-painted Wooden Serving Tray', 2600, { image: photo(10545939), rating: 4.6, reviewCount: 88, createdAt: '2026-09-02', description: 'Solid wood serving tray with a hand-painted floral panel and cut-out handles. 40 x 28 cm.' }),
  p('p18', 's4', 'home-decor', 'Hand-embroidered Cushion Covers (Set of 2)', 2100, { image: photo(11911940), rating: 4.7, reviewCount: 104, createdAt: '2026-10-03', description: 'Two cotton cushion covers with hand-stitched floral embroidery and a hidden zip. Fits 18 x 18 inch fillers.' }),
  p('p19', 's1', 'jewellery', 'Gold-plated Kundan Bangles (Pair)', 2300, { image: photo(37485307), rating: 4.6, reviewCount: 150, createdAt: '2026-08-20', description: 'A pair of gold-plated bangles with fine filigree work. Available in sizes 2.4, 2.6 and 2.8.' }),
  p('p20', 's9', 'bags', 'Embroidered Patchwork Shoulder Bag', 3400, { image: photo(19269999), rating: 4.5, reviewCount: 41, createdAt: '2026-10-17', description: 'Colourful shoulder bag made from embroidered fabric patches, with tassels and an adjustable strap.' }),
  p('p21', 's10', 'home-decor', 'Brass Jaali Table Lamp', 3800, { image: photo(9362719), rating: 4.7, reviewCount: 52, createdAt: '2026-10-11', description: 'Hand-punched brass table lamp that throws a lace-like pattern of light. 35 cm tall with an inline switch.' }),
  p('p22', 's8', 'gifts', 'Decorated Mehndi Thaal', 2700, { image: photo(36581293), rating: 4.6, reviewCount: 48, createdAt: '2026-10-21', description: 'Steel thaal decorated with coloured rice art, ready for mehndi and dholki. Can be customised with names.' }),
  p('p23', 's6', 'clothing', 'Hand-embroidered Red Kurti', 4400, { image: photo(20702676), rating: 4.7, reviewCount: 39, createdAt: '2026-10-14', description: 'Soft cotton-silk kurti in deep red with tonal hand embroidery on the neckline. Sizes S to XL.' }),
  p('p24', 's7', 'gifts', 'Eid Gift Box Set', 3500, { image: photo(38687446), oldPrice: 4000, rating: 4.8, reviewCount: 70, freeDelivery: true, createdAt: '2026-10-22', description: 'Hand-painted gift boxes filled with soap, hair oil and a scented candle. A thoughtful Eid gift, ready to give.' }),
  p('p25', 's11', 'gifts', 'Crochet Bunny Toy', 1400, { image: photo(30295975), rating: 4.9, reviewCount: 12, createdAt: '2026-10-22', description: 'Soft crochet bunny made with baby-safe cotton yarn. 20 cm tall.' }),
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
    items: [{ productId: 'p3', name: 'Kundan Necklace & Jhumka Set with Tikka', price: 4800, qty: 1, shopId: 's1' }],
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
    items: [{ productId: 'p19', name: 'Gold-plated Kundan Bangles (Pair)', price: 2300, qty: 1, shopId: 's1' }],
    subtotal: 2300, shipping: 200, discount: 0, total: 2500,
  },
]

// Photographers on Pexels whose photos are used on the site (shown on the Photo credits page)
export const photoCredits = [
  ['Baljit Johal', 6387629], ['Sứ Bát Tràng', 18633243], ['Ishhaara Jewellery', 33154729], ['Javier Hernández Montes', 39375026],
  ['Amol Nakve', 31102561], ['Valeria Boltneva', 38495637], ['Hamza Awan', 36703928], ['Paula Francis', 4408447],
  ['Betül Nur Akyürek', 34769256], ['Yusuf Çelik', 15568698], ['Mayank Dixit', 35137273], ['Sayefotograf', 18337713],
  ['TIVASEE', 30259432], ['Gizem Gökce', 32719962], ["Nuri's Faith", 32323933], ['Monstera Production', 6621497],
  ['Mohamed Zekry', 10545939], ['Mathias Reding', 11911940], ['Kunal Lakhotia', 37485307], ['Ali Can Demir', 19269999],
  ['Abdelmoughit Lahbabi', 9362719], ['The Amritdev', 36581293], ['Muneeb Malhotra', 20702676], ['Lena Netkach', 38687446],
  ['Nur Tok', 30295975], ['Muhammad Khawar Nazir', 37757334], ['Ahmar Graphy', 32822921], ['Elements Interactive', 15898443],
  ['Muhammad Khawar Nazir', 37619027], ['Edanur Sonkaya', 16160327], ['Feyza Yıldırım', 10155373], ['Imtiaz Ahmed', 32972165],
  ['Javier Balseiro', 34230986], ['Shamshir Lall', 40303896],
]
