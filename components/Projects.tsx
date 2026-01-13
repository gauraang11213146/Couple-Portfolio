'use client';

import { motion } from 'framer-motion';

const projects = [
    {
        id: 1,
        title: "Our Story",
        category: "A Shared Life",
        description: "Long story short-we've been together like an unbroken accord.",
        color: "from-pink-500/20 to-purple-500/20",
        image: "/images/our-story-v3.jpg"
    },
    {
        id: 2,
        title: "Our Cherished One",
        category: "PROUD PARENTS",
        description: "Our Heart’s Delight, Our Pride and Endless Wonder.",
        color: "from-cyan-500/20 to-blue-500/20",
        image: "/images/cherished-one.jpg"
    },
    {
        id: 3,
        title: "Home of Endless Love",
        category: "Family values",
        description: "A sanctuary of care, warmth, and togetherness.",
        color: "from-emerald-500/20 to-teal-500/20",
        image: "/images/true-treasure.jpg",
    },
    {
        id: 4,
        title: "Together Always",
        category: "",
        description: "Side by side, then, now, and always",
        color: "from-orange-500/20 to-red-500/20",
        image: "/images/together-always.jpg",
    }
];

export default function Projects() {
    return (
        <div className="min-h-screen w-full bg-[#121212] py-24 px-4 md:px-12 relative z-20">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="mb-16"
                >
                    <h2 className="text-4xl md:text-6xl font-bold text-white mb-4">Years of Togetherness.</h2>
                    <div className="h-1 w-24 bg-white/20 rounded-full"></div>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {projects.map((project, index) => (
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.6 }}
                            className="group relative h-[500px] rounded-2xl overflow-hidden border border-white/10 backdrop-blur-sm bg-white/5 hover:border-white/30 transition-all duration-300 perspective-1000"
                        >
                            {/* Image Background if present */}
                            {project.image && (
                                <div className="absolute inset-0 z-0 overflow-hidden">
                                    <img
                                        src={project.image}
                                        alt={project.title}
                                        className={`w-full h-full object-cover transition-all duration-700 transform scale-110 group-hover:scale-100 opacity-90 group-hover:opacity-100`}
                                        style={{
                                            objectPosition: (project.id === 1 || project.id === 4) ? '50% 25%' : 'top'
                                        }}
                                    />
                                </div>
                            )}

                            {/* Gradient Background */}
                            <div className={`absolute inset-0 bg-gradient-to-br ${project.color} ${project.image ? 'opacity-20' : 'opacity-0'} group-hover:opacity-100 transition-opacity duration-500 z-10 mix-blend-overlay`} />

                            <div className="absolute inset-0 p-8 flex flex-col justify-end z-20">
                                <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                    {project.category && (
                                        <span className="text-sm font-medium text-white/80 tracking-wider uppercase mb-2 block drop-shadow-md">
                                            {project.category}
                                        </span>
                                    )}
                                    <h3 className="text-3xl font-bold text-white mb-2 drop-shadow-md">
                                        {project.title}
                                    </h3>
                                    <p className={`text-white/90 max-w-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100 drop-shadow-md font-medium ${project.id === 4 ? 'italic' : ''}`}>
                                        {project.description}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
