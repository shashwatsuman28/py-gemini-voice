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

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      // For now, simulate AI response
      // TODO: Replace with actual Gemini API call via Supabase Edge Function
      await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));
      
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: generateMockResponse(content),
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

// Mock response generator - replace with actual Gemini API integration
const generateMockResponse = (userMessage: string): string => {
  const responses = [
    `I understand you're asking about "${userMessage}". That's an interesting question! As an AI assistant powered by Google Gemini, I'm here to help you with various tasks and questions.`,
    `Thanks for your message about "${userMessage}". Let me provide you with a thoughtful response. I'm designed to be helpful, harmless, and honest in all my interactions.`,
    `Great question regarding "${userMessage}"! I can help you explore this topic further. What specific aspects would you like me to focus on?`,
    `I see you mentioned "${userMessage}". This is definitely something I can assist with. Let me break this down for you in a clear and helpful way.`,
  ];
  
  return responses[Math.floor(Math.random() * responses.length)];
};