export interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
  images: string[];
  featured: boolean;
  specifications?: string[];
  materials?: string[];
}

export const products: Product[] = [
  {
    id: "3DP001",
    name: "Dragon Figurine",
    description: "Intricately detailed dragon figurine with articulated wings and realistic scales. Perfect for fantasy enthusiasts and collectors. Printed in high-quality PLA with exceptional detail resolution.",
    category: "Figurines",
    images: [
      "https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg",
      "https://images.pexels.com/photos/1029141/pexels-photo-1029141.jpeg",
      "https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg"
    ],
    featured: true,
    specifications: [
      "Height: 15cm",
      "Material: PLA+",
      "Layer Height: 0.1mm",
      "Infill: 20%"
    ],
    materials: ["PLA+", "PETG Available"]
  },
  {
    id: "3DP002",
    name: "Custom Phone Case",
    description: "Personalized phone case designed to fit your device perfectly. Available in multiple colors and patterns. Durable TPU material provides excellent protection while maintaining slim profile.",
    category: "Accessories",
    images: [
      "https://images.pexels.com/photos/404280/pexels-photo-404280.jpeg",
      "https://images.pexels.com/photos/1092644/pexels-photo-1092644.jpeg"
    ],
    featured: true,
    specifications: [
      "Material: TPU",
      "Thickness: 2mm",
      "Drop Protection: 2m",
      "Wireless Charging Compatible"
    ],
    materials: ["TPU", "PLA"]
  },
  {
    id: "3DP003",
    name: "Mechanical Gear Set",
    description: "Functional mechanical gear assembly demonstrating planetary gear systems. Educational and entertaining for engineering enthusiasts. All gears mesh perfectly and rotate smoothly.",
    category: "Educational",
    images: [
      "https://images.pexels.com/photos/159298/gears-cogs-machine-machinery-159298.jpeg",
      "https://images.pexels.com/photos/1108101/pexels-photo-1108101.jpeg"
    ],
    featured: false,
    specifications: [
      "Diameter: 10cm",
      "Material: PETG",
      "Gear Ratio: 3:1",
      "Moving Parts: 12"
    ],
    materials: ["PETG", "ABS"]
  },
  {
    id: "3DP004",
    name: "Decorative Vase",
    description: "Elegant spiral vase with geometric patterns. Modern design perfect for home decoration. Watertight construction suitable for fresh flowers.",
    category: "Home Decor",
    images: [
      "https://images.pexels.com/photos/1029141/pexels-photo-1029141.jpeg",
      "https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg"
    ],
    featured: true,
    specifications: [
      "Height: 25cm",
      "Material: PLA",
      "Wall Thickness: 1.5mm",
      "Watertight: Yes"
    ],
    materials: ["PLA", "PETG"]
  },
  {
    id: "3DP005",
    name: "Robot Action Figure",
    description: "Articulated robot figure with moveable joints and interchangeable parts. Inspired by classic mecha designs with modern 3D printing precision.",
    category: "Figurines",
    images: [
      "https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg",
      "https://images.pexels.com/photos/1092644/pexels-photo-1092644.jpeg"
    ],
    featured: false,
    specifications: [
      "Height: 20cm",
      "Material: ABS",
      "Articulation Points: 15",
      "Assembly Required: Yes"
    ],
    materials: ["ABS", "PETG"]
  },
  {
    id: "3DP006",
    name: "Desk Organizer",
    description: "Multi-compartment desk organizer with slots for pens, paper clips, and small office supplies. Clean, minimalist design that fits any workspace.",
    category: "Office",
    images: [
      "https://images.pexels.com/photos/1108101/pexels-photo-1108101.jpeg",
      "https://images.pexels.com/photos/159298/gears-cogs-machine-machinery-159298.jpeg"
    ],
    featured: false,
    specifications: [
      "Dimensions: 20x15x8cm",
      "Material: PLA",
      "Compartments: 6",
      "Non-slip Base: Yes"
    ],
    materials: ["PLA", "PETG"]
  },
  {
    id: "3DP007",
    name: "Miniature Chess Set",
    description: "Complete chess set with detailed pieces and folding board. Perfect for travel or display. Each piece is carefully designed with traditional chess piece aesthetics.",
    category: "Games",
    images: [
      "https://images.pexels.com/photos/404280/pexels-photo-404280.jpeg",
      "https://images.pexels.com/photos/1029141/pexels-photo-1029141.jpeg"
    ],
    featured: true,
    specifications: [
      "Board Size: 20x20cm",
      "Material: PLA",
      "Pieces: 32",
      "Storage: Integrated"
    ],
    materials: ["PLA", "Wood PLA"]
  },
  {
    id: "3DP008",
    name: "LED Lamp Shade",
    description: "Geometric lamp shade designed for LED bulbs. Creates beautiful light patterns and shadows. Modern design complements contemporary interiors.",
    category: "Lighting",
    images: [
      "https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg",
      "https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg"
    ],
    featured: false,
    specifications: [
      "Diameter: 30cm",
      "Material: PETG",
      "Bulb Type: E27 LED",
      "Light Diffusion: Excellent"
    ],
    materials: ["PETG", "PLA"]
  },
  {
    id: "3DP009",
    name: "Puzzle Box",
    description: "Intricate puzzle box with hidden mechanisms and secret compartments. Challenging brain teaser that doubles as a decorative piece.",
    category: "Games",
    images: [
      "https://images.pexels.com/photos/1092644/pexels-photo-1092644.jpeg",
      "https://images.pexels.com/photos/1108101/pexels-photo-1108101.jpeg"
    ],
    featured: false,
    specifications: [
      "Size: 10x10x10cm",
      "Material: ABS",
      "Difficulty: Advanced",
      "Moving Parts: 8"
    ],
    materials: ["ABS", "PETG"]
  },
  {
    id: "3DP010",
    name: "Plant Pot with Drainage",
    description: "Self-watering plant pot with integrated drainage system. Perfect for succulents and small plants. Modern design fits any home decor style.",
    category: "Home Decor",
    images: [
      "https://images.pexels.com/photos/159298/gears-cogs-machine-machinery-159298.jpeg",
      "https://images.pexels.com/photos/404280/pexels-photo-404280.jpeg"
    ],
    featured: false,
    specifications: [
      "Diameter: 12cm",
      "Material: PETG",
      "Drainage: Integrated",
      "Water Reservoir: 200ml"
    ],
    materials: ["PETG", "PLA"]
  },
  {
    id: "3DP011",
    name: "Smartphone Stand",
    description: "Adjustable smartphone stand with multiple viewing angles. Compatible with most phone sizes. Non-slip base ensures stability during use.",
    category: "Accessories",
    images: [
      "https://images.pexels.com/photos/1029141/pexels-photo-1029141.jpeg",
      "https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg"
    ],
    featured: false,
    specifications: [
      "Adjustable Angles: 30°-70°",
      "Material: PLA+",
      "Phone Size: 4-7 inches",
      "Cable Management: Yes"
    ],
    materials: ["PLA+", "PETG"]
  },
  {
    id: "3DP012",
    name: "Articulated Dragon",
    description: "Fully articulated dragon with flexible joints and detailed scales. No assembly required - prints in place with moving parts. A masterpiece of 3D printing engineering.",
    category: "Figurines",
    images: [
      "https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg",
      "https://images.pexels.com/photos/1092644/pexels-photo-1092644.jpeg"
    ],
    featured: true,
    specifications: [
      "Length: 25cm",
      "Material: PLA+",
      "Articulation: Full body",
      "Print-in-place: Yes"
    ],
    materials: ["PLA+", "PETG"]
  }
];

export const categories = [
  "All",
  "Figurines",
  "Accessories",
  "Educational",
  "Home Decor",
  "Office",
  "Games",
  "Lighting"
];