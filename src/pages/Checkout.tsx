import { useCart } from "@/lib/cart-context";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useState } from "react";

export default function Checkout() {

  const { items, total, clearCart } = useCart();
  const navigate = useNavigate();

  const [loading,setLoading] = useState(false);

  const placeOrder = async () => {

    setLoading(true);

    const { data:userData } = await supabase.auth.getUser();

    const user = userData?.user;

    if(!user){
      toast.error("Not logged in");
      return;
    }

    const { error } = await supabase
      .from("orders")
      .insert({
        customer_id: user.id,
        dispensary_id: items[0]?.dispensary_id,
        items: items,
        total: total,
      });

    if(error){
      toast.error("Order failed");
      console.error(error);
      return;
    }

    toast.success("Order placed!");

    clearCart();

    navigate("/orders");

    setLoading(false);
  };

  return (
    <div className="container mx-auto pt-24">

      <h1 className="text-3xl font-bold mb-6">
        Checkout
      </h1>

      {items.map(item => (
        <div key={item.id} className="flex justify-between py-2 border-b">
          <span>{item.name}</span>
          <span>${item.price}</span>
        </div>
      ))}

      <div className="mt-6 text-xl font-bold">
        Total: ${total}
      </div>

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