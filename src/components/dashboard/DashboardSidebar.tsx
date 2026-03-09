import { useLocation } from "react-router-dom";
import { NavLink } from "@/components/NavLink";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { LayoutDashboard, Briefcase, Store, Coins, Wallet, ArrowLeftRight, GraduationCap, Settings, Hexagon } from "lucide-react";

const items = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "Mi Portafolio", url: "/dashboard/portfolio", icon: Briefcase },
  { title: "Marketplace", url: "/dashboard/marketplace", icon: Store },
  { title: "Mis Tokens", url: "/dashboard/tokens", icon: Coins },
  { title: "Wallet", url: "/dashboard/wallet", icon: Wallet },
  { title: "Transacciones", url: "/dashboard/transactions", icon: ArrowLeftRight },
  { title: "Academia", url: "/dashboard/academy", icon: GraduationCap },
  { title: "Configuración", url: "/dashboard/settings", icon: Settings },
];

export function DashboardSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();

  return (
    <Sidebar collapsible="icon" className="border-r border-border bg-card">
      <div className="h-16 flex items-center gap-2 px-4 border-b border-border">
        <Hexagon className="w-7 h-7 text-accent shrink-0" />
        {!collapsed && <span className="font-display text-lg font-bold">TOKENIZA</span>}
      </div>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      end={item.url === "/dashboard"}
                      className="hover:bg-muted/50"
                      activeClassName="bg-primary/10 text-primary font-medium"
                    >
                      <item.icon className="mr-2 h-4 w-4 shrink-0" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
