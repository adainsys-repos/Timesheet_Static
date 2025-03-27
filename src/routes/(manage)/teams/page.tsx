import DataPagination from '@/components/common/pagination';
import RouteHeader from '@/components/common/route-header';
import SearchBar from '@/components/common/search';
import DataTable from '@/components/table/DataTable';
import ToolTip from '@/components/common/tool-tip';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Icons } from '@/icons/icons';
import { TeamsTypes } from '@/types/teams/teams';
import { ColumnDef, getCoreRowModel, getFilteredRowModel, useReactTable } from '@tanstack/react-table';
import { Link } from 'react-router-dom';

export default function Teams() {
    // const navigate = useNavigate();
    const dummyData: TeamsTypes[] = [
        { id: '1', name: 'John Doe', sbu: 'SBU1', customerId: 'C001', createdAt: '2022-01-01' },
        { id: '2', name: 'Jane Doe', sbu: 'SBU2', customerId: 'C002', createdAt: '2022-02-01' },
        { id: '3', name: 'Alice Smith', sbu: 'SBU3', customerId: 'C003', createdAt: '2022-03-01' },
    ];

    // const {
    //     data: groups,
    //     isLoading,
    //     isError,
    // } = useQuery({
    //     queryKey: [customerKeys.getAllCustomers],
    //     queryFn: async () => {
    //         return await getAllCustomers(0, 20);
    //     },
    // });

    // const { data, totalElements, maxPages } = groups ?? {};

    const columns: ColumnDef<TeamsTypes>[] = [
        {
            accessorKey: 'name',
            header: () => (
                <div className="text-primaryColor font-semibold flex items-center gap-2 min-w-24">
                    <Icons.users className="size-4" /> Team Name
                </div>
            ),
            cell: ({ row }) => <span>{row.original.name}</span>,
        },
        {
            accessorKey: 'sbu',
            header: () => (
                <div className="text-primaryColor font-semibold flex items-center gap-2 min-w-24">
                    <Icons.users className="size-4" /> SBU
                </div>
            ),
            cell: ({ row }) => <span>{row.original.sbu}</span>,
        },
        {
            accessorKey: 'createdAt',
            header: () => (
                <div className="text-primaryColor font-semibold flex items-center gap-2 min-w-24">
                    <Icons.calendarPlus className="size-4" /> Creation Date
                </div>
            ),
            cell: ({ row }) => <span>{row.original.createdAt}</span>,
        },
        {
            id: 'actions',
            header: () => (
                <div className="text-primaryColor font-semibold flex items-center gap-2 min-w-24">
                    <Icons.action className="size-4" /> Action
                </div>
            ),
            cell: ({ row }) => (
                <>
                    <ToolTip content="Add Employee">
                        <Link to="/teams/add-employee-to-team">
                            <Button variant="icon">
                                <Icons.plus className="size-4 text-primaryColor" />
                            </Button>
                        </Link>
                    </ToolTip>
                    <ToolTip content="Edit Team">
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button variant="icon">
                                    <Icons.edit className="size-3.5 text-primaryColor" />
                                </Button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Edit Team</DialogTitle>
                                </DialogHeader>
                                <DialogDescription>
                                    <div className="flex flex-col gap-2">
                                        <Input placeholder="Team Name" defaultValue={row.original.name} />
                                        <Input placeholder="SBU" defaultValue={row.original.sbu} />
                                    </div>
                                </DialogDescription>
                                <DialogFooter>
                                    <Button type="submit">Save Changes</Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    </ToolTip>
                    <ToolTip content="Delete Employee">
                        <Button variant="icon">
                            <Icons.trash className="size-4 text-red-500" />
                        </Button>
                    </ToolTip>
                </>
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
            <RouteHeader text="Teams" />
            <div className="flex flex-col gap-4">
                <div className="flex items-center gap-2 justify-end">
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button>
                                <Icons.plus className="text-white" /> Create Team
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Add Team</DialogTitle>
                            </DialogHeader>
                            <DialogDescription>
                                <div className="flex flex-col gap-2">
                                    <Input placeholder="Team Name" />
                                    <Input placeholder="SBU" />
                                </div>
                            </DialogDescription>
                            <DialogFooter>
                                <Button type="submit">Add</Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                    <SearchBar placeholder="Search teams" paramName="search" debounceTime={500} onSearch={() => {}} className="ml-0" />
                </div>
                <div className="flex flex-col gap-4">
                    <DataTable table={table} columns={columns} isLoading={false} />

                    <DataPagination maxPages={10} total={10} />
                </div>
            </div>
        </div>
    );
}
