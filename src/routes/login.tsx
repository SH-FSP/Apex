import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Button, Divider, Field, LogoSlot } from "@/components/slife/ui";
import { COMPANY } from "@/lib/mock-data";

export const Route = createFileRoute("/login")({
  component: Login,
});

function Login() {
  const nav = useNavigate();
  return (
    <div className="min-h-screen w-full flex justify-center bg-[#040810]">
      <div className="relative w-full max-w-[440px] min-h-screen bg-background overflow-hidden">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-56 bg-[radial-gradient(ellipse_at_top,rgba(47,111,219,0.22),transparent_70%)]" />
        <div className="relative z-10 flex flex-col items-center pt-14 pb-6 px-6">
          <LogoSlot size={176} />
        </div>
        <div className="relative z-10 px-6 pb-10">
          <p className="overline text-center text-[10px]">{COMPANY.legalName}</p>
          <h1 className="mt-2 text-center text-[30px] font-bold text-foreground tracking-tight">
            Welcome back
          </h1>
          <p className="mt-2.5 text-center text-[14px] text-body max-w-[300px] mx-auto leading-relaxed">
            Sign in to book service, request quotes, or manage appointments.
          </p>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              nav({ to: "/home" });
            }}
            className="mt-9 space-y-4"
          >
            <Field label="Email" type="email" placeholder="you@email.com" required />
            <div>
              <Field label="Password" type="password" placeholder="••••••••" required />
              <div className="mt-2.5 text-right">
                <a href="#" className="text-[12px] font-semibold text-primary hover:underline">
                  Forgot password?
                </a>
              </div>
            </div>
            <Button full type="submit">
              Log in
            </Button>
          </form>

          <Divider label="New here" />

          <Button full variant="secondary" onClick={() => nav({ to: "/signup" })}>
            Create account
          </Button>

          <p className="mt-8 text-center text-[12px] text-mute">{COMPANY.heritageShort}</p>
          <p className="mt-5 text-center text-[13px] text-body">
            Urgent issue?{" "}
            <a href={`tel:${COMPANY.phoneTel}`} className="text-[color:var(--accent)] font-semibold">
              Call {COMPANY.phoneDisplay}
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
