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
        <div className="bode-main" style={{ marginRight: isChatOpen ? '320px' : '0' }}>
          <Sidebar activeView={activeView} setActiveView={setActiveView} />
          <Dashboard activeView={activeView} />
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
