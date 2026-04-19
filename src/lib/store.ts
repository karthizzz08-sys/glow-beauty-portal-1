import { defaultServices, type Service } from "./data";

const SERVICES_KEY = "glow_services";
const BOOKINGS_KEY = "glow_bookings";
const BLOCKED_KEY = "glow_blocked";

export type Booking = {
  id: string;
  serviceId: string;
  serviceName: string;
  date: string;
  time: string;
  name: string;
  phone: string;
  address: string;
  createdAt: string;
};

export type Blocked = { date: string; time: string };

const isBrowser = typeof window !== "undefined";

export const getServices = (): Service[] => {
  if (!isBrowser) return defaultServices;
  const raw = localStorage.getItem(SERVICES_KEY);
  return raw ? (JSON.parse(raw) as Service[]) : defaultServices;
};

export const saveServices = (s: Service[]) => {
  if (isBrowser) localStorage.setItem(SERVICES_KEY, JSON.stringify(s));
};

export const getBookings = (): Booking[] => {
  if (!isBrowser) return [];
  const raw = localStorage.getItem(BOOKINGS_KEY);
  return raw ? (JSON.parse(raw) as Booking[]) : [];
};

export const addBooking = (b: Booking) => {
  const all = getBookings();
  all.push(b);
  if (isBrowser) localStorage.setItem(BOOKINGS_KEY, JSON.stringify(all));
};

export const getBlocked = (): Blocked[] => {
  if (!isBrowser) return [];
  const raw = localStorage.getItem(BLOCKED_KEY);
  return raw ? (JSON.parse(raw) as Blocked[]) : [];
};

export const saveBlocked = (b: Blocked[]) => {
  if (isBrowser) localStorage.setItem(BLOCKED_KEY, JSON.stringify(b));
};

export const isSlotTaken = (date: string, time: string) => {
  return (
    getBookings().some((b) => b.date === date && b.time === time) ||
    getBlocked().some((b) => b.date === date && b.time === time)
  );
};
