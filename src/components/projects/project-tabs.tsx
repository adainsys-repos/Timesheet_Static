import { Tabs, TabsList, TabsTrigger, TabsContent } from '../ui/tabs';
import Allocation from './allocation';
import Assignment from './assignment';
import Configuration from './configuration';
import Main from './main';
import TimeSheetParameters from './time-sheet-parameters';

const ProjectTabs = () => {
    return (
        <Tabs defaultValue="main" className="w-full pt-4">
            <TabsList className="bg-transparent rounded-none flex items-end justify-start space-x-4 ">
                <TabsTrigger
                    value="main"
                    className="!bg-transparent rounded-none border-b-2 border-transparent data-[state=active]:!border-b-2 data-[state=active]:!border-primaryColor data-[state=active]:text-primaryColor py-2"
                >
                    Main
                </TabsTrigger>
                <TabsTrigger
                    value="configuration"
                    className="!bg-transparent rounded-none border-b-2 border-transparent data-[state=active]:!border-b-2 data-[state=active]:!border-primaryColor data-[state=active]:text-primaryColor py-2"
                >
                    Configuration
                </TabsTrigger>
                <TabsTrigger
                    value="timeSheetParameters"
                    className="!bg-transparent rounded-none border-b-2 border-transparent data-[state=active]:!border-b-2 data-[state=active]:!border-primaryColor data-[state=active]:text-primaryColor py-2"
                >
                    Time Sheet Parameters
                </TabsTrigger>
                <TabsTrigger
                    value="assignment"
                    className="!bg-transparent rounded-none border-b-2 border-transparent data-[state=active]:!border-b-2 data-[state=active]:!border-primaryColor data-[state=active]:text-primaryColor py-2"
                >
                    Assignment
                </TabsTrigger>
                <TabsTrigger
                    value="allocation"
                    className="!bg-transparent rounded-none border-b-2 border-transparent data-[state=active]:!border-b-2 data-[state=active]:!border-primaryColor data-[state=active]:text-primaryColor py-2"
                >
                    Allocation
                </TabsTrigger>
            </TabsList>
            <TabsContent value="main">
                <Main />
            </TabsContent>
            <TabsContent value="configuration">
                <Configuration />
            </TabsContent>
            <TabsContent value="timeSheetParameters">
                <TimeSheetParameters />
            </TabsContent>
            <TabsContent value="assignment">
                <Assignment />
            </TabsContent>
            <TabsContent value="allocation">
                <Allocation />
            </TabsContent>
        </Tabs>
    );
};

export default ProjectTabs;
