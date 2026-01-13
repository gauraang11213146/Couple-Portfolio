'use client';

import { motion, useScroll, useTransform } from 'framer-motion';

export default function Overlay() {
    const { scrollYProgress } = useScroll();

    const y = useTransform(scrollYProgress, [0, 1], [0, -50]); // subtle global parallax

    // Section 1: 0% - 20%
    const opacity1 = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
    const scale1 = useTransform(scrollYProgress, [0, 0.15], [1, 0.9]);

    // Section 2: 25% - 45%
    const opacity2 = useTransform(scrollYProgress, [0.2, 0.3, 0.4], [0, 1, 0]);
    const x2 = useTransform(scrollYProgress, [0.2, 0.4], [-50, 0]);

    // Section 3: 55% - 75%
    const opacity3 = useTransform(scrollYProgress, [0.55, 0.65, 0.75], [0, 1, 0]);
    const x3 = useTransform(scrollYProgress, [0.55, 0.75], [50, 0]);

    return (
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-10">
            <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center">

                {/* Section 1 */}
                <motion.div
                    style={{ opacity: opacity1, scale: scale1, y }}
                    className="absolute inset-0 flex flex-col items-center justify-center text-center p-4"
                >
                    <h1 className="text-6xl md:text-8xl font-bold tracking-tighter text-white mb-2 mix-blend-difference">
                        Priya&Deepak
                    </h1>
                    <p className="text-xl md:text-2xl text-white/70 font-light tracking-widest uppercase">
                        Not Just Your Regular Couple
                    </p>
                </motion.div>

                {/* Section 2 */}
                <motion.div
                    style={{ opacity: opacity2, x: x2 }}
                    className="absolute inset-0 flex items-center justify-start p-12 md:p-24"
                >
                    <div className="max-w-xl">
                        <h2 className="text-5xl md:text-7xl font-bold text-white leading-tight">
                            Rooted on <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                                Love and Trust.
                            </span>
                        </h2>
                    </div>
                </motion.div>

                {/* Section 3 */}
                <motion.div
                    style={{ opacity: opacity3, x: x3 }}
                    className="absolute inset-0 flex items-center justify-end p-12 md:p-24"
                >
                    <div className="text-right max-w-xl">
                        <h2 className="text-5xl md:text-7xl font-bold text-white leading-tight">
                            Together through <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-500">
                                Every Chapter.
                            </span>
                        </h2>
                    </div>
                </motion.div>

            </div>
        </div>
    );
}
