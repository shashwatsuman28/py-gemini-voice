import { ReactNode } from "react";
import { Bot, Sparkles, Shield, Zap } from "lucide-react";

interface AuthLayoutProps {
  children: ReactNode;
}

export const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div className="min-h-screen bg-chat-background flex">
      {/* Left Side - Decorative */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <div 
          className="absolute inset-0 opacity-20"
          style={{ background: 'var(--gradient-primary)' }}
        />
        
        <div className="relative z-10 flex flex-col justify-center p-12 text-foreground">
          <div className="max-w-md">
            {/* Logo */}
            <div className="flex items-center gap-3 mb-8">
              <div 
                className="h-12 w-12 rounded-xl flex items-center justify-center"
                style={{ background: 'var(--gradient-primary)' }}
              >
                <Bot className="h-6 w-6 text-primary-foreground" />
              </div>
              <h1 className="text-2xl font-bold">Gemini Chat</h1>
            </div>

            {/* Hero Content */}
            <h2 className="text-4xl font-bold mb-6 leading-tight">
              Welcome to the Future of 
              <span 
                className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent ml-2"
              >
                AI Conversations
              </span>
            </h2>
            
            <p className="text-lg text-muted-foreground mb-12 leading-relaxed">
              Experience intelligent conversations powered by Google's advanced AI. 
              Join thousands of users exploring the possibilities of AI assistance.
            </p>

            {/* Features */}
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-lg bg-chat-surface flex items-center justify-center">
                  <Sparkles className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">Advanced AI Capabilities</h3>
                  <p className="text-sm text-muted-foreground">Powered by Google's latest AI models</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-lg bg-chat-surface flex items-center justify-center">
                  <Shield className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">Secure & Private</h3>
                  <p className="text-sm text-muted-foreground">Your conversations are encrypted and private</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-lg bg-chat-surface flex items-center justify-center">
                  <Zap className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">Lightning Fast</h3>
                  <p className="text-sm text-muted-foreground">Real-time responses and seamless experience</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Background Pattern */}
        <div className="absolute bottom-0 right-0 w-96 h-96 opacity-10">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <defs>
              <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100" height="100" fill="url(#grid)" />
          </svg>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="bg-card/50 backdrop-blur-xl border border-border/20 rounded-2xl p-8 shadow-2xl">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};