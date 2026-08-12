import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo } from "react";
import { MobileShell } from "@/components/slife/MobileShell";
import { Avatar, LinkButton, LogoSlot, SectionLabel, StatusPill } from "@/components/slife/ui";
import { Icon } from "@/components/slife/icons";
import { COMPANY, CURRENT_USER, SERVICES, loadAppointments } from "@/lib/mock-data";
import hero from "@/assets/apex/hero-hvac.jpg";

export const Route = createFileRoute("/home")({
  component: Home,
});

function Home() {
  const upcoming = useMemo(
    () => loadAppointments().filter((a) => a.status === "Scheduled").slice(0, 2),
    [],
  );
  const featured = SERVICES.filter((s) =>
    ["heating", "ac", "electrical", "maintenance"].includes(s.id),
  );

  return (
    <MobileShell tabBar>
      <div className="sticky top-0 z-20 flex items-center gap-3 h-[4.25rem] px-5 border-b border-border/70 bg-[color:var(--background)]/88 backdrop-blur-md">
        <LogoSlot size={118} maxHeight={50} />
        <div className="flex-1" />
        <Link
          to="/notifications"
          className="relative flex items-center justify-center w-10 h-10 rounded-xl text-foreground bg-[color:var(--surface)] border border-border/80 hover:border-primary/40 hover:text-primary transition"
          aria-label="Notifications"
        >
          <Icon.Bell className="w-5 h-5" />
          <span className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-[color:var(--accent)]" />
        </Link>
      </div>

      <div className="px-5 pt-5 pb-10 fade-in-up">
        <div className="flex items-end justify-between gap-3">
          <div>
            <p className="text-[13px] text-mute">Good afternoon</p>
            <h1 className="mt-0.5 text-[26px] font-bold text-foreground tracking-tight">
              {CURRENT_USER.name.split(" ")[0]}
            </h1>
          </div>
          <div className="text-right">
            <p className="text-[10px] uppercase tracking-[0.12em] font-semibold text-primary">
              {COMPANY.heritageShort}
            </p>
            <p className="text-[11px] text-mute mt-0.5">HVACR specialists</p>
          </div>
        </div>

        <div className="relative overflow-hidden hairline soft-glow h-[13.5rem] mt-5">
          <img src={hero} alt="" className="absolute inset-0 w-full h-full object-cover scale-[1.02]" />
          <div className="absolute inset-0 scrim-bottom" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#070d18]/75 via-[#070d18]/25 to-transparent" />
          <div className="relative z-10 h-full flex flex-col justify-end p-5">
            <p className="overline text-white/90">Schedule service</p>
            <h2 className="text-[24px] font-bold text-white leading-[1.15] mt-1 max-w-[15rem]">
              Book your next visit
            </h2>
            <p className="text-[13px] text-white/75 mt-1.5 mb-4 max-w-[16rem]">
              Heating, cooling, electrical & maintenance — on your schedule.
            </p>
            <div className="flex gap-2">
              <LinkButton to="/book" variant="accent" className="h-11 px-4 text-[12px]">
                Book now
              </LinkButton>
              <LinkButton
                to="/quote"
                variant="secondary"
                className="h-11 px-4 text-[12px] bg-white/10 border-white/25 text-white hover:bg-white/15"
              >
                Get a quote
              </LinkButton>
            </div>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-4 gap-2">
          {COMPANY.audiences.map((a) => (
            <div
              key={a}
              className="panel px-2 py-3 text-center"
            >
              <Icon.Building className="w-4 h-4 text-primary mx-auto" />
              <p className="mt-1.5 text-[10px] font-semibold text-foreground leading-tight">{a}</p>
            </div>
          ))}
        </div>

        <div className="mt-8">
          <div className="flex items-center justify-between mb-3">
            <SectionLabel>Popular services</SectionLabel>
            <Link
              to="/services"
              className="text-[12px] font-semibold text-primary -mt-3 hover:underline"
            >
              See all
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {featured.map((s, i) => (
              <Link
                key={s.id}
                to="/book"
                search={{ service: s.id } as any}
                className="group relative overflow-hidden hairline soft-glow bg-[color:var(--surface)] fade-in-up"
                style={{ animationDelay: `${i * 40}ms` }}
              >
                <div className="h-[5.5rem] overflow-hidden relative">
                  <img
                    src={s.image}
                    alt=""
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[color:var(--surface)] via-transparent to-transparent" />
                </div>
                <div className="p-3.5 pt-2">
                  <p className="text-[14px] font-semibold text-foreground">{s.name}</p>
                  <p className="text-[12px] text-mute mt-0.5 line-clamp-1">{s.short}</p>
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
              className="text-[12px] font-semibold text-primary -mt-3 hover:underline"
            >
              View jobs
            </Link>
          </div>
          {upcoming.length === 0 ? (
            <div className="panel p-6 text-center">
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
                  className="block panel p-4 hover:border-primary/40 transition-colors"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="text-[15px] font-semibold text-foreground">{a.serviceName}</p>
                      <p className="mt-1.5 text-[13px] text-body flex items-center gap-1.5">
                        <Icon.Calendar className="w-4 h-4 text-primary" />
                        {a.date} · {a.time}
                      </p>
                      <p className="mt-1 text-[12px] text-mute flex items-center gap-1.5">
                        <Icon.Pin className="w-3.5 h-3.5" />
                        <span className="truncate">{a.address}</span>
                      </p>
                    </div>
                    <StatusPill status={a.status} />
                  </div>
                  {a.technician && (
                    <div className="mt-3.5 pt-3 border-t border-border/80 flex items-center gap-2.5">
                      <Avatar src={a.technician.image} alt={a.technician.name} size={30} />
                      <div className="min-w-0">
                        <p className="text-[12px] font-semibold text-foreground">{a.technician.name}</p>
                        <p className="text-[11px] text-mute">{a.technician.role}</p>
                      </div>
                    </div>
                  )}
                </Link>
              ))}
            </div>
          )}
        </div>

        <div className="mt-8 panel p-4 flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-[color:var(--accent)] flex items-center justify-center shrink-0">
            <Icon.Phone className="w-5 h-5 text-white" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-[14px] font-semibold text-foreground">Need help now?</p>
            <p className="text-[12px] text-mute">Call support or use the AI assistant</p>
          </div>
          <a
            href={`tel:${COMPANY.phoneTel}`}
            className="h-10 px-4 rounded-xl bg-[color:var(--accent)]/15 text-[12px] font-semibold text-[color:var(--accent)] flex items-center"
          >
            Call
          </a>
        </div>
      </div>
    </MobileShell>
  );
}
