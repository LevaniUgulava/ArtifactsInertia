import admin from '@/routes/admin';
import type { ResourceName } from '@/Pages/Admin/Components/ResourceIndexTypes';

export const resourceRoutes = {
    products: {
        create: () => admin.products.create.url(),
        edit: (id: number) => admin.products.edit.url(id),
        destroy: (id: number) => admin.products.destroy.url(id),
    },
    categories: {
        create: () => admin.categories.create.url(),
        edit: (id: number) => admin.categories.edit.url(id),
        destroy: (id: number) => admin.categories.destroy.url(id),
    },
    collections: {
        create: () => admin.collections.create.url(),
        edit: (id: number) => admin.collections.edit.url(id),
        destroy: (id: number) => admin.collections.destroy.url(id),
    },
} satisfies Record<ResourceName, unknown>;
