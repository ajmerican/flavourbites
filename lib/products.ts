export type Product = {
  slug: string;
  name: string;
  subtitle: string;
  image: string;
  price: number;
  size: string;
  tone: "gold" | "green" | "cocoa" | "blue";
  summary: string;
  ingredients: string;
  directions: string;
  badges: string[];
};

export const products: Product[] = [
  {
    slug: "golden-turmeric-latte-mix",
    name: "Golden Turmeric",
    subtitle: "Latte Mix",
    image: "/images/turmeric-label.png",
    price: 18.99,
    size: "100 g · 3.53 oz",
    tone: "gold",
    summary: "A warm, aromatic premium spice blend for a beautifully comforting café-style latte.",
    ingredients: "Turmeric, ginger, cinnamon, cardamom, saffron, black pepper and sea salt.",
    directions: "Boil ½ tablespoon for 5 minutes with 250 ml of your preferred milk. Sweeten to taste, strain and enjoy.",
    badges: ["No added sugar", "Made in Canada", "Sweeten your way"]
  },
  {
    slug: "matcha-latte-mix",
    name: "Matcha",
    subtitle: "Latte Mix",
    image: "/images/matcha-label.png",
    price: 18.99,
    size: "100 g · 3.53 oz",
    tone: "green",
    summary: "Premium matcha with non-dairy creamer, natural vanilla and sea salt for a smooth, rich cup.",
    ingredients: "Premium matcha green tea powder, premium non-dairy creamer, natural vanilla flavour and sea salt.",
    directions: "Whisk with hot water or your preferred milk. Sweeten to taste and enjoy warm or iced.",
    badges: ["No added sugar", "Rich & creamy", "Premium matcha"]
  },
  {
    slug: "dubai-pistachio-kunafa-chocolate",
    name: "Dubai Chocolate",
    subtitle: "Pistachio Kunafa",
    image: "/images/chocolate-packaging.png",
    price: 10.99,
    size: "50 g · 1.76 oz",
    tone: "cocoa",
    summary: "Smooth chocolate with a crisp pistachio-kunafa inspired centre and a richly layered bite.",
    ingredients: "Refer to the final production package for the complete ingredient and allergen statement.",
    directions: "Store in a cool, dry place and enjoy at room temperature.",
    badges: ["Pistachio centre", "Made in Canada", "Gift ready"]
  },
  {
    slug: "dessert-experience-box",
    name: "Dessert Experience",
    subtitle: "Signature Gift Box",
    image: "/images/gift-box-design.png",
    price: 42.99,
    size: "Three full-size products",
    tone: "blue",
    summary: "A curated gift-ready collection featuring turmeric latte, matcha latte and Dubai chocolate.",
    ingredients: "Each product is individually packaged. Review each package before consuming.",
    directions: "Prepare and enjoy each item according to its individual package directions.",
    badges: ["Three full-size products", "Gift ready", "Premium collection"]
  }
];
