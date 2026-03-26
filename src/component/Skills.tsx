// Skills.tsx
import React from 'react';
import {
    Code, Type, Atom, Component, GitBranch, Palette, Zap, Server, SquareDashedKanban, FileText, Wrench
} from 'lucide-react';

interface Skill { name: string; Icon: React.ElementType; color: string; }

const skillsList: Skill[] = [
    { name: "HTML", Icon: FileText, color: "text-orange-500" },
    { name: "CSS", Icon: Palette, color: "text-blue-400" },
    { name: "JavaScript", Icon: Code, color: "text-yellow-500" },
    { name: "TypeScript", Icon: Type, color: "text-blue-500" },
    { name: "React", Icon: Atom, color: "text-cyan-500" },
    { name: "Next.js", Icon: SquareDashedKanban, color: "text-gray-900 dark:text-white" },
    { name: "React Native", Icon: Component, color: "text-sky-500" },
    { name: "Redux", Icon: GitBranch, color: "text-purple-600" },
    { name: "Express", Icon: Server, color: "text-green-600" },
    { name: "Socket.IO", Icon: Zap, color: "text-gray-500 dark:text-gray-300" },
    { name: "Tailwind CSS", Icon: Palette, color: "text-teal-400" },
    { name: "Bootstrap", Icon: Palette, color: "text-purple-700" },
    { name: "WordPress", Icon: Wrench, color: "text-blue-600" },
];

const Skills: React.FC = () => {
    return (
        <section
            id="skills"
            className="min-h-screen bg-gray-50 dark:bg-gray-900"
        >
            <div className='min-h-screen max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-full'>
                <div className="flex items-center min-h-screen"> {/* Added py-20 for vertical padding inside */}
                    <div className='w-full'>
                        <h2 className="text-4xl font-extrabold text-center text-gray-900 dark:text-white mb-12 border-b-4 border-indigo-500 pb-2 inline-block mx-auto">
                            My Skills
                        </h2>

                        {/* --- Icon Grid --- */}
                        <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-6 xl:grid-cols-7 gap-4 p-4">
                            {skillsList.map((skill) => (
                                <div
                                    key={skill.name}
                                    className="flex flex-col items-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md transition-all duration-300 hover:shadow-xl hover:scale-105"
                                >
                                    <skill.Icon className={`mb-2 ${skill.color}`} />
                                    <p className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 text-center mt-1">
                                        {skill.name}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Skills;