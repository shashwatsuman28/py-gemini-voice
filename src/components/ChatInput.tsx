import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
  disabled?: boolean;
}

export const ChatInput = ({ onSendMessage, isLoading, disabled }: ChatInputProps) => {
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !isLoading && !disabled) {
      onSendMessage(message.trim());
      setMessage("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border-t border-border/20 bg-chat-surface/50 backdrop-blur-xl">
      <div className="flex items-end gap-3 max-w-4xl mx-auto">
        <div className="flex-1 relative">
          <Textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message..."
            disabled={disabled || isLoading}
            className={cn(
              "min-h-[44px] max-h-32 resize-none rounded-xl border-border/20",
              "bg-chat-input/80 backdrop-blur-sm text-foreground placeholder:text-muted-foreground",
              "focus:ring-2 focus:ring-primary/20 focus:border-primary/40",
              "transition-all duration-200"
            )}
            rows={1}
          />
        </div>
        
        <Button
          type="submit"
          size="sm"
          disabled={!message.trim() || isLoading || disabled}
          className={cn(
            "h-11 w-11 rounded-xl bg-gradient-to-r from-primary to-accent",
            "hover:shadow-lg hover:shadow-primary/25 hover:scale-105",
            "transition-all duration-200 disabled:opacity-50 disabled:scale-100 disabled:shadow-none"
          )}
        >
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Send className="h-4 w-4" />
          )}
        </Button>
      </div>
    </form>
  );
};