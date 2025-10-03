import { useEffect, useState } from "react";
import { CarouselApi } from "../supabase/services/carouselApi";
import { CarouselItem } from "../types/carousel";

export function useCarousel() {
  const [carouselItems, setCarouselItems] = useState<CarouselItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCarouselItems = async () => {
    try {
      setLoading(true);
      setError(null);
      const items = await CarouselApi.getActiveCarouselItems();
      setCarouselItems(items);
      console.log("items", items);
      
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to load carousel items"
      );
      console.error("Error fetching carousel items:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCarouselItems();
  }, []);

  const refreshCarouselItems = () => {
    fetchCarouselItems();
  };

  return {
    carouselItems,
    loading,
    error,
    refreshCarouselItems,
  };
}

export function useCarouselItem(id: string) {
  const [carouselItem, setCarouselItem] = useState<CarouselItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCarouselItem = async () => {
      try {
        setLoading(true);
        setError(null);
        const item = await CarouselApi.getCarouselItemById(id);
        setCarouselItem(item);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to load carousel item"
        );
        console.error("Error fetching carousel item:", err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchCarouselItem();
    }
  }, [id]);

  return {
    carouselItem,
    loading,
    error,
  };
}
