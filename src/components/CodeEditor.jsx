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
    <div className="h-full flex flex-col bg-card">
      {/* Compact Header */}
      <div className="px-4 py-3 border-b bg-muted/30">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-foreground">Generated Code</h3>
          <div className="flex items-center space-x-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleCopyCode}
              disabled={!generatedCode}
              className="text-xs h-7 px-2"
            >
              {copiedCode ? (
                <Check className="w-3 h-3 mr-1" />
              ) : (
                <Copy className="w-3 h-3 mr-1" />
              )}
              {copiedCode ? 'Copied!' : 'Copy'}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleDownloadCode}
              disabled={!generatedCode}
              className="text-xs h-7 px-2"
            >
              <FileText className="w-3 h-3 mr-1" />
              Download
            </Button>
            <Button
              size="sm"
              onClick={handleDownloadProject}
              disabled={!generatedCode}
              className="text-xs h-7 px-2 bg-primary hover:bg-primary/90"
            >
              <Download className="w-3 h-3 mr-1" />
              Project
            </Button>
          </div>
        </div>
      </div>

      <Tabs defaultValue="component" className="flex-1 flex flex-col">
        <div className="px-3 pt-2">
          <TabsList className="grid w-full grid-cols-2 h-8">
            <TabsTrigger value="component" className="text-xs h-6">
              <Code className="w-3 h-3 mr-1" />
              Component
            </TabsTrigger>
            <TabsTrigger value="files" className="text-xs h-6">
              <FileText className="w-3 h-3 mr-1" />
              Files
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="component" className="flex-1 mt-2">
          {!generatedCode ? (
            <div className="h-full flex items-center justify-center text-muted-foreground">
              <div className="text-center">
                <Code className="w-8 h-8 mx-auto mb-3 opacity-50" />
                <p className="text-sm mb-1">No code generated</p>
                <p className="text-xs">Start chatting to generate code</p>
              </div>
            </div>
          ) : (
            <ScrollArea className="h-full">
              <div className="bg-muted/20 font-mono text-xs leading-relaxed p-3">
                <div className="text-foreground">
                  {formatCode(generatedCode)}
                </div>
              </div>
            </ScrollArea>
          )}
        </TabsContent>

        <TabsContent value="files" className="flex-1 mt-2">
          <ScrollArea className="h-full">
            {!generatedFiles || generatedFiles.length === 0 ? (
              <div className="h-full flex items-center justify-center text-muted-foreground">
                <div className="text-center">
                  <FileText className="w-8 h-8 mx-auto mb-3 opacity-50" />
                  <p className="text-sm mb-1">No additional files</p>
                  <p className="text-xs">Additional files will appear here</p>
                </div>
              </div>
            ) : (
              <div className="p-3 space-y-3">
                {generatedFiles.map((file, index) => (
                  <Card key={index} className="p-3 bg-muted/20">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-xs font-medium text-foreground">{file.name}</h4>
                      <Button variant="ghost" size="sm" className="h-5 w-5 p-0">
                        <Copy className="w-3 h-3" />
                      </Button>
                    </div>
                    <ScrollArea className="max-h-32">
                      <div className="text-xs font-mono bg-background/50 rounded p-2">
                        <pre className="whitespace-pre-wrap">{file.content}</pre>
                      </div>
                    </ScrollArea>
                  </Card>
                ))}
              </div>
            )}
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </div>
  );
}