import type { ReactNode } from "react";
import { Link, useLocation } from "@tanstack/react-router";
import { Icon } from "./icons";

interface Props {
  children: ReactNode;
  tabBar?: boolean;
  fullBleed?: boolean;
}

/** Viewport-locked phone column; content scrolls, tab bar stays fixed. */
export function MobileShell({ children, tabBar = false }: Props) {
  const { pathname } = useLocation();
  const hideFab = pathname.startsWith("/assistant") || pathname.startsWith("/book");

  return (
    <div className="h-dvh w-full flex justify-center bg-[#040810] overflow-hidden">
      <div
        className="relative w-full max-w-[440px] h-dvh max-h-dvh bg-background flex flex-col overflow-hidden"
        style={{
          boxShadow: "0 0 0 1px rgba(47,111,219,0.18), 0 24px 80px rgba(0,0,0,0.45)",
        }}
      >
        <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-[radial-gradient(ellipse_at_top,rgba(47,111,219,0.18),transparent_70%)] z-0" />
        <div className="relative z-10 flex-1 min-h-0 overflow-y-auto overscroll-contain">{children}</div>
        {tabBar && !hideFab && (
          <Link
            to="/assistant"
            className="absolute bottom-[5.75rem] right-4 z-40 w-12 h-12 rounded-2xl bg-[color:var(--accent)] text-white soft-glow flex items-center justify-center hover:brightness-110 active:scale-95 transition"
            aria-label="Open Apex AI assistant"
          >
            <Icon.Chat className="w-5 h-5" />
          </Link>
        )}
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
    <nav className="shrink-0 z-30 border-t border-border/80 bg-[color:var(--background)]/92 backdrop-blur-md safe-bottom">
      <ul className="grid grid-cols-5 pt-1.5 pb-1.5 px-1">
        {TABS.map((t) => {
          const active = pathname === t.to || (t.to !== "/home" && pathname.startsWith(t.to));
          const Ico = t.icon;
          return (
            <li key={t.to}>
              <Link
                to={t.to}
                className={`relative flex flex-col items-center gap-1 py-2 rounded-xl mx-0.5 transition-colors ${
                  active ? "text-primary bg-primary/10" : "text-mute hover:text-body"
                }`}
              >
                <Ico className={`w-[22px] h-[22px] ${active ? "text-primary" : ""}`} />
                <span className="text-[10px] tracking-[0.04em] font-semibold">{t.label}</span>
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
    <div className="sticky top-0 z-20 flex items-center min-h-14 px-5 py-2 border-b border-border/80 bg-[color:var(--background)]/90 backdrop-blur-md">
      {back && (
        <Link
          to={(typeof back === "string" ? back : "/home") as any}
          className="mr-2 -ml-1 p-2 rounded-xl text-foreground hover:bg-[color:var(--surface)] hover:text-primary transition"
        >
          <Icon.ArrowLeft className="w-5 h-5" />
        </Link>
      )}
      <div className="flex-1 min-w-0">
        {overline && <p className="overline text-[10px] mb-0.5">{overline}</p>}
        {title && (
          <h1 className="font-display font-semibold text-[17px] tracking-tight text-foreground truncate">
            {title}
          </h1>
        )}
      </div>
      {right && <div className="flex items-center gap-2">{right}</div>}
    </div>
  );
}
