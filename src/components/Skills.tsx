import React, { useState, useEffect, useRef } from 'react';

interface SkillsProps {
  darkMode: boolean;
}

const Skills: React.FC<SkillsProps> = ({ darkMode }) => {
  const [visibleSkills, setVisibleSkills] = useState<boolean[]>([]);
  const skillsRef = useRef<HTMLDivElement>(null);

  const skills = [
    { name: 'Java', level: 85, category: 'Language' },
    { name: 'Python', level: 80, category: 'Language' },
    { name: 'SQL', level: 80, category: 'Database' },
    { name: 'C Programming', level: 75, category: 'Language' },
    { name: 'Object Oriented Programming', level: 90, category: 'Concept' },
    { name: 'Data Structures & Algorithms', level: 75, category: 'Concept' },
    { name: 'DBMS', level: 85, category: 'Database' },
    { name: 'Operating Systems', level: 70, category: 'Systems' },
    { name: 'Computer Networks', level: 70, category: 'Systems' },
    { name: 'RESTful APIs', level: 80, category: 'API' }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSkills(new Array(skills.length).fill(true));
          }
        });
      },
      { threshold: 0.3 }
    );

    if (skillsRef.current) {
      observer.observe(skillsRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="skills" className="py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className={`text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r bg-clip-text text-transparent ${
            darkMode 
              ? 'from-cyan-400 to-blue-400' 
              : 'from-orange-600 to-red-600'
          }`}>
            Technical Skills
          </h2>
          <div className={`w-24 h-1 rounded-full mx-auto mb-6 ${
            darkMode 
              ? 'bg-gradient-to-r from-cyan-400 to-blue-600' 
              : 'bg-gradient-to-r from-orange-500 to-red-600'
          }`} />
          <p className={`text-xl max-w-3xl mx-auto ${
            darkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            A comprehensive toolkit of modern technologies and frameworks
          </p>
        </div>

        <div ref={skillsRef} className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {skills.map((skill, index) => (
            <div
              key={skill.name}
              className={`group relative p-6 rounded-2xl backdrop-blur-sm border transition-all duration-500 hover:scale-105 hover:-translate-y-2 ${
                darkMode 
                  ? 'bg-slate-800/30 border-cyan-500/20 hover:border-cyan-400/50' 
                  : 'bg-white/50 border-orange-500/20 hover:border-orange-400/50'
              }`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Skill Circle */}
              <div className="relative w-20 h-20 mx-auto mb-4">
                <svg className="w-20 h-20 transform -rotate-90" viewBox="0 0 36 36">
                  <path
                    className={`stroke-current opacity-20 ${
                      darkMode ? 'text-gray-600' : 'text-gray-300'
                    }`}
                    strokeWidth="3"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path
                    className={`stroke-current transition-all duration-1000 ${
                      darkMode ? 'text-cyan-400' : 'text-orange-500'
                    }`}
                    strokeWidth="3"
                    strokeLinecap="round"
                    fill="none"
                    strokeDasharray={`${visibleSkills[index] ? skill.level : 0}, 100`}
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className={`text-lg font-bold ${
                    darkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    {visibleSkills[index] ? `${skill.level}%` : '0%'}
                  </span>
                </div>
              </div>

              <div className="text-center">
                <h3 className={`font-semibold text-lg mb-2 ${
                  darkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  {skill.name}
                </h3>
                <span className={`text-sm px-3 py-1 rounded-full ${
                  darkMode 
                    ? 'bg-cyan-400/10 text-cyan-400' 
                    : 'bg-orange-400/10 text-orange-600'
                }`}>
                  {skill.category}
                </span>
              </div>

              {/* Glow Effect */}
              <div className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${
                darkMode 
                  ? 'bg-gradient-to-br from-cyan-400/10 to-blue-600/10' 
                  : 'bg-gradient-to-br from-orange-400/10 to-red-600/10'
              }`} />
            </div>
          ))}
        </div>

        {/* Technologies Grid */}
        <div className="mt-20">
          <h3 className={`text-2xl font-bold text-center mb-12 ${
            darkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Technologies & Tools
          </h3>
          
          <div className="flex flex-wrap justify-center gap-4">
            {[
              'Spring Boot (Familiar)',
              'HTML & CSS',
              'JavaScript (Basics)',
              'Git & GitHub',
              'Linux (Basics)',
              'Docker (Basics)',
              'AWS (EC2, S3 Basics)',
              'Postman',
              'IntelliJ IDEA',
              'VS Code',
              'Jira',
              'MySQL',
              'PostgreSQL',
              'Agile / Scrum Methodology'
            ].map((tech, index) => (
              <div
                key={tech}
                className={`px-6 py-3 rounded-full backdrop-blur-sm border transition-all duration-300 hover:scale-105 ${
                  darkMode 
                    ? 'bg-slate-800/30 border-cyan-500/20 text-gray-300 hover:text-cyan-400 hover:border-cyan-400/50' 
                    : 'bg-white/50 border-orange-500/20 text-gray-600 hover:text-orange-600 hover:border-orange-400/50'
                }`}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {tech}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;