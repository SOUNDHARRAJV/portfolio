import srkImage from './srk.png';
import React, { useState, useEffect } from 'react';
import { ArrowDown, Github, Linkedin, Mail, Download } from 'lucide-react';
import CVModal from './CVModal';

interface HeroProps {
  darkMode: boolean;
}

const Hero: React.FC<HeroProps> = ({ darkMode }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [statsVisible, setStatsVisible] = useState(false);
  const [showCVModal, setShowCVModal] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setStatsVisible(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  const stats = [
    { label: 'Projects Completed', value: 50, suffix: '+' },
    { label: 'Happy Clients', value: 25, suffix: '+' },
    { label: 'Years Experience', value: 5, suffix: '+' },
    { label: 'Technologies', value: 20, suffix: '+' }
  ];

  const [counters, setCounters] = useState(stats.map(() => 0));

  useEffect(() => {
    if (statsVisible) {
      stats.forEach((stat, index) => {
        let start = 0;
        const increment = stat.value / 50;
        const timer = setInterval(() => {
          start += increment;
          if (start >= stat.value) {
            start = stat.value;
            clearInterval(timer);
          }
          setCounters(prev => {
            const newCounters = [...prev];
            newCounters[index] = Math.floor(start);
            return newCounters;
          });
        }, 40);
      });
    }
  }, [statsVisible]);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24"
    >
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute opacity-20 animate-float"
            style={{
              left: `${20 + i * 15}%`,
              top: `${30 + i * 10}%`,
              animationDelay: `${i * 2}s`,
              transform: `translate(${mousePosition.x * 0.01}px, ${mousePosition.y * 0.01}px)`
            }}
          >
            <div
              className={`w-20 h-20 rounded-xl backdrop-blur-sm border transition-all duration-1000 ${
                darkMode
                  ? 'bg-gradient-to-br from-cyan-500/10 to-blue-600/10 border-cyan-400/20'
                  : 'bg-gradient-to-br from-orange-500/10 to-red-600/10 border-orange-400/20'
              }`}
            />
          </div>
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="space-y-8">
          <div className="relative mx-auto w-40 h-40 lg:w-48 lg:h-48 group">
            <div
              className={`absolute inset-0 rounded-full blur-xl transition-all duration-500 ${
                darkMode
                  ? 'bg-gradient-to-r from-cyan-400/50 to-blue-600/50'
                  : 'bg-gradient-to-r from-orange-400/50 to-red-600/50'
              }`}
            />
            <div
              className={`relative w-full h-full rounded-full overflow-hidden border-4 transition-all duration-500 group-hover:scale-105 group-hover:rotate-3 ${
                darkMode
                  ? 'border-cyan-400/50 shadow-2xl shadow-cyan-500/25'
                  : 'border-orange-400/50 shadow-2xl shadow-orange-500/25'
              }`}
            >
              <img src={srkImage} alt="Profile" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>
          </div>

          <div className="space-y-6">
            <h1 className={`text-4xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r bg-clip-text text-transparent transition-all duration-1000 ${darkMode ? 'from-white via-cyan-200 to-blue-400' : 'from-gray-900 via-orange-600 to-red-600'}`}>
              Creative Developer
            </h1>
            <p className={`text-xl md:text-2xl font-light max-w-3xl mx-auto transition-colors duration-500 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Crafting digital experiences that blend innovation with elegant design
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <button
                onClick={() => {
                  const section = document.getElementById('projects');
                  if (section) {
                    section.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className={`group px-8 py-4 rounded-full font-semibold transition-all duration-300 hover:scale-105 hover:-translate-y-1 ${
                  darkMode
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-xl shadow-cyan-500/25 hover:shadow-2xl hover:shadow-cyan-500/40'
                    : 'bg-gradient-to-r from-orange-500 to-red-600 text-white shadow-xl shadow-orange-500/25 hover:shadow-2xl hover:shadow-orange-500/40'
                }`}
              >
                View My Work
                <ArrowDown className="inline-block ml-2 w-5 h-5 group-hover:translate-y-1 transition-transform duration-300" />
              </button>

              <button
                onClick={() => setShowCVModal(true)}
                className={`px-8 py-4 rounded-full font-semibold border-2 backdrop-blur-sm transition-all duration-300 hover:scale-105 flex items-center space-x-2 ${
                  darkMode
                    ? 'border-cyan-400/30 text-cyan-400 hover:bg-cyan-400/10'
                    : 'border-orange-400/30 text-orange-600 hover:bg-orange-400/10'
                }`}
              >
                <Download className="w-5 h-5" />
                <span>Download CV</span>
              </button>
            </div>

            <div className="flex items-center justify-center space-x-6 pt-6">
              {[{
                icon: Github,
                href: 'https://github.com/soundharrajv/',
                label: 'GitHub'
              }, {
                icon: Linkedin,
                href: 'https://www.linkedin.com/in/soundhar-raj-v-7019a22b1/',
                label: 'LinkedIn'
              }, {
                icon: Mail,
                href: 'mailto:soundharrajvellingiri@gmail.com',
                label: 'Email'
              }].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  className={`p-3 rounded-xl transition-all duration-300 hover:scale-110 hover:-translate-y-1 ${
                    darkMode
                      ? 'text-gray-400 hover:text-cyan-400 hover:bg-slate-800/50 hover:shadow-lg hover:shadow-cyan-500/25'
                      : 'text-gray-600 hover:text-orange-600 hover:bg-white/50 hover:shadow-lg hover:shadow-orange-500/25'
                  }`}
                  aria-label={label}
                >
                  <Icon className="w-6 h-6" />
                </a>
              ))}
            </div>
          </div>

          <div className="hidden lg:grid grid-cols-4 gap-8 pt-16 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className={`p-6 rounded-2xl backdrop-blur-sm border transition-all duration-500 hover:scale-105 ${
                  darkMode
                    ? 'bg-slate-800/30 border-cyan-500/20'
                    : 'bg-white/30 border-orange-500/20'
                } ${statsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <div
                  className={`text-3xl font-bold bg-gradient-to-r bg-clip-text text-transparent ${
                    darkMode ? 'from-cyan-400 to-blue-400' : 'from-orange-600 to-red-600'
                  }`}
                >
                  {counters[index]}{stat.suffix}
                </div>
                <div className={`text-sm mt-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {showCVModal && <CVModal onClose={() => setShowCVModal(false)} darkMode={darkMode} />}

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className={`w-6 h-10 border-2 rounded-full flex justify-center ${darkMode ? 'border-cyan-400/50' : 'border-orange-400/50'}`}>
          <div className={`w-1 h-3 rounded-full mt-2 animate-pulse ${darkMode ? 'bg-cyan-400' : 'bg-orange-500'}`} />
        </div>
      </div>
    </section>
  );
};

export default Hero;