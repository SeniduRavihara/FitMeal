export interface CarouselItem {
  id: string;
  title: string;
  subtitle: string;
  description?: string;
  image: string;
  price?: number;
  originalPrice?: number;
  discount?: string;
  backgroundColor: string;
  textColor: string;
  actionType: 'meal' | 'category' | 'external';
  actionValue: string;
  isActive: boolean;
  displayOrder: number;
  startDate?: Date;
  endDate?: Date;
  onPress?: () => void;
}

export interface CarouselApiResponse {
  success: boolean;
  data: CarouselItem[];
  message?: string;
}
