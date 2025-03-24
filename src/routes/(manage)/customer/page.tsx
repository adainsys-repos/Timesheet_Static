import DataPagination from '@/components/common/pagination';
import RouteHeader from '@/components/common/route-header';
import SearchBar from '@/components/common/search';
import DataTable from '@/components/table/DataTable';
import { Icons } from '@/icons/icons';
import { Customers } from '@/types/customers/customers';
// import { customerKeys } from '@/utils/query-keys/customer.keys';
// import { useQuery } from '@tanstack/react-query';
import { ColumnDef, getCoreRowModel, getFilteredRowModel, useReactTable } from '@tanstack/react-table';

export default function Customer() {
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

    const columns: ColumnDef<Customers>[] = [
        {
            accessorKey: 'name',
            header: () => (
                <div className="text-primaryColor font-semibold flex items-center gap-2 min-w-24">
                    <Icons.users className="size-4" /> Customer Name
                </div>
            ),
            cell: ({ row }) => <span>{row.original.name}</span>,
        },
        {
            accessorKey: 'customerId',
            header: () => (
                <div className="text-primaryColor font-semibold flex items-center gap-2 min-w-24">
                    <Icons.id className="size-4" /> Customer ID
                </div>
            ),
            cell: ({ row }) => <span>{row.original.customerId}</span>,
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
    ];

    const table = useReactTable({
        data: dummyData,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
    });
    return (
        <div className="flex flex-col gap-4">
            <RouteHeader text="Customer" />
            <div className="flex flex-col gap-4">
                <SearchBar placeholder="Search customer" paramName="search" debounceTime={500} onSearch={() => {}} />
                <div className="flex flex-col gap-4">
                    <DataTable table={table} columns={columns} isLoading={false} />
                    <DataPagination maxPages={10} total={10} />
                </div>
            </div>
        </div>
    );
}
