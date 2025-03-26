import React, { useState } from 'react';
import DataTable from '../table/DataTable';
import { Icons } from '@/icons/icons';
import { ColumnDef, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Switch } from '../ui/switch';
import { Checkbox } from '../ui/checkbox';

interface EmployeeData {
    employeeId: string;
    startDate: string;
    allowEndDate: boolean;
    endDate: string;
    allocatedWorkHours: string;
    isPercentage: boolean;
    id: string;
}

const EmployeeTable = () => {
    const [tableData, setTableData] = useState<EmployeeData[]>([
        {
            id: '1',
            employeeId: '',
            startDate: '',
            allowEndDate: false,
            endDate: '',
            allocatedWorkHours: '',
            isPercentage: false,
        },
    ]);

    //  Handle Adding New Rows
    const handleAddRow = () => {
        setTableData((prevData) => [
            ...prevData,
            {
                id: `${Date.now()}`,
                employeeId: '',
                startDate: '',
                allowEndDate: false,
                endDate: '',
                allocatedWorkHours: '',
                isPercentage: false,
            },
        ]);
    };

    // ✅ Handle Input Changes
    const handleInputChange = (index: number, field: keyof EmployeeData, value: string | boolean) => {
        setTableData((prevData) => prevData.map((row, i) => (i === index ? { ...row, [field]: value } : row)));
    };

    // ✅ Table Columns

    const columns: ColumnDef<EmployeeData>[] = [
        {
            accessorKey: 'employeeId',
            header: () => (
                <div className="text-primaryColor font-semibold flex items-center gap-2 min-w-24">
                    <Icons.id className="size-4" /> Employee ID
                </div>
            ),
            cell: ({ row }) => (
                <Input
                    value={row.original.employeeId}
                    onChange={(e) => handleInputChange(row.index, 'employeeId', e.target.value)}
                    className="w-32 h-8 text-sm"
                    placeholder="Enter Employee ID"
                />
            ),
        },
        {
            accessorKey: 'startDate',
            header: () => (
                <div className="text-primaryColor font-semibold flex items-center gap-2 min-w-24">
                    <Icons.calendarPlus className="size-4" /> Start Date
                </div>
            ),
            cell: ({ row }) => (
                <Input
                    type="date"
                    value={row.original.startDate}
                    onChange={(e) => handleInputChange(row.index, 'startDate', e.target.value)}
                    className="w-36 h-8 text-sm"
                />
            ),
        },
        {
            accessorKey: 'allowEndDate',
            header: () => (
                <div className="text-primaryColor font-semibold flex items-center gap-2 min-w-24">
                    <Icons.checkSquare className="size-4" /> Allow End Date
                </div>
            ),
            cell: ({ row }) => (
                <div className="flex items-center justify-center gap-2">
                    <Checkbox
                        checked={row.original.allowEndDate}
                        onCheckedChange={(checked) => handleInputChange(row.index, 'allowEndDate', checked)}
                        className="w-5 h-5"
                    />
                </div>
            ),
        },
        {
            accessorKey: 'endDate',
            header: () => (
                <div className="text-primaryColor font-semibold flex items-center gap-2 min-w-24">
                    <Icons.calendarPlus className="size-4" /> End Date
                </div>
            ),
            cell: ({ row }) => (
                <Input
                    type="date"
                    value={row.original.endDate}
                    onChange={(e) => handleInputChange(row.index, 'endDate', e.target.value)}
                    disabled={!row.original.allowEndDate}
                    className="w-36 h-8 text-sm"
                />
            ),
        },
        {
            accessorKey: 'allocatedWorkHours',
            header: () => (
                <div className="text-primaryColor font-semibold flex items-center gap-2 min-w-24">
                    <Icons.clock />
                    Allocated Work Hours
                </div>
            ),
            cell: ({ row }) => (
                <div className="flex items-center gap-4">
                    <Switch
                        checked={row.original.isPercentage}
                        onCheckedChange={(checked) => handleInputChange(row.index, 'isPercentage', checked)}
                    />
                    <Input
                        type="number"
                        value={row.original.allocatedWorkHours}
                        onChange={(e) => handleInputChange(row.index, 'allocatedWorkHours', e.target.value)}
                        className="w-32 h-8 text-sm"
                        placeholder={row.original.isPercentage ? 'Enter %' : 'Enter Hours'}
                    />
                </div>
            ),
        },
    ];

    const table = useReactTable({
        data: tableData,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    return (
        <div className="space-y-4 bg-gray-50 p-8 min-h-screen">
            <DataTable columns={columns} table={table} isLoading={false} />

            <div className="max-w-6xl mx-auto mt-8 mb-16">
                <div className="flex flex-col gap-4 w-fit">
                    <Button onClick={handleAddRow} className="flex items-center gap-2">
                        <Icons.plus />
                        Add Employee
                    </Button>
                    <Button>Save</Button>
                </div>
            </div>
        </div>
    );
};

export default EmployeeTable;
