import type { ReactNode } from "react";
import { Link, useLocation } from "@tanstack/react-router";
import { Icon } from "./icons";

interface Props {
  children: ReactNode;
  tabBar?: boolean;
  fullBleed?: boolean;
}

/** MobileShell — same phone-column pattern as s-life for preview.html iframe. */
export function MobileShell({ children, tabBar = false }: Props) {
  return (
    <div className="min-h-screen w-full flex justify-center bg-[color:var(--background)]">
      <div
        className="relative w-full max-w-[440px] min-h-screen bg-background overflow-hidden"
        style={{ boxShadow: "0 0 0 1px var(--border)" }}
      >
        <div className={`min-h-screen ${tabBar ? "pb-24" : ""}`}>{children}</div>
        {tabBar && <TabBar />}
      </div>
    </div>
  );
}

const TABS = [
  { to: "/home", icon: Icon.Home, label: "Home" },
  { to: "/services", icon: Icon.Wrench, label: "Services" },
  { to: "/book", icon: Icon.Calendar, label: "Book" },
  { to: "/appointments", icon: Icon.Clipboard, label: "Jobs" },
  { to: "/me", icon: Icon.User, label: "Account" },
] as const;

function TabBar() {
  const { pathname } = useLocation();
  return (
    <nav className="absolute bottom-0 inset-x-0 bg-[color:var(--background)] border-t border-border">
      <ul className="grid grid-cols-5 pt-2 pb-4">
        {TABS.map((t) => {
          const active = pathname === t.to || (t.to !== "/home" && pathname.startsWith(t.to));
          const Ico = t.icon;
          return (
            <li key={t.to}>
              <Link
                to={t.to}
                className={`flex flex-col items-center gap-1.5 py-1 ${active ? "text-primary" : "text-mute"}`}
              >
                <Ico className={`w-6 h-6 ${active ? "text-primary" : "text-[color:var(--mute)]"}`} />
                <span className="text-[10px] uppercase tracking-[0.08em] font-semibold">{t.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export function TopBar({
  title,
  back,
  right,
  overline,
}: {
  title?: string;
  back?: string | boolean;
  right?: ReactNode;
  overline?: string;
}) {
  return (
    <div className="flex items-center h-14 px-5 border-b border-border">
      {back && (
        <Link
          to={(typeof back === "string" ? back : "/home") as any}
          className="mr-2 -ml-1 p-1 text-foreground hover:text-primary"
        >
          <Icon.ArrowLeft className="w-6 h-6" />
        </Link>
      )}
      <div className="flex-1 min-w-0">
        {overline && <p className="overline">{overline}</p>}
        {title && (
          <h1 className="font-display font-semibold text-[17px] tracking-tight text-foreground truncate">
            {title}
          </h1>
        )}
      </div>
      {right && <div className="flex items-center gap-3">{right}</div>}
    </div>
  );
}
