import DataTable from '@/components/table/DataTable';
import { ColumnDef, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import SearchBar from '../common/search';
import { Button } from '../ui/button';
import Pagination from '../common/pagination';
import { Icons } from '@/icons/icons';
import { Checkbox } from '../ui/checkbox';
import { useState } from 'react';
interface Employee {
    id: string;
    name: string;
    department: string;
}

export default function AddEmployeeToTeam() {
    // Dummy data for the employee table
    const employees: Employee[] = [
        { id: 'EMP001', name: 'John Doe', department: 'Engineering' },
        { id: 'EMP002', name: 'Jane Smith', department: 'Design' },
        { id: 'EMP003', name: 'Robert Johnson', department: 'Marketing' },
    ];

    // State to track selected employees for unmapping
    const [selectedEmployees, setSelectedEmployees] = useState<string[]>([]);

    const columns: ColumnDef<Employee>[] = [
        {
            id: 'select',
            header: 'Select',
            cell: ({ row }) => (
                <Checkbox id={`checkbox-${row.original.id}`} className="h-4 w-4 rounded border-gray-300" aria-label={`Select ${row.original.name}`} />
            ),
        },
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
    ];

    const table = useReactTable({
        data: employees,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    // Handle unmapping of selected employees
    const handleUnmapEmployees = () => {
        // Logic to unmap selected employees would go here
        console.log('Unmapping employees:', selectedEmployees);
        setSelectedEmployees([]);
    };

    return (
        <div className="w-full flex flex-col gap-4">
            <div className="flex items-center gap-4">
                <p className="text-sm font-medium">Mapped Employees</p>
                <SearchBar placeholder="Search employee" paramName="search" debounceTime={500} onSearch={() => {}} className="" />
            </div>
            <DataTable table={table} columns={columns} isLoading={false} />
            <div className="flex justify-between items-center">
                <div className="flex justify-center items-center gap-2 mt-4">
                    <Button className="gap-1">
                        <Icons.plus className="size-4" /> Add Employee
                    </Button>
                    <Button className="bg-red-500 hover:bg-red-600 gap-1" onClick={handleUnmapEmployees} disabled={selectedEmployees.length === 0}>
                        <Icons.trash className="size-4" /> Unmap Employee
                        {selectedEmployees.length > 0 && ` (${selectedEmployees.length})`}
                    </Button>
                </div>
                <Pagination maxPages={10} total={100} />
            </div>
        </div>
    );
}
