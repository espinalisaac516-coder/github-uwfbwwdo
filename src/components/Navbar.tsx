import { ShoppingBag, Search, User, LogOut, LayoutDashboard, Truck } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "@/lib/cart-context";
import { useAuth } from "@/context/AuthContext"; // ✅ LEVEL 3 CONTEXT
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Navbar() {
  const { itemCount, setIsOpen } = useCart();
  const { user, role } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    const { supabase } = await import("@/integrations/supabase/client");
    await supabase.auth.signOut();
    navigate("/auth");
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/40 bg-white/80 backdrop-blur-xl">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">

        {/* LOGO */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl btn-gradient shadow-lg shadow-primary/20 transition-transform group-hover:scale-105">
            <svg viewBox="0 0 24 24" className="h-6 w-6 fill-white">
              <path d="M12,16C12,16 12,11.5 12,9.5C12,7.5 11,5 11,5C11,5 10,7.5 10,9.5C10,11.5 10,16 10,16H12" />
            </svg>
          </div>
          <span className="font-display text-xl font-black tracking-tighter text-slate-900">
            Bud<span className="text-primary">Runner</span>
          </span>
        </Link>

        {/* SEARCH */}
        <div className="hidden lg:flex items-center gap-2 rounded-full bg-slate-100 px-4 py-2 flex-1 max-w-md mx-8">
          <Search className="h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search products..."
            className="bg-transparent text-sm outline-none w-full"
          />
        </div>

        <div className="flex items-center gap-3">

          {/* DRIVER MODE */}
          <Link 
            to="/driver-signup" 
            className="hidden md:flex items-center gap-1.5 px-4 py-2 rounded-full bg-primary text-white font-bold text-xs uppercase"
          >
            <Truck className="h-3.5 w-3.5" />
            Driver Mode
          </Link>

          {/* CART */}
          <button
            onClick={() => setIsOpen(true)}
            className="relative flex h-10 w-10 items-center justify-center rounded-full bg-slate-100"
          >
            <ShoppingBag className="h-5 w-5 text-slate-700" />
            {itemCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-white">
                {itemCount}
              </span>
            )}
          </button>

          {/* AUTH / PROFILE */}
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 text-white">
                  <User className="h-5 w-5" />
                </button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end" className="w-48">

                {/* CUSTOMER LINK */}
                {role === "customer" && (
                  <DropdownMenuItem asChild>
                    <Link to="/dispensaries">Browse Dispensaries</Link>
                  </DropdownMenuItem>
                )}

                {/* OWNER LINK */}
                {role === "dispensary_owner" && (
                  <DropdownMenuItem asChild>
                    <Link to="/dashboard" className="flex items-center gap-2">
                      <LayoutDashboard className="h-4 w-4" /> Dashboard
                    </Link>
                  </DropdownMenuItem>
                )}

                <DropdownMenuItem onClick={handleLogout} className="text-red-600">
                  <LogOut className="h-4 w-4 mr-2" /> Sign Out
                </DropdownMenuItem>

              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link to="/auth" className="text-sm font-bold">
              Sign In
            </Link>
          )}

        </div>
      </div>
    </nav>
  );
}