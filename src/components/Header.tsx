'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

interface HeaderProps {
  onChatToggle: () => void;
}

export default function Header({ onChatToggle }: HeaderProps) {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Check for saved theme preference or default to light mode
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setIsDarkMode(true);
      document.documentElement.setAttribute('data-theme', 'dark');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    
    if (newTheme) {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
      localStorage.setItem('theme', 'light');
    }
  };

  // Common button styles
  const buttonStyle = {
    width: '32px',
    height: '32px',
    background: 'var(--accent-green-1)',
    border: 'none',
    borderRadius: '50%',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all var(--dur-1) var(--ease-out)'
  };

  const buttonHoverStyle = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.style.background = 'var(--accent-green-2)';
  };

  const buttonLeaveStyle = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.style.background = 'var(--accent-green-1)';
  };

  return (
    <header className="bode-header">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
        {/* Left side - User Profile */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', flexShrink: 0 }}>
          <div style={{ 
            width: '40px', 
            height: '40px', 
            borderRadius: '50%', 
            overflow: 'hidden',
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'all var(--dur-1) var(--ease-out)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.05)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
          }}
          >
            <Image 
              src="/person.png" 
              alt="Profile" 
              width={40}
              height={40}
            />
          </div>
        </div>

        {/* Right side - Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginLeft: 'auto', flexShrink: 0 }}>
          {/* Add Widget Button */}
          <button
            style={buttonStyle}
            onMouseEnter={buttonHoverStyle}
            onMouseLeave={buttonLeaveStyle}
            title="Add Widget"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8 3V13M3 8H13" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>

          {/* Reports Button */}
          <button
            style={buttonStyle}
            onMouseEnter={buttonHoverStyle}
            onMouseLeave={buttonLeaveStyle}
            title="Reports"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 13V7M7 13V3M11 13V9M15 13V5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>

          {/* Notifications Button */}
          <button 
            style={{ ...buttonStyle, position: 'relative' }}
            onMouseEnter={buttonHoverStyle}
            onMouseLeave={buttonLeaveStyle}
            title="Notifications"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8 2C6.9 2 6 2.9 6 4V7.5L4 11V12H12V11L10 7.5V4C10 2.9 9.1 2 8 2Z" stroke="currentColor" strokeWidth="1.5" fill="none"/>
              <path d="M6 12V13C6 14.1 6.9 15 8 15C9.1 15 10 14.1 10 13V12" stroke="currentColor" strokeWidth="1.5"/>
            </svg>
            <span style={{ 
              position: 'absolute', 
              top: '2px', 
              right: '2px', 
              background: 'var(--accent-yellow)', 
              color: 'var(--ink-1)', 
              borderRadius: '50%', 
              width: '12px', 
              height: '12px', 
              fontSize: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 'bold'
            }}>3</span>
          </button>

          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            style={buttonStyle}
            onMouseEnter={buttonHoverStyle}
            onMouseLeave={buttonLeaveStyle}
            title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            {isDarkMode ? (
              // Sun icon for dark mode
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="8" cy="8" r="3" fill="currentColor"/>
                <path d="M8 1V3M8 13V15M15 8H13M3 8H1M13.5 2.5L12 4M4 12L2.5 13.5M13.5 13.5L12 12M4 4L2.5 2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            ) : (
              // Moon icon for light mode
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13.5 8.5C13.5 11.5 11 14 8 14C5 14 2.5 11.5 2.5 8.5C2.5 5.5 5 3 8 3C11 3 13.5 5.5 13.5 8.5Z" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                <path d="M8 1V3M8 13V15M15 8H13M3 8H1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            )}
          </button>

          {/* AI Panel Toggle Button */}
          <button
            onClick={onChatToggle}
            style={buttonStyle}
            onMouseEnter={buttonHoverStyle}
            onMouseLeave={buttonLeaveStyle}
            title="Toggle AI Assistant"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="2" y="4" width="12" height="8" rx="1" stroke="currentColor" strokeWidth="1.5" fill="none"/>
              <path d="M4 6H12M4 8H10M4 10H8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}
