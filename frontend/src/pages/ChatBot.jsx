// ChatBot.jsx
import GeminiChat from "../components/GeminiChat";

export default function ChatBot() {
  return (
    <div className="min-h-screen bg-black py-8">
      <div className="container mx-auto px-4">
        {/* Simple Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            Chat with BuzzBot
          </h1>
          <p className="text-white">
            Your AI assistant for event planning and management
          </p>
        </div>

        {/* Chat Component */}
        <div className="max-w-4xl mx-auto">
          <GeminiChat />
        </div>

        {/* Simple Info */}
        <div className="max-w-2xl mx-auto mt-12 text-center">
          <div className="bg-black rounded-lg p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-white mb-3">
              How to use BuzzBot
            </h3>
            <div className="space-y-2 text-sm text-gray-600">
              <p>• Ask about event planning, themes, or logistics</p>
              <p>• Get creative ideas for your next event</p>
              <p>• Type longer messages in the text area below</p>
              <p>• Press Enter to send, Shift+Enter for new lines</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
