import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { MobileShell, TopBar } from "@/components/slife/MobileShell";
import { Chip, LinkButton, StatusPill } from "@/components/slife/ui";
import { Icon } from "@/components/slife/icons";
import { loadAppointments, type AppointmentStatus } from "@/lib/mock-data";

export const Route = createFileRoute("/appointments")({
  component: Appointments,
});

const FILTERS: Array<"All" | AppointmentStatus> = [
  "All",
  "Scheduled",
  "In Progress",
  "Completed",
  "Cancelled",
];

function Appointments() {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All");
  const list = useMemo(() => {
    const all = loadAppointments();
    if (filter === "All") return all;
    return all.filter((a) => a.status === filter);
  }, [filter]);

  return (
    <MobileShell tabBar>
      <TopBar overline="Jobs" title="Appointments" />
      <div className="px-5 py-5 pb-8 fade-in-up">
        <div className="flex gap-2 overflow-x-auto pb-3 -mx-1 px-1">
          {FILTERS.map((f) => (
            <Chip key={f} label={f} active={filter === f} onClick={() => setFilter(f)} />
          ))}
        </div>

        {list.length === 0 ? (
          <div className="mt-6 panel p-6 text-center">
            <p className="text-[14px] text-body">No appointments in this view.</p>
            <LinkButton to="/book" className="mt-4" full>
              Book appointment
            </LinkButton>
          </div>
        ) : (
          <div className="space-y-3 mt-2">
            {list.map((a) => (
              <Link
                key={a.id}
                to="/appointment/$id"
                params={{ id: a.id }}
                className="block panel p-4 hover:border-primary/40 transition-colors"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-[15px] font-semibold text-foreground">{a.serviceName}</p>
                    <p className="mt-1.5 text-[13px] text-body flex items-center gap-1.5">
                      <Icon.Calendar className="w-4 h-4 text-primary" />
                      {a.date} · {a.time}
                    </p>
                    <p className="mt-1 text-[12px] text-mute flex items-center gap-1.5">
                      <Icon.Pin className="w-3.5 h-3.5" />
                      {a.address}
                    </p>
                  </div>
                  <StatusPill status={a.status} />
                </div>
              </Link>
            ))}
          </div>
        )}

        <div className="mt-6">
          <LinkButton to="/book" full>
            Book new appointment
          </LinkButton>
        </div>
      </div>
    </MobileShell>
  );
}
