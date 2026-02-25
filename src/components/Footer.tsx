import { Link } from "react-router-dom";
import { Truck, ShieldCheck, MapPin, Instagram, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-50 border-t border-slate-200 pt-16 pb-8 text-slate-600">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-12">
          
          <div className="col-span-2 space-y-5">
            <Link to="/" className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary shadow-lg shadow-primary/20">
                 <svg viewBox="0 0 24 24" className="h-5 w-5 fill-white" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12,16C12,16 12,11.5 12,9.5C12,7.5 11,5 11,5C11,5 10,7.5 10,9.5C10,11.5 10,16 10,16H12M13.5,15.5C13.5,15.5 16.5,12.5 18,11.5C19.5,10.5 22,10 22,10C22,10 19.5,11 18,12.5C16.5,14 13.5,17 13.5,17V15.5M10.5,15.5C10.5,15.5 7.5,12.5 6,11.5C4.5,10.5 2,10 2,10C2,10 4.5,11 6,12.5C7.5,14 10.5,17 10.5,17V15.5M13,17.5C13,17.5 18,17.5 20,18.5C22,19.5 23,22 23,22C23,22 21,21 19,20C17,19 13,19 13,19V17.5M11,17.5C11,17.5 6,17.5 4,18.5C2,19.5 1,22 1,22C1,22 3,21 5,20C7,19 11,19 11,19V17.5Z" />
                </svg>
              </div>
              <span className="font-display text-xl font-black tracking-tighter text-slate-900">
                Bud<span className="text-primary">Runner</span>
              </span>
            </Link>
            <p className="text-sm max-w-xs leading-relaxed text-slate-500 font-medium">
              Plainfield's premier compliant delivery network. We bridge the gap between dispensaries and the community.
            </p>
            <div className="flex gap-4">
              <Instagram className="h-5 w-5 hover:text-primary cursor-pointer transition-colors" />
              <Twitter className="h-5 w-5 hover:text-primary cursor-pointer transition-colors" />
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <h4 className="text-xs font-black uppercase tracking-widest text-slate-900">Company</h4>
            <nav className="flex flex-col gap-2 text-sm font-medium">
              <Link to="/dispensaries" className="hover:text-primary">Find Dispensaries</Link>
              <Link to="/" className="hover:text-primary">Customer Support</Link>
              <Link to="/" className="hover:text-primary">Privacy Policy</Link>
            </nav>
          </div>

          <div className="flex flex-col gap-4">
            <h4 className="text-xs font-black uppercase tracking-widest text-primary">Logistics</h4>
            <nav className="flex flex-col gap-2 text-sm font-bold text-slate-900">
              <Link to="/driver-signup" className="hover:text-primary flex items-center gap-2">
                <Truck className="h-3.5 w-3.5" /> Drive for BudRunner
              </Link>
              <Link to="/driver-signup" className="hover:text-primary flex items-center gap-2">
                <ShieldCheck className="h-3.5 w-3.5 text-green-600" /> Compliance Hub
              </Link>
            </nav>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-bold uppercase tracking-widest text-slate-400">
          <div className="flex items-center gap-1.5">
            <MapPin className="h-3 w-3" /> Plainfield, NJ
          </div>
          <p>© 2026 BudRunner Logistics Group</p>
        </div>
      </div>
    </footer>
  );
}