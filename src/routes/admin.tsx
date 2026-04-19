import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { defaultServices, TIME_SLOTS, type Service } from "@/lib/data";
import {
  getServices, saveServices, getBookings, getBlocked, saveBlocked,
  type Booking, type Blocked,
} from "@/lib/store";
import { useEffect, useState } from "react";
import { Lock, Trash2 } from "lucide-react";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin — Glow Beauty Parlour" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Admin,
});

const ADMIN_PASS = "glow123";

function Admin() {
  const [authed, setAuthed] = useState(false);
  const [pass, setPass] = useState("");
  const [tab, setTab] = useState<"services" | "blocked" | "bookings">("services");

  const [services, setServices] = useState<Service[]>(defaultServices);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [blocked, setBlocked] = useState<Blocked[]>([]);
  const [bDate, setBDate] = useState("");
  const [bTime, setBTime] = useState(TIME_SLOTS[0]);

  useEffect(() => {
    if (authed) {
      setServices(getServices());
      setBookings(getBookings());
      setBlocked(getBlocked());
    }
  }, [authed]);

  const updatePrice = (id: string, price: number) => {
    const next = services.map((s) => (s.id === id ? { ...s, price } : s));
    setServices(next);
    saveServices(next);
  };

  const addBlock = () => {
    if (!bDate) return;
    const next = [...blocked, { date: bDate, time: bTime }];
    setBlocked(next);
    saveBlocked(next);
  };

  const removeBlock = (i: number) => {
    const next = blocked.filter((_, idx) => idx !== i);
    setBlocked(next);
    saveBlocked(next);
  };

  if (!authed) {
    return (
      <Layout>
        <section className="container mx-auto max-w-md px-4 py-24">
          <div className="rounded-3xl border border-border bg-card p-8 shadow-luxe">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-accent/15 text-accent"><Lock className="h-5 w-5" /></div>
            <h1 className="mt-4 text-center font-display text-3xl">Admin Login</h1>
            <p className="mt-1 text-center text-sm text-muted-foreground">Demo password: <code>glow123</code></p>
            <Input type="password" value={pass} onChange={(e) => setPass(e.target.value)} placeholder="Password" className="mt-6" />
            <Button onClick={() => setAuthed(pass === ADMIN_PASS)} className="mt-3 w-full rounded-full">Enter</Button>
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="container mx-auto px-4 py-16">
        <h1 className="font-display text-4xl">Admin Panel</h1>
        <div className="mt-6 flex gap-2 border-b border-border">
          {(["services", "blocked", "bookings"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-4 py-2 text-sm capitalize transition-colors ${tab === t ? "border-b-2 border-primary font-medium text-primary" : "text-muted-foreground"}`}
            >
              {t}
            </button>
          ))}
        </div>

        {tab === "services" && (
          <div className="mt-6 grid gap-3">
            {services.map((s) => (
              <div key={s.id} className="flex flex-wrap items-center gap-4 rounded-xl border border-border bg-card p-4">
                <div className="flex-1">
                  <div className="font-medium">{s.name}</div>
                  <div className="text-xs text-muted-foreground">{s.category} · {s.duration}</div>
                </div>
                <div className="flex items-center gap-2">
                  <span>₹</span>
                  <Input type="number" value={s.price} onChange={(e) => updatePrice(s.id, Number(e.target.value))} className="w-28" />
                </div>
              </div>
            ))}
          </div>
        )}

        {tab === "blocked" && (
          <div className="mt-6">
            <div className="flex flex-wrap items-end gap-3 rounded-xl border border-border bg-card p-4">
              <div>
                <label className="mb-1 block text-sm">Date</label>
                <Input type="date" value={bDate} onChange={(e) => setBDate(e.target.value)} />
              </div>
              <div>
                <label className="mb-1 block text-sm">Time</label>
                <select value={bTime} onChange={(e) => setBTime(e.target.value)} className="h-10 rounded-md border border-input bg-background px-3 text-sm">
                  {TIME_SLOTS.map((t) => <option key={t}>{t}</option>)}
                </select>
              </div>
              <Button onClick={addBlock} className="rounded-full">Block Slot</Button>
            </div>
            <div className="mt-6 grid gap-2">
              {blocked.length === 0 && <p className="text-sm text-muted-foreground">No blocked slots.</p>}
              {blocked.map((b, i) => (
                <div key={i} className="flex items-center justify-between rounded-lg border border-border bg-card px-4 py-2">
                  <span className="text-sm">{b.date} — {b.time}</span>
                  <button onClick={() => removeBlock(i)} className="text-muted-foreground hover:text-destructive"><Trash2 className="h-4 w-4" /></button>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === "bookings" && (
          <div className="mt-6 grid gap-3">
            {bookings.length === 0 && <p className="text-sm text-muted-foreground">No bookings yet.</p>}
            {bookings.slice().reverse().map((b) => (
              <div key={b.id} className="rounded-xl border border-border bg-card p-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="font-medium">{b.serviceName}</div>
                  <div className="text-sm text-muted-foreground">{b.date} · {b.time}</div>
                </div>
                <div className="mt-2 text-sm text-muted-foreground">
                  {b.name} · {b.phone}<br />{b.address}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </Layout>
  );
}
