import { useCart } from "@/lib/cart-context";
import { ShoppingBag } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function FloatingCart() {

  const { items, setIsOpen } = useCart();

  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <AnimatePresence>

      {totalItems > 0 && (

        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}

          onClick={() => setIsOpen(true)}

          className="fixed bottom-6 right-6 z-[999] bg-[#0F172A] text-white rounded-full shadow-2xl flex items-center gap-3 px-6 py-4"
        >

          <div className="relative">

            <ShoppingBag className="h-6 w-6" />

            <span className="absolute -top-2 -right-2 bg-[#10B981] text-black text-[10px] font-black rounded-full px-1.5">
              {totalItems}
            </span>

          </div>

          <span className="font-bold hidden sm:block">
            View Cart
          </span>

        </motion.button>

      )}

    </AnimatePresence>
  );
}