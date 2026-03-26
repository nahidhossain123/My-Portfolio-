import React from 'react';
import { Github, Linkedin, Twitter, Dribbble, LucideIcon } from 'lucide-react';

// --- 1. Define TypeScript Interface ---

/**
 * Interface for a single social link item
 */
interface SocialLink {
    name: string;
    url: string;
    Icon: LucideIcon; // Type for a Lucide icon component
}

// --- 2. Social Links Data (Replace URLs with your links) ---

const socialLinks: SocialLink[] = [
    {
        name: "GitHub",
        url: "https://github.com/nahidhossain123",
        Icon: Github,
    },
    {
        name: "LinkedIn",
        url: "https://www.linkedin.com/in/nahid-hossain-05/",
        Icon: Linkedin,
    },
    // Add more as needed, e.g., Medium, Personal Blog
];


// --- 3. Footer Component ---

const Footer: React.FC = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-gray-800 dark:bg-gray-950 py-8">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Social Icons Container */}
                <div className="flex justify-center space-x-6 mb-6">
                    {socialLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            title={`Connect on ${link.name}`}
                            // Tailwind classes for styling the icon and hover effect
                            className="text-gray-400 hover:text-indigo-500 transition-colors duration-300"
                        >
                            <link.Icon className="w-7 h-7" />
                        </a>
                    ))}
                </div>

                {/* Copyright Text */}
                <div className="text-center text-gray-500 dark:text-gray-400 text-sm">
                    <p>
                        &copy; {currentYear} NAHID.DEV All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;