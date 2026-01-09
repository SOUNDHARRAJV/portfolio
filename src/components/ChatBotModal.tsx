import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';

const ChatBotModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: 'bot', text: 'Hello! Ask me anything about Soundhar Raj.' }
  ]);
  const [input, setInput] = useState('');

  const sendMessage = () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { from: 'user', text: input }];

    newMessages.push({
      from: 'bot',
      text: `Thanks for asking! Right now I don't understand "${input}" but I'm learning.`,
    });

    setMessages(newMessages);
    setInput('');
  };

  return (
    <>
      {/* Button to open modal */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg"
      >
        <MessageCircle />
      </button>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-md bg-white rounded-xl shadow-lg overflow-hidden flex flex-col">
            {/* Header */}
            <div className="flex justify-between items-center px-4 py-3 bg-blue-600 text-white">
              <h2 className="text-lg font-semibold">Soundhar's ChatBot</h2>
              <button onClick={() => setIsOpen(false)}>
                <X />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 p-4 overflow-y-auto space-y-2 bg-white max-h-80">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`text-sm px-3 py-2 rounded-lg max-w-[85%] ${
                    msg.from === 'bot'
                      ? 'bg-gray-200 text-left'
                      : 'bg-blue-500 text-white ml-auto text-right'
                  }`}
                >
                  {msg.text}
                </div>
              ))}
            </div>

            {/* Input */}
            <div className="flex border-t p-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                className="flex-1 px-2 py-1 border rounded-l focus:outline-none"
                placeholder="Type a message..."
              />
              <button
                onClick={sendMessage}
                className="bg-blue-500 text-white px-4 rounded-r"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBotModal;
