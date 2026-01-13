"use client";

import { useScroll } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export default function ScrollyCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  
  // Use Framer Motion's useScroll to track scroll progress
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const loadImages = async () => {
      const loadedImages: HTMLImageElement[] = [];
      const frameCount = 152; // 0 to 151

      for (let i = 0; i < frameCount; i++) {
        const img = new Image();
        // Construct filename: frame_XXX_delay-*.webp
        // We'll use a precise check for the filenames found in the directory
        // Since the delay part varies, we might need to be smart or just rename them, 
        // but for now, based on the file list, the delay varies.
        // Wait, I can't guess the delay for every file.
        // The file list showed: frame_000_delay-0.053s.webp, frame_001_delay-0.052s.webp, etc.
        // The delays are inconsistent. 
        // FIX: I need to rename the files to be consistent OR read the filenames dynamically on the server side 
        // and pass them to the client.
        // Since this is a client component, I can't read the directory directly.
        // I will first create a server utility to get the filenames or just rename them to frame_000.webp, etc.
        // Renaming is safer and cleaner.
      }
    };
  });
    return (
        <div className="h-[500vh] relative">
            <div className="sticky top-0 h-screen w-full overflow-hidden">
                <canvas ref={canvasRef} className="w-full h-full object-cover" />
            </div>
        </div>
    )
}
