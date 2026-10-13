import { cn } from '@/lib/utils';

type Translate = (key: string) => string;

type StatusBadgeProps = {
    status: string;
    t: Translate;
    active?: boolean;
    className?: string;
};

export function StatusBadge({ status, t, active = false, className = '' }: StatusBadgeProps) {
    const label = status === 'pending' ? t('chatPending') : status === 'open' ? t('chatOpen') : t('chatClosed');

    return (
        <span className={cn('rounded-full px-2 py-1 text-[10px] font-bold uppercase tracking-wide', active ? 'bg-white/15 text-cyan-200' : status === 'open' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700', className)}>
            {label}
        </span>
    );
}