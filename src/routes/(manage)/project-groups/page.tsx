import DataPagination from '@/components/common/pagination';
import RouteHeader from '@/components/common/route-header';
import DataTable from '@/components/table/DataTable';
import { Icons } from '@/icons/icons';
import { ProjectGroupsTypes } from '@/types/projects/project-groups';
import { ColumnDef, getCoreRowModel, getFilteredRowModel, useReactTable } from '@tanstack/react-table';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import SearchBar from '@/components/common/search';
import ToolTip from '@/components/common/tool-tip';
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import AssignProjects from '@/components/project-allocation/projects/assign-projects/page';
import AssignedProjects from '@/components/project-allocation/projects/assigned-projects/page';
import ProjectAllocation from '@/components/project-allocation/project-allocation';

export default function ProjectGroups() {
    const dummyData: ProjectGroupsTypes[] = [
        { id: '1', projectGroupName: 'Blarc', projectGroupId: '8888', createdAt: '16/05/2021' },
        { id: '2', projectGroupName: 'Advisory', projectGroupId: '9999', createdAt: '16/05/2021' },
        { id: '3', projectGroupName: 'ATS', projectGroupId: '8569', createdAt: '16/05/2021' },
    ];

    const columns: ColumnDef<ProjectGroupsTypes>[] = [
        {
            accessorKey: 'projectGroupName',
            header: () => (
                <div className="text-primaryColor font-semibold flex items-center gap-2 min-w-24">
                    <Icons.users className="size-4" /> Project Group Name
                </div>
            ),
            cell: ({ row }) => <span>{row.original.projectGroupName}</span>,
        },

        {
            accessorKey: 'projectGroupId',
            header: () => (
                <div className="text-primaryColor font-semibold flex items-center gap-2 min-w-24">
                    <Icons.id className="size-4" /> Project Group Id
                </div>
            ),
            cell: ({ row }) => <span>{row.original.projectGroupId}</span>,
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
            accessorKey: 'createdAt',
            header: () => (
                <div className="text-primaryColor font-semibold flex items-center gap-2 min-w-24">
                    <Icons.action className="size-4" /> Action
                </div>
            ),
            cell: ({ row }) => (
                <>
                    <Sheet>
                        <ToolTip content="Edit Groups">
                            <SheetTrigger asChild>
                                <Button variant="icon">
                                    <Icons.edit className="size-4 text-primaryColor" />
                                </Button>
                            </SheetTrigger>
                        </ToolTip>

                        <ToolTip content="Delete">
                            <Button variant="icon">
                                <Icons.trash className="size-4 text-red-500" />
                            </Button>
                        </ToolTip>

                        <SheetContent className="!max-w-[75vw] overflow-y-auto mb-10">
                            <SheetHeader>
                                <SheetTitle>Project Groups Name</SheetTitle>
                            </SheetHeader>
                            <div className="w-full flex flex-col gap-2 py-4">
                                <ProjectAllocation type="teams" />
                            </div>
                        </SheetContent>
                    </Sheet>
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
            <RouteHeader text="Project Groups" />
            <div className="flex flex-col gap-4">
                <div className="flex items-center gap-2 justify-end">
                    <Dialog>
                        <DialogTrigger>
                            <Button>
                                <Icons.plus className="text-white" /> Create New Project Group
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Add Project Group</DialogTitle>
                            </DialogHeader>
                            <DialogDescription className="flex flex-col gap-2">
                                <div className="flex flex-col gap-2">
                                    <Input placeholder="Project Group Name" />
                                </div>
                            </DialogDescription>
                            <DialogFooter>
                                <Button type="submit">Add</Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                    <SearchBar placeholder="Search Project Group Name" paramName="search" debounceTime={500} onSearch={() => {}} className="ml-0" />
                </div>
                <div className="flex flex-col gap-4">
                    <DataTable table={table} columns={columns} isLoading={false} />
                    <DataPagination maxPages={10} total={10} />
                </div>
            </div>
        </div>
    );
}
