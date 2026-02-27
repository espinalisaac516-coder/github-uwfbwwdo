import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { DbDispensary } from '@/lib/types';
import { Truck, ArrowRight, ShieldCheck, Zap, Navigation } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from "framer-motion";
import { toast } from "sonner";

import DispensaryCard from "@/components/DispensaryCard";
import Footer from "@/components/Footer";

export default function Index() {

const [dispensaries, setDispensaries] = useState<DbDispensary[]>([]);
const [loading, setLoading] = useState(true);

const [driverModalOpen,setDriverModalOpen] = useState(false);

const [searchQuery,setSearchQuery] = useState("");
const [earlyAccessEmail,setEarlyAccessEmail] = useState("");

const [driverName,setDriverName] = useState("");
const [driverEmail,setDriverEmail] = useState("");

type Deal = {
  id: number;
  dispensary_name: string;
  product_name: string;
  price: number;
  label: string;
  };
  
  const [trendingDeals, setTrendingDeals] = useState<Deal[]>([
  {
  id: 1,
  dispensary_name: "Queen City",
  product_name: "Chem Scout 3.5g",
  price: 42,
  label: "30% OFF"
  },
  {
  id: 2,
  dispensary_name: "Plant Base",
  product_name: "Girl Scout Cookie 3.5g",
  price: 38.5,
  label: "$21.50 OFF"
  },
  {
  id: 3,
  dispensary_name: "MindLift",
  product_name: "Mandarin ZKZ 3.5g",
  price: 32.08,
  label: "20% OFF"
  }
  ]);
  

const navigate = useNavigate();

useEffect(()=>{

const fetchDispensaries = async () => {

const { data } = await supabase
.from('dispensaries')
.select('*')
.order('created_at',{ascending:false});

if(data) setDispensaries(data as DbDispensary[]);
setLoading(false);

};

fetchDispensaries();

},[]);

useEffect(() => {

  const fetchTrending = async () => {
  
  const { data } = await supabase
  .from('aggregated_deals')
  .select('*')
  .or('is_price_drop.eq.true,is_new.eq.true')
  .order('created_at',{ascending:false})
  .limit(3);
  
  if(data) setTrendingDeals(data);
  
  };
  
  fetchTrending();
  
  },[]);


// DELIVERY EARLY ACCESS
const joinEarlyAccess = async () => {

if(!earlyAccessEmail){
toast.error("Enter email first");
return;
}

const { error } = await supabase
.from("early_access")
.insert({ email: earlyAccessEmail });

if(error){
toast.error("Already joined or error");
return;
}

toast.success("You're on the early access list!");
setEarlyAccessEmail("");

};


// DRIVER WAITLIST
const joinDriverWaitlist = async () => {

if(!driverName || !driverEmail){
toast.error("Fill all fields");
return;
}

const { error } = await supabase
.from("driver_early_access")
.insert({
name: driverName,
email: driverEmail
});

if(error){
toast.error("Already joined or error");
return;
}

toast.success("Driver application submitted!");

setDriverName("");
setDriverEmail("");
setDriverModalOpen(false);

};


return(

<div className="min-h-screen bg-abstract flex flex-col font-sans overflow-x-hidden">

{/* HEADER */}
<nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">

<div className="container mx-auto px-4 h-16 flex items-center justify-between">

<div className="flex items-center gap-2 cursor-pointer" onClick={()=>navigate('/')}>
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
onClick={()=>setDriverModalOpen(true)}
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

{/* HERO */}
<section className="relative pt-24 pb-20 md:pt-36 md:pb-28 px-6 overflow-hidden">

<div className="absolute inset-0 pointer-events-none">
<motion.div
animate={{ scale:[1,1.05,1] }}
transition={{ duration:8, repeat:Infinity }}
className="absolute left-1/2 top-20 -translate-x-1/2 w-[700px] h-[700px] bg-emerald-400/20 blur-[120px] rounded-full"
/>
</div>

<div className="container mx-auto relative z-10">

<motion.h1 initial={{opacity:0,y:20}} animate={{opacity:1,y:0}}
className="text-6xl md:text-8xl font-black tracking-tighter text-[#0F172A]">
Delivery,
</motion.h1>

<motion.h2 initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:.2}}
className="relative text-[2.6rem] sm:text-6xl md:text-8xl font-bold italic font-serif">
<span className="hero-gradient-text relative z-10">Elevated.</span>
<span className="absolute inset-0 blur-3xl opacity-50 hero-gradient-text"/>
</motion.h2>

<p className="mt-6 max-w-xl text-slate-500 font-medium text-lg">
Compare Plainfield dispensaries. Find the best deals. Prepare for delivery launch.
</p>

<div className="flex flex-wrap gap-3 mt-6 text-sm text-slate-500">
<span>Licensed NJ Retailers</span>
<span>Real-Time Menu Updates</span>
<span>Delivery Coming Soon</span>
<span>Plainfield, NJ</span>
</div>

{/* LIVE TRENDING SECTION */}

{/* Today's Best Prices in Plainfield */}
<section className="mt-10 bg-white/60 backdrop-blur-md border border-slate-200 rounded-2xl px-6 py-8 shadow-sm">

