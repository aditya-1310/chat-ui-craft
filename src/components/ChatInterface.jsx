import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card } from '@/components/ui/card';
import { Send, Bot, User, Loader2 } from 'lucide-react';

export function ChatInterface({ sessionId, messages, onSendMessage, isLoading }) {
  const [inputValue, setInputValue] = useState('');
  const scrollAreaRef = useRef(null);
  const inputRef = useRef(null);

  // TODO: Connect to backend WebSocket for real-time chat
  // TODO: Implement message persistence in database
  // TODO: Add file upload capability for images/designs
  // TODO: Implement message editing and deletion

  useEffect(() => {
    // Scroll to bottom when new messages arrive
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;
    
    const message = inputValue.trim();
    setInputValue('');
    
    // TODO: Replace with actual API call
    await onSendMessage(message);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-6 border-b bg-card/50">
        <h3 className="text-xl font-semibold text-foreground mb-2">AI Assistant</h3>
        <p className="text-sm text-muted-foreground">
          Describe the React component you want to create
        </p>
      </div>

      {/* Messages - Full Width */}
      <ScrollArea ref={scrollAreaRef} className="flex-1 px-6 py-4">
        {messages.length === 0 ? (
          <div className="text-center text-muted-foreground py-12">
            <Bot className="w-16 h-16 mx-auto mb-6 opacity-50" />
            <p className="text-xl mb-3">Welcome to ComponentAI</p>
            <p className="text-sm mb-6 max-w-md mx-auto">
              Start by describing the React component you'd like to create.
            </p>
            <div className="bg-muted/30 rounded-xl p-6 max-w-lg mx-auto">
              <p className="font-medium mb-4 text-foreground">Try saying:</p>
              <ul className="text-left space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                  "Create a login form with email and password"
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                  "Build a product card with image and details"
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                  "Make a responsive navigation bar"
                </li>
              </ul>
            </div>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto space-y-6">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-4 ${
                  message.role === 'user' ? 'flex-row-reverse' : ''
                }`}
              >
                <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                  message.role === 'user' 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-muted text-muted-foreground'
                }`}>
                  {message.role === 'user' ? (
                    <User className="w-5 h-5" />
                  ) : (
                    <Bot className="w-5 h-5" />
                  )}
                </div>
                <div className="flex-1 max-w-[85%]">
                  <div className={`p-4 rounded-2xl ${
                    message.role === 'user'
                      ? 'bg-primary text-primary-foreground rounded-br-md'
                      : 'bg-muted/50 text-foreground rounded-bl-md'
                  }`}>
                    <p className="text-sm whitespace-pre-wrap leading-relaxed">{message.content}</p>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2 px-1">
                    {new Date(message.timestamp).toLocaleTimeString()}
                  </p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-muted text-muted-foreground flex items-center justify-center">
                  <Bot className="w-5 h-5" />
                </div>
                <div className="flex-1 max-w-[85%]">
                  <div className="p-4 rounded-2xl bg-muted/50 rounded-bl-md">
                    <div className="flex items-center space-x-3">
                      <Loader2 className="w-4 h-4 animate-spin text-primary" />
                      <span className="text-sm text-muted-foreground">Generating component...</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </ScrollArea>

      {/* Input - Full Width */}
      <div className="p-6 border-t bg-background/50 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto">
          <div className="flex space-x-3">
            <Input
              ref={inputRef}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Describe your component..."
              className="flex-1 h-12 px-4 bg-background border-input rounded-xl text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              disabled={isLoading}
            />
            <Button 
              onClick={handleSendMessage}
              disabled={!inputValue.trim() || isLoading}
              className="h-12 px-6 bg-primary hover:bg-primary/90 rounded-xl transition-all"
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Send className="w-4 h-4" />
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}