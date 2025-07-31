import React, { useState } from 'react';
import { ExternalLink, Github, X, ArrowRight } from 'lucide-react';

interface ProjectsProps {
  darkMode: boolean;
}

const Projects: React.FC<ProjectsProps> = ({ darkMode }) => {
  const [selectedProject, setSelectedProject] = useState<number | null>(null);

  const projects = [
    {
      title: 'E-Commerce Platform',
      description: 'A full-stack e-commerce solution with React, Node.js, and Stripe integration',
      longDescription: 'A comprehensive e-commerce platform featuring user authentication, product management, shopping cart functionality, payment processing with Stripe, order tracking, and admin dashboard. Built with modern technologies for optimal performance and user experience.',
      image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=600',
      technologies: ['React', 'Node.js', 'MongoDB', 'Stripe', 'JWT'],
      github: '#',
      live: '#',
      category: 'Full Stack'
    },
    {
      title: 'Smart Notes',
      description: 'A collaborative notes sharing application with real-time updates',
      longDescription: 'A sophisticated notes sharing application featuring real-time collaboration, drag-and-drop interfaces, team management, project timelines, file attachments, and detailed analytics. Perfect for teams looking to boost productivity.',
      image: 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=600',
      technologies: ['Typescript', 'Tailwind.css', 'tsx', 'PostgreSQL'],
      github: '#',
      live: '#',
      category: 'Web App'
    },
    {
      title: 'Portfolio Website',
      description: 'A responsive portfolio website with smooth animations and dark mode',
      longDescription: 'A modern, responsive portfolio website featuring smooth scroll animations, dark/light theme toggle, contact forms, project showcases, and optimized performance. Built with attention to detail and user experience.',
      image: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=600',
      technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
      github: '#',
      live: '#',
      category: 'Frontend'
    },
    {
      title: 'Weather Dashboard',
      description: 'A comprehensive weather dashboard with interactive maps and forecasts',
      longDescription: 'A feature-rich weather dashboard providing current conditions, extended forecasts, interactive weather maps, location search, favorite locations, and weather alerts. Designed for weather enthusiasts and professionals.',
      image: 'https://images.pexels.com/photos/1118873/pexels-photo-1118873.jpeg?auto=compress&cs=tinysrgb&w=600',
      technologies: ['React', 'Weather API', 'Chart.js', 'Leaflet'],
      github: '#',
      live: '#',
      category: 'Web App'
    },
    {
      title: 'Gen-AI Guided After Sales Assistant',
      description: 'Analytics dashboard for social media performance tracking',
      longDescription: 'A comprehensive social media analytics platform featuring multi-platform integration, real-time metrics, engagement tracking, audience insights, content performance analysis, and automated reporting.',
      image: 'https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&w=600',
      technologies: ['Angular', 'D3.js', 'Python', 'FastAPI'],
      github: '#',
      live: '#',
      category: 'Ongoing'
    }
  ];

  const categories = ['All', ...Array.from(new Set(projects.map(p => p.category)))];
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredProjects = activeCategory === 'All' 
    ? projects 
    : projects.filter(p => p.category === activeCategory);

  return (
    <section id="projects" className={`py-20 lg:py-32 transition-colors duration-500 ${
      darkMode ? 'bg-slate-800/30' : 'bg-white/50'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className={`text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r bg-clip-text text-transparent ${
            darkMode 
              ? 'from-cyan-400 to-blue-400' 
              : 'from-orange-600 to-red-600'
          }`}>
            Featured Projects
          </h2>
          <div className={`w-24 h-1 rounded-full mx-auto mb-6 ${
            darkMode 
              ? 'bg-gradient-to-r from-cyan-400 to-blue-600' 
              : 'bg-gradient-to-r from-orange-500 to-red-600'
          }`} />
          <p className={`text-xl max-w-3xl mx-auto ${
            darkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            A collection of projects showcasing my expertise in modern web development
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 hover:scale-105 ${
                activeCategory === category
                  ? darkMode
                    ? 'bg-cyan-400/20 text-cyan-400 border border-cyan-400/50'
                    : 'bg-orange-400/20 text-orange-600 border border-orange-400/50'
                  : darkMode
                    ? 'text-gray-400 border border-gray-600 hover:text-cyan-400 hover:border-cyan-400/50'
                    : 'text-gray-600 border border-gray-300 hover:text-orange-600 hover:border-orange-400/50'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <div
              key={project.title}
              className={`group relative rounded-2xl overflow-hidden backdrop-blur-sm border transition-all duration-500 hover:scale-105 hover:-translate-y-2 cursor-pointer ${
                darkMode 
                  ? 'bg-slate-900/30 border-cyan-500/20 hover:border-cyan-400/50' 
                  : 'bg-white/50 border-orange-500/20 hover:border-orange-400/50'
              }`}
              onClick={() => setSelectedProject(index)}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Project Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
                />
                <div className={`absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                
                {/* Hover Overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <div className={`px-6 py-3 rounded-full backdrop-blur-sm border text-white font-medium ${
                    darkMode ? 'border-cyan-400/50' : 'border-orange-400/50'
                  }`}>
                    View Details
                    <ArrowRight className="inline-block ml-2 w-4 h-4" />
                  </div>
                </div>
              </div>

              {/* Project Info */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-sm px-3 py-1 rounded-full ${
                    darkMode 
                      ? 'bg-cyan-400/10 text-cyan-400' 
                      : 'bg-orange-400/10 text-orange-600'
                  }`}>
                    {project.category}
                  </span>
                </div>
                
                <h3 className={`text-xl font-semibold mb-3 ${
                  darkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  {project.title}
                </h3>
                
                <p className={`text-sm mb-4 ${
                  darkMode ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  {project.description}
                </p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.slice(0, 3).map((tech) => (
                    <span
                      key={tech}
                      className={`text-xs px-2 py-1 rounded ${
                        darkMode 
                          ? 'bg-slate-700/50 text-gray-300' 
                          : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 3 && (
                    <span className={`text-xs px-2 py-1 rounded ${
                      darkMode ? 'text-gray-400' : 'text-gray-500'
                    }`}>
                      +{project.technologies.length - 3} more
                    </span>
                  )}
                </div>

                {/* Links */}
                <div className="flex space-x-4">
                  <a
                    href={project.github}
                    className={`p-2 rounded-lg transition-colors duration-300 ${
                      darkMode 
                        ? 'text-gray-400 hover:text-cyan-400 hover:bg-slate-800/50' 
                        : 'text-gray-600 hover:text-orange-600 hover:bg-gray-100'
                    }`}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Github className="w-5 h-5" />
                  </a>
                  <a
                    href={project.live}
                    className={`p-2 rounded-lg transition-colors duration-300 ${
                      darkMode 
                        ? 'text-gray-400 hover:text-cyan-400 hover:bg-slate-800/50' 
                        : 'text-gray-600 hover:text-orange-600 hover:bg-gray-100'
                    }`}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <ExternalLink className="w-5 h-5" />
                  </a>
                </div>
              </div>

              {/* Glow Effect */}
              <div className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none ${
                darkMode 
                  ? 'bg-gradient-to-br from-cyan-400/5 to-blue-600/5' 
                  : 'bg-gradient-to-br from-orange-400/5 to-red-600/5'
              }`} />
            </div>
          ))}
        </div>

        {/* Project Modal */}
        {selectedProject !== null && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <div className={`relative max-w-4xl w-full max-h-[90vh] overflow-y-auto rounded-2xl backdrop-blur-xl border ${
              darkMode 
                ? 'bg-slate-900/90 border-cyan-500/20' 
                : 'bg-white/90 border-orange-500/20'
            }`}>
              <button
                onClick={() => setSelectedProject(null)}
                className={`absolute top-4 right-4 z-10 p-2 rounded-full transition-colors duration-300 ${
                  darkMode 
                    ? 'text-gray-400 hover:text-white hover:bg-slate-800/50' 
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100/50'
                }`}
              >
                <X className="w-6 h-6" />
              </button>

              <div className="p-8">
                <img
                  src={filteredProjects[selectedProject].image}
                  alt={filteredProjects[selectedProject].title}
                  className="w-full h-64 object-cover rounded-xl mb-6"
                />

                <div className="space-y-6">
                  <div>
                    <h3 className={`text-3xl font-bold mb-2 ${
                      darkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                      {filteredProjects[selectedProject].title}
                    </h3>
                    <span className={`px-3 py-1 rounded-full text-sm ${
                      darkMode 
                        ? 'bg-cyan-400/10 text-cyan-400' 
                        : 'bg-orange-400/10 text-orange-600'
                    }`}>
                      {filteredProjects[selectedProject].category}
                    </span>
                  </div>

                  <p className={`text-lg leading-relaxed ${
                    darkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    {filteredProjects[selectedProject].longDescription}
                  </p>

                  <div>
                    <h4 className={`text-xl font-semibold mb-3 ${
                      darkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                      Technologies Used
                    </h4>
                    <div className="flex flex-wrap gap-3">
                      {filteredProjects[selectedProject].technologies.map((tech) => (
                        <span
                          key={tech}
                          className={`px-4 py-2 rounded-full border ${
                            darkMode 
                              ? 'bg-slate-800/50 border-cyan-500/20 text-gray-300' 
                              : 'bg-gray-50 border-orange-500/20 text-gray-700'
                          }`}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex space-x-4 pt-4">
                    <a
                      href={filteredProjects[selectedProject].github}
                      className={`flex items-center space-x-2 px-6 py-3 rounded-full border transition-all duration-300 hover:scale-105 ${
                        darkMode 
                          ? 'border-cyan-400/30 text-cyan-400 hover:bg-cyan-400/10' 
                          : 'border-orange-400/30 text-orange-600 hover:bg-orange-400/10'
                      }`}
                    >
                      <Github className="w-5 h-5" />
                      <span>View Code</span>
                    </a>
                    <a
                      href={filteredProjects[selectedProject].live}
                      className={`flex items-center space-x-2 px-6 py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105 ${
                        darkMode 
                          ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/25' 
                          : 'bg-gradient-to-r from-orange-500 to-red-600 text-white shadow-lg shadow-orange-500/25'
                      }`}
                    >
                      <ExternalLink className="w-5 h-5" />
                      <span>Live Demo</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;