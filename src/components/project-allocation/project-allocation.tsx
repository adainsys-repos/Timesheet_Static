import RouteHeader from '@/components/common/route-header';
import AssignProjectGroup from '@/components/project-allocation/project-groups/assign-project-group/page';
import AssignedProjectGroups from '@/components/project-allocation/project-groups/assigned-project-groups/page';
import AssignProjects from '@/components/project-allocation/projects/assign-projects/page';
import AssignedProjects from '@/components/project-allocation/projects/assigned-projects/page';
import { Button } from '@/components/ui/button';
import { Icons } from '@/icons/icons';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Sheet, SheetTitle, SheetContent, SheetHeader, SheetTrigger, SheetDescription } from '../ui/sheet';
import SearchBar from '../common/search';

export default function ProjectAllocation({ type }: { type: 'teams' | 'employees' }) {
    return (
        <div className="flex flex-col gap-4 overflow-y-auto">
            <RouteHeader text={`${type === 'teams' ? 'Team' : 'Employee'} Project Allocation`} />
            <div className="flex flex-col gap-4">
                <SearchBar placeholder="Search" paramName="search" className="ml-0" onSearch={() => {}} />
                <Tabs defaultValue="assign-project" className="w-full">
                    <TabsList>
                        <TabsTrigger value="assign-project">Assign Project</TabsTrigger>
                        <TabsTrigger value="assign-project-group">Assign Project Group</TabsTrigger>
                    </TabsList>
                    <TabsContent value="assign-project" className="flex flex-col gap-6">
                        <div className="flex flex-col gap-4">
                            <div className="flex flex-row justify-between items-center">
                                <h1 className="text-lg font-bold">Assigned Project List</h1>
                                <Sheet>
                                    <SheetTrigger>
                                        <Button className="flex flex-row gap-2">
                                            <Icons.plus />
                                            Add Project
                                        </Button>
                                    </SheetTrigger>
                                    <SheetContent className="!max-w-5xl w-[60%]">
                                        <SheetHeader>
                                            <SheetTitle>Add Project</SheetTitle>
                                            <SheetDescription className="pt-4">
                                                <AssignProjects type={type} />
                                            </SheetDescription>
                                        </SheetHeader>
                                    </SheetContent>
                                </Sheet>
                            </div>
                            <AssignedProjects type={type} />
                        </div>
                    </TabsContent>
                    <TabsContent value="assign-project-group" className="flex flex-col gap-6">
                        <div className="flex flex-col gap-4">
                            <div className="flex flex-row justify-between items-center">
                                <h1 className="text-lg font-bold">Assigned Project Groups</h1>
                                <Sheet>
                                    <SheetTrigger>
                                        <Button className="flex flex-row gap-2">
                                            <Icons.plus />
                                            Add Project Group
                                        </Button>
                                    </SheetTrigger>
                                    <SheetContent className="!max-w-5xl w-[60%]">
                                        <SheetHeader>
                                            <SheetTitle>Add Project Group</SheetTitle>
                                            <SheetDescription className="pt-4">
                                                <AssignProjectGroup type={type} />
                                            </SheetDescription>
                                        </SheetHeader>
                                    </SheetContent>
                                </Sheet>
                            </div>{' '}
                            <AssignedProjectGroups type={type} />
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
}
