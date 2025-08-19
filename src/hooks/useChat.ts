import { useState, useCallback } from "react";
import { useToast } from "@/hooks/use-toast";

export interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

export const useChat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const sendMessage = useCallback(async (content: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      isUser: true,
      timestamp: new Date(),
    };

    // Show user message immediately
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      // Call backend API (Express server) instead of Gemini directly
      const res = await fetch("http://localhost:5000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: content }),
      });

      if (!res.ok) {
        throw new Error("Failed to get response from backend");
      }

      const data = await res.json();

      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: data.reply,
        isUser: false,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, aiResponse]);
    } catch (error) {
      console.error("Error sending message:", error);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  const clearMessages = useCallback(() => {
    setMessages([]);
  }, []);

  return {
    messages,
    isLoading,
    sendMessage,
    clearMessages,
  };
};
