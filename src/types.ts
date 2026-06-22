export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  rating: number;
  reviewsCount: number;
  image: string;
  category: 'powder' | 'tea' | 'capsule' | 'skincare' | 'seeds' | 'oil';
  benefits: string[];
  usage: string;
  ingredients: string;
  stock: number;
  size: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface BlogArticle {
  id: string;
  title: string;
  excerpt: string;
  content: string; // Markdown supported
  image: string;
  author: string;
  date: string;
  readTime: string;
  category: 'Wellness' | 'Nutrition' | 'Recipes' | 'Guides';
  tags: string[];
}

export interface MoringaBenefit {
  id: string;
  title: string;
  shortDescription: string;
  detailedBenefit: string;
  scientificReference: string;
  iconName: string; // From lucide-react names or component handling
}
