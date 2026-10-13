import type { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

type AdminStatCardProps = {
    icon: LucideIcon;
    label: string;
    value: number;
    tone: string;
};

export function AdminStatCard({ icon: Icon, label, value, tone }: AdminStatCardProps) {
    return (
        <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <div className="flex items-start justify-between gap-4">
                <p className="text-sm font-medium text-slate-500">{label}</p>
                <span className={cn('grid size-10 place-items-center rounded-full', tone)}>
                    <Icon aria-hidden="true" size={18} strokeWidth={1.8} />
                </span>
            </div>
            <p className="mt-7 text-3xl font-bold tracking-tight text-slate-950">{value.toLocaleString()}</p>
        </article>
    );
}
