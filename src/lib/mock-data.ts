import heatingImg from "@/assets/apex/service-heating.jpg";
import acImg from "@/assets/apex/service-ac.jpg";
import electricalImg from "@/assets/apex/service-electrical.jpg";
import pipingImg from "@/assets/apex/service-piping.jpg";
import boilerImg from "@/assets/apex/service-boiler.jpg";
import maintenanceImg from "@/assets/apex/service-maintenance.jpg";
import techImg from "@/assets/apex/tech-1.jpg";

/** Confirmed brand facts from the Apex Climate Technologies brief. */
export const COMPANY = {
  legalName: "APEX CLIMATE TECHNOLOGIES",
  shortName: "Apex",
  industry: "HVACR — Mechanical & Electrical Services",
  /** Predecessor brand; 17 years — confirm attribution before public claims. */
  heritage: "Built on 17+ years of industry experience (formerly Stars Mechanical Solutions).",
  heritageShort: "17+ years of mechanical expertise",
  positioning:
    "Professional, reliable HVACR and mechanical-electrical service for residential, commercial, institutional, and government clients.",
  audiences: ["Residential", "Commercial", "Institutional", "Government"] as const,
  /** Placeholder until client provides real contact details. */
  phoneDisplay: "(555) 014-2281",
  phoneTel: "+15550142281",
  email: "service@apexclimatetech.example",
  competitorsNote: "Reference market: Bower Mechanical, ACI, Michael & Sons.",
};

export type PropertyType = "Residential" | "Commercial" | "Institutional" | "Government";
export type AppointmentStatus = "Scheduled" | "In Progress" | "Completed" | "Cancelled";
export type ServiceCategory = "Climate" | "Mechanical" | "Electrical" | "Maintenance";

export interface Service {
  id: string;
  name: string;
  short: string;
  description: string;
  image: string;
  duration: string;
  fromPrice: string;
  category: ServiceCategory;
}

export interface Technician {
  id: string;
  name: string;
  role: string;
  rating: number;
  image: string;
}

export interface Appointment {
  id: string;
  serviceId: string;
  serviceName: string;
  date: string;
  time: string;
  address: string;
  propertyType: PropertyType;
  status: AppointmentStatus;
  notes?: string;
  technician?: Technician;
}

/**
 * Core services from the logo/business brief:
 * Heating, Ventilation, Air Conditioning, Process Piping, Electrical,
 * Boiler, Repairs, Installations, Preventive Maintenance.
 * "Commencing" interpreted as Commissioning pending client confirmation.
 */
export const SERVICES: Service[] = [
  {
    id: "heating",
    name: "Heating",
    short: "Furnace & heat systems",
    description:
      "Professional heating installation, repair, and service for homes and facilities.",
    image: heatingImg,
    duration: "1–3 hrs",
    fromPrice: "Quote",
    category: "Climate",
  },
  {
    id: "ventilation",
    name: "Ventilation",
    short: "Airflow & duct systems",
    description:
      "Ventilation and ductwork service to support healthy, balanced indoor air.",
    image: maintenanceImg,
    duration: "2–4 hrs",
    fromPrice: "Quote",
    category: "Climate",
  },
  {
    id: "ac",
    name: "Air Conditioning",
    short: "Cooling & climate control",
    description:
      "AC installation, repair, and seasonal service for reliable cooling performance.",
    image: acImg,
    duration: "1–4 hrs",
    fromPrice: "Quote",
    category: "Climate",
  },
  {
    id: "piping",
    name: "Process Piping",
    short: "Mechanical piping systems",
    description:
      "Process piping installation and repair for commercial, institutional, and government sites.",
    image: pipingImg,
    duration: "Half / full day",
    fromPrice: "Quote",
    category: "Mechanical",
  },
  {
    id: "electrical",
    name: "Electrical",
    short: "Mechanical electrical work",
    description:
      "Electrical services supporting HVAC equipment, mechanical systems, and related infrastructure.",
    image: electricalImg,
    duration: "1–3 hrs",
    fromPrice: "Quote",
    category: "Electrical",
  },
  {
    id: "boiler",
    name: "Boiler",
    short: "Boiler service & repair",
    description:
      "Boiler repair, installation support, and maintenance for dependable heat delivery.",
    image: boilerImg,
    duration: "2–5 hrs",
    fromPrice: "Quote",
    category: "Mechanical",
  },
  {
    id: "repairs",
    name: "Repairs",
    short: "Diagnostics & fixes",
    description:
      "Fast, professional repair service across HVACR, mechanical, and electrical systems.",
    image: electricalImg,
    duration: "1–4 hrs",
    fromPrice: "Quote",
    category: "Maintenance",
  },
  {
    id: "installations",
    name: "Installations",
    short: "New equipment installs",
    description:
      "Clean, code-conscious installations for heating, cooling, piping, and related systems.",
    image: heatingImg,
    duration: "Half / full day",
    fromPrice: "Quote",
    category: "Mechanical",
  },
  {
    id: "commissioning",
    name: "Commissioning",
    short: "Startup & verification",
    description:
      "System commissioning and verification so new or upgraded equipment performs as specified. (Brief listed “Commencing” — confirm naming with client.)",
    image: boilerImg,
    duration: "2–6 hrs",
    fromPrice: "Quote",
    category: "Mechanical",
  },
  {
    id: "maintenance",
    name: "Preventive Maintenance",
    short: "Plans that prevent downtime",
    description:
      "Scheduled inspections and tune-ups to extend equipment life and reduce emergency calls.",
    image: maintenanceImg,
    duration: "1–2 hrs",
    fromPrice: "Quote",
    category: "Maintenance",
  },
];

