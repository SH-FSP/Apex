import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { LogoSlot, Overline } from "@/components/slife/ui";

export const Route = createFileRoute("/")({
  component: Splash,
});

function Splash() {
  const navigate = useNavigate();
  useEffect(() => {
    const t = setTimeout(() => navigate({ to: "/onboarding" }), 2200);
    return () => clearTimeout(t);
  }, [navigate]);

  return (
    <div className="min-h-screen w-full flex justify-center bg-[#040810]">
      <div className="relative w-full max-w-[440px] min-h-screen overflow-hidden bg-background">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(47,111,219,0.2),transparent_55%)]" />
        <div className="pointer-events-none absolute -top-20 right-0 w-56 h-56 rounded-full bg-[color:var(--accent)]/10 blur-3xl" />
        <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 fade-in">
          <h1 className="sr-only">APEX CLIMATE TECHNOLOGIES</h1>
          <LogoSlot size={230} />
          <div className="mt-5">
            <Overline className="text-center">HVACR · Mechanical & Electrical</Overline>
          </div>
          <div className="absolute bottom-12 left-0 right-0 flex justify-center">
            <div className="h-1 w-28 rounded-full bg-primary/25 overflow-hidden">
              <div className="h-full w-1/2 rounded-full bg-primary animate-[shimmer_1.4s_ease-in-out_infinite]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
