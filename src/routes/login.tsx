import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Button, Divider, Field, LogoSlot } from "@/components/slife/ui";

export const Route = createFileRoute("/login")({
  component: Login,
});

function Login() {
  const nav = useNavigate();
  return (
    <div className="min-h-screen w-full flex justify-center bg-background">
      <div className="relative w-full max-w-[440px] min-h-screen">
        <div className="flex flex-col items-center pt-14 pb-10 px-6">
          <LogoSlot size={72} />
        </div>
        <div className="px-6">
          <p className="overline text-center">Customer portal</p>
          <h1 className="mt-2 text-center text-[28px] font-bold text-foreground">Welcome back.</h1>
          <p className="mt-3 text-center text-[14px] text-body max-w-[320px] mx-auto">
            Sign in to book service or manage your Apex appointments.
          </p>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              nav({ to: "/home" });
            }}
            className="mt-10 space-y-4"
          >
            <Field label="Email" type="email" placeholder="you@email.com" required />
            <div>
              <Field label="Password" type="password" placeholder="••••••••" required />
              <div className="mt-2 text-right">
                <a href="#" className="text-[12px] uppercase tracking-[0.06em] font-semibold text-primary">
                  Forgot password?
                </a>
              </div>
            </div>
            <Button full type="submit">
              Log in
            </Button>
          </form>

          <Divider label="New customer" />

          <Button full variant="secondary" onClick={() => nav({ to: "/signup" })}>
            Create account
          </Button>

          <p className="mt-10 mb-8 text-center text-[13px] text-body">
            Need emergency service?{" "}
            <a href="tel:+15550142281" className="text-[color:var(--accent)] font-semibold">
              Call (555) 014-2281
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
