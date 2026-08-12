import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { MobileShell, TopBar } from "@/components/slife/MobileShell";
import { Button } from "@/components/slife/ui";
import { Icon } from "@/components/slife/icons";
import { COMPANY } from "@/lib/mock-data";

export const Route = createFileRoute("/assistant")({
  component: Assistant,
});

type Msg = { role: "bot" | "user"; text: string };

const STARTERS = [
  "Book an AC repair",
  "Request a commercial quote",
  "What services do you offer?",
  "Do you serve government sites?",
];

function Assistant() {
  const nav = useNavigate();
  const [messages, setMessages] = useState<Msg[]>([
    {
      role: "bot",
      text: `Hi — I'm the Apex assistant. I can help with service questions, quote requests, and appointment booking for ${COMPANY.legalName}.`,
    },
  ]);
  const [input, setInput] = useState("");

  function replyTo(text: string) {
    const lower = text.toLowerCase();
    let reply =
      "I can help you book an appointment or request a quote. Which would you prefer?";
    if (lower.includes("book") || lower.includes("appointment") || lower.includes("repair")) {
      reply = "Great — I'll open booking. Pick your service and preferred time.";
      setMessages((m) => [...m, { role: "user", text }, { role: "bot", text: reply }]);
      setTimeout(() => nav({ to: "/book" }), 700);
      return;
    }
    if (lower.includes("quote") || lower.includes("commercial") || lower.includes("price")) {
      reply = "Opening a quote request so our team can price your project.";
      setMessages((m) => [...m, { role: "user", text }, { role: "bot", text: reply }]);
      setTimeout(() => nav({ to: "/quote" }), 700);
      return;
    }
    if (lower.includes("service") || lower.includes("offer")) {
      reply =
        "We provide heating, ventilation, air conditioning, process piping, electrical, boiler, repairs, installations, commissioning, and preventive maintenance.";
    } else if (lower.includes("government") || lower.includes("institutional")) {
      reply =
        "Yes — we serve residential, commercial, institutional, and government customers.";
    } else if (lower.includes("emergency") || lower.includes("call")) {
      reply = `For urgent issues, call ${COMPANY.phoneDisplay} (placeholder until client contact is confirmed).`;
    }
    setMessages((m) => [...m, { role: "user", text }, { role: "bot", text: reply }]);
  }

  return (
    <MobileShell tabBar>
      <TopBar overline="AI support" title="Apex Assistant" back="/home" />
      <div className="flex flex-col h-[calc(100dvh-8.5rem)]">
        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3">
          <p className="text-[12px] text-mute">
            Mock assistant for lead help & scheduling — inspired by the brief’s AI interest.
          </p>
          {messages.map((m, i) => (
            <div
              key={i}
              className={`max-w-[85%] rounded-2xl px-4 py-3 text-[14px] leading-snug ${
                m.role === "user"
                  ? "ml-auto bg-primary text-primary-foreground"
                  : "bg-[color:var(--surface)] border border-border text-foreground"
              }`}
            >
              {m.text}
            </div>
          ))}
          <div className="flex flex-wrap gap-2 pt-2">
            {STARTERS.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => replyTo(s)}
                className="rounded-full border border-border px-3 py-1.5 text-[12px] text-body hover:border-primary hover:text-primary"
              >
                {s}
              </button>
            ))}
          </div>
        </div>
        <form
          className="shrink-0 border-t border-border p-3 flex gap-2 bg-[color:var(--background)]"
          onSubmit={(e) => {
            e.preventDefault();
            if (!input.trim()) return;
            replyTo(input.trim());
            setInput("");
          }}
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about services or booking…"
            className="flex-1 h-11 rounded-xl bg-[color:var(--surface)] border border-border px-4 text-[14px] text-foreground outline-none focus:border-primary"
          />
          <Button type="submit" className="px-4 shrink-0" aria-label="Send">
            <Icon.ArrowRight className="w-5 h-5" />
          </Button>
        </form>
      </div>
    </MobileShell>
  );
}
