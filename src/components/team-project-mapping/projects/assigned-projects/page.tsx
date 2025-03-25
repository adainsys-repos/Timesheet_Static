import DataTable from '@/components/table/DataTable';
import { ColumnDef, useReactTable } from '@tanstack/react-table';
import { getCoreRowModel } from '@tanstack/react-table';
import { Project } from '@/types/projects/projects';
import { Button } from '@/components/ui/button';
import { Icons } from '@/icons/icons';
import Pagination from '@/components/common/pagination';

export default function AssignedProjects() {
    const assignedProjects: Project[] = [
        {
            projectCode: 'EMP001',
            projectName: 'John Doe',
            startDate: '2021-01-01',
            endDate: '2021-01-01',
            operatingUnit: 'Unit 03 Boilaram - SAI Life Sciences Ltd.',
        },
        {
            projectCode: 'EMP002',
            projectName: 'Jane Smith',
            startDate: '2021-01-01',
            endDate: '2021-01-01',
            operatingUnit: 'Unit 03 Boilaram - SAI Life Sciences Ltd.',
        },
        {
            projectCode: 'EMP003',
            projectName: 'Robert Johnson',
            startDate: '2021-01-01',
            endDate: '2021-01-01',
            operatingUnit: 'Unit 03 Boilaram - SAI Life Sciences Ltd.',
        },
    ];

    const columns: ColumnDef<Project>[] = [
        {
            accessorKey: 'projectCode',
            header: () => (
                <div className="text-primaryColor font-semibold flex items-center gap-2 min-w-24">
                    <Icons.code className="size-4" />
                    <span>Project Code</span>
                </div>
            ),
            cell: ({ row }) => <span>{row.original.projectCode}</span>,
        },
        {
            accessorKey: 'projectName',
            header: () => (
                <div className="text-primaryColor font-semibold flex items-center gap-2 min-w-24">
                    <Icons.fileText className="size-4" />
                    <span>Project Name</span>
                </div>
            ),
            cell: ({ row }) => <span>{row.original.projectName}</span>,
        },
        {
            accessorKey: 'startDate',
            header: () => (
                <div className="text-primaryColor font-semibold flex items-center gap-2 min-w-24">
                    <Icons.calendar className="size-4" />
                    <span>Start Date</span>
                </div>
            ),
            cell: ({ row }) => <span>{row.original.startDate}</span>,
        },
        {
            accessorKey: 'endDate',
            header: () => (
                <div className="text-primaryColor font-semibold flex items-center gap-2 min-w-24">
                    <Icons.calendarX className="size-4" />
                    <span>End Date</span>
                </div>
            ),
            cell: ({ row }) => <span>{row.original.endDate}</span>,
        },
        {
            accessorKey: 'operatingUnit',
            header: () => (
                <div className="text-primaryColor font-semibold flex items-center gap-2 min-w-24">
                    <Icons.building className="size-4" />
                    <span>Operating Unit</span>
                </div>
            ),
            cell: ({ row }) => <span>{row.original.operatingUnit}</span>,
        },
        {
            accessorKey: 'action',
            header: () => (
                <div className="text-primaryColor font-semibold flex items-center gap-2 min-w-24">
                    <Icons.settings className="size-4" />
                    <span>Action</span>
                </div>
            ),
            cell: ({ row }) => (
                <div className="flex items-center gap-2">
                    <Button variant="icon">
                        <Icons.trash className="size-4 text-red-500" />
                    </Button>
                </div>
            ),
        },
    ];

    const table = useReactTable({
        data: assignedProjects,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    return (
        <div>
            <DataTable table={table} columns={columns} isLoading={false} />
            <Pagination maxPages={10} total={100} />
        </div>
    );
}
