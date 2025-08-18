import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Bot, User } from "lucide-react";

interface ChatMessageProps {
  message: string;
  isUser: boolean;
  timestamp: Date;
}

export const ChatMessage = ({ message, isUser, timestamp }: ChatMessageProps) => {
  return (
    <div
      className={cn(
        "flex items-start gap-3 mb-6 animate-slide-up",
        isUser ? "flex-row-reverse" : "flex-row"
      )}
    >
      <Avatar className={cn(
        "h-8 w-8 border-2",
        isUser ? "border-chat-bubble-user" : "border-chat-bubble-ai"
      )}>
        <AvatarFallback className={cn(
          "text-xs font-medium",
          isUser 
            ? "bg-chat-bubble-user text-primary-foreground" 
            : "bg-chat-bubble-ai text-foreground"
        )}>
          {isUser ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
        </AvatarFallback>
      </Avatar>
      
      <div className={cn(
        "max-w-[80%] rounded-2xl px-4 py-3 backdrop-blur-sm",
        isUser 
          ? "bg-chat-bubble-user text-primary-foreground ml-auto" 
          : "bg-chat-bubble-ai/80 text-foreground border border-border/20"
      )}>
        <p className="text-sm leading-relaxed whitespace-pre-wrap">{message}</p>
        <span className={cn(
          "text-xs mt-2 block",
          isUser ? "text-primary-foreground/70" : "text-muted-foreground"
        )}>
          {timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </span>
      </div>
    </div>
  );
};