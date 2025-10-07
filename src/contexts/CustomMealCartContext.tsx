import React, { createContext, useCallback, useContext, useState } from "react";
import { CustomMealOrder } from "../types/mealBuilder";

interface CustomMealCartContextType {
  items: CustomMealOrder[];
  addItem: (item: CustomMealOrder) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
  getTotalCalories: () => number;
  getTotalMacros: () => {
    protein: number;
    carbs: number;
    fats: number;
  };
}

const CustomMealCartContext = createContext<
  CustomMealCartContextType | undefined
>(undefined);

export function CustomMealCartProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [items, setItems] = useState<CustomMealOrder[]>([]);

  const addItem = useCallback((newItem: CustomMealOrder) => {
    setItems((prevItems) => {
      // Check if item with same customization already exists
      const existingItemIndex = prevItems.findIndex(
        (item) =>
          item.mealBase.id === newItem.mealBase.id &&
          item.customization.focus === newItem.customization.focus &&
          item.customization.targetAmount === newItem.customization.targetAmount
      );

      if (existingItemIndex !== -1) {
        // Update quantity of existing item
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex].quantity += newItem.quantity;
        updatedItems[existingItemIndex].totalPrice =
          updatedItems[existingItemIndex].pricePerItem *
          updatedItems[existingItemIndex].quantity;
        return updatedItems;
      } else {
        // Add new item
        return [...prevItems, newItem];
      }
    });
  }, []);

  const removeItem = useCallback((itemId: string) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
  }, []);

  const updateQuantity = useCallback(
    (itemId: string, quantity: number) => {
      if (quantity <= 0) {
        removeItem(itemId);
        return;
      }

      setItems((prevItems) =>
        prevItems.map((item) =>
          item.id === itemId
            ? {
                ...item,
                quantity,
                totalPrice: item.pricePerItem * quantity,
              }
            : item
        )
      );
    },
    [removeItem]
  );

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const getTotalItems = useCallback(() => {
    return items.reduce((total, item) => total + item.quantity, 0);
  }, [items]);

  const getTotalPrice = useCallback(() => {
    return items.reduce((total, item) => total + item.totalPrice, 0);
  }, [items]);

  const getTotalCalories = useCallback(() => {
    return items.reduce(
      (total, item) =>
        total + item.customization.calculatedMacros.calories * item.quantity,
      0
    );
  }, [items]);

  const getTotalMacros = useCallback(() => {
    return items.reduce(
      (totals, item) => ({
        protein:
          totals.protein +
          item.customization.calculatedMacros.protein * item.quantity,
        carbs:
          totals.carbs +
          item.customization.calculatedMacros.carbs * item.quantity,
        fats:
          totals.fats +
          item.customization.calculatedMacros.fats * item.quantity,
      }),
      { protein: 0, carbs: 0, fats: 0 }
    );
  }, [items]);

  const value: CustomMealCartContextType = {
    items,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    getTotalItems,
    getTotalPrice,
    getTotalCalories,
    getTotalMacros,
  };

  return (
    <CustomMealCartContext.Provider value={value}>
      {children}
    </CustomMealCartContext.Provider>
  );
}

export function useCustomMealCart() {
  const context = useContext(CustomMealCartContext);
  if (context === undefined) {
    throw new Error(
      "useCustomMealCart must be used within a CustomMealCartProvider"
    );
  }
  return context;
}
