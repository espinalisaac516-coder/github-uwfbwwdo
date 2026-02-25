import React, { useEffect, useRef, useState } from "react";
import { BrowserMultiFormatReader } from "@zxing/browser";
import { DecodeHintType, BarcodeFormat } from "@zxing/library";
import { useNavigate } from "react-router-dom";

const IDScanner = () => {
  const navigate = useNavigate();
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const codeReader = useRef<BrowserMultiFormatReader | null>(null);

  const [ageStatus, setAgeStatus] = useState<{
    msg: string;
    type: "neutral" | "success" | "error" | "warning";
  }>({
    msg: "Align NJ license barcode",
    type: "neutral",
  });

  useEffect(() => {

    // 🔥 FORCE DMV MODE (PDF417 ONLY)
    const hints = new Map();
    hints.set(DecodeHintType.POSSIBLE_FORMATS, [
      BarcodeFormat.PDF_417
    ]);

    const reader = new BrowserMultiFormatReader(hints);
    codeReader.current = reader;

    const startScanner = async () => {
      try {
        const devices = await BrowserMultiFormatReader.listVideoInputDevices();

        const backCamera =
          devices.find(d => d.label.toLowerCase().includes("back")) ||
          devices[0];

        await reader.decodeFromVideoDevice(
          backCamera.deviceId,
          videoRef.current!,
          (result) => {
            if (result) {
              const text = result.getText();
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

  // 🔥 NJ AAMVA AGE CHECK
  const verifyAge = (data: string) => {

    const dobIndex = data.indexOf("DBB");

    if (dobIndex !== -1) {

      const dobString = data.substring(dobIndex + 3, dobIndex + 11);

      const year = parseInt(dobString.substring(0,4));
      const month = parseInt(dobString.substring(4,6)) - 1;
      const day = parseInt(dobString.substring(6,8));

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
        setAgeStatus({ msg: `VERIFIED AGE ${age}`, type: "success" });
        codeReader.current?.reset();
      } else {
        setAgeStatus({ msg: `UNDERAGE ${age}`, type: "error" });
      }

    } else {
      setAgeStatus({ msg: "Invalid NJ License", type: "warning" });
    }
  };

  return (
    <div className="fixed inset-0 bg-black text-white">

      {/* FULLSCREEN CAMERA */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* DARK OVERLAY */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />

      {/* SCANNER FRAME */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative w-[85%] h-[25%] border-2 border-green-400 rounded-xl">

          {/* Corner brackets */}
          <div className="absolute top-0 left-0 w-6 h-6 border-l-4 border-t-4 border-green-400"/>
          <div className="absolute top-0 right-0 w-6 h-6 border-r-4 border-t-4 border-green-400"/>
          <div className="absolute bottom-0 left-0 w-6 h-6 border-l-4 border-b-4 border-green-400"/>
          <div className="absolute bottom-0 right-0 w-6 h-6 border-r-4 border-b-4 border-green-400"/>

          {/* SCAN LINE */}
          <div className="absolute w-full h-[2px] bg-green-400 animate-pulse top-1/2"/>
        </div>
      </div>

      {/* STATUS DISPLAY */}
      <div className="absolute bottom-16 left-0 right-0 text-center">
        <div className="inline-block px-6 py-3 bg-black/70 backdrop-blur rounded-full text-lg font-bold">
          {ageStatus.msg}
        </div>
      </div>

      {/* EXIT BUTTON */}
      <button
        onClick={() => navigate("/dashboard")}
        className="absolute top-6 left-6 bg-black/60 px-4 py-2 rounded-full"
      >
        Exit
      </button>

    </div>
  );
};

export default IDScanner;