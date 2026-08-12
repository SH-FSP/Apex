import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/slife/ui";
import { COMPANY } from "@/lib/mock-data";
import tech from "@/assets/apex/onboard-tech.jpg";
import service from "@/assets/apex/onboard-service.jpg";
import comfort from "@/assets/apex/onboard-comfort.jpg";

export const Route = createFileRoute("/onboarding")({
  component: Onboarding,
});

const SLIDES = [
  {
    img: tech,
    kicker: "APEX CLIMATE TECHNOLOGIES",
    title: "HVACR. Mechanical. Electrical.",
    body: "Heating, ventilation, air conditioning, process piping, electrical, boiler work, repairs, installations, and preventive maintenance — professional and moderate in every detail.",
  },
  {
    img: service,
    kicker: COMPANY.heritageShort,
    title: "Trusted service, modern brand",
    body: "Apex continues a mechanical legacy built over 17+ years (formerly Stars Mechanical Solutions), now under a clearer climate-technology identity.",
  },
  {
    img: comfort,
    kicker: "Who we serve",
    title: "Residential to government",
    body: "Book service or request a quote for residential, commercial, institutional, and government facilities — one reliable team.",
  },
];

function Onboarding() {
  const [i, setI] = useState(0);
  const nav = useNavigate();
  const slide = SLIDES[i];
  const last = i === SLIDES.length - 1;

  return (
    <div className="min-h-screen w-full flex justify-center bg-background">
      <div className="relative w-full max-w-[440px] min-h-screen bg-black overflow-hidden">
        <img
          key={slide.img}
          src={slide.img}
          alt=""
          className="absolute inset-0 w-full h-full object-cover fade-in"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/45 to-[#0a1220]" />

        <button
          onClick={() => nav({ to: "/login" })}
          className="absolute top-6 right-5 text-[12px] uppercase tracking-[0.1em] font-semibold text-foreground/80 hover:text-primary"
        >
          Skip
        </button>

        <div className="relative z-10 flex flex-col justify-end min-h-screen p-6 pb-10">
          <p className="overline mb-3">{slide.kicker}</p>
          <h1 className="text-[30px] leading-[1.1] font-bold text-foreground max-w-[340px]">
            {slide.title}
          </h1>
          <p className="mt-4 text-[15px] leading-[1.55] text-body max-w-[340px]">{slide.body}</p>

          <div className="mt-8 flex gap-2">
            {SLIDES.map((_, idx) => (
              <span
                key={idx}
                className={`h-[3px] transition-all ${idx === i ? "w-8 bg-primary" : "w-4 bg-border"}`}
              />
            ))}
          </div>

          <div className="mt-8">
            {last ? (
              <Button full onClick={() => nav({ to: "/login" })}>
                Get started
              </Button>
            ) : (
              <Button full onClick={() => setI((v) => v + 1)}>
                Continue
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
