import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubItem,
    SidebarMenuSubButton,
    SidebarProvider,
} from '@/components/ui/sidebar';
import { Separator } from '../ui/separator';
import { Link, useLocation } from 'react-router-dom';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown } from 'lucide-react';
import { Icons } from '@/icons/icons';
import React from 'react';

type NavItem = {
    label: string;
    icon: keyof typeof Icons;
    path?: string;
    subItems?: NavItem[];
};

const navItems: NavItem[] = [
    {
        label: 'Dashboard',
        icon: 'dashboard',
        path: '/',
    },
    {
        label: 'Timesheet',
        icon: 'clock',
        path: '/timesheet',
    },
    {
        label: 'Project Extension',
        icon: 'fileText',
        path: '/project-extension',
    },
    {
        label: 'Calendar',
        icon: 'calendar',
        path: '/calendar',
    },
    {
        label: 'PM mapping',
        icon: 'userPlus',
        path: '/pm-mapping',
    },
    {
        label: 'Allotment',
        icon: 'vote',
        path: '/allotment',
        subItems: [
            {
                label: 'Team Allotment',
                icon: 'userPlus',
                path: '/team-allotment',
            },
            {
                label: 'Employee Allotment',
                icon: 'userPlus',
                path: '/employee-allotment',
            },
        ],
    },
    {
        label: 'Manage',
        icon: 'settings',
        subItems: [
            {
                label: 'Project Attributes',
                icon: 'briefcase',
                path: '/project-attributes',
            },
            {
                label: 'Timesheet Parameters',
                icon: 'clock',
                path: '/timesheet-parameters',
            },
            {
                label: 'Customer',
                icon: 'building',
                path: '/customer',
            },
            {
                label: 'Project Groups',
                icon: 'folderTree',
                path: '/project-groups',
            },
            {
                label: 'Teams',
                icon: 'users',
                path: '/teams',
            },
            {
                label: 'Team Project mapping',
                icon: 'userPlus',
                path: '/team-project-mapping',
            },
            {
                label: 'Projects',
                icon: 'briefcase',
                path: '/projects',
            },
        ],
    },
];

export function AppSidebar({ children }: { children: React.ReactNode }) {
    const location = useLocation();
    const pathname = location.pathname;

    return (
        <SidebarProvider>
            <Sidebar className="space-y-4 bg-background border-r h-screen">
                <SidebarHeader className="w-full py-4 px-6 flex flex-row items-center justify-between">
                    <img src="/logo.png" alt="Logo" className="max-h-8" />
                </SidebarHeader>
                <Separator />
                <SidebarContent className="flex-1 overflow-y-auto px-3">
                    <SidebarGroup>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                {navItems.map((item, index) => (
                                    <Collapsible
                                        key={item.path || `item-${index}`}
                                        className={`group/collapsible rounded-lg transition-all duration-200 ${
                                            pathname === item.path ? 'bg-primaryColor/10' : 'hover:bg-primaryColor/10'
                                        }`}
                                    >
                                        <SidebarMenuItem className={`py-1`}>
                                            {item.subItems && item.subItems.length > 0 ? (
                                                <CollapsibleTrigger asChild>
                                                    <SidebarMenuButton className="w-full px-2 py-2.5 rounded-lg flex items-center justify-between">
                                                        <div className="flex items-center gap-2">
                                                            {React.createElement(Icons[item.icon], {
                                                                className:
                                                                    'size-5 stroke-[1.5] text-primaryColor group-hover/collapsible:text-primaryColor transition-colors duration-200',
                                                            })}
                                                            <span className="text-sm font-medium ml-3 text-primaryColor/80 group-hover/collapsible:text-primaryColor transition-colors duration-200">
                                                                {item.label}
                                                            </span>
                                                        </div>
                                                        <ChevronDown className="ml-auto size-5 stroke-[1.5] text-primaryColor group-hover/collapsible:text-primaryColor transition-all duration-200 group-data-[state=open]/collapsible:rotate-180" />
                                                    </SidebarMenuButton>
                                                </CollapsibleTrigger>
                                            ) : (
                                                <SidebarMenuButton asChild className="w-full px-2 py-2.5 rounded-lg">
                                                    <Link
                                                        to={item.path || '/'}
                                                        className="text-primaryColor/80 hover:text-primaryColor transition-colors duration-200 flex items-center justify-between"
                                                    >
                                                        <div className="flex items-center gap-2">
                                                            {React.createElement(Icons[item.icon], {
                                                                className:
                                                                    'size-5 stroke-[1.5] text-primaryColor group-hover/collapsible:text-primaryColor transition-colors duration-200',
                                                            })}
                                                            <span className="text-sm font-medium ml-3 text-primaryColor/80 group-hover/collapsible:text-primaryColor transition-colors duration-200">
                                                                {item.label}
                                                            </span>
                                                        </div>
                                                    </Link>
                                                </SidebarMenuButton>
                                            )}
                                            {item.subItems && item.subItems.length > 0 && (
                                                <CollapsibleContent className="mt-1">
                                                    <SidebarMenuSub className="pl-2.5 space-y-1 text-primaryColor/80">
                                                        {item.subItems.map((subItem, subIndex) => (
                                                            <SidebarMenuSubItem
                                                                key={subItem.path || `subitem-${index}-${subIndex}`}
                                                                className={`rounded-md transition-all duration-200 ${
                                                                    pathname === subItem.path ? 'bg-primaryColor/10' : 'hover:bg-primaryColor/10'
                                                                }`}
                                                            >
                                                                <SidebarMenuSubButton asChild className="w-full px-1.5 py-2 rounded-md">
                                                                    <Link
                                                                        to={subItem.path || '/'}
                                                                        className="text-primaryColor/80 hover:text-primaryColor transition-colors duration-200 flex items-center"
                                                                    >
                                                                        {React.createElement(Icons[subItem.icon], {
                                                                            className:
                                                                                'size-5 stroke-[1.5] text-primaryColor/80 group-hover:text-primaryColor transition-colors duration-200',
                                                                        })}
                                                                        <span className="text-sm ml-1 text-primaryColor/80 group-hover/collapsible:text-primaryColor transition-colors duration-200">
                                                                            {subItem.label}
                                                                        </span>
                                                                    </Link>
                                                                </SidebarMenuSubButton>
                                                            </SidebarMenuSubItem>
                                                        ))}
                                                    </SidebarMenuSub>
                                                </CollapsibleContent>
                                            )}
                                        </SidebarMenuItem>
                                    </Collapsible>
                                ))}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                </SidebarContent>
                <SidebarFooter className="py-4 border-t mt-auto">
                    <div className="flex items-center justify-center px-4">
                        <button className="flex items-center gap-2 text-red-500 hover:text-red-700 transition-colors duration-200">
                            {React.createElement(Icons.logOut, {
                                className: 'size-5 stroke-[1.5]',
                            })}
                            <span className="text-sm font-medium">Logout</span>
                        </button>
                    </div>
                </SidebarFooter>
            </Sidebar>
            <div className="flex-1 overflow-y-auto p-4">{children}</div>
        </SidebarProvider>
    );
}
