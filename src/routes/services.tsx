import { createFileRoute, Link } from "@tanstack/react-router";
import { MobileShell, TopBar } from "@/components/slife/MobileShell";
import { SERVICES } from "@/lib/mock-data";
import { Icon } from "@/components/slife/icons";

export const Route = createFileRoute("/services")({
  component: Services,
});

function Services() {
  return (
    <MobileShell tabBar>
      <TopBar overline="Catalog" title="Services" />
      <div className="px-5 py-5 space-y-4 pb-8 fade-in-up">
        <p className="text-[14px] text-body">
          HVACR mechanical & electrical — installs, repairs, and preventive maintenance.
        </p>
        {SERVICES.map((s) => (
          <Link
            key={s.id}
            to="/book"
            search={{ service: s.id } as any}
            className="flex gap-3 hairline bg-[color:var(--surface)] overflow-hidden hover:border-primary/50"
          >
            <img src={s.image} alt="" className="w-28 h-28 object-cover shrink-0" />
            <div className="py-3 pr-3 flex-1 min-w-0 flex flex-col">
              <p className="text-[15px] font-semibold text-foreground">{s.name}</p>
              <p className="text-[12px] text-mute mt-0.5">{s.short}</p>
              <p className="text-[12px] text-body mt-2 line-clamp-2">{s.description}</p>
              <div className="mt-auto pt-2 flex items-center justify-between">
                <span className="text-[11px] uppercase tracking-[0.06em] text-primary font-semibold">
                  {s.fromPrice}
                </span>
                <span className="text-mute flex items-center gap-1 text-[11px]">
                  Book <Icon.Chevron className="w-4 h-4" />
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </MobileShell>
  );
}
