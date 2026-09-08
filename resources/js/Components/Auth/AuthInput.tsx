import type { InputHTMLAttributes } from 'react';

type AuthInputProps = InputHTMLAttributes<HTMLInputElement> & {
    error?: string;
    label: string;
};

export function AuthInput({ error, id, label, name, ...inputProps }: AuthInputProps) {
    const inputId = id ?? name;
    const errorId = error && inputId ? `${inputId}-error` : undefined;

    return (
        <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-500" htmlFor={inputId}>
                {label}
            </label>
            <input
                {...inputProps}
                aria-describedby={errorId}
                aria-invalid={Boolean(error)}
                className="min-h-14 w-full rounded-none border border-slate-300 bg-white px-3 text-base text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-amber-700 focus:ring-2 focus:ring-amber-700/20"
                id={inputId}
                name={name}
            />
            {error && (
                <p className="text-sm text-red-700" id={errorId}>
                    {error}
                </p>
            )}
        </div>
    );
}
