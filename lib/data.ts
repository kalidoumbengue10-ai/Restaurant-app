export const categories = ["Tout", "Sénégalais", "Grillades", "Jus & Boissons", "Pastries"];

export interface Product {
  id: string;
  name: string;
  price: number;
  rating: number;
  image: string;
  category: string;
  description: string;
  options: { name: string; price: number }[];
}

export const suggestions: Product[] = [
  { 
    id: "thieb", 
    name: "Thiéboudienne Penda Mbaye", 
    price: 3500, 
    rating: 4.9, 
    image: "/images/hero-teranga.png", 
    category: "Sénégalais",
    description: "Le plat national sénégalais emblématique. Riz rouge savoureux mijoté dans une sauce tomate riche, servi avec du thiof frais (mérou bronzé), manioc, carotte, chou et aubergine, agrémenté de piment et de beugue (feuilles de bissap de mer).",
    options: [{ name: "Sans piment", price: 0 }, { name: "Riz double", price: 500 }, { name: "Légumes supplémentaires", price: 300 }]
  },
  { 
    id: "yassa", 
    name: "Yassa Poulet au Feu de Bois", 
    price: 3000, 
    rating: 4.8, 
    image: "/images/yassa.png", 
    category: "Sénégalais",
    description: "Poulet mariné au citron vert, ail, gingembre et moutarde, grillé au charbon de bois puis mijoté avec une abondance d'oignons caramélisés fondants, olives et piments doux. Servi avec du riz blanc parfumé.",
    options: [{ name: "Sans moutarde", price: 0 }, { name: "Poulet entier", price: 2500 }]
  },
  { 
    id: "dibi", 
    name: "Dibi Mouton Traditionnel", 
    price: 6000, 
    rating: 4.7, 
    image: "/images/dibi.png", 
    category: "Grillades",
    description: "Morceaux de viande de mouton tendres assaisonnés de secret de cuisine locale, grillés à haute température sur de la braise ardente, servis sur du papier kraft avec des oignons croquants et une moutarde de piment d'Afrique.",
    options: [{ name: "Avec frites", price: 1000 }, { name: "Double oignons", price: 200 }]
  },
  { 
    id: "pastels", 
    name: "Pastels de Poisson Dorés", 
    price: 1500, 
    rating: 4.6, 
    image: "/images/pastels.png", 
    category: "Sénégalais",
    description: "Beignets croustillants farcis d'une farce de poisson de roche épicée et parfumée à la coriandre locale, servis chauds accompagnés d'une sauce tomate-oignon légèrement piquante pour le dipping.",
    options: [{ name: "Sauce douce", price: 0 }]
  },
  { 
    id: "bissap", 
    name: "Jus de Bissap Royal", 
    price: 1000, 
    rating: 4.9, 
    image: "https://picsum.photos/seed/bissap/500/400", 
    category: "Jus & Boissons",
    description: "Boisson rafraîchissante traditionnelle sénégalaise préparée avec des fleurs d'hibiscus rouge séchées infusées, parfumée à la menthe fraîche (naana), à la fleur d'oranger et à l'ananas.",
    options: [{ name: "Moins sucré", price: 0 }, { name: "Format 1L", price: 1000 }]
  },
  { 
    id: "bouye", 
    name: "Jus de Bouye à la Vanille", 
    price: 1200, 
    rating: 4.8, 
    image: "https://picsum.photos/seed/bouye/500/400", 
    category: "Jus & Boissons",
    description: "Boisson onctueuse et veloutée fabriquée à partir de pain de singe (fruit du baobab), infusée à la vanille bourbon de Madagascar et au lait concentré sucré.",
    options: [{ name: "Avec de l'ananas", price: 200 }]
  }
];

export const productDetail = suggestions[0];

