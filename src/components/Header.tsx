import React, { useState, useEffect } from 'react';
import { Moon, Sun, Menu, X, Zap } from 'lucide-react';

interface HeaderProps {
  darkMode: boolean;
  setDarkMode: (darkMode: boolean) => void;
  activeSection: string;
}

const Header: React.FC<HeaderProps> = ({ darkMode, setDarkMode, activeSection }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  const navItems = [
    { id: 'hero', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'contact', label: 'Contact' }
  ];

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? darkMode 
            ? 'bg-slate-900/80 backdrop-blur-xl border-b border-cyan-500/20 shadow-lg shadow-cyan-500/10' 
            : 'bg-white/80 backdrop-blur-xl border-b border-orange-200/50 shadow-lg shadow-orange-500/10'
          : 'bg-transparent'
      }`}>
        {/* Unique gradient overlay */}
        <div className={`absolute inset-0 transition-opacity duration-500 ${
          isScrolled 
            ? darkMode
              ? 'bg-gradient-to-r from-slate-900/90 via-cyan-950/80 to-slate-900/90 opacity-100'
              : 'bg-gradient-to-r from-white/90 via-orange-50/80 to-white/90 opacity-100'
            : 'opacity-0'
        }`} />
        
        {/* Animated border effect */}
        <div className={`absolute bottom-0 left-0 right-0 h-px transition-all duration-500 ${
          isScrolled
            ? darkMode
              ? 'bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-100'
              : 'bg-gradient-to-r from-transparent via-orange-400 to-transparent opacity-100'
            : 'opacity-0'
        }`} />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo with unique design */}
            <div className="flex items-center space-x-2 group cursor-pointer"
                 onClick={() => scrollToSection('hero')}>
              <div className={`relative w-10 h-10 rounded-xl transition-all duration-300 group-hover:scale-110 ${
                darkMode 
                  ? 'bg-gradient-to-br from-cyan-400 to-blue-600 shadow-lg shadow-cyan-500/25' 
                  : 'bg-gradient-to-br from-orange-400 to-red-600 shadow-lg shadow-orange-500/25'
              }`}>
                <Zap className="w-6 h-6 text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                <div className="absolute inset-0 rounded-xl bg-gradient-to-t from-white/20 to-transparent" />
              </div>
              <span className={`text-xl font-bold bg-gradient-to-r bg-clip-text text-transparent transition-all duration-300 ${
                darkMode 
                  ? 'from-cyan-400 to-blue-400' 
                  : 'from-orange-600 to-red-600'
              }`}>
                Portfolio
              </span>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`relative px-4 py-2 rounded-lg transition-all duration-300 text-sm font-medium ${
                    activeSection === item.id
                      ? darkMode
                        ? 'text-cyan-400 bg-cyan-400/10 shadow-lg shadow-cyan-500/20'
                        : 'text-orange-600 bg-orange-100/50 shadow-lg shadow-orange-500/20'
                      : darkMode
                        ? 'text-gray-300 hover:text-cyan-400 hover:bg-slate-800/50'
                        : 'text-gray-600 hover:text-orange-600 hover:bg-gray-100/50'
                  }`}
                >
                  {item.label}
                  {activeSection === item.id && (
                    <div className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 rounded-full transition-all duration-300 ${
                      darkMode ? 'bg-cyan-400 shadow-sm shadow-cyan-400' : 'bg-orange-500 shadow-sm shadow-orange-500'
                    }`} />
                  )}
                </button>
              ))}
            </nav>

            {/* Theme Toggle & Mobile Menu */}
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`p-2 rounded-xl transition-all duration-300 hover:scale-110 ${
                  darkMode 
                    ? 'bg-yellow-400/10 text-yellow-400 hover:bg-yellow-400/20 shadow-lg shadow-yellow-500/20' 
                    : 'bg-blue-600/10 text-blue-600 hover:bg-blue-600/20 shadow-lg shadow-blue-500/20'
                }`}
              >
                {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>

              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={`md:hidden p-2 rounded-xl transition-all duration-300 ${
                  darkMode 
                    ? 'text-cyan-400 hover:bg-slate-800/50' 
                    : 'text-orange-600 hover:bg-gray-100/50'
                }`}
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 z-40 md:hidden transition-all duration-500 ${
        isMobileMenuOpen 
          ? 'opacity-100 pointer-events-auto' 
          : 'opacity-0 pointer-events-none'
      }`}>
        <div className={`absolute inset-0 transition-all duration-500 ${
          darkMode 
            ? 'bg-slate-900/95 backdrop-blur-xl' 
            : 'bg-white/95 backdrop-blur-xl'
        }`} />
        
        <div className="relative flex flex-col items-center justify-center h-full space-y-8">
          {navItems.map((item, index) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`text-2xl font-semibold transition-all duration-500 hover:scale-110 ${
                darkMode ? 'text-gray-100 hover:text-cyan-400' : 'text-gray-900 hover:text-orange-600'
              }`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {item.label}
            </button>
          ))}
          
          <div className={`mt-8 px-8 py-4 rounded-full border-2 transition-all duration-300 hover:scale-105 ${
            darkMode 
              ? 'border-cyan-400/30 bg-cyan-400/10 text-cyan-400' 
              : 'border-orange-400/30 bg-orange-400/10 text-orange-600'
          }`}>
            <span className="text-lg font-medium">Let's Create Together</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;