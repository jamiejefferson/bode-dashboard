'use client';

import { useState, useRef, useEffect } from 'react';

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
  actions?: Array<{
    label: string;
    action: string;
  }>;
}

interface AIChatInterfaceProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AIChatInterface({ isOpen, onClose }: AIChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'ai',
      content: "Hello! I'm your AI property management assistant. I can help you with data queries, create widgets, generate reports, and automate tasks. What would you like to know?",
      timestamp: new Date(),
      actions: [
        { label: 'Show occupancy trends', action: 'occupancy_trends' },
        { label: 'Create maintenance ticket', action: 'create_ticket' },
        { label: 'Generate Q2 report', action: 'generate_report' }
      ]
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

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = generateAIResponse(inputValue);
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: aiResponse.content,
        timestamp: new Date(),
        actions: aiResponse.actions
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1000);
  };

  const generateAIResponse = (userInput: string): { content: string; actions?: Array<{ label: string; action: string }> } => {
    const input = userInput.toLowerCase();
    
    if (input.includes('occupancy') || input.includes('vacancy')) {
      return {
        content: "I found occupancy data for your portfolio. Current occupancy rate is 94.2%, up 2.1% from last month. Would you like me to create a detailed occupancy trend widget or generate a vacancy analysis report?",
        actions: [
          { label: 'Create occupancy widget', action: 'create_occupancy_widget' },
          { label: 'Show vacancy details', action: 'show_vacancy_details' },
          { label: 'Generate marketing plan', action: 'generate_marketing_plan' }
        ]
      };
    }
    
    if (input.includes('maintenance') || input.includes('repair')) {
      return {
        content: "I can help with maintenance tasks. There are currently 12 open maintenance tickets, with 3 high priority. Average completion time is 2.3 days. Would you like me to create a ticket or show you the maintenance dashboard?",
        actions: [
          { label: 'Create maintenance ticket', action: 'create_maintenance_ticket' },
          { label: 'Show maintenance dashboard', action: 'show_maintenance_dashboard' },
          { label: 'Schedule preventive maintenance', action: 'schedule_preventive' }
        ]
      };
    }
    
    if (input.includes('report') || input.includes('generate')) {
      return {
        content: "I can generate various reports for you. What type of report would you like? I can create investor reports, compliance reports, financial summaries, or custom analytics.",
        actions: [
          { label: 'Investor report', action: 'generate_investor_report' },
          { label: 'Compliance report', action: 'generate_compliance_report' },
          { label: 'Financial summary', action: 'generate_financial_summary' }
        ]
      };
    }
    
    if (input.includes('widget') || input.includes('chart') || input.includes('create')) {
      return {
        content: "I can help you create custom widgets and charts. What data would you like to visualize? I can create charts for occupancy, revenue, maintenance, energy usage, and more.",
        actions: [
          { label: 'Revenue chart', action: 'create_revenue_widget' },
          { label: 'Energy usage heatmap', action: 'create_energy_widget' },
          { label: 'Maintenance timeline', action: 'create_maintenance_widget' }
        ]
      };
    }
    
    return {
      content: "I understand you're asking about property management. I can help with occupancy analysis, maintenance tracking, financial reporting, compliance monitoring, and creating custom dashboards. What specific information would you like to see?",
      actions: [
        { label: 'Show portfolio overview', action: 'show_portfolio_overview' },
        { label: 'Check compliance status', action: 'check_compliance' },
        { label: 'Analyze performance', action: 'analyze_performance' }
      ]
    };
  };

  const handleActionClick = (action: string) => {
    const actionMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: `Action: ${action}`,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, actionMessage]);
    
    // Simulate action execution
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: `I've executed the ${action} action. The results are now available in your dashboard. Would you like me to show you the updated view or create a notification for when it's ready?`,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiMessage]);
    }, 800);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-end justify-end z-50">
      <div className="bg-white rounded-t-lg shadow-2xl w-96 h-[600px] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="h-8 w-8 bg-blue-600 rounded-full flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">AI Assistant</h3>
              <p className="text-xs text-gray-500">Property Management AI</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                message.type === 'user' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-100 text-gray-900'
              }`}>
                <p className="text-sm">{message.content}</p>
                {message.actions && (
                  <div className="mt-3 space-y-2">
                    {message.actions.map((action, index) => (
                      <button
                        key={index}
                        onClick={() => handleActionClick(action.action)}
                        className="block w-full text-left px-3 py-1 text-xs bg-white bg-opacity-20 hover:bg-opacity-30 rounded transition-colors"
                      >
                        {action.label}
                      </button>
                    ))}
                  </div>
                )}
                <p className="text-xs opacity-70 mt-2">
                  {message.timestamp.toLocaleTimeString()}
                </p>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-gray-100 text-gray-900 max-w-xs lg:max-w-md px-4 py-2 rounded-lg">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-4 border-t border-gray-200">
          <div className="flex space-x-2">
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Ask me anything about your properties..."
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            />
            <button
              onClick={handleSendMessage}
              disabled={!inputValue.trim()}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
