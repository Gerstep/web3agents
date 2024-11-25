export interface Agent {
  id: string;
  name: string;
  description: string;
  category: string;
  imageUrl: string;
  rating: number;
  totalRatings: number;
  createdAt: string;
  walletAddress: string;
}

export interface Category {
  id: string;
  name: string;
  count: number;
  color: string;
}