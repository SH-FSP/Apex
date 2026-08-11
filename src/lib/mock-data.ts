import heatingImg from "@/assets/apex/service-heating.jpg";
import acImg from "@/assets/apex/service-ac.jpg";
import electricalImg from "@/assets/apex/service-electrical.jpg";
import pipingImg from "@/assets/apex/service-piping.jpg";
import boilerImg from "@/assets/apex/service-boiler.jpg";
import maintenanceImg from "@/assets/apex/service-maintenance.jpg";
import techImg from "@/assets/apex/tech-1.jpg";

export type PropertyType = "Residential" | "Commercial" | "Institution" | "Government";
export type AppointmentStatus = "Scheduled" | "In Progress" | "Completed" | "Cancelled";

export interface Service {
  id: string;
  name: string;
  short: string;
  description: string;
  image: string;
  duration: string;
  fromPrice: string;
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

export const SERVICES: Service[] = [
  {
    id: "heating",
    name: "Heating",
    short: "Furnace & heat systems",
    description:
      "Installation, repair, and preventive maintenance for residential and commercial heating systems.",
    image: heatingImg,
    duration: "1–3 hrs",
    fromPrice: "From $89",
  },
  {
    id: "ventilation",
    name: "Ventilation",
    short: "Airflow & ductwork",
    description:
      "Duct cleaning, airflow balancing, and ventilation upgrades for healthier indoor air.",
    image: maintenanceImg,
    duration: "2–4 hrs",
    fromPrice: "From $129",
  },
  {
    id: "ac",
    name: "Air Conditioning",
    short: "Cooling & climate control",
    description:
      "AC install, repair, refrigerant service, and seasonal tune-ups to keep you comfortable.",
    image: acImg,
    duration: "1–4 hrs",
    fromPrice: "From $99",
  },
  {
    id: "piping",
    name: "Process Piping",
    short: "Mechanical piping systems",
    description:
      "Process piping installation and repairs for commercial and institutional facilities.",
    image: pipingImg,
    duration: "Half / full day",
    fromPrice: "Quote",
  },
  {
    id: "electrical",
    name: "Electrical",
    short: "Mechanical electrical work",
    description:
      "Electrical support for HVAC equipment, panels, and related mechanical systems.",
    image: electricalImg,
    duration: "1–3 hrs",
    fromPrice: "From $119",
  },
  {
    id: "boiler",
    name: "Boiler",
    short: "Boiler service & repair",
    description:
      "Boiler commissioning, repairs, and preventive maintenance for reliable heat.",
    image: boilerImg,
    duration: "2–5 hrs",
    fromPrice: "From $149",
  },
  {
    id: "maintenance",
    name: "Preventive Maintenance",
    short: "Plans that prevent downtime",
    description:
      "Scheduled inspections and tune-ups to extend equipment life and avoid emergencies.",
    image: maintenanceImg,
    duration: "1–2 hrs",
    fromPrice: "From $79",
  },
];

export const TECHNICIANS: Technician[] = [
  {
    id: "t1",
    name: "Marcus Hale",
    role: "Lead HVAC Technician",
    rating: 4.9,
    image: techImg,
  },
  {
    id: "t2",
    name: "Elena Ortiz",
    role: "Senior Service Tech",
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
  "Institution",
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
];

export const CURRENT_USER = {
  name: "Jordan Blake",
  email: "jordan.blake@email.com",
  phone: "(555) 014-2281",
  address: "1842 Maple Ave, Suite 2",
  memberSince: "2026",
};

const STORAGE_KEY = "apex-appointments";

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
