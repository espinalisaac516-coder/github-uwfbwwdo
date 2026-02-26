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
const [driverModal,setDriverModal] = useState(false);

const navigate = useNavigate();

useEffect(() => {
const fetchDispensaries = async () => {
try {
const { data, error } = await supabase
.from('dispensaries')
.select('*')
.order('created_at',{ascending:false});

if(error) throw error;
if(data) setDispensaries(data as DbDispensary[]);
} catch(err){
console.error(err);
} finally{
setLoading(false);
}
};

fetchDispensaries();
},[]);

return(

<div className="min-h-screen bg-abstract flex flex-col font-sans overflow-x-hidden">

{/* HEADER */}
<nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
<div className="container mx-auto px-4 h-16 flex items-center justify-between">

{/* SVG LOGO — unchanged */}
<div className="flex items-center gap-2 cursor-pointer" onClick={()=>navigate('/')}>
<div className="w-10 h-10 bg-[#10B981] rounded-full flex items-center justify-center shadow-sm">
<svg viewBox="0 0 24 24" className="h-6 w-6 fill-white">
<path d="M12,16C12,16 12,11.5 12,9.5C12,7.5 11,5 11,5C11,5 10,7.5 10,9.5C10,11.5 10,16 10,16H12"/>
</svg>
</div>
<span className="text-xl font-bold tracking-tight text-[#0F172A]">
Bud<span className="text-[#10B981]">Runner</span>
</span>
</div>

<div className="flex items-center gap-3">

<button
onClick={()=>setDriverModal(true)}
className="hidden sm:flex items-center gap-2 px-5 py-2 bg-[#10B981] text-white text-[10px] font-black uppercase tracking-widest rounded-full"
>
<Truck className="h-3.5 w-3.5"/> Driver Early Access
</button>

<button
onClick={()=>navigate('/auth')}
className="px-5 py-2 bg-[#0F172A] text-white text-sm font-bold rounded-full"
>
Sign In
</button>

</div>
</div>
</nav>

<main className="flex-grow pt-16">

{/* GOD MODE HERO — unchanged animation */}
<section className="relative pt-24 pb-20 md:pt-36 md:pb-28 px-6 overflow-hidden">

<div className="absolute inset-0 pointer-events-none">
<div className="absolute left-1/2 top-20 -translate-x-1/2 w-[700px] h-[700px] bg-emerald-400/20 blur-[120px] rounded-full"/>
</div>

<div className="container mx-auto relative z-10">

<motion.h1 initial={{opacity:0,y:40}} animate={{opacity:1,y:0}} transition={{duration:.7}}
className="text-6xl md:text-8xl font-black tracking-tighter text-[#0F172A]">
Delivery,
</motion.h1>

<motion.h2 initial={{opacity:0,y:60}} animate={{opacity:1,y:0}} transition={{delay:.2,duration:.8}}
className="relative text-[2.6rem] sm:text-6xl md:text-8xl font-bold italic font-serif">
<span className="hero-gradient-text relative z-10">Elevated.</span>
<span className="absolute inset-0 blur-3xl opacity-50 hero-gradient-text"/>
</motion.h2>

<p className="mt-6 max-w-xl text-slate-500 font-medium text-lg">
Compare Plainfield dispensaries. Find the best deals. Prepare for delivery launch.
</p>

{/* SEARCH + BROWSE */}
<div className="mt-8 flex gap-4 flex-wrap items-center">

<input
placeholder="Search products, dispensaries..."
className="w-full md:w-[420px] px-6 py-4 rounded-xl border border-slate-200"
/>

<button
onClick={()=>document.getElementById('dispensaries')?.scrollIntoView({behavior:'smooth'})}
className="px-8 py-4 bg-[#0F172A] text-white rounded-2xl font-bold flex items-center gap-3 shadow-xl"
>
Browse Menus <ArrowRight className="h-5 w-5 text-[#10B981]"/>
</button>

</div>

{/* DELIVERY EARLY ACCESS */}
<div className="mt-6">
<p className="text-sm text-slate-500 mb-2">Delivery Launching Soon in Plainfield</p>

<div className="flex gap-3 flex-wrap">
<input placeholder="Enter your email"
className="px-5 py-3 rounded-xl border border-slate-200 w-[260px]"/>

<button className="px-6 py-3 bg-[#10B981] text-white rounded-xl font-bold">
Join Early Access
</button>
</div>

<p className="text-xs text-slate-400 mt-2">
Be the first to order when we go live.
</p>
</div>

</div>
</section>

</main>

<Footer/>

{/* DRIVER MODAL */}
{driverModal &&(
<div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">

<div className="bg-white rounded-2xl p-8 w-full max-w-md relative shadow-xl">

<button onClick={()=>setDriverModal(false)} className="absolute right-4 top-2 text-xl">×</button>

<h2 className="text-2xl font-black mb-2">Driver Platform Launching Soon</h2>

<p className="text-slate-500 mb-6 text-sm">
Join early to receive priority access when delivery launches.
</p>

<input placeholder="Full Name" className="w-full mb-3 px-4 py-3 border rounded-xl"/>
<input placeholder="Email Address" className="w-full mb-4 px-4 py-3 border rounded-xl"/>

<button className="w-full bg-[#10B981] text-white py-3 rounded-xl font-bold">
Join Driver Waitlist
</button>

</div>
</div>
)}

</div>
);
}
