import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo } from "react";
import { MobileShell, TopBar } from "@/components/slife/MobileShell";
import { Avatar, LinkButton, SectionLabel, StatusPill } from "@/components/slife/ui";
import { Icon } from "@/components/slife/icons";
import { CURRENT_USER, SERVICES, loadAppointments } from "@/lib/mock-data";
import hero from "@/assets/apex/hero-hvac.jpg";

export const Route = createFileRoute("/home")({
  component: Home,
});

function Home() {
  const upcoming = useMemo(
    () => loadAppointments().filter((a) => a.status === "Scheduled").slice(0, 2),
    [],
  );
  const featured = SERVICES.slice(0, 4);

  return (
    <MobileShell tabBar>
      <TopBar
        overline="Apex Climate"
        title={`Hi, ${CURRENT_USER.name.split(" ")[0]}`}
        right={
          <Link to="/notifications" className="text-foreground hover:text-primary">
            <Icon.Bell className="w-6 h-6" />
          </Link>
        }
      />

      <div className="px-5 pt-5 pb-8 fade-in-up">
        <div className="relative overflow-hidden hairline h-44">
          <img src={hero} alt="" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 scrim-bottom" />
          <div className="relative z-10 h-full flex flex-col justify-end p-4">
            <p className="overline text-white">Schedule service</p>
            <h2 className="text-[22px] font-bold text-white leading-tight mt-1">
              Book an appointment
            </h2>
            <p className="text-[13px] text-white/80 mt-1 mb-3">
              Heating · AC · Electrical · Maintenance
            </p>
            <LinkButton to="/book" variant="accent" className="self-start h-10 px-4">
              Book now
            </LinkButton>
          </div>
        </div>

        <div className="mt-8">
          <div className="flex items-center justify-between mb-3">
            <SectionLabel>Our services</SectionLabel>
            <Link
              to="/services"
              className="text-[11px] uppercase tracking-[0.08em] font-semibold text-primary -mt-3"
            >
              View all
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {featured.map((s) => (
              <Link
                key={s.id}
                to="/book"
                search={{ service: s.id } as any}
                className="group relative overflow-hidden hairline bg-[color:var(--surface)]"
              >
                <div className="h-24 overflow-hidden">
                  <img
                    src={s.image}
                    alt=""
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-3">
                  <p className="text-[14px] font-semibold text-foreground">{s.name}</p>
                  <p className="text-[12px] text-mute mt-0.5">{s.short}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-8">
          <div className="flex items-center justify-between mb-3">
            <SectionLabel>Upcoming</SectionLabel>
            <Link
              to="/appointments"
              className="text-[11px] uppercase tracking-[0.08em] font-semibold text-primary -mt-3"
            >
              All jobs
            </Link>
          </div>
          {upcoming.length === 0 ? (
            <div className="hairline bg-[color:var(--surface)] p-5 text-center">
              <p className="text-[14px] text-body">No upcoming appointments.</p>
              <LinkButton to="/book" className="mt-4" full>
                Book service
              </LinkButton>
            </div>
          ) : (
            <div className="space-y-3">
              {upcoming.map((a) => (
                <Link
                  key={a.id}
                  to="/appointment/$id"
                  params={{ id: a.id }}
                  className="block hairline bg-[color:var(--surface)] p-4 hover:border-primary/50"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-[15px] font-semibold text-foreground">{a.serviceName}</p>
                      <p className="mt-1 text-[13px] text-body flex items-center gap-1.5">
                        <Icon.Calendar className="w-4 h-4 text-mute" />
                        {a.date} · {a.time}
                      </p>
                      <p className="mt-1 text-[12px] text-mute flex items-center gap-1.5">
                        <Icon.Pin className="w-3.5 h-3.5" />
                        {a.address}
                      </p>
                    </div>
                    <StatusPill status={a.status} />
                  </div>
                  {a.technician && (
                    <div className="mt-3 pt-3 border-t border-border flex items-center gap-2">
                      <Avatar src={a.technician.image} alt={a.technician.name} size={28} />
                      <span className="text-[12px] text-body">{a.technician.name}</span>
                    </div>
                  )}
                </Link>
              ))}
            </div>
          )}
        </div>

        <div className="mt-8 hairline bg-[color:var(--elevated)] p-4 flex items-center gap-3">
          <div className="w-10 h-10 bg-[color:var(--accent)] flex items-center justify-center shrink-0">
            <Icon.Phone className="w-5 h-5 text-white" />
          </div>
          <div className="min-w-0">
            <p className="text-[13px] font-semibold text-foreground">Emergency line</p>
            <p className="text-[12px] text-mute">24/7 for critical HVAC failures</p>
          </div>
          <a
            href="tel:+15550142281"
            className="ml-auto text-[12px] uppercase tracking-[0.06em] font-semibold text-[color:var(--accent)]"
          >
            Call
          </a>
        </div>
      </div>
    </MobileShell>
  );
}
