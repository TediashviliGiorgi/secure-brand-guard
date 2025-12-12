import { useState } from "react";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Link } from "react-router-dom";

interface MobileNavProps {
  links: Array<{
    label: string;
    href: string;
  }>;
  children?: React.ReactNode;
}

export function MobileNav({ links, children }: MobileNavProps) {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-72 bg-background">
        <div className="flex flex-col gap-4 mt-8">
          {links.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className="text-lg font-medium hover:text-primary transition-colors py-2"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          {children && (
            <div className="pt-4 border-t border-border flex flex-col gap-3">
              {children}
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
