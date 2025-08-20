import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChatHeader } from "@/components/ChatHeader";
import { ChatMessage } from "@/components/ChatMessage";
import { ChatInput } from "@/components/ChatInput";
import { TypingIndicator } from "@/components/TypingIndicator";
import { useChat } from "@/hooks/useChat";
import { ScrollArea } from "@/components/ui/scroll-area";

const Index = () => {
  const { messages, isLoading, sendMessage } = useChat();
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  }, [messages, isLoading]);

  return (
    <div className="h-screen flex flex-col bg-chat-background">
      <ChatHeader />
      {/* Sign In button at top right */}
      <div className="absolute top-4 right-8 z-50">
        <Button onClick={() => navigate("/auth")}>Sign In / Sign Up</Button>
      </div>
      <div className="flex-1 relative overflow-hidden">
        <ScrollArea ref={scrollAreaRef} className="h-full">
          <div className="max-w-4xl mx-auto px-4 py-6">
            {messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center py-16">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center mb-6">
                  <span className="text-2xl">🤖</span>
                </div>
                <h2 className="text-2xl font-semibold text-foreground mb-2">
                  Welcome to InternMate
                </h2>
                <p className="text-muted-foreground max-w-md">
                  Start a conversation with your AI intern assistant. Ask questions, get help, or just chat!
                </p>
              </div>
            ) : (
              <>
                {messages.map((message) => (
                  <ChatMessage
                    key={message.id}
                    message={message.content}
                    isUser={message.isUser}
                    timestamp={message.timestamp}
                  />
                ))}
                {isLoading && <TypingIndicator />}
              </>
            )}
          </div>
        </ScrollArea>
      </div>
      <ChatInput onSendMessage={sendMessage} isLoading={isLoading} />
    </div>
  );
};


export default Index;
