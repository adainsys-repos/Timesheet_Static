import RouteHeader from '@/components/common/route-header';
import SearchBar from '@/components/common/search';
import AssignProjects from '@/components/project-allocation/projects/assign-projects/page';
import AssignedProjects from '@/components/project-allocation/projects/assigned-projects/page';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Icons } from '@/icons/icons';

export default function ProjectGroupById() {
    return (
        <>
            <div className="flex flex-col gap-4">
                <RouteHeader text="Project Groups" />
                <div className="flex items-center gap-2 justify-end">
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
                                    <AssignProjects type="employees" />
                                </SheetDescription>
                            </SheetHeader>
                        </SheetContent>
                    </Sheet>
                    <SearchBar placeholder="Search" paramName="search" className="ml-0" onSearch={() => {}} />
                </div>
                <AssignedProjects type="employees" />
            </div>
        </>
    );
}
