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

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg transition duration-300 hover:shadow-2xl hover:scale-[1.02] border-t-4 border-indigo-500">
        <div className="flex items-center space-x-3 mb-4">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                {project.title}
            </h3>
        </div>

        <p className="text-gray-600 dark:text-gray-400 mb-4">{project.description}</p>

        <div className="flex flex-wrap gap-2 mb-4">
            {project.tags.map((tag, i) => (
                <span
                    key={i}
                    className="px-3 py-1 text-xs font-medium rounded-full bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300"
                >
                    {tag}
                </span>
            ))}
        </div>

        <div className="flex space-x-4 pt-2 border-t border-gray-100 dark:border-gray-700">
            {project.github && (
                <a href={project.github} target="_blank" rel="noopener noreferrer" className="flex items-center text-gray-500 hover:text-gray-900 dark:hover:text-white transition duration-200" title="GitHub Repository">
                    <Github className="w-5 h-5 mr-1" />
                    Code
                </a>
            )}
            {project.live && (
                <a href={project.live} target="_blank" rel="noopener noreferrer" className="flex items-center text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-200 transition duration-200" title="Live Demo">
                    <ExternalLink className="w-5 h-5 mr-1" />
                    Live Demo
                </a>
            )}
        </div>
    </div>
);


// --- Main Projects Component ---
const Projects: React.FC = () => {
    const [activeFilter, setActiveFilter] = useState<ProjectCategory>("All");

    // Filter projects based on the active category
    const filteredProjects = useMemo(() => {
        if (activeFilter === "All") {
            return projectsData;
        }
        return projectsData.filter(project => project.category === activeFilter);
    }, [activeFilter]);

    return (
        <section id="projects" className="py-20 bg-white dark:bg-gray-900">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-4xl font-extrabold text-center text-gray-900 dark:text-white mb-10 border-b-4 border-indigo-500 pb-2 inline-block mx-auto">
                    My Projects
                </h2>

                {/* --- Filter Buttons --- */}
                <div className="flex flex-wrap justify-center space-x-3 mb-12">
                    {allCategories.map(category => (
                        <button
                            key={category}
                            onClick={() => setActiveFilter(category)}
                            className={`
                px-5 py-2 m-1 rounded-full font-semibold transition-all duration-300
                ${activeFilter === category
                                    ? 'bg-indigo-600 text-white shadow-md hover:bg-indigo-700'
                                    : 'bg-gray-200 text-gray-700 hover:bg-indigo-100 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-indigo-900'
                                }
              `}
                        >
                            {category}
                        </button>
                    ))}
                </div>

                {/* --- Project Grid --- */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredProjects.length > 0 ? (
                        filteredProjects.map(project => (
                            <ProjectCard key={project.id} project={project} />
                        ))
                    ) : (
                        <p className="text-center text-gray-600 dark:text-gray-400 col-span-full">
                            No projects found in this category.
                        </p>
                    )}
                </div>
            </div>
        </section>
    );
};

export default Projects;