export const cartItems = [
  { id: "thieb", name: "Thiéboudienne Penda Mbaye", variant: "Riz double, Sans piment", price: 4000, quantity: 1, image: "/images/hero-teranga.png" },
  { id: "pastels", name: "Pastels de Poisson", variant: "Sauce douce", price: 1500, quantity: 2, image: "/images/pastels.png" },
  { id: "bissap", name: "Jus de Bissap Royal", variant: "Format standard", price: 1000, quantity: 2, image: "https://picsum.photos/seed/bissap/100/100" },
];

export interface Order {
  id: string;
  customerName: string;
  phone: string;
  items: { name: string; quantity: number; price: number }[];
  total: number;
  paymentMethod: "Wave" | "Orange Money" | "Free Money" | "Espèces";
  paymentStatus: "paid" | "pending" | "failed";
  status: "Nouvelle" | "Confirmée" | "En préparation" | "Prête" | "En livraison" | "Livrée" | "Annulée";
  address: string;
  createdTime: string;
  type: "Livraison" | "À emporter" | "Sur place";
}

export const initialOrders: Order[] = [
  {
    id: "TRG-7822",
    customerName: "Julie Martin",
    phone: "+221 77 123 45 67",
    items: [
      { name: "Thiéboudienne Penda Mbaye", quantity: 1, price: 4000 },
      { name: "Pastels de Poisson", quantity: 2, price: 1500 },
      { name: "Jus de Bissap Royal", quantity: 2, price: 1000 }
    ],
    total: 9000,
    paymentMethod: "Wave",
    paymentStatus: "paid",
    status: "En préparation",
    address: "Mermoz Extension, Villa 42, Dakar",
    createdTime: "Il y a 12 min",
    type: "Livraison"
  },
  {
    id: "TRG-7823",
    customerName: "Amadou Diallo",
    phone: "+221 78 554 99 11",
    items: [
      { name: "Dibi Mouton Traditionnel", quantity: 1, price: 7000 },
      { name: "Jus de Bouye à la Vanille", quantity: 1, price: 1200 }
    ],
    total: 8200,
    paymentMethod: "Orange Money",
    paymentStatus: "paid",
    status: "Nouvelle",
    address: "Almadies, Face Clinique des Mamelles, Dakar",
    createdTime: "Il y a 2 min",
    type: "Livraison"
  },
  {
    id: "TRG-7824",
    customerName: "Fatou Ndoye",
    phone: "+221 70 887 33 44",
    items: [
      { name: "Yassa Poulet au Feu de Bois", quantity: 2, price: 3000 }
    ],
    total: 6000,
    paymentMethod: "Espèces",
    paymentStatus: "pending",
    status: "Confirmée",
    address: "Dakar Plateau, 12 Rue Carnot",
    createdTime: "Il y a 25 min",
    type: "À emporter"
  }
];

export const stockIngredients = [
  { id: "riz", name: "Riz Brisé Parfumé", quantity: 150, unit: "kg", threshold: 30, state: "Ok" },
  { id: "thiof", name: "Poisson Thiof Frais", quantity: 12, unit: "kg", threshold: 10, state: "Ok" },
  { id: "oignons", name: "Oignons locaux (Sandiara)", quantity: 18, unit: "kg", threshold: 20, state: "Alerte" },
  { id: "agneau", name: "Viande de mouton de brousse", quantity: 45, unit: "kg", threshold: 15, state: "Ok" },
  { id: "hibiscus", name: "Fleurs d'Hibiscus séchées (Bissap)", quantity: 8, unit: "kg", threshold: 5, state: "Ok" },
  { id: "piment", name: "Piment antillais frais", quantity: 2, unit: "kg", threshold: 4, state: "Bas" }
];

export const initialReservations = [
  { id: "R-1", customerName: "Malick Fall", guests: 4, date: "Aujourd'hui", time: "13:30", table: "Table Teranga 1", status: "Confirmé" },
  { id: "R-2", customerName: "Khady Sylla", guests: 2, date: "Aujourd'hui", time: "20:00", table: "Salon Baobab", status: "En attente" },
  { id: "R-3", customerName: "Jean-Pierre", guests: 6, date: "Demain", time: "12:00", table: "Grande Table Plateau", status: "Confirmé" }
];
