// import RouteHeader from '@/components/common/route-header';
// import { useState } from 'react';
// import { ChevronLeft, ChevronRight, Download } from 'lucide-react';

// export default function Calendar() {
//     const [viewMode, setViewMode] = useState<'weekly' | 'monthly'>('weekly');
//     const [selectedDate, setSelectedDate] = useState(new Date());

//     const projects: any = [
//         {
//             id: 1,
//             name: 'Project 1',
//             days: {
//                 // For simplicity, assume days 1-31 all set to some values for monthly
//                 1: 1,
//                 2: 3,
//                 3: 1,
//                 4: 6,
//                 5: 8,
//                 6: 0,
//                 7: 2,
//                 8: 4,
//                 9: 5,
//                 10: 0,
//                 11: 3,
//                 12: 1,
//                 13: 0,
//                 14: 2,
//                 15: 3,
//                 16: 6,
//                 17: 0,
//                 18: 2,
//                 19: 5,
//                 20: 1,
//                 21: 0,
//                 22: 0,
//                 23: 3,
//                 24: 2,
//                 25: 1,
//                 26: 0,
//                 27: 0,
//                 28: 2,
//                 29: 4,
//                 30: 0,
//                 31: 0,
//             },
//         },
//         {
//             id: 2,
//             name: 'Project 2',
//             days: {
//                 1: 2,
//                 2: 4,
//                 3: 0,
//                 4: 3,
//                 5: 7,
//                 6: 1,
//                 7: 0,
//                 8: 2,
//                 9: 0,
//                 10: 5,
//                 11: 4,
//                 12: 0,
//                 13: 1,
//                 14: 0,
//                 15: 2,
//                 16: 4,
//                 17: 1,
//                 18: 0,
//                 19: 0,
//                 20: 3,
//                 21: 1,
//                 22: 2,
//                 23: 0,
//                 24: 4,
//                 25: 5,
//                 26: 1,
//                 27: 0,
//                 28: 2,
//                 29: 0,
//                 30: 1,
//                 31: 0,
//             },
//         },
//     ];

//     const getValueColor: any = (value: number) => {
//         if (value === 0) return 'text-gray-400';
//         if (value <= 3) return 'text-green-500';
//         if (value <= 6) return 'text-blue-500';
//         return 'text-purple-500';
//     };

//     const handlePreviousPeriod = () => {
//         if (viewMode === 'weekly') {
//             const newDate = new Date(selectedDate);
//             newDate.setDate(selectedDate.getDate() - 7);
//             setSelectedDate(newDate);
//         } else {
//             const newDate = new Date(selectedDate);
//             newDate.setMonth(selectedDate.getMonth() - 1);
//             setSelectedDate(newDate);
//         }
//     };

//     const handleNextPeriod = () => {
//         if (viewMode === 'weekly') {
//             const newDate = new Date(selectedDate);
//             newDate.setDate(selectedDate.getDate() + 7);
//             setSelectedDate(newDate);
//         } else {
//             const newDate = new Date(selectedDate);
//             newDate.setMonth(selectedDate.getMonth() + 1);
//             setSelectedDate(newDate);
//         }
//     };

//     // Week days (Mon-Sun)
//     const weekDays = [
//         { num: 1, name: 'Mon' },
//         { num: 2, name: 'Tue' },
//         { num: 3, name: 'Wed' },
//         { num: 4, name: 'Thu' },
//         { num: 5, name: 'Fri' },
//         { num: 6, name: 'Sat' },
//         { num: 7, name: 'Sun' },
//     ];

//     // Get number of days in selected month
//     const daysInMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0).getDate();

//     // Create array of days for monthly
//     const monthDays = Array.from({ length: daysInMonth }, (_, i) => i + 1);

//     const legendItems = [
//         { name: 'Approved', color: 'bg-green-500' },
//         { name: 'Disapproved', color: 'bg-red-500' },
//         { name: 'Holiday', color: 'bg-black' },
//         { name: 'Leave', color: 'bg-blue-500' },
//     ];

//     return (
//         <div className="flex flex-col gap-4">
//             <RouteHeader text="Calendar" />
//             <div className="bg-white rounded-lg shadow p-6">
//                 <div className="flex flex-col gap-4">
//                     <div className="bg-white rounded-lg shadow">
//                         <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 gap-4 border-b">
//                             {/* Left side controls */}
//                             <div className="flex items-center space-x-3">
//                                 <button className="bg-green-500 hover:bg-green-600 text-white rounded-md px-3 py-2 flex items-center gap-2 text-sm">
//                                     <Download className="h-4 w-4" />
//                                     <span>Download Report</span>
//                                 </button>
//                             </div>

