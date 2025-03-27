import React, { useState } from 'react';
import DataTable from '../table/DataTable';
import { Icons } from '@/icons/icons';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ColumnDef, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import DataPagination from '../common/pagination';

interface TableRowData {
    id: string;
    employeeId: string;
    role: string;
}

const roles = ['Attribute 1', 'Attribute 2', 'Attribute 3'];

const Assignment = () => {
    const [tableData, setTableData] = useState<TableRowData[]>([{ id: '1', employeeId: '', role: '' }]);
    const [focusRow, setFocusRow] = useState<string | null>(null);

    const handleValueChange = (rowId: string, value: string) => {
        setTableData((prevData) => prevData.map((row) => (row.id === rowId ? { ...row, employeeId: value } : row)));
    };

    const handleAttributeChange = (rowId: string, selectedRole: string) => {
        setTableData((prevData) => prevData.map((row) => (row.id === rowId ? { ...row, role: selectedRole } : row)));
    };

    const handleAddParameter = () => {
        setTableData((prevData) => [...prevData, { id: `${prevData.length + 1}`, employeeId: '', role: '' }]);
    };

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
        <div className="space-y-4 bg-white p-4 min-h-screen">
            <div className="max-w-6xl mx-auto mb-8 p-6 border rounded-xl bg-white shadow-lg pt-8">
                <DataTable table={table} columns={columns} isLoading={false} />
                <Button onClick={handleAddParameter} className="mt-4 flex items-center gap-2 text-xs px-2 py-1">
                    <Icons.plus />
                    Add Attribute
                </Button>
                <DataPagination total={10} maxPages={10} />
            </div>

            <div className="max-w-6xl mx-auto mt-8 mb-16 flex justify-end text-sm">
                <Button className="text-sm">Save</Button>
            </div>
        </div>
    );
};

export default Assignment;
