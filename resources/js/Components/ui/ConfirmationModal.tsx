import { CircleAlertIcon, XIcon } from 'lucide-react';
import type { ReactNode } from 'react';

type ConfirmationModalProps = {
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

export function ConfirmationModal({ open, title, description, confirmLabel, cancelLabel, onConfirm, onCancel, processing = false }: ConfirmationModalProps) {
    if (!open) {
        return null;
    }

    return (
        <div aria-labelledby="confirmation-modal-title" aria-modal="true" className="fixed inset-0 z-[80] flex items-center justify-center bg-brand-charcoal/35 px-4 backdrop-blur-[3px]" onMouseDown={(event) => event.target === event.currentTarget && onCancel()} role="dialog">
            <div className="relative w-full max-w-xs rounded-[1.35rem] border border-brand-olive/10 bg-brand-stone p-5 text-brand-charcoal shadow-[0_1.75rem_5rem_rgba(11,11,11,0.2)]">
                <button aria-label={cancelLabel} className="absolute right-4 top-4 grid size-7 place-items-center rounded-full text-brand-olive/60 transition hover:bg-brand-charcoal/10 hover:text-brand-charcoal" onClick={onCancel} type="button">
                    <XIcon aria-hidden="true" size={14} strokeWidth={1.8} />
                </button>
                <div className="flex items-start gap-3 pr-6">
                    <div className="grid size-9 shrink-0 place-items-center rounded-xl bg-brand-charcoal/8 text-brand-olive">
                        <CircleAlertIcon aria-hidden="true" size={17} strokeWidth={1.7} />
                    </div>
                    <div className="min-w-0 pt-0.5">
                        <h2 className="text-sm font-semibold tracking-tight" id="confirmation-modal-title">{title}</h2>
                        <p className="mt-1.5 text-xs leading-5 text-brand-olive/80">{description}</p>
                    </div>
                </div>
                <div className="mt-5 flex items-center justify-end gap-2">
                    <button className="rounded-lg px-3 py-2 text-xs font-semibold text-brand-olive transition hover:bg-brand-olive/10" onClick={onCancel} type="button">{cancelLabel}</button>
                    <button className="rounded-lg bg-brand-charcoal px-3 py-2 text-xs font-semibold text-brand-stone transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50" disabled={processing} onClick={onConfirm} type="button">{confirmLabel}</button>
                </div>
            </div>
        </div>
    );
}
