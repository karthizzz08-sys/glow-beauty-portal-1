import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";
import { Award, Users, Sparkles, Heart } from "lucide-react";
import owner from "@/assets/owner.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Glow Beauty Parlour" },
      { name: "description", content: "A decade of passion crafting beauty experiences. Meet the team behind Glow." },
    ],
  }),
  component: About,
});

const stats = [
  { icon: Users, n: "10K+", l: "Happy Clients" },
  { icon: Award, n: "12+", l: "Years Experience" },
  { icon: Sparkles, n: "25+", l: "Expert Services" },
  { icon: Heart, n: "500+", l: "Bridal Stories" },
];

function About() {
  return (
    <Layout>
      <section className="bg-gradient-blush py-16">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-accent-foreground/70">Our Story</p>
          <h1 className="mt-2 font-display text-5xl">About Glow</h1>
        </div>
      </section>

      <section className="container mx-auto grid gap-12 px-4 py-20 md:grid-cols-2 md:items-center">
        <div className="overflow-hidden rounded-3xl shadow-luxe">
          <img src={owner} alt="Founder of Glow Beauty Parlour" className="h-full w-full object-cover" loading="lazy" />
        </div>
        <div>
          <h2 className="font-display text-4xl">Crafted with passion since 2013</h2>
          <p className="mt-4 text-muted-foreground">
            Glow Beauty Parlour was founded by <b>Meera Sharma</b>, a celebrated stylist with over a decade of experience in bridal and editorial beauty.
            Our philosophy is simple — beauty should feel personal, calming and effortlessly elegant.
          </p>
          <p className="mt-3 text-muted-foreground">
            From everyday glow-ups to once-in-a-lifetime bridal moments, every guest is treated to thoughtfully curated services in a serene, luxe environment.
          </p>
          <div className="mt-8 grid grid-cols-2 gap-4">
            {stats.map((s) => (
              <div key={s.l} className="rounded-2xl border border-border bg-card p-5">
                <s.icon className="h-5 w-5 text-accent" />
                <div className="mt-2 font-display text-2xl">{s.n}</div>
                <div className="text-xs text-muted-foreground">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-secondary/40 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-display text-3xl">Recognised for excellence</h2>
          <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
            Featured in Vogue India · Best Bridal Studio Award 2022 · Brides Today Top 50
          </p>
        </div>
      </section>
    </Layout>
  );
}
