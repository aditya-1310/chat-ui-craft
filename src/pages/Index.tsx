import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Code, Zap, Download, MessageSquare } from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: MessageSquare,
      title: "AI-Powered Chat",
      description: "Describe your component in natural language and watch it come to life"
    },
    {
      icon: Code,
      title: "Live Code Generation",
      description: "Get clean, production-ready React code instantly"
    },
    {
      icon: Zap,
      title: "Real-time Preview",
      description: "See your component render in real-time as you chat"
    },
    {
      icon: Download,
      title: "Easy Export",
      description: "Download your component or entire project with one click"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Code className="w-5 h-5 text-primary-foreground" />
              </div>
              <h1 className="text-xl font-bold text-foreground">ComponentAI</h1>
            </div>
            <Button 
              onClick={() => navigate('/builder')}
              className="bg-primary hover:bg-primary/90"
            >
              Start Building
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl font-bold text-foreground mb-6">
            Build React Components with
            <span className="text-primary"> AI Chat</span>
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Describe your component in plain English and watch as our AI generates 
            clean, production-ready React code with live preview.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg"
              onClick={() => navigate('/builder')}
              className="bg-primary hover:bg-primary/90 text-lg px-8 py-4"
            >
              <MessageSquare className="w-5 h-5 mr-2" />
              Start Chatting
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="text-lg px-8 py-4"
            >
              <Code className="w-5 h-5 mr-2" />
              View Examples
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-3xl font-bold text-foreground mb-4">
              Everything you need to build components
            </h3>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our AI-powered platform provides all the tools you need to create, 
              preview, and export React components effortlessly.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="p-6 text-center hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h4 className="text-lg font-semibold text-foreground mb-2">
                  {feature.title}
                </h4>
                <p className="text-muted-foreground">
                  {feature.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <Card className="p-12 bg-primary/5 border-primary/20">
            <h3 className="text-3xl font-bold text-foreground mb-4">
              Ready to build your next component?
            </h3>
            <p className="text-lg text-muted-foreground mb-8">
              Join thousands of developers who are already building faster with AI.
            </p>
            <Button 
              size="lg"
              onClick={() => navigate('/builder')}
              className="bg-primary hover:bg-primary/90 text-lg px-8 py-4"
            >
              Get Started Now
            </Button>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="w-6 h-6 bg-primary rounded flex items-center justify-center">
                <Code className="w-4 h-4 text-primary-foreground" />
              </div>
              <span className="font-semibold text-foreground">ComponentAI</span>
            </div>
            <p className="text-muted-foreground">
              Build React components with the power of AI.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
