import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Phone, Mail, MapPin } from "lucide-react";
import { sendToWhatsApp } from "@/lib/data";
import { useState } from "react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Glow Beauty Parlour" },
      { name: "description", content: "Reach out via phone, email or WhatsApp. We'd love to hear from you." },
    ],
  }),
  component: Contact,
});

function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <Layout>
      <section className="bg-gradient-blush py-16">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-accent-foreground/70">Get in touch</p>
          <h1 className="mt-2 font-display text-5xl">Contact Us</h1>
        </div>
      </section>

      <section className="container mx-auto grid gap-10 px-4 py-16 lg:grid-cols-2">
        <div>
          <h2 className="font-display text-3xl">We're here for you</h2>
          <p className="mt-3 text-muted-foreground">Reach out to book, ask a question or say hello.</p>
          <div className="mt-8 space-y-5">
            <div className="flex items-start gap-4">
              <div className="rounded-full bg-accent/15 p-3 text-accent"><Phone className="h-5 w-5" /></div>
              <div><div className="font-medium">Phone</div><div className="text-sm text-muted-foreground">+91 99999 99999</div></div>
            </div>
            <div className="flex items-start gap-4">
              <div className="rounded-full bg-accent/15 p-3 text-accent"><Mail className="h-5 w-5" /></div>
              <div><div className="font-medium">Email</div><div className="text-sm text-muted-foreground">hello@glowbeauty.com</div></div>
            </div>
            <div className="flex items-start gap-4">
              <div className="rounded-full bg-accent/15 p-3 text-accent"><MapPin className="h-5 w-5" /></div>
              <div><div className="font-medium">Visit</div><div className="text-sm text-muted-foreground">123 Rose Avenue, Mumbai 400001</div></div>
            </div>
          </div>
          <Button onClick={() => sendToWhatsApp("Hi Glow Beauty!")} className="mt-8 rounded-full bg-[#25D366] hover:bg-[#1fbe5b]">
            Chat on WhatsApp
          </Button>
          <div className="mt-8 overflow-hidden rounded-2xl border border-border">
            <iframe
              title="Map"
              src="https://www.openstreetmap.org/export/embed.html?bbox=72.82%2C18.92%2C72.84%2C18.94&layer=mapnik"
              className="h-64 w-full"
              loading="lazy"
            />
          </div>
        </div>

        <form onSubmit={submit} className="rounded-3xl border border-border bg-card p-8 shadow-sm">
          <h3 className="font-display text-2xl">Send a message</h3>
          {sent ? (
            <div className="mt-6 rounded-xl bg-accent/15 p-6 text-center">
              <p className="font-medium">Thank you, {form.name || "friend"}!</p>
              <p className="mt-1 text-sm text-muted-foreground">We'll get back to you shortly.</p>
            </div>
          ) : (
            <div className="mt-6 space-y-4">
              <div><Label htmlFor="n">Name</Label><Input id="n" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="mt-1.5" /></div>
              <div><Label htmlFor="e">Email</Label><Input id="e" type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="mt-1.5" /></div>
              <div><Label htmlFor="m">Message</Label><Textarea id="m" required rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="mt-1.5" /></div>
              <Button type="submit" className="w-full rounded-full">Send Message</Button>
            </div>
          )}
        </form>
      </section>
    </Layout>
  );
}
