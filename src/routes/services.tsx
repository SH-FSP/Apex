import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { MobileShell, TopBar } from "@/components/slife/MobileShell";
import { Chip } from "@/components/slife/ui";
import { Icon } from "@/components/slife/icons";
import { COMPANY, SERVICES, type ServiceCategory } from "@/lib/mock-data";

export const Route = createFileRoute("/services")({
  component: Services,
});

const FILTERS: Array<"All" | ServiceCategory> = [
  "All",
  "Climate",
  "Mechanical",
  "Electrical",
  "Maintenance",
];

function Services() {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All");
  const list = useMemo(
    () => (filter === "All" ? SERVICES : SERVICES.filter((s) => s.category === filter)),
    [filter],
  );

  return (
    <MobileShell tabBar>
      <TopBar overline="Catalog" title="Services" />
      <div className="px-5 py-5 space-y-4 pb-10 fade-in-up">
        <p className="text-[14px] text-body leading-relaxed">{COMPANY.positioning}</p>

        <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1">
          {FILTERS.map((f) => (
            <Chip key={f} label={f} active={filter === f} onClick={() => setFilter(f)} />
          ))}
        </div>

        {list.map((s) => (
          <Link
            key={s.id}
            to="/book"
            search={{ service: s.id } as any}
            className="flex gap-0 panel overflow-hidden hover:border-primary/40 transition-colors soft-glow"
          >
            <img src={s.image} alt="" className="w-[6.5rem] self-stretch object-cover shrink-0" />
            <div className="p-3.5 flex-1 min-w-0 flex flex-col">
              <p className="text-[11px] font-semibold text-primary tracking-wide">{s.category}</p>
              <p className="text-[15px] font-semibold text-foreground mt-0.5">{s.name}</p>
              <p className="text-[12px] text-body mt-1.5 line-clamp-2 leading-snug">{s.description}</p>
              <div className="mt-auto pt-2.5 flex items-center justify-between">
                <span className="text-[11px] text-mute font-medium">{s.duration}</span>
                <span className="text-primary flex items-center gap-0.5 text-[12px] font-semibold">
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
