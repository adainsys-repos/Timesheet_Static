import RouteHeader from '@/components/common/route-header';
import ToolTip from '@/components/common/tool-tip';
import DataTable from '@/components/table/DataTable';
import { Button } from '@/components/ui/button';
import { Icons } from '@/icons/icons';
import { ColumnDef, getCoreRowModel, getFilteredRowModel, useReactTable } from '@tanstack/react-table';
import { ProjectTypes } from '@/types/projects/project/project';
import { useNavigate } from 'react-router-dom';

export default function Projects() {
    const navigate = useNavigate();
    // Dummy data for demonstration based on the image
    const dummyData: ProjectTypes[] = [
        { id: '1001', name: 'Project 1', startDate: '16/05/2021', endDate: '16/05/2021' },
        { id: '1002', name: 'Project 2', startDate: '16/05/2021', endDate: '16/05/2021' },
        { id: '1003', name: 'Project 3', startDate: '16/05/2021', endDate: '16/05/2021' },
        { id: '1004', name: 'Project 4', startDate: '16/05/2021', endDate: '16/05/2021' },
    ];

    const columns: ColumnDef<ProjectTypes>[] = [
        {
            accessorKey: 'id',
            header: () => (
                <div className="text-primaryColor font-semibold flex items-center gap-2 min-w-24">
                    <Icons.id className="size-4" /> Project Code
                </div>
            ),
            cell: ({ row }) => <span>{row.original.id}</span>,
        },
        {
            accessorKey: 'name',
            header: () => (
                <div className="text-primaryColor font-semibold flex items-center gap-2 min-w-24">
                    <Icons.users className="size-4" /> Project Name
                </div>
            ),
            cell: ({ row }) => <span>{row.original.name}</span>,
        },
        {
            accessorKey: 'startDate',
            header: () => (
                <div className="text-primaryColor font-semibold flex items-center gap-2 min-w-24">
                    <Icons.calendarPlus className="size-4" /> Start Date
                </div>
            ),
            cell: ({ row }) => <span>{row.original.startDate}</span>,
        },
        {
            accessorKey: 'endDate',
            header: () => (
                <div className="text-primaryColor font-semibold flex items-center gap-2 min-w-24">
                    <Icons.calendarPlus className="size-4" /> End Date
                </div>
            ),
            cell: ({ row }) => <span>{row.original.endDate}</span>,
        },
        {
            id: 'actions',
            header: () => (
                <div className="text-primaryColor font-semibold flex items-center gap-2 min-w-24">
                    <Icons.action className="size-4" /> Action
                </div>
            ),
            cell: ({ row }) => (
                <span className="flex items-center gap-2 text-primaryColor">
                    <ToolTip content="Open">
                        <Icons.squareArrowRight
                            className="size-6"
                            onClick={() => {
                                navigate('/projects/1234');
                            }}
                        />
                    </ToolTip>
                </span>
            ),
        },
    ];

    const table = useReactTable({
        data: dummyData,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
    });
    return (
        <div className="flex flex-col gap-4">
            <RouteHeader text="Projects" />

            <div className="flex flex-col gap-4">
                <div className="flex items-center gap-2 justify-end">
                    <Button>
                        <Icons.plus className="text-white" /> Add Projects
                    </Button>
                    {/* <SearchBar placeholder="Search " paramName="search" debounceTime={500} onSearch={() => {}} className="ml-0" /> */}
                </div>
                <div className="flex flex-col gap-4">
                    <DataTable table={table} columns={columns} isLoading={false} />
                    {/* <DataPagination maxPages={10} total={10} /> */}
                </div>
            </div>
        </div>
    );
}
