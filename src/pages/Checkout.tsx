import { useCart } from "@/lib/cart-context";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useState } from "react";

export default function Checkout() {

  const { items, total, clearCart } = useCart();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const placeOrder = async () => {

    if(items.length === 0){
      toast.error("Cart is empty");
      return;
    }

    try {

      setLoading(true);

      // 🔥 Get logged in user
      const { data: userData, error: userError } = await supabase.auth.getUser();

      if(userError || !userData?.user){
        toast.error("Not logged in");
        setLoading(false);
        return;
      }

      const user = userData.user;

      // 🔥 INSERT ORDER (RLS SAFE)
      const { data, error } = await supabase
        .from("orders" as any )
        .insert({
          user_id: user.id, // ✅ required for your table
          dispensary_id: items[0]?.dispensary_id,
          items: items,
          total: total,
          status: "pending"
        })
        .select()
        .single();

      if(error){
        console.error("Checkout error:", error);
        toast.error("Order failed");
        setLoading(false);
        return;
      }

      toast.success("Order placed!");

      clearCart();

      // ✅ Navigate to confirmation page
      navigate(`/order-confirmed/${data.id}`);

    } catch(err){
      console.error(err);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }

  };

  return (
    <div className="container mx-auto pt-24">

      <h1 className="text-3xl font-bold mb-6">
        Checkout
      </h1>

      {/* CART ITEMS */}
      {items.map((item, index) => (
        <div key={index} className="flex justify-between py-2 border-b">
          <span>{item.product?.name}</span>
          <span>${item.product?.price}</span>
        </div>
      ))}

      {/* TOTAL */}
      <div className="mt-6 text-xl font-bold">
        Total: ${total.toFixed(2)}
      </div>

      {/* PLACE ORDER BUTTON */}
      <button
        onClick={placeOrder}
        disabled={loading}
        className="mt-6 px-6 py-3 bg-primary text-white rounded-xl"
      >
        {loading ? "Processing..." : "Place Order"}
      </button>

    </div>
  );
}