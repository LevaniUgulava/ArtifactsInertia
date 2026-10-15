import { XIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { USER_AVATAR_IMAGE } from '@/constants/images';
import type { ChatHeaderProps } from '@/types/components';

export function ChatHeader({ chatStateLabel, chatStateDot, chatStateDotLabel, closable, processing, onCloseRequest }: ChatHeaderProps) {
    const { t } = useTranslation('common');

    return (
        <div className="flex items-center justify-between bg-brand-charcoal px-4 py-4 text-brand-stone">
            <div className="flex min-w-0 items-center gap-3">
                <div className="flex shrink-0 -space-x-2">
                    <img alt="" className="size-9 rounded-full border-2 border-brand-charcoal object-cover" src={USER_AVATAR_IMAGE} />
                </div>
                <div className="min-w-0">
                    <p className="truncate text-sm font-semibold">{t('supportChatTitle')}</p>
                    <p className="mt-1 truncate text-[11px] text-brand-stone/65">{chatStateLabel}</p>
                </div>
            </div>
            <div className="flex items-center gap-3">
                {closable ? <button aria-label={t('supportChatClose')} className="grid size-7 place-items-center rounded-full text-brand-stone/65 transition hover:bg-brand-stone/10 hover:text-brand-stone disabled:cursor-not-allowed disabled:opacity-50" disabled={processing} onClick={onCloseRequest} title={t('supportChatClose')} type="button"><XIcon aria-hidden="true" size={15} /></button> : null}
                <span aria-label={chatStateDotLabel} className={`size-2 rounded-full ${chatStateDot}`} />
            </div>
        </div>
    );
}