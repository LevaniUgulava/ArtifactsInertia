import { useTranslation } from 'react-i18next';
import { ConfirmationModal } from '@/Components/ui/ConfirmationModal';
import { Popover, PopoverContent, PopoverTrigger } from '@/Components/ui/popover';
import { ChatComposer } from '@/Components/ChatWrapper/Components/ChatComposer';
import { ChatHeader } from '@/Components/ChatWrapper/Components/ChatHeader';
import { ChatLive } from '@/Components/ChatWrapper/Components/ChatLive';
import { ChatMessages } from '@/Components/ChatWrapper/Components/ChatMessages';
import { GuestPrompt } from '@/Components/ChatWrapper/Components/GuestPrompt';
import { useChat } from '@/Components/ChatWrapper/hooks/useChat';
import type { ChatWrapperProps } from '@/types/components';

function ChatWrapper({ children }: ChatWrapperProps) {
    const { t } = useTranslation('common');
    const chat = useChat();

    return (
        <>
            <Popover onOpenChange={chat.setOpen} open={chat.open}>
            <PopoverTrigger render={children} />
            <PopoverContent
                align="end"
                className="w-[min(calc(100vw-2rem),24rem)] overflow-hidden rounded-2xl border-0 bg-brand-stone p-0 text-brand-charcoal shadow-[0_1.5rem_4rem_rgba(11,11,11,0.2)] ring-0"
                positionMethod="fixed"
                side="top"
                sideOffset={12}
            >
                <ChatHeader
                    chatStateDot={chat.chatStateDot}
                    chatStateDotLabel={chat.chatStateDotLabel}
                    chatStateLabel={chat.chatStateLabel}
                    closable={chat.closable}
                    onCloseRequest={chat.requestClose}
                    processing={chat.http.processing}
                />

                {chat.status === 'guest' ? (
                    <GuestPrompt />
                ) : chat.status === 'loading' ? (
                    <div className="px-6 py-10 text-center text-sm text-brand-olive/70">{t('supportChatLoading')}</div>
                ) : chat.status === 'error' ? (
                    <div className="px-6 py-10 text-center text-sm text-red-600">{t('supportChatError')}</div>
                ) : (
                    <>
                        {chat.chatId ? <ChatLive chatId={chat.chatId} onMessage={chat.handleBroadcast} /> : null}

                        <ChatMessages greetingMessages={chat.greetingMessages} messages={chat.messages} scrollRef={chat.messagesContainerRef} />

                        {chat.sendFailed ? <p className="px-4 pb-1 text-center text-[11px] text-red-600">{t('supportChatSendError')}</p> : null}

                        {chat.chatStatus === 'close' ? <p className="border-t border-brand-taupe/20 bg-white px-4 py-3 text-center text-[11px] text-brand-olive">{t('supportChatClosed')}</p> : null}

                        {chat.chatStatus !== 'close' ? (
                            <ChatComposer
                                hasChat={Boolean(chat.chatId)}
                                message={chat.message}
                                onImageChange={chat.handleImageChange}
                                onMessageChange={chat.setMessage}
                                onRemoveImage={chat.removeSelectedImage}
                                onSubmit={chat.handleSubmit}
                                processing={chat.http.processing}
                                selectedImage={chat.selectedImage}
                            />
                        ) : null}
                    </>
                )}
            </PopoverContent>
            </Popover>
            <ConfirmationModal
            cancelLabel={t('cancel')}
            confirmLabel={t('supportChatClose')}
            description={t('supportChatCloseConfirm')}
            onCancel={chat.dismissClose}
            onConfirm={chat.closeConversation}
            open={chat.closeModalOpen}
            processing={chat.http.processing}
            title={t('supportChatCloseTitle')}
            />
        </>
    );
}

export default ChatWrapper;