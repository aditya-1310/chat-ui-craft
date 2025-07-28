import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Download, Copy, Check, FileText, Code } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export function CodeEditor({ generatedCode, generatedFiles, sessionId }) {
  const [copiedCode, setCopiedCode] = useState(false);
  const { toast } = useToast();

  // TODO: Integrate with backend to save/load code
  // TODO: Add syntax highlighting with Prism.js or Monaco Editor
  // TODO: Implement code formatting and linting
  // TODO: Add version history and rollback functionality

  const handleCopyCode = async () => {
    if (!generatedCode) return;
    
    try {
      await navigator.clipboard.writeText(generatedCode);
      setCopiedCode(true);
      toast({
        title: "Code copied!",
        description: "The component code has been copied to your clipboard.",
      });
      setTimeout(() => setCopiedCode(false), 2000);
    } catch (error) {
      toast({
        title: "Copy failed",
        description: "Failed to copy code to clipboard.",
        variant: "destructive",
      });
    }
  };

  const handleDownloadCode = () => {
    if (!generatedCode) return;

    // TODO: Create proper project structure with package.json, etc.
    const blob = new Blob([generatedCode], { type: 'text/javascript' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `component-${sessionId || 'generated'}.jsx`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast({
      title: "Download started",
      description: "Your component code is being downloaded.",
    });
  };

  const handleDownloadProject = () => {
    // TODO: Create a complete React project structure with:
    // - package.json with dependencies
    // - src/ folder structure
    // - public/ folder with index.html
    // - Component files
    // - README.md with setup instructions
    
    toast({
      title: "Feature coming soon",
      description: "Full project download will be available soon.",
    });
  };

  const formatCode = (code) => {
    if (!code) return 'No code generated yet...';
    
    // Basic formatting - TODO: Replace with proper code formatter
    return code
      .split('\n')
      .map((line, index) => (
        <div key={index} className="flex">
          <span className="text-muted-foreground text-xs w-8 text-right mr-4 select-none">
            {index + 1}
          </span>
          <span className="flex-1 whitespace-pre">{line}</span>
        </div>
      ));
  };

  return (
    <Card className="flex flex-col h-full bg-editor-bg border-border">
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-foreground">Code</h3>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleCopyCode}
              disabled={!generatedCode}
              className="text-xs"
            >
              {copiedCode ? (
                <Check className="w-4 h-4 mr-1" />
              ) : (
                <Copy className="w-4 h-4 mr-1" />
              )}
              {copiedCode ? 'Copied!' : 'Copy'}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleDownloadCode}
              disabled={!generatedCode}
              className="text-xs"
            >
              <FileText className="w-4 h-4 mr-1" />
              Download
            </Button>
            <Button
              size="sm"
              onClick={handleDownloadProject}
              disabled={!generatedCode}
              className="text-xs bg-primary hover:bg-primary/90"
            >
              <Download className="w-4 h-4 mr-1" />
              Project
            </Button>
          </div>
        </div>
      </div>

      <Tabs defaultValue="component" className="flex-1 flex flex-col">
        <div className="px-4 pt-2">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="component" className="text-xs">
              <Code className="w-3 h-3 mr-1" />
              Component
            </TabsTrigger>
            <TabsTrigger value="files" className="text-xs">
              <FileText className="w-3 h-3 mr-1" />
              Files
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="component" className="flex-1 p-4 pt-2">
          <ScrollArea className="h-full">
            {!generatedCode ? (
              <div className="flex items-center justify-center h-full text-muted-foreground">
                <div className="text-center">
                  <Code className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p className="text-lg mb-2">No code generated</p>
                  <p className="text-sm">Start chatting to generate component code</p>
                </div>
              </div>
            ) : (
              <div className="bg-muted/20 rounded-lg p-4 font-mono text-sm">
                <div className="text-foreground">
                  {formatCode(generatedCode)}
                </div>
              </div>
            )}
          </ScrollArea>
        </TabsContent>

        <TabsContent value="files" className="flex-1 p-4 pt-2">
          <ScrollArea className="h-full">
            {!generatedFiles || generatedFiles.length === 0 ? (
              <div className="flex items-center justify-center h-full text-muted-foreground">
                <div className="text-center">
                  <FileText className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p className="text-lg mb-2">No additional files</p>
                  <p className="text-sm">Additional project files will appear here</p>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {generatedFiles.map((file, index) => (
                  <Card key={index} className="p-4 bg-muted/20">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-sm font-medium text-foreground">{file.name}</h4>
                      <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                        <Copy className="w-3 h-3" />
                      </Button>
                    </div>
                    <div className="text-xs font-mono bg-background/50 rounded p-2 max-h-40 overflow-y-auto">
                      <pre className="whitespace-pre-wrap">{file.content}</pre>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </Card>
  );
}