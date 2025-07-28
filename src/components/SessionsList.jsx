import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Plus, MessageSquare, Calendar, Trash2 } from 'lucide-react';

export function SessionsList({ sessions, activeSessionId, onSessionSelect, onNewSession, onDeleteSession }) {
  // TODO: Connect to backend API to fetch sessions
  // TODO: Implement real session data with timestamps, names, etc.
  
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <Card className="w-80 h-full bg-sidebar border-border">
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-foreground">Sessions</h2>
          <Button 
            onClick={onNewSession}
            size="sm"
            className="bg-primary hover:bg-primary/90"
          >
            <Plus className="w-4 h-4 mr-1" />
            New
          </Button>
        </div>
      </div>
      
      <ScrollArea className="flex-1 p-4">
        {sessions.length === 0 ? (
          <div className="text-center text-muted-foreground py-8">
            <MessageSquare className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>No sessions yet</p>
            <p className="text-sm">Create your first session to get started</p>
          </div>
        ) : (
          <div className="space-y-2">
            {sessions.map((session) => (
              <Card
                key={session.id}
                className={`p-3 cursor-pointer transition-all hover:bg-accent/50 ${
                  activeSessionId === session.id 
                    ? 'bg-accent border-primary' 
                    : 'bg-card hover:bg-accent/30'
                }`}
                onClick={() => onSessionSelect(session.id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-medium text-foreground truncate">
                      {session.name || `Session ${session.id.slice(0, 8)}`}
                    </h3>
                    <div className="flex items-center mt-1 text-xs text-muted-foreground">
                      <Calendar className="w-3 h-3 mr-1" />
                      {formatDate(session.createdAt)}
                    </div>
                    {session.messageCount > 0 && (
                      <div className="flex items-center mt-1 text-xs text-muted-foreground">
                        <MessageSquare className="w-3 h-3 mr-1" />
                        {session.messageCount} messages
                      </div>
                    )}
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-muted-foreground hover:text-destructive p-1 h-auto"
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeleteSession(session.id);
                    }}
                  >
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </ScrollArea>
    </Card>
  );
}