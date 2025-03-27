import React, { useState, useCallback } from 'react';
import DataTable from '../table/DataTable';
import { Icons } from '@/icons/icons';
import ToolTip from '@/components/common/tool-tip';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ColumnDef, getCoreRowModel, getFilteredRowModel, useReactTable } from '@tanstack/react-table';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import DataPagination from '../common/pagination';

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
                        className="w-[180px] text-sm"
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
        <div className="space-y-4 bg-white p-4 min-h-screen">
            <div className="max-w-6xl mx-auto mb-8 p-6 border rounded-xl bg-white shadow-lg pt-8">
                <DataTable table={table} columns={columns} isLoading={false} />
                <Button onClick={handleAddParameter} className="mt-4 flex items-center gap-2 text-xs px-2 py-1">
                    <Icons.plus />
                    Add Parameter
                </Button>

                <DataPagination total={10} maxPages={10} />
            </div>

            <div className="max-w-6xl mx-auto mt-8 mb-16 flex justify-end text-sm">
                <Button className="text-sm">Save</Button>
            </div>
        </div>
    );
};

export default TimeSheetParameters;
