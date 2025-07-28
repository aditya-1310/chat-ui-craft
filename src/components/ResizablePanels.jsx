import { useState } from 'react';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable';

export function ResizablePanels({ children, defaultSizes = [50, 50], direction = "horizontal" }) {
  const [sizes, setSizes] = useState(defaultSizes);

  // TODO: Persist panel sizes in localStorage or user preferences
  // TODO: Add keyboard shortcuts for resizing
  // TODO: Implement panel collapse/expand functionality

  const handleLayout = (newSizes) => {
    setSizes(newSizes);
    // TODO: Save to localStorage
    // localStorage.setItem('panelSizes', JSON.stringify(newSizes));
  };

  return (
    <ResizablePanelGroup
      direction={direction}
      onLayout={handleLayout}
      className="h-full"
    >
      {children.map((child, index) => (
        <div key={index}>
          <ResizablePanel defaultSize={defaultSizes[index]} minSize={20}>
            {child}
          </ResizablePanel>
          {index < children.length - 1 && (
            <ResizableHandle className="bg-border hover:bg-primary/20 transition-colors" />
          )}
        </div>
      ))}
    </ResizablePanelGroup>
  );
}