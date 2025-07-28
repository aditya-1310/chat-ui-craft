import { useState, useEffect } from 'react';
import { SessionsList } from '@/components/SessionsList';
import { ChatInterface } from '@/components/ChatInterface';
import { PreviewArea } from '@/components/PreviewArea';
import { CodeEditor } from '@/components/CodeEditor';
import { ResizablePanels } from '@/components/ResizablePanels';
import { useToast } from '@/hooks/use-toast';

export default function Builder() {
  const [sessions, setSessions] = useState([]);
  const [activeSessionId, setActiveSessionId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [generatedCode, setGeneratedCode] = useState('');
  const [generatedFiles, setGeneratedFiles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  // TODO: Replace with actual backend API calls
  // TODO: Implement user authentication and session management
  // TODO: Add real-time collaboration features
  // TODO: Implement auto-save functionality

  useEffect(() => {
    // TODO: Load sessions from backend on component mount
    loadSessions();
  }, []);

  useEffect(() => {
    if (activeSessionId) {
      // TODO: Load messages for active session from backend
      loadMessagesForSession(activeSessionId);
    }
  }, [activeSessionId]);

  const loadSessions = async () => {
    // TODO: Replace with actual API call
    // const response = await fetch('/api/sessions');
    // const sessionsData = await response.json();
    
    // Mock data for demo
    const mockSessions = [
      {
        id: 'session-1',
        name: 'Login Form',
        createdAt: new Date().toISOString(),
        messageCount: 5
      },
      {
        id: 'session-2', 
        name: 'Product Card',
        createdAt: new Date(Date.now() - 86400000).toISOString(),
        messageCount: 3
      }
    ];
    
    setSessions(mockSessions);
    if (mockSessions.length > 0 && !activeSessionId) {
      setActiveSessionId(mockSessions[0].id);
    }
  };

  const loadMessagesForSession = async (sessionId) => {
    // TODO: Replace with actual API call
    // const response = await fetch(`/api/sessions/${sessionId}/messages`);
    // const messagesData = await response.json();
    
    // Mock data for demo
    const mockMessages = [
      {
        id: 'msg-1',
        role: 'user',
        content: 'Create a modern login form with email and password fields',
        timestamp: new Date().toISOString()
      },
      {
        id: 'msg-2',
        role: 'assistant', 
        content: 'I\'ll create a modern login form component for you with email and password fields, including proper validation and styling.',
        timestamp: new Date().toISOString()
      }
    ];
    
    setMessages(mockMessages);
    
    // Set mock generated code
    if (sessionId === 'session-1') {
      setGeneratedCode(`import React, { useState } from 'react';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    
    if (!email) newErrors.email = 'Email is required';
    if (!password) newErrors.password = 'Password is required';
    
    if (Object.keys(newErrors).length === 0) {
      console.log('Login attempt:', { email, password });
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
        Welcome Back
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your email"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your password"
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200 font-medium"
        >
          Sign In
        </button>
      </form>

      <p className="text-center text-sm text-gray-600 mt-4">
        Don't have an account?{' '}
        <a href="#" className="text-blue-600 hover:underline">
          Sign up
        </a>
      </p>
    </div>
  );
};

// Export for preview
window.App = LoginForm;
export default LoginForm;`);
    }
  };

  const handleNewSession = async () => {
    // TODO: Create new session via API
    const newSession = {
      id: `session-${Date.now()}`,
      name: `New Session`,
      createdAt: new Date().toISOString(),
      messageCount: 0
    };
    
    setSessions(prev => [newSession, ...prev]);
    setActiveSessionId(newSession.id);
    setMessages([]);
    setGeneratedCode('');
    setGeneratedFiles([]);
    
    toast({
      title: "New session created",
      description: "You can now start building a new component.",
    });
  };

  const handleSessionSelect = (sessionId) => {
    setActiveSessionId(sessionId);
  };

  const handleDeleteSession = async (sessionId) => {
    // TODO: Delete session via API
    setSessions(prev => prev.filter(s => s.id !== sessionId));
    
    if (activeSessionId === sessionId) {
      const remainingSessions = sessions.filter(s => s.id !== sessionId);
      setActiveSessionId(remainingSessions.length > 0 ? remainingSessions[0].id : null);
    }
    
    toast({
      title: "Session deleted",
      description: "The session has been removed.",
    });
  };

  const handleSendMessage = async (content) => {
    if (!activeSessionId) return;
    
    const userMessage = {
      id: `msg-${Date.now()}`,
      role: 'user',
      content,
      timestamp: new Date().toISOString()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    
    try {
      // TODO: Replace with actual AI API call
      // const response = await fetch('/api/chat', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({
      //     sessionId: activeSessionId,
      //     message: content,
      //     messages: messages
      //   })
      // });
      // const data = await response.json();
      
      // Mock AI response
      setTimeout(() => {
        const aiMessage = {
          id: `msg-${Date.now()}-ai`,
          role: 'assistant',
          content: `I'll help you create that component. Let me generate the code for you.`,
          timestamp: new Date().toISOString()
        };
        
        setMessages(prev => [...prev, aiMessage]);
        
        // Mock generated code based on user input
        const mockCode = generateMockCode(content);
        setGeneratedCode(mockCode);
        
        // Update session message count
        setSessions(prev => prev.map(session => 
          session.id === activeSessionId 
            ? { ...session, messageCount: session.messageCount + 2 }
            : session
        ));
        
        setIsLoading(false);
      }, 2000);
      
    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
      setIsLoading(false);
    }
  };

  const generateMockCode = (userPrompt) => {
    // TODO: Replace with actual AI generation
    const lowerPrompt = userPrompt.toLowerCase();
    
    if (lowerPrompt.includes('button')) {
      return `import React from 'react';

const CustomButton = ({ children, onClick, variant = 'primary' }) => {
  const baseStyles = 'px-4 py-2 rounded-lg font-medium transition duration-200';
  const variants = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700',
    secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300',
    danger: 'bg-red-600 text-white hover:bg-red-700'
  };

  return (
    <button 
      className={\`\${baseStyles} \${variants[variant]}\`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

window.App = () => (
  <div className="p-8 space-y-4">
    <CustomButton variant="primary">Primary Button</CustomButton>
    <CustomButton variant="secondary">Secondary Button</CustomButton>
    <CustomButton variant="danger">Danger Button</CustomButton>
  </div>
);

export default CustomButton;`;
    }
    
    // Default component
    return `import React from 'react';

const GeneratedComponent = () => {
  return (
    <div className="p-8 bg-gray-50 rounded-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        Generated Component
      </h2>
      <p className="text-gray-600">
        This component was generated based on your request: "{userPrompt}"
      </p>
    </div>
  );
};

window.App = GeneratedComponent;
export default GeneratedComponent;`;
  };

  return (
    <div className="h-screen flex bg-background">
      {/* Sessions Sidebar */}
      <SessionsList
        sessions={sessions}
        activeSessionId={activeSessionId}
        onSessionSelect={handleSessionSelect}
        onNewSession={handleNewSession}
        onDeleteSession={handleDeleteSession}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Top Section - Preview */}
        <div className="h-1/2 p-4">
          <PreviewArea 
            generatedCode={generatedCode}
            isLoading={isLoading}
          />
        </div>

        {/* Bottom Section - Chat and Code Layout */}
        <div className="h-1/2 flex flex-col">
          {/* Chat Section - Full Width */}
          <div className="h-2/3 bg-muted/30 border-t">
            <ChatInterface
              sessionId={activeSessionId}
              messages={messages}
              onSendMessage={handleSendMessage}
              isLoading={isLoading}
            />
          </div>
          
          {/* Code Section - Scrollable */}
          <div className="h-1/3 border-t bg-card">
            <CodeEditor
              generatedCode={generatedCode}
              generatedFiles={generatedFiles}
              sessionId={activeSessionId}
            />
          </div>
        </div>
      </div>
    </div>
  );
}