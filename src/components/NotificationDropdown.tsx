import { useState, useEffect } from "react";
import { Bell, Check, Coins, FileCheck, MessageCircle, ShieldCheck, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

export interface Notification {
  id: string;
  type: "investment" | "dividend" | "asset" | "kyc" | "message";
  title: string;
  description: string;
  time: string;
  read: boolean;
}

const NOTIFICATION_ICONS = {
  investment: Coins,
  dividend: TrendingUp,
  asset: FileCheck,
  kyc: ShieldCheck,
  message: MessageCircle,
};

const NOTIFICATION_COLORS = {
  investment: "text-blue-400",
  dividend: "text-green-400",
  asset: "text-purple-400",
  kyc: "text-yellow-400",
  message: "text-pink-400",
};

const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: "1",
    type: "dividend",
    title: "Dividendo Recibido",
    description: "Has recibido $125.50 de Torre Santa Fe",
    time: "Hace 2 horas",
    read: false,
  },
  {
    id: "2",
    type: "asset",
    title: "Nuevo Activo Listado",
    description: "Centro Comercial Plaza Norte disponible para inversión",
    time: "Hace 5 horas",
    read: false,
  },
  {
    id: "3",
    type: "kyc",
    title: "KYC Aprobado",
    description: "Tu verificación de identidad ha sido aprobada",
    time: "Ayer",
    read: true,
  },
  {
    id: "4",
    type: "investment",
    title: "Inversión Confirmada",
    description: "Tu inversión de $500 en Edificio Centro ha sido procesada",
    time: "Hace 2 días",
    read: true,
  },
  {
    id: "5",
    type: "message",
    title: "Mensaje del Emisor",
    description: "Actualización sobre el proyecto Bodega Industrial",
    time: "Hace 3 días",
    read: true,
  },
];

const NotificationDropdown = () => {
  const [notifications, setNotifications] = useState<Notification[]>(MOCK_NOTIFICATIONS);
  const [open, setOpen] = useState(false);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const markAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="w-5 h-5" />
          {unreadCount > 0 && (
            <Badge className="absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center text-xs">
              {unreadCount}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <div className="flex items-center justify-between p-3 border-b border-border">
          <h3 className="font-semibold">Notificaciones</h3>
          {unreadCount > 0 && (
            <Button variant="ghost" size="sm" className="text-xs h-7" onClick={markAllAsRead}>
              <Check className="w-3 h-3 mr-1" /> Marcar todas
            </Button>
          )}
        </div>
        <ScrollArea className="h-80">
          {notifications.length === 0 ? (
            <div className="p-8 text-center text-muted-foreground">
              <Bell className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <p className="text-sm">No tienes notificaciones</p>
            </div>
          ) : (
            notifications.map((notification) => {
              const Icon = NOTIFICATION_ICONS[notification.type];
              const colorClass = NOTIFICATION_COLORS[notification.type];
              
              return (
                <DropdownMenuItem
                  key={notification.id}
                  className={`p-3 cursor-pointer ${!notification.read ? "bg-primary/5" : ""}`}
                  onClick={() => markAsRead(notification.id)}
                >
                  <div className="flex gap-3 w-full">
                    <div className={`w-8 h-8 rounded-full bg-muted flex items-center justify-center shrink-0 ${colorClass}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="font-medium text-sm truncate">{notification.title}</p>
                        {!notification.read && (
                          <div className="w-2 h-2 rounded-full bg-primary shrink-0" />
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground truncate">{notification.description}</p>
                      <p className="text-xs text-muted-foreground mt-1">{notification.time}</p>
                    </div>
                  </div>
                </DropdownMenuItem>
              );
            })
          )}
        </ScrollArea>
        <DropdownMenuSeparator />
        <div className="p-2">
          <Button variant="ghost" size="sm" className="w-full text-xs">
            Ver todas las notificaciones
          </Button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NotificationDropdown;
