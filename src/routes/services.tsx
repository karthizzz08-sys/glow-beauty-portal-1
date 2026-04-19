import { createFileRoute, Link } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { defaultServices, type Service } from "@/lib/data";
import { getServices } from "@/lib/store";
import { useEffect, useState } from "react";
import { Clock } from "lucide-react";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services & Pricing — Glow Beauty Parlour" },
      { name: "description", content: "Hair, skin, makeup and bridal services with transparent pricing." },
    ],
  }),
  component: ServicesPage,
});

const categories = ["Hair Care", "Skin Care", "Bridal", "Makeup"] as const;

function ServicesPage() {
  const [services, setServices] = useState<Service[]>(defaultServices);
  useEffect(() => setServices(getServices()), []);

  return (
    <Layout>
      <section className="bg-gradient-blush py-20">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-accent-foreground/70">Our Menu</p>
          <h1 className="mt-2 font-display text-5xl md:text-6xl">Services & Pricing</h1>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Curated treatments tailored to bring out your natural radiance.
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16">
        {categories.map((cat) => {
          const items = services.filter((s) => s.category === cat);
          if (items.length === 0) return null;
          return (
            <div key={cat} className="mb-16">
              <div className="mb-8 flex items-end justify-between">
                <h2 className="font-display text-3xl md:text-4xl">{cat}</h2>
                <div className="hidden h-px flex-1 bg-border md:mx-6 md:block" />
                <span className="text-xs uppercase tracking-widest text-muted-foreground">{items.length} treatments</span>
              </div>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {items.map((s) => (
                  <div key={s.id} className="group flex flex-col rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:shadow-luxe">
                    <h3 className="font-display text-xl">{s.name}</h3>
                    <p className="mt-2 flex-1 text-sm text-muted-foreground">{s.description}</p>
                    <div className="mt-4 flex items-center gap-3 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4" /> {s.duration}
                    </div>
                    <div className="mt-5 flex items-center justify-between border-t border-border pt-4">
                      <div className="text-2xl font-semibold text-primary">₹{s.price}</div>
                      <Button asChild size="sm" className="rounded-full">
                        <Link to="/booking" search={{ service: s.id } as never}>Book Now</Link>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </section>
    </Layout>
  );
}
