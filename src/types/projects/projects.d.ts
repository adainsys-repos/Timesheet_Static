export interface Project {
    projectCode: string;
    projectName: string;
    startDate: string;
    endDate: string;
    operatingUnit: string;
}

export interface ProjectGroup {
    projectId: string;
    projectName: string;
}
