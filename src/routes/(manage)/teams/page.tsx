import RouteHeader from '@/components/common/route-header';

export default function Teams() {
    return (
        <div className="flex flex-col gap-4">
            <RouteHeader text="Teams" />

            <div className="bg-white rounded-lg shadow p-6">{/* Add calendar content here */}</div>
        </div>
    );
}
