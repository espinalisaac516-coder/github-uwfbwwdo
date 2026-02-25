import { Clock, MapPin, Store } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

// Defining the interface here prevents "Module not found" errors
interface DbDispensary {
  id: string;
  name: string;
  image_url?: string;
  opening_time?: string;
  closing_time?: string;
  is_open?: boolean;
  city?: string;
}

interface Props {
  dispensary: DbDispensary;
  index: number;
}

export default function DispensaryCard({ dispensary, index }: Props) {
  const checkIfOpen = () => {
    // If times are missing, fall back to the boolean or assume open for now
    if (!dispensary.opening_time || !dispensary.closing_time) return dispensary.is_open ?? true;
    
    const njTime = new Intl.DateTimeFormat("en-US", {
      timeZone: "America/New_York",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }).format(new Date());

    const currentTime = njTime;
    const openTime = dispensary.opening_time.slice(0, 5);
    const closeTime = dispensary.closing_time.slice(0, 5);
    
    return currentTime >= openTime && currentTime < closeTime;
  };

  const currentlyOpen = checkIfOpen();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <Link
        to={`/dispensary/${dispensary.id}`}
        className="block overflow-hidden group rounded-3xl bg-white border border-slate-100 hover:border-emerald-500/30 transition-all duration-500 shadow-sm hover:shadow-xl"
      >
        <div className="relative h-52 flex items-center justify-center bg-white p-8">
          {dispensary.image_url ? (
            <img
              src={dispensary.image_url}
              alt={dispensary.name}
              className="max-w-full max-h-full object-contain group-hover:scale-110 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full bg-slate-50 flex items-center justify-center">
              <Store className="h-10 w-10 text-slate-200" />
            </div>
          )}
          
          <div className="absolute top-4 right-4 z-10">
            <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border shadow-sm ${
              currentlyOpen 
                ? "bg-emerald-500 text-white border-emerald-400" 
                : "bg-slate-100 text-slate-400 border-slate-200"
            }`}>
              {currentlyOpen ? "Open Now" : "Closed"}
            </span>
          </div>

          {!currentlyOpen && (
            <div className="absolute inset-0 bg-white/40 backdrop-blur-[1px] pointer-events-none" />
          )}
        </div>

        <div className="p-6 space-y-2 border-t border-slate-50">
          <h3 className="font-display font-bold text-xl tracking-tight text-slate-900 group-hover:text-emerald-600 transition-colors">
            {dispensary.name}
          </h3>
          
          <div className="flex items-center gap-4 text-xs font-semibold text-slate-500 uppercase tracking-widest">
            <span className="flex items-center gap-1.5">
              <Clock className="h-4 w-4 text-emerald-500" />
              {dispensary.opening_time?.slice(0, 5) || "09:00"} - {dispensary.closing_time?.slice(0, 5) || "22:00"}
            </span>
            <span className="flex items-center gap-1.5">
              <MapPin className="h-4 w-4 text-emerald-500" />
              {dispensary.city || "Plainfield, NJ"}
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}