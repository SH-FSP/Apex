import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMemo } from "react";
import { MobileShell, TopBar } from "@/components/slife/MobileShell";
import { Avatar, Button, StatusPill } from "@/components/slife/ui";
import { Icon } from "@/components/slife/icons";
import { getService, loadAppointments, saveAppointments } from "@/lib/mock-data";

export const Route = createFileRoute("/appointment/$id")({
  component: AppointmentDetail,
});

function AppointmentDetail() {
  const { id } = Route.useParams();
  const nav = useNavigate();
  const appt = useMemo(() => loadAppointments().find((a) => a.id === id), [id]);
  const service = appt ? getService(appt.serviceId) : undefined;

  if (!appt) {
    return (
      <MobileShell tabBar>
        <TopBar title="Not found" back="/appointments" />
        <div className="px-6 py-10 text-center">
          <p className="text-body">This appointment could not be found.</p>
          <Button className="mt-6" onClick={() => nav({ to: "/appointments" })}>
            Back to list
          </Button>
        </div>
      </MobileShell>
    );
  }

  function cancel() {
    const list = loadAppointments().map((a) =>
      a.id === id ? { ...a, status: "Cancelled" as const } : a,
    );
    saveAppointments(list);
    nav({ to: "/appointments" });
  }

  return (
    <MobileShell tabBar>
      <TopBar title="Appointment" back="/appointments" right={<StatusPill status={appt.status} />} />
      <div className="pb-8 fade-in-up">
        {service && (
          <img src={service.image} alt="" className="w-full h-44 object-cover" />
        )}
        <div className="px-5 pt-5 space-y-5">
          <div>
            <p className="overline">Service</p>
            <h1 className="mt-1 text-[24px] font-bold text-foreground">{appt.serviceName}</h1>
            <p className="mt-1 text-[13px] text-mute">{appt.propertyType}</p>
          </div>

          <div className="hairline bg-[color:var(--surface)] p-4 space-y-3">
            <Info icon={Icon.Calendar} label="Date" value={appt.date} />
            <Info icon={Icon.Clock} label="Time" value={appt.time} />
            <Info icon={Icon.Pin} label="Address" value={appt.address} />
            {appt.notes && <Info icon={Icon.Clipboard} label="Notes" value={appt.notes} />}
          </div>

          {appt.technician && (
            <div className="hairline bg-[color:var(--surface)] p-4 flex items-center gap-3">
              <Avatar src={appt.technician.image} alt={appt.technician.name} size={48} />
              <div>
                <p className="text-[14px] font-semibold text-foreground">{appt.technician.name}</p>
                <p className="text-[12px] text-mute">{appt.technician.role}</p>
                <p className="text-[12px] text-primary mt-0.5 flex items-center gap-1">
                  <Icon.Star className="w-3.5 h-3.5" /> {appt.technician.rating}
                </p>
              </div>
            </div>
          )}

          {appt.status === "Scheduled" && (
            <div className="space-y-3">
              <Button full onClick={() => nav({ to: "/book", search: { service: appt.serviceId } })}>
                Reschedule
              </Button>
              <Button full variant="destructive" onClick={cancel}>
                Cancel appointment
              </Button>
            </div>
          )}
        </div>
      </div>
    </MobileShell>
  );
}

function Info({
  icon: Ico,
  label,
  value,
}: {
  icon: typeof Icon.Calendar;
  label: string;
  value: string;
}) {
  return (
    <div className="flex gap-3">
      <Ico className="w-5 h-5 text-primary shrink-0 mt-0.5" />
      <div>
        <p className="text-[11px] uppercase tracking-[0.08em] font-semibold text-mute">{label}</p>
        <p className="text-[14px] text-foreground mt-0.5">{value}</p>
      </div>
    </div>
  );
}
