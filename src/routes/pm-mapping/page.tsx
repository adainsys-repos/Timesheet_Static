import RouteHeader from '@/components/common/route-header';

export default function PMMapping() {
    return (
        <div className="flex flex-col gap-4">
            <RouteHeader text="PM Mapping" />
            <div className="bg-white rounded-lg shadow p-6">{/* Add PM mapping content here */}</div>
        </div>
    );
}
