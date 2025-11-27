import React from 'react';
import { Briefcase, Heart, Lightbulb } from 'lucide-react';

// Define the content and key facts structure
interface AboutContent {
    greeting: string;
    introduction: string;
    focus: string;
    personalNote: string;
}

// Key data for the facts sidebar
interface Fact {
    icon: React.ReactElement;
    title: string;
    description: string;
}

const content: AboutContent = {
    greeting: "Hello, I'm Jane Doe.",
    introduction: "I'm a passionate Full Stack Web Developer based in New York, specializing in building modern, scalable, and responsive web applications. My expertise lies in creating seamless user experiences from the server-side logic down to the pixel-perfect frontend.",
    focus: "My technical focus is the **MERN stack** (MongoDB, Express, React, Node.js), coupled with a dedication to type safety using **TypeScript** and modern styling via **Tailwind CSS**. I thrive on transforming complex problems into elegant, maintainable code solutions.",
    personalNote: "When I'm not coding, you'm likely finding me reading up on new design patterns or contributing to open-source projects. I believe continuous learning and collaboration are the keys to successful software development. I'm always looking for exciting opportunities to build something meaningful!",
};

const keyFacts: Fact[] = [
    {
        icon: <Briefcase className="w-6 h-6 text-indigo-500" />,
        title: "Experience",
        description: "3+ Years of professional development experience.",
    },
    {
        icon: <Heart className="w-6 h-6 text-red-500" />,
        title: "Passion",
        description: "Driven by solving technical challenges and clean architecture.",
    },
    {
        icon: <Lightbulb className="w-6 h-6 text-yellow-500" />,
        title: "Methodology",
        description: "Proficient in Agile/Scrum and version control (Git).",
    },
];

const About: React.FC = () => {
    return (
        <section id="about" className="py-20 bg-white dark:bg-gray-800">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-4xl font-extrabold text-center text-gray-900 dark:text-white mb-12 border-b-4 border-indigo-500 pb-2 inline-block mx-auto">
                    About Me
                </h2>

                {/* --- Two-Column Layout --- */}
                <div className="flex flex-col md:flex-row gap-12">

                    {/* --- Left Column: Biography Text --- */}
                    <div className="md:w-2/3 space-y-6 text-lg text-gray-700 dark:text-gray-300">

                        <p className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                            {content.greeting}
                        </p>

                        <p>
                            {content.introduction}
                        </p>

                        <p>
                            {content.focus}
                        </p>

                        <p>
                            {content.personalNote}
                        </p>

                        {/* Optional CTA or Resume Link */}
                        <div className="pt-4">
                            <a
                                href="/your-resume.pdf" // Link to your downloadable resume
                                download
                                className="inline-block px-6 py-3 font-bold text-white bg-indigo-600 rounded-lg shadow-md hover:bg-indigo-700 transition-colors duration-300"
                            >
                                Download Resume
                            </a>
                        </div>
                    </div>

                    {/* --- Right Column: Key Facts/Image --- */}
                    <div className="md:w-1/3">
                        {/* Placeholder for Profile Picture */}
                        <div className="mb-8 p-6 bg-gray-100 dark:bg-gray-700 rounded-xl shadow-lg">

                            <div className="w-full h-48 bg-gray-300 dark:bg-gray-600 rounded-lg flex items-center justify-center mb-4">
                                <p className="text-gray-500">Your Profile Picture Here</p>
                            </div>
                            <h4 className="text-xl font-bold text-center text-gray-900 dark:text-white">Jane Doe</h4>
                            <p className="text-center text-indigo-600 dark:text-indigo-400">Full Stack Developer</p>
                        </div>

                        {/* Key Facts List */}
                        <div className="space-y-6">
                            {keyFacts.map((fact, index) => (
                                <div key={index} className="flex items-start p-4 bg-white dark:bg-gray-900 rounded-lg shadow-md border-l-4 border-indigo-500">
                                    <div className="flex-shrink-0 mr-4 mt-1">
                                        {fact.icon}
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-900 dark:text-white">{fact.title}</h4>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">{fact.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default About;