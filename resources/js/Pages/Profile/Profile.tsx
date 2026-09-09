import ProfileLayout from '@/Layouts/ProfileLayout';
import { AccountSettings } from '@/Pages/Profile/Components/AccountSettings';
import { OrderHistory, type Order } from '@/Pages/Profile/Components/OrderHistory';
import { ProfileOverview, type ProfileSummary } from '@/Pages/Profile/Components/ProfileOverview';
import { SavedItems, type SavedItem } from '@/Pages/Profile/Components/SavedItems';

type ProfilePageProps = {
    profile: {
        name: string;
        email: string;
        memberSince: string | null;
        avatarUrl: string;
        stats: ProfileSummary['stats'];
        orders: Order[];
        savedItems: SavedItem[];
    };
};

function Profile({ profile }: ProfilePageProps) {
    return (
        <div className="mx-auto w-full max-w-360 px-5 py-8 sm:px-8 sm:py-10 lg:px-10 lg:py-12">
            <ProfileOverview
                avatarUrl={profile.avatarUrl}
                email={profile.email}
                memberSince={profile.memberSince}
                name={profile.name}
                stats={profile.stats}
            />

            <div className="mt-9 space-y-12 sm:mt-12 sm:space-y-14">
                <OrderHistory orders={profile.orders} />
                <SavedItems items={profile.savedItems} />
                <AccountSettings />
            </div>
        </div>
    );
}

Profile.layout = ProfileLayout;

export default Profile;
