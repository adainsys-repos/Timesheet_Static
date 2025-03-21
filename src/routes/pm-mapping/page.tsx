import { Icons } from '@/icons/icons';
import RouteHeader from '@/components/common/route-header';

export default function PMMapping() {
    return (
        <div className="flex flex-col gap-4">
            <RouteHeader text="PM Mapping" />
            <div className="flex items-center gap-2">
                <Icons.userPlus className="text-primary" />
                <h1 className="text-2xl font-semibold text-primary">PM Mapping</h1>
            </div>
            <div className="bg-white rounded-lg shadow p-6">{/* Add PM mapping content here */}</div>
        </div>
    );
}
