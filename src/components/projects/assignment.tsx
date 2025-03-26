import React, { useState } from 'react';
import DataTable from '../table/DataTable';
import { Icons } from '@/icons/icons';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ColumnDef, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { Input } from '../ui/input';
import { Button } from '../ui/button';

interface TableRowData {
    id: string;
    employeeId: string;
    role: string;
}

const roles = ['Attribute 1', 'Attribute 2', 'Attribute 3'];

const Assignment = () => {
    const [tableData, setTableData] = useState<TableRowData[]>([{ id: '1', employeeId: '', role: '' }]);
    const [focusRow, setFocusRow] = useState<string | null>(null);

    // ✅ Handle Input Change
    const handleValueChange = (rowId: string, value: string) => {
        setTableData((prevData) => prevData.map((row) => (row.id === rowId ? { ...row, employeeId: value } : row)));
    };

    // ✅ Handle Select Change
    const handleAttributeChange = (rowId: string, selectedRole: string) => {
        setTableData((prevData) => prevData.map((row) => (row.id === rowId ? { ...row, role: selectedRole } : row)));
    };

    // ✅ Add New Row
    const handleAddParameter = () => {
        setTableData((prevData) => [...prevData, { id: `${prevData.length + 1}`, employeeId: '', role: '' }]);
    };

    // ✅ Table Columns
    const columns: ColumnDef<TableRowData>[] = [
        {
            accessorKey: 'employeeId',
            header: () => (
                <div className="text-primaryColor font-semibold flex items-center gap-2 min-w-40">
                    <Icons.users className="size-4" /> Employee ID
                </div>
            ),
            cell: ({ row }) => (
                <Input
                    key={`input-${row.original.id}`}
                    value={row.original.employeeId}
                    onChange={(e) => handleValueChange(row.original.id, e.target.value)}
                    placeholder="Enter Employee ID"
                    className="w-40 h-8 text-sm" // Smaller size
                    autoFocus={focusRow === row.original.id}
                    onBlur={() => setFocusRow(null)}
                    onFocus={() => setFocusRow(row.original.id)}
                />
            ),
        },
        {
            accessorKey: 'role',
            header: () => (
                <div className="text-primaryColor font-semibold flex items-center gap-2 min-w-40">
                    <Icons.briefcase className="size-4" /> Role
                </div>
            ),
            cell: ({ row }) => (
                <Select
                    key={`select-${row.original.id}`}
                    value={row.original.role}
                    onValueChange={(value) => handleAttributeChange(row.original.id, value)}
                >
                    <SelectTrigger className="w-40 h-8 text-sm">
                        {/* Smaller Select Component */}
                        <SelectValue placeholder="Select Role" />
                    </SelectTrigger>
                    <SelectContent>
                        {roles.map((type) => (
                            <SelectItem key={type} value={type}>
                                {type}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            ),
        },
    ];

    const table = useReactTable({
        data: tableData,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    return (
        <div className="h-screen w-full overflow-y-auto">
            <div className="p-8 bg-gray-50 min-h-full">
                {/* DataTable */}
                <DataTable table={table} columns={columns} isLoading={false} />

                {/* Buttons Section */}
                <div className="max-w-6xl mx-auto mt-8 mb-16">
                    <div className="flex flex-col gap-4 w-fit">
                        <Button onClick={handleAddParameter} className="flex items-center gap-2">
                            <Icons.plus />
                            Add Attribute
                        </Button>
                        <Button>Save</Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Assignment;
