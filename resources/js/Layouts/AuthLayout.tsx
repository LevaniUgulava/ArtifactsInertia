import { Head } from '@inertiajs/react';
import type { FormEvent, ReactNode } from 'react';
import { home } from '@/routes';

const editorialImage = 'https://images.unsplash.com/photo-1506629905607-d405b7a30db5?auto=format&fit=crop&w=1600&q=85';

type AuthLayoutProps = {
    children: ReactNode;
    description: string;
    showSocial?: boolean;
    title: string;
    footerPrompt?: string;
    footerAction?: string;
    footerActionHref?: string;
};

export default function AuthLayout({
    children,
    description,
    showSocial = false,
    title,
    footerPrompt,
    footerAction,
    footerActionHref = '#',
}: AuthLayoutProps) {
    function preventSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
    }

    return (
        <>
            <Head title={`${title} | Atelier Street`} />

            <div className="min-h-screen bg-white font-sans text-stone-950 lg:grid lg:grid-cols-[1.08fr_0.92fr]">
                <aside className="relative isolate min-h-88 overflow-hidden bg-stone-900 text-white sm:min-h-120 lg:min-h-screen">
                    <img alt="Atelier Street fashion editorial" className="absolute inset-0 size-full object-cover opacity-80" src={editorialImage} />
                    <div className="absolute inset-0 bg-linear-to-t from-black/75 via-black/15 to-black/10" />
                    <div className="relative flex min-h-88 flex-col justify-end p-6 sm:min-h-120 sm:p-10 lg:min-h-screen lg:p-14 2xl:p-20">
                        <div className="max-w-lg space-y-4">
                            <div className="flex items-center gap-3 text-xl font-semibold tracking-tight sm:text-2xl">
                                <span className="grid size-9 place-items-center rounded-full bg-white text-sm text-stone-900">A</span>
                                Atelier Street
                            </div>
                            <p className="max-w-md text-base leading-7 text-stone-200 sm:text-lg">
                                Where elevated streetwear meets considered design.
                            </p>
                        </div>
                    </div>
                </aside>

                <section className="flex min-h-screen flex-col justify-center px-5 py-12 sm:px-12 lg:px-16 xl:px-24 2xl:px-32">
                    <div className="mx-auto w-full max-w-xl">
                        <div className="mb-10 space-y-3">
                            <h1 className="text-3xl font-bold tracking-tight text-stone-950 sm:text-4xl">{title}</h1>
                            <p className="max-w-md text-base leading-6 text-slate-500">{description}</p>
                        </div>

                        <form className="space-y-5" onSubmit={preventSubmit}>
                            {children}
                        </form>

                        {showSocial && (
                            <>
                                <div className="my-9 flex items-center gap-4 text-xs text-slate-400">
                                    <span className="h-px flex-1 bg-slate-200" />
                                    Or continue with
                                    <span className="h-px flex-1 bg-slate-200" />
                                </div>
                                <div className="grid gap-4 sm:grid-cols-2">
                                    <button className="flex min-h-14 items-center justify-center gap-3 rounded-md border border-slate-200 text-base font-medium transition hover:bg-slate-50" type="button">
                                        <span className="text-xl font-bold">G</span> Google
                                    </button>
                                    <button className="flex min-h-14 items-center justify-center gap-3 rounded-md border border-slate-200 text-base font-medium transition hover:bg-slate-50" type="button">
                                        <span className="text-xl">●</span> Apple
                                    </button>
                                </div>
                            </>
                        )}

                        {footerPrompt && footerAction && (
                            <div className="mt-10 border-t border-slate-200 pt-9 text-center">
                                <p className="text-sm text-slate-500">{footerPrompt}</p>
                                <a className="mt-2 inline-block text-sm font-semibold text-amber-700 hover:underline" href={footerActionHref}>
                                    {footerAction}
                                </a>
                            </div>
                        )}

                        <p className="mx-auto mt-12 max-w-md text-center text-xs leading-5 text-slate-400">
                            Join Atelier Street for exclusive access to limited drops, curated collections, and a seamless shopping experience.
                        </p>

                        <nav aria-label="Auth footer navigation" className="mt-10 flex justify-center gap-5 text-xs text-slate-400">
                            <a className="hover:text-slate-700" href={home.url()}>Homepage</a>
                            <a className="hover:text-slate-700" href="#profile">Profile</a>
                            <a className="hover:text-slate-700" href="#checkout">Checkout</a>
                        </nav>
                    </div>
                </section>
            </div>
        </>
    );
}
