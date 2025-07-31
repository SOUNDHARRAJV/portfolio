import React from 'react';
import { Code, Palette, Zap, Heart } from 'lucide-react';

interface AboutProps {
  darkMode: boolean;
}

const About: React.FC<AboutProps> = ({ darkMode }) => {
  const features = [
    {
      icon: Code,
      title: 'Clean Code',
      description: 'Writing maintainable, scalable code with best practices'
    },
    {
      icon: Palette,
      title: 'Creative Design',
      description: 'Crafting beautiful, user-centered design experiences'
    },
    {
      icon: Zap,
      title: 'Performance',
      description: 'Optimizing for speed and seamless user interactions'
    },
    {
      icon: Heart,
      title: 'Passion',
      description: 'Dedicated to creating meaningful digital solutions'
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
                I'm a passionate full-stack developer with over 5 years of experience crafting digital experiences that make a difference. I specialize in modern web technologies and have a keen eye for design.
              </p>
              
              <p className={`text-lg leading-relaxed ${
                darkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                When I'm not coding, you'll find me exploring new technologies, contributing to open source projects, or sharing knowledge with the developer community.
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
          <div className="relative">
            <div className={`absolute inset-0 rounded-3xl blur-3xl transition-all duration-500 ${
              darkMode 
                ? 'bg-gradient-to-br from-cyan-400/20 to-blue-600/20' 
                : 'bg-gradient-to-br from-orange-400/20 to-red-600/20'
            }`} />
            
            <div className={`relative rounded-3xl overflow-hidden border-2 transition-all duration-500 hover:scale-105 hover:rotate-1 ${
              darkMode 
                ? 'border-cyan-400/30 shadow-2xl shadow-cyan-500/20' 
                : 'border-orange-400/30 shadow-2xl shadow-orange-500/20'
            }`}>
              <img
                src="https://images.pexels.com/photos/3861958/pexels-photo-3861958.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="About"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>

            {/* Floating Elements */}
            <div className={`absolute -top-6 -right-6 w-24 h-24 rounded-2xl backdrop-blur-sm border animate-float ${
              darkMode 
                ? 'bg-slate-800/50 border-cyan-500/30' 
                : 'bg-white/50 border-orange-500/30'
            }`}>
              <div className={`w-full h-full rounded-2xl bg-gradient-to-br opacity-50 ${
                darkMode 
                  ? 'from-cyan-400/20 to-blue-600/20' 
                  : 'from-orange-400/20 to-red-600/20'
              }`} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;