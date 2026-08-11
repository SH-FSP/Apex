import { createFileRoute } from "@tanstack/react-router";
import { MobileShell, TopBar } from "@/components/slife/MobileShell";
import { Icon } from "@/components/slife/icons";

export const Route = createFileRoute("/notifications")({
  component: Notifications,
});

const ITEMS = [
  {
    id: "1",
    title: "Appointment reminder",
    body: "AC service tomorrow at 10:00 AM — Marcus Hale assigned.",
    time: "2h ago",
  },
  {
    id: "2",
    title: "Booking confirmed",
    body: "Preventive maintenance on Aug 20 at 2:00 PM is confirmed.",
    time: "Yesterday",
  },
  {
    id: "3",
    title: "Seasonal tip",
    body: "Schedule a cooling tune-up before peak summer demand.",
    time: "3d ago",
  },
];

function Notifications() {
  return (
    <MobileShell tabBar>
      <TopBar title="Notifications" back="/home" />
      <div className="px-5 py-5 space-y-3 pb-8 fade-in-up">
        {ITEMS.map((n) => (
          <div key={n.id} className="hairline bg-[color:var(--surface)] p-4 flex gap-3">
            <div className="w-9 h-9 bg-primary/20 flex items-center justify-center shrink-0">
              <Icon.Bell className="w-4 h-4 text-primary" />
            </div>
            <div className="min-w-0">
              <div className="flex items-start justify-between gap-2">
                <p className="text-[14px] font-semibold text-foreground">{n.title}</p>
                <span className="text-[11px] text-mute shrink-0">{n.time}</span>
              </div>
              <p className="mt-1 text-[13px] text-body">{n.body}</p>
            </div>
          </div>
        ))}
      </div>
    </MobileShell>
  );
}
