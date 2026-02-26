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
const { data } = await supabase
.from('dispensaries')
.select('*')
.order('created_at', { ascending: false });

if (data) setDispensaries(data as DbDispensary[]);
setLoading(false);
};

fetchDispensaries();
}, []);

return (
<div className="min-h-screen bg-abstract flex flex-col font-sans overflow-x-hidden">

{/* HEADER */}
<nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
<div className="container mx-auto px-4 h-16 flex items-center justify-between">

{/* LOGO (UNCHANGED) */}
<div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
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
className="hidden sm:flex items-center gap-2 px-5 py-2 bg-[#10B981] text-white text-[10px] font-black uppercase tracking-widest rounded-full"
>
<Truck className="h-3.5 w-3.5" /> Driver Early Access
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

{/* GOD MODE HERO */}
<section className="relative pt-24 pb-20 md:pt-36 md:pb-28 px-6 overflow-hidden">

<div className="absolute inset-0 pointer-events-none">
<div className="absolute left-1/2 top-20 -translate-x-1/2 w-[700px] h-[700px] bg-emerald-400/20 blur-[120px] rounded-full"/>
</div>

<div className="container mx-auto relative z-10">

<motion.h1
initial={{opacity:0,y:30}}
animate={{opacity:1,y:0}}
transition={{duration:0.6}}
className="text-6xl md:text-8xl font-black tracking-tighter text-[#0F172A]"
>
Delivery,
</motion.h1>

<motion.h2
initial={{opacity:0,y:40}}
animate={{opacity:1,y:0}}
transition={{delay:0.2}}
className="relative text-[2.6rem] sm:text-6xl md:text-8xl font-bold italic font-serif hero-gradient-text"
>
Elevated.
</motion.h2>

<motion.p
initial={{opacity:0}}
animate={{opacity:1}}
transition={{delay:0.3}}
className="mt-6 max-w-xl text-slate-500 font-medium text-lg"
>
Compare Plainfield dispensaries. Find the best deals. Prepare for delivery launch.
</motion.p>

{/* TAGS */}
<div className="flex flex-wrap gap-3 mt-6 text-sm text-slate-500">
<span>Licensed NJ Retailers</span>
<span>Real-Time Menu Updates</span>
<span>Delivery Coming Soon</span>
<span>Plainfield, NJ</span>
</div>

{/* SEARCH + BUTTON */}
<div className="mt-8 flex flex-col md:flex-row gap-4 items-start md:items-center">
<input
placeholder="Search products, dispensaries..."
className="w-full md:w-[420px] px-6 py-4 rounded-xl border border-slate-200"
/>

<button
onClick={()=>{
const el=document.getElementById('dispensaries');
if(el) el.scrollIntoView({behavior:'smooth'});
}}
className="px-8 py-4 bg-[#0F172A] text-white rounded-2xl font-bold flex items-center gap-3 shadow-xl"
>
Browse Menus
<ArrowRight className="h-5 w-5 text-[#10B981]" />
</button>
</div>

{/* EARLY ACCESS BELOW SEARCH */}
<div className="mt-6">
<p className="text-sm text-slate-600 mb-2">
Delivery Launching Soon in Plainfield
</p>

<div className="flex flex-col md:flex-row gap-3">
<input
placeholder="Enter your email"
className="px-6 py-4 rounded-xl border border-slate-200"
/>

<button className="px-6 py-4 bg-[#10B981] text-white font-bold rounded-xl">
Join Early Access
</button>
</div>
</div>

</div>
</section>

{/* VALUE PROPS */}
<section className="py-20 px-6 border-y border-slate-100 bg-white/50">
<div className="container mx-auto grid md:grid-cols-3 gap-16">
<Value icon={<Zap className="text-[#10B981]" />} title="Fast Pickup" desc="Quickest verified dispensary pickups." />
<Value icon={<ShieldCheck className="text-[#10B981]" />} title="Verified Legal" desc="NJ licensed retailers only." />
<Value icon={<Navigation className="text-[#10B981]" />} title="Live Tracking" desc="Delivery tracking coming soon." />
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