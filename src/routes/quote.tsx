import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { MobileShell, TopBar } from "@/components/slife/MobileShell";
import { Button, Chip, Field, TextArea } from "@/components/slife/ui";
import { Icon } from "@/components/slife/icons";
import {
  COMPANY,
  PROPERTY_TYPES,
  SERVICES,
  type PropertyType,
} from "@/lib/mock-data";

export const Route = createFileRoute("/quote")({
  component: RequestQuote,
});

function RequestQuote() {
  const nav = useNavigate();
  const [serviceId, setServiceId] = useState(SERVICES[0]?.id ?? "");
  const [propertyType, setPropertyType] = useState<PropertyType>("Commercial");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [details, setDetails] = useState("");
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <MobileShell tabBar>
        <TopBar title="Quote request" back="/home" />
        <div className="px-6 py-10 flex flex-col items-center text-center fade-in">
          <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center mb-6">
            <Icon.Check className="w-8 h-8 text-primary-foreground" strokeWidth={2.5} />
          </div>
          <p className="overline">Received</p>
          <h1 className="mt-2 text-[26px] font-bold text-foreground">Quote request sent</h1>
          <p className="mt-3 text-[14px] text-body max-w-[300px]">
            An Apex specialist will follow up with pricing for your {propertyType.toLowerCase()}{" "}
            project. Prefer a set time? Book an appointment instead.
          </p>
          <div className="mt-8 w-full space-y-3">
            <Button full onClick={() => nav({ to: "/book", search: { service: serviceId } })}>
              Book appointment
            </Button>
            <Button full variant="secondary" onClick={() => nav({ to: "/home" })}>
              Back to home
            </Button>
          </div>
        </div>
      </MobileShell>
    );
  }

  return (
    <MobileShell tabBar>
      <TopBar overline="Lead generation" title="Request a quote" back="/home" />
      <div className="px-5 py-5 pb-8 space-y-5 fade-in-up">
        <p className="text-[14px] text-body">
          Tell us about the job. We serve residential, commercial, institutional, and government
          clients across HVACR, mechanical, and electrical work.
        </p>

        <div>
          <p className="mb-2 text-[11px] uppercase tracking-[0.08em] font-semibold text-mute">
            Service needed
          </p>
          <div className="flex flex-wrap gap-2">
            {SERVICES.map((s) => (
              <Chip
                key={s.id}
                label={s.name}
                active={serviceId === s.id}
                onClick={() => setServiceId(s.id)}
              />
            ))}
          </div>
        </div>

        <div>
          <p className="mb-2 text-[11px] uppercase tracking-[0.08em] font-semibold text-mute">
            Customer type
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
          label="Full name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
          required
        />
        <Field
          label="Phone"
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder={COMPANY.phoneDisplay}
          required
        />
        <TextArea
          label="Project details"
          value={details}
          onChange={(e) => setDetails(e.target.value)}
          placeholder="Site type, equipment, timing, scope…"
        />

        <Button
          full
          variant="accent"
          disabled={!name.trim() || !phone.trim()}
          onClick={() => setSent(true)}
        >
          Submit quote request
        </Button>
      </div>
    </MobileShell>
  );
}