export const TECHNICIANS: Technician[] = [
  {
    id: "t1",
    name: "Marcus Hale",
    role: "Lead HVACR Technician",
    rating: 4.9,
    image: techImg,
  },
  {
    id: "t2",
    name: "Elena Ortiz",
    role: "Senior Mechanical Tech",
    rating: 4.8,
    image: techImg,
  },
];

export const TIME_SLOTS = [
  "8:00 AM",
  "9:00 AM",
  "10:00 AM",
  "11:00 AM",
  "1:00 PM",
  "2:00 PM",
  "3:00 PM",
  "4:00 PM",
  "5:00 PM",
];

export const PROPERTY_TYPES: PropertyType[] = [
  "Residential",
  "Commercial",
  "Institutional",
  "Government",
];

export const INITIAL_APPOINTMENTS: Appointment[] = [
  {
    id: "a1",
    serviceId: "ac",
    serviceName: "Air Conditioning",
    date: "Aug 14, 2026",
    time: "10:00 AM",
    address: "1842 Maple Ave, Suite 2",
    propertyType: "Residential",
    status: "Scheduled",
    notes: "Unit not cooling properly — upstairs.",
    technician: TECHNICIANS[0],
  },
  {
    id: "a2",
    serviceId: "maintenance",
    serviceName: "Preventive Maintenance",
    date: "Aug 20, 2026",
    time: "2:00 PM",
    address: "90 Commerce Blvd",
    propertyType: "Commercial",
    status: "Scheduled",
    technician: TECHNICIANS[1],
  },
  {
    id: "a3",
    serviceId: "boiler",
    serviceName: "Boiler",
    date: "Aug 28, 2026",
    time: "9:00 AM",
    address: "City Facilities Annex",
    propertyType: "Government",
    status: "Scheduled",
    notes: "Annual boiler inspection.",
    technician: TECHNICIANS[0],
  },
];

export const CURRENT_USER = {
  name: "Jordan Blake",
  email: "jordan.blake@email.com",
  phone: "(555) 210-8840",
  address: "1842 Maple Ave, Suite 2",
  propertyType: "Residential" as PropertyType,
  memberSince: "2026",
};

const STORAGE_KEY = "apex-appointments-v2";

export function loadAppointments(): Appointment[] {
  if (typeof window === "undefined") return INITIAL_APPOINTMENTS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return INITIAL_APPOINTMENTS;
    return JSON.parse(raw) as Appointment[];
  } catch {
    return INITIAL_APPOINTMENTS;
  }
}

export function saveAppointments(list: Appointment[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
}

export function getService(id: string) {
  return SERVICES.find((s) => s.id === id);
}
