import { UserRoundIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export type ProfileSummary = {
    stats: { label: string; value: number }[];
};

type ProfileOverviewProps = {
    avatarUrl: string;
    email: string;
    memberSince: string | null;
    name: string;
    stats: ProfileSummary['stats'];
};

const statKeys: Record<string, string> = {
    Orders: 'orders',
    Saved: 'saved',
    Reviews: 'reviews',
};

export function ProfileOverview({ avatarUrl, email, memberSince, name, stats }: ProfileOverviewProps) {
    const { t } = useTranslation('profile');

    return (
        <section className="flex flex-col gap-7 border-b border-stone-100 pb-8 sm:flex-row sm:items-center sm:justify-between sm:gap-10">
            <div className="flex items-center gap-4 sm:gap-5">
                <div className="grid size-16 shrink-0 place-items-center overflow-hidden rounded-full bg-stone-200 sm:size-20">
                    {avatarUrl ? <img alt="" className="size-full object-cover" src={avatarUrl} /> : <UserRoundIcon aria-hidden="true" className="text-stone-500" size={28} />}
                </div>
                <div className="space-y-1">
                    <h1 className="text-xl font-bold tracking-tight text-stone-950 sm:text-2xl">{name}</h1>
                    <p className="text-xs text-stone-500">{email}</p>
                    <p className="text-[11px] text-stone-400">{t('memberSince', { year: memberSince ?? t('recently') })}</p>
                </div>
            </div>

            <dl className="grid grid-cols-3 gap-6 sm:gap-8">
                {stats.map((stat) => (
                    <div className="text-center sm:min-w-14" key={stat.label}>
                        <dd className="text-lg font-semibold text-[#b38145] sm:text-xl">{stat.value}</dd>
                        <dt className="mt-1 text-[10px] text-stone-500">{t(statKeys[stat.label] ?? stat.label, { defaultValue: stat.label })}</dt>
                    </div>
                ))}
            </dl>
        </section>
    );
}
