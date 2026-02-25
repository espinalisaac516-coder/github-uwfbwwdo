import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/lib/auth-context";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { Plus, Store, Package, Settings, ToggleLeft, ToggleRight, Trash2, ShieldCheck } from "lucide-react";
import ProductFormDialog from "@/components/dashboard/ProductFormDialog";

export default function Dashboard() {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [dispensary, setDispensary] = useState<any>({ name: "Bud Runner Demo", city: "Plainfield, NJ" });
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [productDialogOpen, setProductDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"products" | "settings">("products");

  // BYPASS: This is commented out so you don't get kicked to the Login screen
  useEffect(() => {
    /* if (!authLoading && !user) {
      navigate("/auth");
    }
    */
  }, [user, authLoading, navigate]);

  return (
    <div className="min-h-screen pt-20 pb-16 bg-black text-white">
      <div className="container mx-auto px-4">
        
        {/* DEMO HEADER */}
        <div className="flex flex-col gap-4 mb-8">
          <div>
            <h1 className="font-display text-4xl font-black text-green-500 tracking-tight">
              {dispensary.name}
            </h1>
            <p className="text-zinc-400 text-sm mt-1 uppercase tracking-widest font-bold">
              Control Center // {dispensary.city}
            </p>
          </div>

          {/* THE SCANNER BUTTON - THIS IS WHAT YOU WERE LOOKING FOR */}
          <button
            onClick={() => navigate("/id-scan")}
            className="flex items-center justify-center gap-4 w-full sm:w-max px-10 py-6 rounded-2xl bg-green-600 hover:bg-green-500 text-white shadow-[0_0_30px_rgba(34,197,94,0.3)] transition-all animate-pulse"
          >
            <ShieldCheck className="h-8 w-8 text-white" />
            <div className="text-left">
              <span className="block text-xs uppercase font-black opacity-80">Compliance Tool</span>
              <span className="block text-xl font-bold tracking-tight">VERIFY CUSTOMER ID</span>
            </div>
          </button>
        </div>

        <hr className="border-zinc-800 mb-8" />

        {/* DASHBOARD TABS */}
        <div className="flex gap-6 mb-8">
          <button 
            onClick={() => setActiveTab("products")}
            className={`pb-2 font-bold text-sm uppercase tracking-wider ${activeTab === 'products' ? 'text-green-500 border-b-2 border-green-500' : 'text-zinc-500'}`}
          >
            Inventory
          </button>
          <button 
            onClick={() => setActiveTab("settings")}
            className={`pb-2 font-bold text-sm uppercase tracking-wider ${activeTab === 'settings' ? 'text-green-500 border-b-2 border-green-500' : 'text-zinc-500'}`}
          >
            Store Settings
          </button>
        </div>

        {activeTab === "products" && (
          <div className="grid gap-4">
            <div className="flex justify-between items-center bg-zinc-900/50 p-6 rounded-2xl border border-zinc-800">
              <div>
                <h3 className="font-bold text-lg">Product Catalog</h3>
                <p className="text-sm text-zinc-500">Manage your Plainfield menu</p>
              </div>
              <button 
                onClick={() => setProductDialogOpen(true)}
                className="bg-white text-black px-4 py-2 rounded-lg font-bold text-sm hover:bg-zinc-200"
              >
                + Add Item
              </button>
            </div>
            
            {/* Placeholder for demo */}
            <div className="p-20 text-center border-2 border-dashed border-zinc-800 rounded-2xl">
              <Package className="h-12 w-12 mx-auto text-zinc-700 mb-4" />
              <p className="text-zinc-500 font-medium">No active products in demo mode.</p>
            </div>
          </div>
        )}

        {activeTab === "settings" && (
          <div className="bg-zinc-900/50 p-8 rounded-2xl border border-zinc-800 max-w-2xl">
            <h2 className="text-2xl font-bold mb-6">Dispensary Settings</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-black uppercase text-zinc-500 mb-2">Store Name</label>
                <input className="w-full bg-zinc-800 border-zinc-700 rounded-lg p-3 text-white" defaultValue="Bud Runner Demo" />
              </div>
              <button className="bg-zinc-800 text-white px-6 py-3 rounded-lg font-bold opacity-50 cursor-not-allowed">
                Save Changes (Disabled in Demo)
              </button>
            </div>
          </div>
        )}
      </div>

      <ProductFormDialog
        open={productDialogOpen}
        onOpenChange={setProductDialogOpen}
        dispensaryId="demo"
        onSaved={() => setProductDialogOpen(false)}
      />
    </div>
  );
}