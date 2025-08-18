import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Bot } from "lucide-react";

export const TypingIndicator = () => {
  return (
    <div className="flex items-start gap-3 mb-6 animate-slide-up">
      <Avatar className="h-8 w-8 border-2 border-chat-bubble-ai">
        <AvatarFallback className="bg-chat-bubble-ai text-foreground">
          <Bot className="h-4 w-4" />
        </AvatarFallback>
      </Avatar>
      
      <div className="bg-chat-bubble-ai/80 text-foreground border border-border/20 rounded-2xl px-4 py-3 backdrop-blur-sm">
        <div className="flex items-center gap-1">
          <div className="flex gap-1">
            <div className="w-2 h-2 bg-foreground/60 rounded-full animate-pulse"></div>
            <div className="w-2 h-2 bg-foreground/60 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
            <div className="w-2 h-2 bg-foreground/60 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
          </div>
          <span className="text-xs text-muted-foreground ml-2">AI is thinking...</span>
        </div>
      </div>
    </div>
  );
};