<div className="flex items-center justify-between mb-6">
<p className="text-xs uppercase tracking-widest text-emerald-500 font-semibold">
🔥 Today’s Best Prices in Plainfield
</p>
<span className="text-xs text-slate-500">
Updated Daily
</span>
</div>

<div className="grid grid-cols-1 md:grid-cols-3 gap-6">

{/* FLOWER WINNER */}
<div className="bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-md transition-all duration-300">

<p className="text-xs uppercase tracking-widest text-slate-400 mb-2">
Flower
</p>

<p className="text-lg font-semibold text-[#0F172A]">
GMO x Root Beer – 3.5g
</p>

<p className="text-sm text-slate-500 mt-1">
Plant Base
</p>

<div className="flex items-center justify-between mt-4">
<div>
<p className="text-sm line-through text-slate-400">
$45
</p>
<p className="text-2xl font-black text-[#10B981]">
$20
</p>
</div>

<span className="text-[10px] uppercase bg-emerald-100 text-emerald-600 px-3 py-1 rounded-full font-semibold tracking-wider">
Best Price Today
</span>
</div>

</div>


{/* VAPE WINNER */}
<div className="bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-md transition-all duration-300">

<p className="text-xs uppercase tracking-widest text-slate-400 mb-2">
Vape
</p>

<p className="text-lg font-semibold text-[#0F172A]">
Rove Orange Crush – 1g
</p>

<p className="text-sm text-slate-500 mt-1">
Queen City
</p>

<div className="flex items-center justify-between mt-4">
<div>
<p className="text-sm line-through text-slate-400">
$84
</p>
<p className="text-2xl font-black text-[#10B981]">
$71.40
</p>
</div>

<span className="text-[10px] uppercase bg-emerald-100 text-emerald-600 px-3 py-1 rounded-full font-semibold tracking-wider">
Best Price Today
</span>
</div>

</div>


{/* EDIBLE WINNER */}
<div className="bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-md transition-all duration-300">

<p className="text-xs uppercase tracking-widest text-slate-400 mb-2">
Edible
</p>

<p className="text-lg font-semibold text-[#0F172A]">
GRON Mega Gummies – 10pk
</p>

<p className="text-sm text-slate-500 mt-1">
Plant Base
</p>

<div className="flex items-center justify-between mt-4">
<div>
<p className="text-sm line-through text-slate-400">
$16
</p>
<p className="text-2xl font-black text-[#10B981]">
$12
</p>
</div>

<span className="text-[10px] uppercase bg-emerald-100 text-emerald-600 px-3 py-1 rounded-full font-semibold tracking-wider">
Best Price Today
</span>
</div>

</div>

</div>

</section>




<div className="mt-8 flex flex-col md:flex-row gap-4">

<input
value={searchQuery}
onChange={(e)=>setSearchQuery(e.target.value)}
placeholder="Search products, dispensaries..."
className="w-full md:w-[420px] px-6 py-4 rounded-xl border border-slate-200"
/>

<button
onClick={()=>document.getElementById('dispensaries')?.scrollIntoView({behavior:'smooth'})}
className="px-8 py-4 bg-[#0F172A] text-white rounded-2xl font-bold flex items-center gap-3 shadow-xl"
>
Compare Deals <ArrowRight className="h-5 w-5 text-[#10B981]"/>
</button>

</div>

<div className="mt-6">
<p className="text-sm font-semibold text-slate-600 mb-2">
Delivery Launching Soon in Plainfield
</p>

<div className="flex flex-col md:flex-row gap-3">

<input
value={earlyAccessEmail}
onChange={(e)=>setEarlyAccessEmail(e.target.value)}
placeholder="Enter your email"
className="px-6 py-4 rounded-xl border border-slate-200 w-full md:w-[300px]"
/>

<button
onClick={joinEarlyAccess}
className="px-6 py-4 bg-[#10B981] text-white font-bold rounded-xl">
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
<Value icon={<Zap className="text-[#10B981]"/>} title="Fast Pickup" desc="Quickest verified dispensary pickups."/>
<Value icon={<ShieldCheck className="text-[#10B981]"/>} title="Verified Legal" desc="NJ licensed retailers only."/>
<Value icon={<Navigation className="text-[#10B981]"/>} title="Live Tracking" desc="Delivery tracking coming soon."/>
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

{/* DRIVER MODAL */}
{driverModalOpen && (
<div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 px-4">
<div className="bg-white rounded-2xl p-8 w-full max-w-md relative shadow-xl">

<button onClick={()=>setDriverModalOpen(false)} className="absolute right-4 top-3 text-xl">✕</button>

<h2 className="text-2xl font-black mb-2">
Join the Founding BudRunner Driver Network
</h2>

<p className="text-slate-500 mb-6 text-sm">
Get priority access when delivery launches in Plainfield.
</p>

<input
value={driverName}
onChange={(e)=>setDriverName(e.target.value)}
placeholder="Full Name"
className="w-full mb-3 px-4 py-3 border rounded-xl"
/>

<input
value={driverEmail}
onChange={(e)=>setDriverEmail(e.target.value)}
placeholder="Email Address"
className="w-full mb-4 px-4 py-3 border rounded-xl"
/>

<button
onClick={joinDriverWaitlist}
className="w-full bg-[#10B981] text-white py-3 rounded-xl font-bold">
Join Driver Waitlist
</button>

</div>
</div>
)}

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
