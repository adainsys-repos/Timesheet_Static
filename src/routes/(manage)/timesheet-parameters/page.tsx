import DataPagination from '@/components/common/pagination';
import RouteHeader from '@/components/common/route-header';
import SearchBar from '@/components/common/search';
import ToolTip from '@/components/common/tool-tip';
import DataTable from '@/components/table/DataTable';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Icons } from '@/icons/icons';
import { TimesheetParametersTypes } from '@/types/timesheet-parameters/timesheet-parameters';
import { ColumnDef, getCoreRowModel, getFilteredRowModel, useReactTable } from '@tanstack/react-table';

export default function TimesheetParameters() {
    // Dummy data for demonstration
    const dummyData = [
        { id: '1', name: 'John Doe', customerId: 'C001', createdAt: '2022-01-01' },
        { id: '2', name: 'Jane Doe', customerId: 'C002', createdAt: '2022-02-01' },
        { id: '3', name: 'Alice Smith', customerId: 'C003', createdAt: '2022-03-01' },
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

    const columns: ColumnDef<TimesheetParametersTypes>[] = [
        {
            accessorKey: 'name',
            header: () => (
                <div className="text-primaryColor font-semibold flex items-center gap-2 min-w-24">
                    <Icons.users className="size-4" /> Parameter Name
                </div>
            ),
            cell: ({ row }) => <span>{row.original.name}</span>,
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
                    <ToolTip content="Edit">
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button variant="icon">
                                    <Icons.edit className="size-4 text-primaryColor" />
                                </Button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Edit Parameter</DialogTitle>
                                </DialogHeader>
                                <DialogDescription>
                                    <div className="flex flex-col gap-2">
                                        <Input placeholder="Parameter Name" />
                                    </div>
                                </DialogDescription>
                                <DialogFooter>
                                    <Button type="submit">Update</Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
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
            <RouteHeader text="Timesheet Parameters" />
            <div className="flex flex-col gap-4">
                <div className="flex items-center gap-2 justify-end">
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button>
                                <Icons.plus className="text-white" /> Add Parameter
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Add Parameter</DialogTitle>
                            </DialogHeader>
                            <DialogDescription>
                                <div className="flex flex-col gap-2">
                                    <Input placeholder="Parameter Name" />
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
