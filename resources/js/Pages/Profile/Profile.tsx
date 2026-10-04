import {usePage} from '@inertiajs/react';
import ProfileLayout from '@/Layouts/ProfileLayout';
import {OrdersView} from '@/Pages/Profile/Components/OrdersView';
import type {ProfilePageProps} from '@/Pages/Profile/types/ProfileTypes';
import {ProfileForm} from "@/Pages/Profile/Components/ProfileForm";

function Profile({profile}: ProfilePageProps) {
    const {url} = usePage();
    const isOrdersView = new URLSearchParams(url.split('?')[1] ?? '').get('section') === 'orders';

    return (
        <div className="mx-auto w-full max-w-360 px-5 py-8 sm:px-8 sm:py-10 lg:px-10 lg:py-12">
            {isOrdersView ? <OrdersView orders={profile.orders}/> : <ProfileForm
                avatarUrl={profile.avatarUrl}
                email={profile.email}
                memberSince={profile.memberSince}
                name={profile.name}
                stats={profile.stats}
            />}
        </div>
    );
}

Profile.layout = ProfileLayout;

export default Profile;
