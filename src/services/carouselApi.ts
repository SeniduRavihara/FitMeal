import { CarouselItem, CarouselApiResponse } from '../types/carousel';

const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3001/api';

export class CarouselApi {
  static async getActiveCarouselItems(): Promise<CarouselItem[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/carousel/active`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data: CarouselApiResponse = await response.json();
      
      if (!data.success) {
        throw new Error(data.message || 'Failed to fetch carousel items');
      }
      
      // Transform API response to match mobile app format
      return data.data.map(item => ({
        ...item,
        image: item.image, // Assuming API returns 'image' field
        startDate: item.startDate ? new Date(item.startDate) : undefined,
        endDate: item.endDate ? new Date(item.endDate) : undefined,
      }));
    } catch (error) {
      console.error('Error fetching carousel items:', error);
      // Return empty array on error to prevent app crashes
      return [];
    }
  }

  static async getCarouselItemById(id: string): Promise<CarouselItem | null> {
    try {
      const response = await fetch(`${API_BASE_URL}/carousel/${id}`);
      
      if (!response.ok) {
        if (response.status === 404) {
          return null;
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (!data.success) {
        throw new Error(data.message || 'Failed to fetch carousel item');
      }
      
      return {
        ...data.data,
        image: data.data.image,
        startDate: data.data.startDate ? new Date(data.data.startDate) : undefined,
        endDate: data.data.endDate ? new Date(data.data.endDate) : undefined,
      };
    } catch (error) {
      console.error('Error fetching carousel item:', error);
      return null;
    }
  }

  // For admin use - create new carousel item
  static async createCarouselItem(item: Omit<CarouselItem, 'id'>): Promise<CarouselItem> {
    const response = await fetch(`${API_BASE_URL}/carousel`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...item,
        startDate: item.startDate?.toISOString(),
        endDate: item.endDate?.toISOString(),
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    if (!data.success) {
      throw new Error(data.message || 'Failed to create carousel item');
    }

    return data.data;
  }

  // For admin use - update carousel item
  static async updateCarouselItem(id: string, item: Partial<CarouselItem>): Promise<CarouselItem> {
    const response = await fetch(`${API_BASE_URL}/carousel/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...item,
        startDate: item.startDate?.toISOString(),
        endDate: item.endDate?.toISOString(),
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    if (!data.success) {
      throw new Error(data.message || 'Failed to update carousel item');
    }

    return data.data;
  }

  // For admin use - delete carousel item
  static async deleteCarouselItem(id: string): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/carousel/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    if (!data.success) {
      throw new Error(data.message || 'Failed to delete carousel item');
    }
  }
}
