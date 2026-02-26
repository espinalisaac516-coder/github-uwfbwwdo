import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { DbDispensary } from "@/lib/types";
import { Truck, ArrowRight, ShieldCheck, Zap, Navigation } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import DispensaryCard from "@/components/DispensaryCard";
import Footer from "@/components/Footer";

export default function Index() {

const [dispensaries, setDispensaries] = useState<DbDispensary[]>([]);
const [loading, setLoading] = useState(true);
const [driverModal, setDriverModal] = useState(false);
const [email,setEmail] = useState("");

const navigate = useNavigate();

useEffect(() => {
const fetchDispensaries = async () => {
const { data } = await supabase
.from("dispensaries")
.select("*")
.order("created_at",{ascending:false});

if(data) setDispensaries(data as DbDispensary[]);
setLoading(false);
};

fetchDispensaries();
}, []);

const joinDriverWaitlist = () => {
if(!email) return;
alert("Driver early access unlocked 🔥");
setEmail("");
setDriverModal(false);
};

return (
<div className="min-h-screen bg-abstract flex flex-col overflow-x-hidden">

{/* HEADER */}
<nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
<div className="container mx-auto px-4 h-16 flex items-center justify-between">

{/* LOGO */}
<div className="flex items-center gap-2 cursor-pointer" onClick={()=>navigate("/")}>
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

{/* DRIVER EARLY ACCESS BUTTON */}
<button
onClick={()=>setDriverModal(true)}
className="hidden sm:flex items-center gap-2 px-5 py-2 bg-[#10B981] text-white text-[10px] font-black uppercase tracking-widest rounded-full"
>
<Truck className="h-3.5 w-3.5"/> Driver Early Access
</button>

<button
onClick={()=>navigate("/auth")}
className="px-5 py-2 bg-[#0F172A] text-white text-sm font-bold rounded-full"
>
Sign In
</button>

</div>
</div>
</nav>

<main className="flex-grow pt-16">

{/* GOD MODE HERO — MOBILE OPTIMIZED */}
<section className="relative pt-24 pb-20 px-6 overflow-hidden">

<div className="absolute inset-0 pointer-events-none">
<div className="absolute left-1/2 top-20 -translate-x-1/2 w-[700px] h-[700px] bg-emerald-400/20 blur-[120px] rounded-full"/>
</div>

<div className="container mx-auto relative z-10">

<motion.h1
initial={{opacity:0,y:20}}
animate={{opacity:1,y:0}}
transition={{duration:0.5}}
className="text-5xl md:text-8xl font-black tracking-tighter text-[#0F172A]"
>
Delivery,
</motion.h1>

<motion.h2
initial={{opacity:0}}
animate={{opacity:1}}
transition={{delay:0.1}}
className="text-5xl md:text-8xl font-bold italic font-serif hero-gradient-text"
>
Elevated.
</motion.h2>

<p className="mt-6 max-w-xl text-slate-500 font-medium text-lg">
Compare Plainfield dispensaries. Find the best deals. Prepare for delivery launch.
</p>

<button
onClick={()=>document.getElementById("dispensaries")?.scrollIntoView({behavior:"smooth"})}
className="mt-8 px-10 py-5 bg-[#0F172A] text-white rounded-2xl font-bold flex items-center gap-3 shadow-2xl"
>
Browse Menus <ArrowRight className="h-6 w-6 text-[#10B981]"/>
</button>

</div>
</section>

{/* VALUE PROPS */}
<section className="py-20 px-6 border-y border-slate-100 bg-white/50">
<div className="container mx-auto grid md:grid-cols-3 gap-16">
<Value icon={<Zap className="text-[#10B981]" />} title="FAST PICKUP" desc="Quickest verified dispensary pickups." />
<Value icon={<ShieldCheck className="text-[#10B981]" />} title="VERIFIED LEGAL" desc="NJ licensed retailers only." />
<Value icon={<Navigation className="text-[#10B981]" />} title="LIVE TRACKING" desc="Delivery tracking coming soon." />
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

{/* DRIVER EARLY ACCESS MODAL */}
{driverModal && (
<div className="fixed inset-0 bg-black/40 backdrop-blur flex items-center justify-center z-50">
<div className="bg-white p-8 rounded-2xl max-w-md w-full space-y-4">
<h3 className="text-xl font-black">Driver Mode Coming Soon 🚀</h3>
<p className="text-sm text-slate-500">
Join early access and be first to earn when delivery launches.
</p>

<input
value={email}
onChange={(e)=>setEmail(e.target.value)}
placeholder="Enter your email"
className="w-full border rounded-lg p-3"
/>

<button
onClick={joinDriverWaitlist}
className="w-full bg-[#10B981] text-white py-3 rounded-xl font-bold"
>
Unlock Driver Access
</button>

<button
onClick={()=>setDriverModal(false)}
className="text-sm text-slate-400"
>
Close
</button>
</div>
</div>
)}

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