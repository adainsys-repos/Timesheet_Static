import RouteHeader from '@/components/common/route-header';

export default function ProjectExtension() {
    return (
        <div className="flex flex-col gap-4">
            <RouteHeader text="Project Extension" />
            <div className="bg-white rounded-lg shadow p-6">{/* Add project extension content here */}</div>
        </div>
    );
}
