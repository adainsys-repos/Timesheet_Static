import React, { useState } from 'react';
import DataTable from '../table/DataTable';
import { Icons } from '@/icons/icons';
import ToolTip from '@/components/common/tool-tip';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ProjectAttributesTypes } from '@/types/projects/projec-attributes/project-attributes';
import { ColumnDef, getCoreRowModel, getFilteredRowModel, useReactTable } from '@tanstack/react-table';
import { Input } from '../ui/input';
import { Button } from '../ui/button';

const Main = () => {
    const projectData = {
        projectCode: 'MCP002LAK679',
        projectName: 'MCP002LAK679_Lakewood- FFS Projects',
        startDate: '01/03/2024',
        endDate: '13/05/2024',
        projectType: 'FFS',
        sbu: 'MedChem',
        customerName: 'Sanofi Pasteur - Biologics Inc',
        location: 'Unit 02 ICICI Knowledge Park - SAI Life Sciences Ltd.',
        quotedFTE: '4 FTE',
    };

    const [tableData, setTableData] = useState<any>([{ id: '1', attributeType: ['Value 1', 'Value 2', 'Value 3'], value: '' }]);

    const columns: ColumnDef<ProjectAttributesTypes>[] = [
        {
            accessorKey: 'type',
            header: () => (
                <div className="text-sm font-semibold flex items-center gap-2 min-w-32">
                    <Icons.id className="size-4" /> Attribute Type
                </div>
            ),
            cell: ({ row }) => (
                <Select>
                    <SelectTrigger className="w-[180px] text-sm">
                        <SelectValue placeholder="Select Attribute" />
                    </SelectTrigger>
                    <SelectContent>
                        {row.original.attributeType.map((type: string) => (
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
                <div className="text-sm font-semibold flex items-center gap-2 min-w-32">
                    <Icons.id className="size-4" /> Value
                </div>
            ),
            cell: ({ row }) => (
                <Input
                    className="w-full text-sm"
                    onChange={(e) => {
                        const updatedTableData = tableData.map((rowData: any, index: number) =>
                            index === row.index ? { ...rowData, value: e.target.value } : rowData
                        );
                        setTableData(updatedTableData);
                    }}
                    value={tableData[row.index].value}
                />
            ),
        },
        {
            id: 'actions',
            header: () => (
                <div className="text-sm font-semibold flex items-center gap-2 min-w-32">
                    <Icons.action className="size-4" /> Action
                </div>
            ),
            cell: ({ row }) => (
                <ToolTip content="Delete">
                    <Icons.delete className="size-4 text-red-500 cursor-pointer" onClick={() => handleDelete(row.index)} />
                </ToolTip>
            ),
        },
    ];

    const handleAddAttribute = () => {
        const newRow = {
            id: `${tableData.length + 1}`,
            attributeType: ['Value 1', 'Value 2', 'Value 3'],
            value: '',
        };
        setTableData((prevData: any) => [...prevData, newRow]);
    };

    const handleDelete = (index: number) => {
        setTableData((prevData: any) => prevData.filter((_: any, i: number) => i !== index));
    };

    const table = useReactTable({
        data: tableData,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
    });

    return (
        <div className="h-screen w-full overflow-y-auto">
            <div className="p-8 bg-gray-50 min-h-full">
                {/* Project Details Card */}
                <div className="max-w-6xl mx-auto mb-8">
                    <div className="grid grid-cols-2 gap-6 p-6 border rounded-xl bg-white shadow-lg">
                        {Object.entries(projectData).map(([key, value], index) => (
                            <div key={index} className="flex">
                                <span className="font-semibold w-1/3 text-xs capitalize text-gray-600">{key.replace(/([A-Z])/g, ' $1')}:</span>
                                <span className="ml-4 text-xs text-gray-900">{value}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Custom Attributes Table */}
                <div className="max-w-6xl mx-auto mb-8">
                    <h5 className="text-lg font-semibold text-primaryColor mb-6">Custom Attributes</h5>
                    <DataTable columns={columns} table={table} isLoading={false} />
                </div>

                {/* Buttons - Fixed position at the bottom with proper spacing */}
                <div className="max-w-6xl mx-auto mt-8 mb-16">
                    <div className="flex flex-col gap-4 w-fit">
                        <Button onClick={handleAddAttribute} className="flex items-center gap-2">
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

export default Main;
