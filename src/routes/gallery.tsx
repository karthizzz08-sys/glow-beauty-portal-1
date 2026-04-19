import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";
import { useState } from "react";
import { X } from "lucide-react";
import gBridal from "@/assets/g-bridal.jpg";
import gMakeup from "@/assets/g-makeup.jpg";
import gHair from "@/assets/g-hair.jpg";
import gFacial from "@/assets/g-facial.jpg";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery — Glow Beauty Parlour" },
      { name: "description", content: "Browse our work: bridal, makeup and hair transformations." },
    ],
  }),
  component: Gallery,
});

const items = [
  { src: gBridal, cat: "Bridal" },
  { src: gMakeup, cat: "Makeup" },
  { src: gHair, cat: "Hair" },
  { src: gFacial, cat: "Skin" },
  { src: gBridal, cat: "Bridal" },
  { src: gMakeup, cat: "Makeup" },
  { src: gHair, cat: "Hair" },
  { src: gFacial, cat: "Skin" },
];
const cats = ["All", "Bridal", "Makeup", "Hair", "Skin"] as const;

function Gallery() {
  const [active, setActive] = useState<(typeof cats)[number]>("All");
  const [open, setOpen] = useState<string | null>(null);

  const filtered = items.filter((i) => active === "All" || i.cat === active);

  return (
    <Layout>
      <section className="bg-gradient-blush py-16">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-accent-foreground/70">Portfolio</p>
          <h1 className="mt-2 font-display text-5xl">Our Gallery</h1>
        </div>
      </section>

      <section className="container mx-auto px-4 py-12">
        <div className="mb-10 flex flex-wrap justify-center gap-2">
          {cats.map((c) => (
            <button
              key={c}
              onClick={() => setActive(c)}
              className={`rounded-full px-5 py-2 text-sm transition-all ${active === c ? "bg-primary text-primary-foreground" : "bg-secondary text-foreground/70 hover:bg-secondary/80"}`}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((it, i) => (
            <button key={i} onClick={() => setOpen(it.src)} className="group relative aspect-square overflow-hidden rounded-2xl">
              <img src={it.src} alt={it.cat} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent opacity-0 transition-opacity group-hover:opacity-100" />
              <span className="absolute bottom-3 left-4 text-sm font-medium text-white opacity-0 transition-opacity group-hover:opacity-100">{it.cat}</span>
            </button>
          ))}
        </div>
      </section>

      {open && (
        <div onClick={() => setOpen(null)} className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
          <button className="absolute right-6 top-6 text-white" onClick={() => setOpen(null)}><X className="h-8 w-8" /></button>
          <img src={open} alt="Enlarged" className="max-h-[90vh] max-w-full rounded-2xl object-contain" />
        </div>
      )}
    </Layout>
  );
}
