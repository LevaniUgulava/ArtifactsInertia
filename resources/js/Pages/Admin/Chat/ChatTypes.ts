export type ChatListItem = {
    id: string;
    status: string;
    messagesCount: number;
    updatedAt: string | null;
    user: { name: string; email: string };
    lastMessage: string | null;
};

export type ChatMessage = {
    id: number;
    message: string;
    createdAt: string | null;
    isAdmin: boolean;
    sender: string | null;
    imageUrls?: string[];
};

export type ChatBroadcastPayload = ChatMessage & {
    supportChatId: string;
    status?: string | null;
    user?: { name: string | null; email: string | null };
};

export type ChatStatusPayload = {
    chatId: string;
    status?: string | null;
    operator?: { name: string | null; email: string | null } | null;
    user?: { name: string | null; email: string | null } | null;
    lastMessage?: string | null;
    updatedAt?: string | null;
};

export type SelectedChat = {
    id: string;
    status: string;
    user: { name: string; email: string };
    messages: ChatMessage[];
};

export type ChatProps = {
    chats: ChatListItem[];
    selectedChat: SelectedChat | null;
};

export type Translate = (key: string) => string;

export type StatusBadgeProps = {
    status: string;
    t: Translate;
    active?: boolean;
    className?: string;
};

export type ChatHeaderProps = {
    chat: SelectedChat;
    onClosed: () => void;
};

export type ChatListProps = {
    chats: ChatListItem[];
    selectedChatId?: string;
    onSelect: (chatId: string) => void;
};

export type ChatThreadProps = {
    chat: SelectedChat | null;
    onSent: (message: ChatMessage) => void;
    onClosed: () => void;
};

export type MessageComposerProps = {
    chatId: string;
    onSent: (message: ChatMessage) => void;
};

export type MessagesListProps = {
    messages: ChatMessage[];
};
