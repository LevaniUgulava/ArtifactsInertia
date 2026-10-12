import { Link } from '@inertiajs/react';
import { FileImage } from 'lucide-react';
import type { ReactNode } from 'react';
import AdminLayout from '@/Layouts/Admin/AdminLayout';

type MediaRecord = {
    id: number;
    name: string;
    fileName: string;
    mimeType: string;
    url: string;
    modelType: string;
};

type MediaProps = {
    media: {
        data: MediaRecord[];
        links: { url: string | null; label: string; active: boolean }[];
    };
};

export default function Media({ media }: MediaProps) {
    return (
        <div className="space-y-6">
            <div><p className="text-sm text-slate-500">Artifacts / Admin</p><h2 className="mt-1 text-2xl font-bold tracking-tight">Media</h2><p className="mt-2 text-sm leading-6 text-slate-500">Review the images currently attached to catalog records.</p></div>
            {media.data.length > 0 ? (
                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                    {media.data.map((item) => (
                        <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm" key={item.id}>
                            <div className="aspect-square bg-slate-100">
                                <img alt={item.name} className="size-full object-cover" src={item.url} />
                            </div>
                            <div className="space-y-1 p-4"><p className="truncate text-sm font-semibold">{item.name}</p><p className="truncate text-xs text-slate-500">{item.fileName}</p><p className="text-xs text-slate-400">{item.modelType}</p></div>
                        </article>
                    ))}
                </div>
            ) : (
                <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-20 text-center"><FileImage className="mx-auto text-slate-300" size={32} /><p className="mt-3 text-sm text-slate-500">No media has been uploaded yet.</p></div>
            )}
            {media.links.length > 3 ? <nav aria-label="Media pagination" className="flex flex-wrap gap-2">{media.links.map((link) => link.url ? <Link className={`rounded-lg px-3 py-2 text-xs font-semibold ${link.active ? 'bg-slate-950 text-white' : 'bg-white text-slate-600 hover:bg-slate-100'}`} href={link.url} key={link.label}>{link.label.replace('&laquo; Previous', 'Previous').replace('Next &raquo;', 'Next')}</Link> : <span className="rounded-lg bg-slate-100 px-3 py-2 text-xs text-slate-400" key={link.label}>{link.label}</span>)}</nav> : null}
        </div>
    );
}

Media.layout = (page: ReactNode) => <AdminLayout>{page}</AdminLayout>;
