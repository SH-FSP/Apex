import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { MobileShell, TopBar } from "@/components/slife/MobileShell";
import { Button, Card, LogoSlot } from "@/components/slife/ui";
import { Icon } from "@/components/slife/icons";
import { COMPANY, CURRENT_USER } from "@/lib/mock-data";

export const Route = createFileRoute("/me")({
  component: Account,
});

function Account() {
  const nav = useNavigate();
  return (
    <MobileShell tabBar>
      <TopBar overline="Account" title="Profile" />
      <div className="px-5 py-5 pb-8 space-y-5 fade-in-up">
        <Card>
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-primary flex items-center justify-center text-[20px] font-bold text-primary-foreground">
              {CURRENT_USER.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </div>
            <div>
              <p className="text-[17px] font-semibold text-foreground">{CURRENT_USER.name}</p>
              <p className="text-[13px] text-mute">
                {CURRENT_USER.propertyType} customer · since {CURRENT_USER.memberSince}
              </p>
            </div>
          </div>
          <div className="mt-5 space-y-3 border-t border-border pt-4">
            <Row label="Email" value={CURRENT_USER.email} />
            <Row label="Phone" value={CURRENT_USER.phone} />
            <Row label="Service address" value={CURRENT_USER.address} />
          </div>
        </Card>

        <Card>
          <div className="flex items-start gap-3">
            <LogoSlot size={64} maxHeight={48} />
            <div className="min-w-0">
              <p className="text-[13px] font-semibold text-foreground">{COMPANY.legalName}</p>
              <p className="text-[12px] text-mute mt-1">{COMPANY.industry}</p>
              <p className="text-[12px] text-body mt-2">{COMPANY.heritage}</p>
            </div>
          </div>
        </Card>

        <div className="hairline bg-[color:var(--surface)] divide-y divide-border">
          <Link
            to="/appointments"
            className="flex items-center justify-between px-4 h-12 text-[14px] text-foreground"
          >
            My appointments
            <Icon.Chevron className="w-5 h-5 text-mute" />
          </Link>
          <Link
            to="/quote"
            className="flex items-center justify-between px-4 h-12 text-[14px] text-foreground"
          >
            Request a quote
            <Icon.Chevron className="w-5 h-5 text-mute" />
          </Link>
          <Link
            to="/assistant"
            className="flex items-center justify-between px-4 h-12 text-[14px] text-foreground"
          >
            AI assistant
            <Icon.Chevron className="w-5 h-5 text-mute" />
          </Link>
          <Link
            to="/notifications"
            className="flex items-center justify-between px-4 h-12 text-[14px] text-foreground"
          >
            Notifications
            <Icon.Chevron className="w-5 h-5 text-mute" />
          </Link>
          <a
            href={`tel:${COMPANY.phoneTel}`}
            className="flex items-center justify-between px-4 h-12 text-[14px] text-foreground"
          >
            Call support
            <Icon.Phone className="w-5 h-5 text-mute" />
          </a>
        </div>

        <Button full variant="secondary" onClick={() => nav({ to: "/login" })}>
          Sign out
        </Button>
      </div>
    </MobileShell>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[11px] uppercase tracking-[0.08em] font-semibold text-mute">{label}</p>
      <p className="text-[14px] text-foreground mt-0.5">{value}</p>
    </div>
  );
}
