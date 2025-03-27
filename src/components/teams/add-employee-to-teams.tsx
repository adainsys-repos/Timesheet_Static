import DataTable from '@/components/table/DataTable';
import { ColumnDef, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import SearchBar from '../common/search';
import { Button } from '../ui/button';
import Pagination from '../common/pagination';
import { Icons } from '@/icons/icons';
import ToolTip from '../common/tool-tip';
import { Input } from '../ui/input';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

interface Employee {
    id: string;
    name: string;
    department: string;
}

export default function AddEmployeeToTeam() {
    const employees: Employee[] = [
        { id: 'EMP001', name: 'John Doe', department: 'Engineering' },
        { id: 'EMP002', name: 'Jane Smith', department: 'Design' },
        { id: 'EMP003', name: 'Robert Johnson', department: 'Marketing' },
    ];

    const columns: ColumnDef<Employee>[] = [
        {
            accessorKey: 'id',
            header: 'Employee ID',
            cell: ({ row }) => <span>{row.original.id}</span>,
        },
        {
            accessorKey: 'name',
            header: 'Name',
            cell: ({ row }) => <span>{row.original.name}</span>,
        },
        {
            accessorKey: 'department',
            header: 'Department',
            cell: ({ row }) => <span>{row.original.department}</span>,
        },
        {
            accessorKey: 'action',
            header: 'Action',
            cell: ({ row }) => (
                <></>
                // <ToolTip content="Delete">
                //     <Button variant="icon">
                //         <Icons.delete className="size-4 text-primaryColor" />
                //     </Button>
                // </ToolTip>
            ),
        },
    ];

    const table = useReactTable({
        data: employees,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    return (
        <>
            <div className="w-full flex flex-col gap-4">
                <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">Mapped Employees</p>
                    <Dialog>
                        <DialogTrigger asChild>
                            <div className="flex items-center gap-2">
                                <Button>
                                    <Icons.plus />
                                    Add Employee
                                </Button>
                                <SearchBar placeholder="Search employee" paramName="search" debounceTime={500} onSearch={() => {}} className="ml-0" />
                            </div>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Add Employee</DialogTitle>
                            </DialogHeader>
                            <DialogDescription>
                                <div className="flex flex-col gap-2">
                                    <Input placeholder="Employee Code" />
                                </div>
                            </DialogDescription>
                            <DialogFooter>
                                <Button type="submit">Add</Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </div>

                <DataTable table={table} columns={columns} isLoading={false} />

                <div className="flex justify-between items-center">
                    <Pagination maxPages={10} total={100} />
                </div>
            </div>
        </>
    );
}
