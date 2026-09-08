# 02 — Frontend Forms (Live Validation + Visual Feedback)

## Commit Status

Not requested.

## Outcome

Login and Register pages use Inertia's `useForm` with Precognition enabled, calling `validate(field)` on blur so the UI shows field-level errors and success states in real time. `AuthInput` is upgraded with consistent visual feedback: green border + check icon on valid, red border + alert icon + red text on error.

## Dependencies

Slice 01 (routes accepting Precognition requests).

## Files / Behavior

### `resources/js/Components/Auth/AuthInput.tsx`

Upgrade to support three visual states:

- **Add `valid?: boolean` prop** (in addition to existing `error?: string`).
- **Icon selection logic** (lucide-react — already installed):
  - `error` set → render `AlertCircle` (red, `text-red-500`) inside the input, right-aligned.
  - `valid` set (and no error) → render `CheckCircle2` (green, `text-green-500`) inside the input, right-aligned.
  - Neither → no icon.
- **Border color logic:**
  - Default (no validation yet): `border-slate-300`
  - `error` set: `border-red-500`
  - `valid` set: `border-green-500`
  - Focus override: `focus:border-amber-700 focus:ring-2 focus:ring-amber-700/20` (always wins)
- **Input padding:** add `pr-10` when an icon is present so text doesn't overlap.
- **Error text** (existing): `{error && <p className="text-sm text-red-700">{error}</p>}` — unchanged.
- **Accessibility:** icon is decorative (aria-hidden), `aria-invalid` already set from `error`.

Intended structure:
```tsx
<div className="space-y-2">
  <label ...>...</label>
  <div className="relative">
    <input
      {...inputProps}
      className={`min-h-14 w-full rounded-none border bg-white px-3 pr-10 text-base
        text-slate-900 outline-none transition
        placeholder:text-slate-400 focus:border-amber-700 focus:ring-2 focus:ring-amber-700/20
        ${error ? 'border-red-500' : valid ? 'border-green-500' : 'border-slate-300'}`}
      ...
    />
    {error && <AlertCircle className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-red-500" size={20} />}
    {valid && !error && <CheckCircle2 className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-green-500" size={20} />}
  </div>
  {error && <p className="text-sm text-red-700">{error}</p>}
</div>
```

### `resources/js/Layouts/AuthLayout.tsx`

- Add optional `onSubmit?: (event: FormEvent<HTMLFormElement>) => void` to `AuthLayoutProps`.
- Default behavior (no `onSubmit`): `event.preventDefault()` — same as today for Verification/UpdatePassword.
- `<form onSubmit={(e) => { e.preventDefault(); onSubmit?.(e); }}>`

### `resources/js/Pages/Auth/Register.tsx`

```tsx
import { useForm } from '@inertiajs/react'
import type { FormEvent } from 'react'

const form = useForm({
    username: '',
    email: '',
    password: '',
    password_confirmation: '',
}).withPrecognition('post', '/register')
```

Each `<AuthInput>`:
- `value={form.data.username}` (controlled)
- `onChange={e => form.setData('username', e.target.value)}`
- `onBlur={() => form.validate('username')}`
- `error={form.errors.username}`
- `valid={form.valid('username')}` (only true after first blur + validation response, no error)

Submit button: `disabled={form.processing}`; text shows "Creating Account…" while processing.

### `resources/js/Pages/Auth/Login.tsx`

Same pattern with fields `email`, `password`, `.withPrecognition('post', '/login')`.

Submit button: `disabled={form.processing}`; text shows "Signing In…" while processing.

## Verification

- `npm run build` — Vite compiles with no TS errors.
- `npx tsc --noEmit` (or rely on build) — confirm type safety.
- User manual: `npm run dev`, visit `/register` and `/login`:
  - Blur an empty required field → red border + red icon + red error text.
  - Fill with valid data and blur → green border + green icon, error clears.
  - Submit with invalid data → error shows, button stays enabled.
  - Submit with valid data → button disables ("Creating Account…"), redirects on success.