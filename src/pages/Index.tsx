import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { Zap, ShieldCheck, Navigation } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DispensaryCard from "@/components/DispensaryCard";

export default function Index() {
const [dispensaries, setDispensaries] = useState<any[]>([]);
const [loading, setLoading] = useState(true);
const navigate = useNavigate();

useEffect(() => {
const fetchDispensaries = async () => {
const { data } = await supabase
.from("dispensaries")
.select("*")
.order("created_at", { ascending: false });

if (data) setDispensaries(data);
setLoading(false);
};

fetchDispensaries();
}, []);

return (
<div className="min-h-screen bg-white text-slate-800">

<Navbar />

<main>

{/* ================= HERO ================= */}
<section className="relative pt-28 pb-24 px-6 overflow-hidden">

<div className="container mx-auto">

<h1 className="text-6xl md:text-8xl font-black tracking-tight text-[#0F172A]">
Delivery,
</h1>

<h2 className="text-5xl md:text-8xl italic font-serif hero-gradient-text">
Elevated.
</h2>

<p className="mt-6 max-w-xl text-slate-600 text-lg">
Compare Plainfield dispensaries. Find the best deals.
Prepare for delivery launch.
</p>

{/* Feature Tags */}
<div className="mt-6 flex flex-wrap gap-3 text-sm font-semibold">
<span className="px-4 py-2 bg-emerald-50 text-emerald-700 rounded-full">
Licensed NJ Retailers
</span>
<span className="px-4 py-2 bg-emerald-50 text-emerald-700 rounded-full">
Real-Time Menu Updates
</span>
<span className="px-4 py-2 bg-emerald-50 text-emerald-700 rounded-full">
Delivery Coming Soon
</span>
<span className="px-4 py-2 bg-emerald-50 text-emerald-700 rounded-full">
Plainfield, NJ
</span>
</div>

{/* Search */}
<div className="mt-10 flex flex-col md:flex-row gap-4">
<input
placeholder="Search products, dispensaries..."
className="px-6 py-4 rounded-xl border w-full md:w-[420px]"
/>
<button
onClick={() =>
document
.getElementById("dispensaries")
?.scrollIntoView({ behavior: "smooth" })
}
className="px-8 py-4 bg-[#0F172A] text-white rounded-xl font-bold"
>
Browse Menus →
</button>
</div>

{/* Early Access */}
<div className="mt-16 border-t pt-10 max-w-lg">
<h3 className="font-bold text-lg">
Delivery Launching Soon in Plainfield
</h3>
<p className="text-slate-500 mt-2">
Be the first to order when we go live.
</p>
<div className="flex gap-3 mt-4">
<input
placeholder="Enter your email"
className="px-4 py-3 border rounded-lg flex-1"
/>
<button className="bg-emerald-500 text-white px-6 rounded-lg font-bold">
Join Early Access
</button>
</div>
</div>

</div>
</section>

{/* ================= VALUE PROPS ================= */}
<section className="py-20 px-6 border-y border-slate-100 bg-white/50">
<div className="container mx-auto grid md:grid-cols-3 gap-16">

<Value
icon={<Zap className="text-emerald-500" />}
title="Fast Pickup Times"
desc="Average dispensary readiness."
/>

<Value
icon={<ShieldCheck className="text-emerald-500" />}
title="Verified Legal"
desc="NJ licensed dispensaries only."
/>

<Value
icon={<Navigation className="text-emerald-500" />}
title="Live Tracking (Coming Soon)"
desc="Real-time delivery tracking at launch."
/>

</div>
</section>

{/* ================= DISPENSARIES ================= */}
<section id="dispensaries" className="py-24 px-6 bg-white">
<div className="container mx-auto">
<h2 className="text-3xl font-black text-[#0F172A] mb-12 uppercase">
Nearby Dispensaries
</h2>

<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
{!loading &&
dispensaries.map((d, i) => (
<DispensaryCard key={d.id} dispensary={d} index={i} />
))}
</div>
</div>
</section>

</main>

<Footer />

</div>
);
}

function Value({ icon, title, desc }: any) {
return (
<div className="flex flex-col gap-4">
{icon}
<h3 className="text-xl font-black text-[#0F172A]">{title}</h3>
<p className="text-slate-500 text-sm">{desc}</p>
</div>
);
}