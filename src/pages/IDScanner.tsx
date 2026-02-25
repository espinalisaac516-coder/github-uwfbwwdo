import React, { useEffect, useRef, useState } from "react";
import { BrowserMultiFormatReader, BarcodeFormat } from "@zxing/browser";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Maximize } from "lucide-react";
import { useNavigate } from "react-router-dom";

const IDScanner = () => {
  const navigate = useNavigate();
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const codeReader = useRef<BrowserMultiFormatReader | null>(null);

  const [ageStatus, setAgeStatus] = useState<{
    msg: string;
    type: "neutral" | "success" | "error" | "warning";
  }>({
    msg: "Center the thick barcode",
    type: "neutral",
  });

  useEffect(() => {
    const reader = new BrowserMultiFormatReader();
    codeReader.current = reader;

    const startScanner = async () => {
      try {
        const devices = await BrowserMultiFormatReader.listVideoInputDevices();
        const backCamera =
          devices.find((d) =>
            d.label.toLowerCase().includes("back")
          ) || devices[0];

        await reader.decodeFromVideoDevice(
          backCamera.deviceId,
          videoRef.current!,
          (result, err) => {
            if (result) {
              const text = result.getText();
              console.log("SCANNED:", text);
              verifyAge(text);
            }
          }
        );
      } catch (err) {
        console.error("Camera error:", err);
        setAgeStatus({ msg: "Camera Error", type: "error" });
      }
    };

    startScanner();

    return () => {
      reader.reset();
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
      if (
        today.getMonth() < birthDate.getMonth() ||
        (today.getMonth() === birthDate.getMonth() &&
          today.getDate() < birthDate.getDate())
      ) {
        age--;
      }

      if (age >= 21) {
        setAgeStatus({ msg: `VERIFIED: ${age}`, type: "success" });
        codeReader.current?.reset();
      } else {
        setAgeStatus({ msg: `REJECTED: ${age}`, type: "error" });
      }
    } else {
      setAgeStatus({ msg: "Invalid ID Format", type: "warning" });
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-4 flex flex-col items-center">
      <div className="w-full max-w-md space-y-4">
        <div className="flex justify-between items-center pt-2">
          <Button
            variant="ghost"
            onClick={() => navigate("/dashboard")}
            className="text-zinc-500 underline"
          >
            Exit Scanner
          </Button>
          <div className="bg-green-600 px-3 py-1 rounded text-[10px] font-bold animate-pulse">
            ZXING MODE
          </div>
        </div>

        <Card className="overflow-hidden bg-zinc-950 border-zinc-800 relative aspect-video">
          <video
            ref={videoRef}
            className="w-full h-full object-cover"
          />
        </Card>

        <div
          className={`p-8 rounded-2xl border-4 text-center transition-all ${
            ageStatus.type === "success"
              ? "bg-green-600 border-green-300 shadow-[0_0_30px_rgba(34,197,94,0.5)]"
              : ageStatus.type === "error"
              ? "bg-red-600 border-red-300"
              : ageStatus.type === "warning"
              ? "bg-yellow-600 border-yellow-300"
              : "bg-zinc-900 border-zinc-800 text-zinc-400"
          }`}
        >
          <p className="text-2xl font-black italic tracking-tight">
            {ageStatus.msg}
          </p>
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