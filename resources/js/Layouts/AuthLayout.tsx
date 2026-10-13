import { Head } from '@inertiajs/react';
import type { FormEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { BrandLockup } from '@/Components/Brand/Brand';
import { brand, brandTitle } from '@/constants/brand';
import { EDITORIAL_IMAGE } from '@/constants/images';
import type { AuthLayoutProps } from '@/types/layouts';

export default function AuthLayout({
    children,
    description,
    title,
    footerPrompt,
    footerAction,
    footerActionHref = '#',
    onSubmit,
}: AuthLayoutProps) {
    const { t } = useTranslation('common');

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        onSubmit?.(event);
    }

    return (
        <>
            <Head title={brandTitle(title)} />

            <div className="min-h-screen bg-white font-sans text-stone-950 lg:grid lg:grid-cols-[1.08fr_0.92fr]">
                <aside className="relative isolate min-h-88 overflow-hidden bg-stone-900 text-white sm:min-h-120 lg:min-h-0">
                    <img alt={`${brand.name} fashion editorial`} className="absolute inset-0 size-full object-cover opacity-80" src={EDITORIAL_IMAGE} />
                    <div className="absolute inset-0 bg-linear-to-t from-black/75 via-black/15 to-black/10" />
                    <div className="relative flex min-h-88 flex-col justify-end p-6 sm:min-h-120 sm:p-10 lg:min-h-0 lg:h-screen lg:p-10 2xl:p-14">
                        <div className="max-w-lg space-y-4">
                            <BrandLockup className="text-xl sm:text-2xl" tone="light" />
                            <p className="max-w-md text-base leading-7 text-stone-200 sm:text-lg">
                                {t('brandTagline')}
                            </p>
                        </div>
                    </div>
                </aside>

                <section className="flex min-h-screen flex-col justify-center px-5 py-10 sm:px-12 lg:min-h-screen lg:px-12 lg:py-6 xl:px-16 2xl:px-20">
                    <div className="mx-auto w-full max-w-md">
                        <div className="mb-5 space-y-1.5">
                            <h1 className="text-2xl font-bold tracking-tight text-stone-950 sm:text-3xl">{title}</h1>
                            <p className="max-w-sm text-sm leading-6 text-slate-500">{description}</p>
                        </div>

                        <form className="space-y-4" onSubmit={handleSubmit}>
                            {children}
                        </form>

                        {footerPrompt && footerAction && (
                            <div className="mt-6 border-t border-slate-200 pt-5 text-center">
                                <p className="text-sm text-slate-500">{footerPrompt}</p>
                                <a className="mt-2 inline-block text-sm font-semibold text-amber-700 hover:underline" href={footerActionHref}>
                                    {footerAction}
                                </a>
                            </div>
                        )}

                    </div>
                </section>
            </div>
        </>
    );
}
