'use client';

import { motion, useScroll, useTransform } from 'framer-motion';

export default function Overlay() {
    const { scrollYProgress } = useScroll();

    // Parallax transforms
    // Section 1: Fade out as we scroll down
    const opacity1 = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
    const y1 = useTransform(scrollYProgress, [0, 0.2], [0, -50]);

    // Section 2: Fade in and out
    const opacity2 = useTransform(scrollYProgress, [0.2, 0.35, 0.5], [0, 1, 0]);
    const y2 = useTransform(scrollYProgress, [0.2, 0.5], [50, -50]);

    // Section 3: Fade in and out
    const opacity3 = useTransform(scrollYProgress, [0.5, 0.7, 0.9], [0, 1, 0]);
    const y3 = useTransform(scrollYProgress, [0.5, 0.9], [50, -50]);

    return (
        <div className="absolute top-0 left-0 w-full h-[500vh] pointer-events-none z-10">

            {/* Section 1 - Centered */}
            <div className="sticky top-0 h-screen flex items-center justify-center">
                <motion.div style={{ opacity: opacity1, y: y1 }} className="text-center">
                    <h1 className="text-6xl md:text-8xl font-bold tracking-tighter text-white mb-4">
                        Gauraang Arora
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-400 font-light">
                        Creative Developer
                    </p>
                </motion.div>
            </div>

            {/* Section 2 - Left Aligned (Starts appearing around 25-30% scroll) */}
            <div className="absolute top-[30vh] w-full h-screen flex items-center">
                {/* 
            Since the container is huge (500vh), we can't just use absolute top positions relative to viewport easily 
            unless we stick them or use percentage of parent.
            Better approach: sticky container 500vh is the parent. 
            Actually, the logic in ScrollyCanvas is a sticky container.
            Inside Overlay, `absolute top-0` covers the whole 500vh.
            We need to position these items relative to that tall container, 
            OR make them sticky/fixed themselves but controlled by transforms.
            Let's use fixed centering logic with conditionally rendered or opacity controlled transforms.
            Wait, the easiest way is checking the `sticky` behavior.
            If `Overlay` is inside the same context, it needs to match the height.
            
            Let's keep it simple: `Overlay` is `absolute inset-0` of the Main wrapper.
            We use multiple sticky containers or just absolute positioning based on generic %?
            The user request said: "Create text sections that sit *on top* of the canvas".
            
            Strategy:
            The Overlay component has `h-[500vh]` (same as scrolly container).
            Inside, we have "slides" that are sticky but their visibility is controlled by scroll.
         */}
            </div>
        </div>
    );
}

// Re-thinking Overlay Structure:
// It's easier if we just have one sticky container for the content too, 
// and we just swap the content based on scroll, OR we layer them.
// Let's implement the refined version below.
