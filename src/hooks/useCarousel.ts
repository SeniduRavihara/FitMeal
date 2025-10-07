import { useEffect, useState } from "react";
import { MEAL_BASES } from "../data/mealBases";

// Simple carousel item interface for meal builder
interface CarouselItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  price: number;
  originalPrice?: number | null;
  discount?: string;
  backgroundColor: string;
  textColor: string;
  onPress?: () => void;
}

export function useCarousel() {
  const [carouselItems, setCarouselItems] = useState<CarouselItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCarouselItems = async () => {
    try {
      setLoading(true);
      setError(null);

      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Create carousel items from meal bases for meal builder
      const items: CarouselItem[] = [
        {
          id: "meal-builder-1",
          title: "Build Custom Meals",
          subtitle: "Perfect Macros",
          description: "Create meals with exact nutrition",
          image: MEAL_BASES[0].image,
          price: MEAL_BASES[0].basePrice,
          originalPrice: null,
          discount: "NEW",
          backgroundColor: "#FF6B6B",
          textColor: "#FFFFFF",
        },
        {
          id: "meal-builder-2",
          title: "High Protein",
          subtitle: "Muscle Building",
          description: "Target your protein goals",
          image: MEAL_BASES[1].image,
          price: MEAL_BASES[1].basePrice,
          originalPrice: null,
          discount: "POPULAR",
          backgroundColor: "#4ECDC4",
          textColor: "#FFFFFF",
        },
        {
          id: "meal-builder-3",
          title: "Balanced Nutrition",
          subtitle: "All Macros",
          description: "Perfect macro ratios",
          image: MEAL_BASES[2].image,
          price: MEAL_BASES[2].basePrice,
          originalPrice: null,
          discount: "TRENDING",
          backgroundColor: "#95E1D3",
          textColor: "#FFFFFF",
        },
      ];

      setCarouselItems(items);
      console.log("Carousel items loaded:", items);
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

// Simple hook for getting a single carousel item (for meal builder)
export function useCarouselItem(id: string) {
  const [carouselItem, setCarouselItem] = useState<CarouselItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCarouselItem = async () => {
      try {
        setLoading(true);
        setError(null);

        // Simulate API call delay
        await new Promise((resolve) => setTimeout(resolve, 300));

        // Find item by ID from meal bases
        const mealBase = MEAL_BASES.find((meal) => meal.id === id);
        if (mealBase) {
          const item: CarouselItem = {
            id: mealBase.id,
            title: mealBase.name,
            subtitle: "Custom Meal",
            description: mealBase.description,
            image: mealBase.image,
            price: mealBase.basePrice,
            originalPrice: null,
            discount: "CUSTOM",
            backgroundColor: "#FF6B6B",
            textColor: "#FFFFFF",
          };
          setCarouselItem(item);
        } else {
          setError("Carousel item not found");
        }
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
