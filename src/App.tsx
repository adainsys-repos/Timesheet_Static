import { Route } from 'react-router-dom';
import { Routes } from 'react-router-dom';
import './styles/index.css';
import { Protected } from './components/guard/protected.guard';
import RootLayoutWrapper from './components/layout/root-wrapper.layout';
import Dashboard from './routes/dashboard/page';
import ProjectAttributes from './routes/(manage)/project-attributes/page';
import Customer from './routes/(manage)/customer/page';
import TeamProjectMapping from './routes/(manage)/team-project-mapping/page';
import ProjectGroups from './routes/(manage)/project-groups/page';
import Teams from './routes/(manage)/teams/page';
import TimesheetParameters from './routes/(manage)/timesheet-parameters/page';
import Timesheet from './routes/timesheet/page';
import ProjectExtension from './routes/project-extension/page';
import Calendar from './routes/calendar/page';
import PMMapping from './routes/pm-mapping/page';
import Projects from './routes/(manage)/projects/page';
import ProjectTabs from './components/projects/project-tabs';
import LoginPage from './routes/sign-in/page';
import TeamAllotment from './routes/(allotment)/team-allotment/page';
import EmployeeAllotment from './routes/(allotment)/employee-allotment/page';
import AddEmployeeToTeam from './components/teams/add-employee-to-teams';

function App() {
    return (
        <>
            <Routes>
                {/* <Route path="/sign-in" element={<SignInPage />} /> */}
                <Route path="/sign-in" element={<LoginPage />} />

                <Route element={<Protected />}>
                    <Route element={<RootLayoutWrapper />}>
                        <Route path="/" element={<Dashboard />} />
                        <Route path="/timesheet" element={<Timesheet />} />
                        <Route path="/project-extension" element={<ProjectExtension />} />
                        <Route path="/calendar" element={<Calendar />} />
                        <Route path="/pm-mapping" element={<PMMapping />} />

                        {/* Allotment */}
                        <Route path="/team-allotment" element={<TeamAllotment />} />
                        <Route path="/employee-allotment" element={<EmployeeAllotment />} />

                        {/* Manage */}
                        <Route path="/project-attributes" element={<ProjectAttributes />} />
                        <Route path="/timesheet-parameters" element={<TimesheetParameters />} />
                        <Route path="/customer" element={<Customer />} />
                        <Route path="/project-groups" element={<ProjectGroups />} />
                        <Route path="/teams" element={<Teams />} />
                        <Route path="/team-project-mapping" element={<TeamProjectMapping />} />
                        <Route path="/projects" element={<Projects />} />
                        {/* {Project Tabs} */}
                        <Route path="/projects/:id" element={<ProjectTabs />} />
                        <Route path="/add-employee-to-team" element={<AddEmployeeToTeam />} />
                    </Route>
                </Route>
            </Routes>
        </>
    );
}

export default App;
