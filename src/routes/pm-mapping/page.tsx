import DataPagination from '@/components/common/pagination';
import RouteHeader from '@/components/common/route-header';
import SearchBar from '@/components/common/search';
import DataTable from '@/components/table/DataTable';
import { Button } from '@/components/ui/button';
import { Icons } from '@/icons/icons';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { ColumnDef, getCoreRowModel, getFilteredRowModel, useReactTable } from '@tanstack/react-table';
import { Input } from '@/components/ui/input';
import { PmMappingTypes } from '@/types/projects/pm-mapping';

export default function PMMapping() {
    const data: PmMappingTypes[] = [
        {
            id: '1',
            pmName: 'John Doe',
            projectCode: 'PROJ-001',
            creationDate: '2024-03-25',
        },
        {
            id: '2',
            pmName: 'Jane Smith',
            projectCode: 'PROJ-002',
            creationDate: '2024-03-20',
        },

        {
            id: '3',
            pmName: 'Robert',
            projectCode: 'PROJ-003',
            creationDate: '2025-03-25',
        },
    ];

    const columns: ColumnDef<PmMappingTypes>[] = [
        {
            accessorKey: 'pmName',
            header: () => (
                <div className="text-primaryColor font-semibold flex items-center gap-2 min-w-24">
                    <Icons.users className="size-4" />
                    Pm Name
                </div>
            ),
        },

        {
            accessorKey: 'projectCode',
            header: () => (
                <div className="text-primaryColor font-semibold flex items-center gap-2 min-w-24">
                    <Icons.id className="size-4" />
                    Project Code
                </div>
            ),
        },

        {
            accessorKey: 'creationDate',
            header: () => (
                <div className="text-primaryColor font-semibold flex items-center gap-2 min-w-24">
                    <Icons.calendarPlus className="size-4" />
                    Creation Date
                </div>
            ),
        },
    ];

    const table = useReactTable({
        data: data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
    });

    return (
        <div className="flex flex-col gap-4">
            <RouteHeader text="PM Mapping" />
            <div className="flex flex-col gap-4">
                <div className="flex justify-end items-center mt-4 gap-2">
                    {/* <Button>
                        <Icons.plus className="mr-2" /> New Mapping
                    </Button> */}
                    <Dialog>
                        <DialogTrigger>
                            <Button>
                                <Icons.plus className="text-white" /> Add Mapping
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Add Mapping</DialogTitle>
                            </DialogHeader>
                            <DialogDescription className="flex flex-col gap-2">
                                <div className="flex flex-col gap-2">
                                    <Input placeholder="Pm Id" />
                                    <Input placeholder="Pm Name" />
                                    <Input placeholder="Project Code" />
                                </div>
                            </DialogDescription>
                            <DialogFooter>
                                <Button type="submit">Add</Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                    <SearchBar placeholder="Search Mappings" paramName="search" debounceTime={500} onSearch={() => {}} className="ml-0" />
                </div>
                <div className="flex flex-col gap-4">
                    <DataTable table={table} columns={columns} isLoading={false} />

                    <DataPagination maxPages={10} total={10} />
                </div>
            </div>
        </div>
    );
}
