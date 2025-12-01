import { useLocation, Link } from "react-router-dom";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useTranslation } from "react-i18next";

const routeNameMap: Record<string, string> = {
  dashboard: "Dashboard",
  batches: "Batches",
  create: "Create Batch",
  analytics: "Analytics",
  security: "Security",
  settings: "Settings",
  tags: "Tags",
  compare: "Compare",
};

export const DynamicBreadcrumb = () => {
  const location = useLocation();
  const { t } = useTranslation();
  
  const pathnames = location.pathname.split("/").filter((x) => x);
  
  // Don't show breadcrumb on home or auth pages
  if (pathnames.length === 0 || pathnames[0] === "login" || pathnames[0] === "register") {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-4 animate-fade-in">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to="/">Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          
          {pathnames.map((pathname, index) => {
            const isLast = index === pathnames.length - 1;
            const to = `/${pathnames.slice(0, index + 1).join("/")}`;
            
            // Skip if it's an ID (numeric or UUID pattern)
            if (/^[0-9a-f-]{20,}$/i.test(pathname) || /^\d+$/.test(pathname)) {
              return null;
            }
            
            const label = routeNameMap[pathname] || pathname.charAt(0).toUpperCase() + pathname.slice(1);
            
            return (
              <div key={to} className="flex items-center gap-1.5">
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  {isLast ? (
                    <BreadcrumbPage>{label}</BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink asChild>
                      <Link to={to}>{label}</Link>
                    </BreadcrumbLink>
                  )}
                </BreadcrumbItem>
              </div>
            );
          })}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
};
