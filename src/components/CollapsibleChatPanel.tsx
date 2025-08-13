'use client';

import { useState, useEffect, useRef } from 'react';

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

interface CollapsibleChatPanelProps {
  isOpen: boolean;
  onToggle: () => void;
  onWidthChange: (width: number) => void;
}

// Consistent time formatting function to prevent hydration errors
const formatTime = (date: Date): string => {
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  return `${hours}:${minutes}`;
};

export default function CollapsibleChatPanel({ isOpen, onToggle }: CollapsibleChatPanelProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'ai',
      content: "Hello! I'm your AI property management assistant. I can help you analyze data, create reports, and answer questions about your properties. What would you like to know?",
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (inputValue.trim() === '') return;

    const newUserMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, newUserMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: "I understand you're asking about property management. I can help with data analysis, report generation, and performance monitoring. What specific information would you like to explore?",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1000);
  };

  return (
    <div className="chat-panel-container" data-open={isOpen}>
      <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        {/* Header */}
        <div style={{
          padding: 'var(--space-4) var(--space-5)',
          borderBottom: 'var(--border-1)',
          background: 'var(--ui-1)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
            <div style={{
              width: '32px',
              height: '32px',
              background: 'var(--accent-green-1)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--ink-1)',
              fontWeight: 'var(--fw-bold)'
            }}>
              AI
            </div>
            <div>
              <h3 style={{ fontSize: 'var(--fs-md)', fontWeight: 'var(--fw-semibold)', color: 'var(--ink-1)', margin: 0 }}>AI Assistant</h3>
              <p style={{ fontSize: 'var(--fs-xs)', color: 'var(--ink-2)', margin: 0 }}>Property Management AI</p>
            </div>
          </div>
          <button
            onClick={onToggle}
            style={{
              padding: 'var(--space-2)',
              cursor: 'pointer',
              background: 'none',
              border: 'none',
              color: 'var(--ink-2)',
              fontSize: 'var(--fs-lg)',
              borderRadius: 'var(--radius-sm)',
              transition: 'all var(--dur-1) var(--ease-out)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'var(--ui-2)';
              e.currentTarget.style.color = 'var(--ink-1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'none';
              e.currentTarget.style.color = 'var(--ink-2)';
            }}
          >
            ✕
          </button>
        </div>

        {/* Messages */}
        <div style={{
          flex: 1,
          padding: 'var(--space-5)',
          overflowY: 'auto',
          background: 'var(--bg-1)'
        }}>
          {messages.map((message) => (
            <div key={message.id} style={{ marginBottom: 'var(--space-4)' }}>
              <div style={{
                padding: 'var(--space-3) var(--space-4)',
                borderRadius: 'var(--radius-lg)',
                background: message.type === 'user' ? 'var(--ui-5)' : 'var(--ui-2)',
                color: message.type === 'user' ? '#fff' : 'var(--ink-1)',
                maxWidth: '85%',
                marginLeft: message.type === 'user' ? 'auto' : '0',
                fontSize: 'var(--fs-sm)',
                lineHeight: 'var(--lh-body)'
              }}>
                <div>{message.content}</div>
                <div style={{
                  fontSize: 'var(--fs-xs)',
                  opacity: 0.7,
                  marginTop: 'var(--space-1)',
                  color: message.type === 'user' ? 'rgba(255,255,255,0.8)' : 'var(--ink-2)'
                }}>
                  {formatTime(message.timestamp)}
                </div>
              </div>
            </div>
          ))}

          {isTyping && (
            <div style={{ marginBottom: 'var(--space-4)' }}>
              <div style={{
                padding: 'var(--space-3) var(--space-4)',
                borderRadius: 'var(--radius-lg)',
                background: 'var(--ui-2)',
                maxWidth: '85%',
                fontSize: 'var(--fs-sm)',
                color: 'var(--ink-2)'
              }}>
                AI is typing...
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div style={{
          padding: 'var(--space-5)',
          borderTop: 'var(--border-1)',
          background: 'var(--ui-1)'
        }}>
          <div style={{ display: 'flex', gap: 'var(--space-2)', marginBottom: 'var(--space-3)' }}>
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Ask me anything about your properties..."
              className="input"
              style={{ flex: 1 }}
            />
            <button
              onClick={handleSendMessage}
              disabled={!inputValue.trim()}
              className="btn"
              style={{
                background: inputValue.trim() ? 'var(--ui-5)' : 'var(--ui-3)',
                color: inputValue.trim() ? '#fff' : 'var(--ink-2)',
                cursor: inputValue.trim() ? 'pointer' : 'not-allowed'
              }}
            >
              Send
            </button>
          </div>

          {/* Quick Actions */}
          <div style={{ display: 'flex', gap: 'var(--space-2)', flexWrap: 'wrap' }}>
            <button
              onClick={() => setInputValue('Show me occupancy trends')}
              style={{
                padding: 'var(--space-1) var(--space-3)',
                fontSize: 'var(--fs-xs)',
                background: 'var(--ui-2)',
                border: 'var(--border-1)',
                borderRadius: 'var(--radius-pill)',
                cursor: 'pointer',
                color: 'var(--ink-2)',
                transition: 'all var(--dur-1) var(--ease-out)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'var(--ui-3)';
                e.currentTarget.style.color = 'var(--ink-1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'var(--ui-2)';
                e.currentTarget.style.color = 'var(--ink-2)';
              }}
            >
              Occupancy
            </button>
            <button
              onClick={() => setInputValue('Generate maintenance report')}
              style={{
                padding: 'var(--space-1) var(--space-3)',
                fontSize: 'var(--fs-xs)',
                background: 'var(--ui-2)',
                border: 'var(--border-1)',
                borderRadius: 'var(--radius-pill)',
                cursor: 'pointer',
                color: 'var(--ink-2)',
                transition: 'all var(--dur-1) var(--ease-out)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'var(--ui-3)';
                e.currentTarget.style.color = 'var(--ink-1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'var(--ui-2)';
                e.currentTarget.style.color = 'var(--ink-2)';
              }}
            >
              Maintenance
            </button>
            <button
              onClick={() => setInputValue('Show financial performance')}
              style={{
                padding: 'var(--space-1) var(--space-3)',
                fontSize: 'var(--fs-xs)',
                background: 'var(--ui-2)',
                border: 'var(--border-1)',
                borderRadius: 'var(--radius-pill)',
                cursor: 'pointer',
                color: 'var(--ink-2)',
                transition: 'all var(--dur-1) var(--ease-out)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'var(--ui-3)';
                e.currentTarget.style.color = 'var(--ink-1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'var(--ui-2)';
                e.currentTarget.style.color = 'var(--ink-2)';
              }}
            >
              Financial
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