//                             {/* Right side controls */}
//                             <div className="flex items-center space-x-4">
//                                 {/* View mode dropdown */}
//                                 <select
//                                     value={viewMode}
//                                     onChange={(e) => setViewMode(e.target.value as 'weekly' | 'monthly')}
//                                     className="border rounded-md px-3 py-1 text-sm cursor-pointer"
//                                 >
//                                     <option value="weekly">Weekly</option>
//                                     <option value="monthly">Monthly</option>
//                                 </select>

//                                 {/* Date range navigation */}
//                                 <div className="flex items-center space-x-2 border rounded px-2 py-1">
//                                     <button
//                                         onClick={handlePreviousPeriod}
//                                         className="p-1 text-indigo-600 hover:bg-gray-100 rounded-full"
//                                         aria-label="Previous period"
//                                     >
//                                         <ChevronLeft className="h-5 w-5" />
//                                     </button>

//                                     <div className="text-indigo-600 font-medium min-w-[140px] text-center select-none">
//                                         {viewMode === 'weekly'
//                                             ? `Week of ${selectedDate.toLocaleDateString()}`
//                                             : selectedDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
//                                     </div>

//                                     <button
//                                         onClick={handleNextPeriod}
//                                         className="p-1 text-indigo-600 hover:bg-gray-100 rounded-full"
//                                         aria-label="Next period"
//                                     >
//                                         <ChevronRight className="h-5 w-5" />
//                                     </button>
//                                 </div>
//                             </div>
//                         </div>

//                         {/* Calendar grid */}
//                         {viewMode === 'monthly' ? (
//                             // Weekly view - fixed 7 days - no scroll
//                             <div className="overflow-x-auto">
//                                 <div className="min-w-[700px]">
//                                     {/* Header */}
//                                     <div className="grid grid-cols-[150px,repeat(7,1fr)] bg-indigo-600 text-white">
//                                         <div className="p-2 text-xs font-medium">Project</div>
//                                         {weekDays.map((day) => (
//                                             <div key={day.num} className="p-2 text-xs font-medium text-center">
//                                                 {day.name}
//                                                 <div>{day.num}</div>
//                                             </div>
//                                         ))}
//                                     </div>

//                                     {/* Rows */}
//                                     {projects.map((project: any) => (
//                                         <div key={project.id} className="grid grid-cols-[150px,repeat(7,1fr)] border-b bg-white hover:bg-gray-50">
//                                             <div className="p-2 text-sm font-medium text-gray-900">{project.name}</div>
//                                             {weekDays.map((day) => (
//                                                 <div key={day.num} className="flex items-center justify-center py-2 text-sm">
//                                                     <span className={`${getValueColor(project.days[day.num])}`}>{project.days[day.num]}</span>
//                                                 </div>
//                                             ))}
//                                         </div>
//                                     ))}
//                                 </div>
//                             </div>
//                         ) : (
//                             // Monthly view - full month days - horizontal scroll enabled
//                             <div className="overflow-x-auto">
//                                 <div className={`min-w-[${150 + daysInMonth * 40}px]`}>
//                                     {/* Header */}
//                                     <div className="grid" style={{ gridTemplateColumns: `150px repeat(${daysInMonth}, 40px)` }}>
//                                         <div className="p-2 bg-indigo-600 text-white text-xs font-medium sticky left-0 z-10">Project</div>
//                                         {monthDays.map((day) => (
//                                             <div key={day} className="p-2 bg-indigo-600 text-white text-xs font-medium text-center">
//                                                 {day}
//                                             </div>
//                                         ))}
//                                     </div>

//                                     {/* Rows */}
//                                     {projects.map((project: any) => (
//                                         <div
//                                             key={project.id}
//                                             className="grid border-b bg-white hover:bg-gray-50"
//                                             style={{ gridTemplateColumns: `150px repeat(${daysInMonth}, 40px)` }}
//                                         >
//                                             <div className="p-2 text-sm font-medium text-gray-900 sticky left-0 bg-white z-10">{project.name}</div>
//                                             {monthDays.map((day) => (
//                                                 <div key={day} className="flex items-center justify-center py-2 text-sm">
//                                                     <span className={`${getValueColor(project.days[day])}`}>{project.days[day]}</span>
//                                                 </div>
//                                             ))}
//                                         </div>
//                                     ))}
//                                 </div>
//                             </div>
//                         )}

