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
      <h1 className="text-2xl font-bold mb-4">Gemini Chatbot</h1>
      
      <div className="w-full max-w-md border rounded-lg p-4 h-96 overflow-y-auto bg-gray-50 shadow">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`my-2 p-2 rounded-lg ${
              msg.role === "user"
                ? "bg-blue-500 text-white self-end text-right"
                : "bg-gray-200 text-black self-start text-left"
            }`}
          >
            {msg.text}
          </div>
        ))}
      </div>

      <div className="flex w-full max-w-md mt-4">
        <input
          className="flex-1 border p-2 rounded-l-lg"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
        />
        <button
          className="bg-blue-500 text-white px-4 rounded-r-lg"
          onClick={sendMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;

