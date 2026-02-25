import React, { useEffect, useRef, useState } from "react";
import { BrowserMultiFormatReader } from "@zxing/browser";
import { DecodeHintType, BarcodeFormat } from "@zxing/library";
import { useNavigate } from "react-router-dom";

const IDScanner = () => {

  const navigate = useNavigate();
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const codeReader = useRef<BrowserMultiFormatReader | null>(null);

  const [ageStatus, setAgeStatus] = useState({
    msg: "Align NJ license barcode",
    type: "neutral"
  });

  const [successFlash, setSuccessFlash] = useState(false);

  useEffect(() => {

    const hints = new Map();
    hints.set(DecodeHintType.POSSIBLE_FORMATS, [
      BarcodeFormat.PDF_417
    ]);

    const reader = new BrowserMultiFormatReader(hints);
    codeReader.current = reader;

    const startCamera = async () => {

      try {

        const stream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: { ideal: "environment" },
            width: { ideal: 1920 },
            height: { ideal: 1080 }
          }
        });

        const video = videoRef.current!;
        video.srcObject = stream;
        await video.play();

        // 🔥 Attempt continuous autofocus
        const track = stream.getVideoTracks()[0];
        const capabilities = track.getCapabilities?.();

        if (capabilities?.focusMode) {
          track.applyConstraints({
            advanced: [{ focusMode: "continuous" }]
          });
        }

        await reader.decodeFromVideoElement(
          video,
          (result) => {
            if (result) {
              verifyAge(result.getText());
            }
          }
        );

      } catch (err) {

        console.error(err);
        setAgeStatus({ msg: "Camera Error", type: "error" });

      }

    };

    startCamera();

    return () => {
      codeReader.current?.reset();
    };

  }, []);

  const verifyAge = (data:string) => {

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
      ) age--;

      if (age >= 21) {

        setAgeStatus({ msg:`VERIFIED AGE ${age}`, type:"success" });

        // 🔥 iPhone-friendly success animation
        setSuccessFlash(true);
        setTimeout(()=> setSuccessFlash(false), 400);

        codeReader.current?.reset();

      } else {

        setAgeStatus({ msg:`UNDERAGE ${age}`, type:"error" });

      }

    }

  };

  return (

    <div className="fixed inset-0 bg-black text-white">

      {/* CAMERA */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        playsInline
      />

      {/* SUCCESS FLASH */}
      {successFlash && (
        <div className="absolute inset-0 bg-green-400/30 animate-pulse pointer-events-none"/>
      )}

      {/* DARK OVERLAY */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />

      {/* SCANNER FRAME */}
      <div className="absolute inset-0 flex items-center justify-center">

        <div className="relative w-[85%] h-[25%] border-2 border-green-400 rounded-xl">

          <div className="absolute top-0 left-0 w-6 h-6 border-l-4 border-t-4 border-green-400"/>
          <div className="absolute top-0 right-0 w-6 h-6 border-r-4 border-t-4 border-green-400"/>
          <div className="absolute bottom-0 left-0 w-6 h-6 border-l-4 border-b-4 border-green-400"/>
          <div className="absolute bottom-0 right-0 w-6 h-6 border-r-4 border-b-4 border-green-400"/>

          {/* REAL MOVING LASER */}
          <div className="scan-laser" />

        </div>

      </div>

      {/* STATUS DISPLAY */}
      <div className="absolute bottom-16 left-0 right-0 text-center">

        <div className="inline-block px-6 py-3 bg-black/70 backdrop-blur rounded-full text-lg font-bold">
          {ageStatus.msg}
        </div>

      </div>

      <button
        onClick={()=>navigate("/dashboard")}
        className="absolute top-6 left-6 bg-black/60 px-4 py-2 rounded-full"
      >
        Exit
      </button>

    </div>
  );
};

export default IDScanner;