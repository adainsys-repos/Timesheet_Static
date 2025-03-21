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
    SidebarMenuSubButton,
    SidebarMenuSubItem,
    SidebarProvider,
} from '@/components/ui/sidebar';
import { Separator } from '../ui/separator';
import { Icons } from '@/icons/icons';
import { Link } from 'react-router-dom';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown } from 'lucide-react';

type NavItem = {
    label: string;
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
    path?: string;
    subItems?: NavItem[];
};

const navItems: NavItem[] = [
    {
        label: 'Home',
        icon: Icons.home,
        subItems: [
            {
                label: 'Home',
                icon: Icons.home,
                path: '/',
            },
        ],
    },
    {
        label: 'Projects',
        icon: Icons.home,
        subItems: [
            {
                label: 'Home',
                icon: Icons.home,
                path: '/',
            },
        ],
    },
    {
        label: 'Teams',
        icon: Icons.home,
        path: '/projects',
    },
];

export function AppSidebar({ children }: { children: React.ReactNode }) {
    return (
        <SidebarProvider>
            <Sidebar className="space-y-2">
                <SidebarHeader>
                    <img src="/logo.png" alt="alt" className="w-fit h-auto max-h-10" />
                </SidebarHeader>
                <Separator />
                <SidebarContent className="flex-1 overflow-y-auto">
                    <SidebarGroup>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                {navItems.map((item, index) => (
                                    <Collapsible key={item.path || `item-${index}`} className="group/collapsible">
                                        <SidebarMenuItem>
                                            {item.subItems && item.subItems.length > 0 ? (
                                                <CollapsibleTrigger asChild>
                                                    <SidebarMenuButton>
                                                        <item.icon className="size-6 stroke-[1.5]" />
                                                        <span className="text-base font-medium">{item.label}</span>
                                                        <ChevronDown className="ml-auto size-6 stroke-[1.5] transition-transform group-data-[state=open]/collapsible:rotate-180" />
                                                    </SidebarMenuButton>
                                                </CollapsibleTrigger>
                                            ) : (
                                                <SidebarMenuButton asChild>
                                                    <Link to={item.path || '/'}>
                                                        <item.icon className="size-6 stroke-[1.5]" />
                                                        <span className="text-base font-medium">{item.label}</span>
                                                    </Link>
                                                </SidebarMenuButton>
                                            )}
                                            {item.subItems && item.subItems.length > 0 && (
                                                <CollapsibleContent>
                                                    <SidebarMenuSub>
                                                        {item.subItems.map((subItem, subIndex) => (
                                                            <SidebarMenuSubItem key={subItem.path || `subitem-${index}-${subIndex}`}>
                                                                <SidebarMenuSubButton asChild>
                                                                    <Link to={subItem.path || '/'}>
                                                                        <subItem.icon className="size-5 stroke-[1.5]" />
                                                                        <span className="text-base font-medium">{subItem.label}</span>
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
                <SidebarFooter />
            </Sidebar>
            <div className="flex-1 overflow-hidden">{children}</div>
        </SidebarProvider>
    );
}
