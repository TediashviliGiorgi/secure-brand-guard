import { NavLink } from "@/components/NavLink";
import { Home, Package, BarChart3, Shield, Settings } from "lucide-react";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

const navItems = [
  {
    labelKey: "nav.dashboard",
    icon: Home,
    path: "/dashboard",
  },
  {
    labelKey: "nav.batches",
    icon: Package,
    path: "/dashboard/batches",
  },
  {
    labelKey: "nav.analytics",
    icon: BarChart3,
    path: "/dashboard/analytics",
  },
  {
    labelKey: "nav.security",
    icon: Shield,
    path: "/dashboard/security",
  },
  {
    labelKey: "nav.settings",
    icon: Settings,
    path: "/settings",
  },
];

export const BottomNav = () => {
  const location = useLocation();
  const { t } = useTranslation();

  // Only show on dashboard-related routes
  const showBottomNav = location.pathname.startsWith("/dashboard") || location.pathname.startsWith("/settings");

  if (!showBottomNav) return null;

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background border-t shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-around h-16">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path || 
                           (item.path === "/dashboard/batches" && location.pathname.startsWith("/dashboard/batches"));
            
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className="flex flex-col items-center justify-center gap-1 px-3 py-2 rounded-lg transition-colors hover:bg-muted/50 min-w-[60px]"
                activeClassName="text-primary font-medium"
              >
                <item.icon className={`w-5 h-5 ${isActive ? "text-primary" : "text-muted-foreground"}`} />
                <span className={`text-xs ${isActive ? "text-primary font-medium" : "text-muted-foreground"}`}>
                  {t(item.labelKey)}
                </span>
              </NavLink>
            );
          })}
        </div>
      </div>
    </nav>
  );
};
