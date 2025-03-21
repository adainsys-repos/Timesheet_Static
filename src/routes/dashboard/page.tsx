import RouteHeader from '@/components/common/route-header';

export default function Dashboard() {
    return (
        <div className="flex flex-col gap-4">
            <RouteHeader text="Dashboard" />
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">{/* Add dashboard content here */}</div>
        </div>
    );
}
