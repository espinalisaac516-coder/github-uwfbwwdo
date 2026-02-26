import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { DbDispensary } from '@/lib/types';
import { Truck, ArrowRight, ShieldCheck, Zap, Navigation } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from "framer-motion";

import DispensaryCard from "@/components/DispensaryCard";
import Footer from "@/components/Footer";

export default function Index() {

  const [dispensaries, setDispensaries] = useState<DbDispensary[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDispensaries = async () => {
      try {
        const { data, error } = await supabase
          .from('dispensaries')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;
        if (data) setDispensaries(data as DbDispensary[]);
      } catch (err) {
        console.error("Supabase Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDispensaries();
  }, []);

  return (
    <div className="min-h-screen bg-abstract flex flex-col font-sans overflow-x-hidden">

      {/* HEADER */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">

          {/* LOGO */}
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
            <div className="w-10 h-10 bg-[#10B981] rounded-full flex items-center justify-center shadow-sm">
              <svg viewBox="0 0 24 24" className="h-6 w-6 fill-white">
                <path d="M12,16C12,16 12,11.5 12,9.5C12,7.5 11,5 11,5C11,5 10,7.5 10,9.5C10,11.5 10,16 10,16H12M13.5,15.5C13.5,15.5 16.5,12.5 18,11.5C19.5,10.5 22,10 22,10C22,10 19.5,11 18,12.5C16.5,14 13.5,17 13.5,17V15.5M10.5,15.5C10.5,15.5 7.5,12.5 6,11.5C4.5,10.5 2,10 2,10C2,10 4.5,11 6,12.5C7.5,14 10.5,17 10.5,17V15.5M13,17.5C13,17.5 18,17.5 20,18.5C22,19.5 23,22 23,22C23,22 21,21 19,20C17,19 13,19 13,19V17.5M11,17.5C11,17.5 6,17.5 4,18.5C2,19.5 1,22 1,22C1,22 3,21 5,20C7,19 11,19 11,19V17.5Z"/>
              </svg>
            </div>
            <span className="text-xl font-bold tracking-tight text-[#0F172A]">
              Bud<span className="text-[#10B981]">Runner</span>
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button 
              onClick={() => navigate('/driver-signup')} 
              className="hidden sm:flex items-center gap-2 px-5 py-2 bg-[#10B981] text-white text-[10px] font-black uppercase tracking-widest rounded-full"
            >
              <Truck className="h-3.5 w-3.5" /> Driver Mode
            </button>

            <button
              onClick={() => navigate('/auth')}
              className="px-5 py-2 bg-[#0F172A] text-white text-sm font-bold rounded-full"
            >
              Sign In
            </button>
          </div>

        </div>
      </nav>

      <main className="flex-grow pt-16">

        {/* GOD MODE HERO — OPTIMIZED MOBILE VERSION */}

<section className="relative pt-24 pb-20 md:pt-36 md:pb-28 px-6 overflow-hidden">

{/* Glow Background — optimized */}
<div className="absolute inset-0 pointer-events-none">
<div className="absolute left-1/2 top-20 -translate-x-1/2 w-[500px] md:w-[700px] h-[500px] md:h-[700px] bg-emerald-400/20 blur-[80px] md:blur-[120px] rounded-full will-change-transform"/>
</div>

<div className="container mx-auto relative z-10">

{/* Delivery */}
<motion.h1
initial={{ opacity: 0, y: 30 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.5 }}
className="text-6xl md:text-8xl font-black tracking-tighter text-[#0F172A]"
>
Delivery,
</motion.h1>

{/* Elevated */}
<motion.h2
initial={{ opacity: 0, y: 40 }}
animate={{ opacity: 1, y: 0 }}
transition={{ delay: 0.15, duration: 0.5 }}
className="relative text-[2.6rem] sm:text-6xl md:text-8xl font-bold italic font-serif"
>
<span className="hero-gradient-text relative z-10">
Elevated.
</span>

{/* Glow overlay */}
<span className="absolute inset-0 blur-2xl opacity-40 hero-gradient-text"/>
</motion.h2>

{/* Subtitle */}
<motion.p
initial={{ opacity: 0 }}
animate={{ opacity: 1 }}
transition={{ delay: 0.25 }}
className="mt-6 max-w-xl text-slate-500 font-medium text-lg"
>
Compare Plainfield dispensaries. Find the best deals.
Prepare for delivery launch.
</motion.p>

{/* Tags */}
<div className="flex flex-wrap gap-3 mt-6">
<span className="px-4 py-2 rounded-full bg-emerald-50 text-emerald-700 text-sm font-semibold">Licensed NJ Retailers</span>
<span className="px-4 py-2 rounded-full bg-emerald-50 text-emerald-700 text-sm font-semibold">Real-Time Menu Updates</span>
<span className="px-4 py-2 rounded-full bg-emerald-50 text-emerald-700 text-sm font-semibold">Delivery Coming Soon</span>
<span className="px-4 py-2 rounded-full bg-emerald-50 text-emerald-700 text-sm font-semibold">Plainfield, NJ</span>
</div>

{/* Search + CTA */}
<motion.div
initial={{ opacity: 0, y: 15 }}
animate={{ opacity: 1, y: 0 }}
transition={{ delay: 0.35 }}
className="flex flex-col md:flex-row gap-4 mt-10 max-w-2xl"
>
<input
placeholder="Search products, dispensaries..."
className="flex-1 px-6 py-4 rounded-xl border border-slate-200 focus:outline-none"
/>

<button
onClick={() => document.getElementById('dispensaries')?.scrollIntoView({ behavior:'smooth' })}
className="px-10 py-4 bg-[#0F172A] text-white rounded-xl font-bold shadow-lg"
>
Browse Menus →
</button>
</motion.div>

{/* Early Access */}
<div className="mt-10">
<p className="text-sm font-semibold text-slate-600 mb-3">
Delivery Launching Soon in Plainfield
</p>

<div className="flex gap-3 max-w-md">
<input
placeholder="Enter your email"
className="flex-1 px-4 py-3 rounded-xl border border-slate-200"
/>
<button className="px-6 py-3 bg-emerald-500 text-white rounded-xl font-semibold">
Join Early Access
</button>
</div>

<p className="text-xs text-slate-400 mt-2">
Be the first to order when we go live.
</p>
</div>

</div>
</section>

        {/* VALUE PROPS */}
        <section className="py-20 px-6 border-y border-slate-100 bg-white/50">
          <div className="container mx-auto grid md:grid-cols-3 gap-16">
            <Value icon={<Zap className="text-[#10B981]" />} title="60-Min Speed" desc="Hyper-local dispatch ensures fast delivery." />
            <Value icon={<ShieldCheck className="text-[#10B981]" />} title="Verified Legal" desc="Strictly licensed NJ dispensaries." />
            <Value icon={<Navigation className="text-[#10B981]" />} title="Live Tracking" desc="Watch your delivery in real-time." />
          </div>
        </section>

        {/* DISPENSARIES */}
        <section id="dispensaries" className="py-24 px-6 bg-white">
          <div className="container mx-auto">
            <h2 className="text-3xl font-black text-[#0F172A] mb-12 uppercase">
              Nearby Dispensaries
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
              {!loading && dispensaries.map((d,i)=>(
                <DispensaryCard key={d.id} dispensary={d} index={i}/>
              ))}
            </div>
          </div>
        </section>

      </main>

      <Footer/>

    </div>
  );
}

function Value({icon,title,desc}:any){
  return(
    <div className="flex flex-col gap-4">
      {icon}
      <h3 className="text-xl font-black text-[#0F172A]">{title}</h3>
      <p className="text-slate-500 text-sm">{desc}</p>
    </div>
  )
}