import React, { useEffect, useState, useRef } from 'react';
import { Html5Qrcode, Html5QrcodeSupportedFormats } from "html5-qrcode";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ShieldCheck, ShieldAlert, RefreshCw, ArrowLeft, Zap, Maximize } from "lucide-react";
import { useNavigate } from "react-router-dom";

const IDScanner = () => {
  const navigate = useNavigate();
  const [ageStatus, setAgeStatus] = useState<{msg: string, type: 'neutral' | 'success' | 'error' | 'warning'}>({
    msg: "Center the thick barcode",
    type: 'neutral'
  });
  
  const scannerRef = useRef<Html5Qrcode | null>(null);

  useEffect(() => {
    const html5QrCode = new Html5Qrcode("reader");
    scannerRef.current = html5QrCode;

    // Aggressive config for difficult lighting
    const config = { 
      fps: 30,
      qrbox: { width: 350, height: 200 },
      formatsToSupport: [Html5QrcodeSupportedFormats.PDF_417],
      videoConstraints: {
        facingMode: "environment",
        // Force the browser to use high-quality video for tiny dots
        width: { min: 1280, ideal: 1920 },
        height: { min: 720, ideal: 1080 }
      }
    };

    html5QrCode.start(
      { facingMode: "environment" }, 
      config,
      (decodedText) => { verifyAge(decodedText); },
      () => {}
    ).catch(() => {
      setAgeStatus({ msg: "Camera Error - Refresh Page", type: 'error' });
    });

    return () => {
      if (scannerRef.current?.isScanning) {
        scannerRef.current.stop().catch(() => {});
      }
    };
  }, []);

  const verifyAge = (data: string) => {
    const dobIndex = data.indexOf("DBB");
    if (dobIndex !== -1) {
      const dobString = data.substring(dobIndex + 3, dobIndex + 11);
      const year = parseInt(dobString.substring(0, 4));
      const month = parseInt(dobString.substring(4, 6)) - 1;
      const day = parseInt(dobString.substring(6, 8));
      
      const birthDate = new Date(year, month, day);
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      if (today.getMonth() < birthDate.getMonth() || (today.getMonth() === birthDate.getMonth() && today.getDate() < birthDate.getDate())) age--;
      
      if (age >= 21) {
        setAgeStatus({ msg: `VERIFIED: ${age}`, type: 'success' });
        scannerRef.current?.stop();
      } else {
        setAgeStatus({ msg: `REJECTED: ${age}`, type: 'error' });
      }
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-4 flex flex-col items-center">
      <div className="w-full max-w-md space-y-4">
        
        <div className="flex justify-between items-center pt-2">
          <Button variant="ghost" onClick={() => navigate('/dashboard')} className="text-zinc-500 underline">
            Exit Scanner
          </Button>
          <div className="bg-green-600 px-3 py-1 rounded text-[10px] font-bold animate-pulse">
            HIGH-SPEED MODE
          </div>
        </div>

        {/* Viewfinder with much thinner borders so you can see better */}
        <Card className="overflow-hidden bg-zinc-950 border-zinc-800 relative aspect-video">
          <div id="reader" className="w-full h-full"></div>
          {/* Target Overlay */}
          <div className="absolute inset-0 border-2 border-green-500/30 m-8 rounded-lg pointer-events-none">
            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-green-500"></div>
            <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-green-500"></div>
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-green-500"></div>
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-green-500"></div>
          </div>
        </Card>

        <div className={`p-8 rounded-2xl border-4 text-center transition-all ${
          ageStatus.type === 'success' ? 'bg-green-600 border-green-300 shadow-[0_0_30px_rgba(34,197,94,0.5)]' :
          ageStatus.type === 'error' ? 'bg-red-600 border-red-300' :
          'bg-zinc-900 border-zinc-800 text-zinc-400'
        }`}>
          <p className="text-2xl font-black italic tracking-tight">{ageStatus.msg}</p>
        </div>

        <Button 
          onClick={() => window.location.reload()} 
          className="w-full py-12 bg-white text-black hover:bg-zinc-200 rounded-3xl font-black text-xl shadow-2xl"
        >
          <Maximize className="mr-3 h-6 w-6" /> TAP TO RE-FOCUS
        </Button>

        <p className="text-center text-[10px] text-zinc-700 font-bold uppercase tracking-[0.2em]">
          Plainfield Compliance // Driver Bridge
        </p>
      </div>
    </div>
  );
};

export default IDScanner;