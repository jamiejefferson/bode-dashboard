'use client';

import { useState } from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import Dashboard from '../components/Dashboard';
import CollapsibleChatPanel from '../components/CollapsibleChatPanel';
import AuthWrapper from '../components/AuthWrapper';

export default function Home() {
  const [isChatOpen, setIsChatOpen] = useState(true);
  const [activeView, setActiveView] = useState('operator');

  const handleChatToggle = () => {
    setIsChatOpen(!isChatOpen);
  };

  return (
    <AuthWrapper>
      <div className="bode-layout">
        <Header onChatToggle={handleChatToggle} />
        <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
          <Sidebar activeView={activeView} setActiveView={setActiveView} />
          <div className="bode-main" style={{ 
            flex: 1,
            marginRight: isChatOpen ? '380px' : '0',
            transition: 'margin-right 0.3s ease-in-out'
          }}>
            <Dashboard activeView={activeView} />
          </div>
        </div>
        <CollapsibleChatPanel 
          isOpen={isChatOpen} 
          onToggle={handleChatToggle} 
          onWidthChange={() => {}} 
        />
      </div>
    </AuthWrapper>
  );
}
