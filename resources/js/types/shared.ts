export type AppUser = {
    name: string;
    email: string;
    email_verified_at?: string | null;
};

export type SharedPageProps = {
    locale?: string;
    availableLocales?: string[];
    auth: {
        user: AppUser | null;
    };
};

export type LocaleQuery = {
    lang: string;
};