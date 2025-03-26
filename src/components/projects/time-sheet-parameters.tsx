import React, { useState, useCallback } from 'react';
import DataTable from '../table/DataTable';
import { Icons } from '@/icons/icons';
import ToolTip from '@/components/common/tool-tip';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ColumnDef, getCoreRowModel, getFilteredRowModel, useReactTable } from '@tanstack/react-table';
import { Input } from '../ui/input';
import { Button } from '../ui/button';

interface TableRowData {
    id: string;
    attributeType: string[];
    selectedAttribute?: string;
    value: string;
    subValues: string[];
}

const TimeSheetParameters = () => {
    const [tableData, setTableData] = useState<TableRowData[]>([
        {
            id: '1',
            attributeType: ['Attribute 1', 'Attribute 2', 'Attribute 3'],
            value: '',
            subValues: [],
            selectedAttribute: '',
        },
    ]);

    const handleAddSubValue = useCallback((rowIndex: number) => {
        setTableData((prevData) =>
            prevData.map((row, index) =>
                index === rowIndex && row.value.trim() ? { ...row, subValues: [...row.subValues, row.value.trim()], value: '' } : row
            )
        );
    }, []);

    const handleValueChange = useCallback((rowIndex: number, value: string) => {
        setTableData((prevData) => prevData.map((row, index) => (index === rowIndex ? { ...row, value } : row)));
    }, []);

    const handleAttributeChange = useCallback((rowIndex: number, selectedAttribute: string) => {
        setTableData((prevData) => prevData.map((row, index) => (index === rowIndex ? { ...row, selectedAttribute } : row)));
    }, []);

    const handleAddParameter = useCallback(() => {
        const newRow: TableRowData = {
            id: `${tableData.length + 1}`,
            attributeType: ['Attribute 1', 'Attribute 2', 'Attribute 3'],
            value: '',
            subValues: [],
            selectedAttribute: '',
        };
        setTableData((prevData) => [...prevData, newRow]);
    }, [tableData]);

    const handleRemoveSubValue = useCallback((rowIndex: number, subValueIndex: number) => {
        setTableData((prevData) =>
            prevData.map((row, index) => (index === rowIndex ? { ...row, subValues: row.subValues.filter((_, i) => i !== subValueIndex) } : row))
        );
    }, []);

    const columns: ColumnDef<TableRowData>[] = [
        {
            accessorKey: 'type',
            header: () => (
                <div className="text-primaryColor font-semibold flex items-center gap-2">
                    <Icons.folderTree className="size-4" /> Attribute
                </div>
            ),
            cell: ({ row }) => (
                <Select value={row.original.selectedAttribute || ''} onValueChange={(value) => handleAttributeChange(row.index, value)}>
                    <SelectTrigger className="w-[180px] text-sm">
                        <SelectValue placeholder="Select Attribute" />
                    </SelectTrigger>
                    <SelectContent>
                        {row.original.attributeType.map((type) => (
                            <SelectItem key={type} value={type} className="text-sm">
                                {type}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            ),
        },
        {
            accessorKey: 'value',
            header: () => (
                <div className="text-primaryColor font-semibold flex items-center gap-2">
                    <Icons.fileText className="size-4" /> Value
                </div>
            ),
            cell: ({ row }) => (
                <div className="flex items-center space-x-2">
                    <Input
                        className="w-full text-sm"
                        value={row.original.value}
                        onChange={(e) => handleValueChange(row.index, e.target.value)}
                        placeholder="Enter value"
                    />
                    <ToolTip content="Add Value">
                        <Icons.plus className="size-5 text-green-500 cursor-pointer" onClick={() => handleAddSubValue(row.index)} />
                    </ToolTip>
                </div>
            ),
        },
        {
            accessorKey: 'subValues',
            header: () => (
                <div className="text-primaryColor font-semibold flex items-center gap-2">
                    <Icons.folderTree className="size-4" /> Sub Values
                </div>
            ),
            cell: ({ row }) => (
                <div className="flex flex-wrap gap-2 items-center">
                    {row.original.subValues.map((subValue, index) => (
                        <div key={index} className="bg-gray-100 px-2 py-1 rounded-md text-xs flex items-center gap-1">
                            {subValue}
                            <Icons.cancel className="size-3 text-red-500 cursor-pointer" onClick={() => handleRemoveSubValue(row.index, index)} />
                        </div>
                    ))}
                </div>
            ),
        },
    ];

    const table = useReactTable({
        data: tableData,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
    });

    return (
        <div className="p-6 space-y-4 bg-gray-50 min-h-screen">
            {/* DataTable with Clean UI */}
            <DataTable columns={columns} table={table} isLoading={false} />

            {/* Buttons Section */}
            <div className="max-w-6xl mx-auto mt-8 mb-16">
                <div className="flex flex-col gap-4 w-fit">
                    <Button onClick={handleAddParameter} className="flex items-center gap-2">
                        <Icons.plus />
                        Add Parameter
                    </Button>
                    <Button>Save</Button>
                </div>
            </div>
        </div>
    );
};

export default TimeSheetParameters;
