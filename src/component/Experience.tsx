'use client'
import React, { useState, useMemo } from 'react';
import { Github, ExternalLink, Code, Database, Server } from 'lucide-react';

// --- Interface Definitions ---
interface Project {
    id: number;
    title: string;
    description: string;
    tags: string[];
    category: "Full Stack" | "Frontend" | "Backend" | "Utility";
    github: string;
    live: string | null;
    icon: React.ReactElement; // Lucide icon for visual type
}

type ProjectCategory = Project['category'] | "All";

// --- Project Data ---
const projectsData: Project[] = [
    {
        id: 1,
        title: "Bamboo E-commerce",
        description: "A full-stack e-commerce site with user authentication, product listings, a shopping cart, and mock payment integration.",
        tags: ["React", "Node.js", "Express.js", "MongoDB"],
        category: "Full Stack",
        github: "https://github.com/nahidhossain123/Bamboo-E-commerce",
        live: "https://bomboo-e-commerce.netlify.app/",
        icon: <Code className="w-5 h-5 text-indigo-500" />
    },
    {
        id: 2,
        title: "Booking.com",
        description: "A full-stack e-commerce site with user authentication, product listings, a shopping cart, and mock payment integration.",
        tags: ["React", "Node.js", "Express.js", "MongoDB", "Redux"],
        category: "Full Stack",
        github: "https://github.com/nahidhossain123/Booking-App-React",
        live: "https://boooking.netlify.app/",
        icon: <Code className="w-5 h-5 text-indigo-500" />
    },
    {
        id: 3,
        title: "E-Commerce UI",
        description: "A modern e-commerce web app built with React that allows users to browse products, view details, and add items to the cart with a clean, responsive UI",
        tags: ["React Js",],
        category: "Frontend",
        github: "https://github.com/nahidhossain123/E-Commerce-React",
        live: 'https://bonik-ecom.netlify.app/',
        icon: <Code className="w-5 h-5 text-indigo-500" />
    },
    {
        id: 4,
        title: "Photo Frame Generator",
        description: "Create beautiful photo frames with ease! Enjoy both dark and light modes while customizing and sharing your photos.",
        tags: ["React", "JavaScript", "API Integration", "CSS"],
        category: "Frontend",
        github: "https://github.com/nahidhossain123/photo-frame-generator",
        live: "https://photo-frame-generator.netlify.app/",
        icon: <Code className="w-5 h-5 text-indigo-500" />
    },
    {
        id: 5,
        title: "Doctor Appointment Management System",
        description: "“Efficiently manage hospital operations, doctor records, and appointments with an intuitive Hospital Management System.",
        tags: ["PHP", "MYSQL", "JS"],
        category: "Full Stack",
        github: "https://github.com/nahidhossain123/Doctor-Appointment-System",
        live: 'null',
        icon: <Code className="w-5 h-5 text-indigo-500" />
    },
    {
        id: 6,
        title: "Cooking App",
        description: "Discover and create delicious recipes with a sleek, user-friendly Cooking App UI.",
        tags: ["React Js"],
        category: "Frontend",
        github: "https://github.com/nahidhossain123/Food-App-React",
        live: 'https://foodbuy.netlify.app/',
        icon: <Code className="w-5 h-5 text-indigo-500" />
    },
    {
        id: 7,
        title: "GPT App UI",
        description: "Discover and create delicious recipes with a sleek, user-friendly Cooking App UI.",
        tags: ["React Js"],
        category: "Frontend",
        github: "https://github.com/nahidhossain123/Artificial-Intelligence-GPT3--React",
        live: 'https://gpt-ai.netlify.app/',
        icon: <Code className="w-5 h-5 text-indigo-500" />
    },
    {
        id: 8,
        title: "NFT App UI",
        description: "Discover and create delicious recipes with a sleek, user-friendly Cooking App UI.",
        tags: ["React Js"],
        category: "Frontend",
        github: "https://github.com/nahidhossain123/NFT-Marketpalce",
        live: 'https://nft-markets.netlify.app/',
        icon: <Code className="w-5 h-5 text-indigo-500" />
    },
];

// Dynamically generate the list of categories for the filter buttons
const allCategories: ProjectCategory[] = ["All", ...new Set(projectsData.map(p => p.category))];

