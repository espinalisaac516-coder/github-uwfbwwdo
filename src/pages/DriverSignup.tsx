import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ShieldCheck, ArrowRight, Lock, Globe, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function DriverSignup() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 bg-background">

      {/* Back Button (matches auth/home styling) */}
      <div className="container mx-auto mb-6">
        <button 
          onClick={() => navigate('/')} 
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to home
        </button>
      </div>

      <div className="container mx-auto max-w-6xl grid lg:grid-cols-2 gap-12 items-start">

        {/* LEFT SIDE */}
        <div className="space-y-6">
          <div className="inline-block px-3 py-1 rounded-full bg-primary/10 border border-primary/20">
            <span className="text-xs font-bold text-primary uppercase tracking-widest">
              NJ-CRC Compliant Operations
            </span>
          </div>

          <h1 className="font-display text-5xl font-black tracking-tighter leading-tight">
            Earn on <span className="text-primary">Your Terms</span>
          </h1>

          <p className="text-muted-foreground max-w-md">
            Join Plainfield's elite delivery fleet. We provide the tech; you provide the drive.
          </p>

          <div className="space-y-4">
            <RequirementItem title="Age Requirement" desc="Must be 19+ with a valid NJ Driver's License." icon={<ShieldCheck />} />
            <RequirementItem title="Secure Transport" desc="Vehicle must have a locked cargo area." icon={<Lock />} />
            <RequirementItem title="Real-Time GPS" desc="Our app handles mandatory tracking." icon={<Globe />} />
          </div>
        </div>

        {/* RIGHT SIDE FORM */}
        <Card className="glass-card p-8 relative overflow-hidden">

          <div className="mb-8">
            <h3 className="font-display text-2xl font-bold">
              {step === 1 ? "Personal Details" : "Vehicle Information"}
            </h3>
            <p className="text-sm text-muted-foreground">
              Step {step} of 2
            </p>
          </div>

          <div className="space-y-5">

            {step === 1 ? (
              <>
                <InputBlock label="Full Legal Name" placeholder="As it appears on your ID" />

                <div className="grid grid-cols-2 gap-4">
                  <InputBlock label="Phone Number" placeholder="(908) 555-0123" />
                  <InputBlock label="SSN (For Background Check)" placeholder="***-**-****" type="password" />
                </div>

                <Button onClick={() => setStep(2)} className="w-full">
                  Next: Vehicle Details <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </>
            ) : (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <InputBlock label="Vehicle Make" placeholder="Toyota" />
                  <InputBlock label="Model" placeholder="Camry" />
                </div>

                <InputBlock label="License Plate" placeholder="A12-BC3" />

                <div className="flex gap-4 pt-4">
                  <Button variant="outline" onClick={() => setStep(1)} className="flex-1">
                    Back
                  </Button>

                  <Button onClick={() => navigate('/id-scan')} className="flex-[2]">
                    Start ID Verification
                  </Button>
                </div>
              </>
            )}

          </div>
        </Card>
      </div>
    </div>
  );
}

function RequirementItem({ title, desc, icon }: any) {
  return (
    <div className="flex gap-4">
      <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-secondary">
        {icon}
      </div>
      <div>
        <h4 className="font-semibold text-sm">{title}</h4>
        <p className="text-xs text-muted-foreground">{desc}</p>
      </div>
    </div>
  );
}

function InputBlock({ label, ...props }: any) {
  return (
    <div className="space-y-1">
      <label className="text-xs font-semibold text-muted-foreground">{label}</label>
      <input {...props} className="w-full px-4 py-2.5 rounded-lg bg-secondary border border-border focus:ring-2 focus:ring-primary/50 outline-none transition" />
    </div>
  );
}