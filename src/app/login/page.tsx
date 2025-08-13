'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Simple password check - you can change this password
    if (password === 'bode2024') {
      // Set authentication in localStorage
      localStorage.setItem('bode-auth', 'true');
      router.push('/');
    } else {
      setError('Incorrect password. Please try again.');
    }
    
    setIsLoading(false);
  };

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
        background: 'var(--ui-2)',
        padding: 'var(--space-8)',
        borderRadius: 'var(--radius-lg)',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
        width: '100%',
        maxWidth: '400px',
        animation: 'fadeInScale 0.6s ease-out'
      }}>
        <div style={{ textAlign: 'center', marginBottom: 'var(--space-6)' }}>
          <h1 className="h1" style={{ marginBottom: 'var(--space-2)' }}>Bode</h1>
          <p className="meta">AI-Powered Property Management Platform</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: 'var(--space-4)' }}>
            <label style={{
              display: 'block',
              marginBottom: 'var(--space-2)',
              fontSize: 'var(--fs-sm)',
              fontWeight: 'var(--fw-medium)',
              color: 'var(--ink-1)'
            }}>
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                width: '100%',
                padding: 'var(--space-3)',
                border: 'var(--border-1)',
                borderRadius: 'var(--radius-sm)',
                background: 'var(--ui-1)',
                color: 'var(--ink-1)',
                fontSize: 'var(--fs-md)',
                fontFamily: 'var(--font-sans)',
                boxSizing: 'border-box'
              }}
              placeholder="Enter password"
              required
            />
          </div>

          {error && (
            <div style={{
              padding: 'var(--space-3)',
              background: 'rgba(220, 38, 38, 0.1)',
              border: '1px solid rgba(220, 38, 38, 0.3)',
              borderRadius: 'var(--radius-sm)',
              color: '#dc2626',
              fontSize: 'var(--fs-sm)',
              marginBottom: 'var(--space-4)'
            }}>
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            style={{
              width: '100%',
              padding: 'var(--space-3)',
              background: 'var(--accent-green-1)',
              color: 'var(--ink-1)',
              border: 'none',
              borderRadius: 'var(--radius-sm)',
              fontSize: 'var(--fs-md)',
              fontWeight: 'var(--fw-semibold)',
              cursor: isLoading ? 'not-allowed' : 'pointer',
              opacity: isLoading ? 0.7 : 1,
              transition: 'all 0.2s ease-in-out',
              fontFamily: 'var(--font-sans)'
            }}
            onMouseEnter={(e) => {
              if (!isLoading) {
                e.currentTarget.style.background = 'var(--accent-green-2)';
              }
            }}
            onMouseLeave={(e) => {
              if (!isLoading) {
                e.currentTarget.style.background = 'var(--accent-green-1)';
              }
            }}
          >
            {isLoading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <div style={{
          marginTop: 'var(--space-6)',
          padding: 'var(--space-4)',
          background: 'var(--ui-1)',
          borderRadius: 'var(--radius-sm)',
          fontSize: 'var(--fs-sm)',
          color: 'var(--ink-2)',
          textAlign: 'center'
        }}>
          <strong>Demo Access:</strong><br />
          Password: <code>bode2024</code>
        </div>
      </div>
    </div>
  );
}
