'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface AuthWrapperProps {
  children: React.ReactNode;
}

export default function AuthWrapper({ children }: AuthWrapperProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check if user is authenticated
    const auth = localStorage.getItem('bode-auth');
    if (auth === 'true') {
      setIsAuthenticated(true);
    } else {
      router.push('/login');
    }
    setIsLoading(false);
  }, [router]);

  if (isLoading) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'var(--ui-1)',
        fontFamily: 'var(--font-sans)'
      }}>
        <div style={{
          textAlign: 'center',
          color: 'var(--ink-1)'
        }}>
          <div className="loading-skeleton" style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            margin: '0 auto var(--space-4)'
          }} />
          <p className="meta">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null; // Will redirect to login
  }

  return <>{children}</>;
}
