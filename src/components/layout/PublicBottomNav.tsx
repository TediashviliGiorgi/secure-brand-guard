import { NavLink } from "@/components/NavLink";
import { Home, Sparkles, DollarSign, Info, Mail, LogIn } from "lucide-react";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

const navItems = [
  {
    labelKey: "nav.home",
    icon: Home,
    path: "/",
  },
  {
    labelKey: "nav.features",
    icon: Sparkles,
    path: "/features",
  },
  {
    labelKey: "nav.pricing",
    icon: DollarSign,
    path: "/pricing",
  },
  {
    labelKey: "nav.about",
    icon: Info,
    path: "/about",
  },
  {
    labelKey: "nav.signIn",
    icon: LogIn,
    path: "/login",
  },
];

export const PublicBottomNav = () => {
  const location = useLocation();
  const { t } = useTranslation();

  // Only show on public routes (not dashboard or auth pages)
  const publicRoutes = ["/", "/features", "/pricing", "/about", "/contact"];
  const showBottomNav = publicRoutes.includes(location.pathname);

  if (!showBottomNav) return null;

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background border-t shadow-lg md:hidden">
      <div className="container mx-auto px-2">
        <div className="flex items-center justify-around h-16">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className="flex flex-col items-center justify-center gap-1 px-2 py-2 rounded-lg transition-colors hover:bg-muted/50 min-w-[50px]"
                activeClassName="text-primary font-medium"
              >
                <item.icon className={`w-5 h-5 ${isActive ? "text-primary" : "text-muted-foreground"}`} />
                <span className={`text-[10px] ${isActive ? "text-primary font-medium" : "text-muted-foreground"}`}>
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
