import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { DbDispensary, DbProduct } from "@/lib/types";
import ProductCard from "@/components/ProductCard";
import CategoryBar from "@/components/CategoryBar";
import { ArrowLeft, Clock, MapPin, Store } from "lucide-react";

export default function DispensaryMenu() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [dispensary, setDispensary] = useState<DbDispensary | null>(null);
  const [products, setProducts] = useState<DbProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("All");

  useEffect(() => {
    async function load() {
      setLoading(true);

      try {
        const { data: disp, error: dispError } = await supabase
          .from("dispensaries")
          .select("*")
          .eq("id", id!)
          .maybeSingle();

        if (dispError) {
          console.error("Dispensary fetch error:", dispError);
          setLoading(false);
          return;
        }

        if (!disp) {
          setLoading(false);
          return;
        }

        setDispensary(disp as DbDispensary);

        const { data: prods, error: prodError } = await supabase
          .from("products")
          .select("*")
          .eq("dispensary_id", disp.id)
          .eq("is_available", true)
          .order("created_at", { ascending: false });

        if (prodError) {
          console.error("Product fetch error:", prodError);
        }

        setProducts((prods as DbProduct[]) || []);
      } catch (err) {
        console.error("Unexpected load error:", err);
      }

      setLoading(false);
    }

    load();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center bg-white">
        <div className="h-8 w-8 rounded-full border-2 border-[#00A67E] border-t-transparent animate-spin" />
      </div>
    );
  }

  if (!dispensary) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center bg-white">
        <div className="text-center">
          <Store className="h-12 w-12 mx-auto text-slate-300 mb-4" />
          <p className="text-slate-500 font-bold">Dispensary not found</p>
          <button
            onClick={() => navigate("/")}
            className="text-[#00A67E] text-sm font-bold hover:underline mt-2"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  const filtered =
    category === "All"
      ? products
      : products.filter((p) => p.category === category);

  return (
    <div className="min-h-screen pt-20 pb-16 bg-white">
      <div className="relative h-48 overflow-hidden bg-slate-900">
        {dispensary.image_url ? (
          <img
            src={dispensary.image_url}
            alt={dispensary.name}
            className="w-full h-full object-cover opacity-60"
          />
        ) : (
          <div className="w-full h-full bg-slate-200" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-white to-transparent" />
      </div>

      <div className="container mx-auto px-4 -mt-16 relative z-10">
        <button
          onClick={() => navigate("/")}
          className="inline-flex items-center gap-1 text-sm font-bold text-slate-600 hover:text-[#00A67E] transition-colors mb-4 bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full shadow-sm"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </button>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <h1 className="text-4xl font-black text-[#0F172A] uppercase tracking-tighter">
              {dispensary.name}
            </h1>

            <div className="flex items-center gap-4 mt-2 text-sm font-bold text-slate-500">
              {dispensary.city && (
                <span className="flex items-center gap-1">
                  <MapPin className="h-4 w-4 text-[#00A67E]" />
                  {dispensary.city}
                </span>
              )}

              {dispensary.delivery_time && (
                <span className="flex items-center gap-1">
                  <Clock className="h-4 w-4 text-[#00A67E]" />
                  {dispensary.delivery_time}
                </span>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl shadow-sm border border-slate-100 w-fit">
            <div
              className={`h-2 w-2 rounded-full ${
                dispensary.is_open
                  ? "bg-[#00A67E] animate-pulse"
                  : "bg-red-500"
              }`}
            />
            <span className="text-sm font-bold uppercase tracking-widest text-slate-700">
              {dispensary.is_open ? "Open Now" : "Closed"}
            </span>
          </div>
        </div>

        <CategoryBar selected={category} onSelect={setCategory} />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {filtered.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200 mt-8">
            <p className="text-slate-400 font-bold uppercase tracking-widest">
              No products available
            </p>
          </div>
        )}
      </div>
    </div>
  );
}