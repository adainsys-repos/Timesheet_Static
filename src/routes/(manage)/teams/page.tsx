import DataPagination from '@/components/common/pagination';
import RouteHeader from '@/components/common/route-header';
import SearchBar from '@/components/common/search';
import ToolTip from '@/components/common/tool-tip';
import DataTable from '@/components/table/DataTable';
import AddEmployeeToTeam from '@/components/teams/add-employee-to-teams';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Icons } from '@/icons/icons';
import { TimesheetParametersTypes } from '@/types/timesheet-parameters/timesheet-parameters';
import { ColumnDef, getCoreRowModel, getFilteredRowModel, useReactTable } from '@tanstack/react-table';
import { useNavigate } from 'react-router-dom';

export default function Teams() {
    // Dummy data for demonstration
    const dummyData = [
        { id: '1', name: 'John Doe', sbu: 'SBU1', customerId: 'C001', createdAt: '2022-01-01' },
        { id: '2', name: 'Jane Doe', sbu: 'SBU2', customerId: 'C002', createdAt: '2022-02-01' },
        { id: '3', name: 'Alice Smith', sbu: 'SBU3', customerId: 'C003', createdAt: '2022-03-01' },
    ];
    const navigate = useNavigate();

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

    const columns: ColumnDef<TimesheetParametersTypes>[] = [
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
            accessorKey: 'customerId',
            header: () => (
                <div className="text-primaryColor font-semibold flex items-center gap-2 min-w-24">
                    <Icons.id className="size-4" /> Creation Date
                </div>
            ),
            cell: ({ row }) => <span>{row.original.createdAt}</span>,
        },
        {
            accessorKey: 'createdAt',
            header: () => (
                <div className="text-primaryColor font-semibold flex items-center gap-2 min-w-24">
                    <Icons.action className="size-4" /> Action
                </div>
            ),

            cell: ({ row }) => (
                <>
                    <ToolTip content="Add Employee">
                        <Button
                            variant="icon"
                            onClick={() => {
                                navigate('/add-employee-to-team');
                            }}
                        >
                            <Icons.edit className="size-4 text-primaryColor" />
                        </Button>
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
                    <SearchBar placeholder="Search customer" paramName="search" debounceTime={500} onSearch={() => {}} className="ml-0" />
                </div>
                <div className="flex flex-col gap-4">
                    <DataTable table={table} columns={columns} isLoading={false} />
                    <DataPagination maxPages={10} total={10} />
                </div>
            </div>
        </div>
    );
}
