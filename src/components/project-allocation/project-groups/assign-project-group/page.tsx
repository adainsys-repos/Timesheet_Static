import DataTable from '@/components/table/DataTable';
import { ColumnDef, useReactTable } from '@tanstack/react-table';
import { getCoreRowModel } from '@tanstack/react-table';
import { ProjectGroup } from '@/types/projects/projects';
import { Button } from '@/components/ui/button';
import { Icons } from '@/icons/icons';
import Pagination from '@/components/common/pagination';

export default function AssignProjectGroup({ type }: { type: 'teams' | 'employees' }) {
    const assignedProjects: ProjectGroup[] = [
        {
            projectId: '1',
            projectName: 'Project 1',
        },
        {
            projectId: '2',
            projectName: 'Project 2',
        },
        {
            projectId: '3',
            projectName: 'Project 3',
        },
    ];

    const columns: ColumnDef<ProjectGroup>[] = [
        {
            accessorKey: 'projectId',
            header: () => (
                <div className="text-primaryColor font-semibold flex items-center gap-2 min-w-24">
                    <Icons.code className="size-4" />
                    <span>Project Code</span>
                </div>
            ),
            cell: ({ row }) => <span>{row.original.projectId}</span>,
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
                        <Icons.plus className="size-4 text-primaryColor" />
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