// --- Project Card Component ---
interface ProjectCardProps { project: Project; }

// --- Main Projects Component ---
const Experience: React.FC = () => {
    const [activeFilter, setActiveFilter] = useState<ProjectCategory>("All");

    // Filter projects based on the active category
    const filteredProjects = useMemo(() => {
        if (activeFilter === "All") {
            return projectsData;
        }
        return projectsData.filter(project => project.category === activeFilter);
    }, [activeFilter]);

    return (
        <section id="projects" className="py-20 h-screen flex items-center bg-white dark:bg-gray-900">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-4xl font-extrabold text-center text-gray-900 dark:text-white mb-10 border-b-4 border-indigo-500 pb-2 inline-block mx-auto">
                    My Experience
                </h2>

                {/* --- Project Grid --- */}
                <div className="space-y-5 flex flex-col justify-center items-center">
                    <div className='flex'>
                        <div className='space-y-5 border border-white w-full md:max-w-[40%] p-5 rounded-xl -rotate-5 flex-start'>
                            <div className="absolute -top-8 left-1/2 -translate-x-1/2">
                                <div className="w-5 h-5 bg-red-500 rounded-full shadow-md relative">
                                    <div className="absolute inset-0 bg-red-700 rounded-full scale-75"></div>
                                </div>
                                <div className="w-1 h-6 bg-gray-600 mx-auto"></div>
                            </div>
                            <h3 className="text-5xl font-semibold">
                                Aspyrer.com, Canada
                            </h3>

                            <p className="text-sm uppercase tracking-wide text-gray-500 dark:text-gray-300">
                                Front-End Developer (Remote) • Jan 2023 — Present
                            </p>

                            <p className="mt-3 text-sm text-gray-600 leading-relaxed dark:text-gray-300">
                                Worked on API integration, UI design, feature development, bug fixing, and performance optimization
                                across both React.js web applications and React Native mobile apps.
                            </p>
                        </div>
                    </div>
                    <div className='flex justify-end '>
                        <div className='space-y-5 border border-white w-full md:max-w-[40%] p-5 rounded-xl rotate-5'>
                            <div className="absolute -top-8 left-1/2 -translate-x-1/2">
                                <div className="w-5 h-5 bg-red-500 rounded-full shadow-md relative">
                                    <div className="absolute inset-0 bg-red-700 rounded-full scale-75"></div>
                                </div>
                                <div className="w-1 h-6 bg-gray-600 mx-auto"></div>
                            </div>
                            <h3 className="text-5xl font-semibold">
                                Dynamic Software Ltd.
                            </h3>

                            <p className="text-sm uppercase tracking-wide text-gray-500 dark:text-gray-300">
                                Front-End Software Engineer • Apr 2022 — Jan 2023
                            </p>

                            <p className="mt-3 text-sm text-gray-600 leading-relaxed dark:text-gray-300">
                                Converted Figma designs into responsive user interfaces, developed and customized WordPress themes,
                                and collaborated on Laravel + React-based applications to build scalable frontend features.
                            </p>
                        </div>
                    </div>
                    <div className='flex'>
                        <div className='space-y-5 border border-white w-full md:max-w-[40%] p-5 rounded-xl -rotate-5'>
                            <div className="absolute -top-8 left-1/2 -translate-x-1/2">
                                <div className="w-5 h-5 bg-red-500 rounded-full shadow-md relative">
                                    <div className="absolute inset-0 bg-red-700 rounded-full scale-75"></div>
                                </div>
                                <div className="w-1 h-6 bg-gray-600 mx-auto"></div>
                            </div>
                            <h3 className="text-5xl font-semibold">
                                Trenza Softwares
                            </h3>

                            <p className="text-sm uppercase tracking-wide text-gray-500 dark:text-gray-400">
                                Trainee Software Engineer • Nov 2021 — Apr 2022
                            </p>

                            <p className="mt-3 text-sm text-gray-600 leading-relaxed dark:text-gray-400">
                                Translated Figma designs into responsive user interfaces and assisted in developing and customizing
                                WordPress themes, gaining hands-on experience in frontend development workflows.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Experience;