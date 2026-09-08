import { Link, usePage } from '@inertiajs/react';
import { LogOutIcon, MenuIcon, SearchIcon, ShoppingBagIcon } from 'lucide-react';
import { home, login, logout, profile } from '@/routes';

const navigationItems = ['New arrivals', 'Women', 'Men', 'Essentials'];

type SharedPageProps = {
    auth: {
        user: {
            name: string;
            email: string;
        } | null;
    };
};

export function Header() {
    const { auth } = usePage<SharedPageProps>().props;
    const user = auth.user;

    return (
        <header className="border-b border-stone-200 bg-white">
            <div className="mx-auto flex max-w-[1920px] items-center justify-between gap-5 px-4 py-4 sm:px-8 lg:px-12 2xl:px-16">
                <Link className="flex items-center gap-2 text-sm font-semibold tracking-tight text-stone-950" href={home.url()}>
                    <span className="grid size-5 place-items-center rounded-full bg-amber-700 text-[10px] text-white">A</span>
                    Atelier Street
                </Link>

                <nav aria-label="Primary navigation" className="hidden items-center gap-7 text-xs font-medium text-stone-600 md:flex">
                    {navigationItems.map((item) => (
                        <a className="transition hover:text-stone-950" href={`#${item.toLowerCase().replace(' ', '-')}`} key={item}>
                            {item}
                        </a>
                    ))}
                </nav>

                <div className="flex items-center gap-3 text-stone-700">
                    <button aria-label="Search" className="grid size-8 place-items-center rounded-full transition hover:bg-stone-100" type="button">
                        <SearchIcon aria-hidden="true" size={17} strokeWidth={1.8} />
                    </button>
                    <button aria-label="Open bag" className="grid size-8 place-items-center rounded-full transition hover:bg-stone-100" type="button">
                        <ShoppingBagIcon aria-hidden="true" size={17} strokeWidth={1.8} />
                    </button>
                    {user ? (
                        <>
                            <Link className="hidden items-center gap-2 border-l border-stone-200 pl-4 text-xs font-semibold text-stone-700 transition hover:text-stone-950 sm:flex" href={profile.url()}>
                                <span className="grid size-8 place-items-center overflow-hidden rounded-full bg-stone-200">
                                    <img alt="" className="size-full object-cover" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=96&q=85" />
                                </span>
                                <span className="max-w-32 truncate">{user.name}</span>
                            </Link>
                            <Link
                                aria-label="Sign out"
                                className="grid size-8 place-items-center rounded-full text-stone-500 transition hover:bg-stone-100 hover:text-stone-950"
                                href={logout.url()}
                                method="post"
                                as="button"
                            >
                                <LogOutIcon aria-hidden="true" size={17} strokeWidth={1.8} />
                            </Link>
                        </>
                    ) : (
                        <Link className="hidden text-xs font-semibold text-stone-700 transition hover:text-stone-950 sm:block" href={login.url()}>
                            Sign in
                        </Link>
                    )}
                    <button aria-label="Open menu" className="grid size-8 place-items-center rounded-full transition hover:bg-stone-100 md:hidden" type="button">
                        <MenuIcon aria-hidden="true" size={18} strokeWidth={1.8} />
                    </button>
                </div>
            </div>
        </header>
    );
}
