import { Outlet } from 'react-router-dom';
import { AppSidebar } from '../common/sidebar';

const RootLayoutWrapper = () => {
    return (
        <div className="flex h-screen">
            <AppSidebar>
                <main className="flex-1 overflow-auto">
                    <Outlet />
                </main>
            </AppSidebar>
        </div>
    );
};

export default RootLayoutWrapper;
