import { CheckCircle2, AlertCircle } from 'lucide-react';
import type { InputHTMLAttributes } from 'react';

type AuthInputProps = InputHTMLAttributes<HTMLInputElement> & {
    error?: string;
    label: string;
    valid?: boolean;
};

export function AuthInput({ error, id, label, name, valid = false, ...inputProps }: AuthInputProps) {
    const inputId = id ?? name;
    const errorId = error && inputId ? `${inputId}-error` : undefined;
    const showIcon = Boolean(error) || valid;

    const borderClass = error
        ? 'border-red-500'
        : valid
          ? 'border-green-500'
          : 'border-slate-300';

    return (
        <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-500" htmlFor={inputId}>
                {label}
            </label>
            <div className="relative">
                <input
                    {...inputProps}
                    aria-describedby={errorId}
                    aria-invalid={Boolean(error)}
                    className={`min-h-14 w-full rounded-none border bg-white px-3 text-base text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-amber-700 focus:ring-2 focus:ring-amber-700/20 ${
                        showIcon ? 'pr-10' : ''
                    } ${borderClass}`}
                    id={inputId}
                    name={name}
                />
                {error && (
                    <AlertCircle
                        aria-hidden="true"
                        className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-red-500"
                        size={20}
                    />
                )}
                {valid && !error && (
                    <CheckCircle2
                        aria-hidden="true"
                        className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-green-500"
                        size={20}
                    />
                )}
            </div>
            {error && (
                <p className="text-sm text-red-700" id={errorId}>
                    {error}
                </p>
            )}
        </div>
    );
}
