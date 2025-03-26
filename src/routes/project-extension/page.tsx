import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import RouteHeader from '@/components/common/route-header';

export default function ProjectExtension() {
    return (
        <div className="flex flex-col gap-4">
            <RouteHeader text="Project Extension" />
            <div className="flex gap-6">
                <div className="bg-white rounded-lg shadow p-6 w-1/2 space-y-4">
                    <div className="space-y-2">
                        <label className="block text-sm font-semibold text-gray-700">Project</label>
                        <Select>
                            <SelectTrigger>
                                <SelectValue placeholder="Select Project" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="project1">Project 1</SelectItem>
                                <SelectItem value="project2">Project 2</SelectItem>
                                <SelectItem value="project3">Project 3</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <label className="block text-sm font-semibold text-gray-700">Start Date</label>
                        <Input
                            type="date" placeholder="02-Feb-2025"/>
                    </div>
                    <div className="space-y-2">
                        <label className="block text-sm font-semibold text-gray-700">Current End Date</label>
                        <Input type="date" placeholder="Current End Date"/>
                    </div>

                    <div className="space-y-2">
                        <label className="block text-sm font-semibold text-gray-700">New End Date</label>
                        <Input type="date" />
                    </div>
                    <div className="space-y-2">
                        <label className="block text-sm font-semibold text-gray-700">Quoted Weeks</label>
                        <Input type="number"/>
                    </div>
                    <Button className="w-full mt-4">REQUEST</Button>
                </div>
            </div>
        </div>
    );
}