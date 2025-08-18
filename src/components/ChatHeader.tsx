import { Bot, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";

export const ChatHeader = () => {
  return (
    <header className="p-4 border-b border-border/20 bg-chat-surface/50 backdrop-blur-xl">
      <div className="flex items-center justify-between max-w-4xl mx-auto">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
            <Bot className="h-5 w-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-lg font-semibold text-foreground">Gemini Chat</h1>
            <p className="text-sm text-muted-foreground">Powered by Google AI</p>
          </div>
        </div>
        
        <Button variant="ghost" size="sm" className="h-9 w-9 rounded-lg">
          <Settings className="h-4 w-4" />
        </Button>
      </div>
    </header>
  );
};