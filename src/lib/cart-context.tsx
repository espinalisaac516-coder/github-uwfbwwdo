import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { CartItem, DbProduct } from "./types";

interface CartContextType {
  items: CartItem[];
  addItem: (product: DbProduct) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  total: number;
  itemCount: number;
  dispensaryId: string | null;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {

  // 🔥 Load cart from localStorage (persistent cart)
  const [items, setItems] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem("budrunner-cart");
    return saved ? JSON.parse(saved) : [];
  });

  const [isOpen, setIsOpen] = useState(false);

  // 🔥 Save cart automatically
  useEffect(() => {
    localStorage.setItem("budrunner-cart", JSON.stringify(items));
  }, [items]);

  // 🔥 Only allow one dispensary per cart (REAL delivery app logic)
  const dispensaryId = items.length > 0 ? items[0].product.dispensary_id : null;

  const addItem = (product: DbProduct) => {

    setItems((prev) => {

      // 🚨 Prevent mixing dispensaries
      if (
        prev.length > 0 &&
        prev[0].product.dispensary_id !== product.dispensary_id
      ) {
        const confirmReset = window.confirm(
          "Your cart contains items from another dispensary. Start a new order?"
        );

        if (!confirmReset) return prev;

        return [{ product, quantity: 1 }];
      }

      const existing = prev.find((i) => i.product.id === product.id);

      if (existing) {
        return prev.map((i) =>
          i.product.id === product.id
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      }

      return [...prev, { product, quantity: 1 }];
    });

    setIsOpen(true);
  };

  const removeItem = (productId: string) => {
    setItems((prev) =>
      prev.filter((i) => i.product.id !== productId)
    );
  };

  const updateQuantity = (productId: string, quantity: number) => {

    if (quantity <= 0) {
      removeItem(productId);
      return;
    }

    setItems((prev) =>
      prev.map((i) =>
        i.product.id === productId
          ? { ...i, quantity }
          : i
      )
    );
  };

  const clearCart = () => setItems([]);

  const total = items.reduce(
    (sum, i) => sum + Number(i.product.price) * i.quantity,
    0
  );

  const itemCount = items.reduce(
    (sum, i) => sum + i.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        total,
        itemCount,
        dispensaryId,
        isOpen,
        setIsOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {

  const ctx = useContext(CartContext);

  if (!ctx) {
    throw new Error("useCart must be used within CartProvider");
  }

  return ctx;
}