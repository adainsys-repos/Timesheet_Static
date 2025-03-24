import DataPagination from '@/components/common/pagination';
import RouteHeader from '@/components/common/route-header';
import SearchBar from '@/components/common/search';
import ToolTip from '@/components/common/tool-tip';
import DataTable from '@/components/table/DataTable';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Icons } from '@/icons/icons';
import { ProjectAttributesTypes } from '@/types/projects/projec-attributes/project-attributes';
import { ColumnDef, getCoreRowModel, getFilteredRowModel, useReactTable } from '@tanstack/react-table';

export default function ProjectAttributes() {
    // Dummy data for demonstration based on the image
    const dummyData: ProjectAttributesTypes[] = [
        { id: '1', name: 'Attribute 1', attributeType: ['Value 1', 'Value 2', 'Value 3'], createdAt: '16/05/2021' },
        { id: '2', name: 'Attribute 2', attributeType: ['Value 1', 'Value 2', 'Value 3'], createdAt: '16/05/2021' },
        { id: '3', name: 'Attribute 3', attributeType: ['Value 1', 'Value 2', 'Value 3'], createdAt: '16/05/2021' },
        { id: '4', name: 'Attribute 4', attributeType: ['Value 1', 'Value 2', 'Value 3'], createdAt: '16/05/2021' },
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

    const columns: ColumnDef<ProjectAttributesTypes>[] = [
        {
            accessorKey: 'name',
            header: () => (
                <div className="text-primaryColor font-semibold flex items-center gap-2 min-w-24">
                    <Icons.users className="size-4" /> Attribute Name
                </div>
            ),
            cell: ({ row }) => <span>{row.original.name}</span>,
        },
        {
            accessorKey: 'type',
            header: () => (
                <div className="text-primaryColor font-semibold flex items-center gap-2 min-w-24">
                    <Icons.id className="size-4" /> Attribute Type
                </div>
            ),
            cell: ({ row }) => (
                <div>
                    <Select>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder={'Select Attribute'} />
                        </SelectTrigger>
                        <SelectContent>
                            {row.original.attributeType.map((type) => (
                                <SelectItem key={type} value={type}>
                                    {type}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            ),
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
                <span className="flex items-center gap-2 text-primaryColor">
                    <ToolTip content="Edit">
                        <Icons.edit className="size-4" />
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
            <RouteHeader text="Project Attributes" />
            <div className="flex flex-col gap-4">
                <div className="flex items-center gap-2 justify-end">
                    <Button>
                        <Icons.plus className="text-white" /> Add Attribute
                    </Button>
                    <SearchBar placeholder="Search attribute" paramName="search" debounceTime={500} onSearch={() => {}} className="ml-0" />
                </div>
                <div className="flex flex-col gap-4">
                    <DataTable table={table} columns={columns} isLoading={false} />
                    {/* <DataPagination maxPages={10} total={10} /> */}
                </div>
            </div>
        </div>
    );
}
