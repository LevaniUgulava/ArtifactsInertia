import type { ResourceName } from '@/Pages/Admin/Components/ResourceIndexTypes';
import { resourceRoutes } from '@/constants/resourceIndex';

export function useResourceIndex(resource: ResourceName) {
    const routes = resourceRoutes[resource] as {
        create: () => string;
        edit: (id: number) => string;
        destroy: (id: number) => string;
    };

    function confirmDelete(name: string): boolean {
        return window.confirm(`Delete ${name}?`);
    }

    return { routes, confirmDelete };
}