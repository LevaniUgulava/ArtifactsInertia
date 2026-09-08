import { Head } from '@inertiajs/react';
import RootLayout from '@/Layouts/RootLayout';
import { CompleteTheLook } from './Components/CompleteTheLook';
import { ProductBreadcrumb } from './Components/ProductBreadcrumb';
import { ProductDetails } from './Components/ProductDetails';
import { ProductGallery } from './Components/ProductGallery';
import { ProductPurchasePanel } from './Components/ProductPurchasePanel';
import type { ProductData } from './Components/ProductTypes';

function Product({ product }: { product: ProductData }) {
    return (
        <>
            <Head title={product.name} />
            <main className="mx-auto max-w-[1920px] px-5 py-6 sm:px-8 sm:py-10 lg:px-12 2xl:px-16">
                <ProductBreadcrumb category={product.category} name={product.name} />
                <div className="mt-5 grid gap-8 lg:grid-cols-2 lg:gap-12 2xl:gap-20">
                    <ProductGallery images={product.images} />
                    <ProductPurchasePanel product={product} />
                </div>
                <div className="mt-12 space-y-10">
                    <ProductDetails details={product.details} />
                    <CompleteTheLook recommendations={product.recommendations} />
                </div>
            </main>
        </>
    );
}

Product.layout = RootLayout;

export default Product;
