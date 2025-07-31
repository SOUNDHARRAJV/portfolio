import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle, AlertCircle } from 'lucide-react';

interface ContactProps {
  darkMode: boolean;
}

const Contact: React.FC<ContactProps> = ({ darkMode }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }

    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    setIsSubmitting(true);
    setErrors({});

    // Simulate form submission
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus('idle'), 3000);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email',
      value: 'soundharrajvellingiri@gmail.com',
      href: 'mailto:hello@example.com'
    },
    {
      icon: Phone,
      title: 'Phone',
      value: '+91 63808 31039',
      href: 'tel:+916380831039'
    },
    {
      icon: MapPin,
      title: 'Location',
      value: 'TIRUPPUR,TAMIL NADU',
      href: '#'
    }
  ];

  return (
    <section id="contact" className="py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className={`text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r bg-clip-text text-transparent ${
            darkMode 
              ? 'from-cyan-400 to-blue-400' 
              : 'from-orange-600 to-red-600'
          }`}>
            Wanna Build? Ping Me on LinkedIn.
          </h2>
          <div className={`w-24 h-1 rounded-full mx-auto mb-6 ${
            darkMode 
              ? 'bg-gradient-to-r from-cyan-400 to-blue-600' 
              : 'bg-gradient-to-r from-orange-500 to-red-600'
          }`} />
          <p className={`text-xl max-w-3xl mx-auto ${
            darkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Ready to bring your ideas to life? Let's discuss your next project
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h3 className={`text-2xl font-bold mb-6 ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Jus a Mail!
              </h3>
              <p className={`text-lg leading-relaxed mb-8 ${
                darkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                I'm always interested in new opportunities and exciting projects. 
                Whether you have a question or just want to say hi, feel free to reach out!
              </p>
            </div>

            <div className="space-y-6">
              {contactInfo.map((info, index) => (
                <a
                  key={info.title}
                  href={info.href}
                  className={`flex items-center space-x-4 group p-4 rounded-2xl backdrop-blur-sm border transition-all duration-300 hover:scale-105 hover:-translate-y-1 ${
                    darkMode 
                      ? 'border-cyan-500/20 hover:border-cyan-400/50 hover:bg-slate-800/30' 
                      : 'border-orange-500/20 hover:border-orange-400/50 hover:bg-white/50'
                  }`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className={`p-3 rounded-xl transition-colors duration-300 ${
                    darkMode 
                      ? 'bg-cyan-400/10 text-cyan-400 group-hover:bg-cyan-400/20' 
                      : 'bg-orange-400/10 text-orange-600 group-hover:bg-orange-400/20'
                  }`}>
                    <info.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className={`font-semibold ${
                      darkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                      {info.title}
                    </h4>
                    <p className={`${
                      darkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      {info.value}
                    </p>
                  </div>
                </a>
              ))}
            </div>

            {/* Social Media Links */}
            <div className="pt-8">
              <h4 className={`text-lg font-semibold mb-4 ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Follow Me
              </h4>
              <div className="flex space-x-4">
                {['GitHub', 'LinkedIn', 'Twitter'].map((platform) => (
                  <a
                    key={platform}
                    href="#"
                    className={`px-4 py-2 rounded-lg transition-all duration-300 hover:scale-105 ${
                      darkMode 
                        ? 'bg-slate-800/50 text-gray-400 hover:text-cyan-400 border border-slate-700' 
                        : 'bg-gray-100 text-gray-600 hover:text-orange-600 border border-gray-200'
                    }`}
                  >
                    {platform}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className={`p-8 rounded-2xl backdrop-blur-sm border ${
            darkMode 
              ? 'bg-slate-800/30 border-cyan-500/20' 
              : 'bg-white/50 border-orange-500/20'
          }`}>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className={`block text-sm font-medium mb-2 ${
                    darkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg backdrop-blur-sm border transition-all duration-300 focus:outline-none focus:ring-2 ${
                      errors.name
                        ? 'border-red-400 focus:ring-red-400/50'
                        : darkMode
                          ? 'bg-slate-900/50 border-gray-600 text-white focus:border-cyan-400 focus:ring-cyan-400/50'
                          : 'bg-white/50 border-gray-300 text-gray-900 focus:border-orange-400 focus:ring-orange-400/50'
                    }`}
                    placeholder="Your name"
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-400 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.name}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="email" className={`block text-sm font-medium mb-2 ${
                    darkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg backdrop-blur-sm border transition-all duration-300 focus:outline-none focus:ring-2 ${
                      errors.email
                        ? 'border-red-400 focus:ring-red-400/50'
                        : darkMode
                          ? 'bg-slate-900/50 border-gray-600 text-white focus:border-cyan-400 focus:ring-cyan-400/50'
                          : 'bg-white/50 border-gray-300 text-gray-900 focus:border-orange-400 focus:ring-orange-400/50'
                    }`}
                    placeholder="your.email@example.com"
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-400 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.email}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label htmlFor="subject" className={`block text-sm font-medium mb-2 ${
                  darkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Subject *
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-lg backdrop-blur-sm border transition-all duration-300 focus:outline-none focus:ring-2 ${
                    errors.subject
                      ? 'border-red-400 focus:ring-red-400/50'
                      : darkMode
                        ? 'bg-slate-900/50 border-gray-600 text-white focus:border-cyan-400 focus:ring-cyan-400/50'
                        : 'bg-white/50 border-gray-300 text-gray-900 focus:border-orange-400 focus:ring-orange-400/50'
                  }`}
                  placeholder="What's this about?"
                />
                {errors.subject && (
                  <p className="mt-1 text-sm text-red-400 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.subject}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="message" className={`block text-sm font-medium mb-2 ${
                  darkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  value={formData.message}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-lg backdrop-blur-sm border resize-none transition-all duration-300 focus:outline-none focus:ring-2 ${
                    errors.message
                      ? 'border-red-400 focus:ring-red-400/50'
                      : darkMode
                        ? 'bg-slate-900/50 border-gray-600 text-white focus:border-cyan-400 focus:ring-cyan-400/50'
                        : 'bg-white/50 border-gray-300 text-gray-900 focus:border-orange-400 focus:ring-orange-400/50'
                  }`}
                  placeholder="Tell me about your project..."
                />
                {errors.message && (
                  <p className="mt-1 text-sm text-red-400 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full px-8 py-4 rounded-lg font-semibold transition-all duration-300 hover:scale-105 flex items-center justify-center space-x-2 ${
                  isSubmitting
                    ? darkMode
                      ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : submitStatus === 'success'
                      ? 'bg-green-500 text-white'
                      : submitStatus === 'error'
                        ? 'bg-red-500 text-white'
                        : darkMode
                          ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-xl shadow-cyan-500/25 hover:shadow-2xl hover:shadow-cyan-500/40'
                          : 'bg-gradient-to-r from-orange-500 to-red-600 text-white shadow-xl shadow-orange-500/25 hover:shadow-2xl hover:shadow-orange-500/40'
                }`}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                    <span>Sending...</span>
                  </>
                ) : submitStatus === 'success' ? (
                  <>
                    <CheckCircle className="w-5 h-5" />
                    <span>Message Sent!</span>
                  </>
                ) : submitStatus === 'error' ? (
                  <>
                    <AlertCircle className="w-5 h-5" />
                    <span>Failed to Send</span>
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    <span>Send Message</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;