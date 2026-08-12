import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Button, Field, LogoSlot } from "@/components/slife/ui";
import { Icon } from "@/components/slife/icons";
import { COMPANY } from "@/lib/mock-data";

export const Route = createFileRoute("/signup")({
  component: SignUp,
});

function SignUp() {
  const [agreed, setAgreed] = useState(false);
  const nav = useNavigate();
  return (
    <div className="min-h-screen w-full flex justify-center bg-background">
      <div className="relative w-full max-w-[440px] min-h-screen">
        <div className="flex flex-col items-center pt-12 pb-6 px-6">
          <LogoSlot size={160} />
        </div>
        <div className="px-6">
          <p className="overline text-center">Create account</p>
          <h1 className="mt-2 text-center text-[28px] font-bold text-foreground">Join Apex.</h1>
          <p className="mt-3 text-center text-[14px] text-body max-w-[320px] mx-auto">
            Book professional HVACR, mechanical, and electrical service — residential through
            government.
          </p>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              nav({ to: "/home" });
            }}
            className="mt-8 space-y-4"
          >
            <Field label="Full name" placeholder="e.g. Jordan Blake" required />
            <Field label="Email" type="email" placeholder="you@email.com" required />
            <Field label="Phone" type="tel" placeholder="(555) 000-0000" required />
            <Field label="Password" type="password" placeholder="Minimum 8 characters" required />

            <label className="flex items-start gap-3 pt-2 cursor-pointer select-none">
              <span
                onClick={() => setAgreed((v) => !v)}
                className={`mt-0.5 w-5 h-5 rounded-md border flex items-center justify-center shrink-0 ${
                  agreed ? "bg-primary border-primary" : "bg-transparent border-border"
                }`}
              >
                {agreed && <Icon.Check className="w-4 h-4 text-primary-foreground" strokeWidth={3} />}
              </span>
              <span className="text-[13px] leading-[1.5] text-body">
                I agree to the <a className="text-primary underline">Terms</a> and{" "}
                <a className="text-primary underline">Privacy Policy</a>.
              </span>
              <input
                type="checkbox"
                className="sr-only"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
              />
            </label>

            <Button full type="submit" disabled={!agreed}>
              Create account
            </Button>
          </form>

          <p className="mt-8 text-center text-[12px] text-mute px-2">{COMPANY.positioning}</p>

          <p className="mt-6 mb-8 text-center text-[13px] text-body">
            Already have an account?{" "}
            <Link to="/login" className="text-primary font-semibold uppercase tracking-[0.06em] text-[12px]">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
