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
import { LayoutDashboard, Package, PlusCircle, Users, BarChart3, ShieldCheck, Settings, Hexagon } from "lucide-react";

const items = [
  { title: "Panel", url: "/emisor", icon: LayoutDashboard },
  { title: "Mis Activos Tokenizados", url: "/emisor/assets", icon: Package },
  { title: "Crear Token", url: "/emisor/create", icon: PlusCircle },
  { title: "Inversores", url: "/emisor/investors", icon: Users },
  { title: "Reportes", url: "/emisor/reports", icon: BarChart3 },
  { title: "Compliance", url: "/emisor/compliance", icon: ShieldCheck },
  { title: "Configuración", url: "/emisor/settings", icon: Settings },
];

export function IssuerSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();

  return (
    <Sidebar collapsible="icon" className="border-r border-border bg-card">
      <div className="h-16 flex items-center gap-2 px-4 border-b border-border">
        <Hexagon className="w-7 h-7 text-accent shrink-0" />
        {!collapsed && (
          <div className="flex flex-col">
            <span className="font-display text-lg font-bold leading-tight">TOKENIZA</span>
            <span className="text-[10px] text-muted-foreground uppercase tracking-widest">Emisor</span>
          </div>
        )}
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
                      end={item.url === "/emisor"}
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
