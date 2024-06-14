"use client";
import React, { createContext, useContext, useState } from "react";

type Product = {
  id: string;
  name: string;
  price: number;
  images: string[];
  sizes: string[];
  colors: string[];
  selectedSize?: string;
  selectedColor?: string;
};

type BasketItem = {
  product: Product;
  quantity: number;
};

type BasketContextType = {
  items: BasketItem[];
  addItem: (product: Product, selectedSize: string, selectedColor: string) => void;
  incrementItem: (itemId: string) => void;
  decrementItem: (itemId: string) => void;
};

const BasketContext = createContext<BasketContextType>({
  items: [],
  addItem: () => {},
  incrementItem: () => {},
  decrementItem: () => {},
});

export const useBasket = () => useContext(BasketContext);

export const BasketProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [items, setItems] = useState<BasketItem[]>([]);

  const addItem = (product: Product, selectedSize: string, selectedColor: string) => {
    const productWithSelection = { ...product, selectedSize, selectedColor };

    setItems((prevItems) => {
      const existingItem = prevItems.find(
        (item) => 
          item.product.id === product.id && 
          item.product.selectedSize === selectedSize && 
          item.product.selectedColor === selectedColor
      );
      if (existingItem) {
        return prevItems.map((item) =>
          item.product.id === product.id && 
          item.product.selectedSize === selectedSize && 
          item.product.selectedColor === selectedColor
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevItems, { product: productWithSelection, quantity: 1 }];
    });
  };

  const incrementItem = (itemId: string) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.product.id === itemId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const decrementItem = (itemId: string) => {
    setItems((prevItems) =>
      prevItems
        .map((item) =>
          item.product.id === itemId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  return (
    <BasketContext.Provider
      value={{ items, addItem, incrementItem, decrementItem }}
    >
      {children}
    </BasketContext.Provider>
  );
};
