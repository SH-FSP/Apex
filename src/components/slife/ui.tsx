import { Link } from "@tanstack/react-router";
import type { ReactNode, ButtonHTMLAttributes, InputHTMLAttributes, TextareaHTMLAttributes } from "react";
import logo from "@/assets/apex/apex-logo.png";

export function LogoSlot({
  size = 56,
  maxHeight,
}: {
  size?: number;
  maxHeight?: number;
}) {
  return (
    <div
      data-logo-slot="apex"
      className="inline-flex items-center justify-center shrink-0"
      style={{ width: size, maxHeight }}
      aria-label="Apex Climate Technologies logo"
    >
      <img
        src={logo}
        alt="Apex Climate Technologies"
        width={size}
        style={{
          width: size,
          maxHeight: maxHeight ?? "none",
          height: "auto",
          display: "block",
          objectFit: "contain",
        }}
      />
    </div>
  );
}

type ButtonVariant = "primary" | "secondary" | "ghost" | "destructive" | "accent";

interface BtnProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  full?: boolean;
  children: ReactNode;
}

export function Button({ variant = "primary", full, className = "", children, ...rest }: BtnProps) {
  const base =
    "inline-flex items-center justify-center gap-2 px-5 h-12 rounded-2xl text-[13px] font-semibold tracking-[0.02em] transition-all duration-200 active:scale-[0.98] disabled:cursor-not-allowed";
  const variants: Record<ButtonVariant, string> = {
    primary:
      "bg-primary text-primary-foreground hover:brightness-110 disabled:bg-[color:var(--border)] disabled:text-[color:var(--mute)] shadow-[0_8px_24px_rgba(47,111,219,0.28)]",
    accent:
      "bg-[color:var(--accent)] text-[color:var(--accent-foreground)] hover:brightness-110 disabled:bg-[color:var(--border)] disabled:text-[color:var(--mute)] shadow-[0_8px_24px_rgba(225,29,56,0.25)]",
    secondary:
      "bg-[color:var(--surface)] border border-border text-foreground hover:border-primary/50 hover:bg-primary/5 disabled:text-mute",
    ghost: "bg-transparent text-foreground hover:text-primary hover:bg-primary/5",
    destructive:
      "bg-transparent border border-destructive/60 text-destructive hover:bg-destructive/10",
  };
  return (
    <button className={`${base} ${variants[variant]} ${full ? "w-full" : ""} ${className}`} {...rest}>
      {children}
    </button>
  );
}

interface LinkBtnProps {
  variant?: ButtonVariant;
  full?: boolean;
  to: string;
  params?: Record<string, string>;
  search?: Record<string, string>;
  children: ReactNode;
  className?: string;
}

export function LinkButton({
  variant = "primary",
  full,
  to,
  params,
  search,
  children,
  className = "",
}: LinkBtnProps) {
  const base =
    "inline-flex items-center justify-center gap-2 px-5 h-12 rounded-2xl text-[13px] font-semibold tracking-[0.02em] transition-all duration-200 active:scale-[0.98]";
  const variants: Record<ButtonVariant, string> = {
    primary:
      "bg-primary text-primary-foreground hover:brightness-110 shadow-[0_8px_24px_rgba(47,111,219,0.28)]",
    accent:
      "bg-[color:var(--accent)] text-[color:var(--accent-foreground)] hover:brightness-110 shadow-[0_8px_24px_rgba(225,29,56,0.25)]",
    secondary:
      "bg-[color:var(--surface)] border border-border text-foreground hover:border-primary/50",
    ghost: "bg-transparent text-foreground hover:text-primary",
    destructive: "bg-transparent border border-destructive/60 text-destructive",
  };
  return (
    <Link
      to={to as any}
      params={params as any}
      search={search as any}
      className={`${base} ${variants[variant]} ${full ? "w-full" : ""} ${className}`}
    >
      {children}
    </Link>
  );
}

export function Chip({
  label,
  active = false,
  onClick,
}: {
  label: string;
  active?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "px-3.5 h-9 rounded-xl text-[12px] font-semibold tracking-[0.02em] transition-colors border whitespace-nowrap",
        active
          ? "bg-primary text-primary-foreground border-primary"
          : "bg-[color:var(--surface)] text-body border-border hover:border-primary/50 hover:text-foreground",
      ].join(" ")}
    >
      {label}
    </button>
  );
}

interface FieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  hint?: string;
}
export function Field({ label, hint, className = "", ...rest }: FieldProps) {
  return (
    <label className="block">
      {label && (
        <span className="block mb-2 text-[12px] tracking-[0.04em] font-semibold text-mute">
          {label}
        </span>
      )}
      <input
        {...rest}
        className={`w-full h-12 rounded-2xl bg-[color:var(--surface)] border border-border px-4 text-[15px] text-foreground placeholder:text-mute outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all ${className}`}
      />
      {hint && <span className="mt-1.5 block text-xs text-mute">{hint}</span>}
    </label>
  );
}

interface AreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  hint?: string;
}
export function TextArea({ label, hint, className = "", ...rest }: AreaProps) {
  return (
    <label className="block">
      {label && (
        <span className="block mb-2 text-[12px] tracking-[0.04em] font-semibold text-mute">
          {label}
        </span>
      )}
      <textarea
        {...rest}
        className={`w-full min-h-28 rounded-2xl bg-[color:var(--surface)] border border-border p-4 text-[15px] text-foreground placeholder:text-mute outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all resize-y ${className}`}
      />
      {hint && <span className="mt-1.5 block text-xs text-mute">{hint}</span>}
    </label>
  );
}

export function Overline({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <p className={`overline ${className}`}>{children}</p>;
}

export function Avatar({ src, alt, size = 48 }: { src: string; alt: string; size?: number }) {
  return (
    <span
      className="inline-block rounded-full overflow-hidden ring-2 ring-primary/25 shrink-0"
      style={{ width: size, height: size }}
    >
      <img src={src} alt={alt} width={size} height={size} loading="lazy" className="w-full h-full object-cover" />
    </span>
  );
}

export function Divider({ label }: { label?: string }) {
  if (!label) return <div className="h-px w-full bg-border" />;
  return (
    <div className="flex items-center gap-3 my-7">
      <div className="flex-1 h-px bg-border" />
      <span className="text-[11px] tracking-[0.1em] uppercase text-mute font-semibold">{label}</span>
      <div className="flex-1 h-px bg-border" />
    </div>
  );
}

export function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`panel p-5 ${className}`}>{children}</div>;
}

export function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <p className="text-[11px] uppercase tracking-[0.14em] font-semibold text-mute mb-3">{children}</p>
  );
}

export function StatusPill({ status }: { status: string }) {
  const map: Record<string, string> = {
    Scheduled: "bg-primary/15 border-primary/40 text-primary",
    "In Progress": "bg-[color:var(--accent)]/15 border-[color:var(--accent)]/40 text-[color:var(--accent)]",
    Completed: "bg-[color:var(--success)]/15 border-[color:var(--success)]/40 text-[color:var(--success)]",
    Cancelled: "bg-mute/10 border-mute/30 text-mute",
  };
  return (
    <span
      className={`inline-flex px-2.5 py-1 rounded-lg text-[10px] tracking-[0.06em] font-semibold border ${map[status] ?? "border-border text-body"}`}
    >
      {status}
    </span>
  );
}
