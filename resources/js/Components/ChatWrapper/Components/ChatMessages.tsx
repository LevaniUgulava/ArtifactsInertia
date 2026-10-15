import { ChatMessageBubble } from '@/Components/ChatWrapper/Components/ChatMessageBubble';
import type { ChatMessagesProps } from '@/types/components';

export function ChatMessages({ messages, greetingMessages, scrollRef }: ChatMessagesProps) {
    return (
        <div className="flex max-h-72 min-h-56 flex-col gap-3 overflow-y-auto wrap-break-word px-4 py-4" ref={scrollRef}>
            {[...greetingMessages, ...messages].map((chatMessage) => (
                <ChatMessageBubble key={chatMessage.id} message={chatMessage} />
            ))}
        </div>
    );
}