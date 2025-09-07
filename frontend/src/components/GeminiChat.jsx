// GeminiChat.jsx
import { useState, useRef, useEffect } from "react";

export default function GeminiChat() {
  const [prompt, setPrompt] = useState("");
  const [messages, setMessages] = useState([
    {
      id: 1,
      from: "buzzbot",
      text: "Hey there! 👋 I'm BuzzBot, your creative event planning assistant. What kind of event are you thinking about?",
      timestamp: new Date().toISOString(),
      type: "bot"
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [conversationId, setConversationId] = useState(null);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  async function sendPrompt(e) {
    e.preventDefault();
    if (!prompt.trim() || isLoading) return;

    const userMsg = {
      id: Date.now(),
      from: "you",
      text: prompt,
      timestamp: new Date().toISOString(),
      type: "user"
    };
    
    setMessages(m => [...m, userMsg]);
    setPrompt("");
    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/gemini/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          prompt: userMsg.text,
          conversationId: conversationId
        })
      });
      
      const json = await response.json();
      
      if (response.ok) {
        setConversationId(json.conversationId);
        setMessages(m => [...m, {
          id: Date.now() + 1,
          from: "buzzbot",
          text: json.answer,
          timestamp: json.timestamp,
          type: "bot"
        }]);
      } else {
        setMessages(m => [...m, {
          id: Date.now() + 1,
          from: "system",
          text: `Oops! Something went wrong: ${json.error}`,
          timestamp: new Date().toISOString(),
          type: "error"
        }]);
      }
    } catch (err) {
      setMessages(m => [...m, {
        id: Date.now() + 1,
        from: "system",
        text: "I'm having trouble connecting right now. Please try again! 🔄",
        timestamp: new Date().toISOString(),
        type: "error"
      }]);
    } finally {
      setIsLoading(false);
    }
  }

  const clearConversation = async () => {
    if (conversationId) {
      try {
        await fetch(`/api/gemini/conversation/${conversationId}`, {
          method: "DELETE"
        });
      } catch (err) {
        console.error("Error clearing conversation:", err);
      }
    }
    
    setMessages([{
      id: 1,
      from: "buzzbot",
      text: "Hey there! 👋 I'm BuzzBot, your creative event planning assistant. What kind of event are you thinking about?",
      timestamp: new Date().toISOString(),
      type: "bot"
    }]);
    setConversationId(null);
  };

  const quickPrompts = [
    "Plan a birthday party",
    "Corporate event ideas",
    "Wedding planning tips",
    "Event budget advice"
  ];

  const handleQuickPrompt = (quickPrompt) => {
    setPrompt(quickPrompt);
  };

  return (
    <div className="max-w-4xl mx-auto bg-black rounded-2xl shadow-lg overflow-hidden">
      {/* Simple Header */}
      <div className="bg-blue-600 text-white p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
              <span className="text-xl">🤖</span>
            </div>
            <div>
              <h2 className="text-xl font-bold">BuzzBot</h2>
              <p className="text-sm opacity-90">Your Event Assistant</p>
            </div>
          </div>
          <button
            onClick={clearConversation}
            className="px-3 py-1 bg-white bg-opacity-20 rounded-lg text-sm hover:bg-opacity-30 transition-colors"
          >
            New Chat
          </button>
        </div>
      </div>

      {/* Quick Prompts - Only show on first message */}
      {messages.length === 1 && (
        <div className="p-4 bg-blue-500 border-b">
          <p className="text-sm text-gray-200 mb-3">Quick questions:</p>
          <div className="flex flex-wrap gap-2">
            {quickPrompts.map((quickPrompt, index) => (
              <button
                key={index}
                onClick={() => handleQuickPrompt(quickPrompt)}
                className="px-3 py-1 bg-white text-gray-700 rounded-lg text-sm hover:bg-blue-50 hover:text-blue-700 transition-colors border"
              >
                {quickPrompt}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Messages - Larger height */}
      <div className="h-96 overflow-y-auto p-4 space-y-3 bg-gray-50">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
          >
            <div className={`max-w-[70%] ${message.type === "user" ? "text-right" : ""}`}>
              <div
                className={`px-4 py-3 rounded-lg ${
                  message.type === "user"
                    ? "bg-blue-600 text-white"
                    : message.type === "error"
                    ? "bg-red-100 text-red-800 border border-red-200"
                    : "bg-white text-gray-800 border border-gray-200"
                }`}
              >
                <div className="text-sm leading-relaxed">{message.text}</div>
                <div className={`text-xs mt-1 ${
                  message.type === "user" ? "text-blue-100" : "text-gray-500"
                }`}>
                  {new Date(message.timestamp).toLocaleTimeString([], { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                </div>
              </div>
            </div>
          </div>
        ))}
        
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white text-gray-800 border border-gray-200 px-4 py-3 rounded-lg">
              <div className="flex items-center space-x-2">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                </div>
                <span className="text-sm text-gray-500">Thinking...</span>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input - Much larger typing area */}
      <div className="p-4 bg-white border-t">
        <form onSubmit={sendPrompt} className="space-y-3">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Type your message here... (Press Enter to send, Shift+Enter for new line)"
            className="w-full px-4 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none placeholder-gray-500 text-gray-900"
            rows="3"
            disabled={isLoading}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                sendPrompt(e);
              }
            }}
          />
          <div className="flex justify-between items-center">
            <div className="text-xs text-gray-500">
              {prompt.length} characters
            </div>
            <button
              type="submit"
              disabled={!prompt.trim() || isLoading}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-medium"
            >
              {isLoading ? "Sending..." : "Send Message"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