//                         {/* Legend */}
//                         <div className="p-4 border-t flex flex-wrap gap-6 items-center">
//                             {legendItems.map((item) => (
//                                 <div key={item.name} className="flex items-center gap-2">
//                                     <div className={`w-3 h-3 rounded-full ${item.color}`}></div>
//                                     <span className="text-xs text-gray-600">{item.name}</span>
//                                 </div>
//                             ))}
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }

import RouteHeader from '@/components/common/route-header';
import { useState } from 'react';
import { ChevronLeft, ChevronRight, Download } from 'lucide-react';

export default function Calendar() {
    const [viewMode, setViewMode] = useState<'weekly' | 'monthly'>('weekly');
    const [selectedDate, setSelectedDate] = useState(new Date());

    const projects: any = [
        {
            id: 1,
            name: 'Project 1',
            days: {
                1: 1,
                2: 3,
                3: 1,
                4: 6,
                5: 8,
                6: 0,
                7: 2,
                8: 4,
                9: 5,
                10: 0,
                11: 3,
                12: 1,
                13: 0,
                14: 2,
                15: 3,
                16: 6,
                17: 0,
                18: 2,
                19: 5,
                20: 1,
                21: 0,
                22: 0,
                23: 3,
                24: 2,
                25: 1,
                26: 0,
                27: 0,
                28: 2,
                29: 4,
                30: 0,
                31: 0,
            },
        },
        {
            id: 2,
            name: 'Project 2',
            days: {
                1: 2,
                2: 4,
                3: 0,
                4: 3,
                5: 7,
                6: 1,
                7: 0,
                8: 2,
                9: 0,
                10: 5,
                11: 4,
                12: 0,
                13: 1,
                14: 0,
                15: 2,
                16: 4,
                17: 1,
                18: 0,
                19: 0,
                20: 3,
                21: 1,
                22: 2,
                23: 0,
                24: 4,
                25: 5,
                26: 1,
                27: 0,
                28: 2,
                29: 0,
                30: 1,
                31: 0,
            },
        },
    ];

    const getValueColor: any = (value: number) => {
        if (value === 0) return 'text-gray-400';
        if (value <= 3) return 'text-green-500';
        if (value <= 6) return 'text-blue-500';
        return 'text-purple-500';
    };

    const handlePreviousPeriod = () => {
        if (viewMode === 'weekly') {
            const newDate = new Date(selectedDate);
            newDate.setDate(selectedDate.getDate() - 7);
            setSelectedDate(newDate);
        } else {
            const newDate = new Date(selectedDate);
            newDate.setMonth(selectedDate.getMonth() - 1);
            setSelectedDate(newDate);
        }
    };

    const handleNextPeriod = () => {
        if (viewMode === 'weekly') {
            const newDate = new Date(selectedDate);
            newDate.setDate(selectedDate.getDate() + 7);
            setSelectedDate(newDate);
        } else {
            const newDate = new Date(selectedDate);
            newDate.setMonth(selectedDate.getMonth() + 1);
            setSelectedDate(newDate);
        }
    };

    const weekDays = [
        { num: 1, name: 'Mon' },
        { num: 2, name: 'Tue' },
        { num: 3, name: 'Wed' },
        { num: 4, name: 'Thu' },
        { num: 5, name: 'Fri' },
        { num: 6, name: 'Sat' },
        { num: 7, name: 'Sun' },
    ];

    const daysInMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0).getDate();
    const monthDays = Array.from({ length: daysInMonth }, (_, i) => i + 1);

    const legendItems = [
        { name: 'Approved', color: 'bg-green-500' },
        { name: 'Unapproved', color: 'bg-red-500' },
        { name: 'Holiday', color: 'bg-black' },
        { name: 'Leave', color: 'bg-blue-500' },
    ];

    return (
        <div className="flex flex-col gap-4">
            <RouteHeader text="Calendar" />
            <div className="bg-white rounded-lg shadow p-6">
                <div className="flex flex-col gap-4">
                    <div className="bg-white rounded-lg shadow">
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 gap-4 border-b">
                            <div className="flex items-center space-x-3">
                                <button className="bg-green-500 hover:bg-green-600 text-white rounded-md px-3 py-2 flex items-center gap-2 text-sm">
                                    <Download className="h-4 w-4" />
                                    <span>Download Report</span>
                                </button>
                            </div>

                            <div className="flex items-center space-x-4">
                                <select
                                    value={viewMode}
                                    onChange={(e) => setViewMode(e.target.value as 'weekly' | 'monthly')}
                                    className="border rounded-md px-3 py-1 text-sm cursor-pointer"
                                >
                                    <option value="weekly">Weekly</option>
                                    <option value="monthly">Monthly</option>
                                </select>

                                <div className="flex items-center space-x-2 border rounded px-2 py-1">
                                    <button
                                        onClick={handlePreviousPeriod}
                                        className="p-1 text-indigo-600 hover:bg-gray-100 rounded-full"
                                        aria-label="Previous period"
                                    >
                                        <ChevronLeft className="h-5 w-5" />
                                    </button>

                                    <div className="text-indigo-600 font-medium min-w-[140px] text-center select-none">
                                        {viewMode === 'weekly'
                                            ? `Week of ${selectedDate.toLocaleDateString()}`
                                            : selectedDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
                                    </div>

                                    <button
                                        onClick={handleNextPeriod}
                                        className="p-1 text-indigo-600 hover:bg-gray-100 rounded-full"
                                        aria-label="Next period"
                                    >
                                        <ChevronRight className="h-5 w-5" />
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Calendar grid */}
                        {viewMode === 'monthly' ? (
                            <div className="overflow-x-auto">
                                <div className="min-w-[700px]">
                                    {/* Header */}
                                    <div className="grid grid-cols-[50px,150px,repeat(7,1fr)] bg-indigo-600 text-white">
                                        <div className="p-2 text-xs font-medium text-center">S.No</div>
                                        <div className="p-2 text-xs font-medium">Project</div>
                                        {weekDays.map((day) => (
                                            <div key={day.num} className="p-2 text-xs font-medium text-center">
                                                {day.name}
                                                <div>{day.num}</div>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Rows */}
                                    {projects.map((project: any, idx: number) => (
                                        <div
                                            key={project.id}
                                            className="grid grid-cols-[50px,150px,repeat(7,1fr)] border-b bg-white hover:bg-gray-50"
                                        >
                                            <div className="p-2 text-sm text-center font-medium text-gray-900">{idx + 1}</div>
                                            <div className="p-2 text-sm font-medium text-gray-900">{project.name}</div>
                                            {weekDays.map((day) => (
                                                <div key={day.num} className="flex items-center justify-center py-2 text-sm">
                                                    <span className={`${getValueColor(project.days[day.num])}`}>{project.days[day.num]}</span>
                                                </div>
                                            ))}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <div className={`min-w-[${150 + daysInMonth * 40}px]`}>
                                    {/* Header */}
                                    <div className="grid" style={{ gridTemplateColumns: `50px 150px repeat(${daysInMonth}, 40px)` }}>
                                        <div className="p-2 bg-indigo-600 text-white text-xs font-medium sticky left-0 z-20 text-center">S.No</div>
                                        <div className="p-2 bg-indigo-600 text-white text-xs font-medium sticky left-[50px] z-20">Project</div>
                                        {monthDays.map((day) => (
                                            <div key={day} className="p-2 bg-indigo-600 text-white text-xs font-medium text-center">
                                                {day}
                                            </div>
                                        ))}
                                    </div>

                                    {/* Rows */}
                                    {projects.map((project: any, idx: number) => (
                                        <div
                                            key={project.id}
                                            className="grid border-b bg-white hover:bg-gray-50"
                                            style={{ gridTemplateColumns: `50px 150px repeat(${daysInMonth}, 40px)` }}
                                        >
                                            <div className="p-2 text-sm text-center font-medium text-gray-900 sticky left-0 bg-white z-10">
                                                {idx + 1}
                                            </div>
                                            <div className="p-2 text-sm font-medium text-gray-900 sticky left-[50px] bg-white z-10">
                                                {project.name}
                                            </div>
                                            {monthDays.map((day) => (
                                                <div key={day} className="flex items-center justify-center py-2 text-sm">
                                                    <span className={`${getValueColor(project.days[day])}`}>{project.days[day]}</span>
                                                </div>
                                            ))}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Legend */}
                        <div className="p-4 border-t flex flex-wrap gap-6 items-center">
                            {legendItems.map((item) => (
                                <div key={item.name} className="flex items-center gap-2">
                                    <div className={`w-3 h-3 rounded-full ${item.color}`}></div>
                                    <span className="text-xs text-gray-600">{item.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
