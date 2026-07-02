import React from 'react';
import { Code, Sprout, Brain, GraduationCap } from 'lucide-react';
import srkImage from './srk.png';
import srkTravelImage from './srk-travel.jpg';

interface AboutProps {
  darkMode: boolean;
}

const About: React.FC<AboutProps> = ({ darkMode }) => {
  const features = [
    {
      icon: Code,
      title: 'Full-Stack Builder',
      description: 'React, TypeScript, Tailwind, Supabase & Firebase — shipped end to end'
    },
    {
      icon: Brain,
      title: 'DSA Focused',
      description: '350+ LeetCode problems solved with a strong CS fundamentals base'
    },
    {
      icon: Sprout,
      title: 'AgriTech Edge',
      description: 'Family runs SRK Farms — a real-world lens most developers don\'t have'
    },
    {
      icon: GraduationCap,
      title: 'Self-Taught',
      description: 'Learned full-stack development independently, outside the classroom'
    }
  ];

  return (
    <section id="about" className={`py-20 lg:py-32 transition-colors duration-500 ${
      darkMode ? 'bg-slate-800/30' : 'bg-white/50'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className={`text-4xl lg:text-5xl font-bold bg-gradient-to-r bg-clip-text text-transparent ${
                darkMode 
                  ? 'from-cyan-400 to-blue-400' 
                  : 'from-orange-600 to-red-600'
              }`}>
                About Me
              </h2>
              <div className={`w-24 h-1 rounded-full ${
                darkMode 
                  ? 'bg-gradient-to-r from-cyan-400 to-blue-600' 
                  : 'bg-gradient-to-r from-orange-500 to-red-600'
              }`} />
            </div>
            
            <div className="space-y-6">
              <p className={`text-lg leading-relaxed ${
                darkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                I'm a final-year Agricultural Engineering student at Bannari Amman Institute of Technology who taught myself full-stack development — React, TypeScript, Tailwind CSS, Supabase, and Firebase — and built it into a rare AgriTech-meets-software profile.
              </p>
              
              <p className={`text-lg leading-relaxed ${
                darkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                My family runs SRK Farms, and that hands-on agricultural background shapes how I approach engineering problems. Outside of building products, I've solved 350+ problems on LeetCode and competed in hackathons including SIH 2025 and Hacksagon 2026.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {features.map((feature, index) => (
                <div
                  key={feature.title}
                  className={`p-6 rounded-2xl backdrop-blur-sm border transition-all duration-500 hover:scale-105 hover:-translate-y-2 group ${
                    darkMode 
                      ? 'bg-slate-900/30 border-cyan-500/20 hover:border-cyan-400/50' 
                      : 'bg-white/50 border-orange-500/20 hover:border-orange-400/50'
                  }`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <feature.icon className={`w-8 h-8 mb-4 transition-colors duration-300 ${
                    darkMode 
                      ? 'text-cyan-400 group-hover:text-cyan-300' 
                      : 'text-orange-600 group-hover:text-orange-500'
                  }`} />
                  <h3 className={`font-semibold mb-2 ${
                    darkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    {feature.title}
                  </h3>
                  <p className={`text-sm ${
                    darkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Image with 3D Effects */}
          <div className="relative mx-auto lg:mx-0 w-full max-w-2xl lg:pl-6">
            <div className={`absolute inset-2 rounded-[2rem] blur-3xl transition-all duration-500 ${
              darkMode 
                ? 'bg-gradient-to-br from-cyan-400/20 to-blue-600/20' 
                : 'bg-gradient-to-br from-orange-400/20 to-red-600/20'
            }`} />
            
            <div className="relative grid grid-cols-2 gap-4 items-stretch">
              <div className={`relative aspect-[4/5] rounded-[2rem] overflow-hidden border-2 transition-all duration-700 animate-float ${
                darkMode 
                  ? 'border-cyan-400/30 shadow-2xl shadow-cyan-500/20' 
                  : 'border-orange-400/30 shadow-2xl shadow-orange-500/20'
              }`}>
                <div className={`absolute inset-0 opacity-70 ${
                  darkMode
                    ? 'bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.18),transparent_55%)]'
                    : 'bg-[radial-gradient(circle_at_top,rgba(249,115,22,0.18),transparent_55%)]'
                }`} />
                <div className={`absolute -top-3 -right-3 w-20 h-20 rounded-full blur-2xl ${
                  darkMode ? 'bg-cyan-400/20' : 'bg-orange-400/20'
                }`} />
                <img
                  src={srkImage}
                  alt="Soundhar Raj V"
                  className="w-full h-full object-cover scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>

              <div className={`relative aspect-[4/5] rounded-[2rem] overflow-hidden border-2 transition-all duration-700 animate-float-delay ${
                darkMode 
                  ? 'border-cyan-400/30 shadow-2xl shadow-cyan-500/20' 
                  : 'border-orange-400/30 shadow-2xl shadow-orange-500/20'
              }`}>
                <img
                  src={srkTravelImage}
                  alt="Soundhar Raj on a trip"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent" />
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-black/30 backdrop-blur-md border border-white/10">
                  <p className={`text-xs font-medium tracking-wide ${
                    darkMode ? 'text-gray-100' : 'text-white'
                  }`}>
                    off the clock
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;