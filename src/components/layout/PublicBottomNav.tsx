import { NavLink } from "@/components/NavLink";
import { Home, Sparkles, DollarSign, Mail, LogIn, UserPlus, MoreHorizontal, Info } from "lucide-react";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const mainNavItems = [
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
    labelKey: "nav.signIn",
    icon: LogIn,
    path: "/login",
  },
  {
    labelKey: "nav.getStarted",
    icon: UserPlus,
    path: "/register",
  },
];

const moreNavItems = [
  {
    labelKey: "nav.about",
    icon: Info,
    path: "/about",
  },
  {
    labelKey: "nav.contact",
    icon: Mail,
    path: "/contact",
  },
];

export const PublicBottomNav = () => {
  const location = useLocation();
  const { t } = useTranslation();
  const [moreOpen, setMoreOpen] = useState(false);

  // Only show on public routes (not dashboard or auth pages)
  const publicRoutes = ["/", "/features", "/pricing", "/about", "/contact"];
  const showBottomNav = publicRoutes.includes(location.pathname);

  if (!showBottomNav) return null;

  const isMoreActive = moreNavItems.some(item => location.pathname === item.path);

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background border-t shadow-lg md:hidden">
      <div className="container mx-auto px-2">
        <div className="flex items-center justify-around h-16">
          {mainNavItems.map((item) => {
            const isActive = location.pathname === item.path;
            const isGetStarted = item.path === "/register";
            
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={`flex flex-col items-center justify-center gap-1 px-2 py-2 rounded-lg transition-colors min-w-[50px] ${
                  isGetStarted 
                    ? "bg-primary text-primary-foreground hover:bg-primary/90" 
                    : "hover:bg-muted/50"
                }`}
                activeClassName={isGetStarted ? "" : "text-primary font-medium"}
              >
                <item.icon className={`w-5 h-5 ${
                  isGetStarted 
                    ? "text-primary-foreground" 
                    : isActive 
                      ? "text-primary" 
                      : "text-muted-foreground"
                }`} />
                <span className={`text-[10px] ${
                  isGetStarted 
                    ? "text-primary-foreground font-medium" 
                    : isActive 
                      ? "text-primary font-medium" 
                      : "text-muted-foreground"
                }`}>
                  {t(item.labelKey)}
                </span>
              </NavLink>
            );
          })}
          
          {/* More Menu */}
          <Popover open={moreOpen} onOpenChange={setMoreOpen}>
            <PopoverTrigger asChild>
              <button
                className={`flex flex-col items-center justify-center gap-1 px-2 py-2 rounded-lg transition-colors min-w-[50px] hover:bg-muted/50 ${
                  isMoreActive ? "text-primary font-medium" : ""
                }`}
              >
                <MoreHorizontal className={`w-5 h-5 ${isMoreActive ? "text-primary" : "text-muted-foreground"}`} />
                <span className={`text-[10px] ${isMoreActive ? "text-primary font-medium" : "text-muted-foreground"}`}>
                  {t("nav.more")}
                </span>
              </button>
            </PopoverTrigger>
            <PopoverContent 
              side="top" 
              align="end" 
              className="w-48 p-2 bg-background border shadow-lg z-50"
              sideOffset={8}
            >
              <div className="flex flex-col gap-1">
                {moreNavItems.map((item) => {
                  const isActive = location.pathname === item.path;
                  return (
                    <NavLink
                      key={item.path}
                      to={item.path}
                      onClick={() => setMoreOpen(false)}
                      className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors hover:bg-muted ${
                        isActive ? "bg-muted text-primary font-medium" : "text-foreground"
                      }`}
                    >
                      <item.icon className={`w-4 h-4 ${isActive ? "text-primary" : "text-muted-foreground"}`} />
                      <span className="text-sm">{t(item.labelKey)}</span>
                    </NavLink>
                  );
                })}
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </nav>
  );
};
