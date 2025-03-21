import RouteHeader from '@/components/common/route-header';

export default function Timesheet() {
    return (
        <div className="flex flex-col gap-4">
            <RouteHeader text="Timesheet" />
            <div className="bg-white rounded-lg shadow p-6">{/* Add timesheet content here */}</div>
        </div>
    );
}
