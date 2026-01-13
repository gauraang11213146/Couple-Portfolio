'use client';

import { useScroll, useMotionValueEvent } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

export default function ScrollyCanvas() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [images, setImages] = useState<HTMLImageElement[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);

    const { scrollYProgress } = useScroll();

    useEffect(() => {
        const loadImages = async () => {
            const loadedImages: HTMLImageElement[] = [];
            // We have 152 frames based on the file count (0 to 151)
            const frameCount = 152;

            const promises = [];

            for (let i = 0; i < frameCount; i++) {
                const promise = new Promise<void>((resolve, reject) => {
                    const img = new Image();
                    // Use the standard renamed format
                    img.src = `/sequence/frame_${i.toString().padStart(3, '0')}.webp`;
                    img.onload = () => {
                        loadedImages[i] = img;
                        resolve();
                    };
                    img.onerror = () => {
                        console.error(`Failed to load image index ${i}`);
                        // Resolve anyway to avoid blocking everything, but this gap might show
                        resolve();
                    };
                });
                promises.push(promise);
            }

            await Promise.all(promises);
            setImages(loadedImages);
            setIsLoaded(true);
        };

        loadImages();
    }, []);

    useEffect(() => {
        if (!canvasRef.current || images.length === 0 || !isLoaded) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Initial render
        renderFrame(0);

        // Handle resize
        const handleResize = () => {
            if (!canvasRef.current) return;
            canvasRef.current.width = window.innerWidth;
            canvasRef.current.height = window.innerHeight;
            // Re-render current frame on resize would be ideal, but we need the current index.
            // For simplicity, we trust the scroll listener to update or we force update?
            // Let's just update based on scroll is easiest.
        };
        window.addEventListener('resize', handleResize);
        handleResize(); // call once

        return () => window.removeEventListener('resize', handleResize);

        function renderFrame(index: number) {
            if (!ctx || !canvas || !images[index]) return;

            const img = images[index];

            // Calculate object-fit: cover
            const hRatio = canvas.width / img.width;
            const vRatio = canvas.height / img.height;
            const ratio = Math.max(hRatio, vRatio);

            const centerShift_x = (canvas.width - img.width * ratio) / 2;
            const centerShift_y = (canvas.height - img.height * ratio) / 2;

            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(
                img,
                0, 0, img.width, img.height,
                centerShift_x, centerShift_y, img.width * ratio, img.height * ratio
            );
        }

        // We can't access `renderFrame` inside `useMotionValueEvent` easily if defined here unless we extract it
        // or use a ref for the render function.
        // Actually, let's just use a ref for the images to avoid closure staleness if we were using `scrollYProgress.on('change', ...)` in a separate effect.
        // However, `useMotionValueEvent` is clean.
    }, [images, isLoaded]);

    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        if (!canvasRef.current || images.length === 0 || !isLoaded) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const frameIndex = Math.floor(latest * (images.length - 1));
        requestAnimationFrame(() => renderFrame(frameIndex));
    });

    const renderFrame = (index: number) => {
        const canvas = canvasRef.current;
        if (!canvas || !images[index]) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const img = images[index];

        // object-fit: cover logic
        const hRatio = canvas.width / img.width;
        const vRatio = canvas.height / img.height;
        const ratio = Math.max(hRatio, vRatio);

        const centerShift_x = (canvas.width - img.width * ratio) / 2;
        const centerShift_y = (canvas.height - img.height * ratio) / 2;

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(
            img,
            0, 0, img.width, img.height,
            centerShift_x, centerShift_y, img.width * ratio, img.height * ratio
        );
    };

    return (
        <div className="h-[500vh] relative">
            <div className="sticky top-0 h-screen w-full overflow-hidden bg-[#121212]">
                <canvas ref={canvasRef} className="block w-full h-full" />
                {!isLoaded && (
                    <div className="absolute inset-0 flex items-center justify-center text-white/20">
                        Loading Sequence...
                    </div>
                )}
            </div>
        </div>
    );
}
