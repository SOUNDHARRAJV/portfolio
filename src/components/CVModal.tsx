import React from 'react';
import { Download, X } from 'lucide-react';

interface CVModalProps {
  onClose: () => void;
  darkMode: boolean;
}

const CVModal: React.FC<CVModalProps> = ({ onClose, darkMode }) => {
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className={`rounded-xl shadow-xl max-w-2xl w-full relative p-6 overflow-y-auto max-h-[90vh] ${
        darkMode ? 'bg-slate-900 text-gray-300' : 'bg-white text-gray-800'
      }`}>
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-red-500"
        >
          <X className="w-6 h-6" />
        </button>

        {/* CV Content */}
        <div className="text-sm space-y-3">
          <h2 className={`text-2xl font-bold mb-4 text-center ${darkMode ? 'text-cyan-400' : 'text-cyan-600'}`}>
            Soundhar Raj V — Curriculum Vitae
          </h2>

          <p><strong>Name:</strong> Soundhar Raj V</p>
          <p><strong>Email:</strong> soundharrajvellingiri@gmail.com</p>
          <p><strong>Phone:</strong> +91 63808 31039</p>
          <p><strong>Department:</strong> Agricultural Engineering</p>
          <p><strong>College:</strong> Bannari Amman Institute of Technology</p>
          <p><strong>Technical Skills:</strong> React, TypeScript, Tailwind CSS, Supabase, Firebase, Python, Java, SQL</p>
          <p><strong>Projects:</strong></p>
          
          <ul className="list-disc list-inside ml-4">
            <li>Centralised Approval Management Portal (React, TypeScript, Supabase, PostgreSQL)</li>
            <li>SmartNotes — AI-Powered Note Sharing Platform (React, Firebase)</li>
            <li>SRK Farms — Farm-to-Home Product Listing Platform</li>
          </ul>

          <p><strong>Coding Profile:</strong> 350+ problems solved on LeetCode</p>
          <p><strong>Hackathons:</strong> YUGAM, CODECRAZE, SIH 2025, Hacksagon 2026</p>
        </div>

        {/* Download Button */}
        <div className="text-center mt-6">
          <a
            href="/cv.pdf"
            download="Soundhar_Raj_CV.pdf"
            className="inline-flex items-center space-x-2 bg-cyan-600 text-white px-6 py-3 rounded-full hover:bg-cyan-700 transition"
          >
            <Download className="w-5 h-5" />
            <span>Download PDF</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default CVModal;
