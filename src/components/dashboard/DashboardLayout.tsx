import { Outlet, Link } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { LogOut, User, ArrowLeftRight } from "lucide-react";
import NotificationDropdown from "@/components/NotificationDropdown";

const DashboardLayout = () => {
  const { user, signOut } = useAuth();

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <DashboardSidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <header className="h-16 flex items-center justify-between border-b border-border px-4">
            <SidebarTrigger className="ml-0" />
            <div className="flex items-center gap-3">
              <Link to="/emisor">
                <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground">
                  <ArrowLeftRight className="w-4 h-4" />
                  <span className="hidden md:inline">Ir a Emisor</span>
                </Button>
              </Link>
              <NotificationDropdown />
              <span className="text-sm text-muted-foreground hidden sm:block">{user?.email}</span>
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                <User className="w-4 h-4 text-primary" />
              </div>
              <Button variant="ghost" size="icon" onClick={signOut} title="Cerrar sesión">
                <LogOut className="w-4 h-4" />
              </Button>
            </div>
          </header>
          <main className="flex-1 p-4 md:p-6 overflow-auto">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;
