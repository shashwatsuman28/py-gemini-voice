import { useState } from "react";

const Chat = () => {
  const [messages, setMessages] = useState<{ role: string; text: string }[]>([]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input.trim()) return;

    // Add user message
    setMessages((prev) => [...prev, { role: "user", text: input }]);

    // Call backend
    const res = await fetch("http://localhost:5000/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: input }),
    });

    const data = await res.json();

    // Add Gemini response
    setMessages((prev) => [...prev, { role: "model", text: data.reply }]);

    setInput("");
  };

  return (
    <div className="flex flex-col items-center p-6">
  <h1 className="text-3xl font-extrabold mb-4 text-primary animate-gradient bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent transition-all duration-700">InternMate</h1>
      
  <div className="w-full max-w-md border rounded-2xl p-6 h-96 overflow-y-auto bg-chat-surface shadow-lg backdrop-blur-xl transition-all duration-500">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`my-2 p-3 rounded-2xl shadow transition-all duration-500 ${
              msg.role === "user"
                ? "bg-chat-bubble-user text-primary-foreground self-end text-right animate-slide-up"
                : "bg-chat-bubble-ai text-foreground self-start text-left animate-slide-up"
            }`}
          >
            {msg.text}
          </div>
        ))}
      </div>

      <div className="flex w-full max-w-md mt-4">
        <input
          className="flex-1 border border-border bg-pale_dogwood text-foreground placeholder:text-muted-foreground p-3 rounded-l-2xl focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
        />
        <button
          className="bg-primary text-primary-foreground px-6 rounded-r-2xl font-semibold shadow hover:bg-accent transition-all duration-300"
          onClick={sendMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;

