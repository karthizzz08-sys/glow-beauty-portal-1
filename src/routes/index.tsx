import { createFileRoute, Link } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { defaultServices } from "@/lib/data";
import { Scissors, Sparkles, Heart, Crown, Star, ArrowRight } from "lucide-react";
import heroImg from "@/assets/hero.jpg";
import gBridal from "@/assets/g-bridal.jpg";
import gMakeup from "@/assets/g-makeup.jpg";
import gHair from "@/assets/g-hair.jpg";
import gFacial from "@/assets/g-facial.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Glow Beauty Parlour — Enhancing Your Natural Beauty" },
      { name: "description", content: "Premium beauty parlour for hair, skin, makeup & bridal. Book online or via WhatsApp." },
    ],
  }),
  component: Home,
});

const highlights = [
  { icon: Scissors, title: "Hair", desc: "Cuts, color & spa" },
  { icon: Sparkles, title: "Makeup", desc: "Glam for any event" },
  { icon: Heart, title: "Facial", desc: "Glow-boosting care" },
  { icon: Crown, title: "Bridal", desc: "Your perfect day" },
];

const testimonials = [
  { name: "Aanya S.", text: "My bridal look was a dream. Every detail was perfect.", rating: 5 },
  { name: "Priya M.", text: "The facial left my skin glowing for weeks. Truly premium service.", rating: 5 },
  { name: "Riya K.", text: "Best haircut I've had in years. So worth it!", rating: 5 },
];

function Home() {
  const previewServices = defaultServices.slice(0, 4);

  return (
    <Layout>
      {/* Hero */}
      <section className="relative -mt-20 flex min-h-[100vh] items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroImg} alt="Glow Beauty Parlour interior" className="h-full w-full object-cover" width={1920} height={1080} />
          <div className="absolute inset-0 bg-gradient-to-r from-background/85 via-background/50 to-transparent" />
        </div>
        <div className="container relative z-10 mx-auto px-4 pt-20">
          <div className="max-w-2xl animate-fade-up">
            <span className="inline-flex items-center gap-2 rounded-full border border-accent/40 bg-background/60 px-4 py-1.5 text-xs font-medium text-accent-foreground backdrop-blur">
              <Sparkles className="h-3.5 w-3.5 text-accent" /> Premium Beauty Studio
            </span>
            <h1 className="mt-6 font-display text-5xl font-semibold leading-[1.05] md:text-7xl">
              Enhancing Your <span className="text-gradient-gold">Natural Beauty</span>
            </h1>
            <p className="mt-5 max-w-lg text-lg text-muted-foreground">
              Indulge in expert hair, skin, makeup & bridal services crafted with care in a luxurious setting.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button asChild size="lg" className="rounded-full px-8 shadow-luxe">
                <Link to="/booking">Book Now <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-full px-8">
                <Link to="/services">Explore Services</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section className="container mx-auto px-4 py-20">
        <div className="grid gap-6 md:grid-cols-4">
          {highlights.map((h) => (
            <div key={h.title} className="group rounded-2xl border border-border bg-card p-8 text-center transition-all hover:-translate-y-1 hover:shadow-luxe">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-accent/15 text-accent transition-colors group-hover:bg-accent group-hover:text-accent-foreground">
                <h.icon className="h-6 w-6" />
              </div>
              <h3 className="mt-5 font-display text-2xl">{h.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{h.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing Preview */}
      <section className="bg-gradient-blush py-20">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-accent-foreground/70">Pricing</p>
            <h2 className="mt-2 font-display text-4xl md:text-5xl">Most Loved Services</h2>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {previewServices.map((s) => (
              <div key={s.id} className="flex flex-col rounded-2xl bg-card p-6 shadow-sm transition-shadow hover:shadow-luxe">
                <span className="text-xs font-medium uppercase tracking-wider text-accent-foreground/70">{s.category}</span>
                <h3 className="mt-2 font-display text-xl">{s.name}</h3>
                <p className="mt-2 flex-1 text-sm text-muted-foreground">{s.description}</p>
                <div className="mt-5 flex items-end justify-between">
                  <div>
                    <div className="text-2xl font-semibold text-primary">₹{s.price}</div>
                    <div className="text-xs text-muted-foreground">{s.duration}</div>
                  </div>
                  <Button asChild size="sm" variant="secondary" className="rounded-full">
                    <Link to="/booking">Book</Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Button asChild variant="outline" className="rounded-full">
              <Link to="/services">View all services</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Gallery preview */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-accent-foreground/70">Gallery</p>
          <h2 className="mt-2 font-display text-4xl md:text-5xl">Glimpses of Glow</h2>
        </div>
        <div className="mt-10 grid gap-4 md:grid-cols-4">
          {[gBridal, gMakeup, gHair, gFacial].map((src, i) => (
            <div key={i} className="group relative aspect-[3/4] overflow-hidden rounded-2xl">
              <img src={src} alt="Gallery" loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
            </div>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Button asChild variant="outline" className="rounded-full">
            <Link to="/gallery">View full gallery</Link>
          </Button>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-secondary/40 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-accent-foreground/70">Reviews</p>
            <h2 className="mt-2 font-display text-4xl md:text-5xl">Loved by Our Clients</h2>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {testimonials.map((t) => (
              <div key={t.name} className="rounded-2xl border border-border bg-card p-7">
                <div className="flex gap-1 text-accent">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <p className="mt-4 font-display text-lg leading-relaxed">"{t.text}"</p>
                <div className="mt-5 text-sm font-medium">— {t.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
