type Message = {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  timestamp: Date;
};

interface Props {
  message: Message;
}

export default function ChatBubble({ message }: Props) {
  const isBot = message.sender === 'bot';

  return (
    <div className={`flex ${isBot ? 'justify-start' : 'justify-end'} animate-fade-in`}>
      <div
        className={`max-w-[80%] rounded-2xl px-4 py-3 ${
          isBot
            ? 'bg-gray-200 text-gray-900'
            : 'bg-teal-600 text-white'
        } ${
          isBot ? 'rounded-tl-none' : 'rounded-tr-none'
        }`}
      >
        <p className="text-sm leading-relaxed">{message.text}</p>
      </div>
    </div>
  );
}

