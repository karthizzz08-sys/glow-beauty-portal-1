import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { defaultServices, sendToWhatsApp, TIME_SLOTS, type Service } from "@/lib/data";
import { addBooking, getServices, isSlotTaken } from "@/lib/store";
import { useEffect, useMemo, useState } from "react";
import { Check, ChevronRight, Sparkles } from "lucide-react";

export const Route = createFileRoute("/booking")({
  head: () => ({
    meta: [
      { title: "Book an Appointment — Glow Beauty Parlour" },
      { name: "description", content: "Reserve your service, date and time online in a few simple steps." },
    ],
  }),
  component: BookingPage,
});

const steps = ["Service", "Date", "Time", "Details"] as const;

function BookingPage() {
  const [services, setServices] = useState<Service[]>(defaultServices);
  const [step, setStep] = useState(0);
  const [serviceId, setServiceId] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [time, setTime] = useState<string>("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => setServices(getServices()), []);

  const today = new Date().toISOString().split("T")[0];
  const selectedService = useMemo(() => services.find((s) => s.id === serviceId), [services, serviceId]);

  const next = () => setStep((s) => Math.min(s + 1, steps.length - 1));
  const back = () => setStep((s) => Math.max(s - 1, 0));

  const canNext =
    (step === 0 && serviceId) ||
    (step === 1 && date) ||
    (step === 2 && time) ||
    step === 3;

  const submit = () => {
    if (!selectedService || !name || !phone || !address) return;
    const booking = {
      id: crypto.randomUUID(),
      serviceId,
      serviceName: selectedService.name,
      date, time, name, phone, address,
      createdAt: new Date().toISOString(),
    };
    addBooking(booking);
    setDone(true);
  };

  const sendWA = () => {
    if (!selectedService) return;
    const msg = `New Booking — Glow Beauty\n\nService: ${selectedService.name} (₹${selectedService.price})\nDate: ${date}\nTime: ${time}\n\nName: ${name}\nPhone: ${phone}\nAddress: ${address}`;
    sendToWhatsApp(msg);
  };

  if (done) {
    return (
      <Layout>
        <section className="container mx-auto px-4 py-24">
          <div className="mx-auto max-w-xl rounded-3xl border border-border bg-card p-10 text-center shadow-luxe">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-accent/20 text-accent">
              <Check className="h-8 w-8" />
            </div>
            <h1 className="mt-6 font-display text-4xl">Booking Confirmed</h1>
            <p className="mt-3 text-muted-foreground">
              Thank you, {name}! We've received your request for <b>{selectedService?.name}</b> on <b>{date}</b> at <b>{time}</b>.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button onClick={sendWA} className="rounded-full bg-[#25D366] hover:bg-[#1fbe5b]">Send to WhatsApp</Button>
              <Button variant="outline" className="rounded-full" onClick={() => { setDone(false); setStep(0); setServiceId(""); setDate(""); setTime(""); setName(""); setPhone(""); setAddress(""); }}>
                Make another booking
              </Button>
            </div>
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="bg-gradient-blush py-16">
        <div className="container mx-auto px-4 text-center">
          <p className="inline-flex items-center gap-2 text-sm font-medium uppercase tracking-[0.2em] text-accent-foreground/70">
            <Sparkles className="h-4 w-4" /> Reserve your moment
          </p>
          <h1 className="mt-2 font-display text-5xl">Book Appointment</h1>
        </div>
      </section>

      <section className="container mx-auto max-w-3xl px-4 py-16">
        {/* Stepper */}
        <div className="mb-10 flex items-center justify-between">
          {steps.map((label, i) => (
            <div key={label} className="flex flex-1 items-center">
              <div className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-medium transition-colors ${i <= step ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground"}`}>
                {i < step ? <Check className="h-4 w-4" /> : i + 1}
              </div>
              <div className="ml-2 hidden text-sm sm:block">{label}</div>
              {i < steps.length - 1 && <div className={`mx-3 h-px flex-1 ${i < step ? "bg-primary" : "bg-border"}`} />}
            </div>
          ))}
        </div>

        <div className="rounded-3xl border border-border bg-card p-6 md:p-10 shadow-sm">
          {step === 0 && (
            <div>
              <h2 className="font-display text-2xl">Choose a service</h2>
              <div className="mt-6 grid gap-3 md:grid-cols-2">
                {services.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setServiceId(s.id)}
                    className={`rounded-xl border p-4 text-left transition-all ${serviceId === s.id ? "border-primary bg-primary/5 shadow-sm" : "border-border hover:border-accent"}`}
                  >
                    <div className="text-xs uppercase tracking-wider text-accent-foreground/70">{s.category}</div>
                    <div className="mt-1 font-medium">{s.name}</div>
                    <div className="mt-1 text-sm text-muted-foreground">₹{s.price} · {s.duration}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 1 && (
            <div>
              <h2 className="font-display text-2xl">Pick a date</h2>
              <Input type="date" min={today} value={date} onChange={(e) => setDate(e.target.value)} className="mt-6 max-w-xs" />
            </div>
          )}

          {step === 2 && (
            <div>
              <h2 className="font-display text-2xl">Select a time slot</h2>
              <p className="mt-1 text-sm text-muted-foreground">Greyed slots are unavailable.</p>
              <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
                {TIME_SLOTS.map((t) => {
                  const taken = isSlotTaken(date, t);
                  const active = time === t;
                  return (
                    <button
                      key={t}
                      disabled={taken}
                      onClick={() => setTime(t)}
                      className={`rounded-full border px-3 py-2 text-sm transition-all ${
                        taken ? "cursor-not-allowed border-border bg-muted text-muted-foreground line-through opacity-60"
                          : active ? "border-primary bg-primary text-primary-foreground" : "border-border hover:border-accent"
                      }`}
                    >
                      {t}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <h2 className="font-display text-2xl">Your details</h2>
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" value={name} onChange={(e) => setName(e.target.value)} className="mt-1.5" />
              </div>
              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} className="mt-1.5" />
              </div>
              <div>
                <Label htmlFor="address">Address</Label>
                <Textarea id="address" value={address} onChange={(e) => setAddress(e.target.value)} className="mt-1.5" rows={3} />
              </div>
              {selectedService && (
                <div className="rounded-xl bg-secondary/60 p-4 text-sm">
                  <div className="font-medium">Summary</div>
                  <div className="mt-1 text-muted-foreground">
                    {selectedService.name} · ₹{selectedService.price} · {date} at {time}
                  </div>
                </div>
              )}
            </div>
          )}

          <div className="mt-8 flex justify-between">
            <Button variant="ghost" onClick={back} disabled={step === 0}>Back</Button>
            {step < steps.length - 1 ? (
              <Button onClick={next} disabled={!canNext} className="rounded-full">
                Continue <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            ) : (
              <Button onClick={submit} disabled={!name || !phone || !address} className="rounded-full">
                Confirm Booking
              </Button>
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
}
