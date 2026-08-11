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
    <div className="min-h-screen w-full flex justify-center bg-background">
      <div
        className="relative w-full max-w-[440px] min-h-screen overflow-hidden"
        style={{
          background: "linear-gradient(180deg, #15284a 0%, #0a1220 50%, #0a1220 100%)",
        }}
      >
        <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 fade-in">
          <div className="mb-6">
            <LogoSlot size={120} />
          </div>
          <h1 className="text-center text-[22px] font-bold tracking-tight text-foreground">
            APEX CLIMATE
          </h1>
          <p className="mt-1 text-center text-[12px] uppercase tracking-[0.18em] text-mute">
            Technologies
          </p>
          <div className="mt-5">
            <Overline className="text-center">HVACR · Mechanical & Electrical</Overline>
          </div>
          <div className="absolute bottom-10 left-0 right-0 flex justify-center">
            <div className="h-[2px] w-24 bg-primary/40 overflow-hidden">
              <div className="h-full w-1/2 bg-primary animate-[shimmer_1.6s_ease-in-out_infinite]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
