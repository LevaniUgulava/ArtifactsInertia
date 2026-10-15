import type { ChangeEvent, FormEvent, InputHTMLAttributes, ReactElement, ReactNode, RefObject } from 'react';
import type { ChatBroadcastPayload, ChatMessage, ChatStatusPayload } from '@/Pages/Admin/Chat/ChatTypes';

export type LanguageSwitcherProps = {
    className?: string;
};

export type AuthInputProps = InputHTMLAttributes<HTMLInputElement> & {
    error?: string;
    label: string;
    valid?: boolean;
};

export type BrandLockupProps = {
    className?: string;
    tone?: 'dark' | 'light';
    showTagline?: boolean;
};

export type ChatWrapperProps = {
    children: ReactElement;
};

export type SelectedImage = {
    previewUrl: string;
    fileName: string;
};

export type ChatComposerProps = {
    message: string;
    onMessageChange: (value: string) => void;
    selectedImage: SelectedImage | null;
    onImageChange: (event: ChangeEvent<HTMLInputElement>) => void;
    onRemoveImage: () => void;
    onSubmit: (event: FormEvent<HTMLFormElement>) => void;
    hasChat: boolean;
    processing: boolean;
};

export type ChatHeaderProps = {
    chatStateLabel: string;
    chatStateDot: string;
    chatStateDotLabel: string;
    closable: boolean;
    processing: boolean;
    onCloseRequest: () => void;
};

export type ChatLiveProps = {
    chatId: string;
    onMessage: (payload: ChatBroadcastPayload | ChatStatusPayload) => void;
};

export type ChatMessageBubbleProps = {
    message: ChatMessage;
};

export type ChatMessagesProps = {
    messages: ChatMessage[];
    greetingMessages: ChatMessage[];
    scrollRef: RefObject<HTMLDivElement | null>;
};

export type ConfirmationModalProps = {
    open: boolean;
    title: string;
    description: string;
    confirmLabel: string;
    cancelLabel: string;
    onConfirm: () => void;
    onCancel: () => void;
    processing?: boolean;
    children?: ReactNode;
};
