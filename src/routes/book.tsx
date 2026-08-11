import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { addDays, format } from "date-fns";
import { MobileShell, TopBar } from "@/components/slife/MobileShell";
import { Button, Chip, Field, TextArea } from "@/components/slife/ui";
import { Icon } from "@/components/slife/icons";
import {
  PROPERTY_TYPES,
  SERVICES,
  TECHNICIANS,
  TIME_SLOTS,
  type Appointment,
  type PropertyType,
  getService,
  loadAppointments,
  saveAppointments,
} from "@/lib/mock-data";

type BookSearch = { service?: string };

export const Route = createFileRoute("/book")({
  validateSearch: (s: Record<string, unknown>): BookSearch => ({
    service: typeof s.service === "string" ? s.service : undefined,
  }),
  component: BookAppointment,
});

function BookAppointment() {
  const { service: preselect } = Route.useSearch();
  const nav = useNavigate();
  const [step, setStep] = useState(preselect ? 1 : 0);
  const [serviceId, setServiceId] = useState(preselect ?? "");
  const [propertyType, setPropertyType] = useState<PropertyType>("Residential");
  const [address, setAddress] = useState("1842 Maple Ave, Suite 2");
  const [notes, setNotes] = useState("");
  const [dateIdx, setDateIdx] = useState(1);
  const [time, setTime] = useState("10:00 AM");
  const [doneId, setDoneId] = useState<string | null>(null);

  const dates = useMemo(
    () =>
      Array.from({ length: 7 }, (_, i) => {
        const d = addDays(new Date(), i + 1);
        return {
          key: format(d, "yyyy-MM-dd"),
          label: format(d, "EEE"),
          day: format(d, "d"),
          full: format(d, "MMM d, yyyy"),
        };
      }),
    [],
  );

  const service = getService(serviceId);

  function confirm() {
    if (!service) return;
    const id = `a${Date.now()}`;
    const appt: Appointment = {
      id,
      serviceId: service.id,
      serviceName: service.name,
      date: dates[dateIdx].full,
      time,
      address,
      propertyType,
      status: "Scheduled",
      notes: notes || undefined,
      technician: TECHNICIANS[0],
    };
    const list = loadAppointments();
    saveAppointments([appt, ...list]);
    setDoneId(id);
    setStep(4);
  }

  if (step === 4 && doneId) {
    return (
      <MobileShell tabBar>
        <TopBar title="Confirmed" />
        <div className="px-6 py-10 flex flex-col items-center text-center fade-in">
          <div className="w-16 h-16 bg-primary flex items-center justify-center mb-6">
            <Icon.Check className="w-8 h-8 text-primary-foreground" strokeWidth={2.5} />
          </div>
          <p className="overline">You're booked</p>
          <h1 className="mt-2 text-[26px] font-bold text-foreground">Appointment confirmed</h1>
          <p className="mt-3 text-[14px] text-body max-w-[300px]">
            {service?.name} on {dates[dateIdx].full} at {time}. We'll send a reminder before arrival.
          </p>
          <div className="mt-8 w-full space-y-3">
            <Button full onClick={() => nav({ to: "/appointment/$id", params: { id: doneId } })}>
              View details
            </Button>
            <Button full variant="secondary" onClick={() => nav({ to: "/appointments" })}>
              My appointments
            </Button>
          </div>
        </div>
      </MobileShell>
    );
  }

  return (
    <MobileShell tabBar>
      <TopBar
        overline={`Step ${step + 1} of 4`}
        title="Book appointment"
        back={step === 0 ? "/home" : undefined}
        right={
          step > 0 && step < 4 ? (
            <button
              type="button"
              onClick={() => setStep((s) => Math.max(0, s - 1))}
              className="text-[12px] uppercase tracking-[0.06em] font-semibold text-mute"
            >
              Back
            </button>
          ) : undefined
        }
      />

      <div className="px-5 py-5 pb-8 fade-in-up">
        <div className="flex gap-1.5 mb-6">
          {[0, 1, 2, 3].map((n) => (
            <span
              key={n}
              className={`h-[3px] flex-1 transition-colors ${n <= step ? "bg-primary" : "bg-border"}`}
            />
          ))}
        </div>

        {step === 0 && (
          <div className="space-y-3">
            <h2 className="text-[20px] font-bold text-foreground">What do you need?</h2>
            <p className="text-[14px] text-body mb-2">Select a service to continue.</p>
            {SERVICES.map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => {
                  setServiceId(s.id);
                  setStep(1);
                }}
                className={`w-full text-left flex gap-3 hairline p-3 transition-colors ${
                  serviceId === s.id ? "border-primary bg-primary/10" : "bg-[color:var(--surface)]"
                }`}
              >
                <img src={s.image} alt="" className="w-16 h-16 object-cover shrink-0" />
                <div className="min-w-0 flex-1">
                  <p className="text-[15px] font-semibold text-foreground">{s.name}</p>
                  <p className="text-[12px] text-mute mt-0.5">{s.short}</p>
                  <p className="text-[11px] text-primary mt-1 font-semibold uppercase tracking-[0.06em]">
                    {s.fromPrice} · {s.duration}
                  </p>
                </div>
                <Icon.Chevron className="w-5 h-5 text-mute self-center" />
              </button>
            ))}
          </div>
        )}

        {step === 1 && (
          <div className="space-y-5">
            <div>
              <h2 className="text-[20px] font-bold text-foreground">Job details</h2>
              <p className="text-[14px] text-body mt-1">
                Service: <span className="text-foreground font-medium">{service?.name}</span>
              </p>
            </div>
            <div>
              <p className="mb-2 text-[11px] uppercase tracking-[0.08em] font-semibold text-mute">
                Property type
              </p>
              <div className="flex flex-wrap gap-2">
                {PROPERTY_TYPES.map((t) => (
                  <Chip
                    key={t}
                    label={t}
                    active={propertyType === t}
                    onClick={() => setPropertyType(t)}
                  />
                ))}
              </div>
            </div>
            <Field
              label="Service address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
            <TextArea
              label="Describe the issue (optional)"
              placeholder="e.g. AC not cooling upstairs bedroom…"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
            <Button full disabled={!address.trim()} onClick={() => setStep(2)}>
              Choose date & time
            </Button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-5">
            <div>
              <h2 className="text-[20px] font-bold text-foreground">Pick a time</h2>
              <p className="text-[14px] text-body mt-1">Technicians available weekdays & weekends.</p>
            </div>
            <div>
              <p className="mb-2 text-[11px] uppercase tracking-[0.08em] font-semibold text-mute">
                Date
              </p>
              <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1">
                {dates.map((d, idx) => (
                  <button
                    key={d.key}
                    type="button"
                    onClick={() => setDateIdx(idx)}
                    className={`shrink-0 w-14 h-16 border flex flex-col items-center justify-center ${
                      dateIdx === idx
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border bg-[color:var(--surface)] text-foreground"
                    }`}
                  >
                    <span className="text-[10px] uppercase tracking-wider opacity-80">{d.label}</span>
                    <span className="text-[18px] font-bold">{d.day}</span>
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p className="mb-2 text-[11px] uppercase tracking-[0.08em] font-semibold text-mute">
                Time slot
              </p>
              <div className="grid grid-cols-3 gap-2">
                {TIME_SLOTS.map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setTime(t)}
                    className={`h-10 text-[12px] font-semibold border ${
                      time === t
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border bg-[color:var(--surface)] text-foreground"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
            <Button full onClick={() => setStep(3)}>
              Review booking
            </Button>
          </div>
        )}

        {step === 3 && service && (
          <div className="space-y-5">
            <div>
              <h2 className="text-[20px] font-bold text-foreground">Confirm</h2>
              <p className="text-[14px] text-body mt-1">Double-check details before submitting.</p>
            </div>
            <div className="hairline bg-[color:var(--surface)] overflow-hidden">
              <img src={service.image} alt="" className="w-full h-36 object-cover" />
              <div className="p-4 space-y-3">
                <Row label="Service" value={service.name} />
                <Row label="When" value={`${dates[dateIdx].full} · ${time}`} />
                <Row label="Property" value={propertyType} />
                <Row label="Address" value={address} />
                {notes ? <Row label="Notes" value={notes} /> : null}
                <Row label="Estimate" value={service.fromPrice} />
              </div>
            </div>
            <Button full variant="accent" onClick={confirm}>
              Confirm appointment
            </Button>
          </div>
        )}
      </div>
    </MobileShell>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex gap-3 justify-between">
      <span className="text-[11px] uppercase tracking-[0.08em] font-semibold text-mute shrink-0">
        {label}
      </span>
      <span className="text-[14px] text-foreground text-right">{value}</span>
    </div>
  );
}
