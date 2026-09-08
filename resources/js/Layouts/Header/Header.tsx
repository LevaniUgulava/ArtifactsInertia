import {MenuIcon, SearchIcon, ShoppingBagIcon} from "lucide-react";

const navigationItems = ['New arrivals', 'Women', 'Men', 'Essentials'];

export function Header() {
    return (
        <header className="border-b border-stone-200 bg-white">
            <div className="mx-auto flex max-w-[1920px] items-center justify-between gap-5 px-4 py-4 sm:px-8 lg:px-12 2xl:px-16">
                <a className="flex items-center gap-2 text-sm font-semibold tracking-tight text-stone-950" href="#top">
                    <span className="grid size-5 place-items-center rounded-full bg-amber-700 text-[10px] text-white">A</span>
                    Atelier Street
                </a>

                <nav aria-label="Primary navigation" className="hidden items-center gap-7 text-xs font-medium text-stone-600 md:flex">
                    {navigationItems.map((item) => (
                        <a className="transition hover:text-stone-950" href={`#${item.toLowerCase().replace(' ', '-')}`} key={item}>
                            {item}
                        </a>
                    ))}
                </nav>

                <div className="flex items-center gap-3 text-stone-700">
                    <button aria-label="Search" className="grid size-8 place-items-center rounded-full transition hover:bg-stone-100" type="button">
                        <span aria-hidden="true">
                            <SearchIcon/>
                        </span>
                    </button>
                    <button aria-label="Open bag" className="grid size-8 place-items-center rounded-full transition hover:bg-stone-100" type="button">
                        <span aria-hidden="true">
                            <ShoppingBagIcon/>
                        </span>
                    </button>
                    <button aria-label="Open menu" className="grid size-8 place-items-center rounded-full transition hover:bg-stone-100 md:hidden" type="button">
                        <span aria-hidden="true"><MenuIcon/></span>
                    </button>
                </div>
            </div>
        </header>
    );
}
