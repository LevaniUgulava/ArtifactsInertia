import ProfileLayout from '@/Layouts/ProfileLayout';
import { OrdersView } from '@/Pages/Profile/Components/OrdersView';
import { ProfileForm } from '@/Pages/Profile/Components/ProfileForm';
import { useProfileView } from '@/Pages/Profile/hooks/useProfileView';
import type { ProfilePageProps } from '@/Pages/Profile/ProfileTypes';

function Profile({ profile }: ProfilePageProps) {
    const { isOrdersView } = useProfileView();

    return (
        <div className="mx-auto w-full max-w-360 px-5 py-8 sm:px-8 sm:py-10 lg:px-10 lg:py-12">
            {isOrdersView ? <OrdersView orders={profile.orders} /> : <ProfileForm
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