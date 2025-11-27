import React from 'react';
import { Briefcase, BookOpen, Calendar, MapPin } from 'lucide-react';

// --- Type Definitions ---

type EntryType = "Job" | "Education";

interface TimelineEntry {
  id: number;
  type: EntryType;
  title: string;
  organization: string;
  location: string;
  dates: string;
  details: string[]; // Key responsibilities, accomplishments, or coursework
}

// --- Data (Replace with your actual data) ---
const timelineData: TimelineEntry[] = [
  // --- JOB EXPERIENCE ---
  {
    id: 1,
    type: "Job",
    title: "Senior Front-End Developer",
    organization: "Innovatech Solutions",
    location: "San Francisco, CA",
    dates: "Jan 2023 - Present",
    details: [
      "Led the migration of legacy codebase to Next.js and TypeScript, reducing load times by 40%.",
      "Mentored junior developers on best practices in state management (Redux/Zustand) and component architecture.",
      "Designed and implemented reusable component library used across 5 major projects.",
    ],
  },

  // --- EDUCATION ---
  {
    id: 2,
    type: "Education",
    title: "Master of Science in Computer Science",
    organization: "State University of Technology",
    location: "Tech City, CA",
    dates: "Sep 2021 - Dec 2022",
    details: [
      "Specialized in Distributed Systems and Cloud Computing.",
      "Achieved a 4.0 GPA. Thesis: 'Optimizing Container Orchestration.'",
      "Relevant Coursework: Advanced Algorithms, Network Security.",
    ],
  },

  // --- JOB EXPERIENCE ---
  {
    id: 3,
    type: "Job",
    title: "Junior Full-Stack Developer",
    organization: "Digital Agency Co.",
    location: "New York, NY",
    dates: "Jun 2021 - Dec 2022",
    details: [
      "Developed RESTful APIs using Node.js and Express to support client-side applications.",
      "Managed MongoDB database schemas and implemented data migration scripts.",
      "Collaborated with design team to translate mockups into responsive UI components.",
    ],
  },

  // --- EDUCATION ---
  {
    id: 4,
    type: "Education",
    title: "Bachelor of Science in Software Engineering",
    organization: "Metropolitan College of Engineering",
    location: "Metro City, NY",
    dates: "Sep 2017 - May 2021",
    details: [
      "Graduated with Honors. Focus on OOP and Full-Stack Development.",
      "Capstone Project: Multi-user inventory management system.",
    ],
  },
];

const CareerTimeline: React.FC = () => {
  return (
    <section id="career-timeline" className="py-20 bg-white dark:bg-gray-900">
      {/* Consistent Container */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-extrabold text-center text-gray-900 dark:text-white mb-16 border-b-4 border-indigo-500 pb-2 inline-block mx-auto">
          Career & Education
        </h2>

        {/* Timeline Container */}
        <div className="space-y-12 relative before:content-[''] before:absolute before:top-0 before:left-6 before:h-full before:w-1 before:bg-gray-300 before:dark:bg-gray-700 md:before:left-1/2 md:before:-translate-x-1/2">

          {timelineData.map((entry, index) => {
            const isJob = entry.type === 'Job';
            const color = isJob ? 'text-green-500' : 'text-indigo-500';
            const Icon = isJob ? Briefcase : BookOpen;

            return (
              <div
                key={entry.id}
                className={`relative flex items-center w-full ${index % 2 === 0 ? 'md:justify-start' : 'md:justify-end'}`}
              >

                {/* --- Timeline Dot/Icon --- */}
                <div
                  className={`absolute left-0 md:left-1/2 md:transform md:-translate-x-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-white dark:bg-gray-900 border-4 border-opacity-70 ${isJob ? 'border-green-500' : 'border-indigo-500'} z-10 shadow-lg`}
                >
                  <Icon className={`w-5 h-5 ${color}`} />
                </div>

                {/* --- Card Content --- */}
                <div
                  className={`w-[calc(100%-48px)] md:w-[45%] p-6 rounded-xl bg-gray-50 dark:bg-gray-800 shadow-xl border-l-4 ${isJob ? 'border-green-500' : 'border-indigo-500'} transition duration-300 hover:shadow-2xl
                    ${index % 2 === 0 ? 'ml-12 md:ml-0 md:pr-12' : 'mr-12 md:mr-0 md:pl-12'}
                  `}
                >
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">{entry.title}</h3>
                  <h4 className="text-lg font-semibold mb-3">
                    {entry.organization}
                  </h4>

                  <div className="flex flex-col sm:flex-row sm:space-x-4 text-sm text-gray-600 dark:text-gray-400 mb-4">
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>{entry.dates}</span>
                    </div>
                    <div className="flex items-center space-x-1 mt-1 sm:mt-0">
                      <MapPin className="w-4 h-4" />
                      <span>{entry.location}</span>
                    </div>
                  </div>

                  <ul className="list-disc pl-5 space-y-1 text-base text-gray-700 dark:text-gray-300">
                    {entry.details.map((detail, i) => (
                      <li key={i}>{detail}</li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CareerTimeline;