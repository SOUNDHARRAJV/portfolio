import React, { ReactNode } from 'react';

interface ThemeProviderProps {
  darkMode: boolean;
  children: ReactNode;
}

const ThemeProvider: React.FC<ThemeProviderProps> = ({ darkMode, children }) => {
  return (
    <div className={darkMode ? 'dark' : 'light'}>
      {children}
    </div>
  );
};

export default ThemeProvider;