import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RotateCcw, Smartphone, Tablet, Monitor, RefreshCw } from 'lucide-react';

export function PreviewArea({ generatedCode, isLoading }) {
  const [viewportSize, setViewportSize] = useState('desktop');
  const [refreshKey, setRefreshKey] = useState(0);
  const iframeRef = useRef(null);

  // TODO: Implement secure code execution in sandboxed iframe
  // TODO: Add error boundary and error handling for malformed code
  // TODO: Implement hot reload when code changes
  // TODO: Add console output display for debugging

  const viewportSizes = {
    mobile: { width: '375px', height: '667px', icon: Smartphone },
    tablet: { width: '768px', height: '1024px', icon: Tablet },
    desktop: { width: '100%', height: '100%', icon: Monitor }
  };

  const handleRefresh = () => {
    setRefreshKey(prev => prev + 1);
  };

  const generatePreviewHTML = () => {
    if (!generatedCode) return '';

    // TODO: Replace with secure code execution
    // This is a simplified example - in production, use a secure sandbox
    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Component Preview</title>
        <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
        <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
        <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
        <style>
          body {
            margin: 0;
            padding: 20px;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
            background: white;
          }
          * {
            box-sizing: border-box;
          }
        </style>
      </head>
      <body>
        <div id="root"></div>
        <script type="text/babel">
          ${generatedCode}
          
          // Render the component
          const root = ReactDOM.createRoot(document.getElementById('root'));
          try {
            // Try to find and render the main component
            const ComponentToRender = window.App || window.Component || (() => React.createElement('div', null, 'Component rendered successfully'));
            root.render(React.createElement(ComponentToRender));
          } catch (error) {
            root.render(React.createElement('div', { style: { color: 'red', padding: '20px' } }, 'Error rendering component: ' + error.message));
          }
        </script>
      </body>
      </html>
    `;
  };

  return (
    <Card className="flex flex-col h-full bg-background border-border">
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-foreground">Preview</h3>
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-1 bg-muted rounded-lg p-1">
              {Object.entries(viewportSizes).map(([size, { icon: Icon }]) => (
                <Button
                  key={size}
                  variant={viewportSize === size ? "default" : "ghost"}
                  size="sm"
                  className="h-8 w-8 p-0"
                  onClick={() => setViewportSize(size)}
                >
                  <Icon className="w-4 h-4" />
                </Button>
              ))}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={handleRefresh}
              className="h-8 w-8 p-0"
            >
              <RefreshCw className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className="flex-1 p-4">
        {isLoading ? (
          <div className="flex items-center justify-center h-full bg-preview-bg rounded-lg border-2 border-dashed border-border">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-muted-foreground">Generating component...</p>
            </div>
          </div>
        ) : !generatedCode ? (
          <div className="flex items-center justify-center h-full bg-preview-bg rounded-lg border-2 border-dashed border-border">
            <div className="text-center text-muted-foreground">
              <Monitor className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p className="text-lg mb-2">No component to preview</p>
              <p className="text-sm">Start a conversation to generate a component</p>
            </div>
          </div>
        ) : (
          <div className="h-full bg-preview-bg rounded-lg border border-border overflow-hidden">
            <div 
              className="mx-auto h-full"
              style={{
                width: viewportSizes[viewportSize].width,
                maxWidth: '100%'
              }}
            >
              <iframe
                key={refreshKey}
                ref={iframeRef}
                srcDoc={generatePreviewHTML()}
                className="w-full h-full border-0"
                title="Component Preview"
                sandbox="allow-scripts"
              />
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}