import { useParams, useNavigate } from "react-router-dom";
import { CheckCircle } from "lucide-react";

export default function OrderConfirmation() {

  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background text-center px-6">

      <CheckCircle className="h-20 w-20 text-green-500 mb-6" />

      <h1 className="text-3xl font-bold mb-2">
        Order Confirmed 🎉
      </h1>

      <p className="text-muted-foreground mb-6">
        Your order has been placed successfully.
      </p>

      <p className="text-sm mb-10">
        Order ID: <span className="font-mono">{id}</span>
      </p>

      <button
        onClick={() => navigate("/")}
        className="px-6 py-3 rounded-xl btn-gradient"
      >
        Back to Home
      </button>

    </div>
  );
}