import RouteHeader from '@/components/common/route-header';
import AssignProjectGroup from '@/components/team-project-mapping/project-groups/assign-project-group/page';
import AssignedProjectGroups from '@/components/team-project-mapping/project-groups/assigned-project-groups/page';
import AssignProjects from '@/components/team-project-mapping/projects/assign-projects/page';
import AssignedProjects from '@/components/team-project-mapping/projects/assigned-projects/page';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function TeamProjectMapping() {
    return (
        <div className="flex flex-col gap-4 overflow-y-auto">
            <RouteHeader text="Team Project Mapping" />
            <div className="flex flex-col gap-4">
                <Select>
                    <SelectTrigger className="w-96">
                        <SelectValue placeholder="Select a team" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="1">Team 1</SelectItem>
                        <SelectItem value="2">Team 2</SelectItem>
                        <SelectItem value="3">Team 3</SelectItem>
                    </SelectContent>
                </Select>
                <Tabs defaultValue="assign-project" className="">
                    <TabsList>
                        <TabsTrigger value="assign-project">Assign Project</TabsTrigger>
                        <TabsTrigger value="assign-project-group">Assign Project Group</TabsTrigger>
                    </TabsList>
                    <TabsContent value="assign-project" className="flex flex-col gap-6">
                        <div className="flex flex-col gap-4">
                            <h1 className="text-lg font-bold">Assigned Project List</h1>
                            <AssignedProjects />
                        </div>
                        <div className="flex flex-col gap-4">
                            <h1 className="text-lg font-bold">Add Projects to Group</h1>
                            <AssignProjects />
                        </div>
                    </TabsContent>
                    <TabsContent value="assign-project-group" className="flex flex-col gap-6">
                        <div className="flex flex-col gap-4">
                            <h1 className="text-lg font-bold">Assigned Project List</h1>
                            <AssignedProjectGroups />
                        </div>
                        <div className="flex flex-col gap-4">
                            <h1 className="text-lg font-bold">Add Projects to Group</h1>
                            <AssignProjectGroup />
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
}
